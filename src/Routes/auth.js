const express = require('express')
const router = express.Router()

const { registerCtrl} = require('../Controllers/auth')

//Registar un usuario
router.post('/register',registerCtrl)

module.exports = router