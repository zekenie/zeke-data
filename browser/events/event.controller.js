angular.module('zekeData')
  .config(function($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'events/event.index.html',
        controller: 'EventCtrl'
      })
  })
  .controller('EventCtrl', function($scope, Event) {
    console.log('foo')
    Event.findAll().then(function(events) {
      console.log('events',events)
    })
    .catch(function(e) {
      console.error(e)
    })
  })