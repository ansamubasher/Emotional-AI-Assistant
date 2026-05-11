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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPage">
      <div className="bg"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          margin: 0
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
            zIndex: 10,
            width: "80%",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <button
          className="loginConfirm"
          type="submit"
          disabled={loading}
        >
          {loading ? "..." : "Login"}
        </button>

        <p className="signupRedirect" style={{
          position: "absolute",
          top: "85%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "Inter",
          fontSize: "13px",
          color: "#444",
          whiteSpace: "nowrap"
        }}>
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/")} 
            style={{ color: "#ab90fc", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
