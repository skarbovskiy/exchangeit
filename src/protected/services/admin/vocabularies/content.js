'use strict';
var VocabularyContent = require('../../../modules/models/vocabularyContent');
var Vocabulary = require('../../../modules/models/vocabulary');
var HttpError = require('../../../modules/core/errors').HttpError;
var Service = {
    getList: function (request) {
        var vocabularyId = request.params.id;
        if (!vocabularyId) {
            throw new HttpError(400, 'bad data passed');
        }
        return Vocabulary.findOne(
            {where: {id: vocabularyId}, row: true, include: [VocabularyContent]}
        ).then(function (data) {
            return [200, data];
        });
    },

    create: function (request) {
        var vocabularyId = request.params.id;
        if (!vocabularyId) {
            throw new HttpError(400, 'bad data passed');
        }
        request.body.vocabularyId = vocabularyId;
        return VocabularyContent.create(request.body).then(function () {
            return [201, undefined];
        });
    },

    update: function (request) {
        var vocabularyId = request.params.id;
        var id = request.params.valueId;
        if (!id || !vocabularyId) {
            throw new HttpError(400, 'bad data passed');
        }
        return VocabularyContent.update(request.body, {where: {$and: [{id: id}, {vocabularyId: vocabularyId}]}})
            .then(function () {
                return [200, undefined];
            });
    },

    remove: function (request) {
        var vocabularyId = request.params.id;
        var id = request.params.valueId;
        if (!id || !vocabularyId) {
            throw new HttpError(400, 'bad data passed');
        }
        return VocabularyContent.destroy({where: {$and: [{id: id}, {vocabularyId: vocabularyId}]}}).then(function () {
            return [200, undefined];
        })
    }
};

module.exports = Service;