'use strict';
var orm = require('../../modules/core/bootstrap').get('orm');
var Promise = require('bluebird');
var lodash = require('lodash');
var Sequelize = require('sequelize');
var Category = orm.define('Category', {
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
    },
    parentId: {
        type: Sequelize.INTEGER,
        field: 'parent_id'
    },
    canHaveProducts: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'can_have_products'
    },
    minPrice: {
        type: Sequelize.INTEGER,
        field: 'min_price'
    },
    maxPrice: {
        type: Sequelize.INTEGER,
        field: 'max_price'
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    path: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    classMethods: {
        getPrices: function (id) {
            return orm.query(
                'SELECT MIN(min_price) AS min, MAX(max_price) AS max FROM catalog.categories ' +
                'WHERE id = ? OR path SIMILAR TO ?',
                {
                    replacements: [id, '%/' + id + '/%'],
                    type: orm.QueryTypes.SELECT
                }
            ).then(function (data) {
                    return data[0];
                });
        },
        getPath: function (id) {
            return Category.findById(id).then(function (category) {
                var path = category.path.slice(1, -1).split('/');
                var extendedPath = [{
                    name: category.name,
                    id: category.id
                }];
                if (!path || path[0] === '') {
                    return extendedPath;
                }
                return Promise.map(path, function (id) {
                    return Category.findById(id);
                })
                    .then(function (categories) {
                        categories.forEach(function (category) {
                            extendedPath.push({
                                name: category.name,
                                id: category.id
                            });
                        });
                        extendedPath = lodash.sortBy(extendedPath, function (item) {
                            return item.id
                        });
                        return extendedPath;
                    });
            });
        },
        destroyWithChildren: function (id) {
            return Category.destroy({
                where: {
                    $or: [
                        {id: id},
                        ['path SIMILAR TO ?', '%/' + id + '/%']
                    ]
                }
            });
        }
    },
    validate: {
        maxMinPrice: function () {
            if (this.minPrice && this.maxPrice && this.minPrice > this.maxPrice) {
                throw new Error('min price can\'t be bigger than max price');
            }
        }
    },
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'categories',
    schema: 'catalog'
});

Category.belongsTo(Category, {foreignKey: 'parentId'});

module.exports = Category;