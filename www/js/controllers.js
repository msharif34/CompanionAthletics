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

.controller('MainCtrl', function($scope, $rootScope) {
$scope.videos = [];
  $scope.data = [];
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1231723483550971',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

FB.api(
    "819213538129523?fields=videos{source, format}",
    {
        "access_token": ""

    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        // console.log(JSON.stringify(response, null, 2));

        response["videos"].data.forEach(function(val, index, arr) {
            // console.log(JSON.stringify(arr[index].status_type, null, 2))
        console.log('-----------------------')
        console.log(JSON.stringify(arr[index], null, 2));
        $scope.videos.push(arr[index]);
            
          })
      }
    }
);

    
    FB.api(
      '/819213538129523',
      'GET',
      {
        "fields":"posts{full_picture,message,created_time,shares,status_type,likes}",
        "access_token": ""
    }, function(response) {
          var data = response.posts.data;
          data.forEach(function(val, index, arr) {
            // console.log(JSON.stringify(arr[index].status_type, null, 2))
            if(arr[index].status_type !== "added_video"){
              $scope.data.push(arr[index])
              // console.log("found it")
            }
          })
      });
  };
})

.controller('VideosCtrl', function($scope, $stateParams) {

})

.controller('StandingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
