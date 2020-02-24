'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, $uibModal, fusio, subscription) {
  $scope.subscription = subscription

  $scope.update = function (subscription) {
    var data = angular.copy(subscription)

    $http.put(fusio.baseUrl + 'backend/event/subscription/' + subscription.id, data)
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

  $http.get(fusio.baseUrl + 'backend/event/subscription/' + subscription.id)
    .then(function (response) {
      var data = response.data
      if (!angular.isString(data.source)) {
        data.source = JSON.stringify(data.source, null, 4)
      }

      $scope.subscription = data
    })
}
