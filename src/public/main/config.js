require.config({
    deps: ['bootstrap'],
    paths: {
        'jquery': '../lib/jquery/jquery.min',
        'moment': '../lib/moment/moment.min',
        'angular': '../lib/angular/angular',
        'angularAria': '../lib/angular-aria/angular-aria.min',
        'angularAnimate': '../lib/angular-animate/angular-animate.min',
        'angularRoute': '../lib/angular-route/angular-route.min',
        'angularMessages': '../lib/angular-messages/angular-messages.min',
        'angularMaterial': '../lib/angular-material/angular-material.min',
        'angularSEO': '../lib/angular-seo/angular-seo',
        'lodash': '../lib/lodash/index'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'lodash': {
            exports: '_'
        },
        'angular' : {
            deps: ['jquery'],
            exports : 'angular'
        },
        'angularRoute': {
            deps: ['angular']
        },
        'angularAria': {
            deps: ['angular']
        },
        'angularAnimate': {
            deps: ['angular']
        },
        'angularMessages': {
            deps: ['angular']
        },
        'angularMaterial': {
            deps: ['angular']
        },
        'angularSEO': {
            deps: ['angular']
        }
    },
    priority: [
        'angular'
    ]
});