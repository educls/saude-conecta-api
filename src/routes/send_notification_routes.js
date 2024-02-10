const express = require('express');
const router = express.Router();
const send_notification_controller = require('../controllers/send_notification_controller')

router.post('/', send_notification_controller.post)

module.exports = router;