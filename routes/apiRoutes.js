const express = require("express");
const authController = require("../controllers/authController");
const reuniaoController = require("../controllers/reuniaoController");
const salaController = require("../controllers/salaController");
const setorController = require("../controllers/setorController");
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/registrar", authController.registrar);
router.post("/login", authController.login);

router.post("/usuarios", auth, usuarioController.criar);
router.get("/usuarios", auth, usuarioController.listar);
router.get("/usuarios/:id", auth, usuarioController.buscarPorId);
router.put("/usuarios/:id", auth, usuarioController.atualizar);
router.put("/usuarios/:id/senha", auth, usuarioController.atualizarSenha);
router.delete("/usuarios/:id", auth, usuarioController.remover);

router.get("/reunioes", auth, reuniaoController.listar);
router.post("/reunioes", auth, reuniaoController.criar);
router.post("/reunioes/:id/cancelar", auth, reuniaoController.cancelar);

router.post("/salas", auth, salaController.criar);
router.get("/salas", auth, salaController.listar);
router.get("/salas/:id", auth, salaController.buscarPorId);
router.put("/salas/:id", auth, salaController.atualizar);
router.delete("/salas/:id", auth, salaController.remover);

router.post("/setores", auth, setorController.criar);
router.get("/setores", auth, setorController.listar);
router.get("/setores/:id", auth, setorController.buscarPorId);
router.put("/setores/:id", auth, setorController.atualizar);
router.delete("/setores/:id", auth, setorController.remover);

module.exports = router;
