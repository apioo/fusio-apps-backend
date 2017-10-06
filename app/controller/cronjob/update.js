'use strict';

module.exports = function($scope, $http, $uibModal, $uibModalInstance, fusio, cronjob) {

  $scope.cronjob = cronjob;

  $scope.actions = [];

  $scope.update = function(cronjob) {
    var data = angular.copy(cronjob);

    if (data.exitCode) {
      delete data.exitCode;
    }
    if (data.executeDate) {
      delete data.executeDate;
    }
    if (data.errors) {
      delete data.errors;
    }

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

  $scope.showAction = function(actionId) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/action/update.html',
      controller: 'ActionUpdateCtrl',
      resolve: {
        action: function() {
          return {id: actionId};
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
