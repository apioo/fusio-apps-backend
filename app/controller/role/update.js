'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, role, fusio) {
  $scope.role = role

  $scope.categories = []
  $scope.selected = []

  $scope.update = function (role) {
    var data = angular.copy(role)
    data.scopes = $scope.selected

    $http.put(fusio.baseUrl + 'backend/role/' + role.id, data)
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

  $http.get(fusio.baseUrl + 'backend/role/' + role.id)
    .then(function (response) {
      $scope.selected = angular.isArray(response.data.scopes) ? response.data.scopes : []
      $scope.role = response.data
    })

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.closeResponse = function () {
    $scope.response = null
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

  $scope.getScopeCategories()

}
