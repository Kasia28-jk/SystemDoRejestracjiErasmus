package pl.m4zek.springjwtrefreshrolemongo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class PdfFile {
    @Id
    private String id;

    private final String fileName;

    private final byte[] fileData;

    public PdfFile(String fileName, byte[] fileData) {
        this.fileName = fileName;
        this.fileData = fileData;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getFileName() {
        return fileName;
    }
    public byte[] getFileData() {
        return fileData;
    }


    public String getUrlToFile(){
        return "/api/v1/application/" + this.id + "/download";
    }
}
