/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'font-awesome': '../lib/font-awesome/fonts/*'
    },
    packages: [

    ]
});
require(['main']);
