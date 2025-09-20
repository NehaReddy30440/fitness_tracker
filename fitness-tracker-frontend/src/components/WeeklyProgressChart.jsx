// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./WeeklyProgressChart.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const WeeklyProgressChart = ({ workoutLogs }) => {
//   // Initialize an array to store calories for each day of the week (Sun-Sat)
//   const weeklyCalories = [0, 0, 0, 0, 0, 0, 0]; // Sunday-Saturday

//   // Process workout logs to calculate weekly calories
//   workoutLogs.forEach((workout) => {
//     const date = new Date(workout.date); // Assuming the workout data has a date field
//     const weekDay = date.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)

//     // Ensure calories is a number, fallback to 0 if not
//     const calories = parseFloat(workout.calories) || 0;

//     // Add calories to the corresponding day
//     weeklyCalories[weekDay] += calories;
//   });

//   // Prepare the chart data
//   const chartData = {
//     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     datasets: [
//       {
//         label: "Total calories used",
//         data: weeklyCalories,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         fill: true,
//       },
//     ],
//   };

//   return (
//     // <div>
//     //   <Line data={chartData} />
//     // </div>
//     <div className="weekly-progress-chart">
//       <h3>Weekly Calorie Burn</h3>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default WeeklyProgressChart;

import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./WeeklyProgressChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyProgressChart = ({ workoutLogs }) => {
  const [chartType, setChartType] = useState("bar");
  const [metric, setMetric] = useState("calories");
  const [period, setPeriod] = useState("weekly");

  const processData = () => {
    if (period === "weekly") {
      const data = [0, 0, 0, 0, 0, 0, 0]; // Sunday-Saturday
      workoutLogs.forEach((workout) => {
        const date = new Date(workout.date);
        const weekDay = date.getDay();
        const value = parseFloat(workout[metric]) || 0;
        data[weekDay] += value;
      });
      return {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        data,
      };
    } else {
      // Monthly data - last 12 months
      const monthlyData = {};
      const now = new Date();
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthlyData[key] = 0;
      }

      workoutLogs.forEach((workout) => {
        const date = new Date(workout.date);
        const key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (monthlyData.hasOwnProperty(key)) {
          monthlyData[key] += parseFloat(workout[metric]) || 0;
        }
      });

      return {
        labels: Object.keys(monthlyData),
        data: Object.values(monthlyData),
      };
    }
  };

  const { labels, data } = processData();

  const chartData = {
    labels,
    datasets: [
      {
        label: `Total ${metric} ${period === "weekly" ? "this week" : "by month"}`,
        data,
        backgroundColor: chartType === "bar" ? "rgba(75, 192, 192, 0.6)" : "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: chartType === "line",
      },
    ],
  };

  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <div className="weekly-progress-chart">
      <h3>Progress Chart</h3>

      <div className="chart-controls">
        <div className="control-group">
          <label>Chart Type:</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>

        <div className="control-group">
          <label>Metric:</label>
          <select value={metric} onChange={(e) => setMetric(e.target.value)}>
            <option value="calories">Calories</option>
            <option value="duration">Duration (min)</option>
          </select>
        </div>

        <div className="control-group">
          <label>Period:</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <ChartComponent data={chartData} />
    </div>
  );
};

export default WeeklyProgressChart;
