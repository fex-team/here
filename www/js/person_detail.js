(function(){
	angular.module('person_detail', ['ionic', 'hereApp.controllers'])
    .controller('person_detail', function($scope,$stateParams){
    	
    	var username = $stateParams['username'];
    	
    	var myusername = Here.userInfo&&Here.userInfo.username;
    	
    	$scope.my = username == myusername;
    	if($scope.my){
    		$scope.person_detail_edit = [{
				type : 'button ion-ios7-compose-outline button-icon icon',
				tap : function(e) {
					location.href = "#/person_edit";
				}
			}];
    	}
    	
        $scope.back = [{
            type : 'button back-button button-icon icon ion-arrow-left-c',
            tap : function(e) {
            	history.back();
                // location.href = "#/sidemenu/zone";
            }
        }];
    	
        $scope.user = {
            avatar: Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg'
        };

        $scope.updateUserInfo = function(data){
            $scope.user.username = data.username;
            $scope.user.nickname = data.nickname;
            $scope.user.sex = data.sex;
            $scope.user.birthday = data.birthday;
            $scope.user.city = data.city;
            $scope.user.intro = data.intro;
            $scope.user.time = data.time.split(' ')[0];

            if (data.avatar.length > 0){
                $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + data.avatar;
            }
        }

        if( localStorage.getItem('here_userInfo') ){
            $scope.updateUserInfo( JSON.parse(localStorage.getItem('here_userInfo')) );
        }

        Here.isLogin && Here.api.get('/api/get_user', {
            username : username
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
