
function validarLivro(req, res, next){
    const {titulo, autor, ano} = req.body;

    if(!titulo || titulo.trim() === ""){
        return res.status(400).json({
            erro :  "Titulo Obrigatório."
        })
    }

    if(titulo.trim().length < 5){
        return res.status(400).json({
            erro : "Titulo não pode ter menos que 5 caracteres."
        })
    }

    if(!autor || autor.trim() === ""){
        return res.status(400).json({
            erro :  "Autor Obrigatório."
        })
    }

    if(typeof autor !== "string"){
        return res.status(400).json({
            erro :  "informe um autor válido."
        })
    }

    if(autor.trim().length < 3){
        return res.status(400).json({
            erro :  "Informe um autor com no minimo 3 caractere."
        })
    }
    
    if(!ano){
        return res.status(400).json({
            erro : "Ano Obrigatório."
        })
    }
    const anoNumber = Number(ano);
    if(Number.isNaN(anoNumber)){
        return res.status(400).json({
            erro :  "informe um ano válido Numérico."
        })
    }

    if(anoNumber < 1500 || anoNumber > new Date().getFullYear()){
        return res.status(400).json({
            erro :  "Informe um ano de publicação válido."
        })
    }
    
    next();

}


module.exports = validarLivro;