angular.module('starter.services', [])

.factory('Api', function($ionicLoading) {
  // Might use a resource here that returns a JSON array
  var data;
  return {
    getNews: function(){
      window.fbAsyncInit = function() {
        // $ionicLoading.show({
        //   template: '<ion-spinner icon="android"></ion-spinner>'
        // });
        FB.init({
          appId      : '1231723483550971',
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.AppEvents.logPageView();
        
        FB.api(
          '/819213538129523',
          'GET',
          {
            "fields":"posts{full_picture,message,created_time,shares,status_type,likes}",
            "access_token": "1231723483550971|Bhq_LE_WIqVpEKrBaNy_0yTRoew"
        }, function(response) {
              var data = response.posts.data;
              // console.log(data)
              // $ionicLoading.hide();
          });
        console.log(data)
        return data;
      };
    }, 
    getVideos: function(){

    }
  }
});
