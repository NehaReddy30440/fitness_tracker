import React, { useState, useEffect } from "react";
import "./RestTimer.css";

const RestTimer = ({ isActive, onTimerComplete }) => {
  const [timeLeft, setTimeLeft] = useState(90); // Default 90 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState(90);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsRunning(false);
            onTimerComplete && onTimerComplete();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimerComplete]);

  const startTimer = () => {
    setTimeLeft(customTime);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(customTime);
  };

  const addTime = (seconds) => {
    setTimeLeft(prev => prev + seconds);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((customTime - timeLeft) / customTime) * 100;
  };

  if (!isActive) return null;

  return (
    <div className="rest-timer">
      <div className="timer-header">
        <h4>Rest Timer</h4>
        <span className="timer-status">
          {isRunning ? "Running" : timeLeft === customTime ? "Ready" : "Paused"}
        </span>
      </div>

      <div className="timer-display">
        <div className="timer-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#e0e0e0"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#4bc0c0"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - getProgressPercentage() / 100)}`}
              transform="rotate(-90 60 60)"
              strokeLinecap="round"
            />
          </svg>
          <div className="timer-text">
            <div className="time-display">{formatTime(timeLeft)}</div>
            <div className="time-label">Rest Time</div>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <div className="quick-add-buttons">
          <button onClick={() => addTime(30)} className="quick-add-btn">+30s</button>
          <button onClick={() => addTime(60)} className="quick-add-btn">+1m</button>
          <button onClick={() => addTime(120)} className="quick-add-btn">+2m</button>
        </div>

        <div className="custom-time-input">
          <label>Custom Time:</label>
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(parseInt(e.target.value) || 90)}
            min="10"
            max="600"
            step="10"
          />
          <span>seconds</span>
        </div>
      </div>

      <div className="timer-buttons">
        {!isRunning && timeLeft === customTime ? (
          <button onClick={startTimer} className="timer-btn start-btn">
            Start Rest
          </button>
        ) : isRunning ? (
          <button onClick={pauseTimer} className="timer-btn pause-btn">
            Pause
          </button>
        ) : (
          <button onClick={startTimer} className="timer-btn resume-btn">
            Resume
          </button>
        )}
        <button onClick={resetTimer} className="timer-btn reset-btn">
          Reset
        </button>
      </div>

      {timeLeft === 0 && (
        <div className="timer-complete">
          <div className="complete-message">
            🎉 Rest time complete! Ready for next set!
          </div>
          <button onClick={() => setTimeLeft(customTime)} className="restart-btn">
            Start Next Rest
          </button>
        </div>
      )}
    </div>
  );
};

export default RestTimer;