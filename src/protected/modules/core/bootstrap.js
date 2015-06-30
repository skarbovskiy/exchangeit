'use strict';
var Promise = require('bluebird');
var redis = require('redis');
var lodash = require('lodash');
var Sequelize = require('sequelize');

var config = require('../../config/' + (process.env.NODE_ENV || 'development'));
var bootstrappedData = null;


var Service = {
    init: function (preBootstrappedData) {
        bootstrappedData = preBootstrappedData;
        return Promise.props({
            orm: initTasks.orm(),
            redis: initTasks.redis()
        }).then(function (data) {
            bootstrappedData = lodash.assign(bootstrappedData, data);
        });
    },
    get: function (name) {
        return bootstrappedData ? bootstrappedData[name] : undefined;
    }
};

var initTasks = {
    orm: function () {
        return new Promise(function (resolve) {
            var orm = new Sequelize(config.pg.database, config.pg.username, config.pg.password, {
                host: process.env.PPOSTGRES_PORT_5432_TCP_ADDR || config.pg.host,
                port: process.env.POSTGRES_PORT_5432_TCP_PORT || '5432',
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            });
            resolve(orm);
        });
    },
    redis: function () {
        return new Promise(function (resolve) {
            var connection = redis.createClient(
                process.env.REDIS_PORT_6379_TCP_PORT || config.redis.port,
                process.env.REDIS_PORT_6379_TCP_ADDR || config.redis.host,
                config.redis.options
            );

            connection.on('error', function (error) {
                Service.get('logger').error(
                    'redis connection error',
                    {message: error.message, stack: error.stack},
                    function () {
                        process.exit(1);
                    }
                );
            });
            resolve(connection);
        });
    }
};

module.exports = Service;