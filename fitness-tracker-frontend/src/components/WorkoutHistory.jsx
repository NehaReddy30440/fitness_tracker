import React, { useState, useEffect } from "react";
import "./WorkoutHistory.css";
import api from "../api";

const WorkoutHistory = () => {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  const fetchWorkoutLogs = async () => {
    try {
      const response = await api.get(`/workouts/${userEmail}`);
      console.log("Raw workout data:", response.data); // Debug log

      // Sort workouts by date (newest first)
      const sortedWorkouts = response.data.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );

      // Debug: Check if exercises are included
      sortedWorkouts.forEach(workout => {
        console.log(`Workout ${workout.id} exercises:`, workout.exercises);
      });

      setWorkoutLogs(sortedWorkouts);
    } catch (error) {
      console.error("Error fetching workout logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchWorkoutLogs();
    }
  }, [userEmail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleWorkoutExpansion = (workoutId) => {
    setExpandedWorkout(expandedWorkout === workoutId ? null : workoutId);
  };

  const getTotalStats = () => {
    const totalWorkouts = workoutLogs.length;
    const totalCalories = workoutLogs.reduce((sum, workout) => sum + (workout.calories || 0), 0);
    const totalDuration = workoutLogs.reduce((sum, workout) => sum + (workout.duration || 0), 0);

    return { totalWorkouts, totalCalories, totalDuration };
  };

  if (loading) {
    return (
      <div className="workout-history">
        <h3>Workout History</h3>
        <div className="loading">Loading your workout history...</div>
      </div>
    );
  }

  const { totalWorkouts, totalCalories, totalDuration } = getTotalStats();

  return (
    <div className="workout-history">
      <h3>💓 FitPulse - Your Workout History</h3>

      {/* Summary Stats */}
      <div className="history-summary">
        <div className="summary-stat">
          <span className="stat-number">{totalWorkouts}</span>
          <span className="stat-label">Total Workouts</span>
        </div>
        <div className="summary-stat">
          <span className="stat-number">{totalCalories.toLocaleString()}</span>
          <span className="stat-label">Total Calories</span>
        </div>
        <div className="summary-stat">
          <span className="stat-number">{totalDuration}</span>
          <span className="stat-label">Total Minutes</span>
        </div>
      </div>

      {/* Workout List */}
      <div className="workouts-list">
        {workoutLogs.length === 0 ? (
          <div className="no-workouts">
            <p>No workouts logged yet.</p>
            <p>Start logging your workouts to see your history here!</p>
          </div>
        ) : (
          workoutLogs.map((workout) => (
            <div key={workout.id} className="workout-card">
              <div
                className="workout-header"
                onClick={() => toggleWorkoutExpansion(workout.id)}
              >
                <div className="workout-info">
                  <h4 className="workout-name">{workout.name || "Workout"}</h4>
                  <span className="workout-date">{formatDate(workout.date)}</span>
                </div>
                <div className="workout-stats">
                  <span className="stat-item">
                    🔥 {workout.calories || 0} cal
                  </span>
                  <span className="stat-item">
                    ⏱️ {workout.duration || 0} min
                  </span>
                  <span className="expand-icon">
                    {expandedWorkout === workout.id ? "▼" : "▶"}
                  </span>
                </div>
              </div>

              {expandedWorkout === workout.id && workout.exercises && workout.exercises.length > 0 && (
                <div className="workout-details">
                  <h5>Exercises:</h5>
                  <div className="exercises-list">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="exercise-item">
                        <div className="exercise-info">
                          <span className="exercise-name">{exercise.name}</span>
                          {exercise.sets && exercise.reps && (
                            <span className="exercise-details">
                              {exercise.sets} sets × {exercise.reps} reps
                            </span>
                          )}
                          {exercise.weight && exercise.weight > 0 && (
                            <span className="exercise-weight">
                              @ {exercise.weight}kg
                            </span>
                          )}
                        </div>
                        <div className="exercise-metrics">
                          {exercise.duration && exercise.duration > 0 && (
                            <span className="metric">⏱️ {exercise.duration}min</span>
                          )}
                          {exercise.calories && exercise.calories > 0 && (
                            <span className="metric">🔥 {exercise.calories}cal</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutHistory;