'use strict';
var router = require('express').Router();
var handler = require('../../../modules/core/requestHandler');
var session = require('../../../modules/core/sessionHandler');
var service = require('../../../services/main/profile/items');

router.get('/', session.checkUser, function (request, response, next) {
    service.getList(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});
router.get('/:id', session.checkUser, function (request, response, next) {
    service.getOne(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});
router.post('/', session.checkUser, function (request, response, next) {
    service.create(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

module.exports = router;