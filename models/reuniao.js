const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const STATUS = ["cancelado", "em andamento", "pendente", "finalizada"];

const Reuniao = sequelize.define(
  "Reuniao",
  {
    data_reuniao: { type: DataTypes.DATE, allowNull: false },
    status_reuniao: {
      type: DataTypes.ENUM(...STATUS),
      defaultValue: "pendente",
    },
  },
  {
    tableName: "reunioes",
  }
);

Reuniao.STATUS = STATUS;

module.exports = Reuniao;
