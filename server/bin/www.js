const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const logger = require('../../lib/logger')(module)
const cors = require('cors')
const router = require('../routes/router')


logger.info('www start')

let server
const app = express()

app.use(cors())

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.enable('trust proxy')

app.use('/',router)

server = http.createServer(app)
server.on('listening', onListening)

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    logger.info('Listening on ' + bind)
}

module.exports = server