'use strict';

var Service = {
    get: function (request, response) {
        if (!request.session.user || !request.session.user.id) {
            var error = new Error('no user authenticated');
            error.status = 401;
            return response(error);
        }
        var sessionData = request.session.user;
        sessionData.password = null;
        response(null, sessionData);
    }
};

module.exports = Service;