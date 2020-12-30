'use strict'

module.exports = function ($scope, $http, $uibModalInstance, role, fusio) {
  $scope.role = role

  $scope.delete = function (role) {
    $http.delete(fusio.baseUrl + 'backend/role/' + role.id)
      .then(function (response) {
        var data = response.data
        $scope.response = data
        if (data.success === true) {
          $uibModalInstance.close(data)
        }
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }
}
