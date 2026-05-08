import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import image from "../assets/Background.png";
import "../styles/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "Male"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/auth/register", formData);

      if (response.data.success) {
        console.log("Signup successful");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignupPage">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${image})`,
          height: "100vh",
          width: "100%",
          margin: 0,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1
        }}
      ></div>

      <div className="signupContainer">

        <form onSubmit={handleSignup} className="signupForm">
          <h2>Create your account!</h2>

          <div className="formGroup">
            <label>Name</label>
            <InputField
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Email</label>
            <InputField
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Password</label>
            <InputField
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="formRow">
            <div className="formGroup half">
              <label>Age</label>
              <InputField
                name="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup half">
              <label>Gender</label>
              <select
                name="gender"
                className="genderSelect"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {error && <div className="errorMessage">{error}</div>}

          <button
            className="signupButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="loginLink" onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
