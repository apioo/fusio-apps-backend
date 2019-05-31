'use strict'

var angular = require('angular')

angular.module('fusioApp.contract', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contract', {
      templateUrl: 'app/controller/contract/index.html',
      controller: 'ContractCtrl'
    })
  }])

  .controller('ContractCtrl', require('./contract'))
  .controller('ContractCreateCtrl', require('./create'))
  .controller('ContractDeleteCtrl', require('./delete'))
