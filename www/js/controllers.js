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

.controller('NewsCtrl', function($scope, $rootScope) {
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
        "fields":"posts{full_picture,message,created_time}",
        "access_token": ""
    }, function(response) {
          // Insert your code here
          $scope.data = response.posts.data;
          // console.log(JSON.stringify(response, null, 2))
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
