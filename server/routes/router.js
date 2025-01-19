const express = require('express')
const router = express.Router()
const appsRouters = require('./approuters/apps')

router.use('/apps', appsRouters)

module.exports = router