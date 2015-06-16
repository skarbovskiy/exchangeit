'use strict';
var bootstrapper = require('./modules/core/bootstrap');

bootstrapper.init({logger: console.log})
    .then(function () {
        var orm = bootstrapper.get('orm');
        require('./modules/models/category');
        require('./modules/models/categoryAttribute');
        require('./modules/models/user');
        require('./modules/models/vocabulary');
        require('./modules/models/vocabularyContent');
        require('./modules/models/item');
        require('./modules/models/itemAttribute');
        require('./modules/models/itemPhotos');
        return orm.sync({force: false});
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