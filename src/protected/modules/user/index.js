'use strict';
var pg = require('../core/bootstrap').get('pg');
var crypto = require('crypto');

var salt = 'wef*(&hfwjekfh*0flm';
/*
 id serial NOT NULL,
 phone text,
 password text,
 status text, [not-activated, active, blocked. deleted]
 type text, [normal, admin]
 comment text,
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
                'SELECT * FROM users.users AS u ' +
                'LEFT JOIN users.user_properties AS p ON p.user_id = u.id ' +
                'WHERE u.phone = $1 AND u.password = $2',
                [phone, helper.md5(password + salt)],
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
    }
};


var helper = {
    md5: function (string) {
        var md5sum = crypto.createHash('md5');
        md5sum.update(string);
        return md5sum.digest('hex');
    }
};

module.exports = User;