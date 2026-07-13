// controllers/experiencec.js
// backend/src/controllers/experiencec.js

// CHANGE THIS FROM: require('../services/experiences')
// TO THIS (Matching your src structure):
const experienceService = require('../services/experiences');
// Get all experiences
const getAllExperiences = async (req, res) => {
    try {
        const experiences = await experienceService.getAllExperiences();
        return res.status(200).json(experiences);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving experiences", error: error.message });
    }
};

// Create a new experience
const createExperience = async (req, res) => {
    try {
        const { title, company, duration, description } = req.body;
        
        // Simple validation check
        if (!title || !company || !duration || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExperience = await experienceService.createExperience({ title, company, duration, description });
        return res.status(201).json(newExperience);
    } catch (error) {
        return res.status(500).json({ message: "Error creating experience", error: error.message });
    }
};

// Update an existing experience
const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, duration, description } = req.body;

        const updatedExperience = await experienceService.updateExperience(id, { title, company, duration, description });
        
        if (!updatedExperience) {
            return res.status(404).json({ message: "Experience record not found" });
        }

        return res.status(200).json(updatedExperience);
    } catch (error) {
        return res.status(500).json({ message: "Error updating experience", error: error.message });
    }
};

// Delete an experience
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await experienceService.deleteExperience(id);

        if (!deleted) {
            return res.status(404).json({ message: "Experience record not found" });
        }

        return res.status(200).json({ message: "Experience deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting experience", error: error.message });
    }
};

module.exports = {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience
};