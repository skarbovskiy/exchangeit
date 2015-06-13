'use strict';
var router = require('express').Router();
var handler = require('../../modules/core/requestHandler');
var session = require('../../modules/core/sessionHandler');
var service = require('../../services/core/user');

router.post('/login', session.checkNotLogged, function (request, response, next) {
    service.login(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.get('/', session.checkUser, function (request, response, next) {
    service.getCurrent(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.post('/logout', session.checkUser, function (request, response, next) {
    service.logout(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

module.exports = router;