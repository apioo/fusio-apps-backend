'use strict'

var angular = require('angular')

angular.module('fusioApp.cronjob', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cronjob', {
      templateUrl: 'app/controller/cronjob/index.html',
      controller: 'CronjobCtrl'
    })
  }])

  .controller('CronjobCtrl', require('./cronjob'))
  .controller('CronjobCreateCtrl', require('./create'))
  .controller('CronjobUpdateCtrl', require('./update'))
  .controller('CronjobDeleteCtrl', require('./delete'))
  .controller('CronjobErrorCtrl', require('./error'))
  .controller('CronjobErrorDetailCtrl', require('./error/detail'))
