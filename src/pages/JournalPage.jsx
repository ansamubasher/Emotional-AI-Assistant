import "../styles/journal.css"; // reuse your background
import Layout from "../components/Layout";
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import ArrowButton from "../components/ArrowButton";
import "../styles/journal.css";
import heart from "../assets/heart.png";
import girl from "../assets/girl-pt3.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
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
    <Layout>
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
    </Layout>
  );
};


export default Dashboard;

