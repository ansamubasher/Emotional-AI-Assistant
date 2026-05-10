import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import image from "../assets/Background.png";
import heart from "../assets/heart.png";
import "../styles/Lifestyle.css";

function Lifestyle() {
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="screen">
                <img src={image} alt="background" className="background" />
                
                {/* Floating Heart */}
                <img src={heart} alt="heart" className="floating-heart heart-1" />

                <h1>LIFESTYLE</h1>

                <div className="lifestyle-grid">
                    {/* Card 1: Sleep Hours */}
                    <div className="glass-card">
                        <p className="card-title">How many hours did you sleep?</p>
                        <div className="button-grid">
                            <button className="btn-choice" onClick={() => console.log("More than 8")}>More than 8</button>
                            <button className="btn-choice" onClick={() => console.log("8 hours")}>8 hours</button>
                            <button className="btn-choice" onClick={() => console.log("4-7 hours")}>4-7 hours</button>
                            <button className="btn-choice" onClick={() => console.log("Less than 4")}>Less than 4</button>
                        </div>
                    </div>

                    {/* Card 2: Sleep Time */}
                    <div className="glass-card">
                        <p className="card-title">When did you sleep?</p>
                        <div className="button-grid">
                            <button className="btn-choice" onClick={() => console.log("Late")}>Late</button>
                            <button className="btn-choice" onClick={() => console.log("Early")}>Early</button>
                        </div>
                    </div>

                    {/* Card 3: Sleep Quality */}
                    <div className="glass-card">
                        <p className="card-title">How well did you sleep?</p>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <span
                                    key={num}
                                    className="star"
                                    onClick={() => setRating(num)}
                                    style={{ color: num <= rating ? "gold" : "rgba(0,0,0,0.2)" }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="btn-nav" onClick={() => navigate("/lifestyle2")}>
                        Next →
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Lifestyle;