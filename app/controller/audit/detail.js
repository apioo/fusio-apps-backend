'use strict'

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, fusio, audit) {
  $scope.audit = audit

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $http.get(fusio.baseUrl + 'backend/audit/' + audit.id)
    .then(function (response) {
      $scope.audit = response.data
    })
}
