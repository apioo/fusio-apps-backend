'use strict';

module.exports = function($scope, $http, $uibModalInstance, fusio, cronjob) {

  $scope.cronjob = cronjob;

  $scope.delete = function(cronjob) {
    $http.delete(fusio.baseUrl + 'backend/cronjob/' + cronjob.id)
      .then(function(response) {
        var data = response.data;
        $scope.response = data;
        if (data.success === true) {
          $uibModalInstance.close(data);
        }
      })
      .catch(function(response) {
        $scope.response = response.data;
      });
  };

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

};
