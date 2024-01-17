const express = require('express');
const router = express.Router();
const auth_verify = require('../middleware/auth_verify')
const receita_controller = require('../controllers/receita_controller')

router.post('/', auth_verify, receita_controller.post)

router.get('/get_info', auth_verify, receita_controller.get)

module.exports = router;