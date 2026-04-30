package com.university.hometutor.usermanagement;

import com.university.hometutor.tutormanagement.TutorProfile;
import com.university.hometutor.usermanagement.User;
import com.university.hometutor.usermanagement.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String index() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String username, @RequestParam String password,
            HttpSession session, Model model) {
        User user = userService.loginUser(username, password);
        if (user != null) {
            session.setAttribute("loggedInUser", user);
            session.setAttribute("role", user.getRole());

            switch (user.getRole()) {
                case "ADMIN":
                    return "redirect:/admin/dashboard";
                case "TUTOR":
                    return "redirect:/tutor/dashboard";
                case "STUDENT":
                    return "redirect:/student/dashboard";
                default:
                    return "redirect:/login";
            }
        }
        model.addAttribute("error", "Invalid username or password");
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) Double hourlyRate,
            @RequestParam(required = false) String bio,
            Model model) {

        try {
            if ("TUTOR".equals(user.getRole())) {
                TutorProfile profile = new TutorProfile();
                profile.setSubject(subject);
                profile.setHourlyRate(hourlyRate);
                profile.setBio(bio);
                userService.registerTutor(user, profile);
            } else {
                // For Student and Admin (usually admin isn't registered publicly, but included
                // for simplicity)
                userService.registerUser(user);
            }
            return "redirect:/login?registered=true";
        } catch (Exception e) {
            model.addAttribute("error", "Registration failed. Username may already exist.");
            return "register";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
