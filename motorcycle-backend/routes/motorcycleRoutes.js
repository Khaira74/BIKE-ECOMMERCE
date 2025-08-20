const express = require('express');
const router = express.Router();
const motorcycleController = require('../controllers/motorcycleController');

// Create
router.post('/', motorcycleController.createMotorcycle);

// Read all
router.get('/', motorcycleController.getAllMotorcycles);

// Read one
router.get('/:id', motorcycleController.getMotorcycleById);

// Update
router.put('/:id', motorcycleController.updateMotorcycle);

// Delete
router.delete('/:id', motorcycleController.deleteMotorcycle);

module.exports = router;
