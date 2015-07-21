'use strict';
var crypto = require('crypto');
var Service = {
    md5: function (string) {
        var md5sum = crypto.createHash('md5');
        md5sum.update(string);
        return md5sum.digest('hex');
    },
    hashPassword: function (password, salt) {
        return Service.md5(password + salt);
    },
    cleanDataForResponse: function (userData) {
        if (!userData) {
            return userData;
        }
        userData.password = undefined;
        userData.id = undefined;
        userData.user_id = undefined;
        return userData;
    }
};

module.exports = Service;