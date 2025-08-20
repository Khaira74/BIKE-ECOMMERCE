const Role_Permissions = require('../models/role_permissions');


exports.createRolePermission = async (req, res) => {
    try {
        const newEntry = await Role_Permissions.create(req.body);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllRolePermissions = async (req, res) => {
    try {
        const entries = await Role_Permissions.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getRolePermissionsByRoleId = async (req, res) => {
    try {
        const entries = await Role_Permissions.findAll({
            where: { roleid: req.params.roleid }
        });

        if (!entries.length) {
            return res.status(404).json({ message: 'No permissions found for this role' });
        }

        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateRolePermission = async (req, res) => {
    try {
        const entry = await Role_Permissions.findOne({
            where: { roleid: req.params.roleid, permissionsid: req.params.permissionsid }
        });

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        await entry.update(req.body);
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteRolePermission = async (req, res) => {
    try {
        const entry = await Role_Permissions.findOne({
            where: { roleid: req.params.roleid, permissionsid: req.params.permissionsid }
        });

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        await entry.destroy();
        res.status(200).json({ message: 'Role permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};