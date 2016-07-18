angular.module('starter')
//.constant(AVATOR_URL, 'http://xmpp.hplabs.jp/demo/push/lib/avator/list.php')
.factory('profileService', function($localStorage) {
  var profile = {};
  profile.$storage = $localStorage.$default({
    username: '',
    password: '',
    nickname: '名無しさん',
    avator: 'http://xmpp.hplabs.jp/demo/push/lib/avator/noimage.jpg'
  });
//  
//  profile.save = function(){
//  };
  
//  profile = {
//    username: '',
//    password: '',
//    nickname: '名無しさん',
//    avator: null
//  };
  
  return profile;
})