'use strict';
var pg = require('pg').native;

var logger = require('./bootstrap').get('logger');
var id = 0;
var connectionHandler = function (error, client, done, callback) {
    if (error) {
        logger.error('postgresql connection error', {message: error.message, stack: error.stack}, function () {
            process.exit(1);
        });
    }
    if (client && typeof(client.uniqID) === 'undefined') {
        client.uniqID = ++id;
        client.on('error', function (error) {
            logger.error('postgresql connection error', {message: error.message, stack: error.stack}, function () {
                client.end();
            });
        });
    }
    if (client) {
        client.setQuery = function (query, params, callback) {
            var startTime = + new Date();
            this.query(query, params, function (error, response) {
                logger.info('Postgres Db query', {
                    query: query,
                    pg_host: client.host,
                    clientID: client.uniqID,
                    values: JSON.stringify(client._activeQuery.values),
                    duration: (+ new Date()) - startTime,
                    rows: response && response.rows ? response.rows.length : null
                });
                if (typeof(callback) === 'function') {
                    callback(error, response);
                }
            });
        };
        callback(client, done);
    }
};


var service = function (config, callback) {
    pg.connect(config.connection, function (error, client, done) {
        connectionHandler(error, client, done, callback);
    });
};

//service.slave = function (config, callback) {
//    pg.connect(config.slave_connection, function (error, client, done) {
//        connectionHandler(error, client, done, callback);
//    });
//};

module.exports = service;
