const winston = require('winston')

const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = {
    error: winston.createLogger({
        level: 'error',
        format: format,
        transports: [new winston.transports.File({ filename: './src/log/error.log' })]
    }),
    warn: winston.createLogger({
        level: 'warn',
        format: format,
        transports: [new winston.transports.File({ filename: './src/log/warn.log' })]
    }),
    info: winston.createLogger({
        level: 'info',
        format: format,
        transports: [new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: './src/log/app.log' })
        ]
    })


}

module.exports = logger