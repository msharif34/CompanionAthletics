angular.module('starter.controllers', [])

.controller('GamesCtrl', function($scope) {
console.log('working');

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
