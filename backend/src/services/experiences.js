// backend/src/services/experiences.js

// Make sure this path correctly steps up one folder and into models
const Experience = require('../models/experiencem'); 

/**
 * Fetch all experiences ordered chronologically
 */
const getAllExperiences = async () => {
    try {
        return await Experience.findAll({
            order: [['duration', 'DESC']] 
        });
    } catch (error) {
        throw new Error('Database Error: ' + error.message);
    }
};

const createExperience = async (experienceData) => {
    try {
        return await Experience.create(experienceData);
    } catch (error) {
        throw new Error('Database Error: ' + error.message);
    }
};

const updateExperience = async (id, experienceData) => {
    try {
        const experience = await Experience.findByPk(id);
        if (!experience) return null;
        return await experience.update(experienceData);
    } catch (error) {
        throw new Error('Database Error: ' + error.message);
    }
};

const deleteExperience = async (id) => {
    try {
        const experience = await Experience.findByPk(id);
        if (!experience) return null;
        await experience.destroy();
        return true;
    } catch (error) {
        throw new Error('Database Error: ' + error.message);
    }
};

module.exports = {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience
};