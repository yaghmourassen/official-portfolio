const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// منع Sequelize من محاولة إنشاء مجلد محلي باسم libsql: على Windows
const originalMkdirSync = fs.mkdirSync;
fs.mkdirSync = function (dirPath, options) {
  if (typeof dirPath === "string" && (dirPath.startsWith("libsql") || dirPath.endsWith(":"))) {
    return;
  }
  return originalMkdirSync.apply(this, arguments);
};

let sequelize;

if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
  const tursoUrl = `${process.env.TURSO_DATABASE_URL}?authToken=${process.env.TURSO_AUTH_TOKEN}`;

  sequelize = new Sequelize({
    dialect: "sqlite",
    dialectModule: require("@libsql/sqlite3"),
    storage: tursoUrl,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../../database.sqlite"),
    logging: console.log,
  });
}

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Turso Database successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to Database:", error);
  }
}

module.exports = {
  sequelize,
  connectDatabase,
};