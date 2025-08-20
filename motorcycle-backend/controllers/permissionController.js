const Permission = require('../models/permissions');


exports.createPermission = async (req, res) => {
    try {
        const newPermission = await Permission.create(req.body);
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getPermissionById = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updatePermission = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);

        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        await permission.update(req.body);
        
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deletePermission = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        await permission.destroy();
        res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};