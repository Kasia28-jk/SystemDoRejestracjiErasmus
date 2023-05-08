package pl.m4zek.springjwtrefreshrolemongo.payload.request;

import lombok.Data;

@Data
public class StatusUpdateRequest {

    private String applicationId;

    private String status;

}
