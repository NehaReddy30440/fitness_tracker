package com.example.fitness.repository;

import com.example.fitness.model.WorkoutLog;
import com.example.fitness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {

    // Fetch workouts by user email
    List<WorkoutLog> findByUserEmail(String email);

    // Fetch workouts by user and within a date range
    List<WorkoutLog> findByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);

    // Fetch workouts with exercises eagerly loaded
    @Query("SELECT w FROM WorkoutLog w LEFT JOIN FETCH w.exercises WHERE w.user.email = :email ORDER BY w.date DESC")
    List<WorkoutLog> findByUserEmailWithExercises(String email);
}
