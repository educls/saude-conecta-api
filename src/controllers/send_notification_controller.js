const constants = require('../utils/constants')
const admin = require('firebase-admin');

exports.post = async (req, res) => {
    try {
        const serviceAccount = require(constants.PATH_FOR_KEY_FIREBASE);

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }

        const receiveRegistrationToken = req.body.ReceiverToken;
        const titleNotification = req.body.TitleNotification;
        const bodyNotification = req.body.BodyNotification;

        const message = {
            data: {
                key1: 'value1',
                key2: 'value2',
            },
            notification: {
                title: titleNotification,
                body: bodyNotification,
            },
            token: receiveRegistrationToken,
        };

        admin.messaging().send(message)
            .then((response) => {
                console.log(constants.NOTIFICATION_SEND, response);
                res.status(200).json(
                    { message: constants.NOTIFICATION_SEND }
                );
            })
            .catch((error) => {
                console.error(constants.NOTIFICATION_NOT_SEND, error);
                res.status(400).json(
                    { message: constants.NOTIFICATION_NOT_SEND }
                );
            });

    } catch (err) {
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            { message: constants.SERVER_ERROR }
        );
    }
}