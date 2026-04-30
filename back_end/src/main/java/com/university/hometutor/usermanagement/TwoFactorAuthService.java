package com.university.hometutor.usermanagement;

import com.university.hometutor.Util.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

@Service
public class TwoFactorAuthService {
    @Autowired
    private EmailService emailService;

    // Map to store email -> OTP
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public void generateAndSendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(email, otp);
        String subject = "Your 2FA Registration Code";
        String text = "Your verification code is: " + otp + "\n\nThis code will be used to complete your registration.";
        emailService.sendEmail(email, subject, text);
    }

    public boolean verifyOtp(String email, String otp) {
        if (email == null || otp == null) return false;
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // consume it
            return true;
        }
        return false;
    }
}
