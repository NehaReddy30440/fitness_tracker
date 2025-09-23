package com.example.fitness.controller;

import com.example.fitness.model.Goal;
import com.example.fitness.repository.GoalRepository;
import com.example.fitness.model.User;
import com.example.fitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5174"})
@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalRepository goalRepo;

    @Autowired
    private UserRepository userRepo;

    // Save goal for a user
    @PostMapping("/{email}")
    public Goal saveGoal(@PathVariable String email, @RequestBody Goal goal) {
        User user = userRepo.findByEmail(email);
        if (user == null) throw new RuntimeException("User not found with email: " + email);
        goal.setUser(user);
        return goalRepo.save(goal);
    }

    // Get all goals for a user
    @GetMapping("/{email}")
    public List<Goal> getUserGoals(@PathVariable String email) {
        List<Goal> goals = goalRepo.findByUserEmail(email);
        goals.forEach(goal -> goal.setUser(null)); // Remove user object
        return goals;
    }

    // Update goal achievement status
    @PutMapping("/{id}/achieved")
    public Goal updateGoalAchieved(@PathVariable Long id, @RequestParam boolean achieved) {
        Goal goal = goalRepo.findById(id).orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setAchieved(achieved);
        return goalRepo.save(goal);
    }

    // Delete goal
    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        goalRepo.deleteById(id);
    }
}