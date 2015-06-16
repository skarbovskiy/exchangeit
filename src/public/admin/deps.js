define([
    '../core/core.module',
    '../core/services/Http',
    '../core/services/User',
    '../core/services/Session',
    '../core/controllers/Core',
    '../core/directives/Validator',

    './controllers/Base',
    './controllers/Login',
    './controllers/Logout',
    './controllers/Dashboard',
    './controllers/Categories',
    './controllers/Users',
    './controllers/Vocabularies',
    './controllers/VocabularyContent',

    './controllers/modals/DefaultModal',

    './services/Users',
    './services/Categories',
    './services/Vocabularies'
], function () {});