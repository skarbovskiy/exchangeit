'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var Vocabulary = require('./vocabulary');
var ItemAttribute = require('./itemAttribute');
var Category = require('./category');
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
    type: { //'text', 'date', 'checkbox', 'select'
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
    validate: {
        selectVocabulary: function () {
            if (this.type === 'select' && !this.vocabularyId) {
                throw new Error('select type require vocabulary');
            }
        }
    },
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'category_attribute',
    schema: 'catalog'
});
CategoryAttribute.belongsTo(Vocabulary, {foreignKey: 'vocabularyId'});
CategoryAttribute.hasMany(ItemAttribute, {foreignKey: 'attributeId'});
ItemAttribute.belongsTo(CategoryAttribute, {foreignKey: 'attributeId'});
module.exports = CategoryAttribute;