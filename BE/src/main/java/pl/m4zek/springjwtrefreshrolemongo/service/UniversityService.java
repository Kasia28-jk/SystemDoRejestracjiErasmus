package pl.m4zek.springjwtrefreshrolemongo.service;

import org.springframework.stereotype.Service;
import pl.m4zek.springjwtrefreshrolemongo.model.University;
import pl.m4zek.springjwtrefreshrolemongo.repository.UniversityRepository;

import java.util.List;

@Service
public class UniversityService {

    private final UniversityRepository universityRepository;

    public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    public void save(University university) throws Exception {
        if (universityRepository.existsUniversityByName(university.getName())) {
            throw new Exception("University with the name " + university.getName() + " already exists");
        }
        universityRepository.save(university);
    }

    public List<University> getAll(){
        return universityRepository.findAll();
    }

}
