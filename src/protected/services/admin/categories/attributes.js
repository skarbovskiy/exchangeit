'use strict';
var CategoryAttribute = require('../../../modules/models/categoryAttribute');
var Vocabulary = require('../../../modules/models/vocabulary');
var Category = require('../../../modules/models/category');
var HttpError = require('../../../modules/core/errors').HttpError;
var Service = {
    getList: function (request) {
        var categoryId = request.params.id;
        if (!categoryId) {
            throw new HttpError(400, 'bad data passed');
        }
        return Category.findOne(
            {where: {id: categoryId}, row: true, include: [{model: CategoryAttribute, include: [Vocabulary]}]}
        ).then(function (data) {
                if (!data) {
                    throw new HttpError(404, 'no category found');
                }
                return [200, data];
            });
    },

    create: function (request) {
        var categoryId = request.params.id;
        if (!categoryId) {
            throw new HttpError(400, 'bad data passed');
        }
        request.body.categoryId = categoryId;
        return CategoryAttribute.create(request.body).then(function () {
            return [201, undefined];
        });
    },

    update: function (request) {
        var categoryId = request.params.id;
        var id = request.params.attributeId;
        if (!id || !categoryId) {
            throw new HttpError(400, 'bad data passed');
        }
        return CategoryAttribute.update(request.body, {where: {$and: [{id: id}, {categoryId: categoryId}]}})
            .then(function () {
                return [200, undefined];
            });
    },

    remove: function (request) {
        var categoryId = request.params.id;
        var id = request.params.attributeId;
        if (!id || !categoryId) {
            throw new HttpError(400, 'bad data passed');
        }
        return CategoryAttribute.destroy({where: {$and: [{id: id}, {categoryId: categoryId}]}}).then(function () {
            return [200, undefined];
        })
    }
};

module.exports = Service;