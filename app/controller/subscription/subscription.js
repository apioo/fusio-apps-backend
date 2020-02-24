'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $location, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.subscriptions = []

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/event/subscription?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.subscriptions = data.entry
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/event/subscription?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.subscriptions = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/event/subscription?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.subscriptions = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/subscription/create.html',
      controller: 'SubscriptionCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (subscription) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/subscription/update.html',
      controller: 'SubscriptionUpdateCtrl',
      resolve: {
        subscription: function () {
          return subscription
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (subscription) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/subscription/delete.html',
      controller: 'SubscriptionDeleteCtrl',
      resolve: {
        subscription: function () {
          return subscription
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()
}
