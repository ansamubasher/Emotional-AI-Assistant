import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import ArrowButton from "../components/ArrowButton";
import "../styles/journal.css";
import Sidebar from "../components/Sidebar";
import bg from "../assets/Background.png";
import heart from "../assets/heart.png";
import girl from "../assets/girl-pt3.svg";

const JournalPage = () => {
  const [mode, setMode] = useState("Text");
  const navigate = useNavigate();

  const handleArrowClick = () => {
    if (mode=="Text") {
      navigate("/journal/text-entry");
    } 
    else if (mode=="Audio") {
      navigate("/journal/audio-entry");
    }
    else {
      alert("Please select an option first");
    }
  };

  return (
    <div className="external-container">
      <Sidebar />
    <div
      className="journal-container">
      <div className="content">
        
        {/* Heart icon */}
        <img src={heart} alt="heart" className="heart-icon" />

        {/* Title */}
        <h1>Journal your day</h1>

        <p className="subtitle">Choose your style</p>

        {/* Toggle buttons */}
        <ToggleButtonGroup mode={mode} setMode={setMode} />

        <ArrowButton onClick={handleArrowClick} />
        

      </div>
      <img src={girl} alt="girl" className="girl-img" />
    </div>
    </div>
  );
};

export default JournalPage;