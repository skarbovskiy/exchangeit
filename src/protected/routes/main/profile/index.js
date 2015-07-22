'use strict';
var router = require('express').Router();
router.use('/info', require('./info'));
router.use('/items', require('./items'));

module.exports = router;