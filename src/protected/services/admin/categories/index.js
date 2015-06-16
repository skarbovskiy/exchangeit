'use strict';
var Promise = require('bluebird');
var lodash = require('lodash');
var Category = require('../../../modules/models/category');
var HttpError = require('../../../modules/core/errors').HttpError;
var orm = require('../../../modules/core/bootstrap').get('orm');
var Service = {
    getList: function (request) {
        var parentId = request.params.parentId;
        parentId = parentId === 'null' ? null : parentId;
        return Category.findAll({
            where: {
                parentId: parentId
            },
            raw: true
        }).then(function (data) {
            return [200, data];
        });
    },

    getPrices: function (request) {
        var id = request.params.id;
        return Category.getPrices(id)
            .then(function (data) {
                return [200, data];
            })
    },

    getPath: function (request) {
        return Category.getPath(request.params.id).then(function (path) {
            return [200, path];
        });
    },

    update: function (request) {
        var id = request.params.id;
        if (!id) {
            throw new HttpError(400, 'bad data passed');
        }
        return Category.update(request.body, {where: {id: id}})
            .then(function () {
                return [200, undefined];
            });
    },

    create: function (request) {
        var parentId = request.body.parentId;
        function getParentPath () {
            if (!parentId) {
                return Promise.resolve();
            }
            return Category.getPath(parentId);
        }
        return getParentPath().then(function (path) {
            var stringedPath = [];
            path && path.forEach(function (item) {
                stringedPath.push(item.id);
            });
            stringedPath = stringedPath.join('/');
            stringedPath = '/' + stringedPath + '/';
            request.body.path = stringedPath;
            return Category.create(request.body)
                .then(function () {
                    return [201, undefined];
                });
        });
    },

    remove: function (request) {
        var id = request.params.id;
        if (!id) {
            throw new HttpError(400, 'bad data passed');
        }
        return Category.destroyWithChildren(id).then(function () {
            return [200, undefined];
        })
    }
};

module.exports = Service;