const express = require('express')
const router = express.Router()
const logger = require('../../../lib/logger')(module)
const controller = require('../../controller/controller')

router.get('/test', function(req, res){
    logger.debug('controller.test => start')
    controller.test(req, res)
    logger.debug('controller.test => end')
})

module.exports = router

