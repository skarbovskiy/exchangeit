'use strict';

var lodash = require('lodash');
var logger = require('./bootstrap').get('logger');

function _handleResponse (requestObject, responseObject, responseCode, responseData, flags) {
    if (flags.isRedirect) {
        responseObject.redirect(responseData);
    } else {
        responseObject.status(responseCode).json(responseData);
    }

    var startTime = requestObject._startTime;
    var endTime = Date.now();
    var logEntry = {
        requestIps: lodash.union(requestObject.ips, [requestObject.ip]),
        requestPath: requestObject.path,
        requestBody: JSON.stringify(requestObject.body),
        requestHeaders: JSON.stringify(requestObject.headers),
        responseCode: responseCode,
        responseObject: JSON.stringify(responseData),
        responseDuration: endTime - startTime
    };
    logger.info('request', logEntry);
}

module.exports = function (request, response, next) {
    var sectionName = request.params.section;
    var serviceName = request.params.service;
    var functionName = request.params.function;
    var service = require('../../services/' + sectionName + '/' + serviceName + '.js');
    if (typeof(service[functionName]) === 'undefined') {
        var error = new Error('service not found');
        error.status = 404;
        throw error;
    }
    var responseCallback = function (error, responseData, isRedirect) {
        if (error) {
            return next(error);
        }
        _handleResponse(request, response, 200, responseData, {isRedirect: isRedirect});
    };
    service[functionName](request, responseCallback, next);
};