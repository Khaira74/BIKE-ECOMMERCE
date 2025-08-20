const Dept_Desig = require('../models/department_desig');


const createDeptDesig = async (req, res) => {
    try {
        const { deptid, desigid } = req.body;
        const newEntry = await Dept_Desig.create({ deptid, desigid });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllDeptDesig = async (req, res) => {
    try {
        const entries = await Dept_Desig.findAll();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getDeptDesigById = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Dept_Desig.findByPk(id);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateDeptDesig = async (req, res) => {
    try {
        const { id } = req.params;
        const { deptid, desigid } = req.body;
        const entry = await Dept_Desig.findByPk(id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        await entry.update({ deptid, desigid });
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteDeptDesig = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Dept_Desig.findByPk(id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        await entry.destroy();
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDeptDesig,
    getAllDeptDesig,
    getDeptDesigById,
    updateDeptDesig,
    deleteDeptDesig
};
