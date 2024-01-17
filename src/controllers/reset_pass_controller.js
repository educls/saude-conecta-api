const constants = require('../utils/constants')
const serviceResetPass = require('../services/reset_pass_service');
const verifyMailService = require('../services/verify_mail_service');

exports.post = async (req, res) => {
    try{
        const { code } = req.body;

        const result = await verifyMailService.verifyCode(code)

        if(result == false){
            res.status(401).json(
                {message: constants.CODE_INCORRECT}
            )
        }else{
            const result = await serviceResetPass.resetPasswordUser(req);
            if(result.affectedRows > 0){
                res.status(201).json(
                    {message: constants.PASS_UPDATE_SUCESSFUL}
                )
            }else{
                res.status(400).json(
                    {message: constants.PASS_UPDATE_UNSUCCESSFUL}
                )
            }
        }


    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}