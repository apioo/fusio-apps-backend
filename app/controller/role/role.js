'use strict'

module.exports = function ($scope, $http, $uibModal, fusio) {
  $scope.response = null
  $scope.search = ''

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/role?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.roles = data.entry
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/role?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.roles = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/role?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.roles = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/role/create.html',
      controller: 'RoleCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (role) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/role/update.html',
      controller: 'RoleUpdateCtrl',
      resolve: {
        role: function () {
          return role
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (role) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/role/delete.html',
      controller: 'RoleDeleteCtrl',
      resolve: {
        role: function () {
          return role
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
