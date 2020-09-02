require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const rotas   = require('./rotas');

const app    = express();
const server = require('http').Server(app);

app.use(cors());
app.use(express.json());//para informar ao express que as requisicoes utilizam json
app.use(rotas);

server.listen(3333, function() {
    console.log('servidor rodando na porta 3333');
});

