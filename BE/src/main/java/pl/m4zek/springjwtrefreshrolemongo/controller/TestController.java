package pl.m4zek.springjwtrefreshrolemongo.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.MessageResponse;


@RestController
@RequestMapping("/api/v1")
public class TestController {

    @GetMapping("/all/")
    public ResponseEntity<?> allAccess(){
        return ResponseEntity.ok(new MessageResponse("All Access"));
    }

    @GetMapping("/user/")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> userAccess(){
        return ResponseEntity.ok(new MessageResponse("USER Access"));
    }

    @GetMapping("/admin/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminAccess(){
        return ResponseEntity.ok(new MessageResponse("ADMIN Access"));
    }

}
