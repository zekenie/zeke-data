var express = require('express')
var mongoose = require('mongoose')
var router = module.exports = express.Router()

router.param('id', function(req, res, next, id) {
  mongoose
    .model('EventType')
    .findById(id)
    .exec()
    .then(function(eventType) {
      if(!eventType) {
        var err = new Error('not found')
        err.status = 404
        return next(err)
      }
      req.eventType = eventType
    })
    .then(function(null, err) {
      next(err)
    })
})

router.get('/', function(req, res, next) {
  mongoose
    .model('EventType')
    .find()
    .exec()
    .then(function(eventTypes) {
      res.json(eventTypes)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.get('/:id', function(req, res) {
  try {
    res.json(req.eventType)
  } catch(e) {
    next(e)
  }
})

router.delete('/:id', function(req, res, next) {
  req.eventType
    .remove()
    .then(function(result) {
      res.status(200).end()
    })
    .then(null, function(err) {
      next(err)
    })
})

router.post('/', function(req, res, next) {
  mongoose.model('EventType')
    .create(req.body)
    .then(function(eventType) {
      res.json(eventType)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.put('/:id', function(req, res, next) {
  for(var key in req.body) {
    req.eventType[key] = req.body[key]
  }

  req.eventType
    .save()
    .then(function(eventType) {
      res.json(eventType)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.post('/:id', function(req, res, next) {
  req.eventType
    .addChild(req.body)
    .then(function(eventType) {
      res.json(eventType)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.get('/:id/children', function(req, res, next) {
  req.eventType
    .getChildren()
    .then(function(eventTypes) {
      res.json(eventTypes)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.get('/:id/events', function(req, res, next) {
  req.eventType
    .getEvents()
    .then(function(events) {
      res.json(events)
    })
    .then(null, function(err) {
      next(err)
    })
})





