const express = require('express')
const router = express.Router();
const resetPasswordUser = require('../controllers/reset_pass_controller')

router.post('/', resetPasswordUser.post)

module.exports = router;