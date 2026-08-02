const {validate } = require("uuid")

function validarDevolucao(req, res, next){
    const {idEmprestimo} = req.body;
    if(!idEmprestimo){
        return res.status(400).json({
            erro : "ID Obrigatório."
        })
    }

    if(!validate(idEmprestimo)){
        return res.status(400).json({
            erro :  "UUID Inválido."
        })
    }

    next();
}

module.exports = validarDevolucao;