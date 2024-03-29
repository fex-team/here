angular.module('login', ['ionic', 'hereApp.controllers'])
.controller('LoginController', function($rootScope, $scope, $stateParams, $state, $ionicPopup, $ionicLoading) {
    console.log($stateParams.referer);
    $scope.login = function(){
        var username = $scope.username;
        var password = $scope.password;

        if( !username || !/^(\d|\w){5,10}$/.test(username) ){
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

		var loading = $ionicLoading.show({
	      content: '登录中...',
	    });
        Here.api.post('/user/login', {
                            'username': username,
                            'password': md5(password)
                        }, {
                            success: function(data) {
                                // var exdate = new Date();
                                // exdate.setDate(exdate.getDate()+7);
                                // document.cookie='appKey=' + data.appKey + ';expires=' + exdate.toGMTString();
                                
                                // $state.go('sidemenu.home');
								loading.hide();
                                Here.userInfo = {
                                    'username': data.username,
                                    'nickname': data.nickname,
                                    'appKey': data.appKey
                                };
                                Here.isLogin = true;
                                $rootScope.isLogin = true;

                                $stateParams.referer ? (location.href = $stateParams.referer) : (location.href = '#/sidemenu/home');
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