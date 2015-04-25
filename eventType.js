var mongoose = require('mongoose')

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

eventTypeSchema.methods.getEvents = function() {
  return mongoose
    .model('Event')
    .find({ type: this._id })
    .exec()
}

mongoose.model('EventType', eventTypeSchema)