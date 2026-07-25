const projectService = require("../services/projects");
const fs = require("fs");
const path = require("path");

// Fonction auxiliaire pour supprimer un fichier localement en toute sécurité
const deleteLocalFile = (filePath) => {
    if (filePath) {
        const absolutePath = path.join(__dirname, "../assets/uploads", path.basename(filePath));
        
        if (fs.existsSync(absolutePath)) {
            fs.unlink(absolutePath, (err) => {
                if (err) console.error(`Impossible de supprimer le fichier: ${absolutePath}`, err);
            });
        } else {
            console.log(`ℹ️ [Safe Bypass] Le fichier n'existe pas sur le disque, suppression ignorée: ${absolutePath}`);
        }
    }
};

// Fonction auxiliaire pour supprimer un tableau de fichiers
const deleteLocalFiles = (filePaths) => {
    if (Array.isArray(filePaths)) {
        filePaths.forEach((fp) => deleteLocalFile(fp));
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

        // Normalisation JSON pour technologies
        if (projectData.technologies && typeof projectData.technologies !== 'string') {
            projectData.technologies = JSON.stringify(projectData.technologies);
        }

        // 1. Image principale (req.files.image)
        if (req.files && req.files.image && req.files.image[0]) {
            projectData.image_url = `/uploads/${req.files.image[0].filename}`;
        } else if (req.file) { // Fallback si toujours configuré avec single('image')
            projectData.image_url = `/uploads/${req.file.filename}`;
        } else {
            projectData.image_url = null;
        }

        // 2. Galerie d'images secondaires (req.files.images ou req.files.gallery)
        const galleryFiles = req.files && (req.files.images || req.files.gallery);
        if (galleryFiles && galleryFiles.length > 0) {
            const galleryUrls = galleryFiles.map((file) => `/uploads/${file.filename}`);
            projectData.images = JSON.stringify(galleryUrls);
        } else {
            projectData.images = JSON.stringify([]);
        }

        const project = await projectService.createProject(projectData);

        res.status(201).json({
            message: "Project created successfully.",
            project,
        });
    } catch (error) {
        console.log("❌ CRITICAL DATABASE ERROR ON CREATE:", error);

        // Nettoyage des fichiers fraîchement envoyés en cas d'erreur BDD
        if (req.files) {
            if (req.files.image) deleteLocalFile(req.files.image[0].filename);
            const galleryFiles = req.files.images || req.files.gallery;
            if (galleryFiles) galleryFiles.forEach((f) => deleteLocalFile(f.filename));
        } else if (req.file) {
            deleteLocalFile(req.file.filename);
        }

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

        if (projectData.technologies && typeof projectData.technologies !== 'string') {
            projectData.technologies = JSON.stringify(projectData.technologies);
        }

        const existingProject = await projectService.getProjectById(projectId);
        if (!existingProject) {
            // Supprimer les nouveaux fichiers téléversés si le projet n'existe pas
            if (req.files) {
                if (req.files.image) deleteLocalFile(req.files.image[0].filename);
                const galleryFiles = req.files.images || req.files.gallery;
                if (galleryFiles) galleryFiles.forEach((f) => deleteLocalFile(f.filename));
            } else if (req.file) {
                deleteLocalFile(req.file.filename);
            }
            return res.status(404).json({ message: "Project not found." });
        }

        // 1. Mise à jour de l'image principale si un nouveau fichier est fourni
        if (req.files && req.files.image && req.files.image[0]) {
            projectData.image_url = `/uploads/${req.files.image[0].filename}`;
            if (existingProject.image_url) {
                deleteLocalFile(existingProject.image_url);
            }
        } else if (req.file) {
            projectData.image_url = `/uploads/${req.file.filename}`;
            if (existingProject.image_url) {
                deleteLocalFile(existingProject.image_url);
            }
        }

        // 2. Mise à jour de la galerie si de nouvelles images sont fournies
        const galleryFiles = req.files && (req.files.images || req.files.gallery);
        if (galleryFiles && galleryFiles.length > 0) {
            const newGalleryUrls = galleryFiles.map((file) => `/uploads/${file.filename}`);
            projectData.images = JSON.stringify(newGalleryUrls);

            // Optionnel : supprimer l'ancienne galerie
            let oldImages = existingProject.images;
            if (typeof oldImages === "string") {
                try { oldImages = JSON.parse(oldImages); } catch (e) { oldImages = []; }
            }
            if (Array.isArray(oldImages)) {
                deleteLocalFiles(oldImages);
            }
        }

        const updatedProject = await projectService.updateProject(projectId, projectData);

        res.status(200).json({
            message: "Project updated successfully.",
            project: updatedProject,
        });
    } catch (error) {
        console.log("❌ CRITICAL DATABASE ERROR ON UPDATE:", error);

        if (req.files) {
            if (req.files.image) deleteLocalFile(req.files.image[0].filename);
            const galleryFiles = req.files.images || req.files.gallery;
            if (galleryFiles) galleryFiles.forEach((f) => deleteLocalFile(f.filename));
        } else if (req.file) {
            deleteLocalFile(req.file.filename);
        }

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

        // Suppression de l'image principale
        if (project.image_url) {
            deleteLocalFile(project.image_url);
        }

        // Suppression des images de la galerie
        let galleryImages = project.images;
        if (typeof galleryImages === "string") {
            try { galleryImages = JSON.parse(galleryImages); } catch (e) { galleryImages = []; }
        }
        if (Array.isArray(galleryImages)) {
            deleteLocalFiles(galleryImages);
        }

        res.status(200).json({
            message: "Project and all associated images deleted successfully.",
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