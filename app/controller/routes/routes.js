'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $route, $timeout, $cacheFactory, $location, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.route = null

  $scope.indexVersion = -1

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/routes?search=' + search, {cache: true})
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.routes = data.entry

        if (!$routeParams.route_id && $scope.routes[0].id) {
          // redirect in case we are on the first page without id
          $location.path('/routes/' + $scope.routes[0].id);
        }
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/routes?startIndex=' + startIndex + '&search=' + search, {cache: true})
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.routes = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/routes?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.routes = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/routes/create.html',
      controller: 'RoutesCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 1);
        $location.path('/routes');
      }
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (route) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/routes/update.html',
      controller: 'RoutesUpdateCtrl',
      resolve: {
        route: function () {
          return route
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.response = response
      if (response.success) {
        $location.search('success', 2);
        $location.path('/routes/' + route.id);
      }
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (route) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/routes/delete.html',
      controller: 'RoutesDeleteCtrl',
      resolve: {
        route: function () {
          return route
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 3);
        $location.path('/routes');
      }
    }, function () {
    })
  }

  $scope.openProviderDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/routes/provider.html',
      controller: 'RoutesProviderCtrl'
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      $scope.load()
    }, function () {
    })
  }

  $scope.showDetail = function (routeId) {
    $scope.indexVersion = -1

    $http.get(fusio.baseUrl + 'backend/routes/' + routeId)
      .then(function (response) {
        $scope.route = response.data

        $timeout(function () {
          var indexVersion = -1
          if ($scope.route.config.length > 0) {
            for (var i = 0; i < $scope.route.config.length; i++) {
              indexVersion++
            }
          }

          $scope.indexVersion = indexVersion
        })
      })
  }

  $scope.showShema = function (schemaId) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/schema/update.html',
      controller: 'SchemaUpdateCtrl',
      resolve: {
        schema: function () {
          return { id: schemaId }
        }
      }
    })

    modalInstance.result.then(function (response) {
    }, function () {
    })
  }

  $scope.showPreview = function (schemaId) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/schema/preview.html',
      controller: 'SchemaPreviewCtrl',
      resolve: {
        schema: function () {
          return { id: schemaId }
        }
      }
    })

    modalInstance.result.then(function (response) {
    }, function () {
    })
  }

  $scope.showAction = function (actionId) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/action/update.html',
      controller: 'ActionUpdateCtrl',
      resolve: {
        action: function () {
          return { id: actionId }
        }
      }
    })

    modalInstance.result.then(function (response) {
    }, function () {
    })
  }

  $scope.showLogs = function (route) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/routes/log.html',
      controller: 'RoutesLogCtrl',
      resolve: {
        route: function () {
          return route
        }
      }
    })

    modalInstance.result.then(function (response) {
    }, function () {
    })
  }

  $scope.closeResponse = function () {
    $scope.response = null
    if ($routeParams.success) {
      $location.search('success', null)
    }
  }

  $scope.normalizeBaseUrl = function (url) {
    if (url.charAt(url.length - 1) === '/') {
      return url.substr(0, url.length - 1);
    }

    return url;
  }

  $scope.baseUrl = $scope.normalizeBaseUrl(fusio.baseUrl)
  $scope.load()

  if ($routeParams.route_id) {
    $scope.showDetail($routeParams.route_id)
  }

  if ($routeParams.success) {
    var message
    if ($routeParams.success === 2) {
      message = 'Route successful updated'
    } else if ($routeParams.success === 3) {
      message = 'Route successful deleted'
    } else {
      message = 'Route successful created'
    }
    $scope.response = {
      success: true,
      message: message
    }
  }
}
