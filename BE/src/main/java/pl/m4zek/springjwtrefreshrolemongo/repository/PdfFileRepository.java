package pl.m4zek.springjwtrefreshrolemongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.m4zek.springjwtrefreshrolemongo.model.PdfFile;

public interface PdfFileRepository extends MongoRepository<PdfFile, String> {

}
