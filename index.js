var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

require('./models')

var app = module.exports = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('browser'))
app.use('/vendor',express.static('bower_components'))

app.use(require('./routes'))

app.use(function(req, res, next, err) {
  res.status(err.status || 500).send(err)
})

app.listen(process.env.PORT || 8080)