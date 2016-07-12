// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'FBAngular', 'ngStorage', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('splash', {
    url: '/',
    templateUrl: 'templates/splash.html',
    controller: 'SplashCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('hoge', {
    url: '/hoge',
    templateUrl: 'templates/hoge.html',
    abstract: true
  })
  .state('hoge.main', {
    url: '/main',
    views: {
      hoge: {
        templateUrl: 'templates/hoge.main.html',
      }
    }
  })
  .state('hoge.map', {
    url: '/map',
    views: {
      map: {
        templateUrl: 'templates/hoge.map.html',
        controller: 'MapCtrl'
      }
    }
  })
  
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    abstract: true
  })
  .state('main.menu', {
    url: '/menu',
    views: {
      menu: {
        templateUrl: 'templates/main.menu.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('main.about', {
    url: '/about',
    views: {
      about: {
        templateUrl: 'templates/main.about.html'
      }
    }
  });

    
 
  $urlRouterProvider
  .when('/main', '/main/menu')  /// not working?
  .otherwise("/");
})