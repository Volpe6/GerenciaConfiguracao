/**
 * Arquivo: config/database.js
 * Descrição: arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.
 * Author: Andrew, Jeferson
 */
const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host:    process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port   : process.env.DB_PORT
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