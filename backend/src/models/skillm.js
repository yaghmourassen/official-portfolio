const { DataTypes } = require('sequelize');
// أضف الأقواس هنا تماماً مثل educationm.js
const { sequelize } = require('../config/database');

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    iconName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'skills',
    timestamps: true
});

module.exports = Skill;