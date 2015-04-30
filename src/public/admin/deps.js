define([
    '../core/core.module',
    '../core/services/Http',
    '../core/controllers/Core',
    '../core/directives/Validator',

    '../user/user.module',
    '../user/services/User',

    '../catalog/catalog.module',
    '../catalog/services/Catalog',

    './controllers/Base',
    './controllers/Login',
    './controllers/Logout',
    './controllers/Dashboard',
    './controllers/Categories',

    './controllers/modals/CreateModal'
], function () {});