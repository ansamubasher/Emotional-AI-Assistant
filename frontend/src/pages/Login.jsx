
import React, { useState } from "react";
// componenets used
import LoginCard from "../components/LoginCard";
import InputField from "../components/InputField";
import image from "../assets/Background.png";
import "../styles/Login.css"
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
                    height: "100vh",
                    width: "100%",
                    margin: 0
                }}
            ></div>

            <div className="loginCard">
                <LoginCard />
            </div>

            <div className="input">
                <InputField />
            </div>
            <div className="input2">
                <InputField />
            </div>
            <h2>
                Welcome Back!
            </h2>
            <div className="username">
                <h3>
                    Username
                </h3>
            </div>

            <div className="passwordHeading">
                <h3>
                    Password
                </h3>
            </div>
            <button className="confirm"
                onClick={handleLogin}>
                Login
            </button>
        </div>


    );
}

export default Login;
