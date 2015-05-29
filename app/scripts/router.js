'use strict';

var Router = require('ampersand-router');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'about': 'about',
        'menu': 'menu',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('closeMenu');
    },
    about: function () {
        window.console.log('about');
    },
    menu: function (attribute) {
        console.log('router')
        this.trigger('visitMenu');
    },
    catchAll: function (path) {
        window.console.warn(path);
        this.redirectTo('');
    }
});
