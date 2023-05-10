package pl.m4zek.springjwtrefreshrolemongo.service;

import lombok.extern.slf4j.Slf4j;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.m4zek.springjwtrefreshrolemongo.model.*;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.ApplicationRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.StatusUpdateRequest;
import pl.m4zek.springjwtrefreshrolemongo.payload.response.ApplicationResponse;
import pl.m4zek.springjwtrefreshrolemongo.repository.ApplicationRepository;
import pl.m4zek.springjwtrefreshrolemongo.repository.PdfFileRepository;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ApplicationService {

    private final PdfFileRepository pdfFilesRepository;
    private final ApplicationRepository applicationRepository;

    private final UniversityService universityService;
    private final UserService userService;

    public ApplicationService(PdfFileRepository pdfFilesRepository, ApplicationRepository applicationRepository, UniversityService universityService, UserService userService) {
        this.pdfFilesRepository = pdfFilesRepository;
        this.applicationRepository = applicationRepository;
        this.universityService = universityService;
        this.userService = userService;
    }

    public Application createApplication(List<MultipartFile> files, ApplicationRequest applicationRequest) throws RuntimeException{
            if(applicationRepository.existsByOwnerId(applicationRequest.getOwnerId())){
                throw new RuntimeException("You've already submitted your application");
            }

            User user = userService.findUserById(applicationRequest.getOwnerId());
            if(user == null){
                throw new UsernameNotFoundException("User with given id not found");
            }

            List<PdfFile> pdfFiles = new ArrayList<>();

            for(MultipartFile file: files){
                try {
                    String fileName = file.getOriginalFilename();
                    int dotIndex = fileName.lastIndexOf('.');
                    String fileType = fileName.substring(dotIndex);

                    if(!fileType.equals(".pdf")){
                        log.warn("Wrong file format[" + fileName.toUpperCase() + "]");
                        throw new RuntimeException("Wrong file format[" + fileName.toUpperCase() + "]");
                    }

                    PdfFile newPdfFile = pdfFilesRepository.save(new PdfFile(fileName, file.getBytes()));
                    pdfFiles.add(newPdfFile);
                } catch (IOException e) {
                    log.error("Cannot get bytes array from file: " + file.getOriginalFilename());
                    throw new RuntimeException(e);
                }
            }

            List<University> universities = applicationRequest.getUniversities_ids().stream()
                    .map(universityService::findById)
                    .collect(Collectors.toList());


            Application application = new Application();
            application.setOwnerId(user.getId());
            application.setEmail(applicationRequest.getEmail());
            application.setPhoneNumber(applicationRequest.getPhoneNumber());
            application.setUniversities(universities);
            application.setStatus(Status.SUBMITTED);
            application.setPdfFiles(pdfFiles);
            Application newApplication = applicationRepository.save(application);

            log.info("A new application has been added");
            return newApplication;
    }


    public ApplicationResponse updateStatusApplication(StatusUpdateRequest status) throws Exception {

        Application application = applicationRepository.findById(status.getApplicationId()).orElse(null);

        if(application != null){
            Status newStatus = Status.valueOf(status.getStatus());
            application.setStatus(newStatus);
            applicationRepository.save(application);
        } else {
            throw new Exception("Application with given id not found");
        }

        return new ApplicationResponse(application);
    }

    public List<ApplicationResponse> findAllApplication(){
        return applicationRepository.findAll().stream()
                .map(ApplicationResponse::new).collect(Collectors.toList());
    }

    public ApplicationResponse getApplication(String owner_id) throws NotFound {
        if(!applicationRepository.existsByOwnerId(owner_id)){
            throw new NotFound();
        }

        Application application = applicationRepository.findByOwnerId(owner_id).orElse(null);
        if(application == null){
            throw new NotFound();
        }

        return new ApplicationResponse(application);
    }

    public PdfFile findPdf(String pdfId) {
        Optional<PdfFile> pdfFile = pdfFilesRepository.findById(pdfId);
        return pdfFile.orElse(null);
    }
}