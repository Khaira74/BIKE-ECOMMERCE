const express = require('express');
const router = express.Router();
const rolePermissionsController = require('../controllers/rolePermissionsController');

router.post('/', rolePermissionsController.createRolePermission);
router.get('/', rolePermissionsController.getAllRolePermissions);
router.get('/:roleid', rolePermissionsController.getRolePermissionsByRoleId);
router.put('/:roleid/:permissionsid', rolePermissionsController.updateRolePermission);
router.delete('/:roleid/:permissionsid', rolePermissionsController.deleteRolePermission);

module.exports = router;    