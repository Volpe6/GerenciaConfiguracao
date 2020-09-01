const express           = require('express');
const controllerProduto = require('./controller/controllerProduto');

const rotas = express.Router();

//Rotas de produto
rotas.get('/produto'            , controllerProduto.index);//retorna todos os produtos
rotas.get('/produto/:id'        , controllerProduto.findById);//retorna um produto de id especifico
/*
atualiza/cria um registro
para atualizar um registro basta passar o id junto das outras informações no json,
para criar um registro basta passar um id em branco nas requisições
*/
rotas.post('/produto'           , controllerProduto.store);
rotas.post('/produto/remove/:id', controllerProduto.remove);

module.exports = rotas;