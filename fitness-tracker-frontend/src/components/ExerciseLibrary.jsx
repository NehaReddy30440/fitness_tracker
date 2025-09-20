import React, { useState } from "react";
import "./ExerciseLibrary.css";

const ExerciseLibrary = ({ onSelectExercise }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const exerciseCategories = {
    chest: [
      { name: "Bench Press", muscle: "Chest", equipment: "Barbell", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Push-ups", muscle: "Chest", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false },
      { name: "Incline Dumbbell Press", muscle: "Chest", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Chest Flyes", muscle: "Chest", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Dips", muscle: "Chest", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false }
    ],
    back: [
      { name: "Pull-ups", muscle: "Back", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false },
      { name: "Deadlift", muscle: "Back", equipment: "Barbell", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Bent-over Rows", muscle: "Back", equipment: "Barbell", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Lat Pulldowns", muscle: "Back", equipment: "Machine", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Face Pulls", muscle: "Back", equipment: "Cable", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true }
    ],
    legs: [
      { name: "Squats", muscle: "Legs", equipment: "Barbell", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Lunges", muscle: "Legs", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Leg Press", muscle: "Legs", equipment: "Machine", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Romanian Deadlift", muscle: "Legs", equipment: "Barbell", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Calf Raises", muscle: "Legs", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false }
    ],
    shoulders: [
      { name: "Overhead Press", muscle: "Shoulders", equipment: "Barbell", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Lateral Raises", muscle: "Shoulders", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Front Raises", muscle: "Shoulders", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Rear Delt Flyes", muscle: "Shoulders", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Shrugs", muscle: "Shoulders", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true }
    ],
    arms: [
      { name: "Bicep Curls", muscle: "Biceps", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Tricep Extensions", muscle: "Triceps", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Hammer Curls", muscle: "Biceps", equipment: "Dumbbells", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true },
      { name: "Tricep Dips", muscle: "Triceps", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false },
      { name: "Preacher Curls", muscle: "Biceps", equipment: "Machine", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: true }
    ],
    cardio: [
      { name: "Running", muscle: "Full Body", equipment: "None", type: "cardio", requiresSets: false, requiresReps: false, requiresWeight: false },
      { name: "Cycling", muscle: "Legs", equipment: "Bike", type: "cardio", requiresSets: false, requiresReps: false, requiresWeight: false },
      { name: "Swimming", muscle: "Full Body", equipment: "Pool", type: "cardio", requiresSets: false, requiresReps: false, requiresWeight: false },
      { name: "Jump Rope", muscle: "Full Body", equipment: "Rope", type: "cardio", requiresSets: false, requiresReps: false, requiresWeight: false },
      { name: "Elliptical", muscle: "Full Body", equipment: "Machine", type: "cardio", requiresSets: false, requiresReps: false, requiresWeight: false }
    ],
    core: [
      { name: "Planks", muscle: "Core", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: false, requiresWeight: false },
      { name: "Russian Twists", muscle: "Core", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false },
      { name: "Leg Raises", muscle: "Core", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false },
      { name: "Bicycle Crunches", muscle: "Core", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false },
      { name: "Dead Bugs", muscle: "Core", equipment: "Bodyweight", type: "strength", requiresSets: true, requiresReps: true, requiresWeight: false }
    ]
  };

  const getAllExercises = () => {
    return Object.values(exerciseCategories).flat();
  };

  const getFilteredExercises = () => {
    let exercises = selectedCategory === "all"
      ? getAllExercises()
      : exerciseCategories[selectedCategory] || [];

    if (searchTerm) {
      exercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.muscle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return exercises;
  };

  const handleExerciseSelect = (exercise) => {
    onSelectExercise(exercise);
  };

  return (
    <div className="exercise-library">
      <div className="library-header">
        <h3>Exercise Library</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="category-tabs">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        {Object.keys(exerciseCategories).map(category => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="exercises-grid">
        {getFilteredExercises().map((exercise, index) => (
          <div
            key={index}
            className="exercise-card"
            onClick={() => handleExerciseSelect(exercise)}
          >
            <div className="exercise-icon">
              {exercise.equipment === "Bodyweight" ? "🏃‍♂️" :
               exercise.equipment === "Barbell" ? "🏋️‍♂️" :
               exercise.equipment === "Dumbbells" ? "💪" :
               exercise.equipment === "Machine" ? "⚙️" :
               exercise.equipment === "Cable" ? "🔗" : "🏃‍♂️"}
            </div>
            <div className="exercise-info">
              <h4>{exercise.name}</h4>
              <p className="muscle-group">{exercise.muscle}</p>
              <p className="equipment">{exercise.equipment}</p>
            </div>
            <button className="add-exercise-btn">+</button>
          </div>
        ))}
      </div>

      {getFilteredExercises().length === 0 && (
        <div className="no-results">
          <p>No exercises found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;