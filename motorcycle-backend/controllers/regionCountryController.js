const RegionCountry = require('../models/region_country');


exports.createRegionCountry = async (req, res) => {
    try {
        const newEntry = await RegionCountry.create(req.body);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllRegionCountries = async (req, res) => {
    try {
        const entries = await RegionCountry.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getRegionCountryById = async (req, res) => {
    try {
        const entry = await RegionCountry.findOne({
            where: { regionid: req.params.regionid }
        });

        if (!entry) {
            return res.status(404).json({ message: 'Region-Country entry not found' });
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateRegionCountry = async (req, res) => {
    try {
        const entry = await RegionCountry.findOne({
            where: { regionid: req.params.regionid }
        });

        if (!entry) {
            return res.status(404).json({ message: 'Region-Country entry not found' });
        }

        await entry.update(req.body);
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteRegionCountry = async (req, res) => {
    try {
        const entry = await RegionCountry.findOne({
            where: { regionid: req.params.regionid }
        });

        if (!entry) {
            return res.status(404).json({ message: 'Region-Country entry not found' });
        }

        await entry.destroy();
        res.status(200).json({ message: 'Region-Country entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};