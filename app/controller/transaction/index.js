'use strict'

var angular = require('angular')

angular.module('fusioApp.transaction', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/transaction', {
      templateUrl: 'app/controller/transaction/index.html',
      controller: 'TransactionCtrl'
    })
  }])

  .controller('TransactionCtrl', require('./transaction'))
  .controller('TransactionDetailCtrl', require('./detail'))
