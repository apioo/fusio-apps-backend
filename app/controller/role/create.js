'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, fusio) {
  $scope.role = {
    categoryId: null,
    name: '',
    scopes: {}
  }

  $scope.categories = []
  $scope.selected = []

  $scope.create = function (role) {
    var data = angular.copy(role)
    data.scopes = $scope.selected

    $http.post(fusio.baseUrl + 'backend/role', data)
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
