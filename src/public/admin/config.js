require.config({
    deps: ['bootstrap'],
    paths: {
        'jquery': '../lib/jquery/dist/jquery.min',
        'angular': '../lib/angular/angular',
        'angularRoute': '../lib/angular-route/angular-route.min',
        'angularUIBootstrap': '../lib/angular-ui-bootstrap/ui-bootstrap-tpls-0.12.1.min',
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
        'angularUIBootstrap': {
            deps: ['angular']
        }
    },
    priority: [
        'angular'
    ]
});