'use strict'

module.exports = function ($scope, $http, $uibModal, fusio) {
  // set initial date range
  var fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - 9)
  var toDate = new Date()

  var query = '?from=' + fromDate.toISOString() + '&to=' + toDate.toISOString()

  $http.get(fusio.baseUrl + 'backend/dashboard' + query)
    .then(function (response) {
      $scope.errorsPerRoute = response.data.errorsPerRoute
      $scope.incomingRequests = response.data.incomingRequests
      $scope.incomingTransactions = response.data.incomingTransactions
      $scope.latestApps = response.data.latestApps.entry
      $scope.latestRequests = response.data.latestRequests.entry
      $scope.latestTransactions = response.data.latestTransactions.entry
      $scope.latestUsers = response.data.latestUsers.entry
      $scope.mostUsedRoutes = response.data.mostUsedRoutes
      $scope.timePerRoute = response.data.timePerRoute
    })
}
