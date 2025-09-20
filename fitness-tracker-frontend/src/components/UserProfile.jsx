import React, { useState, useEffect } from "react";
import api from "../api";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/users/profile/${userEmail}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("Failed to load profile data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/profile/${userEmail}`, user);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchUserProfile(); // Reset to original data
    setMessage("");
  };

  const calculateBMI = () => {
    if (user.weight && user.height) {
      const heightInMeters = user.height / 100;
      const bmi = user.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return "N/A";
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="user-profile">
      <h3>User Profile</h3>

      {message && (
        <div className={`message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-section">
          <h4>Personal Information</h4>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={user.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              ) : (
                <span>{user.name || "Not set"}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>

            <div className="profile-field">
              <label>Age:</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={user.age || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              ) : (
                <span>{user.age || "Not set"}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Gender:</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <span>{user.gender || "Not set"}</span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h4>Physical Measurements</h4>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Weight (kg):</label>
              {isEditing ? (
                <input
                  type="number"
                  name="weight"
                  value={user.weight || ""}
                  onChange={handleInputChange}
                  placeholder="Enter weight in kg"
                  step="0.1"
                  min="1"
                />
              ) : (
                <span>{user.weight || "Not set"}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Height (cm):</label>
              {isEditing ? (
                <input
                  type="number"
                  name="height"
                  value={user.height || ""}
                  onChange={handleInputChange}
                  placeholder="Enter height in cm"
                  min="50"
                  max="250"
                />
              ) : (
                <span>{user.height || "Not set"}</span>
              )}
            </div>

            <div className="profile-field">
              <label>BMI:</label>
              <span>
                {calculateBMI()}{" "}
                {calculateBMI() !== "N/A" && (
                  <small className="bmi-category">
                    ({getBMICategory(parseFloat(calculateBMI()))})
                  </small>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn">
                Save Changes
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;