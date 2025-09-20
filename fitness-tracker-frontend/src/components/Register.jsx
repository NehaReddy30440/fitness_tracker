import React, { useState } from 'react';
import api from '../api'; // path depends on your folder structure
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const Register = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register the user
      await api.post('/users/register', { name, email, password });

      // Automatically log in the user after successful registration
      const loginRes = await api.post('/users/login', { email, password });

      if (loginRes.data === 'Login successful!') {
        setIsLoggedIn(true);
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
      } else {
        setMessage('Registration successful! Please login manually.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              disabled={isLoading}
            />
          </div>
          <button className="auth-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
