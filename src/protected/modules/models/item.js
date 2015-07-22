'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var User = require('./user');
var Category = require('./category');
var ItemPhotos = require('./itemPhotos');
var ItemAttribute = require('./itemAttribute');
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
    status: {
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
    validate: {
        maxMinPrice: function () {
            var itemPrice = this.price;
            return Category.getPrices(this.categoryId)
                .then(function (prices) {
                    if (prices.min && itemPrice < prices.min) {
                        throw new Error('item price cannot be less than ' + prices.min);
                    }
                    if (prices.max && itemPrice > prices.max) {
                        throw new Error('item price cannot be more than ' + prices.max);
                    }
                });

        },
        category: function () {
            return Category.findById(this.categoryId)
                .then(function (category) {
                    if (!category.canHaveProducts) {
                        throw new Error('desired category cannot have products');
                    }
                });
        }
    },
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'items',
    schema: 'catalog'
});
Item.belongsTo(User, {foreignKey : 'userId'});
Item.belongsTo(Category, {foreignKey : 'categoryId'});
Item.hasMany(ItemPhotos, {foreignKey : 'itemId'});
Item.hasMany(ItemAttribute, {foreignKey : 'itemId'});

module.exports = Item;