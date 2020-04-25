'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $location, $cacheFactory, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.schema = null
  $scope.schemas = []

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/schema?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.schemas = data.entry

        if (!$routeParams.schema_id && $scope.schemas[0].id) {
          // redirect in case we are on the first page without id
          $location.path('/schema/' + $scope.schemas[0].id);
        }
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/schema?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.schemas = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/schema?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.schemas = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/schema/create.html',
      controller: 'SchemaCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 1);
        $location.path('/schema');
      }
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (schema) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/schema/update.html',
      controller: 'SchemaUpdateCtrl',
      resolve: {
        schema: function () {
          return schema
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 2);
        $location.path('/schema/' + schema.id);
      }
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (schema) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/schema/delete.html',
      controller: 'SchemaDeleteCtrl',
      resolve: {
        schema: function () {
          return schema
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 3);
        $location.path('/schema');
      }
    }, function () {
    })
  }

  $scope.openUIDialog = function (schema) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/schema/ui.html',
      controller: 'SchemaUpdateCtrl',
      resolve: {
        schema: function () {
          return schema
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 2);
        $location.path('/schema/' + schema.id);
      }
    }, function () {
    })
  }

  $scope.generatePreview = function (schemaId) {
    $http.post(fusio.baseUrl + 'backend/schema/preview/' + schemaId, null)
      .then(function (response) {
        var data = response.data
        $scope.schema.preview = data.preview.replace(/href="#([A-z0-9_]+)"/g, 'href="#!/schema/' + schemaId + '"')
      })
  }

  $scope.showDetail = function (schemaId) {
    $http.get(fusio.baseUrl + 'backend/schema/' + schemaId)
      .then(function (response) {
        $scope.schema = response.data
        $scope.generatePreview(schemaId);
      })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()

  if ($routeParams.schema_id) {
    $scope.showDetail($routeParams.schema_id)
  }

  if ($routeParams.success) {
    var message
    if ($routeParams.success === 2) {
      message = 'Schema successful updated'
    } else if ($routeParams.success === 3) {
      message = 'Schema successful deleted'
    } else {
      message = 'Schema successful created'
    }
    $scope.response = {
      success: true,
      message: message
    }
  }
}
