angular.module('zekeData')
  .factory('EventType', function(DS) {
    return DS.defineResource('eventType')
  })