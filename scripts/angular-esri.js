/**
 * Created by Jin Woo Shin on 12/1/2014.
 */
(function() {
    'use strict';
    var pathRX = new RegExp(/\/[^\/]+$/);
    var locationPath = location.pathname.replace(pathRX,'').replace('src', '');

    define('angular', function() {
        if(angular) {
            return angular;
        }
        return {};
    });

    require({
        async: true,
        aliases: [['text', 'dojo/text']],
        packages: [{
            name: 'controllers',
            location: locationPath + 'scripts/controllers'
        }, {
            name: 'helpers',
            location: locationPath + 'scripts/helpers'
        }, {
            name: 'widgets',
            location: locationPath + 'scripts/widgets'
        }, {
            name: 'js',
            location: locationPath + 'scripts'
        }]
    });

    require([
        'dojo/ready',
        'js/bootstrap'
    ], function(ready, bootstrap) {
        ready(function() {
            console.info('start the bootstrapper');
            bootstrap.start();
        });
    });
}).call(this);
