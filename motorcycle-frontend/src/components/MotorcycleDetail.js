import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MotorcycleDetail.css';

const MotorcycleDetail = () => {
  const { id } = useParams();
  const [motorcycle, setMotorcycle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/motorcycles/${id}`)
      .then(res => res.json())
      .then(data => setMotorcycle(data))
      .catch(err => console.error('Error fetching motorcycle details:', err));
  }, [id]);

  if (!motorcycle) {
    return <p>Loading...</p>;
  }

  return (
    <div className="motorcycle-detail-container">
    <h2>{motorcycle.brand} {motorcycle.model}</h2>
    {motorcycle.imageUrl && (
      <img
        src={motorcycle.imageUrl}
        alt={`${motorcycle.brand} ${motorcycle.model}`}
        className="motorcycle-detail-image"
      />
    )}
    <p><strong>Year:</strong> {motorcycle.year}</p>
    <p><strong>Price:</strong> ₹{Number(motorcycle.price).toLocaleString()}</p>
    <p><strong>Engine:</strong> {motorcycle.engineCapacity} cc</p>
    <p><strong>Fuel:</strong> {motorcycle.fuelType}</p>
    <p><strong>Transmission:</strong> {motorcycle.transmission}</p>
    <p><strong>Mileage:</strong> {motorcycle.mileage} km/l</p>
    <p><strong>Color:</strong> {motorcycle.color}</p>
    <p><strong>In Stock:</strong> {motorcycle.inStock ? 'Yes' : 'No'}</p>
    <p><strong>Description:</strong> {motorcycle.description || 'N/A'}</p>
  
    <Link to={`/booking/${motorcycle.id}`} className="book-now-button">
      Book This Motorcycle
    </Link>
  </div>
  );
};

const styles = {
  bookButton: {
    marginTop: '20px',
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  }
};

export default MotorcycleDetail;
