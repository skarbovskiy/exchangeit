'use strict';
var async = require('async');
var redis = require('redis');
var lodash = require('lodash');

var config = require('../../config/' + (process.env.NODE_ENV || 'development'));
var bootstrappedData = null;
var initTasks = {
    pg: function (callback) {
        var pgHandler = require('./pgHandler');
        pgHandler(config.pg, function (client, done) {
            done();
            callback(null, function (callback) {
                pgHandler(config.pg, callback);
            });
        });
    },
    redis: function (callback) {
        var connection = redis.createClient(config.redis.port, config.redis.host, config.redis.options);

        connection.on('error', function (error) {
            Service.get('logger').error(
                'redis connection error',
                {message: error.message, stack: error.stack},
                function () {
                    process.exit(1);
                }
            );
        });
        callback(null, connection);
    }
};

var Service = {
    init: function (preBootstrappedData, callback) {
        bootstrappedData = preBootstrappedData;
        async.parallelLimit(initTasks, 5, function (error, data) {
            if (error) {
                return callback(error);
            }
            bootstrappedData = lodash.assign(bootstrappedData, data);
            return callback(null);
        });
    },
    get: function (name) {
        return bootstrappedData ? bootstrappedData[name] : undefined;
    }
};

module.exports = Service;