const constants = require('../utils/constants')
const Database = require('../data/databaseChat')

const db = new Database();

exports.cadastraMensagem = async (novaMessage) => {
    const { id, text, sender, receiver, hourMessage } = novaMessage

    await db.connect();
    const result = await db.query('INSERT INTO mensagens (ID_Mensagem, Conteudo, Sender, Receiver, Time_Message) VALUES (?, ?, ?, ?, ?)', [id, text, sender, receiver, hourMessage])

    db.close();

    return result
}


exports.getMensagem = async (id) => {
    await db.connect();
    const result = await db.query('SELECT * from mensagens WHERE ID_Mensagem = ? ORDER BY Time_Message', [id])

    db.close();
    return result
}