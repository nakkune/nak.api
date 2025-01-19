const logger = require('../../lib/logger')(module)

module.exports = {
    test
}

function test(req, res){
    logger.info('test')
    res.status(200).json({'send': 'OK'})
}