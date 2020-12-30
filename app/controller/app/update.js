'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, $timeout, app, fusio) {
  $scope.app = app

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

  $scope.update = function (app) {
    var data = angular.copy(app)
    data.scopes = $scope.selected

    // remove tokens
    if (data.tokens) {
      delete data.tokens
    }

    $http.put(fusio.baseUrl + 'backend/app/' + app.id, data)
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

  $scope.loadApp = function () {
    $http.get(fusio.baseUrl + 'backend/app/' + app.id)
      .then(function (response) {
        $scope.app = response.data
        $scope.selected = response.data.scopes
      })
  }

  $scope.openDetailDialog = function (token) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/token/detail.html',
      controller: 'TokenDetailCtrl',
      resolve: {
        token: function () {
          return token
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()

      $timeout(function () {
        $scope.response = null
      }, 2000)
    }, function () {
    })
  }

  $scope.getScopeCategories = function () {
    $http.get(fusio.baseUrl + 'backend/scope/categories')
        .then(function (response) {
          $scope.categories = response.data.categories
        })
  }

  $scope.loadApp()
  $scope.getScopeCategories()
}
