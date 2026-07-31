const { sequelize } = require('./src/config/database');

async function fix() {
  try {
    await sequelize.query('PRAGMA journal_mode = WAL;');
    console.log('✅ WAL Mode successfully enabled!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

fix();