angular.module('register', ['ionic', 'hereApp.controllers'])
.controller('RegisterController', function($rootScope, $scope, $stateParams, $state) {
        
    $scope.register = function(){
        var username = $scope.username;
        var nickname = $scope.nickname;
        var password = $scope.password;

        if( !/^(\d|\w){5,10}$/.test(username) ){
            alert('用户名必须为5到10个英文字符或数字');
            return;
        }
        if( !password || password == '' ){
            alert('密码必填');
            return;
        }
        if( nickname && nickname.length > 20 ){
            alert('昵称最多20个字符');
            return;
        }


        Here.api.post('/user/register', {
                            'username': username,
                            'nickname': nickname || '时光相机用户',
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

                                console.log(data);
                            },
                            error: function(data) {
                                alert(data.message);
                            }
                        });
    }
});