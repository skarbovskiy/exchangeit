'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var Vocabulary = require('./vocabulary');
var VocabularyContent = orm.define('VocabularyContent', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vocabularyId: {
        type: Sequelize.INTEGER,
        field: 'vocabulary_id',
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
    tableName: 'vocabulary_content',
    schema: 'catalog'
});

VocabularyContent.belongsTo(Vocabulary, {foreignKey: 'vocabularyId'});

module.exports = VocabularyContent;