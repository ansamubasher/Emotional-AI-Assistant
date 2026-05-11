import React from "react";
import "../styles/sidebar.css";
import logo from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if a path is active
    const isActive = (path) => location.pathname === path;

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
                    className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </div>

                <div
                    className={`menu-item ${isActive("/stress-evaluation") ? "active" : ""}`}
                    onClick={() => navigate("/stress-evaluation")}
                >
                    Stress Eval
                </div>


                <div
                    className={`menu-item ${isActive("/journal/text") ? "active" : ""}`}
                    onClick={() => navigate("/journal/text")}
                >
                    Journal
                </div>

                <div
                    className={`menu-item ${isActive("/lifestyle") || isActive("/lifestyle2") ? "active" : ""}`}
                    onClick={() => navigate("/lifestyle")}
                >
                    Log Habits
                </div>

                <div
                    className={`menu-item ${isActive("/empathy") ? "active" : ""}`}
                    onClick={() => navigate("/empathy")}
                >
                    Empathy Chat
                </div>
            </div>

            {/* Logout at the bottom */}
            <div className="sidebar-footer">
                <div className="logout-btn" onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/login");
                }}>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;