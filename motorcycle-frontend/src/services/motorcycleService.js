// src/services/motorcycleService.js
import axios from 'axios';

const API_URL = "http://localhost:3000/motorcycles";

const getAllMotorcycles = () => axios.get(API_URL);

const getMotorcycleById = (id) => axios.get(`${API_URL}/${id}`);

export default {
  getAllMotorcycles,
  getMotorcycleById
};
