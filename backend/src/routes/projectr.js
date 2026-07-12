const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 
const projectController = require("../controllers/projectc");

// تحديد المسار في جذر الباكند مباشرة لتفادي مشاكل الحسابات النسبية لـ __dirname
const uploadDir = path.join(process.cwd(), "public/uploads");

// إنشاء المجلد تلقائياً إذا لم يكن موجوداً بصلاحيات كاملة
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// تصفية الأمان وحجم الملفات كما هي
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Seules les images (jpeg, jpg, png, webp) sont autorisées !"));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

// --- ROUTES ---
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", upload.single("image"), projectController.createProject);
router.put("/:id", upload.single("image"), projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;