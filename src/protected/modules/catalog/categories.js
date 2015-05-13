'use strict';
var async = require('async');
var lodash = require('lodash');
var pg = require('../core/bootstrap').get('pg');
var Service = {
    getList: function (parentId, callback) {
        pg(function (client, done) {
            var query = 'SELECT * FROM catalog.categories WHERE parent_id';
            var parameters = [];
            if (parentId) {
                parameters.push(parentId);
                query += ' = $1';
            } else {
                query += ' IS null';
            }
            client.setQuery(query, parameters, function (error, response) {
                done();
                callback(error, response && response.rows ? response.rows : null);
            });
        });
    },

    getOne: function (id, callback) {
        pg(function (client, done) {
            client.setQuery('SELECT * FROM catalog.categories WHERE id = $1', [id], function (error, response) {
                done();
                callback(error, response && response.rows ? response.rows[0] : null);
            });
        });
    },

    getPath: function (id, callback) {
        Service.getOne(id, function (error, category) {
            var path = category.path.slice(1, -1).split('/');
            var extendedPath = [{
                name: category.name,
                id: category.id
            }];
            if (!path || path[0] === '') {
                return callback(null, extendedPath);
            }
            async.map(path, Service.getOne, function (error, categories) {
                if (error) {
                    return callback(error);
                }
                categories.forEach(function (category) {
                    extendedPath.push({
                        name: category.name,
                        id: category.id
                    });
                });
                extendedPath = lodash.sortBy(extendedPath, function (item) {
                    return item.id
                });
                callback(null, extendedPath);
            });
        });
    },

    getCategoryPrices: function (id, callback) {
        pg(function (client, done) {
            client.setQuery(
                'SELECT MIN(min_price) AS min, MAX(max_price) AS max FROM catalog.categories ' +
                'WHERE id = $1 OR path SIMILAR TO $2',
                [id, '%/' + id + '/%'],
                function (error, response) {
                    done();
                    callback(error, response && response.rows ? response.rows[0] : null);
                }
            );
        });
    },

    create: function (name, active, parentId, canHaveProducts, minPrice, maxPrice, callback) {
        if (!name) {
            var error = new Error('bad data passed');
            error.status = 422;
            return callback(error);
        }
        active = active || false;
        parentId = parentId || null;
        canHaveProducts = canHaveProducts || false;
        minPrice = parseInt(minPrice) || null;
        maxPrice = parseInt(maxPrice) || null;
        async.waterfall([
            function (callback) {
                if (!parentId) {
                    return callback(null, null);
                }
                Service.getPath(parentId, function (error, path) {
                    var stringedPath = [];
                    path && path.forEach(function (item) {
                        stringedPath.push(item.id);
                    });
                    stringedPath = stringedPath.join('/');
                    callback(error, stringedPath);
                })
            },
            function (path, callback) {
                path = path || '';
                pg(function (client, done) {
                    client.setQuery(
                        'INSERT INTO catalog.categories ' +
                            '(name, active, parent_id, path, can_have_products, min_price, max_price) ' +
                        'VALUES ($1, $2, $3, $4, $5, $6, $7)',
                        [name, active, parentId, '/' + path + '/', canHaveProducts, minPrice, maxPrice],
                        function (error) {
                            done();
                            if (error && /duplicate/.test(error.message)) {
                                error = new Error('category with this name already exists');
                                error.status = 422;
                            }
                            return callback(error);

                        }
                    )
                });
            }
        ], callback);
    },

    update: function (id, name, active, parentId, canHaveProducts, minPrice, maxPrice, callback) {
        if (!id || !name) {
            var error = new Error('bad data passed');
            error.status = 422;
            return callback(error);
        }
        active = active || false;
        canHaveProducts = canHaveProducts || false;
        minPrice = parseInt(minPrice) || null;
        maxPrice = parseInt(maxPrice) || null;
        pg(function (client, done) {
            client.setQuery(
                'UPDATE catalog.categories ' +
                'SET name = $1, active = $2, can_have_products = $3, min_price = $4, max_price = $5 ' +
                'WHERE id = $6',
                [name, active, canHaveProducts, minPrice, maxPrice, id],
                function (error) {
                    done();
                    if (error && /duplicate/.test(error.message)) {
                        error = new Error('category with this name already exists');
                        error.status = 422;
                    }
                    return callback(error);
                }
            )
        });
    },

    remove: function (id, callback) {
        if (!id) {
            var error = new Error('bad data passed');
            error.status = 422;
            return callback(error);
        }
        pg(function (client, done) {
            client.setQuery(
                'DELETE FROM catalog.categories WHERE id = $1 OR path SIMILAR TO $2',
                [id, '%/' + id + '/%'],
                function (error) {
                    done();
                    callback(error);
                }
            );
        });
    }
};

module.exports = Service;