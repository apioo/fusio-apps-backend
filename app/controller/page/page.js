'use strict'

module.exports = function ($scope, $http, $uibModal, $routeParams, $location, $cacheFactory, fusio) {
  $scope.response = null
  $scope.search = ''
  $scope.page = null
  $scope.pages = []

  $scope.load = function () {
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/page?search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.pages = data.entry

        if (!$routeParams.page_id && $scope.pages[0].id) {
          // redirect in case we are on the first page without id
          $location.path('/page/' + $scope.pages[0].id);
        }
      })
  }

  $scope.pageChanged = function () {
    var startIndex = ($scope.startIndex - 1) * 16
    var search = encodeURIComponent($scope.search ? $scope.search : '')

    $http.get(fusio.baseUrl + 'backend/page?startIndex=' + startIndex + '&search=' + search)
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.pages = data.entry
      })
  }

  $scope.doSearch = function (search) {
    $http.get(fusio.baseUrl + 'backend/page?search=' + encodeURIComponent(search || ''))
      .then(function (response) {
        var data = response.data
        $scope.totalResults = data.totalResults
        $scope.startIndex = 0
        $scope.pages = data.entry
      })
  }

  $scope.openCreateDialog = function () {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/page/create.html',
      controller: 'PageCreateCtrl'
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 1);
        $location.path('/page');
      }
    }, function () {
    })
  }

  $scope.openUpdateDialog = function (page) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/page/update.html',
      controller: 'PageUpdateCtrl',
      resolve: {
        page: function () {
          return page
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 2);
        $location.path('/page/' + page.id);
      }
    }, function () {
    })
  }

  $scope.openDeleteDialog = function (page) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/page/delete.html',
      controller: 'PageDeleteCtrl',
      resolve: {
        page: function () {
          return page
        }
      }
    })

    modalInstance.result.then(function (response) {
      $cacheFactory.get('$http').removeAll();

      $scope.response = response
      if (response.success) {
        $location.search('success', 3);
        $location.path('/page');
      }
    }, function () {
    })
  }

  $scope.showDetail = function (pageId) {
    $http.get(fusio.baseUrl + 'backend/page/' + pageId)
      .then(function (response) {
        $scope.page = response.data;
      })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.load()

  if ($routeParams.page_id) {
    $scope.showDetail($routeParams.page_id)
  }

  if ($routeParams.success) {
    var message
    if ($routeParams.success === 2) {
      message = 'Page successful updated'
    } else if ($routeParams.success === 3) {
      message = 'Page successful deleted'
    } else {
      message = 'Page successful created'
    }
    $scope.response = {
      success: true,
      message: message
    }
  }
}
