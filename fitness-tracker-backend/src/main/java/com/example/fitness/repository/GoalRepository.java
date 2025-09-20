package com.example.fitness.repository;

import com.example.fitness.model.Goal;
import com.example.fitness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByUserEmail(String email);

    List<Goal> findByUserAndAchieved(User user, boolean achieved);
}