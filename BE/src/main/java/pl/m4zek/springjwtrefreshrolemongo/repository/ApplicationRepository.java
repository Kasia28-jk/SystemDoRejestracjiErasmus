package pl.m4zek.springjwtrefreshrolemongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.m4zek.springjwtrefreshrolemongo.model.Application;

import java.util.Optional;

public interface ApplicationRepository extends MongoRepository<Application, String> {
    boolean existsByEmail(String email);

    Optional<Application> findByEmail(String email);

    boolean existsByOwnerId(String id);

    Optional<Application> findByOwnerId(String id);
}
