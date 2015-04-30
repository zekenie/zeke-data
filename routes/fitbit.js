var express = require('express')
var router = module.exports = express.Router()
var Fitbit = require('fitbit')
var config = require('../secrets.json')

var oauth = module.exports.oauth = {}

var client = new Fitbit(config.fitbit.CONSUMER_KEY, config.fitbit.CONSUMER_SECRET);

router.get('/', function(req, res, next) {
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

  client.getActivities({
    date: new Date() //HERE
  }, function(err, activities) {
    if(err) return next(err)
    console.log(activities)
    console.log(activities.steps())
    res.status(200).end()
  })
})