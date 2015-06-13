'use strict';
var router = require('express').Router();
var handler = require('../../../modules/core/requestHandler');
var session = require('../../../modules/core/sessionHandler');
var service = require('../../../services/admin/vocabularies/content');


router.post('/:id/content', session.checkAdmin, function (request, response, next) {
    service.create(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.put('/:id/content/:valueId', session.checkAdmin, function (request, response, next) {
    service.update(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.delete('/:id/content/:valueId', session.checkAdmin, function (request, response, next) {
    service.remove(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

router.get('/:id/content', session.checkAdmin, function (request, response, next) {
    service.getList(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

module.exports = router;