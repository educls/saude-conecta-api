const constants = require('../utils/constants')
const horarios_service = require('../services/horarios_service');

exports.post = async (req, res) => {
    try{
        const { Data, idMedico } = req.body;

        let horariosAgendados = [];

        horariosAgendados = await horarios_service.getHorariosDisponiveis(Data, idMedico);
        
        if(horariosAgendados != false){
            res.status(200).json(
                {horariosAgendados}
            )
        }else{
            res.status(200).json(
                {horariosAgendados}
            )
        }

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}