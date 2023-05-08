package pl.m4zek.springjwtrefreshrolemongo.payload.request;


import lombok.Data;

import java.util.List;

@Data
public class ApplicationRequest {

    private String ownerId;

    private String email;

    private String phoneNumber;

    private List<String> universities_ids;

}
