const serviceConsulta = require('../services/consulta_service')
const serviceMedicos = require('../services/medicos_service')
const ConsultaModel = require('../models/ConsultaModel')
const constants = require('../utils/constants')
const ConsultaChangeStateModel = require('../models/ChangeStateModel')

exports.post = async (req, res) => {
    try{
        const {ID_Medico, Especialidade, DataConsulta, HoraConsulta } = req.body
        
        if (ID_Medico === '' || Especialidade === '' || DataConsulta === '' || HoraConsulta === ''){
            res.status(400).json(
                {message: constants.SOME_FIELDS_NULL}
            )
        }
        const id_paciente = req.user.id

        const novaConculta = new ConsultaModel(id_paciente, ID_Medico, Especialidade, DataConsulta, HoraConsulta, "Em Espera")

        const result = await serviceConsulta.agendaConsulta(novaConculta)

        if(result == true){
            res.status(201).json(
                {message: "consulta registrada"}
            )
        }else{
            res.status(401).json(
                {message: "consulta nao registrada"}
            )
        }
    }catch (err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.postChangeState = async (req, res) => {
    try{
        const { Estado, ID_Consulta } = req.body
        
        if (ID_Consulta === '' || Estado === ''){
            res.status(400).json(
                {message: constants.SOME_FIELDS_NULL}
            )
        }

        const result = await serviceConsulta.changeStateConsulta(Estado, ID_Consulta)

        if(result == true){
            res.status(201).json(
                {message: "consulta finalizada"}
            )
        }else{
            res.status(401).json(
                {message: "consulta nao finalizada"}
            )
        }
    }catch (err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }    
}

exports.get = async (req, res) => {
    try{
        let consultas = []
        const id_paciente = req.user.id

        consultas = await serviceConsulta.listaConsultas(id_paciente)

        if(consultas == undefined){
            return res.status(401).json(
                {message: constants.QUERY_NOT_FOUND}
            )
        }
        res.status(200).json(
            {consultas}
        )
    }catch (err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.getForMedicos = async (req, res) => {
    try{
        const idMedico = req.user.id
        let consultas = []

        consultas = await serviceConsulta.getConsultaForMedico(idMedico)

        if(consultas == undefined){
            return res.status(401).json(
                {message: constants.QUERY_NOT_FOUND}
            )
        }
        res.status(200).json(
            {consultas}
        )

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.delete = async (req, res) => {
    try{
        
        const id = req.params.id

        const result = await serviceConsulta.deleteConsulta(id)

        if(result == 0) {
            return res.status(401).json(
                {message: constants.QUERY_NOT_FOUND}
            )
        }
        res.status(200).json(
            {message: constants.QUERY_DELETED_SUCESSFULL}
        )
    }catch (err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}