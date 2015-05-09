'use strict';
var helper = require('../../modules/user/helper');
var model = require('../../modules/user/index');
var Service = {
    getCurrent: function (request, response) {
        response(null, helper.cleanDataForResponse(request.session.user));
    },

    getList: function (request, response) {
        model.getList(response);
    },

    update: function (request, response) {
        model.update(
            request.body.id,
            request.body.phone,
            request.body.status,
            request.body.type,
            request.body.first_name,
            request.body.last_name,
            request.body.email,
            request.body.comment,
            response
        )
    }
};

module.exports = Service;