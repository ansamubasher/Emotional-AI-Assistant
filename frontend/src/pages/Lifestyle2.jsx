import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import image from "../assets/Background.png";
import heart from "../assets/heart.png";
import "../styles/Lifestyle.css";

function Lifestyle2() {
  const navigate = useNavigate();
  const [screenTime, setScreenTime] = useState("");
  const [steps, setSteps] = useState("");
  const [caffeinIntake, setCaffeinIntake] = useState("");

  const handleSave = () => {
    console.log("Saving data...");
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="screen">
        <img src={image} alt="background" className="background" />
        
        {/* Floating Heart */}
        <img src={heart} alt="heart" className="floating-heart heart-1" style={{ top: '15%', left: '10%' }} />

        <h1>LIFESTYLE</h1>

        <div className="lifestyle-grid">
          {/* Card 1: Screen Time */}
          <div className="glass-card">
            <p className="card-title">SCREEN TIME</p>
            <p className="card-subtitle">Please enter your total screen time</p>
            <input 
              className="modern-input" 
              value={screenTime} 
              onChange={(e) => setScreenTime(e.target.value)} 
              placeholder="e.g. 4 hours"
            />
            <div className="button-grid">
              <button className="btn-choice">Yes</button>
              <button className="btn-choice">No</button>
            </div>
          </div>

          {/* Card 2: Physical Activity */}
          <div className="glass-card">
            <p className="card-title">PHYSICAL ACTIVITY</p>
            <p className="card-subtitle">Did you workout today? Enter steps below</p>
            <input 
              className="modern-input" 
              value={steps} 
              onChange={(e) => setSteps(e.target.value)} 
              placeholder="Total Steps"
            />
            <div className="button-grid">
              <button className="btn-choice">Yes</button>
              <button className="btn-choice">No</button>
            </div>
          </div>

          {/* Card 3: Meals & Caffeine */}
          <div className="glass-card">
            <p className="card-title">MEALS & CAFFEINE</p>
            <p className="card-subtitle">Any meal skipped?</p>
            <div className="button-grid" style={{ marginBottom: '20px' }}>
              <button className="btn-choice">YES</button>
              <button className="btn-choice">NO</button>
            </div>
            
            <p className="card-subtitle" style={{ marginBottom: '10px' }}>Caffeine Intake</p>
            <input 
              className="modern-input" 
              value={caffeinIntake} 
              onChange={(e) => setCaffeinIntake(e.target.value)} 
              placeholder="e.g. 2 cups"
            />
          </div>

          <button className="btn-nav" onClick={handleSave}>
            Confirm & Finish
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Lifestyle2;