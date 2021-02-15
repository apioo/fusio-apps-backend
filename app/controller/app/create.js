'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.app = {
    status: 1,
    name: '',
    url: '',
    scopes: []
  }

  $scope.states = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Pending'
  }, {
    key: 3,
    value: 'Deactivated'
  }]

  $scope.categories = []
  $scope.selected = []

  $scope.create = function (app) {
    var data = angular.copy(app)
    data.scopes = $scope.selected

    $http.post(fusio.baseUrl + 'backend/app', data)
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

  $scope.getScopeCategories = function () {
    $http.get(fusio.baseUrl + 'backend/scope/categories')
        .then(function (response) {
          $scope.categories = response.data.categories
        })
  }

  $scope.toggleScope = function (name) {
    let index = $scope.selected.indexOf(name);
    if (index > -1) {
      $scope.selected.splice(index, 1);
    } else {
      $scope.selected.push(name);
    }
  };

  $scope.getUsers()
  $scope.getScopeCategories()
}
