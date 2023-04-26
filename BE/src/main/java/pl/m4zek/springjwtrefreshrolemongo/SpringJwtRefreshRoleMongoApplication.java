package pl.m4zek.springjwtrefreshrolemongo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import pl.m4zek.springjwtrefreshrolemongo.model.Role;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.SignupRequest;
import pl.m4zek.springjwtrefreshrolemongo.service.RoleService;
import pl.m4zek.springjwtrefreshrolemongo.service.UserService;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
public class SpringJwtRefreshRoleMongoApplication {

    public static final Logger logger = LoggerFactory.getLogger(SpringJwtRefreshRoleMongoApplication.class);


    final UserService userService;


    final RoleService roleService;

    public SpringJwtRefreshRoleMongoApplication(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringJwtRefreshRoleMongoApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initDb(){
        logger.info("Initialize data in database");

        Role adminRole = roleService.save(new Role("ADMIN",
                "An Administrator provides office support to either an individual or " +
                        "team and is vital for the smooth-running of a business"));

        Role userRole =  roleService.save(new Role("USER",
                "A user role is a predefined category that can be assigned to " +
                        "users on the basis of their job title or some other criteria"));


        try {
            FileReader fr = new FileReader("src/main/resources/employee.csv");
            BufferedReader br = new BufferedReader(fr);
            Stream<String> lines = br.lines();

            lines.forEach(item -> {
                String[] user = item.split(",");
                List<String> roles = Arrays.asList(user[5].split("/"));
                try {
                    userService.save(new SignupRequest(user[0], user[1],user[2],user[3],user[4], roles));
                    logger.info("Employee add to database from file: " + user[0] + " " + user[1]);
                } catch (Exception e) {
                    logger.warn("Unable to add employee to database: {}", e.getMessage());
                }
            });
        } catch (IOException e) {
            logger.error("CSV read: {}", e.getMessage());
        }
    }
}
