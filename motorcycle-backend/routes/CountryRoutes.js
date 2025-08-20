const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.post('/', countryController.create); 
router.get('/', countryController.findAll); 
router.get('/:id', countryController.findOne);  
router.put('/:id', countryController.update);  
router.delete('/:id', countryController.delete);

module.exports = router;
