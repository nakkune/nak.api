const server = require('./server/bin/www')
const logger = require('./lib/logger')(module)

const port = 8088
server.listen(port, () => {
    logger.info(`Server is Starting...`)
})