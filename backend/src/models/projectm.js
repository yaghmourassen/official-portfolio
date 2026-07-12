// src/models/projectm.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Project = sequelize.define(
    "Project",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        subtitle: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        // Renommé pour être raccord avec notre contrôleur (image_url)
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "Full-Stack",
        },

        // Stockage du tableau des technos au format JSON (converti automatiquement par Sequelize en chaîne sous SQLite)
        technologies: {
            type: DataTypes.JSON, 
            allowNull: true,
        },

        github_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                // On retire ou assouplit isUrl si tu veux accepter des champs vides sans bugger
                isUrl: { msg: "Le lien GitHub doit être une URL valide." },
            },
        },

        // Remplacé demo_url par live_url pour matcher le frontend qu'on a prévu
        live_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: { msg: "Le lien Live doit être une URL valide." },
            },
        },
    },
    {
        tableName: "projects",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Project;