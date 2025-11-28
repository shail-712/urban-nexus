const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with connection string
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    console.log(`📍 Database: ${sequelize.config.database}`);
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL:', error.message);
    console.error('💡 Please check your DATABASE_URL in .env file');
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };