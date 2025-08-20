import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MotorcycleList from './components/MotorcycleList';
import MotorcycleDetail from './components/MotorcycleDetail';
import SignupPage from "./pages/SignupPage";
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import BookingPage from './booking/Booking';
import AdminPanel from './components/AdminPanel';   
import BillPage from './booking/bill';
import Orders from './booking/orders';
function App() {
  return (
    <Router>
      <div>
      <Navbar />
      <div >
          <Routes>
            <Route path="/" element={<MotorcycleList />} /> {/* Home is MotorcycleList */}
            <Route path="/home" element={<MotorcycleList />} />
            <Route path="/motorcycles/:id" element={<MotorcycleDetail />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
