package pl.m4zek.springjwtrefreshrolemongo;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import pl.m4zek.springjwtrefreshrolemongo.model.Role;
import pl.m4zek.springjwtrefreshrolemongo.payload.request.SignupRequest;
import pl.m4zek.springjwtrefreshrolemongo.service.RoleService;
import pl.m4zek.springjwtrefreshrolemongo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
            InputStreamReader inputStreamReader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream("employee.csv"));
            CSVReader reader = new CSVReader(inputStreamReader);
            String[] user;
            while ((user = reader.readNext()) != null) {
                try {
                    List<String> roles = Arrays.asList(user[5].split("/"));
                    userService.save(new SignupRequest(user[0], user[1],user[2],user[3],user[4], roles));
                } catch (Exception e){
                    logger.info("Initialize database: {}", e.getMessage());
                }
            }
        } catch (IOException | CsvException e) {
            logger.error("CSV read error: {}", e.getMessage());
        }
    }
}
