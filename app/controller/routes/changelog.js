'use strict'

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, fusio, changelog) {
  $scope.changelog = changelog

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

}
