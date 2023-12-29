const constants = require('../utils/constants');
const Database = require('../data/database');

const db = new Database();

exports.resetPasswordUser = async (req) => {
    await db.connect();
    const { code, password } = req.body;
    
    const rows = await db.query(constants.SQL_UPDATE_PASSWORD_FROM_CODE, [password, code]);
    await db.query(constants.SQL_UPDATE_COD_NULL, [null, code])

    await db.close;

    return rows
}