'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $cacheFactory, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.routes = []

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/action?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.actions = data.entry
      })
  }

  $scope.loadRoutes = function () {
    $http.get(fusio.baseUrl + 'backend/routes')
      .then(function (response) {
        var data = response.data
        $scope.routes = data.entry
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/action?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.actions = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/action?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.actions = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/action/create.html',
      controller: 'ActionCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (action) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/action/update.html',
      controller: 'ActionUpdateCtrl',
      resolve: {
        action: function () {
          return action
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (action) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/action/delete.html',
      controller: 'ActionDeleteCtrl',
      resolve: {
        action: function () {
          return action
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()
  $scope.loadRoutes()
}
