'use strict';
var router = require('express').Router();

router.use('/api/v1/core/session', require('./core/session'));
router.use('/api/v1/core/user', require('./core/user'));

router.use('/api/v1/admin/users', require('./admin/users'));
router.use('/api/v1/admin/categories', require('./admin/categories'));
router.use('/api/v1/admin/vocabularies', require('./admin/vocabularies'));

router.use('/api/v1/categories', require('./main/categories'));
router.use('/api/v1/profile', require('./main/profile'));

module.exports = router;