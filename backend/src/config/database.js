const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",

    storage: path.join(__dirname, "../../database.sqlite"),

    logging:
        process.env.NODE_ENV === "development"
            ? console.log
            : false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("✅ SQLite connected successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to SQLite:", error);
    }
}

module.exports = {
    sequelize,
    connectDatabase,
};