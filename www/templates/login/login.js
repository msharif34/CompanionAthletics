'Use Strict';
angular.module('starter').controller('loginController', function ($scope, $window,$state,$cordovaOauth, $localStorage,$http,$ionicPopup,
  $firebaseAuth, $firebaseObject,$log, Auth, FURL, Utils, $ionicLoading, $q) {
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

  // $scope.checkUser = function () {
  //   var firebaseUser = auth.$getAuth();

  //   if (firebaseUser) {
  //     $log.log("Signed in as:", firebaseUser.uid);
  //     userStatus(firebaseUser);
  //     $state.go("tab.games");
  //   } else {
  //     $log.log("Signed out");
  //     userStatus(firebaseUser);
  //     $state.go("login");
  //   }
  // }

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
    $ionicLoading.show({
      template: 'Logging in...',
      duration: 3000
    });

function checkLoginState(event) {
  if (event.authResponse) {
    // User is signed-in Facebook.
    console.log(event.authResponse)
    var credential = firebase.auth.FacebookAuthProvider.credential(event.authResponse.accessToken);

    firebase.auth().signInWithCredential(credential).then(function(info){
          $state.go('tab.games');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error.message)
        });
  } else {
    // User is signed-out of Facebook.
    firebase.auth().signOut();
  }
}

    facebookConnectPlugin.getLoginStatus(function(success){
     if(success.status === 'connected'){
        // the user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('gotLoginStatus', success.status);

          checkLoginState(success)
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
          }, function(fail){
            //fail get profile info
            console.log('profile info fail', fail);
          });

     } else {
        //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
        //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        console.log('getLoginStatus fail', success.status);

        //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile', 'user_photos','user_friends'], fbLoginSuccess, fbLoginError);
      }
    },function(fail){
      console.log('fail login',fail);
    });

  //This is the success callback from the login method
    var fbLoginSuccess = function(success) {
      if (!success.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      getFacebookProfileInfo(success.authResponse)
      .then(function(profileInfo) {
        console.log('success user-id' + JSON.stringify(success.authResponse.userID))
        console.log('success auth-token' + JSON.stringify(success.authResponse.accessToken))
        var fbId = success.authResponse.userID;
        var token = success.authResponse.accessToken;
        checkLoginState(success);
      }, function(fail){
        //fail get profile info
        console.log('profile info fail', fail);
      });
    };


    //This is the fail callback from the login method
    var fbLoginError = function(error){
      console.log('fbLoginError');
      console.log(error);
    };

    //this method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();
      facebookConnectPlugin.api('/me?fields=id,name,photos%7Bname,images%7D&access_token=' + authResponse.accessToken, ["public_profile", "user_photos"],
        function (response) {
         info.resolve(response);
        },
        function (response) {
          console.log(response);
          info.reject(response);
        }
      );
      return info.promise;
    };
  }
});
