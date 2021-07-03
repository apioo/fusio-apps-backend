'use strict'

var angular = require('angular')

angular.module('fusioApp.page', ['ngRoute', 'ui.ace'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/page', {
      templateUrl: 'app/controller/page/index.html',
      controller: 'PageCtrl'
    })
    $routeProvider.when('/page/:page_id', {
      templateUrl: 'app/controller/page/index.html',
      controller: 'PageCtrl'
    })
  }])

  .controller('PageCtrl', require('./page'))
  .controller('PageCreateCtrl', require('./create'))
  .controller('PageUpdateCtrl', require('./update'))
  .controller('PageDeleteCtrl', require('./delete'))
