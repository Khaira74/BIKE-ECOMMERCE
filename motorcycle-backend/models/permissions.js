const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permissions = sequelize.define('Permissions', {
            Permissionsid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        
    },
    PermissionsName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});
module.exports = Permissions;