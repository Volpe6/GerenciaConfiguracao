const express           = require('express');
const controllerProduto = require('./controller/controllerProduto');

const rotas = express.Router();

rotas.use(express.static('public'));

//Rotas de produto
rotas.get('/produto'    , controllerProduto.index);
rotas.get('/produto/:id', controllerProduto.findById);
rotas.post('/produto'           , controllerProduto.store);
rotas.post('/produto/remove/:id', controllerProduto.remove);

module.exports = rotas;