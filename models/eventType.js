var mongoose = require('mongoose')
var _ = require('lodash')
var eventTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType'},
  first: Date,
  last: Date
})

eventTypeSchema.methods.getChildren = function() {
  return mongoose
    .model('EventType')
    .find({ parent: this._id })
    .exec()
}

eventTypeSchema.methods.addEvent = function(params) {
  var self = this
  return mongoose
    .model('Event')
    .create(_.merge(params, { type: this._id }))
    .then(function(event) {
      if(event.start < self.first) self.first = event.start
      if(event.end > self.last) sel.last = event.end
      if(self.isModified('first') || self.isModified('last'))
      return self.save().then(function() { return event })
    })
}

eventTypeSchema.methods.addChild = function(params) {
  var self = this
  return mongoose
    .model('EventType')
    .create(_.merge(params, { parent: this._id }))
}

eventTypeSchema.methods.getEvents = function() {
  return mongoose
    .model('Event')
    .find({ type: this._id })
    .exec()
}

mongoose.model('EventType', eventTypeSchema)