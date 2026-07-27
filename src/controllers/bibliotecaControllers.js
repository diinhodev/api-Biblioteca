const bibliotecaService = require("../services/bibliotecaService")
const bibliotecaRouter 
function cadastrarLivro(req, res){
    try {
        const livro = bibliotecaService.cadastrarLivro(req.body);
        return res.status(201).json({
            message : "Livro cadastrado com sucesso.",
            livro
        })
    } catch (error) {
        return res.status(400).json({
            erro : error.message
        })
    }
}


module.exports = {
    cadastrarLivro
}