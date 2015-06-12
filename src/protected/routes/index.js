'use strict';
var router = require('express').Router();

router.use('/core/session', require('./core/session'));
router.use('/core/user', require('./core/user'));
//router.use('/admin', require('./admin/index'));

module.exports = router;