const express = require("express");
const cors = require("cors");

const { sequelize, connectDatabase } = require("./src/config/database");

const projectRoutes = require("./src/routes/projectr");
// 1. استدعاء ملف مسار تسجيل الدخول الجديد (Auth Route)
const authRoutes = require("./src/routes/authr"); 

const app = express();

const PORT = process.env.PORT || 5000;

// ==============================
// Middleware
// ==============================

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend is running."
    });
});

// ==============================
// API Routes
// ==============================

// 2. تفعيل مسار تسجيل الدخول تحت بادئة /api/auth
app.use("/api/auth", authRoutes); 

app.use("/api/projects", projectRoutes);


// ==============================
// Start Server
// ==============================

async function startServer() {

    try {

        await connectDatabase();

        await sequelize.sync();

        console.log("✓ Database synchronized.");

        app.listen(PORT, () => {

            console.log(`✓ Server running on http://localhost:${PORT}`);

        });

    } catch (error) {

        console.error("✗ Server failed to start.");

        console.error(error);

    }

}

startServer();