'use strict';
var pg = require('../core/bootstrap').get('pg');
var async = require('async');
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

    create: function (name, parentId, minPrice, maxPrice, callback) {
        if (!name) {
            var error = new Error('bad data passed');
            error.status = 422;
            return callback(error);
        }
        parentId = parentId || null;
        minPrice = parseInt(minPrice) || null;
        maxPrice = parseInt(maxPrice) || null;
        pg(function (client, done) {
            client.setQuery(
                'INSERT INTO catalog.categories (name, parent_id, min_price, max_price) ' +
                'VALUES ($1, $2, $3, $4)',
                [name, parentId, minPrice, maxPrice],
                function (error) {
                    if (error && /duplicate/.test(error.message)) {
                        error = new Error('category with this name already exists');
                        error.status = 422;
                    }
                    if (error || !parentId) {
                        done();
                        return callback(error);
                    }
                    client.setQuery(
                        'UPDATE catalog.categories SET has_children = TRUE WHERE id = $1',
                        [parentId],
                        function (error) {
                            callback(error);
                        }
                    )
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
        /*@todo add transactions*/
        pg(function (client, done) {
            client.setQuery(
                'SELECT id FROM catalog.categories WHERE parent_id = $1 OR id = $1',
                [id],
                function (error, response) {
                    done();
                    if (error) {
                        callback(error);
                    }
                    var ids = [];
                    response.rows.forEach(function (row) {
                        ids.push(row.id);
                    });
                    async.eachLimit(ids, 4, function (id, callback) {
                        pg(function (client, done) {
                            client.setQuery(
                                'DELETE FROM catalog.categories WHERE id = $1',
                                [id],
                                function (error) {
                                    done();
                                    callback(error);
                                }
                            );
                        });
                    }, callback);
                }
            );
        });
    }
};

module.exports = Service;