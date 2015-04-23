'use strict';

var Service = {
    get_token: function (request, response) {
        response({test: true});
    },
    get_token2: function (request, response) {
        response({test2: true});
    }
};

module.exports = Service;