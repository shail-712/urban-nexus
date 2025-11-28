const { sequelize } = require('../config/database');
const Transaction = require('./Transaction');
const Resident = require('./Resident');
const AuditLog = require('./AuditLog');

// Define associations
AuditLog.belongsTo(Transaction, { foreignKey: 'transactionId' });
Transaction.hasMany(AuditLog, { foreignKey: 'transactionId' });

const syncDatabase = async () => {
  try {
    // This will create tables if they don't exist
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synced successfully');
    console.log('📋 Tables: transactions, residents, audit_logs');
  } catch (error) {
    console.error('❌ Database sync error:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  Transaction,
  Resident,
  AuditLog,
  syncDatabase
};