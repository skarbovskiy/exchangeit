'use strict';
var express = require('express');
var path = require('path');
var winston = require('winston');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var logger = new (winston.Logger)({
    transports: [
        //new LogstashUDP({
        //    port: config.port,
        //    appName: config.appName,
        //    host: config.host
        //}),
        new winston.transports.Console({
            colorize: true,
            handleExceptions: true
        })
    ]
});
logger.info('starting application bootstrap');

require('./modules/core/bootstrap').init({logger: logger}, function (error) {
    if (error) {
        return logger.error('error while bootstrapping application', {message: error.message, stack: error.stack});
    }
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

    app.use(function (error, request, response, next) {
        if (error.status && error.json) {
            logger.warn(
                'application warning',
                {message: error.message, stack: error.stack, status: error.status, json: error.json}
            );
            return response.status(error.status).json(error.json);
        } else if (error.status) {
            logger.warn('application warning', {message: error.message, stack: error.stack, status: error.status});
            return response.status(error.status).json({error: 'internal error'});
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
});

