'use strict'

var angular = require('angular')

angular.module('fusioApp.sdk', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sdk', {
      templateUrl: 'app/controller/sdk/index.html',
      controller: 'SdkCtrl'
    })
  }])

  .controller('SdkCtrl', require('./sdk'))
