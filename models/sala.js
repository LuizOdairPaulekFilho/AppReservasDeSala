const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sala = sequelize.define(
  "Sala",
  {
    n_sala: { type: DataTypes.INTEGER, allowNull: false },
    andar: { type: DataTypes.INTEGER, allowNull: false },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "salas",
  }
);

module.exports = Sala;
