angular.module('starter.controllers', [])

.controller('GamesCtrl', function($scope) {
  var teams = [
    "OBK",
    "OCC",
    "Abu-Bakr Tukwila",
    "Abu-Bakr Seattle",
    "Mac 10",
    "Al Huda",
    "Abu Hurreira",
    "Makkah"
  ];

  var schedule = [];

  function assortTeams(name, arr) {
    var week = 0;
    for (var i = 0; i < arr.length; i++) {
      if(name !== arr[i]){
        week += 1;
        schedule.push({
          team1: name,
          team2: arr[i],
          week: week
        })
      }
    };
  };

  teams.forEach(function(curr, index, arr) {
    assortTeams(arr[index], arr);
  });

  console.log(JSON.stringify(schedule, null, 2));
  $scope.schedule = schedule;
})

.controller('MainCtrl', function($scope, $rootScope, $ionicLoading, Api) {
  $scope.data = [];
  var data = Api.getNews();

  console.log(data)
  // data.forEach(function(val, index, arr) {
  //               // console.log(JSON.stringify(arr[index].status_type, null, 2))
  //               if(arr[index].status_type !== "added_video"){
  //                 $scope.data.push(arr[index])
  //                 // console.log("found it")
  //               }
  //             });
})

.controller('VideosCtrl', function($scope, $stateParams, $ionicLoading) {
  console.log('here')
  $scope.videos = [];
  window.fbAsyncInit = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    FB.init({
      appId      : '1231723483550971',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

    FB.api(
        "819213538129523?fields=videos{source,format,length,created_time,likes,description}",
        {
            "access_token": "1231723483550971|Bhq_LE_WIqVpEKrBaNy_0yTRoew"

        },
        function (response) {
          if (response && !response.error) {
            response["videos"].data.forEach(function(val, index, arr) {
              $scope.videos.push(arr[index]);
            })
          }
        }
    );
  };
})

.controller('StandingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
