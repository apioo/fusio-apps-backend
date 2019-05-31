'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.event = {
    name: '',
    description: ''
  }

  $scope.create = function (event) {
    var data = angular.copy(event)

    $http.post(fusio.baseUrl + 'backend/event', data)
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
