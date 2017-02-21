/**
 * localStorage.js
 *
 * A lightweight library to interact with localStorage and provides a cookie
 * based fallback in case localStorage is not available (e.g. on iOS when
 * browsing in privacy mode).
 */

;(function(window, document, undefined) {

    'use strict';

    var storage = window.storage || {

        /**
         * Checks if the native localStorage is available.
         * 
         * @return {Boolean}
         */
        hasLocalStorage: function() {
            return typeof window.localStorage === 'object';
        },

        /**
         * Gets an item from localStorage.
         * 
         * @param  {String} key The key to get the value for.
         * @return {String}
         */
        localStorageGet: function(key) {
            return localStorage.getItem(key);
        },

        /**
         * Sets an item in localStorage.
         * 
         * @param  {String} key   The key to store the value for.
         * @param  {String} value The value itself.
         */
        localStorageSet(key, value) {
            localStorage.setItem(key, value);
        },

        /**
         * Gets an item from a cookie.
         * 
         * @param  {String} key The key to get the value for,
         * @return {String}
         */
        cookieGet: function(key) {
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + key + '=');
            if (parts.length == 2) return parts.pop().split(';').shift();
        },

        /**
         * Sets an item in a cookie.
         * 
         * @param  {String} key   The key to store the value for.
         * @param  {String} value The value itself.
         */
        cookieSet: function(key, value) {
            document.cookie = key + '=' + value;
        },

        /**
         * Gets a value from the storage by key.
         * 
         * @param  {String} key The key to get the value for.
         * @return {String}     The value.
         */
        get: function(key) {
            return this.hasLocalStorage() ? this.localStorageGet(key) : this.cookieGet(key);
        },

        /**
         * Set a value in the storage by key.
         * 
         * @param  {String} key   The key to set the value for.
         * @param  {String} value The value to set.
         * @return {Null}
         */
        set: function(key, value) {
            return this.hasLocalStorage() ? this.localStorageSet(key, value) : this.cookieSet(key, value);
        }

    };

    window.storage = storage;

})(window, document);
