const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Region_Country = sequelize.define('Region_Country', {
            regionid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
        
        
    },
    countryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});
module.exports = Region_Country;



