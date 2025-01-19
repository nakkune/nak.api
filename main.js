const server = require('./server/bin/www')
const config = require('./config/config')
const logger = require('./lib/logger')(module)

const port = config.common.port
server.listen(port, () => {
    logger.info(`Server is Starting...`)
})