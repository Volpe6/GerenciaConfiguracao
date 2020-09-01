const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Produto extends Model {}
    
Produto.init({
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    //outras opções do modelo
    sequelize,//instancia da conexao
    modelName: 'Produto',
    tableName: 'tbproduto',
    timestamps: false
});

async function teste() {
    try {
        
        await Produto.sync({ force: true }) // Isso cria a tabela, descartando-a primeiro se ela já existia
    } catch (error) {
        console.log('erro');
    }
    try {
        await Produto.create({ descricao: 'teste', fabricante:'teste' });
      }
      catch(e) {
        console.log('Catch an error: ', e)
      }
    para = 1;
}

// teste();

// await Produto.sync({ force: true }) // Isso cria a tabela, descartando-a primeiro se ela já existia

module.exports = Produto;