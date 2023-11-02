import React, { useState, useEffect } from "react";
import "./navbar.scss";
import placeholder from "../../assets/react.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch the username when the component mounts
    async function fetchUsername() {
      try {
        const response = await axios.get("http://localhost:3000/auth/get-name", {
          withCredentials: true,
        });

        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    }

    fetchUsername();
  }, []);


  return (
    <div className="navbar">
      <div className="logo">
        <img src={placeholder} alt="" />
        <span>Banking App</span>
      </div>
      <div className="icons">
        {name}
      </div>
    </div>
  );
};

export default Navbar;
