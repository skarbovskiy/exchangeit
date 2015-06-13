'use strict';
var router = require('express').Router();

router.use('/core/session', require('./core/session'));
router.use('/core/user', require('./core/user'));

router.use('/admin/users', require('./admin/users'));
router.use('/admin/categories', require('./admin/categories'));
router.use('/admin/vocabularies', require('./admin/vocabularies'));

module.exports = router;