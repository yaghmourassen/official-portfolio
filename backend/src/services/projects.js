// src/services/projects.js
const Project = require("../models/projectm");

// Get all projects
const getAllProjects = async () => {
    return await Project.findAll({
        // Trie par défaut du plus récent au plus ancien
        order: [["created_at", "DESC"]],
    });
};

// Get project by id
const getProjectById = async (id) => {
    return await Project.findByPk(id);
};

// Create project
const createProject = async (projectData) => {
    // Si technologies arrive sous forme de chaîne de caractères depuis un `FormData` (multipart),
    // on s'assure de le parser en tableau d'objets/chaînes avant de le passer à Sequelize.
    if (typeof projectData.technologies === 'string') {
        try {
            projectData.technologies = JSON.parse(projectData.technologies);
        } catch (e) {
            // Si ce n'est pas du JSON valide (ex: juste une chaîne séparée par des virgules),
            // on crée un tableau nettoyé.
            projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
        }
    }
    return await Project.create(projectData);
};

// Update project
const updateProject = async (id, projectData) => {
    const project = await Project.findByPk(id);

    if (!project) {
        return null;
    }

    // Même traitement de sécurité pour les technologies lors d'une mise à jour
    if (typeof projectData.technologies === 'string') {
        try {
            projectData.technologies = JSON.parse(projectData.technologies);
        } catch (e) {
            projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
        }
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