import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginPage.css'; // Import the custom CSS file
import bikeImage from './bike.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailid, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 1250); // 3 seconds

      return () => clearTimeout(timer); // cleanup if component re-renders
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        emailid,
        Password: password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("islogin", true);
      localStorage.setItem("userEmail", emailid);
      console.log("Login successful");
      navigate("/home");

    }  catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      console.error("Login failed:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      {error && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{error}</p>
            
          </div>
        </div>
      )}

      <div className="login-left">
        <img
          src={bikeImage}
          alt="bike"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={emailid}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>

          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
