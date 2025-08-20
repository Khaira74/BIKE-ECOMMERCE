import React, { useEffect, useState } from "react";
import motorcycleService from "../services/motorcycleService";
import { useNavigate } from "react-router-dom";
import "./MotorcycleList.css";

const MotorcycleList = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortOrder, setSortOrder] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("islogin") === "true"; // or use your auth method

  useEffect(() => {
    motorcycleService
      .getAllMotorcycles()
      .then((res) => setMotorcycles(res.data))
      .catch((err) => console.error("Error fetching motorcycles:", err));
  }, []);

  const handleViewDetails = (id) => {
    if (isLoggedIn) {
      navigate(`/motorcycles/${id}`);
    } else {
      setPopupMessage("Please login to view motorcycle details");
      setTimeout(() => setPopupMessage(""), 2000); // hide after 2s
    }
  };

  const filteredMotorcycles = motorcycles
    .filter((moto) =>
      `${moto.brand} ${moto.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((moto) =>
      fuelFilter === "All" ? true : moto.fuelType === fuelFilter
    )
    .filter((moto) => {
      const price = parseFloat(moto.price);
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="motorcycle-list-container">
      <h2>🏍️ Available Motorcycles</h2>

      {popupMessage && <div className="popup-message">{popupMessage}</div>}

      <input
        type="text"
        placeholder="Search by brand or model..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="filters">
        <label>
          Fuel:
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </label>

        <label>
          Price:
          <select
            onChange={(e) => {
              const [min, max] = e.target.value.split("-").map(Number);
              setPriceRange([min, max]);
            }}
          >
            <option value="0-1000000">All</option>
            <option value="0-100000">Below ₹1L</option>
            <option value="100000-200000">₹1L - ₹2L</option>
            <option value="200000-500000">₹2L - ₹5L</option>
          </select>
        </label>

        <label>
          Sort:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      <div className="motorcycle-grid">
        {filteredMotorcycles.length > 0 ? (
          filteredMotorcycles.map((moto) => (
            <div
              key={moto.id}
              className="motorcycle-card"
              onClick={() => handleViewDetails(moto.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={moto.imageUrl}
                alt={`${moto.brand} ${moto.model}`}
              />
              <h3>
                {moto.brand} {moto.model}
              </h3>
              <p>
                <strong>Price:</strong> ₹{Number(moto.price).toLocaleString()}
              </p>
              <p>
                <strong>Fuel:</strong> {moto.fuelType}
              </p>
              <p>{moto.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>
            </div>
          ))
        ) : (
          <p>No motorcycles match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default MotorcycleList;
