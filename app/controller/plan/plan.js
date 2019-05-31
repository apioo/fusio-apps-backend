'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $location, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.plans = []

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/plan?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.plans = data.entry
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/plan?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.plans = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/plan?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.plans = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/plan/create.html',
      controller: 'PlanCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (plan) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/plan/update.html',
      controller: 'PlanUpdateCtrl',
      resolve: {
        plan: function () {
          return plan
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (plan) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/plan/delete.html',
      controller: 'PlanDeleteCtrl',
      resolve: {
        plan: function () {
          return plan
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
