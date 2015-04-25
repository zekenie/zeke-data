var mongoose = require('mongoose')
var _ = require('lodash')
var eventSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType' },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  start: Date,
  end: Date,
  meta: {}
})

eventSchema.methods.getChildren = function() {
  return mongoose
    .model('Event')
    .find({ parent: this._id })
    .exec()
}

eventSchema.mehtods.addChild = function(child) {
  return mongoose
    .model('Event')
    .create(_.merge(child, {
      parent: this._id
    }))
}

eventSchema.path('start').validate(function(value) {
  if(!this.end) return true
  return value < this.end
}, 'start must be before end')

eventSchema.path('end').validate(function(value) {
  if(!this.start) return true
  return value > this.start
}, 'end must be after start')

mongoose.model('Event', eventSchema)