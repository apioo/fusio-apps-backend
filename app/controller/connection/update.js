'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModalInstance, $window, fusio, formBuilder, helpLoader, connection) {
  $scope.connection = connection
  $scope.elements = []
  $scope.config = {}
  $scope.connections = []

  $scope.update = function (connection) {
    var data = angular.copy(connection)

    // cast every config value to string
    if (angular.isObject(data.config)) {
      data.config = formBuilder.postProcessModel($scope.config, $scope.elements)
    }

    $http.put(fusio.baseUrl + 'backend/connection/' + connection.id, data)
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

  $scope.authorize = function () {
    $http.get(fusio.baseUrl + 'backend/connection/' + connection.id + '/redirect')
      .then(function (response) {
        var data = response.data;
        if (data.redirectUri) {
          $window.location.href = data.redirectUri;
          return;
        }

        $scope.response = data
        if (data.success === true) {
          $uibModalInstance.close(data)
        }
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.loadConfig = function () {
    if ($scope.connection.class) {
      $http.get(fusio.baseUrl + 'backend/connection/form?class=' + encodeURIComponent($scope.connection.class))
        .then(function (response) {
          var data = response.data
          var containerEl = angular.element(document.querySelector('#config-form'))
          containerEl.children().remove()

          $scope.elements = data.element
          $scope.config = formBuilder.preProcessModel($scope.connection.config, $scope.elements)
          var linkFn = formBuilder.buildHtml($scope.elements, 'config')
          if (angular.isFunction(linkFn)) {
            var el = linkFn($scope)
            containerEl.append(el)
          }
        })
    }
  }

  $scope.showHelp = function () {
    var className = $scope.connection.class;
    if (className) {
      var connection = $scope.connections.find((connection) => {
        return connection.class === className;
      })

      if (connection.name) {
        helpLoader.showDialog('api/connection/' + connection.name.toLowerCase())
      }
    }
  }

  $http.get(fusio.baseUrl + 'backend/connection/' + connection.id)
    .then(function (response) {
      $scope.connection = response.data
      $scope.loadConfig()
    })
}
