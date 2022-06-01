'use strict'

var angular = require('angular')

angular.module('fusioApp.trash', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/trash', {
      templateUrl: 'app/controller/trash/index.html',
      controller: 'TrashCtrl'
    })
  }])

  .controller('TrashCtrl', require('./trash'))
