angular.module('zekeData', ['js-data', 'ui.router'])

angular.module('zekeData').config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise("/events");
})