'use strict';
var Promise = require('bluebird');
var router = require('express').Router();
var handler = require('../../modules/core/requestHandler');
var session = require('../../modules/core/sessionHandler');
var service = require('../../services/core/user');

router.post('/login', session.checkNotLogged, function (request, response, next) {
    service.login(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

//router.get('/', session.checkToken, function (request, response, next) {
//    service.getToken(request)
//        .then(handler.bind(null, request, response))
//        .catch(next);
//});

module.exports = router;