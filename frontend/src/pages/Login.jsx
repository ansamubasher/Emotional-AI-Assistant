import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// components used
import LoginCard from "../components/LoginCard";
import InputField from "../components/InputField";
import image from "../assets/Background.png";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        console.log("Login successful");
        navigate("/"); // Redirect to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPage">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${image})`,
          height: "100vh",
          width: "100%",
          margin: 0,
        }}
      ></div>

      <div className="loginCard">
        <LoginCard />
      </div>

      <form onSubmit={handleLogin}>
        <div className="input">
          <InputField
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input2">
          <InputField
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <h2>Welcome Back!</h2>
        <div className="username">
          <h3>Email</h3>
        </div>

        <div className="passwordHeading">
          <h3>Password</h3>
        </div>

        {error && (
          <div style={{ 
            position: "absolute", 
            top: "68%", 
            left: "50%", 
            transform: "translateX(-50%)", 
            color: "red", 
            fontWeight: "bold",
            zIndex: 1
          }}>
            {error}
          </div>
        )}

        <button 
          className="confirm" 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
