'use strict';
var router = require('express').Router();
var handler = require('../../../modules/core/requestHandler');
var session = require('../../../modules/core/sessionHandler');
var service = require('../../../services/main/profile/info');

router.put('/', session.checkUser, function (request, response, next) {
    service.updateInfo(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.put('/password', session.checkUser, function (request, response, next) {
    service.updatePassword(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

module.exports = router;