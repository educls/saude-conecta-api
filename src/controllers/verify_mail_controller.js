const constants = require('../utils/constants')
const verifyMailService = require('../services/verify_mail_service')

exports.post = async (req, res) => {
    try{

        const { email } = req.body
        const services = email.split('@')[1].split('.')[0];

        const result = await verifyMailService.sendEmailForVerify(email, services)

        if(result == false){
            res.status(401).json(
                {message: constants.NODEMAILER_ERROR_SEND_MAIL}
            )
        }else{
            res.status(200).json(
                {message: constants.NODEMAILER_SEND_SUCESSFULL}
            )
        }

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}