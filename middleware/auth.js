const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: "Token não fornecido" });

  const parts = header.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ erro: "Token mal formatado" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ erro: "Token mal formatado" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ erro: "Token inválido" });
    req.usuarioId = decoded.id;
    next();
  });
};
