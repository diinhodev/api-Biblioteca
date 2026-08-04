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
        dataEmprestimo : new Date().toISOString(),
        devolvido : false
     }

    emprestimoDatabases.push(novoEmprestimo)

    livro.disponivel = false

    return novoEmprestimo

}


function devolverEmprestimo({idEmprestimo}){
    const emprestimo = emprestimoDatabases.find(e=> e.id === idEmprestimo);
   

    if(!emprestimo){
        throw new Error("Livro não localizado.")
    }
    if(emprestimo.devolvido){
        throw new Error("Livro já foi devolvido.")
    }

    emprestimo.devolvido = true
    emprestimo.dataDevolucao = new Date().toISOString()

    const livro = buscarLivro(emprestimo.livroId)
    livro.disponivel = true
    
    return emprestimo    
}

function listarEmprestimos({nome, devolvido, data, ordenar, ordem, pagina, limit}){
    let emprestimos = emprestimoDatabases;

    if(nome){
        emprestimos = emprestimos.filter(n => n.nomePessoa === nome)
    }

    if(devolvido){
        if(devolvido !== "true" && devolvido !== "false"){
            throw new Error("Informe 'true' ou 'false'")
        }
        if(devolvido){
            emprestimos = emprestimos.filter(e => e.devolvido === true)
        } else {
            emprestimos = emprestimos.filter(e => e.devolvido === false)
        }
        
    }
    if(data){
        const dataConvertida = new Date(data)
        if(Number.isNaN(dataConvertida.getTime())){
            throw new Error("Data inválida.")
        }
        emprestimos = emprestimos.filter(e => e.dataEmprestimo === data)
    }

    if (ordenar === "data") {
    emprestimos.sort((a, b) =>
        ordem === "desc"
            ? new Date(b.dataEmprestimo) - new Date(a.dataEmprestimo)
            : new Date(a.dataEmprestimo) - new Date(b.dataEmprestimo)
    );
}

        if (pagina) {

        //Converter a requisição em Number caso não seja passado nenhum valor considera o valor pré definido  
        const paginaNumero = pagina ? Number(pagina) : 1
        const limitNumero = limit ? Number(limit) : 10

        //VERIFICO SE REALMENTE O VALOR PASSADO É NUMERO COM O isNaN
        if (Number.isNaN(paginaNumero) || Number.isNaN(limit)) {
            throw new Error("Página e limite deve ser números.")
        }

        //VERIFICO SE O VALOR INFORMADO É MENOR QUE 0 CASO SEJA LANÇO UM ERROR
        if (paginaNumero <= 0 || limitNumero <= 0) {
            throw new Error("Página e Limite deve ser maior que zero.")
        }


        const inicio = (paginaNumero - 1) * limitNumero;
        const fim = inicio + limitNumero

        emprestimos = emprestimos.slice(inicio, fim)
    }

    return emprestimos
}

function excluirLivro({idLivro}){
    const livroEmprestimo = emprestimoDatabases.find(l=> l.livroId === idLivro);

    if(livroEmprestimo && !livroEmprestimo.devolvido){
        throw new Error("Livro encontra-se emprestado.")
    }

    const livro = buscarLivro(idLivro)

    const indice = livroDatabases.indexOf(livro)

    livroDatabases.splice(indice, 1)

    return livro

}

module.exports = {
    cadastrarLivro,
    cadastrarEmprestimo,
    devolverEmprestimo,
    listarEmprestimos,
    excluirLivro
   
}


//nandaa_cosstta