import React from 'react';
import './landing.scss';
import placeholder from '../../assets/react.svg';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="top-bar">
        <div className="app-title">Banking App</div>
        <div className="action-buttons">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/register" className="signup-button">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="main-content">
        <div className="title-wrapper">
          <h1 className="main-title">
            <span className="highlighted-text">Banking App</span>
          </h1>
          <p className="sub-title">
            Fast, safe, social payments.
          </p>
          <p className="sub-title">
            Pay. Get paid. Shop. Share. Transfer money on the Banking App.
          </p>
        </div>
        <div className="placeholder-image">
          <img src={placeholder} alt="Placeholder" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
