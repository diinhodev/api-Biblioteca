const emprestimoController = require("../controllers/bibliotecaControllers")
const validarEmprestimo = require("../middleware/validarEmprestimo")

const router = require("express").Router()

router.post("/", validarEmprestimo, emprestimoController.cadastrarEmprestimo)


module.exports = router