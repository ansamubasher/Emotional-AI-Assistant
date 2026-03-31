import React, { useState } from "react";
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import ArrowButton from "../components/ArrowButton";
import "../styles/journal.css";

import bg from "../assets/Background.png";
import heart from "../assets/heart.png";
import girl from "../assets/girl-pt1.svg";

const JournalPage = () => {
  const [mode, setMode] = useState("text");
  const handleArrowClick = () => {
    console.log("Arrow clicked with mode:", mode);
  };

  return (
    <div
      className="journal-container"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="content">
        
        {/* Heart icon */}
        <img src={heart} alt="heart" className="heart-icon" />

        {/* Title */}
        <h1>Journal your day</h1>

        <p className="subtitle">Choose your style</p>

        {/* Toggle buttons */}
        <ToggleButtonGroup />

        <ArrowButton onClick={handleArrowClick} />
        

      </div>
      <img src={girl} alt="girl" className="girl-img" />
    </div>
  );
};

export default JournalPage;