angular.module('starter.services', [])

.service('dataService', function($ionicLoading, $q) {
  var info = [];

  this.getNews = function(callback){
    // $ionicLoading.show({
    //   template: "Loading ..."
    // });

      window.fbAsyncInit = function() {
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
            callback(data);
          });
      };
  };

  this.getVideos = function(callback){
    // $ionicLoading.show({
    //   template: "Loading ..."
    // });

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1231723483550971',
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.AppEvents.logPageView();
      FB.api("819213538129523?fields=videos{source,format,length,created_time,likes,description}",{"access_token": "1231723483550971|Bhq_LE_WIqVpEKrBaNy_0yTRoew"},
        function (response) {
          callback(response);
        });
      };
  };

  return this;
});
