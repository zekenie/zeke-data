var express = require('express')
var router = module.exports = express.Router()
var Fitbit = require('fitbit')
var Promise = require('bluebird')
var fs = require('fs')
var config = require('../secrets.json')

var oauth = module.exports.oauth = {}

var getFitbitData = function(model, client, date) {
  return new Promise(function(resolve, reject) {
    client['get' + model]({
      date: date
    }, function(err, activities) {
      if(err) return reject(err)
      resolve(activities)
    })
  }) 
}


var createDateRange = function(start, end) {
  var dates = []
  while(start <= end) {
    dates.push(start)
    start = new Date(start.setDate(start.getDate() + 1))
  }
  return dates
}

var client = new Fitbit(config.fitbit.CONSUMER_KEY, config.fitbit.CONSUMER_SECRET);

router.get('/', function(req, res, next) {
  return res.send("this route was previously set up to authenticate with fitbit to grab data, data's already been gotten though!")
  client.getRequestToken(function(err, token, tokenSecret) {
    if(err) return next(err)
    oauth.token = token
    oauth.tokenSecret = tokenSecret
    res.redirect(client.authorizeUrl(token))
  })
})

router.get('/callback', function(req, res, next) {
  var verifier = req.query.oauth_verifier
  client.getAccessToken(oauth.token, oauth.tokenSecret, verifier, function(err, token, secret) {
    if(err) return next(err)
    oauth.accessToken = token
    oauth.accessTokenSecret = secret
    res.redirect('/fitbit/stats')
  })
})

router.get('/stats', function(req, res, next) {
  client = new Fitbit(
      config.fitbit.CONSUMER_KEY,
      config.fitbit.CONSUMER_SECRET,
      {
        accessToken: oauth.accessToken,
        accessTokenSecret: oauth.accessTokenSecret,
        unitMeasure: 'en_GB'
      })

  var range = createDateRange(new Date('1/20/14'), new Date('2/25/14'))

  var activitiesPromies = Promise.map(range, function(date) {
    return getFitbitData('Activities', client, date)
  })

  var sleepPromise = Promise.map(range, function(date) {
    return getFitbitData('Sleep', client, date)
  })

  Promise.join(activitiesPromies, sleepPromise)
  .spread(function(activities, sleep) {
    var fitbitData = JSON.stringify({
      activities: activities,
      sleep: sleep
    }, null, 2)

    res.send(fitbitData)

    fs.writeFile(Date.now() + '.json', fitbitData, function(err) {
      if(err) return console.log('error saving fitbit data file')
      console.log('saved fitbit data file')
    })
  }, function(err) {
    next(err)
  })
  
})