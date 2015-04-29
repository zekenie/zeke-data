angular.module('zekeData')
  .config(function($stateProvider) {
    $stateProvider
      .state('eventTypes', {
        templateUrl: 'eventTypes/eventType.index.html',
        controller: 'eventTypeCtrl',
        url: '/eventTypes',
        resolve: {
          eventTypes: function(EventType) {
            var cached = EventType.getAll()
            if(cached.length) {
              return cached
            }
            return EventType.findAll()
          }
        }
      })
  })
  .controller('eventTypeCtrl', function($scope) {

  })