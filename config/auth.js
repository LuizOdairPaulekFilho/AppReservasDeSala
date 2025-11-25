module.exports = {
  secret: process.env.JWT_SECRET || "minha_chave_super_secreta",
  expiresIn: "1d",
};
