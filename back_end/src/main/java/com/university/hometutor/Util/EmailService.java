package com.university.hometutor.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        try {
            System.out.println("Attempting to send email to: " + to);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            message.setFrom("kavesha969@gmail.com");

            mailSender.send(message);
            
//            System.out.println("Email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("Error while sending email to " + to + ": " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e.getMessage() != null ? e.getMessage() : "Unknown error", e);
        }
    }

}
