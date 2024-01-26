const constants = require('../utils/constants')
const MedicamentoModel = require('../models/MedicamentoModel')
const medicamento_service = require('../services/medicamento_service')


exports.post = async (req, res) => {
    try{
        const { Nome_Medicamento, Forma_Farmaceutica, Fabricante, Data_Fabricacao, Data_Validade, Prescricao_Medica, Estoque } = req.body;

        const novoMedicamento = new MedicamentoModel(Nome_Medicamento, Forma_Farmaceutica, Fabricante, Data_Fabricacao, Data_Validade, Prescricao_Medica, Estoque)

        const result = await medicamento_service.cadastraMedicamento(novoMedicamento);

        if(result){
            res.status(201).json(
                {message: "Medicamento Cadastrado"}
            )
        }else{
            res.status(400).json(
                {message: "Medicamento não Cadastrado"}
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
        let medicamentos = []

        medicamentos = await medicamento_service.listaMedicamentos()

        if(medicamentos == undefined){
            return res.status(401).json(
                {message: "Nenhum Medicamento Encontrado"}
            )
        }
        res.status(200).json({medicamentos})


    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.getLike = async (req, res) => {
    try{
        let medicamentos = []
        const nome = req.params.nome;

        medicamentos = await medicamento_service.listaMedicamentosLike(nome);

        if(medicamentos == undefined){
            return res.status(401).json(
                {message: "Nenhum Medicamento Encontrado"}
            )
        }

        let searchMedicamentos = medicamentos.map(medicamento => medicamento['Nome_Medicamento']);
        searchMedicamentos = Array.from(searchMedicamentos);
        console.log(searchMedicamentos);

        res.status(200).json({searchMedicamentos})

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.getInfo = async (req, res) => {
    try{
        let medicamentos = []
        const nome = req.params.nome;

        medicamentos = await medicamento_service.listaMedicamento(nome);

        if(medicamentos == undefined){
            return res.status(401).json(
                {message: "Nenhum Medicamento Encontrado"}
            )
        }
        res.status(200).json({medicamentos})

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.put = async (req, res) => {
    console.log(req.body)
    try{
        const { ID_Medicamento, Estoque } = req.body

        const resultado = await medicamento_service.atualizaMedicamento(ID_Medicamento, Estoque);

        if(resultado.affectedRows > 0){
            res.status(201).json(
                {
                    message: 'Cadastro Atualizado'
                }
            )
        }else{
            res.status(401).json({message: 'Cadastro Não Encontrado'})
        }

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.delete = async (req, res) => {
    try{
        const ID_Medicamento = req.params.id

        const result = await medicamento_service.deletaMedicamento(ID_Medicamento);

        if(result.affectedRows == 0) {
            return res.status(401).json(
                {message: "Medicamento Não Encontrado"}
            )
        }
        res.status(200).json(
            {message: "Medicamento Deletado com Sucesso"}
        )

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}