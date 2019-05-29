'use strict';

module.exports = function($scope, $http, $uibModal, $routeParams, $location, fusio) {

  $scope.response = null;
  $scope.search = '';
  $scope.invoices = [];

  $scope.load = function() {
    var search = encodeURIComponent($scope.search ? $scope.search : '');

    $http.get(fusio.baseUrl + 'backend/plan/invoice?search=' + search)
      .then(function(response) {
        var data = response.data;
        $scope.totalResults = data.totalResults;
        $scope.startIndex = 0;
        $scope.invoices = data.entry;
      });
  };

  $scope.pageChanged = function() {
    var startIndex = ($scope.startIndex - 1) * 16;
    var search = encodeURIComponent($scope.search ? $scope.search : '');

    $http.get(fusio.baseUrl + 'backend/plan/invoice?startIndex=' + startIndex + '&search=' + search)
      .then(function(response) {
        var data = response.data;
        $scope.totalResults = data.totalResults;
        $scope.invoices = data.entry;
      });
  };

  $scope.doSearch = function(search) {
    $http.get(fusio.baseUrl + 'backend/plan/invoice?search=' + encodeURIComponent(search ? search : ''))
      .then(function(response) {
        var data = response.data;
        $scope.totalResults = data.totalResults;
        $scope.startIndex = 0;
        $scope.invoices = data.entry;
      });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

  $scope.load();

};
