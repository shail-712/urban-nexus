const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
const initializeDatabase = async () => {
  console.log('🔄 Initializing database connection...');
  await testConnection();
  console.log('🔄 Syncing database models...');
  await syncDatabase();
  console.log('✅ Database initialization complete');
};

// Start database initialization
initializeDatabase().catch(err => {
  console.error('❌ Database initialization failed:', err);
  process.exit(1);
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const { sequelize } = require('./config/database');
    await sequelize.authenticate();
    
    res.json({ 
      status: 'ok', 
      service: 'Urban Nexus Node Service',
      database: 'PostgreSQL (Connected)',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      service: 'Urban Nexus Node Service',
      database: 'PostgreSQL (Disconnected)',
      error: error.message
    });
  }
});

// Routes (will be added later)
// app.use('/api/transactions', require('./routes/transactions'));
// app.use('/api/residents', require('./routes/residents'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node Service running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});