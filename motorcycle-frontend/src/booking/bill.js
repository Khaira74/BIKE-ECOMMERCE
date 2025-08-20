import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BillPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided.");
      return;
    }

    fetch(`http://localhost:3000/bookings/bookings/${bookingId}`)
      .then(res => {
        if (!res.ok) throw new Error("Booking not found");
        return res.json();
      })
      .then(data => {
        setBooking(data);
      })
      .catch(err => {
        console.error("Error fetching booking:", err);
        setError("Failed to fetch booking details.");
      });
  }, [bookingId]);

  if (error) {
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  }

  if (!booking) {
    return <div style={{ padding: "2rem" }}>Loading bill...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Booking Bill</h2>

      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {booking.customerName}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Phone:</strong> {booking.phoneNumber}</p>
      <p><strong>Address:</strong> {booking.address}</p>
      <p><strong>Country:</strong> {booking.country}</p>
      <p><strong>State:</strong> {booking.state}</p>

      <h3>Booking Summary</h3>
      <p><strong>Motorcycle ID:</strong> {booking.motorcycleId}</p>
      <p><strong>Price:</strong> ₹{Number(booking.price).toLocaleString()}</p>
      <p><strong>Tax (18%):</strong> ₹{Number(booking.tax).toLocaleString()}</p>
      <p><strong>Total:</strong> ₹{Number(booking.total).toLocaleString()}</p>

      <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>

      <button onClick={() => window.print()} style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }}>
        Print Bill
      </button>
    </div>
  );
};

export default BillPage;
