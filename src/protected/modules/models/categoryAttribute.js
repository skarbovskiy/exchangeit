'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var Vocabulary = require('./vocabulary');
var CategoryAttribute = orm.define('CategoryAttribute', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        unique: 'categoryAttribute',
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
        },
        unique: 'categoryAttribute'
    },
    type: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    vocabularyId: {
        type: Sequelize.INTEGER,
        field: 'vocabulary_id'
    }
}, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'category_attribute',
    schema: 'catalog'
});
CategoryAttribute.belongsTo(Vocabulary, {foreignKey : 'vocabularyId'});
module.exports = CategoryAttribute;