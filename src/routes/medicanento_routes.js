const express = require('express');
const router = express.Router();
const auth_verify = require('../middleware/auth_verify')
const medicamento_controller = require('../controllers/medicamento_controller')

router.post('/', auth_verify, medicamento_controller.post)

router.get('/get_whole_infos', auth_verify, medicamento_controller.get)

router.get('/get_infos_like/:nome', auth_verify, medicamento_controller.getLike)

router.get('/get_info_medicamento/:nome', auth_verify, medicamento_controller.getInfo)

router.put('/update_medicamento', auth_verify, medicamento_controller.put)

router.delete('/:id', auth_verify, medicamento_controller.delete)

module.exports = router;