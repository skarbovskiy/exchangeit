'use strict';
var express = require('express');
var path = require('path');
var winston = require('winston');
var LogstashUDP = require('winston-logstash-udp').LogstashUDP;
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errors = require('./modules/core/errors');
var bootstrapper = require('./modules/core/bootstrap');
var logger = new (winston.Logger)({
    transports: [
        new LogstashUDP({
            port: '9999',
            appName: 'exchangeit',
            host: 'cookiteasy.ru',
            handleExceptions: true
        }),
        new winston.transports.Console({
            colorize: true,
            handleExceptions: true
        })
    ]
});

//process.on('uncaughtException', function (exception) {
//    console.log(exception);
//    logger.error('fatal', {message: error.message || JSON.stringify(error), stack: exception.stack}, function () {
//        process.exit(1);
//    });
//});

logger.info('starting application bootstrap');

bootstrapper.init({logger: logger})
    .then(function () {
        logger.info('application bootstrapped successfully');

        var environment  = process.env.NODE_ENV || 'development';
        //var useSSL = process.env.SSL === 'true';

        logger.info('starting express');
        var app = express();

        //app.enable('trust proxy');
        app.disable('x-powered-by');
        app.set('port', process.env.PORT || 7777);
        app.set('env', environment);
        if (environment === 'development') {
            app.use(morgan('dev'));
        }

        app.use(express.static(path.join(__dirname, '..', 'public')));
        app.use(bodyParser.json());

        app.use(function (request, response, next) {
            response._startTime = Date.now();
            next();
        });

        app.use(require('./routes'));

        app.use(function (error, request, response, next) {
            if (error.name && error.name === 'SequelizeValidationError') {
                error = new errors.HttpError(400, error.message, error.errors);
            }
            if (error.status && error.json) {
                logger.warn(
                    'application warning',
                    {message: error.message, stack: error.stack, status: error.status, json: error.json}
                );
                return response.status(error.status).json(error.json);
            } else if (error.status) {
                logger.warn('application warning', {message: error.message, stack: error.stack, status: error.status});
                return response.status(error.status).json({error: error.message});
            } else {
                logger.error('application error', {message: error.message, stack: error.stack});
                response.status(500).send({error: 'internal error'});
            }
        });

        //server = null;
        //if (useSSL) {
        //    var options = {
        //        pfx: fs.readFileSync(path.join(__dirname, '..', '..', 'externals/ssl-keys/' + appName + '.pfx')),
        //        passphrase: fs.readFileSync(path.join(__dirname, '..', '..', 'externals/ssl-keys/' + appName + '.pwd'))
        //    };
        //    server = https.createServer(options, app);
        //} else {
        var server = http.createServer(app);
        //}

        server.listen(app.get('port'), function () {
            logger.info(
                'application started',
                {pid: process.pid, port: app.get('port'), environment: environment}
            );
        });
    })
    .catch(function (error) {
        return logger.error(
            'error while bootstrapping application',
            {message: error.message || JSON.stringify(error), stack: error.stack},
            function () {
                process.exit(1);
            }
        );
    })


