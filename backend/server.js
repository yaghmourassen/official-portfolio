const express = require("express");
const cors = require("cors");

const { sequelize, connectDatabase } = require("./src/config/database");

const projectRoutes = require("./src/routes/projectr");
const userRoutes = require("./src/routes/userr");

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

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

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