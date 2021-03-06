'use strict';
var router = require('express').Router();
var handler = require('../../../modules/core/requestHandler');
var session = require('../../../modules/core/sessionHandler');
var service = require('../../../services/main/categories');

router.get('/', session.checkToken, function (request, response, next) {
    service.getList(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});
router.get('/items', session.checkToken, function (request, response, next) {
    service.getItems(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});
router.get('/:id', session.checkToken, function (request, response, next) {
    service.getOne(request)
        .then(handler.bind(null, request, response))
        .catch(next);
});

//router.use('/', require('./attributes'));

module.exports = router;