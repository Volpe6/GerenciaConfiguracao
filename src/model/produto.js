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


module.exports = Produto;