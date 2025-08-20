const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

const Motorcycle = sequelize.define('Motorcycle', {
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  engineCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fuelType: {
    type: DataTypes.ENUM('Petrol', 'Electric', 'Diesel'),
    allowNull: false
  },
  transmission: {
    type: DataTypes.ENUM('Manual', 'Automatic'),
    allowNull: false
  },
  mileage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  color: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false // removes createdAt and updatedAt
});

module.exports = Motorcycle;
