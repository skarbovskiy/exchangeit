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
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^\+[0-9]{10,13}$/
        }
    },
    password: Sequelize.TEXT,
    status: { //active, blocked, deleted
        type: Sequelize.TEXT
    },
    type: Sequelize.TEXT, //normal, admin
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