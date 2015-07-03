'use strict';

var program = require('commander');
var winston = require('winston');
var Promise = require('bluebird');
var LogstashUDP = require('winston-logstash-udp').LogstashUDP;
var errors = require('./modules/core/errors');
var bootstrapper = require('./modules/core/bootstrap');
var logger = new (winston.Logger)({
    transports: [
        new LogstashUDP({
            port: '9999',
            appName: 'exchangeit-cli',
            host: 'cookiteasy.ru',
            handleExceptions: true
        }),
        new winston.transports.Console({
            colorize: true,
            handleExceptions: true
        })
    ]
});

var startTime = null;

logger.info('starting application bootstrap');

bootstrapper.init({logger: logger})
    .then(function () {
        program
            .version('0.0.1')
            .usage('[options] <path ...>')
            .parse(process.argv);
        logger.info(
            'application bootstrapped successfully',
            {
                task: program.args[0],
                argv: JSON.stringify(process.argv)
            }
        );
        startTime = Date.now();
        return require('./tasks/' + program.args[0].split(':').join('/'))(program);
    })
    .then(function (response) {
        logger.info(
            'application finished successfully',
            {
                task: program.args[0],
                argv: JSON.stringify(process.argv),
                response: JSON.stringify(response),
                duration: Date.now() - startTime
            },
            function () {
                process.exit(0);
            }
        );
    })
    .catch(function (error) {
        logger.info(
            'application finished with error',
            {
                task: program.args[0],
                argv: JSON.stringify(process.argv),
                error: JSON.stringify(error.message),
                stack: JSON.stringify(error.stack),
                duration: Date.now() - startTime
            },
            function () {
                process.exit(1);
            }
        );
    });