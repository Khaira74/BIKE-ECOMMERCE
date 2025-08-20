const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Departments = sequelize.define('Department', {
    deptid: {
        type: DataTypes.INTEGER,
        primaryKey: true,  
        autoIncrement: true, 
        allowNull: false
    },
    dname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false 
});

module.exports = Departments;