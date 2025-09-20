import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/dashboard?tab=profile");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <p className="logo">💓FitPulse</p>
      </Link>
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="nav-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="nav-btn">Register</button>
            </Link>
          </>
        ) : (
          <div className="profile-section" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="profile-icon">👤</span>
              <span className="profile-text">Profile</span>
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <button
                  className="dropdown-item"
                  onClick={handleProfileClick}
                >
                  <span className="item-icon">👨‍💼</span>
                  My Profile
                </button>
                <button
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  <span className="item-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
