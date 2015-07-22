'use strict';
var Promise = require('bluebird');
var lodash = require('lodash');
var Category = require('../../../modules/models/category');
var CategoryAttribute = require('../../../modules/models/categoryAttribute');
var Item = require('../../../modules/models/item');
var ItemPhotos = require('../../../modules/models/itemPhotos');
var ItemAttributes = require('../../../modules/models/itemAttribute');
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