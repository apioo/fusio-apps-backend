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
  'hljs',
  'angular-loading-bar',
  'fusioApp.account',
  'fusioApp.action',
  'fusioApp.app',
  'fusioApp.audit',
  'fusioApp.config',
  'fusioApp.connection',
  'fusioApp.contract',
  'fusioApp.cronjob',
  'fusioApp.dashboard',
  'fusioApp.error',
  'fusioApp.event',
  'fusioApp.import',
  'fusioApp.invoice',
  'fusioApp.log',
  'fusioApp.login',
  'fusioApp.logout',
  'fusioApp.marketplace',
  'fusioApp.plan',
  'fusioApp.rate',
  'fusioApp.routes',
  'fusioApp.schema',
  'fusioApp.scope',
  'fusioApp.sdk',
  'fusioApp.statistic',
  'fusioApp.subscription',
  'fusioApp.token',
  'fusioApp.transaction',
  'fusioApp.user'
])

require('angular-route')
require('angular-sanitize')
require('angular-animate')
require('angular-ui-bootstrap')
require('angular-ui-ace')
require('angular-chart.js')
require('angular-loading-bar')
require('angular-highlightjs')
require('ng-tags-input')
require('ng-showdown')
require('./controller/account')
require('./controller/action')
require('./controller/app')
require('./controller/audit')
require('./controller/config')
require('./controller/connection')
require('./controller/contract')
require('./controller/cronjob')
require('./controller/dashboard')
require('./controller/import')
require('./controller/invoice')
require('./controller/error')
require('./controller/event')
require('./controller/log')
require('./controller/login')
require('./controller/logout')
require('./controller/marketplace')
require('./controller/plan')
require('./controller/rate')
require('./controller/routes')
require('./controller/schema')
require('./controller/scope')
require('./controller/sdk')
require('./controller/statistic')
require('./controller/subscription')
require('./controller/token')
require('./controller/transaction')
require('./controller/user')

fusioApp.value('version', require('../package.json').version)

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

fusioApp.run(function ($rootScope, $window, $location, $http, helpLoader, version, tokenParser) {
  var token = $window.sessionStorage.getItem('fusio_access_token')
  if (token) {
    var user = tokenParser.decode(token)
    if (user) {
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + token

      $rootScope.user = user
      $rootScope.userAuthenticated = true
    } else {
      $location.path('/login')
    }
  } else {
    $location.path('/login')
  }

  $rootScope.changeNavHeading = function (item) {
    for (var i = 0; i < $rootScope.nav.length; i++) {
      $rootScope.nav[i].visible = $rootScope.nav[i].title === item.title
    }
  }

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    var path = next.$$route ? next.$$route.originalPath : ''

    // mark current panel as visible
    for (var i = 0; i < $rootScope.nav.length; i++) {
      var found = false
      for (var j = 0; j < $rootScope.nav[i].children.length; j++) {
        if ($rootScope.nav[i].children[j].path === path) {
          found = true
          break
        }
      }
      $rootScope.nav[i].visible = found
    }
  })

  // navigation
  $rootScope.nav = [{
    title: 'API',
    visible: true,
    children: [{
      title: 'Dashboard',
      icon: 'glyphicon-th',
      path: '/dashboard'
    }, {
      title: 'Routes',
      icon: 'glyphicon-road',
      path: '/routes'
    }, {
      title: 'Action',
      icon: 'glyphicon-transfer',
      path: '/action'
    }, {
      title: 'Schema',
      icon: 'glyphicon-list-alt',
      path: '/schema'
    }, {
      title: 'Connection',
      icon: 'glyphicon-log-in',
      path: '/connection'
    }]
  }, {
    title: 'Consumer',
    visible: false,
    children: [{
      title: 'App',
      icon: 'glyphicon-book',
      path: '/app'
    }, {
      title: 'Scope',
      icon: 'glyphicon-eye-open',
      path: '/scope'
    }, {
      title: 'User',
      icon: 'glyphicon-user',
      path: '/user'
    }, {
      title: 'Rate',
      icon: 'glyphicon-filter',
      path: '/rate'
    }, {
      title: 'SDK',
      icon: 'glyphicon-download',
      path: '/sdk'
    }, {
      title: 'Subscription',
      icon: 'glyphicon-fire',
      path: '/subscription'
    }]
  }, {
    title: 'Analytics',
    visible: false,
    children: [{
      title: 'Log',
      icon: 'glyphicon-briefcase',
      path: '/log'
    }, {
      title: 'Statistic',
      icon: 'glyphicon-stats',
      path: '/statistic'
    }, {
      title: 'Error',
      icon: 'glyphicon-bell',
      path: '/error'
    }, {
      title: 'Token',
      icon: 'glyphicon-map-marker',
      path: '/token'
    }]
  }, {
    title: 'Monetization',
    visible: false,
    children: [{
      title: 'Plan',
      icon: 'glyphicon-hdd',
      path: '/plan'
    }, {
      title: 'Contract',
      icon: 'glyphicon-file',
      path: '/contract'
    }, {
      title: 'Invoice',
      icon: 'glyphicon-envelope',
      path: '/invoice'
    }, {
      title: 'Transaction',
      icon: 'glyphicon-equalizer',
      path: '/transaction'
    }]
  }, {
    title: 'System',
    visible: false,
    children: [{
      title: 'Marketplace',
      icon: 'glyphicon-shopping-cart',
      path: '/marketplace'
    }, {
      title: 'Event',
      icon: 'glyphicon-retweet',
      path: '/event'
    }, {
      title: 'Cronjob',
      icon: 'glyphicon-time',
      path: '/cronjob'
    }, {
      title: 'Import',
      icon: 'glyphicon-import',
      path: '/import'
    }, {
      title: 'Settings',
      icon: 'glyphicon-cog',
      path: '/config'
    }, {
      title: 'Audit',
      icon: 'glyphicon-facetime-video',
      path: '/audit'
    }]
  }]

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
})

if (window) {
  window.fusioApp = fusioApp
}

module.exports = fusioApp
