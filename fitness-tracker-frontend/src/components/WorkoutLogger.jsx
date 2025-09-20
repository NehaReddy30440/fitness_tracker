import React, { useState } from "react";
import "./WorkoutLogger.css";
import ExerciseLibrary from "./ExerciseLibrary";

const WorkoutLogger = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState({
    name: "",
    date: "",
    exercises: [],
  });

  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    calories: "",
    notes: "",
  });

  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExerciseChange = (e) => {
    const { name, value } = e.target;
    setCurrentExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExerciseSelect = (exercise) => {
    setCurrentExercise((prev) => ({
      ...prev,
      name: exercise.name,
    }));
    setShowExerciseLibrary(false);
  };


  const addExercise = () => {
    // Only require exercise name, make all other fields optional
    if (!currentExercise.name.trim()) {
      alert("Please enter an exercise name.");
      return;
    }

    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { ...currentExercise }],
    }));

    setCurrentExercise({
      name: "",
      sets: "",
      reps: "",
      weight: "",
      duration: "",
      calories: "",
      notes: "",
    });
  };

  const removeExercise = (index) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const calculateTotals = () => {
    const totalDuration = workout.exercises.reduce(
      (sum, ex) => sum + parseInt(ex.duration || 0),
      0
    );
    const totalCalories = workout.exercises.reduce(
      (sum, ex) => sum + parseInt(ex.calories || 0),
      0
    );
    return { totalDuration, totalCalories };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workout.name && workout.date && workout.exercises.length > 0) {
      const { totalDuration, totalCalories } = calculateTotals();
      const workoutData = {
        ...workout,
        duration: totalDuration,
        calories: totalCalories,
      };
      onAddWorkout(workoutData);
      setWorkout({ name: "", date: "", exercises: [] });
      setCurrentExercise({
        name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        calories: "",
        notes: "",
      });
    } else {
      alert("Please fill in workout name, date, and add at least one exercise.");
    }
  };

  const { totalDuration, totalCalories } = calculateTotals();

  return (
    <div className="workout-logger">
      <h3>Log Your Workout</h3>
      <form onSubmit={handleSubmit} className="workout-form">
        <div className="workout-header">
          <div className="form-group">
            <label>Workout Name:</label>
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={handleWorkoutChange}
              placeholder="e.g. Upper Body Workout"
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={workout.date}
              onChange={handleWorkoutChange}
              required
            />
          </div>
        </div>

        <div className="exercise-input-header">
          <h4>Add Exercises</h4>
          <button
            type="button"
            onClick={() => setShowExerciseLibrary(!showExerciseLibrary)}
            className="library-toggle-btn"
          >
            {showExerciseLibrary ? "Hide Library" : "Browse Exercises"}
          </button>
        </div>

        {showExerciseLibrary && (
          <div className="exercise-library-section">
            <ExerciseLibrary onSelectExercise={handleExerciseSelect} />
          </div>
        )}

        <div className="exercise-input">
          <div className="exercise-row">
            <div className="exercise-name-group">
              <input
                type="text"
                name="name"
                value={currentExercise.name}
                onChange={handleExerciseChange}
                placeholder="Exercise name"
                className="exercise-name-input"
              />
            </div>

            <input
              type="number"
              name="sets"
              value={currentExercise.sets}
              onChange={handleExerciseChange}
              placeholder="Sets"
              min="1"
              className="small-input"
            />

            <input
              type="number"
              name="reps"
              value={currentExercise.reps}
              onChange={handleExerciseChange}
              placeholder="Reps"
              min="1"
              className="small-input"
            />

            <input
              type="number"
              name="weight"
              value={currentExercise.weight}
              onChange={handleExerciseChange}
              placeholder="Weight (kg)"
              step="0.5"
              className="small-input"
            />

            <input
              type="number"
              name="duration"
              value={currentExercise.duration}
              onChange={handleExerciseChange}
              placeholder="Duration (min)"
              min="0"
              className="small-input"
            />

            <input
              type="number"
              name="calories"
              value={currentExercise.calories}
              onChange={handleExerciseChange}
              placeholder="Calories"
              min="0"
              className="small-input"
            />

            <button type="button" onClick={addExercise} className="add-btn">
              Add Exercise
            </button>
          </div>

          <div className="exercise-notes">
            <textarea
              name="notes"
              value={currentExercise.notes}
              onChange={handleExerciseChange}
              placeholder="Add notes (optional) - e.g., felt great, increase weight next time"
              rows="2"
            />
          </div>
        </div>

        <div className="exercises-list">
          <h4>Exercises in this Workout:</h4>
          {workout.exercises.length === 0 ? (
            <p>No exercises added yet.</p>
          ) : (
            <ul>
              {workout.exercises.map((exercise, index) => (
                <li key={index} className="exercise-item">
                  <span>
                    {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight && ` @ ${exercise.weight}kg`}
                    {exercise.duration && ` (${exercise.duration}min)`}
                    {exercise.calories && ` - ${exercise.calories} cal`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="workout-summary">
          <p><strong>Total Duration:</strong> {totalDuration} minutes</p>
          <p><strong>Total Calories:</strong> {totalCalories}</p>
        </div>

        <button type="submit" className="submit-btn">
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutLogger;
