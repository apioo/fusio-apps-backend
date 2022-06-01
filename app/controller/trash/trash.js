'use strict'

module.exports = function ($scope, $http, $uibModal, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.types = []
  $scope.type = null
  $scope.entries = null

  $scope.load = function () {
    if (!$scope.type) {
      return;
    }

    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/trash/' + $scope.type + '?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.entries = data.entry
      })
  }

  $scope.pageChanged = function () {
    if (!$scope.type) {
      return;
    }

    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/trash/' + $scope.type + '?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.entries = data.entry
      })
  }

  $scope.doSearch = function (search) {
    if (!$scope.type) {
      return;
    }

    $http.get(fusio.baseUrl + 'backend/trash/' + $scope.type + '?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.entries = data.entry
      })
  }

  $scope.loadTypes = function () {
    $http.get(fusio.baseUrl + 'backend/trash')
      .then(function (response) {
        $scope.types = response.data.types
        $scope.type = $scope.types[0] || null
        $scope.load()
      })
  }

  $scope.restore = function(entry) {
    if (!$scope.type) {
      return;
    }

    $http.post(fusio.baseUrl + 'backend/trash/' + $scope.type + '?id=' + entry.id)
      .then(function (response) {
        $scope.response = response.data
        $scope.load()
      })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.loadTypes()
}
