const express = require('express');
const router = express.Router();
const auth_verify = require('../middleware/auth_verify')
const chat_controller = require('../controllers/chat_controller')

router.post('/', auth_verify, chat_controller.post)

router.get('/:id', auth_verify, chat_controller.get)


module.exports = router;