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
        $scope.user = {};

        Here.isLogin && Here.api.get('/api/get_user', {
            username : Here.userInfo.username
        }, {
            success : function(data) {
                $scope.user.username = data.username;
                $scope.user.nickname = data.nickname;
                $scope.user.sex = data.sex;
                $scope.user.address = data.address.replace('|', ' ');
                $scope.user.intro = data.intro;
                $scope.user.time = data.time.split(' ')[0];


                if (data.avatar.length > 0){
                    $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + data.avatar;
                }else{
                    $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
                }

                $scope.$apply();
            },
            error : function(data) {

            }
        });
    });
})();
