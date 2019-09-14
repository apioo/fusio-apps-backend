'use strict'

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, fusio, provider, config) {
  $scope.provider = provider
  $scope.config = config
  $scope.changelog = {}

  $scope.loadChangelog = function () {
    $http.put(fusio.baseUrl + 'backend/routes/provider/' + $scope.provider, $scope.config)
        .then(function (response) {
          $scope.changelog = response.data
        })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.loadChangelog();
}
