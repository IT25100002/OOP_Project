package com.university.hometutor.Review;

import java.time.LocalDateTime;

import com.university.hometutor.usermanagement.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "app_reviews")
public class AppReview {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String reviewerName;
    
    @Column(nullable = false)
    private String reviewerEmail;
    
    @Column(nullable = false)
    private int rating;
    
    @Column(nullable = false)
    private String comment;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
}
