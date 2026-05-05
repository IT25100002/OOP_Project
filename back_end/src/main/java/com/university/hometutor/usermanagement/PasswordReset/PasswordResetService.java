package com.university.hometutor.usermanagement.PasswordReset;

import com.university.hometutor.Util.EmailService;
import com.university.hometutor.usermanagement.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PasswordResetService {

    private Map<String, String> tokenStore = new HashMap<>();

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    public void ForgotPassword(String email) {

        // 1. Generate token
        String token = UUID.randomUUID().toString();

        // 2. Store token (token → email)
        tokenStore.put(token, email);
        // System.out.println("Generated token: " + token);

        // 3. Create reset link
        String resetLink = "http://localhost:5173/PasswordReset?token=" + token;

        // 4. Send email
        String subject = "Password Reset Request Hometutor User ";
        String message = "Click the link to reset your password:\n" + resetLink;

        emailService.sendEmail(email, subject, message);
    }

    public String validateToken(String token) {

        return tokenStore.get(token);
    }

    public void removeToken(String token) {
        tokenStore.remove(token);
    }


}
