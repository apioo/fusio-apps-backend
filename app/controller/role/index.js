'use strict'

var angular = require('angular')

angular.module('fusioApp.role', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/role', {
      templateUrl: 'app/controller/role/index.html',
      controller: 'RoleCtrl'
    })
  }])

  .controller('RoleCtrl', require('./role'))
  .controller('RoleCreateCtrl', require('./create'))
  .controller('RoleUpdateCtrl', require('./update'))
  .controller('RoleDeleteCtrl', require('./delete'))
