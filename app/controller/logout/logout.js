'use strict'

module.exports = function ($scope, $http, $location, $window, $rootScope, $cacheFactory, fusio) {
  var removeToken = function (response) {
    delete $http.defaults.headers.common['Authorization']

    $window.sessionStorage.removeItem('fusio_access_token')
    $window.sessionStorage.removeItem('fusio_scope')

    $rootScope.userAuthenticated = false
    $rootScope.user = null
    $rootScope.nav = null

    $cacheFactory.get('$http').removeAll();

    $location.path('/login')
  }

  $http.post(fusio.baseUrl + 'authorization/revoke', null)
    .then(removeToken)
    .catch(removeToken)
}
