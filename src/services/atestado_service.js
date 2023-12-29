const constants = require('../utils/constants')
const Database = require("../data/database")
const uploadArquivoFTP = require('../utils/functions/conectionFTPserver')

const db = new Database();

exports.cadastraAtestado = async (atestado) => {
    const { ID_Medico, ID_Paciente, DataEmissao } = atestado

    await db.connect();
    const result = await db.query(constants.SQL_INSERT_ATESTADO, [ID_Medico, ID_Paciente, DataEmissao])
    db.close();

    uploadArquivoFTP(`${ID_Paciente}_${result.insertId}`)

    if(result){
        return true
    }else {
        return false
    }
}

exports.listaAtestado = async (id) => {
    await db.connect();

    const rows = await db.query(constants.SQL_SELECT_ATESTADO, [id])
    await db.close();

    return rows
}

exports.deletaAtestado = async (id) => {
    await db.connect();

    const rows = await db.query(constants.SQL_DELETE_ATESTADO, [id])
    await db.close();

    return rows
}