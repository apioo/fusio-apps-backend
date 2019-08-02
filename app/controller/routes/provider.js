'use strict'

var angular = require('angular')

module.exports = function ($scope, $http, $uibModal, $uibModalInstance, $timeout, formBuilder, fusio) {
  $scope.route = {
    path: '',
    scopes: [],
    config: []
  }

  $scope.provider = null
  $scope.providers = []
  $scope.config = {}
  $scope.changelog = []

  $scope.create = function (route) {
    var data = angular.copy(route)
    var i

    if (angular.isArray(data.scopes)) {
      var scopes = []
      for (i = 0; i < data.scopes.length; i++) {
        scopes.push(data.scopes[i].text)
      }
      data.scopes = scopes
    }

    if (angular.isObject($scope.config)) {
      data.config = formBuilder.postProcessModel($scope.config, $scope.elements)
    }

    $http.post(fusio.baseUrl + 'backend/routes/provider/' + $scope.provider, data)
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

  $http.get(fusio.baseUrl + 'backend/routes/provider')
      .then(function (response) {
        var data = response.data;
        $scope.providers = data.providers

        if (data.providers[0]) {
          $scope.provider = data.providers[0].class
          $scope.loadConfig()
        }
      })

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }

  $scope.loadConfig = function () {
    if ($scope.provider) {
      $http.get(fusio.baseUrl + 'backend/routes/provider/' + $scope.provider)
          .then(function (response) {
            var data = response.data
            var containerEl = angular.element(document.querySelector('#config-form'))
            containerEl.children().remove()

            $scope.elements = data.form.element
            $scope.config = formBuilder.preProcessModel($scope.route.config, $scope.elements)
            var linkFn = formBuilder.buildHtml($scope.elements, 'config')
            if (angular.isFunction(linkFn)) {
              var el = linkFn($scope)
              containerEl.append(el)
            }

            $scope.changelog = data.changelog;
          })
    }
  }

  $scope.showChangelog = function (changelog) {
    var modalInstance = $uibModal.open({
      size: 'lg',
      backdrop: 'static',
      templateUrl: 'app/controller/routes/changelog.html',
      controller: 'RoutesChangelogCtrl',
      resolve: {
        changelog: changelog
      }
    })
  }

}
