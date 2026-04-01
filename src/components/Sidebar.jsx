import React, { useState } from "react";
import "../styles/sidebar.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [active, setActive] = useState("Dashboard");
    const navigate = useNavigate();
  return (
    <div className="sidebar">
      
      {/* Logo */}
      <div className="logo-section">
        <img src={logo} alt="logo" className="logo-img" />
        <span className="logo-text">Emence.pk</span>
      </div>

      {/* Menu */}
      <div className="menu">
        <div 
            className={`menu-item ${active === "Dashboard" ? "active" : ""}`}
            onClick={() => {
                setActive("Dashboard");
                navigate("/");
            }}
            >
            Dashboard
        </div>

        <div 
            className={`menu-item ${active === "Journal" ? "active" : ""}`}
            onClick={() => {
                setActive("Journal");
                navigate("/journal");
            }}
            >
            Journal ▾
        </div>

        <div 
            className={`submenu-item ${active === "Audio" ? "active" : ""}`}
            onClick={() => {
                setActive("Audio");
                navigate("/journal/audio-entry");
            }}
            >
            Audio
        </div>

        <div 
            className={`submenu-item ${active === "Text" ? "active" : ""}`}
            onClick={() => {
                setActive("Text");
                navigate("/journal/text-entry");
            }}
        >
            Text
        </div>

        <div 
            className={`menu-item ${active === "Log Habits" ? "active" : ""}`}
            onClick={() => {
                setActive("Log Habits");
                // navigate("/log-habits");
            }}
            >
            Log Habits
        </div>

        <div 
            className={`menu-item ${active === "View Profile" ? "active" : ""}`}
            onClick={() => {
                setActive("View Profile");
                // navigate("/view-profile");
            }}
            >
            View Profile
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;