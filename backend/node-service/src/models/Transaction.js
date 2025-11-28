const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const crypto = require("crypto");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    contractor: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    projectname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    hash: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    riskscore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    risklevel: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: true,
    },
    aianalysis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "review"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
    hooks: {
      beforeCreate: (transaction) => {
        // Generate hash before saving
        const hashString = `${transaction.amount}${transaction.contractor}${transaction.timestamp}`;
        transaction.hash = crypto
          .createHash("sha256")
          .update(hashString)
          .digest("hex");
      },
    },
  }
);

module.exports = Transaction;
