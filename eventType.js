var mongoose = require('mongoose')
var _ = require('lodash')
var eventTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType'}
})

eventTypeSchema.methods.getChildren = function() {
  return mongoose
    .model('EventType')
    .find({ parent: this._id })
    .exec()
}

eventTypeSchema.methods.addChild = function(params) {
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