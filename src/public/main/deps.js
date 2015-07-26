define([
    '../core/core.module',
    '../core/services/Http',
    '../core/services/User',
    '../core/services/Session',
    '../core/controllers/Core',
    '../core/directives/Validator',


    './controllers/Base',
    './controllers/Error',
    './controllers/Catalog',

    './controllers/user/Login',
    './controllers/user/Profile',
    './controllers/user/ProfileItem',

    './services/Categories',
    './services/Profile'
], function () {});