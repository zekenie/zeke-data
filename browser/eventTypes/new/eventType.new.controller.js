angular.module('zekeData')
  .config(function($stateProvider) {
    $stateProvider
      .state('eventTypes.new', {
        templateUrl: 'eventTypes/new/eventType.new.html',
        controller: 'eventTypeNewCtrl',
        url: '/new',
      })
  })
  .controller('eventTypeNewCtrl', function($scope, eventTypes, EventType) {
    $scope.eventTypes = eventTypes
    console.log(eventTypes)
    $scope.form = {}

    $scope.submit = function() {
      EventType
        .create($scope.form)
        // .then(console.log)
        // .catch(console.warn)
    }
  })