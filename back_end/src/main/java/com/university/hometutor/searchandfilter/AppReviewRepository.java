package com.university.hometutor.searchandfilter;

import java.util.List;

import com.university.hometutor.tutormanagement.TutorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import com.university.hometutor.searchandfilter.AppReview;
import com.university.hometutor.usermanagement.User;


public interface AppReviewRepository extends JpaRepository<AppReview, Long> {

    List<AppReview> findByUser(User user);


}
