const Project = require("../models/projectm");

// Get all projects
const getAllProjects = async () => {
    return await Project.findAll({
        // Tri par défaut du plus récent au plus ancien
        order: [["created_at", "DESC"]],
    });
};

// Get project by id
const getProjectById = async (id) => {
    return await Project.findByPk(id);
};

// Fonction utilitaire pour parser les champs JSON reçus depuis FormData (multipart)
const parseJsonField = (fieldValue) => {
    if (typeof fieldValue === 'string') {
        try {
            return JSON.parse(fieldValue);
        } catch (e) {
            // Si ce n'est pas du JSON valide, on sépare par des virgules (fallback)
            return fieldValue.split(',').map(item => item.trim()).filter(Boolean);
        }
    }
    return fieldValue;
};

// Create project
const createProject = async (projectData) => {
    // Parsing sécurisé de technologies
    if (projectData.technologies) {
        projectData.technologies = parseJsonField(projectData.technologies);
    }

    // Parsing sécurisé du tableau d'images (galerie)
    if (projectData.images) {
        projectData.images = parseJsonField(projectData.images);
    }

    return await Project.create(projectData);
};

// Update project
const updateProject = async (id, projectData) => {
    const project = await Project.findByPk(id);

    if (!project) {
        return null;
    }

    // Parsing sécurisé de technologies lors d'une mise à jour
    if (projectData.technologies) {
        projectData.technologies = parseJsonField(projectData.technologies);
    }

    // Parsing sécurisé des images de la galerie lors d'une mise à jour
    if (projectData.images) {
        projectData.images = parseJsonField(projectData.images);
    }

    await project.update(projectData);
    return project;
};

// Delete project
const deleteProject = async (id) => {
    const project = await Project.findByPk(id);

    if (!project) {
        return null;
    }

    await project.destroy();
    return true;
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};