'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.subscription = {
    eventId: null,
    userId: null,
    endpoint: ''
  }

  $scope.events = [];
  $scope.users = [];

  $scope.create = function (subscription) {
    var data = angular.copy(subscription)

    $http.post(fusio.baseUrl + 'backend/event/subscription', data)
      .then(function (response) {
        var data = response.data
        $scope.response = data
        if (data.success === true) {
          $uibModalInstance.close(data)
        }
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.getEvents = function () {
    $http.get(fusio.baseUrl + 'backend/event?count=1024')
        .then(function (response) {
          $scope.events = response.data.entry
        })
  }

  $scope.getUsers = function () {
    $http.get(fusio.baseUrl + 'backend/user?count=1024')
        .then(function (response) {
          $scope.users = response.data.entry
        })
  }

  $scope.getEvents();
  $scope.getUsers();
}
