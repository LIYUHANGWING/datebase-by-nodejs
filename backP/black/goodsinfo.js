const express = require('express')
//
const router=express.Router()

const gsinfohander= require('../write/goodsinfo')

router.get('/goodsinfo',gsinfohander.getgods)

module.exports = router