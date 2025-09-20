// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import CalorieCalculator from "./CalorieCalculator";
// import StepsCalculator from "./StepsCalculator";
// import WorkoutLogger from "./WorkoutLogger";
// import WeeklyProgressChart from "./WeeklyProgressChart"; // Import the Weekly Progress Chart
// import axios from "axios";

// const Dashboard = () => {
//   const [workoutLogs, setWorkoutLogs] = useState([]);
//   const userEmail = localStorage.getItem("userEmail"); // Get user email from localStorage

//   // Fetch user's workouts from backend
//   const fetchWorkoutLogs = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/workouts/${userEmail}`
//       );
//       console.log("Fetched workout logs:", response.data); // Log the fetched data
//       setWorkoutLogs(response.data); // Set the fetched workout logs
//     } catch (error) {
//       console.error("Error fetching workout logs:", error);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       fetchWorkoutLogs(); // Fetch workout logs on component mount
//     }
//   }, [userEmail]);

//   // Add new workout both locally and in DB
//   const handleAddWorkout = async (workout) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/workouts/${userEmail}`,
//         {
//           ...workout,
//           duration: parseInt(workout.duration),
//           calories: parseInt(workout.calories),
//           date: workout.date, // Include the date of the workout
//         }
//       );

//       console.log("Added workout:", response.data); // Log the response data

//       // Re-fetch workout logs after adding a new workout to update the chart
//       fetchWorkoutLogs(); // Re-fetch workout logs from the backend
//     } catch (error) {
//       console.error("Error saving workout:", error);
//     }
//   };

//   // Calculate total calories burned
//   const totalCaloriesBurned = workoutLogs.reduce(
//     (total, workout) => total + parseFloat(workout.calories || 0),
//     0
//   );

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-card">
//         <h1>Welcome Back, Champion – Your Progress Starts Here!</h1>
//         <p>
//           From reps to results, Fitness Tracker keeps you aligned and
//           accountable
//         </p>

//         <div className="dashboard-grid">
//           <div className="dashboard-widget">
//             <h3>Progress Chart</h3>
//             <WeeklyProgressChart workoutLogs={workoutLogs} />{" "}
//             {/* Pass workout logs to the chart */}
//           </div>

//           <div className="dashboard-widget">
//             <h3>Store your workout</h3>
//             <WorkoutLogger onAddWorkout={handleAddWorkout} />
//           </div>

//           <div className="dashboard-widget">
//             <CalorieCalculator />
//           </div>

//           <div className="dashboard-widget">
//             <StepsCalculator />
//           </div>
//         </div>

//         {/* <div className="calculators-row">
//           <CalorieCalculator />
//           <StepsCalculator />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// new Dashboard

// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import CalorieCalculator from "./CalorieCalculator";
// import StepsCalculator from "./StepsCalculator";
// import WorkoutLogger from "./WorkoutLogger";
// import WeeklyProgressChart from "./WeeklyProgressChart";
// import axios from "axios";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("chart");
//   const [workoutLogs, setWorkoutLogs] = useState([]);
//   const userEmail = localStorage.getItem("userEmail");

//   const fetchWorkoutLogs = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/workouts/${userEmail}`
//       );
//       setWorkoutLogs(response.data);
//     } catch (error) {
//       console.error("Error fetching workout logs:", error);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       fetchWorkoutLogs();
//     }
//   }, [userEmail]);

//   const handleAddWorkout = async (workout) => {
//     try {
//       await axios.post(`http://localhost:8080/api/workouts/${userEmail}`, {
//         ...workout,
//         duration: parseInt(workout.duration),
//         calories: parseInt(workout.calories),
//         date: workout.date,
//       });
//       fetchWorkoutLogs();
//     } catch (error) {
//       console.error("Error saving workout:", error);
//     }
//   };

//   const renderActiveWidget = () => {
//     switch (activeTab) {
//       case "chart":
//         return (
//           <div className="dashboard-widget">
//             <h3>Progress Chart</h3>
//             <WeeklyProgressChart workoutLogs={workoutLogs} />
//           </div>
//         );
//       case "log":
//         return (
//           <div className="dashboard-widget">
//             <h3>Store Your Workout</h3>
//             <WorkoutLogger onAddWorkout={handleAddWorkout} />
//           </div>
//         );
//       case "calories":
//         return (
//           <div className="dashboard-widget">
//             <CalorieCalculator />
//           </div>
//         );
//       case "steps":
//         return (
//           <div className="dashboard-widget">
//             <StepsCalculator />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-card">
//         <h1>Welcome Back, Champion – Your Progress Starts Here!</h1>
//         <p>
//           From reps to results, Fitness Tracker keeps you aligned and
//           accountable
//         </p>

//         <div className="dashboard-tabs">
//           <button onClick={() => setActiveTab("chart")}>Progress Chart</button>
//           <button onClick={() => setActiveTab("log")}>Record Workout</button>
//           <button onClick={() => setActiveTab("calories")}>
//             Calorie Calculator
//           </button>
//           <button onClick={() => setActiveTab("steps")}>BMI Calculator</button>
//         </div>

//         {renderActiveWidget()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// new updated
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import CalorieCalculator from "./CalorieCalculator";
import StepsCalculator from "./StepsCalculator";
import WorkoutLogger from "./WorkoutLogger";
import WeeklyProgressChart from "./WeeklyProgressChart";
import WorkoutHistory from "./WorkoutHistory";
import GoalSetter from "./GoalSetter";
import UserProfile from "./UserProfile";
import api from "../api";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "chart");
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  // Check authentication on component mount
  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
  }, [userEmail, navigate]);

  const fetchWorkoutLogs = async () => {
    try {
      const response = await api.get(`/workouts/${userEmail}`);
      setWorkoutLogs(response.data);
    } catch (error) {
      console.error("Error fetching workout logs:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchWorkoutLogs();
    }
  }, [userEmail]);

  // Handle URL parameter changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleAddWorkout = async (workout) => {
    try {
      const response = await api.post(`/workouts/${userEmail}`, {
        ...workout,
        duration: parseInt(workout.duration),
        calories: parseInt(workout.calories),
        date: workout.date,
      });
      fetchWorkoutLogs();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome Back to FitPulse!</h1>
        <p>
          Track your fitness journey, monitor progress, and achieve your goals with
          our comprehensive workout tracking platform.
        </p>

        <div className="dashboard-tab-buttons">
          <button
            onClick={() => handleTabChange("chart")}
            className={activeTab === "chart" ? "active" : ""}
          >
            Progress Chart
          </button>
          <button
            onClick={() => handleTabChange("logger")}
            className={activeTab === "logger" ? "active" : ""}
          >
            Workout Logger
          </button>
          <button
            onClick={() => handleTabChange("calories")}
            className={activeTab === "calories" ? "active" : ""}
          >
            Calorie Calculator
          </button>
          <button
            onClick={() => handleTabChange("steps")}
            className={activeTab === "steps" ? "active" : ""}
          >
            BMI & Steps Calculator
          </button>
          <button
            onClick={() => handleTabChange("goals")}
            className={activeTab === "goals" ? "active" : ""}
          >
            Set Goals
          </button>
          <button
            onClick={() => handleTabChange("history")}
            className={activeTab === "history" ? "active" : ""}
          >
            Workout History
          </button>
        </div>

        <div className="dashboard-widget">
          {activeTab === "chart" && (
            <>
              <h3>Progress Chart</h3>
              <WeeklyProgressChart workoutLogs={workoutLogs} />
            </>
          )}
          {activeTab === "logger" && (
            <>
              <h3>Store Your Workout</h3>
              <WorkoutLogger onAddWorkout={handleAddWorkout} />
            </>
          )}
          {activeTab === "calories" && <CalorieCalculator />}
          {activeTab === "steps" && <StepsCalculator />}
          {activeTab === "goals" && <GoalSetter />}
          {activeTab === "history" && <WorkoutHistory />}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
