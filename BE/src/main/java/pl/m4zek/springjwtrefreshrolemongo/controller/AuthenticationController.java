package pl.m4zek.springjwtrefreshrolemongo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.m4zek.springjwtrefreshrolemongo.exception.RefreshTokenException;
import pl.m4zek.springjwtrefreshrolemongo.model.RefreshToken;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.LoginRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.RefreshTokenRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.SignupRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.AuthTokenResponse;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.MessageResponse;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.RefreshTokenResponse;
import pl.m4zek.springjwtrefreshrolemongo.security.jwt.TokenManager;
import pl.m4zek.springjwtrefreshrolemongo.security.service.MyUserDetails;
import pl.m4zek.springjwtrefreshrolemongo.security.service.RefreshTokenService;
import pl.m4zek.springjwtrefreshrolemongo.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuthenticationController {

    public static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private  final AuthenticationManager authenticationManager;

    private  final TokenManager tokenManager;

    private  final UserService userService;

    private  final RefreshTokenService refreshTokenService;

    public AuthenticationController(AuthenticationManager authenticationManager, TokenManager tokenManager, UserService userService, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenManager = tokenManager;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/api/auth/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenManager.generateToken(authentication);

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new AuthTokenResponse(
                userDetails.getId(),
                token,
                refreshToken.getToken(),
                userDetails.getFirst_name(),
                userDetails.getLast_name(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/api/auth/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request){
        String requestRefreshToken = request.getRefreshToken();

        String token = refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> tokenManager.generateTokenFromUsername(user.getUsername()))
                .orElseThrow(() -> new RefreshTokenException(requestRefreshToken, "Invalid refresh token!"));

        RefreshToken refreshToken = refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::updateExpirationTime)
                .orElseThrow(() -> new RefreshTokenException(requestRefreshToken, "Invalid refresh token!"));

        return ResponseEntity.ok(new RefreshTokenResponse(token, refreshToken.getToken()));
    }
    
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest signupRequest){
        try {
            userService.save(signupRequest);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/api/signout")
    public ResponseEntity<?> logout(){
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new MessageResponse("Signed out correctly!"));
    }
}