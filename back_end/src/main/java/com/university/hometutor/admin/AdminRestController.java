package com.university.hometutor.admin;

import com.university.hometutor.booking.Booking;
import com.university.hometutor.usermanagement.User;
import com.university.hometutor.booking.BookingService;
import com.university.hometutor.usermanagement.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * REST controller for admin operations.
 * Returns all bookings and allows status updates.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

    private final BookingService bookingService;
    private final UserService userService;

    public AdminRestController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    // -------------------------------------------------------------------
    // GET /api/admin/bookings
    // Returns all bookings in the system
    // -------------------------------------------------------------------
    @GetMapping("/bookings")
    public List<Map<String, Object>> getAllBookings() {
        return bookingService.getAllBookings().stream()
                .map(this::bookingToMap)
                .collect(Collectors.toList());
    }


    // -------------------------------------------------------------------
    // GET /api/admin/students
    // Returns all registered students
    // -------------------------------------------------------------------
    @GetMapping("/getStudents")
    public ResponseEntity<List<Map<String, Object>>> getAllStudents() {
        List<Map<String, Object>> result = userService.getAllStudents().stream()
                .map(this::studentToMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // -------------------------------------------------------------------
    // DELETE /api/admin/students/{id}
    // Deletes a student by ID
    // -------------------------------------------------------------------
    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        userService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student deleted successfully");
        return ResponseEntity.ok(response);
    }

    // -------------------------------------------------------------------
    // PUT /api/admin/bookings/{bookingId}/status
    // Body: { "status": "CONFIRMED" }
    // Allowed statuses: PENDING, CONFIRMED, COMPLETED, CANCELLED
    // -------------------------------------------------------------------
    @PutMapping("/bookings/{bookingId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> body) {

        String status = body.get("status");
        bookingService.updateBookingStatus(bookingId, status);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Status updated to " + status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable("id") Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
        } catch (Exception e) {
            // This will return a 404 if the booking wasn't found in the DB
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }



    private Map<String, Object> studentToMap(User student) {
        if (student == null) {
            return null; // or return Collections.emptyMap();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("id", student.getId());
        map.put("username", student.getUsername());
        map.put("name", student.getName());
        map.put("email", student.getEmail());
        map.put("role", student.getRole());
        return map;
    }

    private Map<String, Object> bookingToMap(Booking b) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", b.getId());
        map.put("bookingDate", b.getBookingDate().toString());
        map.put("status", b.getStatus());

        if (b.getStudent() != null) {
            Map<String, Object> s = new HashMap<>();
            s.put("id", b.getStudent().getId());
            s.put("username", b.getStudent().getUsername());
            s.put("name", b.getStudent().getName());
            s.put("email", b.getStudent().getEmail());
            map.put("student", s);
        }

        if (b.getTutor() != null) {
            Map<String, Object> t = new HashMap<>();
            t.put("id", b.getTutor().getId());
            t.put("subject", b.getTutor().getSubject());
            if (b.getTutor().getUser() != null) {
                t.put("username", b.getTutor().getUser().getUsername());
                t.put("name", b.getTutor().getUser().getName());
                t.put("email", b.getTutor().getUser().getEmail());
            }
            map.put("tutor", t);
        }

        return map;
    }
}
