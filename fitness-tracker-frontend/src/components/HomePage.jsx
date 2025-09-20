import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="welcome-box">
        <h1>💓 FitPulse - Your Fitness Journey Starts Here</h1>
        <p className="welcome-desc">
          Track your workouts, monitor progress, and achieve your fitness goals with
          our comprehensive fitness tracking platform.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 Track Workouts</h3>
            <p>Log exercises, sets, reps, and calories burned</p>
          </div>
          <div className="feature-card">
            <h3>📈 Progress Charts</h3>
            <p>Visualize your fitness journey with interactive charts</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Set Goals</h3>
            <p>Define and track your fitness objectives</p>
          </div>
          <div className="feature-card">
            <h3>📝 Workout History</h3>
            <p>Review all your past workouts and exercises</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Start Your Fitness Journey?</h2>
          <p className="cta-desc">
            Join thousands of users who are already tracking their fitness progress.
            Create your account to access all features and start building healthier habits today!
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-btn primary">
              Get Started Free
            </Link>
            <Link to="/login" className="cta-btn secondary">
              Already Have Account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
