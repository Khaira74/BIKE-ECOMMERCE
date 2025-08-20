const express = require('express');
const router = express.Router();
const countryStateController = require('../controllers/country_stateController');

router.get('/', countryStateController.getAllCountryStates);

router.get('/:id', countryStateController.getCountryStateById);

router.post('/', countryStateController.createCountryState);

router.put('/:id', countryStateController.updateCountryState);

router.delete('/:id', countryStateController.deleteCountryState);

module.exports = router;
