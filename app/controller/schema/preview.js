'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, $uibModal, fusio, schema) {
  $scope.loadPreview = function (schemaId) {
    $http.post(fusio.baseUrl + 'backend/schema/preview/' + schemaId, null)
      .then(function (response) {
        var data = response.data
        data.preview = data.preview.replace(/href="#([A-z0-9_]+)"/g, 'href="#" onclick="return false;"')
        $scope.response = data
      })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.loadPreview(schema.id)
}
