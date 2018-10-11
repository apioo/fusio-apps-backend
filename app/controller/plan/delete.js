'use strict';

module.exports = function($scope, $http, $uibModalInstance, fusio, plan) {

  $scope.plan = plan;

  $scope.delete = function(plan) {
    $http.delete(fusio.baseUrl + 'backend/plan/' + plan.id)
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
