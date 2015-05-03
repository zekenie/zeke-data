//script designed to take csv as formatted by the quantified self app, clean it, and insert it into mongodb

var fs = require('fs')
var _ = require('lodash')
var Promise = require('bluebird')
var mongoose = require('mongoose')

require('../models')

var formatters = {
  date: function(d) { return new Date(d) },
  number: function(n) { return parseFloat(n) }
}

var rowFormatMapper = ['date', 'date', 'number', 'number', 'number']

var columnFormatMapper = {}

var formatRow = function(row) {
  return _.mapValues(row, function(value, key) {
    return formatters[columnFormatMapper[key]](value)
  })
}

var cleanData = function(data) {
  return _(data.toString().split('\r\n'))
    .map(function(row) { return row.split(',') })
    .map(function(row, i, arr) {
      columnFormatMapper = _.zipObject(arr[0], rowFormatMapper)
      return _.zipObject(arr[0], row)
    })
    .drop(1)
    .initial()
    .map(formatRow)
    .value()
}

fs.readFile(__dirname + '/raw_data/apple.csv', function(err, data) {
  if(err) console.error(err)
  data = cleanData(data)

  console.log('cleaned', data.length, 'rows')
  
  mongoose
    .model('EventType')
    .findOne({ name: 'AppleMotion' })
    .then(function(eventType) {
      if(eventType) return eventType
      return mongoose.model('EventType').create({ name: 'AppleMotion' })
    })  
    .then(function(eventType) {
      return Promise.map(data, function(datum) {
        if(datum.Finish < eventType.last) return;
        return eventType.addEvent({
          start: datum.Start,
          end: datum.Finish,
          meta: _.pick(datum, _.isNumber)
        })
      })
    })
    .then(function(data) {
      data = _.compact(data)
      console.log('imported', data.length, 'rows')
      process.exit()
    }, function(err) {
      console.log('there was an err', err)
      process.exit(1)
    })
  
})