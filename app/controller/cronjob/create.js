'use strict';

module.exports = function($scope, $http, $uibModalInstance, fusio) {

  $scope.cronjob = {
    name: '',
    cron: ''
  };

  $scope.actions = [];

  $scope.create = function(cronjob) {
    var data = angular.copy(cronjob);

    $http.post(fusio.baseUrl + 'backend/cronjob', data)
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

};
