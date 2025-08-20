const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

router.post('/', rolesController.createRole);
router.get('/', rolesController.getAllRoles);
router.get('/:roleid', rolesController.getRoleById);
router.put('/:roleid', rolesController.updateRole);
router.delete('/:roleid', rolesController.deleteRole);

module.exports = router;