'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, formBuilder, fusio) {
  $scope.page = {
    title: '',
    content: ''
  }
  $scope.pages = []

  $scope.create = function (page) {
    var data = angular.copy(page)

    $http.post(fusio.baseUrl + 'backend/page', data)
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
