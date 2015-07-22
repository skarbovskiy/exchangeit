'use strict';
var Promise = require('bluebird');
var lodash = require('lodash');
var Category = require('../../../modules/models/category');
var CategoryAttribute = require('../../../modules/models/categoryAttribute');
var Vocabulary = require('../../../modules/models/vocabulary');
var VocabularyContent = require('../../../modules/models/vocabularyContent');
var Item = require('../../../modules/models/item');
var ItemPhotos = require('../../../modules/models/itemPhotos');
var ItemAttributes = require('../../../modules/models/itemAttribute');
var HttpError = require('../../../modules/core/errors').HttpError;
var orm = require('../../../modules/core/bootstrap').get('orm');

var Service = {
    getList: function () {
        return Item.findAll(
            {
                row: true,
                include: [ItemPhotos, Category]
            }
        )
            .then(function (data) {
                return [200, data];
            });
    },
    getOne: function (request) {
        return Item.findOne(
            {
                where: {
                    id: request.params.id,
                    userId: request.session.user.id
                },
                row: true,
                include: [
                    ItemPhotos,
                    {
                        model: Category,
                        include: [
                            {
                                model: CategoryAttribute,
                                include: [
                                    {model: Vocabulary, include: [VocabularyContent]},
                                    {
                                        required: false,
                                        model: ItemAttributes,
                                        where: {itemId: {$eq: orm.col('Item.id') }}
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        )
            .then(function (data) {
                return [200, data];
            });
    },
    create: function (request) {
        var info = request.body.info;
        var attributes = request.body.attributes;
        info.userId = request.session.user.id;
        info.status = 'new';
        return Item.create(info)
            .then(function (item) {
                attributes.forEach(function (attribute) {
                    attribute.itemId = item.id;
                });
                return ItemAttributes.bulkCreate(attributes).then(function () {
                    return item;
                });
            })
            .then(function (item) {
                return [201, {id: item.id}];
            })
    }
};

module.exports = Service;