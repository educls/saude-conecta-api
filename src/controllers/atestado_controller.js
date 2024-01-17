const serviceAtestado = require('../services/atestado_service')
const AtestadoModel = require('../models/AtestadoModel')
const constants = require('../utils/constants')
const getAtestadoFromFTP = require('../utils/functions/getArquivoFromFtp')

exports.post = async (req, res) => {
    try{
        const { ID_Paciente, DataEmissao, Especialidade, arquivo } = req.body
        const { id } = req.user

        const novoAtestado = new AtestadoModel(id, ID_Paciente, DataEmissao, Especialidade)

        const result = await serviceAtestado.cadastraAtestado(novoAtestado, arquivo)

        if(result == true){
            res.status(201).json(
                {message: constants.ATESTADO_REGISTERED}
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
        let atestados = []

        const id_paciente = req.user.id

        atestados = await serviceAtestado.listaAtestado(id_paciente)

        if(atestados == undefined){
            return res.status(401).json(
                {message: constants.ATESTADO_NOT_FOUND}
            )
        }
        res.status(200).json({atestados})
        
    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.getAtestadoPdf = async (req, res) => {
    try{

        const nome_arquivo = `${req.params.id}.pdf`;
        console.log(nome_arquivo)

        const arquivo = await getAtestadoFromFTP(nome_arquivo, res)

        res.setHeader('Content-disposition', `attachment; filename=${nome_arquivo}`);
        res.setHeader('Content-type', 'application/pdf');

        console.log(arquivo)

        if(arquivo !== undefined){
            return res.status(401).json(
                {message: constants.ATESTADO_NOT_FOUND}
            )
        }
        res.status(200).json({arquivo})
        
    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.delete = async (req, res) => {
    try{
        const id_atestado = req.params.id

        const result = await serviceAtestado.deletaAtestado(id_atestado)

        if(result.affectedRows == 0) {
            return res.status(401).json(
                {message: constants.ATESTADO_NOT_FOUND}
            )
        }
        res.status(200).json(
            {message: constants.ATESTADO_DELETED_SUCESSFUL}
        )

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}