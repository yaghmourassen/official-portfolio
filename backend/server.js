const express = require("express");
const cors = require("cors");
const path = require("path"); // Import requis pour gérer les chemins de fichiers

const { sequelize, connectDatabase } = require("./src/config/database");

const projectRoutes = require("./src/routes/projectr");
const authRoutes = require("./src/routes/authr"); 

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// Middleware
// ==============================

// تحديث إعدادات CORS لتشمل المنفذ الجديد 5174
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", // أضفنا هذا المنفذ النشط حالياً عندك
        "http://localhost:3000"
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rendre le dossier des uploads public et accessible via l'URL /uploads
// خيار رقم 1: البحث داخل مجلد src/assets/uploads
app.use("/uploads", express.static(path.join(__dirname, "src", "assets", "uploads")));

// خيار رقم 2 (الاحتياطي): البحث داخل مجلد public/uploads إذا لم يجدها في الأول
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend is running."
    });
});

// ==============================
// API Routes
// ==============================
const experienceRoutes = require("./src/routes/experiencer"); // Make sure the path exactly matches where you saved it

app.use("/api/auth", authRoutes); 
app.use("/api/projects", projectRoutes);

// 2. Add this line right here to mount it!
app.use("/api/experiences", experienceRoutes);


const educationRoutes = require('./src/routes/educationr');

// ... other middlewares and routes
app.use('/api/education', educationRoutes);

const skillRoutes = require('./src/routes/skillr');

// استخدامه مع مسار الأساس
app.use('/api/skills', skillRoutes);


// ==============================
// Start Server
// ==============================

async function startServer() {
    try {
        await connectDatabase();
        
        // Note: altérer ou forcer la synchro si tu as des erreurs de colonnes manquantes
        // après nos modifications (ex: await sequelize.sync({ alter: true });)
       // استبدل السطر 56 القديم بهذا السطر مؤقتاً لتحديث قاعدة البيانات:
await sequelize.sync({ alter: true }); 
console.log("✓ Database synchronized with structural changes.");

        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("✗ Server failed to start.");
        console.error(error);
    }
}

startServer();