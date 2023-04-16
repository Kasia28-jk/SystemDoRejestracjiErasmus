package pl.m4zek.springjwtrefreshrolemongo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class RefreshTokenException extends RuntimeException{
    public RefreshTokenException(String token, String message){
        super("Failed for (" + token + "): " + message);
    }
}
