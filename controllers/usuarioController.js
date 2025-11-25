const { Usuario, Setor } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  async criar(req, res) {
    try {
      const { nome, cpf, password, SetorId } = req.body;

      if (!nome || !cpf || !password) {
        return res
          .status(400)
          .json({ erro: "Nome, CPF e senha são obrigatórios" });
      }

      const existente = await Usuario.findOne({ where: { cpf } });
      if (existente) {
        return res.status(400).json({ erro: "CPF já cadastrado" });
      }

      const usuario = await Usuario.create({ nome, cpf, password, SetorId });

      return res.status(201).json({
        id: usuario.id,
        nome: usuario.nome,
        cpf: usuario.cpf,
        SetorId: usuario.SetorId,
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["password"] },
        include: [{ model: Setor, attributes: ["id", "nome"] }],
      });

      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Setor, attributes: ["id", "nome"] }],
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, SetorId } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      if (cpf && cpf !== usuario.cpf) {
        const existeCpf = await Usuario.findOne({ where: { cpf } });
        if (existeCpf) {
          return res.status(400).json({ erro: "CPF já está em uso" });
        }
      }

      await usuario.update({ nome, cpf, SetorId });

      return res.json({
        id: usuario.id,
        nome: usuario.nome,
        cpf: usuario.cpf,
        SetorId: usuario.SetorId,
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizarSenha(req, res) {
    try {
      const { id } = req.params;
      const { senhaAtual, novaSenha } = req.body;

      if (!senhaAtual || !novaSenha) {
        return res
          .status(400)
          .json({ erro: "Senha atual e nova senha são obrigatórias" });
      }

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      const senhaValida = await bcrypt.compare(senhaAtual, usuario.password);
      if (!senhaValida) {
        return res.status(401).json({ erro: "Senha atual incorreta" });
      }

      usuario.password = novaSenha;
      await usuario.save();

      return res.json({ mensagem: "Senha atualizada com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      await usuario.destroy();
      return res.json({ mensagem: "Usuário removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
