const constants = require('../utils/constants')
const receita_service = require('../services/receita_service')
const ReceitaModel = require('../models/ReceitaModel')


exports.post = async (req, res) => {
    try{
        const { ID_Paciente, DataEmissao, Especialidade, arquivo} = req.body
        const { id } = req.user

        const novoAtestado = new ReceitaModel(id, ID_Paciente, DataEmissao, Especialidade)

        const result = await receita_service.cadastraReceita(novoAtestado, arquivo)

        if(result == true){
            res.status(201).json(
                {message: constants.RECEITA_REGISTERED}
            )
        }
    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.get = async (req, res) => {
    try{
        let receitas = []

        const id_paciente = req.user.id

        receitas = await receita_service.listaReceitas(id_paciente)

        if(receitas == undefined){
            return res.status(401).json(
                {message: constants.RECEITA_NOT_FOUND}
            )
        }
        res.status(200).json({receitas})
        
    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}
