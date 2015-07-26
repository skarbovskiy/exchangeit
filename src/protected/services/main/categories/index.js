'use strict';
var Promise = require('bluebird');
var lodash = require('lodash');
var Category = require('../../../modules/models/category');
var CategoryAttribute = require('../../../modules/models/categoryAttribute');
var Item = require('../../../modules/models/item');
var ItemPhotos = require('../../../modules/models/itemPhotos');
var ItemAttributes = require('../../../modules/models/itemAttribute');
var Vocabulary = require('../../../modules/models/vocabulary');
var VocabularyContent = require('../../../modules/models/vocabularyContent');
var HttpError = require('../../../modules/core/errors').HttpError;
var orm = require('../../../modules/core/bootstrap').get('orm');
var Service = {
    getList: function (request) {
        var categoriesToFilter = request.query.categories;
        var where = null;
        if (categoriesToFilter) {
            where = {
                $or: []
            };
            categoriesToFilter.split(',').forEach(function (category) {
                where.$or.push({id: category}, ['path SIMILAR TO ?', '%/' + category + '/%']);
            });
        }
        return Category.findAll({
            raw: true,
            where: where
        }).then(function (data) {
            return [200, data];
        });
    },
    getOne: function (request) {
        return Category.findOne(
            {
                where: {
                    id: request.params.id
                },
                row: true,
                include: [
                    {
                        model: CategoryAttribute,
                        include: [
                            {model: Vocabulary, include: [VocabularyContent]}
                        ]
                    }
                ]
            }
        )
            .then(function (data) {
                return [200, data];
            });
    },
    getItems: function () {
        return Item.findAll(
            {
                row: true,
                include: [ItemPhotos, {model: ItemAttributes, include: [CategoryAttribute]}]
            }
        )
            .then(function (data) {
                return [200, data];
            });
    }
};

module.exports = Service;