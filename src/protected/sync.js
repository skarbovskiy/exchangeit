'use strict';
var bootstrapper = require('./modules/core/bootstrap');

bootstrapper.init({logger: console.log})
    .then(function () {
        var orm = bootstrapper.get('orm');
        require('./modules/models/category');
        require('./modules/models/user');
        return orm.sync({force: true});
    })
    .then(function () {
        console.log('sync finished');
    })
    .catch(function (e) {
        console.log('error', e);
    })
    .finally(function () {
        process.exit(0);
    });