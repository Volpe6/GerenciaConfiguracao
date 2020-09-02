const express           = require('express');
const controllerProduto = require('./controller/controllerProduto');

const rotas = express.Router();

rotas.use(express.static('public'));

//Rotas de produto
rotas.get('/produto'           , controllerProduto.index);//retorna todos os produtos
rotas.get('/produto/:id'       , controllerProduto.findById);//retorna um produto de id especifico
rotas.get('/produto/remove/:id', controllerProduto.remove);//remove um produto pelo id
/*
atualiza/cria um registro
para atualizar um registro basta passar o id junto das outras informações no json,
para criar um registro basta passar um id em branco nas requisições
*/
rotas.post('/produto', controllerProduto.store);

module.exports = rotas;