import React, { useState, useEffect } from "react";
import api from "../api";
import "./GoalSetter.css";

const GoalSetter = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    type: "weekly_calories",
    description: "",
    targetValue: "",
    unit: "calories",
    startDate: "",
    endDate: "",
  });
  const userEmail = localStorage.getItem("userEmail");

  const goalTypes = [
    { value: "weekly_calories", label: "Weekly Calories Burned", unit: "calories" },
    { value: "monthly_workouts", label: "Monthly Workouts", unit: "workouts" },
    { value: "weight_loss", label: "Weight Loss", unit: "kg" },
    { value: "daily_steps", label: "Daily Steps", unit: "steps" },
  ];

  const fetchGoals = async () => {
    try {
      const response = await api.get(`/goals/${userEmail}`);
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchGoals();
    }
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (e) => {
    const selectedType = goalTypes.find(type => type.value === e.target.value);
    setNewGoal((prev) => ({
      ...prev,
      type: e.target.value,
      unit: selectedType ? selectedType.unit : "calories",
    }));
  };

  const addGoal = async () => {
    if (!newGoal.description || !newGoal.targetValue || !newGoal.startDate || !newGoal.endDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await api.post(`/goals/${userEmail}`, newGoal);
      setNewGoal({
        type: "weekly_calories",
        description: "",
        targetValue: "",
        unit: "calories",
        startDate: "",
        endDate: "",
      });
      fetchGoals();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const toggleGoalAchieved = async (goalId, achieved) => {
    try {
      await api.put(`/goals/${goalId}/achieved?achieved=${!achieved}`);
      fetchGoals();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      await api.delete(`/goals/${goalId}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="goal-setter">
      <h3>Set Your Fitness Goals</h3>

      <div className="goal-form">
        <div className="form-row">
          <select name="type" value={newGoal.type} onChange={handleTypeChange}>
            {goalTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <input
            type="text"
            name="description"
            value={newGoal.description}
            onChange={handleInputChange}
            placeholder="Goal description"
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="targetValue"
            value={newGoal.targetValue}
            onChange={handleInputChange}
            placeholder={`Target value (${newGoal.unit})`}
          />
        </div>

        <div className="form-row">
          <input
            type="date"
            name="startDate"
            value={newGoal.startDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="endDate"
            value={newGoal.endDate}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={addGoal} className="add-goal-btn">
          Add Goal
        </button>
      </div>

      <div className="goals-list">
        <h4>Your Goals</h4>
        {goals.length === 0 ? (
          <p>No goals set yet.</p>
        ) : (
          <ul>
            {goals.map((goal) => (
              <li key={goal.id} className={`goal-item ${goal.achieved ? "achieved" : ""}`}>
                <div className="goal-content">
                  <h5>{goal.description}</h5>
                  <p>
                    Target: {goal.targetValue} {goal.unit}
                  </p>
                  <p>
                    {new Date(goal.startDate).toLocaleDateString()} -{" "}
                    {new Date(goal.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="goal-actions">
                  <button
                    onClick={() => toggleGoalAchieved(goal.id, goal.achieved)}
                    className={`achieve-btn ${goal.achieved ? "unachieve" : ""}`}
                  >
                    {goal.achieved ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoalSetter;