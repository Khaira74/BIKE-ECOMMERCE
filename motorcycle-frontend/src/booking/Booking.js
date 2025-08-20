import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingPage = () => {
  const { id } = useParams();
  const [motorcycle, setMotorcycle] = useState(null);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/motorcycles/${id}`)
      .then(res => res.json())
      .then(data => setMotorcycle(data))
      .catch(err => console.error("Error fetching motorcycle:", err));

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded)
      const userId = decoded.userid;
      console.log(userId);
      fetch(`http://localhost:3000/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error("Error fetching user:", err));
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, [id]);

  const handleBooking = () => {
    if (!user || !motorcycle) {
      alert("Something went wrong.");
      return;
    }

    if (!address || !country || !state) {
      alert("Please fill in all address fields.");
      return;
    }

    const tax = 0.18 * parseFloat(motorcycle.price);
    const total = parseFloat(motorcycle.price) + tax;

    const bookingData = {
      customerName: user.username,
      phoneNumber: user.phoneno,
      email: user.emailid,         // Ensure the correct field name for your backend
      address,
      state,
      country,
      motorcycleId: motorcycle.id, // Make sure this matches your backend model
      price: motorcycle.price,
      tax,
      total
    };

    fetch("http://localhost:3000/bookings/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(data => {
        navigate("/bill", { state: { bookingId: data.id } });
      })
      .catch(err => {
        console.error("Booking failed:", err);
        alert("Failed to create booking.");
      });
  };

  if (!motorcycle || !user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Book: {motorcycle.brand} {motorcycle.model}</h2>
      <p>Price: ₹{Number(motorcycle.price).toLocaleString()}</p>

      <h3>Customer Info</h3>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.emailid}</p>
      <p><strong>Phone:</strong> {user.phoneno}</p>

      <h3>Address Details</h3>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={e => setState(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={e => setCountry(e.target.value)}
      /><br />

      <button
        onClick={handleBooking}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
