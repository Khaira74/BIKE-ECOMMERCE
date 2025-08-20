import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("islogin") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("islogin");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo"> Bikeify</div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/orders">My Orders</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
