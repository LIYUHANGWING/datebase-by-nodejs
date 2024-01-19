const express = require('express')
//
const router=express.Router()

const actinfohander= require('../write/goods')

router.post('/goodsin',actinfohander.actin)
//router.get('/')
router.post('/goodsin/upact',actinfohander.updateactInfo)

module.exports = router