const { Setor, Usuario } = require("../models");

module.exports = {
  async criar(req, res) {
    try {
      const { nome, coordenadorId } = req.body;

      if (!nome) {
        return res.status(400).json({ erro: "Nome do setor é obrigatório" });
      }

      if (coordenadorId) {
        const coordenador = await Usuario.findByPk(coordenadorId);
        if (!coordenador) {
          return res
            .status(400)
            .json({ erro: "Coordenador informado não existe" });
        }
      }

      const setor = await Setor.create({ nome, coordenadorId });
      return res.status(201).json(setor);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listar(req, res) {
    try {
      const setores = await Setor.findAll({
        include: [
          {
            model: Usuario,
            as: "coordenador",
            attributes: ["id", "nome", "cpf"],
          },
        ],
      });

      return res.json(setores);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const setor = await Setor.findByPk(id, {
        include: [
          { model: Usuario, as: "coordenador", attributes: ["id", "nome"] },
        ],
      });

      if (!setor) {
        return res.status(404).json({ erro: "Setor não encontrado" });
      }

      return res.json(setor);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, coordenadorId } = req.body;

      const setor = await Setor.findByPk(id);
      if (!setor) {
        return res.status(404).json({ erro: "Setor não encontrado" });
      }

      if (coordenadorId) {
        const usuario = await Usuario.findByPk(coordenadorId);
        if (!usuario) {
          return res.status(400).json({ erro: "Coordenador inválido" });
        }
      }

      await setor.update({ nome, coordenadorId });
      return res.json(setor);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const setor = await Setor.findByPk(id);
      if (!setor) {
        return res.status(404).json({ erro: "Setor não encontrado" });
      }

      await setor.destroy();
      return res.json({ mensagem: "Setor removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
