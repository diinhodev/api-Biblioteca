const {validate} = require("uuid")

function validarEmprestimo(req, res, next){
    const {nome, idLivro} = req.body;

    if(!nome || nome === ""){
        return res.status(400).json({
            erro : "Nome Obrigatório."
        })
    }
    if(nome.trim().length < 3){
        return res.status(400).json({
            erro : "informe um nome válido."
        })
    }

    if(!idLivro){
        return res.status(400).json({
            erro : "ID Obrigatório."
        })
    }
    if(!validate(idLivro)){
        return res.status(400).json({
            erro : "UUID inválido."
        })
    }

    next();
   
}

module.exports = validarEmprestimo;