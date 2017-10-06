'use strict';

module.exports = function($scope, $http, $uibModal, $uibModalInstance, fusio, cronjob) {

  $scope.cronjob = cronjob;

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.openDetailDialog = function(error) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/cronjob/error/detail.html',
      controller: 'CronjobErrorDetailCtrl',
      resolve: {
        error: function() {
          return error;
        }
      }
    });

    modalInstance.result.then(function(response) {
    }, function() {
    });
  };

  $http.get(fusio.baseUrl + 'backend/cronjob/' + cronjob.id)
    .then(function(response) {
      $scope.cronjob = response.data;
    });

};
