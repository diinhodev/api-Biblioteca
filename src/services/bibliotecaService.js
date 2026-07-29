const crypto = require("crypto")
const livroDatabases = require("../databases/livroDatabase")
const emprestimoDatabases = require("../databases/emprestimoDatabase")
const buscarLivro = require("./buscarLivro")



function buscarLivro(id){
    const livro = livroDatabase.find(l => l.id === id);

    if(!livro){
        throw new Error("Livro não encontrado.")
    }

    return livro
}

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

function cadastrarEmprestimo({nomePessoa, livroId}){
     const livro = buscarLivro(livroId)


     if(!livro.disponivel){
        throw new Error("Livro se encontra indisponivel no momento.")
     }

     const novoEmprestimo = {
        id : crypto.randomUUID(),
        livroId : livro.id,
        nomePessoa,
        dataEmprestimo : new Date().toLocaleDateString(),
        devolvido : false
     }

    emprestimoDatabases.push(novoEmprestimo)

    livro.disponivel = false

    return novoEmprestimo

}

module.exports = {
    cadastrarLivro,
    cadastrarEmprestimo,
   
}