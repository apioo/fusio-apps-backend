'use strict'

module.exports = function ($scope, $http, $uibModal, $window, fusio) {
  $scope.response = null
  $scope.types = []

  $scope.load = function () {
    $http.get(fusio.baseUrl + 'backend/sdk')
      .then(function (response) {
        var data = response.data
        $scope.types = data.types
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.generate = function (format) {
    var data = {
      format: format
    }

    $http.post(fusio.baseUrl + 'backend/sdk', data)
      .then(function (response) {
        $scope.response = response.data
        $scope.load()
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.download = function (link) {
    $window.location.href = link
  }
  
  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()
}
