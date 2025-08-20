import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import './SignUp.css';
import bikeImage from './bike.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    emailid: "",
    Password: "",
    phoneno: "",
    DOB: "",
    roleid: 2, // default role
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1250);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/users", formData);
      console.log("Signup successful:", res.data);
      const { token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("islogin", true);
      navigate("/home");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      {error && (
        <div className="popup-overlay">
          <p>{error}</p>
        </div>
      )}

      <div className="signup-left">
        <img src={bikeImage} alt="Motorbike Visual" className="signup-image" />
      </div>

      <div className="signup-right">
        <div className="signup-form-container">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="emailid"
                placeholder="Email"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                placeholder="Password"
                className="input-field"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phoneno"
                placeholder="Phone Number"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="date"
                name="DOB"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login" className="login-link-text">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
