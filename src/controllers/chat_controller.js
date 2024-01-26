const constants = require('../utils/constants')
const chat_service = require('../services/chat_services')
const ChatModel = require('../models/ChatModel')

exports.post = async (req, res) => {

    const idSender = req.user.id
    const { text, remetent } = req.body

    if (!text || !idSender || !remetent) {
        return res.status(400).json({ error: 'Dados inválidos.' });
    }

    try{
        const novaMessage = new ChatModel(text, idSender, remetent)

        const result = await chat_service.cadastraMensagem(novaMessage)

        if(result){
            res.status(201).json(
                {message: "Mensagem Enviada"}
            )
        }else{
            res.status(400).json(
                {message: "Mensagem não Enviada"}
            )
        }

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
}

exports.get = async (req, res) => {
    try{
        const ID_Mensagem = req.params.id
        let mensagens = []

        mensagens = await chat_service.getMensagem(ID_Mensagem)

        if(mensagens){
            res.status(200).json(
                {mensagens}
            )
        }else{
            res.status(400).json(
                {mensagens}
            )
        }

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar mensagens.' });
    }
}