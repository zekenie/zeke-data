var express = require('express')

var router = module.exports = express.Router()

router.use('/event', require('./event'))
router.use('/eventType', require('./eventType'))

router.use('/fitbit', require('./fitbit'))