package pl.m4zek.springjwtrefreshrolemongo.payload.response;

import lombok.Data;
import pl.m4zek.springjwtrefreshrolemongo.model.Role;
import pl.m4zek.springjwtrefreshrolemongo.model.User;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserResponse {

    private String first_name;
    private String last_name;
    private List<String> roles;
    private String username;
    private String email;

    public UserResponse(User user){
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
