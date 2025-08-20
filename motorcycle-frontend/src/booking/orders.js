import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setError("Email not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/bookings/allorders', { email });
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p style={styles.loading}>Loading bookings...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
     
      <h2 style={styles.title}>Your Bookings</h2>

      {bookings.length === 0 ? (
        <p style={styles.noBookings}>No bookings found.</p>
      ) : (
        <div style={styles.cardsContainer}>
          {bookings.map((booking) => (
            <div key={booking.id} style={styles.card}>
              <p style={styles.customerName}><strong>{booking.customerName}</strong></p>
              <p style={styles.detail}><strong>Total Paid:</strong> ₹{Number(booking.total).toLocaleString()}</p>
              <Link
                to={`/motorcycles/${booking.motorcycleId}`}
                style={styles.link}
              >
                View Motorcycle Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '700',
    fontSize: '2.4rem',
    color: '#222',
  },
  noBookings: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#007bff',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px 25px',
    borderRadius: '12px',
    width: '280px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'default',
  },
  customerName: {
    fontSize: '1.4rem',
    marginBottom: '15px',
    color: '#333',
  },
  detail: {
    fontSize: '1.1rem',
    marginBottom: '20px',
    color: '#555',
  },
  link: {
    display: 'inline-block',
    padding: '10px 18px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#0056b3',
  }
};

export default Orders;
