// src/controllers/projectc.js
const projectService = require("../services/projects");
const fs = require("fs");
const path = require("path");

// دالة مساعدة محدثة وآمنة لحذف الملف محلياً إذا كان موجوداً فقط
const deleteLocalFile = (filePath) => {
    if (filePath) {
        // حل المسار المطلق للملف داخل المجلد assets/uploads
        const absolutePath = path.join(__dirname, "../assets/uploads", path.basename(filePath));
        
        // الفحص الذكي: نتحقق أولاً هل الملف موجود على القرص؟
        if (fs.existsSync(absolutePath)) {
            fs.unlink(absolutePath, (err) => {
                if (err) console.error(`Impossible de supprimer le fichier: ${absolutePath}`, err);
            });
        } else {
            // إذا لم يتم العثور على الصورة، نتخطى الحذف بأمان دون إطلاق أي خطأ خطير
            console.log(`ℹ️ [Safe Bypass] Le fichier n'existe pas sur le disque, suppression ignorée: ${absolutePath}`);
        }
    }
};

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
            return res.status(404).json({ message: "Project not found." });
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
        const projectData = { ...req.body };

        if (projectData.technologies) {
            if (typeof projectData.technologies !== 'string') {
                projectData.technologies = JSON.stringify(projectData.technologies);
            }
        }

        if (req.file) {
            projectData.image_url = `/uploads/${req.file.filename}`;
        } else {
            projectData.image_url = null;
        }

        const project = await projectService.createProject(projectData);

        res.status(201).json({
            message: "Project created successfully.",
            project,
        });
    } catch (error) {
        console.log("❌ CRITICAL DATABASE ERROR:", error);
        if (req.file) deleteLocalFile(req.file.filename);

        res.status(500).json({
            message: "Failed to create project.",
            error: error.message,
        });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const projectData = { ...req.body };

        if (projectData.technologies) {
            if (typeof projectData.technologies !== 'string') {
                projectData.technologies = JSON.stringify(projectData.technologies);
            }
        }

        const existingProject = await projectService.getProjectById(projectId);
        if (!existingProject) {
            if (req.file) deleteLocalFile(req.file.filename);
            return res.status(404).json({ message: "Project not found." });
        }

        if (req.file) {
            projectData.image_url = `/uploads/${req.file.filename}`;
            if (existingProject.image_url) {
                deleteLocalFile(existingProject.image_url);
            }
        }

        const updatedProject = await projectService.updateProject(projectId, projectData);

        res.status(200).json({
            message: "Project updated successfully.",
            project: updatedProject,
        });
    } catch (error) {
        console.log("❌ CRITICAL DATABASE ERROR ON UPDATE:", error);
        if (req.file) deleteLocalFile(req.file.filename);

        res.status(500).json({
            message: "Failed to update project.",
            error: error.message,
        });
    }
};

// Delete project
const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        
        const project = await projectService.getProjectById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        const deleted = await projectService.deleteProject(projectId);
        if (!deleted) {
            return res.status(404).json({ message: "Project not found." });
        }

        if (project.image_url) {
            deleteLocalFile(project.image_url);
        }

        res.status(200).json({
            message: "Project and associated image deleted successfully.",
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