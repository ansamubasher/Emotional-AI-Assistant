import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/Background.png";
import heart from "../assets/heart.png";
import "../styles/StressEvaluation.css"; // Reuse some styles

const StressPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stressData, setStressData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLatestResult();
    }, []);

    const fetchLatestResult = async () => {
        try {
            const userString = localStorage.getItem("user");
            if (!userString) {
                navigate("/login");
                return;
            }
            const user = JSON.parse(userString);
            const userId = user._id || user.id;

            const response = await axios.get(`http://localhost:3000/stress/latest-result/${userId}`);
            if (response.data.success) {
                setStressData(response.data.data);
            } else {
                setError("No results found. Please take the stress evaluation first.");
            }
        } catch (err) {
            console.error("Error fetching stress result:", err);
            setError("Failed to load results. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const getStressColor = (level) => {
        switch (level?.toLowerCase()) {
            case "low": return "#10b981"; // Emerald
            case "medium": return "#f59e0b"; // Amber
            case "high": return "#ef4444"; // Red
            default: return "#6b7280";
        }
    };

    return (
        <Layout>
            <div className="stress-screen">
                <img src={image} alt="background" className="stress-background" />
                
                {/* Decorative Elements */}
                <img src={heart} alt="heart" className="stress-heart" style={{ top: '15%', left: '8%' }} />
                <img src={heart} alt="heart" className="stress-heart" style={{ bottom: '20%', right: '10%', transform: 'scale(0.8)' }} />

                <h1 className="stress-title">YOUR STRESS ANALYSIS</h1>

                <div className="results-container" style={{
                    position: "relative",
                    zIndex: 10,
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "40px 20px"
                }}>
                    {loading ? (
                        <div className="stress-card" style={{ margin: "0 auto" }}>
                            <p className="q-title">Analyzing your results...</p>
                        </div>
                    ) : error ? (
                        <div className="stress-card" style={{ margin: "0 auto" }}>
                            <p className="q-title" style={{ color: "#ef4444" }}>{error}</p>
                            <button className="btn-next" onClick={() => navigate("/stress-evaluation")} style={{ marginTop: "20px" }}>
                                Take Evaluation
                            </button>
                        </div>
                    ) : (
                        <div className="stress-card" style={{ 
                            margin: "0 auto", 
                            maxWidth: "600px", 
                            padding: "50px",
                            animation: "fadeInUp 0.8s ease-out"
                        }}>
                            <h2 style={{ fontSize: "1.5rem", color: "#4c1d95", marginBottom: "10px" }}>Predicted Stress Level</h2>
                            
                            <div className="stress-level-badge" style={{
                                fontSize: "3.5rem",
                                fontWeight: "900",
                                color: getStressColor(stressData.stress_level),
                                margin: "20px 0",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                textShadow: `0 0 20px ${getStressColor(stressData.stress_level)}44`
                            }}>
                                {stressData.stress_level || "Unknown"}
                            </div>

                            {stressData.confidence && (
                                <div className="confidence-metrics" style={{ width: "100%", marginTop: "30px" }}>
                                    <p style={{ fontWeight: "600", color: "#6b7280", marginBottom: "15px" }}>Confidence Breakdown</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {Object.entries(stressData.confidence).map(([level, value]) => (
                                            <div key={level} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                                <span style={{ width: "80px", textAlign: "right", fontWeight: "600", color: "#4c1d95" }}>{level}</span>
                                                <div style={{ flex: 1, height: "10px", background: "rgba(0,0,0,0.05)", borderRadius: "5px", overflow: "hidden" }}>
                                                    <div style={{ 
                                                        width: `${value * 100}%`, 
                                                        height: "100%", 
                                                        background: getStressColor(level),
                                                        borderRadius: "5px",
                                                        transition: "width 1s ease-out"
                                                    }}></div>
                                                </div>
                                                <span style={{ width: "45px", fontWeight: "700" }}>{Math.round(value * 100)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button className="btn-next" onClick={() => navigate("/dashboard")} style={{ marginTop: "40px", width: "100%" }}>
                                Back to Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default StressPage;
