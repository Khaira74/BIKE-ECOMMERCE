const Roles = require('../models/roles');


exports.createRole = async (req, res) => {
    try {
        const newRole = await Roles.create(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getRoleById = async (req, res) => {
    try {
        const role = await Roles.findByPk(req.params.roleid);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateRole = async (req, res) => {
    try {
        const role = await Roles.findByPk(req.params.roleid);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        await role.update(req.body);
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteRole = async (req, res) => {
    try {
        const role = await Roles.findByPk(req.params.roleid);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};