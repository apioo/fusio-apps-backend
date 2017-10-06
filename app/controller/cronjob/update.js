'use strict';

module.exports = function($scope, $http, $uibModalInstance, fusio, cronjob) {

  $scope.cronjob = cronjob;

  $scope.actions = [];

  $scope.update = function(scope) {
    var data = angular.copy(scope);

    $http.put(fusio.baseUrl + 'backend/cronjob/' + cronjob.id, data)
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

  $http.get(fusio.baseUrl + 'backend/action')
    .then(function(response) {
      $scope.actions = response.data.entry;
    });

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

  $http.get(fusio.baseUrl + 'backend/cronjob/' + cronjob.id)
    .then(function(response) {
      $scope.cronjob = response.data;
    });

};
