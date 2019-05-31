'use strict'

var angular = require('angular')

angular.module('fusioApp.plan', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/plan', {
      templateUrl: 'app/controller/plan/index.html',
      controller: 'PlanCtrl'
    })
  }])

  .controller('PlanCtrl', require('./plan'))
  .controller('PlanCreateCtrl', require('./create'))
  .controller('PlanUpdateCtrl', require('./update'))
  .controller('PlanDeleteCtrl', require('./delete'))
