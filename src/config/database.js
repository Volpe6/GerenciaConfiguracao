/**
 * Arquivo: config/database.js
 * Descrição: arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.
 * Author: Andrew, Jeferson
 */
const { Sequelize } = require('sequelize');

const env = require('../../env.json');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(env.database, env.user, env.password, {
    host   : env.host,
    dialect:'postgres',
    port   : env.port
});

//cria as tabelas caso elas nao existam
async function sincronizaTabelas() {
    try {
        await sequelize.sync(
            // {force: true}//Isso cria a tabela, descartando-a primeiro se ela já existia
        );
    } catch (error) {
        console.log(error);
    }
}

sincronizaTabelas();


module.exports = sequelize;