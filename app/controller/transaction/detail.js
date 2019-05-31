'use strict'

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, fusio, transaction) {
  $scope.transaction = transaction

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $http.get(fusio.baseUrl + 'backend/transaction/' + transaction.id)
    .then(function (response) {
      $scope.transaction = response.data
    })
}
