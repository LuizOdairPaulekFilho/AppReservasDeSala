const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  async registrar(req, res) {
    try {
      const { nome, cpf, password, SetorId } = req.body;
      const usuario = await Usuario.create({ nome, cpf, password, SetorId });
      return res
        .status(201)
        .json({
          id: usuario.id,
          nome: usuario.nome,
          cpf: usuario.cpf,
          SetorId: usuario.SetorId,
        });
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
  },

  async login(req, res) {
    const { cpf, password } = req.body;
    const usuario = await Usuario.findOne({ where: { cpf } });
    if (!usuario)
      return res.status(401).json({ erro: "Usuário não encontrado" });

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) return res.status(401).json({ erro: "Senha inválida" });

    const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        cpf: usuario.cpf,
        SetorId: usuario.SetorId,
      },
      token,
    });
  },
};
