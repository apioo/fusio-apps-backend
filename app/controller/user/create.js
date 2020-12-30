'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.user = {
    status: 1,
    roleId: 0,
    name: '',
    email: ''
  }

  $scope.statuuus = [{
    id: 1,
    name: 'Active'
  }, {
    id: 2,
    name: 'Disabled'
  }]

  $scope.roles = []

  $scope.create = function (user) {
    var data = angular.copy(user)

    // remove app data
    if (data.apps) {
      delete data.apps
    }

    // remove scopes
    if (data.scopes) {
      delete data.scopes
    }

    $http.post(fusio.baseUrl + 'backend/user', data)
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

  $scope.getRoles = function () {
    $http.get(fusio.baseUrl + 'backend/role?count=1024')
      .then(function (response) {
        $scope.roles = response.data.entry
      })
  }

  $scope.getRoles()

}
