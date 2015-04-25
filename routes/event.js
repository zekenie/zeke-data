var express = require('express')
var mongoose = require('mongoose')
var router = module.exports = express.Router()

router.param('id', function(req, res, next, id) {
  mongoose
    .model('Event')
    .findById(id)
    .exec()
    .then(function(event) {
      if(!event) {
        var err = new Error('not found')
        err.status = 404
        return next(err)
      }
      req.event = event
      next()
    })
    .then(null, function(err) {
      next(err)
    })
})

router.get('/', function(req, res, next) {
  mongoose
    .model('Event')
    .find()
    .exec()
    .then(function(events) {
      res.json(events)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.get('/:id', function(req, res) {
  try {
    res.json(req.event)
  } catch(e) {
    next(e)
  }
})

router.delete('/:id', function(req, res, next) {
  req.event
    .remove()
    .then(function(result) {
      res.status(200).end()
    })
    .then(null, function(err) {
      next(err)
    })
})

router.post('/', function(req, res, next) {
  mongoose.model('Event')
    .create(req.body)
    .then(function(event) {
      res.json(event)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.put('/:id', function(req, res, next) {
  for(var key in req.body) {
    req.event[key] = req.body[key]
  }

  if(req.body.meta) {
    req.event.markModified('meta')
  }

  req.event
    .save()
    .then(function(event) {
      res.json(event)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.post('/:id', function(req, res, next) {
  req.event
    .addChild(req.body)
    .then(function(event) {
      res.json(event)
    })
    .then(null, function(err) {
      next(err)
    })
})

router.get('/:id/children', function(req, res, next) {
  req.event
    .getChildren()
    .then(function(events) {
      res.json(events)
    })
    .then(null, function(err) {
      next(err)
    })
})





