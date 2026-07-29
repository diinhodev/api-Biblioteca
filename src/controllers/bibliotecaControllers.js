const bibliotecaService = require("../services/bibliotecaService")

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


function cadastrarEmprestimo(req, res){
    try {
        const emprestimo = bibliotecaService.cadastrarEmprestimo(req.body);
        return res.status(201).json({
            message : "Emrestimo cadastrado com sucesso.",
            emprestimo
        })
    } catch (error) {
        return res.status(400).json({
            erro :  error.message
        })
        
    }
}

module.exports = {
    cadastrarLivro,
    cadastrarEmprestimo
}