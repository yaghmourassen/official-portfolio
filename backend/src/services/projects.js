const Project = require("../models/projectm");

// Get all projects
const getAllProjects = async () => {
    return await Project.findAll({
        order: [["created_at", "DESC"]],
    });
};

// Get project by id
const getProjectById = async (id) => {
    return await Project.findByPk(id);
};

// Create project
const createProject = async (projectData) => {
    return await Project.create(projectData);
};

// Update project
const updateProject = async (id, projectData) => {
    const project = await Project.findByPk(id);

    if (!project) {
        return null;
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