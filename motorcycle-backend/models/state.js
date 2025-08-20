const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const States = sequelize.define('State', {
            stateid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    stateName: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
},{timestamps: false});
module.exports = States;
