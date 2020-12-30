'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio, user) {
  $scope.user = user

  $scope.statuuus = [{
    id: 1,
    name: 'Active'
  }, {
    id: 2,
    name: 'Disabled'
  }]

  $scope.roles = []
  $scope.categories = []
  $scope.selected = []

  $scope.update = function (user) {
    var data = angular.copy(user)
    data.scopes = $scope.selected

    // remove app data
    if (data.apps) {
      delete data.apps
    }

    $http.put(fusio.baseUrl + 'backend/user/' + data.id, data)
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

  $scope.loadUser = function () {
    $http.get(fusio.baseUrl + 'backend/user/' + user.id)
      .then(function (response) {
        $scope.user = response.data
        $scope.selected = response.data.scopes
      })
  }

  $scope.getRoles = function () {
    $http.get(fusio.baseUrl + 'backend/role?count=1024')
      .then(function (response) {
        $scope.roles = response.data.entry
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

  $scope.loadUser()
  $scope.getScopeCategories()
  
}
