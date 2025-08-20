const State = require('../models/State');

exports.getAllStates = async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStateById = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createState = async (req, res) => {
    try {
        const { stateid, stateName } = req.body;
        const newState = await State.create({ stateid, stateName });
        res.status(201).json(newState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateState = async (req, res) => {
    try {
        const { id } = req.params;
        const { stateid, stateName } = req.body;
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        await state.update({ stateid, stateName });
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteState = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        await state.destroy();
        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};