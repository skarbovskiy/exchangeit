require.config({
    deps: ['bootstrap'],
    paths: {
        'jquery': '../lib/jquery/dist/jquery',
        'angular': '../lib/angular/angular',
        'angularRoute': '../lib/angular-route/angular-route',
        'angularAnimate': '../lib/angular-animate/angular-animate',
        'angularAria': '../lib/angular-aria/angular-aria',
        'angularMaterial': '../lib/angular-material/angular-material',
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
        'angularAnimate': {
            deps: ['angular']
        },
        'angularAria': {
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