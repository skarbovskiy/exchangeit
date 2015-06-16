'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var User = require('./user');
var Category = require('./category');
var Item = orm.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'items',
    schema: 'catalog'
});
Item.belongsTo(User, {foreignKey : 'userId'});
Item.belongsTo(Category, {foreignKey : 'categoryId'});

module.exports = Item;