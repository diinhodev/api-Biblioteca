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

function devolverEmprestimo(req, res){
    try {
        const {id} = req.params;

        const emprestimo = bibliotecaService.devolverEmprestimo({idEmprestimo : id})
        return res.status(200).json({
            message : "Livro devolvido com sucesso.",
            emprestimo
        })
    } catch (error) {
        return res.status(400).json({
            erro : error.message
        })
    }
}

function listarEmprestimos(req, res){
    try {
        const {nome, devolvido, data, ordenacao, ordem, pagina, limit} = req.query;
        const emprestimos = bibliotecaService.listarEmprestimos({nome, devolvido, data, ordenacao, ordem, pagina, limit})
        return res.status(200).json({
            message : "emprestimo localizado.",
            emprestimos
        })
    } catch (error) {
        return res.status(400).json({
            erro : error.message
        })
    }
}

function excluirLivro(req, res){
    try {
        const livro = bibliotecaService.excluirLivro({idLivro : req.params.id})
        return res.status(200).json({
            message : "Livro excluido com sucesso.",
            livro
        })
    } catch (error) {
        return res.status(400).json({
            erro : error.message
        })
    }
}

module.exports = {
    cadastrarLivro,
    cadastrarEmprestimo,
    devolverEmprestimo,
    listarEmprestimos, 
    excluirLivro
}