'use strict'

var angular = require('angular')

angular.module('fusioApp.subscription', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/subscription', {
      templateUrl: 'app/controller/subscription/index.html',
      controller: 'SubscriptionCtrl'
    })
  }])

  .controller('SubscriptionCtrl', require('./subscription'))
  .controller('SubscriptionCreateCtrl', require('./create'))
  .controller('SubscriptionUpdateCtrl', require('./update'))
  .controller('SubscriptionDeleteCtrl', require('./delete'))
