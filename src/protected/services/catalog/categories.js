'use strict';
var async = require('async');
var categoriesModel = require('../../modules/catalog/categories');
var Service = {
    getList: function (request, response) {
        var parentId = request.body.parent_id;
        if (parentId === 'null') {
            parentId = null;
        }
        categoriesModel.getList(parentId, response);
    },

    getOne: function (request, response) {
        categoriesModel.getOne(request.body.id, response);
    },

    getPath: function (request, response) {
        categoriesModel.getPath(
            request.body.id,
            response
        );
    },

    getCategoryPrices: function (request, response) {
        categoriesModel.getCategoryPrices(
            request.body.id,
            response
        );
    },

    create: function (request, response) {
        var minPrice = request.body.min_price;
        var maxPrice = request.body.max_price;
        if (minPrice && maxPrice && minPrice > maxPrice) {
            var error = new Error('min price can\'t be bigger than max price');
            error.status = 422;
            return response(error);
        }
        categoriesModel.create(
            request.body.name,
            request.body.active,
            request.body.parent_id,
            request.body.can_have_products,
            minPrice,
            maxPrice,
            response
        )
    },

    update: function (request, response) {
        categoriesModel.update(
            request.body.id,
            request.body.name,
            request.body.active,
            request.body.parent_id,
            request.body.can_have_products,
            request.body.min_price,
            request.body.max_price,
            response
        )
    },

    remove: function (request, response) {
        categoriesModel.remove(request.body.id, response);
    }
};

module.exports = Service;