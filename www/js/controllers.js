angular.module('starter.controllers', [])

.controller('GamesCtrl', function($scope) {
console.log('working');

})

.controller('NewsCtrl', function($scope, Chats) {

})

.controller('VideosCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('StandingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
