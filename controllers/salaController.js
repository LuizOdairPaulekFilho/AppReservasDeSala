const { Sala } = require("../models");

module.exports = {
  async criar(req, res) {
    try {
      const { n_sala, andar, is_available } = req.body;

      if (!n_sala || andar === undefined) {
        return res
          .status(400)
          .json({ erro: "Número da sala e andar são obrigatórios" });
      }

      const existente = await Sala.findOne({ where: { n_sala, andar } });
      if (existente) {
        return res
          .status(400)
          .json({ erro: "Já existe uma sala com esse número neste andar" });
      }

      const sala = await Sala.create({
        n_sala,
        andar,
        is_available: is_available !== undefined ? is_available : true,
      });

      return res.status(201).json(sala);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listar(req, res) {
    try {
      const salas = await Sala.findAll();
      return res.json(salas);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const sala = await Sala.findByPk(id);
      if (!sala) {
        return res.status(404).json({ erro: "Sala não encontrada" });
      }

      return res.json(sala);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { n_sala, andar, is_available } = req.body;

      const sala = await Sala.findByPk(id);
      if (!sala) {
        return res.status(404).json({ erro: "Sala não encontrada" });
      }

      await sala.update({ n_sala, andar, is_available });
      return res.json(sala);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const sala = await Sala.findByPk(id);
      if (!sala) {
        return res.status(404).json({ erro: "Sala não encontrada" });
      }

      await sala.destroy();
      return res.json({ mensagem: "Sala removida com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
