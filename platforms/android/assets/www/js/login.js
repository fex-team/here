angular.module('login', ['ionic', 'hereApp.controllers'])
.controller('LoginController', function($rootScope, $scope, $stateParams, $state) {
        
    $scope.login = function(){
        var username = $scope.username;
        var password = $scope.password;

        if( !/^(\d|\w){5,10}$/.test(username) ){
            alert('用户名必须为5到10个英文字符或数字');
            return;
        }
        if( !password || password == '' ){
            alert('密码必填');
            return;
        }


        Here.api.post('/user/login', {
                            'username': username,
                            'password': md5(password)
                        }, {
                            success: function(data) {
                                // var exdate = new Date();
                                // exdate.setDate(exdate.getDate()+7);
                                // document.cookie='appKey=' + data.appKey + ';expires=' + exdate.toGMTString();
                                
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
                                alert(data.message);
                            }
                        });
    }
});