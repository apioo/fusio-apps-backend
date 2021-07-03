'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, $uibModal, page, formBuilder, $timeout, fusio) {
  $scope.page = page

  $scope.update = function (page) {
    var data = angular.copy(page)

    $http.put(fusio.baseUrl + 'backend/page/' + page.id, data)
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

  $http.get(fusio.baseUrl + 'backend/page/' + page.id)
    .then(function (response) {
      $scope.page = response.data
    })
}
