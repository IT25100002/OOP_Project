package com.university.hometutor.usermanagement;

import com.university.hometutor.booking.Booking;
import com.university.hometutor.tutormanagement.TutorProfile;
import com.university.hometutor.usermanagement.User;
import com.university.hometutor.booking.BookingService;
import com.university.hometutor.tutormanagement.TutorService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private TutorService tutorService;

    @GetMapping("/dashboard")
    public String studentDashboard(HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null || !"STUDENT".equals(loggedInUser.getRole())) {
            return "redirect:/login";
        }

        List<Booking> bookings = bookingService.getBookingsForStudent(loggedInUser);
        model.addAttribute("bookings", bookings);

        return "student-dashboard";
    }

    @GetMapping("/book")
    public String showBookingPage(@RequestParam Long tutorId, HttpSession session, Model model) {
        if (session.getAttribute("loggedInUser") == null) {
            return "redirect:/login";
        }
        TutorProfile tutor = tutorService.getTutorById(tutorId);
        model.addAttribute("tutor", tutor);
        return "book-tutor";
    }

    @PostMapping("/book")
    public String bookTutor(@RequestParam Long tutorId, HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return "redirect:/login";
        }

        TutorProfile tutor = tutorService.getTutorById(tutorId);
        if (tutor != null) {
            bookingService.createBooking(loggedInUser.getId(), tutor.getId(), null, null);
            return "redirect:/student/dashboard?bookingSuccess=true";
        }
        return "redirect:/tutor/search";
    }
}
