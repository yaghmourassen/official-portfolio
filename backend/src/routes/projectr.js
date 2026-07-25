const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 
const projectController = require("../controllers/projectc");

// Configuration du dossier d'upload dans 'public/uploads'
const uploadDir = path.join(process.cwd(), "public", "uploads");

// Création du dossier s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname).toLowerCase());
  }
});

// Filtre de sécurité pour valider les extensions et types MIME
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|svg/;
  const extNameValid = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeTypeValid = file.mimetype.startsWith("image/");

  if (extNameValid && mimeTypeValid) {
    return cb(null, true);
  } else {
    cb(new Error("Seules les images (JPEG, JPG, PNG, WEBP, SVG) sont autorisées !"));
  }
};

// Instance Multer avec limite à 5 Mo par fichier
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

// Middleware flexible acceptant aussi bien 'image' (1 fichier) que 'images' (jusqu'à 10 fichiers)
const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

// Wrapper pour capturer proprement les erreurs de Multer sans faire crasher le serveur (Avoid 500)
const handleUpload = (req, res, next) => {
  cpUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: "L'image est trop lourde ! La taille maximale est de 5 Mo." });
      }
      return res.status(400).json({ error: `Erreur d'upload : ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// --- ROUTES ---
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", handleUpload, projectController.createProject);
router.put("/:id", handleUpload, projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;