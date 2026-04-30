package com.university.hometutor.usermanagement.PasswordReset;

import lombok.Getter;

@Getter
public class forgetPasswordRequest {
    private String email;

    public void setEmail(String email) {
        this.email = email;
    }
}
