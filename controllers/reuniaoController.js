const { Reuniao, Sala, Usuario, Setor } = require("../models");
const { Op } = require("sequelize");

module.exports = {

  async listar(req, res) {
    const { salaId, setorId, usuarioId } = req.query;
    const where = {};
    if (salaId) where.SalaId = salaId;
    if (setorId) where.SetorId = setorId;
    if (usuarioId) where.UsuarioId = usuarioId;

    const reunioes = await Reuniao.findAll({ where, include: [Sala, Usuario, Setor] });
    return res.json(reunioes);
  },

  async criar(req, res) {
    try {
      const { SalaId, SetorId, data_reuniao } = req.body;
      const UsuarioId = req.usuarioId;

      if (!SalaId || !data_reuniao) return res.status(400).json({ erro: "SalaId e data_reuniao são obrigatórios" });

      const { inicio, fim } = req.body.data_reuniao || {};
      if (!inicio || !fim) return res.status(400).json({ erro: "data_reuniao.inicio e data_reuniao.fim são obrigatórios" });

      const conflito = await Reuniao.findOne({
        where: {
          SalaId,
          [Op.not]: [{ status_reuniao: "cancelado" }],
          data_reuniao: {
          }
        }
      });

      const conflitos = await Reuniao.findOne({
        where: {
          SalaId,
          status_reuniao: { [Op.ne]: "cancelado" },
          inicio: { [Op.lt]: fim },
          fim: { [Op.gt]: inicio }
        }
      });

      if (conflitos) return res.status(400).json({ erro: "Conflito: sala já reservada nesse intervalo" });

      const reuniao = await Reuniao.create({
        SalaId,
        SetorId,
        UsuarioId,
        inicio,
        fim,
        status_reuniao: "pendente"
      });

      return res.status(201).json(reuniao);
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  },

  async cancelar(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuarioId;

      const reuniao = await Reuniao.findByPk(id, { include: [Setor] });
      if (!reuniao) return res.status(404).json({ erro: "Reunião não encontrada" });

      const setor = await Setor.findByPk(reuniao.SetorId);

      if (reuniao.UsuarioId !== usuarioId && setor.coordenadorId !== usuarioId) {
        return res.status(403).json({ erro: "Apenas o criador ou o coordenador do setor podem cancelar" });
      }

      reuniao.status_reuniao = "cancelado";
      await reuniao.save();

      return res.json({ ok: true });
    } catch (e) {
      return res.status(500).json({ erro: e.message });
    }
  }
};
