angular.module('starter')

.controller('SplashCtrl', function($scope, $timeout, $state) {
  var waittime = 1000;
  var t = $timeout(function() {
    $state.go('login');
  }, waittime);
})


.controller('MainCtrl', function($scope) {
})


.controller('LoginCtrl', function($scope, $state, $window, $localStorage, $ionicModal, Fullscreen) {
  $scope.imgsrc="http://xmpp.hplabs.jp/demo/push/lib/avator/makoto.jpg";  
  $scope.clickExpand = function () {
    // Fullscreen
    if (Fullscreen.isEnabled())
       Fullscreen.cancel();
    else
       Fullscreen.all();
  };
  $scope.isFullScreen = false;
  $scope.goFullScreenViaWatcher = function() {
    $scope.isFullScreen = !$scope.isFullScreen;
  };
    
  $scope.clicImage = function() {
    console.log('clicImage');
    $scope.modal.show();
  }
  
  $scope.clickLogin = function() {
    console.log('clickLogin');
    $state.go('main.menu');
  }
  
  $scope.clickClear = function() {
    console.log('clickClear');
    $window.location.reload(true);
  }
  
  $scope.$storage = $localStorage.$default({
    username: '',
    password: '',
    nickname: '名無しさん'
  });
  $scope.nickname = $scope.$storage.nickname;
  
  
  $ionicModal.fromTemplateUrl('templates/avator.html', {
    scope: $scope,
    animation: 'slide-in-down'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.closeAvator = function() {
    console.log('closeAvator');
    $scope.modal.hide();
  }
})


