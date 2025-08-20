const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');

router.post('/', regionController.createRegion);
router.get('/', regionController.getAllRegions);
router.get('/:regionid', regionController.getRegionById);
router.put('/:regionid', regionController.updateRegion);
router.delete('/:regionid', regionController.deleteRegion);

module.exports = router;