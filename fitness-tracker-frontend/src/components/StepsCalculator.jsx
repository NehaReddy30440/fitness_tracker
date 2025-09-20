import React, { useState } from "react";
import "./StepsCalculator.css";

const StepsCalculator = () => {
  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateCalories = () => {
    const stepsNum = parseFloat(steps);
    const weightNum = parseFloat(weight);

    if (!stepsNum || !weightNum) {
      setCaloriesBurned(null);
      return;
    }

    // Rough estimate: 0.04 kcal/step for 70kg, scaled by weight
    const calories = stepsNum * 0.04 * (weightNum / 70);
    setCaloriesBurned(calories);
  };

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to m

    if (!weightNum || !heightNum) {
      setBmi(null);
      setBmiCategory("");
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue);

    // Determine BMI category
    if (bmiValue < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmiValue < 25) {
      setBmiCategory("Normal weight");
    } else if (bmiValue < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obese");
    }
  };

  return (
    <div className="steps-calculator">
      <h2>BMI & Steps Calculator</h2>

      {/* BMI Calculator Section */}
      <div className="bmi-section">
        <h3>Calculate BMI</h3>
        <div className="form">
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </label>
          <label>
            Height (cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
            />
          </label>
          <button onClick={calculateBMI}>Calculate BMI</button>
        </div>
        {bmi !== null && (
          <div className="bmi-result">
            <p><strong>BMI:</strong> {bmi.toFixed(2)}</p>
            <p><strong>Category:</strong> {bmiCategory}</p>
          </div>
        )}
      </div>

      {/* Steps to Calories Section */}
      <div className="steps-section">
        <h3>Convert Steps to Calories</h3>
        <div className="form">
          <label>
            Steps:
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Enter steps"
            />
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </label>
          <button onClick={calculateCalories}>Calculate Calories</button>
        </div>
        {caloriesBurned !== null && (
          <p>
            <strong>Estimated Calories Burned:</strong>{" "}
            {caloriesBurned.toFixed(2)} kcal
          </p>
        )}
      </div>
    </div>
  );
};

export default StepsCalculator;
