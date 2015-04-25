var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/zekedata')
require('./event')
require('./eventType')


var app = module.exports = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('browser'))
app.use('/vendor',express.static('bower_components'))

app.use(require('./routes'))

app.use(function(err, req, res) {
  res.status(err.status || 500).send(err)
})

app.listen(process.env.PORT || 8080)