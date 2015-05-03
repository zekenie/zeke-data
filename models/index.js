var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/zekedata')
require('./event')
require('./eventType')
