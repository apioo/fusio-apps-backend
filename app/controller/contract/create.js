'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.contract = {
    userId: 0,
    planId: 0
  }

  $scope.create = function (contract) {
    var data = angular.copy(contract)

    $http.post(fusio.baseUrl + 'backend/plan/contract', data)
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

  $scope.getUsers = function () {
    $http.get(fusio.baseUrl + 'backend/user?count=1024')
      .then(function (response) {
        $scope.users = response.data.entry
      })
  }

  $scope.getPlans = function () {
    $http.get(fusio.baseUrl + 'backend/plan?count=1024')
      .then(function (response) {
        $scope.plans = response.data.entry
      })
  }

  $scope.getUsers()
  $scope.getPlans()
}
