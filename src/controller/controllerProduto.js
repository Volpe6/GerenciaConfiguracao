const Produto  = require('../model/produto');

const ControllerProduto = {
    async index(req, res) {
        const registros = await Produto.findAll();
        return res.status(200).json({
            result   : 'sucesso',
            msg      : 'registros recuperados com sucesso',
            registros:registros
        });
    },
    async findById(req, res) {
        const { id } = req.params
        if(id === '') {
            return res.status(200).json({
                result: 'erro',
                msg   : 'id não informado'
            });
        }
        let registro = null;
        let mensagem = '';
        try {
            registro = await Produto.findOne({ 
                where: { 
                    id: id 
                } 
            });
            mensagem = registro == null? 'Registro não encontrado' : 'registro recuperado com sucesso' 
            if(!(registro == null)) {
                registro = registro.dataValues;
            }
        } catch (error) {
            return res.status(200).json({
                result: 'erro',
                msg   : error
            });
        }
        return res.status(200).json({
            result  : 'sucesso',
            msg     : mensagem,
            registro: registro  
        });
    },
    //salva e atualiza
    async store(req, res) {
        const entidade = req.body;
        
        let model    = null;
        let mensagem = '';
        //tenta incluir/atualizar o registro
        try {
            if(entidade.id) {
                await Produto.update({
                    descricao : entidade.descricao,
                    fabricante: entidade.fabricante
                },{
                    where: {
                        id: entidade.id
                    }
                });
                mensagem = 'Registro atualizado com sucesso';
            } else {
                model = await Produto.create({ 
                    descricao : entidade.descricao,
                    fabricante: entidade.fabricante
                });
                mensagem = 'Registro incluido com sucesso';
            }
        } catch (error) {
            return res.status(200).json({
                result: 'erro',
                msg   : error
            });
        }
        return res.status(200).json({
            result: 'sucesso',
            msg   : mensagem    
        });
    },
    async remove(req, res) {
        const { id } = req.params;
        //verifica se existe o id
        if(id === '') {
            return res.status(200).json({
                result: 'erro',
                msg   : 'id não informado'
            });
        }
        //tenta remover o registro
        try {
            await Produto.destroy({
                where: {
                  id: id
                }
            });
        } catch (error) {
            return res.status(200).json({
                result: 'erro',
                msg   : error
            });
        }
        return res.status(200).json({
            result: 'sucesso',
            msg   : 'registro removido com sucesso'    
        });
    }
}

module.exports = ControllerProduto;