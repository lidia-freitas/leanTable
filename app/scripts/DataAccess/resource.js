/**
 * Created by Lidia Freitas on 05/07/2017.
 */

'use strict';

let resorce = {
    init: function (path) {
        this.path = path;

        return this;
    },
    query: function () {
        return fetch(this.path).then(function(response) {
            // Convert to JSON
            return response.json();
        }).then(function(j) {
            // Yay, `j` is a JavaScript object
            return j;
        });
    }
};



