const express = require('express');
const router = express.Router();
const atestado_controller = require('../controllers/atestado_controller')
const auth_verify = require('../middleware/auth_verify')

router.post('/', auth_verify, atestado_controller.post)

router.get('/get_info', auth_verify, atestado_controller.get)

router.get('/get_atestado_pdf/:id', auth_verify, atestado_controller.getAtestadoPdf)

router.delete('/:id', auth_verify, atestado_controller.delete)

module.exports = router;