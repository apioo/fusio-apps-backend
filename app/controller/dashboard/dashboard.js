'use strict';

module.exports = function($scope, $http, $uibModal, fusio) {

  // set initial date range
  var fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 9);
  var toDate = new Date();

  var query = '?from=' + fromDate.toISOString() + '&to=' + toDate.toISOString();

  $http.get(fusio.baseUrl + 'backend/dashboard' + query)
    .then(function(response) {
      $scope.incomingRequests = response.data.incomingRequests;
      $scope.mostUsedRoutes = response.data.mostUsedRoutes;
      $scope.timePerRoute = response.data.timePerRoute;
      $scope.latestRequests = response.data.latestRequests.entry;
      $scope.latestApps = response.data.latestApps.entry;
      $scope.errorsPerRoute = response.data.errorsPerRoute;
    });

};
