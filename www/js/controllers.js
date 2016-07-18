angular.module('starter')

.controller('SplashCtrl', function($scope, $timeout, $state) {
  var waittime = 1000;
  var t = $timeout(function() {
    $state.go('login');
  }, waittime);
})


.controller('MainCtrl', function($scope) {
})


.controller('LoginCtrl', function($scope, $rootScope, $state, $window, $localStorage, $ionicModal, Fullscreen, profileService) {
  
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
    //$scope.modal.show();
	  $state.go('avator');
  }
  
  $scope.clickLogin = function() {
    console.log('clickLogin');
    $state.go('main.menu');
  }
  
  $scope.clickClear = function() {
    console.log('clickClear');
    $window.location.reload(true);
  }
  
//  $scope.$storage = $localStorage.$default({
//    username: '',
//    password: '',
//    nickname: '名無しさん'
//  });
//  $scope.nickname = $scope.$storage.nickname;
  
  
  $ionicModal.fromTemplateUrl('templates/avator.html', {
    scope: $scope,
    animation: 'slide-in-down'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
//  $scope.closeAvator = function() {
//    console.log('closeAvator');
//    $scope.modal.hide();
//  }
  
  $rootScope.$on('$stateChangeStart', function() {
    $scope.setProfile();
  });
                 
  $scope.setProfile = function() {
    $scope.imgsrc = profileService.$storage.avator;
  }
  $scope.imgsrc = profileService.$storage.avator;
  $scope.nickname = profileService.$storage.nickname;

})


.controller('AvatorCtrl', function($scope, $ionicHistory, $http, profileService) {
  //var avatorUrls = avatorService.getAvatorUrls();
  $scope.images = [];
  var prof = profileService;
 
  $scope.loadImages = function(profileService) {
    $http.get('http://xmpp.hplabs.jp/demo/push/lib/avator/list.php')
    .then(function(response) {
      var lists = response.data;
      for(var i = 0; i < lists.length; i++) {
        $scope.images.push({id: i, src: lists[i]});
      }
    });

  }
  
  $scope.clickAvator = function(index) {
    console.log('clickAvator:' + $scope.images[index].src);
    prof.$storage.avator = $scope.images[index].src;
    $ionicHistory.goBack();
  }
    
  $scope.closeAvator = function() {
    console.log('closeAvator');
    $ionicHistory.goBack();
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