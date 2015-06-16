'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var Item = require('./item');
var CategoryAttribute = require('./categoryAttribute');
var ItemAttribute = orm.define('ItemAttribute', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemId: {
        type: Sequelize.INTEGER,
        field: 'item_id',
        unique: 'itemAttribute',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    attributeId: {
        type: Sequelize.INTEGER,
        field: 'attribute_id',
        allowNull: false,
        validate: {
            notEmpty: true
        },
        unique: 'itemAttribute'
    },
    value: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'item_attribute',
    schema: 'catalog'
});
ItemAttribute.belongsTo(Item, {foreignKey : 'itemId'});
ItemAttribute.belongsTo(CategoryAttribute, {foreignKey : 'attributeId'});
module.exports = ItemAttribute;