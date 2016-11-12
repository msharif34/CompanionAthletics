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

.controller('NewsCtrl', function($scope) {

})

.controller('VideosCtrl', function($scope, $stateParams) {

})

.controller('StandingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
