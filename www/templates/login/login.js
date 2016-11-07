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
      console.log('user logged in');
      return $window.localStorage.userOnline = true;
    }else{
      console.log('user logged out');
      return $window.localStorage.userOnline = false;
    }
  }
  $scope.signInfb = function () {
    var provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope('user_birthday');

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log(user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      console.log("error occurred: " + error)
    });
  }
});
