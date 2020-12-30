'use strict'

module.exports = function ($scope, $http, $uibModal, fusio) {
  $scope.response = null
  $scope.search = ''

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/category?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.categories = data.entry
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/category?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.categories = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/category?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.categories = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/category/create.html',
      controller: 'CategoryCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (category) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/category/update.html',
      controller: 'CategoryUpdateCtrl',
      resolve: {
        category: function () {
          return category
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (category) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/category/delete.html',
      controller: 'CategoryDeleteCtrl',
      resolve: {
        category: function () {
          return category
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
