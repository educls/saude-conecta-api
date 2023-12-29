const express = require('express');
const router = express.Router();
const verifyMailController = require('../controllers/verify_mail_controller')

router.post('/', verifyMailController.post)

module.exports = router;