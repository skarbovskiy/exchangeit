'use strict';
var lodash = require('lodash');
var uuid = require('node-uuid');

var redis = require('./bootstrap').get('redis');

var keyLifeTime = 15 * 60; //15 minutes

var Store = {
    checker: {
        process: function (token, ip, callback) {
            this.checker._getDataFromRedis(token, function (error, data) {
                if (!error) {
                    this.checker._updateUserActivity(token);
                }
                callback(error, data);
            });
        },

        _getDataFromRedis: function (token, callback) {
            redis.hgetall('session_' + token, function (error, data) {
                if (error || !data) {
                    return callback(error ? error : new Error('no auth data found'), null);
                }
                var returnObject = {};
                lodash.keys(data).forEach(function (key) {
                    returnObject[key] = JSON.parse(data[key]);
                });
                callback(null, returnObject);
            });
        },

        _updateUserActivity: function (token) {
            redis.expire('session_' + token, keyLifeTime);
        }
    },
    creator: {
        process: function (token, ip, data, callback) {
            if (!token) {
                token = uuid.v4();
                data.createdAt = Date.now();
            }
            data.ip = ip;
            data.updatedAt = Date.now();
            this.creator._passDataToRedis(token, data, function (error) {
                callback(error, token);
            });
        },
        _passDataToRedis: function (token, data, callback) {
            lodash.keys(data).forEach(function (objectKey) {
                data[objectKey] = JSON.stringify(data[objectKey]);
            });
            redis.hmset('session_' + token, data, function (error) {
                if (error) {
                    return callback(error);
                }
                redis.expire('session_' + token, keyLifeTime, function (error) {
                    callback(error);
                });
            });
        }
    }
}

module.exports = function (request, response, next) {
    var token = request.header('auth-token');
    if (!token && request.path === '/user/authentication/get_token') {
        return next();
    }
    if (!token) {
        var error = new Error('no auth-token provided');
        error.status = 403;
        return next(error);
    }
    Store.checker.process(token, request.ip, function (error, data) {
        if (error) {
            if (error.message === 'no auth data found') {
                error.status = 403;
            }
            return next(error);
        }
        var session = data;

        session.set = function (data, callback) {
            var ip = request.ip;
            var token = token;
            return (function () {
                Store.creator.process(token, ip, data, callback);
            })();
        };
        request.session = session;
        next();
    });
};