const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Setor = sequelize.define(
  "Setor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "setores",
  }
);

module.exports = Setor;
