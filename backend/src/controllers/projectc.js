const projectService = require("../services/projects");

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();

        res.status(200).json(projects);

    } catch (error) {

        res.status(500).json({
            message: "Failed to retrieve projects.",
            error: error.message,
        });

    }
};

// Get project by ID
const getProjectById = async (req, res) => {

    try {

        const project = await projectService.getProjectById(req.params.id);

        if (!project) {

            return res.status(404).json({
                message: "Project not found.",
            });

        }

        res.status(200).json(project);

    } catch (error) {

        res.status(500).json({
            message: "Failed to retrieve project.",
            error: error.message,
        });

    }

};

// Create project
const createProject = async (req, res) => {

    try {

        const project = await projectService.createProject(req.body);

        res.status(201).json({
            message: "Project created successfully.",
            project,
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to create project.",
            error: error.message,
        });

    }

};

// Update project
const updateProject = async (req, res) => {

    try {

        const project = await projectService.updateProject(
            req.params.id,
            req.body
        );

        if (!project) {

            return res.status(404).json({
                message: "Project not found.",
            });

        }

        res.status(200).json({
            message: "Project updated successfully.",
            project,
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to update project.",
            error: error.message,
        });

    }

};

// Delete project
const deleteProject = async (req, res) => {

    try {

        const deleted = await projectService.deleteProject(req.params.id);

        if (!deleted) {

            return res.status(404).json({
                message: "Project not found.",
            });

        }

        res.status(200).json({
            message: "Project deleted successfully.",
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete project.",
            error: error.message,
        });

    }

};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};