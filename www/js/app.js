
'Use Strict';
angular.module('starter', ['ionic','ngStorage', 'starter.controllers', 'ngCordova','firebase', 'pascalprecht.translate','ngMessages', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider, $translateProvider, $translateStaticFilesLoaderProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

$translateProvider.preferredLanguage('en');
$translateProvider.useSanitizeValueStrategy('sanitize');
$translateProvider.fallbackLanguage("en");

$translateProvider.useStaticFilesLoader({
        prefix: 'langs/lang-',
        suffix: '.json'
      });
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.games', {
    url: '/games',
    views: {
      'tab-games': {
        templateUrl: 'templates/tab-games.html',
        controller: 'GamesCtrl'
      }
    }
  })

  .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('tab.videos', {
      url: '/videos',
      views: {
        'tab-videos': {
          templateUrl: 'templates/tab-videos.html',
          controller: 'VideosCtrl'
        }
      }
    })

  .state('tab.standings', {
    url: '/standings',
    views: {
      'tab-standings': {
        templateUrl: 'templates/tab-standings.html',
        controller: 'StandingsCtrl'
      }
    }
  })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/tab-login.html',
      controller: 'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'templates/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register/register.html',
      controller:'registerController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home/home.html',
      controller:'homeController'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/news');

})
// Changue this for your Firebase App URL.
.constant('FURL', {
    apiKey: "AIzaSyB_F30hbOA2go6CG5Tusqt7N9RSq8aw6os",
    authDomain: "ca-app-6597a.firebaseapp.com",
    databaseURL: "https://ca-app-6597a.firebaseio.com",
    storageBucket: "ca-app-6597a.appspot.com"
})

.run(function($ionicPlatform, $state, $window, $firebaseAuth, $log, $rootScope) {
  $ionicPlatform.ready(function(FURL) {
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.filter('unsafe', function($sce, $ionicLoading) {
  $ionicLoading.hide();
  return $sce.trustAsHtml;
})
.filter('timeFormat', function(time) {
  var date = new Date(time)
  return date;
});
