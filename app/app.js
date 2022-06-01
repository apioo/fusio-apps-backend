'use strict'

var angular = require('angular')
var fusioApp = angular.module('fusioApp', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'ngTagsInput',
  'ui.bootstrap',
  'ui.ace',
  'chart.js',
  'ng-showdown',
  'angular-loading-bar',
  'fusioApp.account',
  'fusioApp.action',
  'fusioApp.app',
  'fusioApp.audit',
  'fusioApp.category',
  'fusioApp.config',
  'fusioApp.connection',
  'fusioApp.cronjob',
  'fusioApp.dashboard',
  'fusioApp.error',
  'fusioApp.event',
  'fusioApp.log',
  'fusioApp.login',
  'fusioApp.logout',
  'fusioApp.marketplace',
  'fusioApp.page',
  'fusioApp.plan',
  'fusioApp.rate',
  'fusioApp.role',
  'fusioApp.routes',
  'fusioApp.schema',
  'fusioApp.scope',
  'fusioApp.sdk',
  'fusioApp.statistic',
  'fusioApp.subscription',
  'fusioApp.token',
  'fusioApp.transaction',
  'fusioApp.trash',
  'fusioApp.user'
])

require('angular-route')
require('angular-sanitize')
require('angular-animate')
require('angular-ui-bootstrap')
require('angular-ui-ace')
require('angular-chart.js')
require('angular-loading-bar')
require('ng-tags-input')
require('ng-showdown')
require('./controller/account')
require('./controller/action')
require('./controller/app')
require('./controller/audit')
require('./controller/category')
require('./controller/config')
require('./controller/connection')
require('./controller/cronjob')
require('./controller/dashboard')
require('./controller/error')
require('./controller/event')
require('./controller/log')
require('./controller/login')
require('./controller/logout')
require('./controller/marketplace')
require('./controller/page')
require('./controller/plan')
require('./controller/rate')
require('./controller/role')
require('./controller/routes')
require('./controller/schema')
require('./controller/scope')
require('./controller/sdk')
require('./controller/statistic')
require('./controller/subscription')
require('./controller/token')
require('./controller/transaction')
require('./controller/trash')
require('./controller/user')

fusioApp.value('version', require('../package.json').version)
fusioApp.value('navigation', require('../navigation.json'))

fusioApp.factory('formBuilder', require('./service/form_builder'))
fusioApp.factory('helpLoader', require('./service/help_loader'))
fusioApp.factory('tokenParser', require('./service/token_parser'))

fusioApp.provider('fusio', function () {
  var baseUrl = null

  this.setBaseUrl = function (_baseUrl) {
    baseUrl = _baseUrl
  }

  /**
   * Simple helper function to guess the API endpoint url
   */
  this.guessFusioEndpointUrl = function (urlRewrite) {
    var url = window.location.href
    var pos = url.lastIndexOf('/fusio')
    if (pos !== -1) {
      url = url.substring(0, pos)
    }
    return url + (urlRewrite ? '/' : '/index.php/')
  }

  this.$get = function () {
    // BC workaround if the base url was not configured but the fusio_url is
    // available we use it else we guess the url
    if (baseUrl === null && typeof fusio_url !== 'undefined') {
      baseUrl = fusio_url
    } else if (baseUrl === null) {
      baseUrl = this.guessFusioEndpointUrl(false)
    }

    return {
      baseUrl: baseUrl
    }
  }
})

fusioApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/dashboard'
  })
}])

fusioApp.config(['$showdownProvider', function ($showdownProvider) {
}])

fusioApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeBar = false
  cfpLoadingBarProvider.includeSpinner = true
  cfpLoadingBarProvider.parentSelector = '.fusio-loading-container'
}])

fusioApp.run(function ($rootScope, $window, $location, $http, helpLoader, version, navigation, tokenParser) {
  $rootScope.changeNavHeading = function (item) {
    if (!angular.isArray($rootScope.nav)) {
      return;
    }

    for (let i = 0; i < $rootScope.nav.length; i++) {
      $rootScope.nav[i].visible = $rootScope.nav[i].title === item.title
    }
  }

  $rootScope.buildNavigation = function (scope) {
    let scopes = []
    if (angular.isString(scope)) {
      scopes = scope.split(',')
    }

    if (!angular.isArray(navigation)) {
      return;
    }

    let nav = navigation;
    nav.forEach((category) => {
      category.children = category.children.filter((item) => {
        return scopes.includes(item.scope)
      })
    })

    nav = nav.filter((category) => {
      return category.children.length > 0
    })

    $rootScope.nav = nav
  }

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (!angular.isArray($rootScope.nav)) {
      return;
    }

    var path = next.$$route ? next.$$route.originalPath : ''

    // mark current panel as visible
    for (var i = 0; i < $rootScope.nav.length; i++) {
      var found = false
      for (var j = 0; j < $rootScope.nav[i].children.length; j++) {
        var navPath = $rootScope.nav[i].children[j].path
        if (navPath === path.substr(0, navPath.length)) {
          found = true
          break
        }
      }
      $rootScope.nav[i].visible = found
    }
  })

  // user dropdown menu
  $rootScope.menu = [{
    title: 'Change password',
    path: '/account/change_password'
  }, {
    title: 'Logout',
    path: '/logout'
  }]

  // make help loader global available
  $rootScope.help = helpLoader

  // set version
  $rootScope.version = version

  // check auth
  let token = $window.sessionStorage.getItem('fusio_access_token')
  let scope = $window.sessionStorage.getItem('fusio_scope')
  if (token) {
    let user = tokenParser.decode(token)
    if (user) {
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + token

      $rootScope.userAuthenticated = true
      $rootScope.user = user

      $rootScope.buildNavigation(scope)
    } else {
      $location.path('/login')
    }
  } else {
    $location.path('/login')
  }
})

if (window) {
  window.fusioApp = fusioApp
}

module.exports = fusioApp
