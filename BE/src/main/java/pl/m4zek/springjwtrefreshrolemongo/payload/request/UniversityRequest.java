package pl.m4zek.springjwtrefreshrolemongo.payload.request;

import lombok.Data;

import java.util.List;

@Data
public class UniversityRequest {

    private String name;

    private String description;

    private String address;

    private String city;

    private String country;

    private String email;

    private String phoneNumber;

    private List<String> availableLanguages;

}
