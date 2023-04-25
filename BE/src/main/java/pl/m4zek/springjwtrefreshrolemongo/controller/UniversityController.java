package pl.m4zek.springjwtrefreshrolemongo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.m4zek.springjwtrefreshrolemongo.model.University;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.UniversityRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.MessageResponse;
import pl.m4zek.springjwtrefreshrolemongo.service.UniversityService;

import java.util.List;

@RestController
@Slf4j
public class UniversityController {

    UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/v1/universities")
    public ResponseEntity<MessageResponse> saveUniversity(@RequestBody UniversityRequest universityRequest){
        try{
            universityService.save(University.builder()
                    .name(universityRequest.getName())
                    .description(universityRequest.getDescription())
                    .address(universityRequest.getAddress())
                    .city(universityRequest.getCity())
                    .country(universityRequest.getCountry())
                    .email(universityRequest.getEmail())
                    .phoneNumber(universityRequest.getPhoneNumber())
                    .availableLanguages(universityRequest.getAvailableLanguages())
                    .build());

            return ResponseEntity.ok(new MessageResponse("University saved successfully!"));
        } catch (Exception e){
            log.warn(e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping("/api/v1/universities/all")
    public ResponseEntity<?> getAllUniversities() {
        try {
            List<University> universities = universityService.getAll();
            return ResponseEntity.ok(universities);
        } catch (DataAccessException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
