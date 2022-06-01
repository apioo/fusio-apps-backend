'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, $uibModal, fusio, plan) {
  $scope.plan = plan

  $scope.periods = [{
    id: 0,
    name: 'One-Time'
  }, {
    id: 1,
    name: 'Subscription'
  }]

  $scope.categories = []
  $scope.selected = []

  $scope.update = function (plan) {
    var data = angular.copy(plan)
    data.scopes = $scope.selected

    $http.put(fusio.baseUrl + 'backend/plan/' + plan.id, data)
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

  $http.get(fusio.baseUrl + 'backend/plan/' + plan.id)
    .then(function (response) {
      var data = response.data

      $scope.plan = data
      $scope.selected = angular.isArray(data.scopes) ? data.scopes : []
    })

  $scope.getScopeCategories()

}
