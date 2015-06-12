'use strict';
//DEPRECATED
var orm = require('../core/bootstrap').get('orm');
var helper = require('./helper');

var salt = 'wef*(&hfwjekfh*0flm';
/*
 id serial NOT NULL,
 phone text,
 password text,
 status text, [not-activated, active, blocked. deleted]
 type text, [normal, admin]
 comment text,
 first_name text,
 last_name text,
 email text,
 created_date timestamp with time zone DEFAULT now(),
 */
var User = {
    register: function (phone, password, callback) {
        if (!(/\+[0-9]{10,13}/.test(phone)) || !password) {
            var error = new Error('bad phone or password passed');
            error.status = 422;
            return callback(error);
        }
        pg(function (client, done) {
            client.setQuery(
                'INSERT INTO users.users (phone, password, status, type) ' +
                'VALUES ($1, $2, $3, $4) RETURNING *',
                [phone, helper.md5(password + salt), 'active', 'normal'],
                function (error) {
                    done();
                    if (error && /duplicate/.test(error.message)) {
                        error = new Error('user with this phone already exists');
                        error.status = 422;
                    }
                    callback(error);
                }
            )
        });
    },
    login: function (phone, password, callback) {
        pg(function (client, done) {
            client.setQuery(
                'SELECT * FROM users.users ' +
                'WHERE users.phone = $1 AND users.password = $2 AND status = $3',
                [phone, helper.md5(password + salt), 'active'],
                function (error, data) {
                    done();
                    if (error) {
                        return callback(error);
                    }
                    if (data.rows.length === 0) {
                        error = new Error('no user found');
                        error.status = 400;
                        return callback(error);
                    }
                    callback(null, data.rows[0]);
                }
            )
        });
    },

    getList: function (callback) {
        pg(function (client, done) {
            client.setQuery('SELECT * FROM users.users', [], function (error, response) {
                done();
                callback(error, response ? response.rows : null);
            });
        });
    },

    update: function (id, phone, status, type, firstName, lastName, email, comment, callback) {
        if (!(/\+[0-9]{10,13}/.test(phone))) {
            var error = new Error('bad phone or password passed');
            error.status = 422;
            return callback(error);
        }
        pg(function (client, done) {
            client.setQuery(
                'UPDATE users.users ' +
                'SET phone = $1, status = $2, type = $3, first_name = $4, last_name = $5, email = $6, comment = $7 ' +
                'WHERE id = $8',
                [phone, status, type, firstName, lastName, email, comment, id],
                function (error) {
                    done();
                    callback(error);
                }
            );
        });
    }
};

module.exports = User;