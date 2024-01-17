const constants = require('../utils/constants');
const Database = require('../data/database');

const db = new Database();

exports.getHorariosDisponiveis = async (Data, idMedico) => {

    await db.connect();
    const result = await db.query(constants.SQL_SELECT_HOURS_AVAILABLE, [Data, idMedico, 'Em Espera']);
    console.log(result)
    await db.close();

    if(result){
        return result
    }else {
        return false
    }
}