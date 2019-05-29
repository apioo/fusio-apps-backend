'use strict';

module.exports = function($scope, $http, $uibModalInstance, $uibModal, fusio, plan) {

  $scope.plan = plan;

  $scope.periods = [{
    id: 0,
    name: 'None'
  }, {
    id: 1,
    name: '1 Month'
  }, {
    id: 2,
    name: '3 Month'
  }, {
    id: 3,
    name: '6 Month'
  }, {
    id: 4,
    name: '12 Month'
  }];

  $scope.update = function(plan) {
    var data = angular.copy(plan);

    $http.put(fusio.baseUrl + 'backend/plan/' + plan.id, data)
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

  $http.get(fusio.baseUrl + 'backend/plan/' + plan.id)
    .then(function(response) {
      var data = response.data;
      if (!angular.isString(data.source)) {
        data.source = JSON.stringify(data.source, null, 4);
      }

      $scope.plan = data;
    });

};
