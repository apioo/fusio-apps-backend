'use strict';

var angular = require('angular');

angular.module('fusioApp.event', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event', {
    templateUrl: 'app/controller/event/index.html',
    controller: 'EventCtrl'
  });
}])

.controller('EventCtrl', require('./event'))
.controller('EventCreateCtrl', require('./create'))
.controller('EventUpdateCtrl', require('./update'))
.controller('EventDeleteCtrl', require('./delete'))

;
