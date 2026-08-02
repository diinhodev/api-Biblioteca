const bibliotecaController = require("../controllers/bibliotecaControllers")
const validarDevolucao = require("../middleware/validarDevolucao")
const validarEmprestimo = require("../middleware/validarEmprestimo")

const router = require("express").Router()

router.post("/", validarEmprestimo, bibliotecaController.cadastrarEmprestimo)
router.patch("/:id", validarDevolucao, bibliotecaController.devolverEmprestimo)
router.get("/", bibliotecaController.listarEmprestimos)
module.exports = router