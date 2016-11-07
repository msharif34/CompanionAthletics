'Use Strict';
angular.module('starter').controller('loginController', function ($scope, $window,$state,$cordovaOauth, $localStorage,$http,$ionicPopup,$firebaseAuth, $firebaseObject,$log, Auth, FURL, Utils) {
  console.log('login controller');
  var auth = $firebaseAuth();
  var ref = firebase.database().ref();
  var userkey = "";
  $scope.signIn = function (user) {
    $log.log("Enviado");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      
      $log.log("id del usuario:" + authData);
      Utils.hide();
      $state.go("tab.games");
      $log.log("Starter page","Home");

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  $scope.signInAnon = function () {
    $log.log("Enviado");
    Utils.show();
    auth.$signInAnonymously().then(function(firebaseUser) {
     console.log("Signed in as:", firebaseUser.uid);
     Utils.hide();
     $state.go("tab.games");
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
    
  };

  $scope.checkUser = function () {
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
      return $window.localStorage.userOnline = true;
    }else{
      return $window.localStorage.userOnline = false;
    }
  }
});
