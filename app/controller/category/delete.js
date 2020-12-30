'use strict'

module.exports = function ($scope, $http, $uibModalInstance, category, fusio) {
  $scope.category = category

  $scope.delete = function (category) {
    $http.delete(fusio.baseUrl + 'backend/category/' + category.id)
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
