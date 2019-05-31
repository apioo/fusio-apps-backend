'use strict'

var angular = require('angular')

angular.module('fusioApp.audit', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/audit', {
      templateUrl: 'app/controller/audit/index.html',
      controller: 'AuditCtrl'
    })
  }])

  .controller('AuditCtrl', require('./audit'))
  .controller('AuditDetailCtrl', require('./detail'))
  .controller('AuditFilterCtrl', require('./filter'))
