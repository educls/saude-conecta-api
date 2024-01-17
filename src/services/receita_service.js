const constants = require('../utils/constants')
const Database = require("../data/database")
const uploadArquivoFTP = require('../utils/functions/conectionFTPserver')


const db = new Database();

exports.cadastraReceita = async (atestado, arquivo) => {
    const { ID_Medico, ID_Paciente, DataEmissao, Especialidade } = atestado

    await db.connect();
    const result = await db.query(constants.SQL_INSERT_RECEITA, [ID_Medico, ID_Paciente, DataEmissao, Especialidade])
    db.close();

    uploadArquivoFTP(`${ID_Paciente}_${result.insertId}_receita`, arquivo)

    if(result){
        return true
    }else {
        return false
    }
}

exports.listaReceitas = async (id) => {
    await db.connect();

    const rows = await db.query(constants.SQL_SELECT_RECEITA, [id])
    await db.close();

    return rows
}