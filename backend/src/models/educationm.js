const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Education = sequelize.define('Education', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    years: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // أضف هذا السطر الجديد
    certificateUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'educations',
    timestamps: true
});

module.exports = Education;