const mysql = require('mysql2/promise');
const Database = require('../data/database')
const constants = require('../utils/constants');

const db = new Database();

exports.verificaSeEmailUsuarioExistente = async (req) => {

    await db.connect();

    const {email, password} = req.body;
    console.log(email + password)

    const rows = await db.query(constants.SQL_SELECT_LOGIN, [email, password, 'ativo'])
    console.log(rows)
    await db.close();

    return rows
}