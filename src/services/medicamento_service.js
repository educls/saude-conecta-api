const constants = require('../utils/constants')
const Database = require("../data/database")

const db = new Database();

exports.cadastraMedicamento = async (medicamento) => {
    const { Nome_Medicamento, Forma_Farmaceutica, Fabricante, Data_Fabricacao, Data_Validade, Prescricao_Medica, Estoque } = medicamento;

    await db.connect();
    const result = await db.query(constants.SQL_INSERT_MEDICAMENTO, [Nome_Medicamento, Forma_Farmaceutica, Fabricante, Data_Fabricacao, Data_Validade, Prescricao_Medica, Estoque])

    db.close();

    return result;
}

exports.listaMedicamentos = async () => {

    await db.connect();
    const result = await db.query(constants.SQL_SELECT_MEDICAMENTOS)

    db.close();

    return result;
}

exports.listaMedicamentosLike = async (search) => {

    await db.connect();
    const result = await db.query(constants.SQL_SELECT_LIKE_MEDICAMENTOS, [`${search}%`]);
    
    db.close();

    return result;
}

exports.deletaMedicamento = async (id) => {

    await db.connect();
    const result = await db.query(constants.SQL_DELETE_MEDICAMENTO, [id])

    db.close();

    return result;
}
