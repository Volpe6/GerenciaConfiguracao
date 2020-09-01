const express           = require('express');
const controllerProduto = require('./controller/controllerProduto');

const rotas = express.Router();

//Rotas de produto
rotas.get('/produto'    , controllerProduto.index);//retorna todos os produtos
rotas.get('/produto/:id', controllerProduto.findById);//retorna um produto de id especifico
rotas.post('/produto'           , controllerProduto.store);
rotas.post('/produto/remove/:id', controllerProduto.remove);

module.exports = rotas;