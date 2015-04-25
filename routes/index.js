var express = require('express')

var router = module.exports = express.Router()

router.use('/events', require('./event'))
router.use('/eventTypes', require('./eventType'))