'use strict';

module.exports = function($scope, $http, $uibModalInstance, $uibModal, fusio, event) {

  $scope.event = event;

  $scope.update = function(event) {
    var data = angular.copy(event);

    $http.put(fusio.baseUrl + 'backend/event/' + event.id, data)
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

  $http.get(fusio.baseUrl + 'backend/event/' + event.id)
    .then(function(response) {
      var data = response.data;
      if (!angular.isString(data.source)) {
        data.source = JSON.stringify(data.source, null, 4);
      }

      $scope.event = data;
    });

};
