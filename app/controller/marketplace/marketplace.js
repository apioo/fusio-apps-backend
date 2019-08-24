'use strict'

module.exports = function ($scope, $http, $uibModal, fusio) {
  $scope.response = null
  $scope.apps = []
  $scope.working = false

  $scope.load = function () {
    $http.get(fusio.baseUrl + 'backend/marketplace')
      .then(function (response) {
        var data = response.data
        $scope.apps = data.apps
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.install = function (name) {
    $scope.working = true

    var data = {
      name: name
    }

    $http.post(fusio.baseUrl + 'backend/marketplace', data)
      .then(function (response) {
        $scope.response = response.data
        $scope.working = false
        $scope.load()
      })
      .catch(function (response) {
        $scope.response = response.data
        $scope.working = false
      })
  }

  $scope.update = function (name) {
    $scope.working = true
    
    $http.put(fusio.baseUrl + 'backend/marketplace/' + name)
      .then(function (response) {
        $scope.response = response.data
        $scope.working = false
        $scope.load()
      })
      .catch(function (response) {
        $scope.response = response.data
        $scope.working = false
      })
  }

  $scope.remove = function (name) {
    $scope.working = true
    
    $http.delete(fusio.baseUrl + 'backend/marketplace/' + name)
      .then(function (response) {
        $scope.response = response.data
        $scope.working = false
        $scope.load()
      })
      .catch(function (response) {
        $scope.response = response.data
        $scope.working = false
      })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()
}
