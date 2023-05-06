package pl.m4zek.springjwtrefreshrolemongo.controller;


import lombok.extern.slf4j.Slf4j;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.m4zek.springjwtrefreshrolemongo.model.PdfFile;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.ApplicationRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.StatusUpdateRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.ApplicationResponse;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.MessageResponse;
import pl.m4zek.springjwtrefreshrolemongo.service.ApplicationService;

import java.util.List;

@RequestMapping("/api/v1")
@RestController
@Slf4j
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    @Transactional
    @PostMapping(value = "/application", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> erasmusRegistration(@RequestPart List<MultipartFile> pdfFiles,
                                                 @RequestPart ApplicationRequest applicationRequest) {
        try {
            service.createApplication(pdfFiles, applicationRequest);
            return ResponseEntity.ok(new MessageResponse("The application was added correctly"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/application/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateApplication(@RequestBody StatusUpdateRequest statusUpdateRequest){
        try {
            return ResponseEntity.ok(service.updateStatusApplication(statusUpdateRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/application/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> findAll(){
        return ResponseEntity.ok(service.findAllApplication());
    }

    @GetMapping("/application/{owner_id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<ApplicationResponse> findApplication(@PathVariable String owner_id) {
        try {
            return ResponseEntity.ok(service.getApplication(owner_id));
        } catch (NotFound e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/application/{pdf_id}/download")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<Resource> getPDFFile(@PathVariable String pdf_id) {
        PdfFile pdfFile = service.findPdf(pdf_id);

        if (pdfFile != null) {
            ByteArrayResource resource = new ByteArrayResource(pdfFile.getFileData());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdfFile.getFileName())
                    .body(resource);
        } else {
            log.warn("Pdf not found with given id: " + pdf_id);
            return ResponseEntity.notFound().build();
        }
    }
}
