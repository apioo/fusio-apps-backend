'use strict';

module.exports = function($scope, $http, $uibModal, $uibModalInstance, fusio, error) {

  $scope.error = error;

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

};
