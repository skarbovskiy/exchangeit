'use strict';
var Promise = require('bluebird');
module.exports = function (program) {
    return Promise.resolve(new Error('blag'))
};