import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isAuthenticated, handleSignOut }) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        
        <ul className="navbar-menu">
        
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            {isAuthenticated ? (
              <button onClick={handleSignOut} className="navbar-button">
                Sign Out
              </button>
            ) : (
              <Link to="/auth/signin" className="navbar-link">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
