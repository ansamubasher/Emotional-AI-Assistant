import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../styles/journal.css";
import "../styles/dashboard.css";
import Layout from "../components/Layout";
import girl from "../assets/girl-pt2.svg";
import PieChartComponent from "../components/PieChart";
import LineChartComponent from "../components/LineChart";

const Dashboard = () => {
  const [stressHistory, setStressHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const userId = user._id || user.id;
        const response = await axios.get(`http://localhost:3000/stress/history/${userId}`);
        if (response.data.success) {
          setStressHistory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching stress history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);


  return (
    <Layout>
      <div className="dashboard-content">
        <h1>Welcome Back!</h1>
        <br />

        <div className="charts-section">

          <div className="history-chart-section">
            <h2>Stress Level Progression</h2>
            {loading ? (
              <p>Loading chart...</p>
            ) : stressHistory.length > 0 ? (
              <LineChartComponent data={stressHistory} />
            ) : (
              <p>No history data available yet.</p>
            )}
          </div>

          <div className="eval-cards-row">
            <div className="eval-card">
              <h3>Evaluate Your Stress</h3>
              <p>Take our comprehensive AI-powered assessment to understand your current emotional state.</p>
              <button className="eval-btn" onClick={() => navigate("/stress-evaluation")}>
                Take Test Now
              </button>
            </div>

            <div className="eval-card">
              <h3>Lifestyle Recommendations</h3>
              <p>Get personalized recommendations based on your daily habits and lifestyle choices.</p>
              <button className="eval-btn" onClick={() => navigate("/lifestyle")}>
                Take Test Now
              </button>
            </div>
          </div>
        </div>


        <img src={girl} alt="girl" className="girl-img2" />
      </div>
    </Layout>
  );
};

export default Dashboard;
