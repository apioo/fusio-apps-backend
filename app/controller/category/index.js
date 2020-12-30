'use strict'

var angular = require('angular')

angular.module('fusioApp.category', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/category', {
      templateUrl: 'app/controller/category/index.html',
      controller: 'CategoryCtrl'
    })
  }])

  .controller('CategoryCtrl', require('./category'))
  .controller('CategoryCreateCtrl', require('./create'))
  .controller('CategoryUpdateCtrl', require('./update'))
  .controller('CategoryDeleteCtrl', require('./delete'))
