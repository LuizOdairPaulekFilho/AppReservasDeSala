const Usuario = require("./usuario");
const Setor = require("./setor");
const Sala = require("./sala");
const Reuniao = require("./reuniao");
const auth = require('../middleware/auth');

// Usuário <-> Setor
Setor.hasMany(Usuario, { foreignKey: { allowNull: true } });
Usuario.belongsTo(Setor);

// Setor.coordenador -> Usuario
Setor.belongsTo(Usuario, { as: "coordenador", foreignKey: "coordenadorId" });

// Sala <-> Reuniao
Sala.hasMany(Reuniao);
Reuniao.belongsTo(Sala);

// Usuario (criador) <-> Reuniao
Usuario.hasMany(Reuniao);
Reuniao.belongsTo(Usuario);

// Setor <-> Reuniao
Setor.hasMany(Reuniao);
Reuniao.belongsTo(Setor);

module.exports = { Usuario, Setor, Sala, Reuniao };
