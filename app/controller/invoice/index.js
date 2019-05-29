'use strict';

var angular = require('angular');

angular.module('fusioApp.invoice', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/invoice', {
    templateUrl: 'app/controller/invoice/index.html',
    controller: 'InvoiceCtrl'
  });
}])

.controller('InvoiceCtrl', require('./invoice'))

;
