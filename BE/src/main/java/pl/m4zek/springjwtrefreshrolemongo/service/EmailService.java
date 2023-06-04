package pl.m4zek.springjwtrefreshrolemongo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pl.m4zek.springjwtrefreshrolemongo.model.Status;

@Service
@Slf4j
public class EmailService {


    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderMail;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmailWithNewApplicationStatus(String toEmail, String subject, Status status){

        StringBuilder text = new StringBuilder();
        switch (status){
            case APPROVED:
                text.append("Gratulujemy twoje zgłoszenie zostało rozpatrzone pozytywnie!");
                break;

            case REJECTED:
                text.append("Z przykrością informujemy, że twoje zgłoszenie zostało odrzucone");
                break;

            case DISCUSSED:
                text.append("Informujemy, że twoje zgłoszenie właśnie jest rozpatrywane.");
                break;

            case SUBMITTED:
                text.append("Dziękujemy za złożenie wniosku!");
                break;
        }

        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom(senderMail);
        email.setTo(toEmail);
        email.setSubject(subject);
        email.setText(text.toString());
        javaMailSender.send(email);
        log.info("Mail Send to " + toEmail);
    }
}
