const Produto  = require('../model/produto');

const ControllerProduto = {
    //retorna todos os registros da tabela
    async index(req, res) {
        const registros = await Produto.findAll();
        return res.status(200).json({
            result   : 'sucesso',
            msg      : 'registros recuperados com sucesso',
            registros:registros
        });
    },
    //procura um refistro pelo id
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
            registro = await Produto.findOne({ where: { id: id } });
            registro = (!(registro == null)) ? registro.dataValues : registro;
            mensagem = registro == null? 'Registro não encontrado' : 'registro recuperado com sucesso' 
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
    //salva/atualiza
    async store(req, res) {
        const entidade = req.body;
        
        let model    = null;
        let mensagem = '';//mensagem a ser repassada ao front
        //tenta incluir/atualizar o registro
        try {
            if(entidade.id) {
                await Produto.update({
                    descricao : entidade.descricao,
                    fabricante: entidade.fabricante
                },{
                    where: {
                        id: entidade.id
                    }});
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
    //remove um registro pelo id
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
            await Produto.destroy({ where: {id: id } });
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