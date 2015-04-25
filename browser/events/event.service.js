angular.module('zekeData')
  .factory('Event', function(DS) {
    return DS.defineResource('event')
  })