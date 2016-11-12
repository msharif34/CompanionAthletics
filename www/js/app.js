
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
          controller: 'NewsCtrl'
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

.run(function($ionicPlatform, $state, $window, $firebaseAuth, $log) {
  $ionicPlatform.ready(function(FURL) {
    var auth = $firebaseAuth();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var checkUser = function () {
      var firebaseUser = auth.$getAuth();

      if (firebaseUser) {
        $log.log("Signed in as:", firebaseUser.uid);
        userStatus(firebaseUser);
        $state.go("tab.games");
      } else {
        $log.log("Signed out");
        userStatus(firebaseUser);
        $state.go("login");
      }
  }

    function userStatus(user) {
    if (user) {
      console.log('user logged in');
      // return $window.localStorage.userOnline = true;
    }else{
      console.log('user logged out');
      // return $window.localStorage.userOnline = false;
    }
  }

    checkUser();
    // isOnline(currentUser);

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
