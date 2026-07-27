const crypto = require("crypto")
const livroDatabases = require("../databases/livroDatabase")
const emprestimoDatabases = require("../databases/emprestimoDatabase")

function cadastrarLivro({titulo, autor, ano}){
   

    const verificarDuplicidade = livroDatabases.find(
        livro => 
            livro.titulo.toLowerCase() === titulo.toLowerCase() &&
            livro.autor.toLowerCase() === autor.toLowerCase()
    );
    
    if(verificarDuplicidade){
        throw new Error("Titulo já existe.")
    }
    
    const novoLivro = {
        id : crypto.randomUUID(),
        titulo,
        autor,
        ano,
        disponivel : true
    }

    livroDatabases.push(novoLivro)

    return novoLivro
}

module.exports ={
    cadastrarLivro
}