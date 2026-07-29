
const express = require("express");
const bibliotecaRouter = require("./src/routes/bibliotecaRouter")


const app = express();
app.use(express.json());

const PORT = 3001;

app.use("/livros", bibliotecaRouter)
app.use("/emprestimos", )

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT)
})