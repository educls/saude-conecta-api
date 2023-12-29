const constants = require('../utils/constants')
const sendMailVerify =  require('../utils/functions/verify_email')
const Database = require('../data/database')

const db = new Database();

exports.sendEmailForVerify = async (email, services) => {

    const resultCod = await sendMailVerify(email, services);
    
    if(resultCod > 0){
        await db.connect();

        await db.query(constants.SQL_UPDATE_COD_USER, [resultCod, email]);
        await db.close();

        return true
    }else{
        return false
    }
}

exports.verifyCode = async (codigo) => {
    await db.connect();

    const result = await db.query(constants.SQL_SELECT_COD_USER, [codigo])

    await db.close();

    if(!result){
        return false
    }else{
        return result
    }
}
