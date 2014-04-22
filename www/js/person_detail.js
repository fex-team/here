(function(){
	angular.module('person_detail', ['ionic', 'hereApp.controllers'])
    .controller('person_detail_header', function($scope, $stateParams, $controller) {
		$scope.person_detail_edit = [{
			type : 'button ion-ios7-compose-outline button-icon icon',
			tap : function(e) {
				location.href = "#/person_edit";
			}
		}];
        $scope.back = [{
            type : 'button back-button button-icon icon ion-arrow-left-c',
            tap : function(e) {
                location.href = "#/sidemenu/zone";
            }
        }];
	})
    .controller('person_detail', function($scope){
        $scope.user = {
            avatar: Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg'
        };

        $scope.updateUserInfo = function(userData){
            $scope.user.username = userData.username;
            $scope.user.nickname = userData.nickname;
            $scope.user.sex = userData.sex;
            $scope.user.address = userData.address.replace('|', ' ');
            $scope.user.intro = userData.intro;
            $scope.user.time = userData.time.split(' ')[0];


            if (userData.avatar.length > 0){
                $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + userData.avatar;
            }
        }

        if( localStorage.getItem('here_userInfo') ){
            $scope.updateUserInfo( JSON.parse(localStorage.getItem('here_userInfo')) );
        }

        Here.isLogin && Here.api.get('/api/get_user', {
            username : Here.userInfo.username
        }, {
            success : function(data) {
                $scope.updateUserInfo(data);
                $scope.$apply();
                localStorage.setItem( 'here_userInfo', JSON.stringify(data) );
            },
            error : function(data) {

            }
        });
    });
})();
