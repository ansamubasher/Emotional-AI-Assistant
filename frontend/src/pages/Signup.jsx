import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import "../styles/Signup.css";
import Background from "../assets/Background.png";

import LoginCard from "../components/LoginCard";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Sending to server:", formData);
      const response = await axios.post("http://localhost:3000/auth/register", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupPage">
      <img src={Background} className="signupBg" alt="" />

      <div className="loginCard">
        <LoginCard />
      </div>

      <h2 className="signupTitle">Create your account!</h2>

      <form onSubmit={handleSignup} className="signupFormAbsolute">
        {error && <p className="errorMsgAbsolute">{error}</p>}
        
        <div className="signupFieldsContainer">
          <div className="fieldItem">
            <label>Name</label>
            <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
          </div>

          <div className="fieldItem">
            <label>Email</label>
            <InputField name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </div>

          <div className="fieldItem">
            <label>Password</label>
            <InputField name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </div>

          <div className="signupRow">
            <div className="fieldItem half">
              <label>Age</label>
              <InputField name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
            </div>
            <div className="fieldItem half">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="genderSelectSignup">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <button className="confirm" type="submit" disabled={loading}>
          {loading ? "..." : "Sign Up"}
        </button>

        <p className="loginRedirectAbsolute">
          Already have an account?{" "}
          <Link to="/login" className="loginLink">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
