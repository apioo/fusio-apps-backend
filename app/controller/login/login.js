'use strict'

module.exports = function ($scope, $http, $location, $window, $rootScope, fusio, tokenParser) {
  $scope.credentials = {
    username: '',
    password: ''
  }

  $scope.response = null
  $scope.loading = false

  $scope.login = function (credentials) {
    $scope.loading = true

    var req = {
      method: 'POST',
      url: fusio.baseUrl + 'authorization/token',
      headers: {
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials'
    }

    $http(req)
      .then(function (response) {
        var data = response.data
        $scope.loading = false
        if (data.access_token) {
          var user = tokenParser.decode(data.access_token)
          if (user) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token

            // store access token
            $window.sessionStorage.setItem('fusio_access_token', data.access_token)
            $window.sessionStorage.setItem('fusio_scope', data.scope)

            $rootScope.userAuthenticated = true
            $rootScope.user = user

            $rootScope.buildNavigation(data.scope)

            // redirect to first menu entry
            let firstPath = $rootScope.nav[0].children[0].path
            if (firstPath) {
              $location.path(firstPath)
            }
          } else {
            $scope.response = 'Could not decode access token'
          }
        } else {
          $scope.response = data.error_description ? data.error_description : 'Authentication failed'
        }
      })
      .catch(function (response) {
        var data = response.data
        $scope.loading = false
        $scope.response = data.error_description ? data.error_description : 'Authentication failed'
      })
  }
}
