const Departments = require('../models/department');


const createDepartment = async (req, res) => {
    try {
        const { dname } = req.body;
        const newDepartment = await Departments.create({ dname });
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllDepartments = async (req, res) => {
    try {
        const departments = await Departments.findAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Departments.findByPk(id);
        if (!department) return res.status(404).json({ message: "Department not found" });
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dname } = req.body;

        const department = await Departments.findByPk(id);
        if (!department) return res.status(404).json({ message: "Department not found" });

        department.dname = dname;
        await department.save();

        res.json({ message: "Department updated successfully", department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Departments.destroy({ where: { deptid: id } });
        if (!deleted) return res.status(404).json({ message: "Department not found" });

        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
