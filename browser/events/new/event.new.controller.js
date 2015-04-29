angular.module('zekeData')
  .config(function($stateProvider) {
    $stateProvider
      .state('events.new', {
        templateUrl: 'events/new/event.new.html',
        controller: 'EventNewCtrl',
        url: '/new',
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
  .controller('EventNewCtrl', function($scope, Event, EventType, eventTypes) {
    $scope.eventTypes = eventTypes
    $scope.form = {}
  })