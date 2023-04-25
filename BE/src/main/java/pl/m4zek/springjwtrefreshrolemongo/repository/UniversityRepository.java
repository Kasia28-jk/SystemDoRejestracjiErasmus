package pl.m4zek.springjwtrefreshrolemongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.m4zek.springjwtrefreshrolemongo.model.University;

public interface UniversityRepository extends MongoRepository<University,String> {

    Boolean existsUniversityByName(String name);

}
