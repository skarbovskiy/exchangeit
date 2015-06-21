require.config({
    deps: ['bootstrap'],
    paths: {
        'jquery': '../lib/jquery/jquery.min',
        'angular': '../lib/angular/angular',
        'angularAria': '../lib/angular-aria/angular-aria.min',
        'angularAnimate': '../lib/angular-animate/angular-animate.min',
        'angularRoute': '../lib/angular-route/angular-route.min',
        'angularMaterial': '../lib/angular-material/angular-material.min',
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
            'exports' : 'angular'
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
        'angularMaterial': {
            deps: ['angular']
        }
    },
    priority: [
        'angular'
    ]
});