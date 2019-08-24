'use strict'

var angular = require('angular')

angular.module('fusioApp.marketplace', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/marketplace', {
      templateUrl: 'app/controller/marketplace/index.html',
      controller: 'MarketplaceCtrl'
    })
  }])

  .controller('MarketplaceCtrl', require('./marketplace'))
