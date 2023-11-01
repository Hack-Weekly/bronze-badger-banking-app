import React, { useState, useEffect } from "react";
import "./navbar.scss";
import placeholder from "../../assets/react.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the "access_token" cookie is present when the component mounts
    setIsLoggedIn(document.cookie.includes("access_token"));
  }, []);

  const checkAccessTokenCookie = () => {
    // Implement logic to check if the "access_token" cookie exists
    // Return true if it exists, otherwise return false
  };

  const fetchUserName = () => {
    // Implement a function to fetch the user's name from your API
    // Set the user's name in the state (userName)
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={placeholder} alt="" />
        <span>Banking App</span>
      </div>
      <div className="icons">
        {isLoggedIn ? (
          <div className="user">
            <img src={placeholder} alt="" />
            <span>{userName}</span>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              <button className="nav-button">Login</button>
            </Link>
            <Link to="/register" className="nav-link">
              <button className="nav-button">Signup</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
