const Motorcycle = require('../models/product');

// Create a new motorcycle
exports.createMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.create(req.body);
    res.status(201).json(motorcycle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all motorcycles
exports.getAllMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll();
    res.json(motorcycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get motorcycle by ID
exports.getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }
    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update motorcycle
exports.updateMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }
    await motorcycle.update(req.body);
    res.json(motorcycle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete motorcycle
exports.deleteMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }
    await motorcycle.destroy();
    res.json({ message: 'Motorcycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
