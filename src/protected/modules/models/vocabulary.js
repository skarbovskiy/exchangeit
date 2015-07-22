'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Sequelize = require('sequelize');
var VocabularyContent = require('./vocabularyContent');
var Vocabulary = orm.define('Vocabulary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'vocabularies',
    schema: 'catalog'
});
Vocabulary.hasMany(VocabularyContent, {foreignKey: 'vocabularyId'});
module.exports = Vocabulary;