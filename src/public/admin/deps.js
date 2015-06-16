define([
    '../core/core.module',
    '../core/services/Http',
    '../core/services/User',
    '../core/services/Session',
    '../core/controllers/Core',
    '../core/directives/Validator',

    './controllers/Base',
    './controllers/auth/Login',
    './controllers/auth/Logout',
    './controllers/Dashboard',
    './controllers/category/Categories',
    './controllers/category/Attributes',
    './controllers/vocabulary/Vocabularies',
    './controllers/vocabulary/Content',
    './controllers/Users',

    './controllers/modals/DefaultModal',

    './services/Users',
    './services/Categories',
    './services/Vocabularies'
], function () {});