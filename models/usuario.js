const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "usuarios",
    hooks: {
      beforeCreate: async (u) => {
        u.password = await bcrypt.hash(u.password, 10);
      },
      beforeUpdate: async (u) => {
        if (u.changed("password"))
          u.password = await bcrypt.hash(u.password, 10);
      },
    },
  }
);

module.exports = Usuario;
