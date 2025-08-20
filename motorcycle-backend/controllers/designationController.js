const Designation = require('../models/designation');


exports.createDesignation = async (req, res) => {
    try {
        const { desigName } = req.body;
        const newDesignation = await Designation.create({ desigName });
        res.status(201).json(newDesignation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.findAll();
        res.status(200).json(designations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);
        if (!designation) {
            return res.status(404).json({ message: 'Designation not found' });
        }
        res.status(200).json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateDesignation = async (req, res) => {
    try {
        const { desigName } = req.body;
        const designation = await Designation.findByPk(req.params.id);

        if (!designation) {
            return res.status(404).json({ message: 'Designation not found' });
        }

        designation.desigName = desigName;
        await designation.save();
        
        res.status(200).json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);
        if (!designation) {
            return res.status(404).json({ message: 'Designation not found' });
        }

        await designation.destroy();
        res.status(200).json({ message: 'Designation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
