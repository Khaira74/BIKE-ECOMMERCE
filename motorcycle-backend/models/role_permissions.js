const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role_Permissions = sequelize.define('Role_Permissions', {
            roleid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
        
        
    },
    permissionsid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});
module.exports = Role_Permissions;