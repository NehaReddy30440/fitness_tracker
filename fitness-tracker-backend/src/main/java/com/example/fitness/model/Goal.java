package com.example.fitness.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // e.g., "weekly_calories", "weight_loss", "workout_days"
    private String description;
    private double targetValue;
    private String unit; // e.g., "calories", "kg", "days"
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean achieved;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors
    public Goal() {}

    public Goal(String type, String description, double targetValue, String unit,
                LocalDate startDate, LocalDate endDate, User user) {
        this.type = type;
        this.description = description;
        this.targetValue = targetValue;
        this.unit = unit;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.achieved = false;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getTargetValue() { return targetValue; }
    public void setTargetValue(double targetValue) { this.targetValue = targetValue; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public boolean isAchieved() { return achieved; }
    public void setAchieved(boolean achieved) { this.achieved = achieved; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}