package pl.m4zek.springjwtrefreshrolemongo.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("University")
@Getter
@Setter
@Builder
public class University {

    @Id
    private String id;

    private String name;

    private String description;

    private String address;

    private String city;

    private String country;

    private String email;

    private String phoneNumber;

    private List<String> availableLanguages;


}
