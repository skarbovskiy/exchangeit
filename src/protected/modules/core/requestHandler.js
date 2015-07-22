'use strict';

var lodash = require('lodash');
var logger = require('./bootstrap').get('logger');

/**
 * @param request express object
 * @param responseCallback express object
 * @param responseArray [code, data, redirect flag]
 */
function handleResponse (request, responseCallback, responseArray) {
    if (responseArray[2]) {
        responseCallback.redirect(responseArray[1]);
    } else {
        //setTimeout(function () {

        responseCallback.status(responseArray[0]).json(responseArray[1]);
        //}, 3000);
    }
    var startTime = request._startTime;
    var endTime = Date.now();
    var logEntry = {
        requestIps: lodash.union(request.ips, [request.ip]),
        requestPath: request.originalUrl,
        requestMethod: request.method,
        requestBody: JSON.stringify(request.body),
        requestHeaders: JSON.stringify(request.headers),
        responseCode: responseArray[0],
        responseObject: JSON.stringify(responseArray[1]),
        responseDuration: endTime - startTime
    };
    logger.info('request', logEntry);
}

module.exports = handleResponse;