var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

require('./event')
require('./eventType')


var app = module.exports = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'))

app.listen(process.env.PORT || 8080)