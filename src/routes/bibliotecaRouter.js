const router = require("express").Router();
const validarLivro = require("../middleware/validarLivro")
const bibliotecaController = require("../controllers/bibliotecaControllers");



router.post("/", validarLivro, bibliotecaController.cadastrarLivro);

router.delete("/:id", bibliotecaController.excluirLivro)


module.exports = router;