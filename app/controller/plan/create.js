'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.plan = {
    name: '',
    description: '',
    price: 0,
    points: 0,
    period: 0,
    externalId: ''
  }

  $scope.periods = [{
    id: 0,
    name: 'One-Time'
  }, {
    id: 1,
    name: 'Subscription'
  }]

  $scope.create = function (plan) {
    var data = angular.copy(plan)

    $http.post(fusio.baseUrl + 'backend/plan', data)
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
}
