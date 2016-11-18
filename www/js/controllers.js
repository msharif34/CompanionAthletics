angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state) {
  console.log('ready app')

  $scope.changeRoute = function(route){
    $state.go(route, {}, { reload: true });
  }
})

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
  $scope.schedule = schedule;
})

.controller('NewsCtrl', function($scope, $rootScope, $ionicLoading, dataService, $timeout, $state) {
  $scope.data = [];
  dataService.getNews(function(info){
    var data = info;
    data.forEach(function(val, index, arr) {
      if(arr[index].status_type !== "added_video"){
        $scope.data.push(arr[index])
      }
      $ionicLoading.hide();
    });
  });


  $timeout(function () {
    $state.go('tab.videos')
  }, 2000);
})

.controller('VideosCtrl', function($scope, $stateParams, $ionicLoading, dataService, $rootScope, $state) {
  $scope.videos = [];
  dataService.getVideos(function(response){
    if (response && !response.error) {
      response["videos"].data.forEach(function(val, index, arr) {
        $scope.videos.push(arr[index]);
      })
    }
  });
})

.controller('StandingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
