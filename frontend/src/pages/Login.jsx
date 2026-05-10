import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// components used
import LoginCard from "../components/LoginCard";
import InputField from "../components/InputField";
import image from "../assets/Background.png";
import "../styles/Login.css";

function Login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {
        console.log("Login successful")


    }
    return (
        <div className="LoginPage">

            <div classNmae="bg"
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
