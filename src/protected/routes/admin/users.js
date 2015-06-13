'use strict';
var router = require('express').Router();
var handler = require('../../modules/core/requestHandler');
var session = require('../../modules/core/sessionHandler');
var service = require('../../services/admin/users');

router.get('/', session.checkAdmin, function (request, response, next) {
    service.getList(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.put('/:id', session.checkAdmin, function (request, response, next) {
    service.update(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

module.exports = router;