// models/experiencem.js
const { DataTypes } = require('sequelize');
// CHANGE THIS LINE TO USE CURLY BRACES:
const { sequelize } = require('../config/database'); 

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    duration: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: true, 
    tableName: 'experiences'
});

module.exports = Experience;