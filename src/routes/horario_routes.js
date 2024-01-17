const express = require('express');
const router = express.Router();
const horarios_controller = require('../controllers/horarios_controllers');

router.post('/', horarios_controller.post)


module.exports = router;