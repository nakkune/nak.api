const {createLogger, format, transports} = require('winston')
const { combine, timestamp, label, printf } = format
const winstonDaily = require('winston-daily-rotate-file')

const appRoot = require('app-root-path')
//const process = require('process')
const logDir = `${appRoot}/logs`

//const fs = require('fs')
//const logDir = 'logs'
//if(!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const logFormat = printf(({ level,message,label,timestamp }) => {
    return `${timestamp} [${label}] ${level} : ${message}`
})


const getLable = function (callingModule) {

    let parts = callingModule.filename.split('/')
    if(parts.length === 1) parts = callingModule.filename.split('\\')

    return parts.pop()
}


/* 
* Log Level
*  error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
*/
module.exports = function(callingModule){
    return createLogger({
        format: combine(
            format.colorize({all: true}),
            label({
                label: getLable(callingModule)
                //label: 'board system'
            }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            logFormat,
        ),
        transports: [
            new transports.Console(),
            new winstonDaily({
                level: 'info',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.log`,
                maxFiles: '30d',
                zippedArchive: true,
            }),
            new winstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.error.log`,
                maxFiles: '30d',
                zippedArchive: true,
            })
        ],
        exceptionHandlers: [
            new winstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.exception.log`,
                maxFiles: '30d',
                zippedArchive: true,
            })
        ],
        level: 'debug'
    })
}

/*
const logger = winston.createLogger({
    format: combine(
        winston.format.colorize({all: true}),
        label({
            //label: getLable(callingModule)
            label: 'board system'
        }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat,
    ),
    transports: [
      new winston.transports.Console(),
      new winstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      })
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        })
    ],
    level: 'debug'
})

*/

/*
if(process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // log level별로 색상 적용하기
                winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
            )
        })
    )
}
*/


//module.exports = logger
