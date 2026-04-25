
import React, { useState } from "react";
import LoginCard from "../components/LoginCard";
import InputField from "../components/InputField";
import image from "../assets/imageee.jpg";
import "../styles/Signup.css"
function Signup() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSignup = () => {
        console.log("Signup successful")


    }
    return (
        <div className="Signup">
            <div
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
                Create your account!
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
                onClick={handleSignup}>
                Login
            </button>

        </div>


    );
}

export default Signup;
