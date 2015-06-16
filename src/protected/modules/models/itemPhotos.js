'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var Item = require('./item');
var CategoryAttribute = require('./categoryAttribute');
var ItemPhoto = orm.define('ItemPhoto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemId: {
        type: Sequelize.INTEGER,
        field: 'item_id',
        unique: 'itemPhoto',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    path: {
        type: Sequelize.INTEGER,
        field: 'attribute_id',
        allowNull: false,
        validate: {
            notEmpty: true
        },
        unique: 'itemPhoto'
    }
}, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'item_photo',
    schema: 'catalog'
});
ItemPhoto.belongsTo(Item, {foreignKey : 'itemId'});
module.exports = ItemPhoto;