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

        // Image principale (Couverture / Façade)
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // 🌟 NOUVEAU CHAMP : Galerie d'images secondaires (tableau JSON d'URLs)
        images: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },

        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "Full-Stack",
        },

        // Tableau des technologies au format JSON
        technologies: {
            type: DataTypes.JSON, 
            allowNull: true,
            defaultValue: [],
        },

        github_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                // On autorise la valeur vide (null ou "") sans échouer à la validation
                isUrlOrEmpty(value) {
                    if (value && value.trim() !== "" && !/^https?:\/\//.test(value)) {
                        throw new Error("Le lien GitHub doit être une URL valide.");
                    }
                },
            },
        },

        live_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrlOrEmpty(value) {
                    if (value && value.trim() !== "" && !/^https?:\/\//.test(value)) {
                        throw new Error("Le lien Live doit être une URL valide.");
                    }
                },
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