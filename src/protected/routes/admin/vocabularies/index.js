'use strict';
var router = require('express').Router();
var handler = require('../../../modules/core/requestHandler');
var session = require('../../../modules/core/sessionHandler');
var service = require('../../../services/admin/vocabularies');


router.post('/', session.checkAdmin, function (request, response, next) {
    service.create(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.put('/:id', session.checkAdmin, function (request, response, next) {
    service.update(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.delete('/:id', session.checkAdmin, function (request, response, next) {
    service.remove(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.get('/', session.checkAdmin, function (request, response, next) {
    service.getList(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.use('/', require('./content'));

module.exports = router;