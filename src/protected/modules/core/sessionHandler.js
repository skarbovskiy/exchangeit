'use strict';
var lodash = require('lodash');
var Promise = require('bluebird');
var uuid = require('node-uuid');

var redis = require('./bootstrap').get('redis');
var HttpError = require('../core/errors').HttpError;

var keyLifeTime = 15 * 60; //15 minutes

var accessMatrix = {
    '/user/authentication/get_token': 'noToken',
    '/user/authentication/check_token': 'token',
    '/user/authentication/login': 'notAuthenticated',
    '/user/authentication/register': 'notAuthenticated',
    '/user/authentication/logout': 'authenticated',
    '/user/info/getCurrent': 'authenticated',
    '/user/info/getList': 'admin',
    '/user/info/update': 'admin',

    '/catalog/categories/getOne': 'token',
    '/catalog/categories/getList': 'token',
    '/catalog/categories/getPath': 'token',
    '/catalog/categories/getCategoryPrices': 'token',
    '/catalog/categories/create': 'admin',
    '/catalog/categories/update': 'admin',
    '/catalog/categories/remove': 'admin'
};

var Store = {
    checker: {
        process: function (token, ip) {
            return Store.checker._getDataFromRedis(token).then(function (data) {
                Store.checker._updateUserActivity(token);
                return data;
            });
        },
        _getDataFromRedis: function (token) {
            return Promise.fromNode(redis.hgetall.bind(redis, 'session_' + token))
                .then(function (data) {
                    var returnObject = {};
                    lodash.keys(data).forEach(function (key) {
                        returnObject[key] = JSON.parse(data[key]);
                    });
                    return returnObject;
                });
        },
        _updateUserActivity: function (token) {
            redis.expire('session_' + token, keyLifeTime);
        }
    },
    creator: {
        process: function (token, ip, data) {
            if (!token) {
                token = uuid.v4();
                data.createdAt = Date.now();
            }
            data.ip = ip;
            data.updatedAt = Date.now();
            return Store.creator._passDataToRedis(token, data)
                .then(function () {
                    return token;
                });
        },
        _passDataToRedis: function (token, data) {
            lodash.keys(data).forEach(function (objectKey) {
                data[objectKey] = JSON.stringify(data[objectKey]);
            });
            return Promise.fromNode(redis.hmset.bind(redis, 'session_' + token, data))
                .then(function () {
                    return Promise.fromNode(redis.expire.bind(redis, 'session_' + token, keyLifeTime));
                });
        }
    }
};

function getTokenData (request) {
    var token = request.header('auth-token');
    if (!token) {
        throw new HttpError(403, 'no auth-token provided');
    }
    return Store.checker.process(token, request.ip)
        .then(function (data) {
            if (!data || lodash.isEmpty(data)) {
                throw new HttpError(403, 'no auth data found');
            }
            var session = data;
            session.set = function (newData) {
                return (function () {
                    return Store.creator.process(token, request.ip, newData);
                })();
            };
            request.session = session;
        });
}

module.exports = {
    checkToken: function (request, response, next) {
        getTokenData(request).then(function () {
            next();
        }).catch(function (error) {
            next(error);
        });
    },
    checkUser: function (request, response, next) {
        getTokenData(request).then(function () {
            if (!request.session.user || !request.session.user.id) {
                return next(new HttpError(401, 'no user authenticated'));
            }
            next();
        }).catch(function (error) {
            next(error);
        });
    },
    checkAdmin: function (request, response, next) {
        getTokenData(request).then(function () {
            if ((!request.session.user || !request.session.user.id) || request.session.user.type !== 'admin') {
                return next(new HttpError(401, 'user don\'t have permission to access'));
            }
            next();
        }).catch(function (error) {
            next(error);
        });
    },
    checkNotLogged: function (request, response, next) {
        getTokenData(request).then(function () {
            if (request.session.user && request.session.user.id) {
                return next(new HttpError(409, 'already authenticated'));
            }
            next();
        }).catch(function (error) {
            next(error);
        });
    },
    create: function (ip, data) {
        return Store.creator.process(null, ip, data);
    }
};