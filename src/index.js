// Importação dos módulos necessários
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const documentRoutes = require("./routes/documentRoutes");

// Criação da aplicação Express
const app = express();

// Configuração do middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Conexão com o banco de dados MongoDB
mongoose.connect("mongodb://mongodb:27017/tcs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuração das rotas da aplicação
app.use("/api", emailRoutes);
app.use("/api", documentRoutes);

// Inicialização do servidor na porta 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
