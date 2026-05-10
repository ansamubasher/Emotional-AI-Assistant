import React, { useState } from "react";
import LoginCard from "../components/LoginCard";
import InputField from "../components/InputField";
import "../styles/Signup.css";
import Background from "../assets/Background.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup successful");
  };

  return (
    <div className="screen">

      <img src={Background} className="background" alt="" />

      <div className="loginCard">
        <LoginCard />
      </div>

      <div className="input">
        <InputField />
      </div>

      <div className="input2">
        <InputField />
      </div>

      <h2>Create your account!</h2>

      <div className="username">
        <h3>Username</h3>
      </div>

      <div className="passwordHeading">
        <h3>Password</h3>
      </div>

      <button className="confirm" onClick={handleSignup}>
        Login
      </button>

    </div>
  );
}

export default Signup;
