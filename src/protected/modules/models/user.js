'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var User = orm.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    phone: {
        type: Sequelize.TEXT,
        unique: true,
        validate: {
            is: /^\+[0-9]{10,13}$/
        }
    },
    password: Sequelize.TEXT,
    status: {
        type: Sequelize.ENUM('not-activated', 'active', 'blocked', 'deleted')
    },
    type: Sequelize.ENUM('normal', 'admin'),
    comment: Sequelize.TEXT,
    firstName: {
        type: Sequelize.TEXT,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.TEXT,
        field: 'last_name'
    },
    email: {
        type: Sequelize.TEXT,
        validate: {
            isEmail: true
        }
    }
}, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'users',
    schema: 'users'
});

module.exports = User;

/*
 "8";"+380982850620";"ac5e9b81cf6794265ff34d52f67189a5";"active";"admin";"2015-04-29 19:08:01.705389+00";"test";"Георгий";"Скарбовский";"george.skarbovskiy@gmail.com"
 */