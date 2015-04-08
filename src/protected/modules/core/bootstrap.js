'use strict';
var async = require('async');

var config = require('../../config/' + (process.env.NODE_ENV || 'development'));
var bootstrappedData = null;
var initTasks = {
    pg: function (callback) {
        var pgHandler = require('./pgHandler');
        pgHandler(config.pg, function (client, done) {
            done();
            callback(null, function (callback) {
                pgHandler(config.pg, callback);
            })
        });
    }
};

module.exports = {
    init: function (preBootstrappedData, callback) {
        bootstrappedData = preBootstrappedData;
        async.parallelLimit(initTasks, 5, function (error, data) {
            if (error) {
                return callback(error);
            }
            bootstrappedData = data;
            return callback(null);
        });
    },
    get: function (name) {
        return bootstrappedData ? bootstrappedData[name] : undefined;
    }
};