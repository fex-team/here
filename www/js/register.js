angular.module('register', ['ionic', 'hereApp.controllers'])
.controller('RegisterController', function($rootScope, $scope, $stateParams, $state,$ionicLoading) {
        
    $scope.register = function(){
        var username = $scope.username;
        var nickname = $scope.nickname;
        var password = $scope.password;

        if( !/^(\d|\w){5,10}$/.test(username) ){
            $ionicPopup.alert({
                title: '警告',
                content: '用户名必须为5到10个英文字符或数字'
            });
            return;
        }
        if( !password || password == '' ){
            $ionicPopup.alert({
                title: '警告',
                content: '密码必填'
            });
            return;
        }
        if( nickname && nickname.length > 20 ){
            $ionicPopup.alert({
                title: '警告',
                content: '昵称最多20个字符'
            });
            return;
        }
		var loading = $ionicLoading.show({
	      content: '注册中...',
	    });

        Here.api.post('/user/register', {
                            'username': username,
                            'nickname': nickname || '时光相机用户',
                            'password': md5(password)
                        }, {
                            success: function(data) {
                                // var exdate = new Date();
                                // exdate.setDate(exdate.getDate()+7);
                                // document.cookie='appKey=' + data.appKey + ';expires=' + exdate.toGMTString();
                                loading.hide();
                                $state.go('sidemenu.home');

                                Here.userInfo = {
                                    'username': data.username,
                                    'nickname': data.nickname,
                                    'appKey': data.appKey
                                };
                                Here.isLogin = true;
                                $rootScope.isLogin = true;

                                console.log(data);
                            },
                            error: function(data) {
                            	loading.hide();
                                $ionicPopup.alert({
                                    title: '警告',
                                    content: data.message
                                });
                            }
                        });
    }
});