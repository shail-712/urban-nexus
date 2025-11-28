const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Resident = sequelize.define(
  "Resident",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    aadhaarid: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    projectname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    compensationamount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    compensationstatus: {
      type: DataTypes.ENUM("initiated", "approved", "released", "completed"),
      defaultValue: "initiated",
    },
    paymentdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "residents",
    timestamps: true,
  }
);

module.exports = Resident;
