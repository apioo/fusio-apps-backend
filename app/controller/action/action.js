'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $location, $cacheFactory, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.action = null
  $scope.actions = []

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/action?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.actions = data.entry

        if (!$routeParams.action_id && $scope.actions[0].id) {
          // redirect in case we are on the first page without id
          $location.path('/action/' + $scope.actions[0].id);
        }
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
      if (response.success) {
        $location.search('success', 1);
        $location.path('/action');
      }
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
      if (response.success) {
        $location.search('success', 2);
        $location.path('/action/' + action.id);
      }
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
      if (response.success) {
        $location.search('success', 3);
        $location.path('/action');
      }
    }, function () {
    })
  }

  $scope.showDetail = function (actionId) {
    $http.get(fusio.baseUrl + 'backend/action/' + actionId)
      .then(function (response) {
        var action = response.data;
        action.config = JSON.stringify(action.config, null, 2);
        $scope.action = action
      })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()

  if ($routeParams.action_id) {
    $scope.showDetail($routeParams.action_id)
  }

  if ($routeParams.success) {
    var message
    if ($routeParams.success === 2) {
      message = 'Action successful updated'
    } else if ($routeParams.success === 3) {
      message = 'Action successful deleted'
    } else {
      message = 'Action successful created'
    }
    $scope.response = {
      success: true,
      message: message
    }
  }
}
