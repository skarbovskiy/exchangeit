'use strict';
var Vocabulary = require('../../../modules/models/vocabulary');
var HttpError = require('../../../modules/core/errors').HttpError;
var Service = {
    getList: function (request) {
        return Vocabulary.findAll({
            raw: true
        }).then(function (data) {
            return [200, data];
        });
    },

    create: function (request) {
        return Vocabulary.create(request.body).then(function () {
            return [201, undefined];
        });
    },

    update: function (request) {
        var id = request.params.id;
        if (!id) {
            throw new HttpError(400, 'bad data passed');
        }
        return Vocabulary.update(request.body, {where: {id: id}})
            .then(function () {
                return [200, undefined];
            });
    },

    remove: function (request) {
        var id = request.params.id;
        if (!id) {
            throw new HttpError(400, 'bad data passed');
        }
        return Vocabulary.destroy({where: {id: id}}).then(function () {
            return [200, undefined];
        })
    }
};

module.exports = Service;