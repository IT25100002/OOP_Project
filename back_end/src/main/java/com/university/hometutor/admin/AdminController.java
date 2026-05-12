package com.university.hometutor.admin;

import com.university.hometutor.booking.Booking;
import com.university.hometutor.usermanagement.User;
import com.university.hometutor.booking.BookingService;
import com.university.hometutor.usermanagement.UserService;
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
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/dashboard")
    public String adminDashboard(HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null || !"ADMIN".equals(loggedInUser.getRole())) {
            return "redirect:/login";
        }

        List<Booking> allBookings = bookingService.getAllBookings();
        model.addAttribute("bookings", allBookings);

        return "admin-dashboard";
    }

    @PostMapping("/updateBookingStatus")
    public String updateBookingStatus(@RequestParam Long bookingId,
            @RequestParam String status,
            HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null
                && ("ADMIN".equals(loggedInUser.getRole()) || "TUTOR".equals(loggedInUser.getRole()))) {
            bookingService.updateBookingStatus(bookingId, status);
        }

        if ("TUTOR".equals(loggedInUser.getRole())) {
            return "redirect:/tutor/dashboard";
        }
        return "redirect:/admin/dashboard";
    }
}
