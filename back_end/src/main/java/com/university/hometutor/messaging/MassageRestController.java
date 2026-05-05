package com.university.hometutor.messaging;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.hometutor.messaging.Massage;
import com.university.hometutor.messaging.MassageService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = { "http://localhost:5173", "http://152.42.157.191",
        "https://hometutor-mu.vercel.app" }, originPatterns = { "https://*.vercel.app" })
public class MassageRestController {

    @Autowired
    private MassageService massageService;

    @PostMapping
    public Massage createMassage(@RequestBody Massage massage) {
        try {
            return massageService.createMassage(massage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send massage");
        }
    }

    @GetMapping("/getAllMassages")
    public List<Massage> getMassages() {
        try {
            return massageService.getMassages();
        } catch (Exception e) {
            throw new RuntimeException("Failed to get massages");
        }
    }

    @DeleteMapping("/{id}")
    public Massage deleteMassage(@PathVariable Long id) {
        try {
            massageService.deleteMassage(id);
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete massage");
        }
    }

    @PutMapping("/{id}/status")
    public Massage updateMassageStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> request) {
        try {
            String status = request.get("status");
            return massageService.updateMassageStatus(id, status);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update massage status");
        }
    }

}
