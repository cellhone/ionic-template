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


.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $ionicLoading.show();
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });      

      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });
      
      $ionicLoading.hide();

    });
 
  }, function(error){
    console.log("Could not get location");
    $ionicLoading.hide();
  });
});