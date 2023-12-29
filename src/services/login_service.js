const mysql = require('mysql2/promise');
const Database = require('../data/database')
const constants = require('../utils/constants');

const db = new Database();

exports.verificaSeEmailUsuarioExistente = async (req) => {

    await db.connect();

    const {email} = req.body;

    const rows = await db.query(constants.SQL_SELECT_EMAIL_AND_STATUS, [email, 'ativo'])
    await db.close();

    return rows
}