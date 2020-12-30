'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, category, fusio) {
  $scope.category = category

  $scope.update = function (category) {
    var data = angular.copy(category)

    $http.put(fusio.baseUrl + 'backend/category/' + category.id, data)
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

  $http.get(fusio.baseUrl + 'backend/category/' + category.id)
    .then(function (response) {
      $scope.category = response.data
    })

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

}
