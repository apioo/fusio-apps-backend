'use strict'

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, fusio, route) {
  $scope.route = route
  $scope.logs = {}

  $scope.loadLogs = function () {
    $http.get(fusio.baseUrl + 'backend/log?routeId=' + route.id)
      .then(function (response) {
        $scope.logs = response.data.entry
      })
  }

  $scope.openDetailDialog = function (log) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/log/detail.html',
      controller: 'LogDetailCtrl',
      resolve: {
        log: function () {
          return log
        }
      }
    })

    modalInstance.result.then(function (response) {
      $scope.load()
    }, function () {
    })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.loadLogs();
}
