const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Region = sequelize.define('Region', {
            regionid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
        
    },
    RegionName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});
module.exports = Region;



