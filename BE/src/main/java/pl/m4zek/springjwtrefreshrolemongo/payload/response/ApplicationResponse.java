package pl.m4zek.springjwtrefreshrolemongo.payload.response;

import lombok.Data;
import pl.m4zek.springjwtrefreshrolemongo.model.Application;
import pl.m4zek.springjwtrefreshrolemongo.model.PdfFile;
import pl.m4zek.springjwtrefreshrolemongo.model.Status;
import pl.m4zek.springjwtrefreshrolemongo.model.University;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Data
public class ApplicationResponse {

    private String id;

    private String phoneNumber;

    private String email;

    private Status status;

    private List<University> universities;

    private Map<String, String> files;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Application application) {
        this.id = application.getId();
        this.email = application.getEmail();
        this.phoneNumber = application.getPhoneNumber();
        this.status = application.getStatus();
        this.universities = application.getUniversities();
        this.files = application.getPdfFiles().stream()
                .collect(Collectors.toMap(PdfFile::getFileName, PdfFile::getUrlToFile, (o1, o2) -> o1,  TreeMap::new));
    }
}
