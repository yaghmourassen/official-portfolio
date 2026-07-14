const { DataTypes } = require('sequelize');
// Destructured to extract the sequelize instance from your config object
const { sequelize } = require('../config/database');

const Education = sequelize.define('Education', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    years: {
        type: DataTypes.STRING,
        allowNull: false // e.g., "2021 - 2023"
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false // e.g., "Master's Degree"
    },
    fieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false // e.g., "Communication & Public Relations"
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false // e.g., "Djilali Bounaama University"
    }
}, {
    tableName: 'educations',
    timestamps: true
});

module.exports = Education;