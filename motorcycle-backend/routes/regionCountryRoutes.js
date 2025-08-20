const express = require('express');
const router = express.Router();
const regionCountryController = require('../controllers/regionCountryController');

router.post('/', regionCountryController.createRegionCountry);
router.get('/', regionCountryController.getAllRegionCountries);
router.get('/:regionid', regionCountryController.getRegionCountryById);
router.put('/:regionid', regionCountryController.updateRegionCountry);
router.delete('/:regionid', regionCountryController.deleteRegionCountry);

module.exports = router;