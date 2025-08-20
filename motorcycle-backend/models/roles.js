const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Roles = sequelize.define('Roles', {
            roleid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});
module.exports = Roles;
