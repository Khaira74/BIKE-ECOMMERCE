const Country_State = require('../models/country_state');

exports.getAllCountryStates = async (req, res) => {
    try {
        const countryStates = await Country_State.findAll();
        res.status(200).json(countryStates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCountryStateById = async (req, res) => {
    try {
        const { id } = req.params;
        const countryState = await Country_State.findByPk(id);
        if (!countryState) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(countryState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCountryState = async (req, res) => {
    try {
        const { countryid, stateid } = req.body;
        const newCountryState = await Country_State.create({ countryid, stateid });
        res.status(201).json(newCountryState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCountryState = async (req, res) => {
    try {
        const { id } = req.params;
        const { countryid, stateid } = req.body;
        const countryState = await Country_State.findByPk(id);
        if (!countryState) {
            return res.status(404).json({ message: 'Record not found' });
        }
        await countryState.update({ countryid, stateid });
        res.status(200).json(countryState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCountryState = async (req, res) => {
    try {
        const { id } = req.params;
        const countryState = await Country_State.findByPk(id);
        if (!countryState) {
            return res.status(404).json({ message: 'Record not found' });
        }
        await countryState.destroy();
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
