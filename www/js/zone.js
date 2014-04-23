(function(){
	angular.module('zone', ['ionic', 'hereApp.controllers','component.openPhoto']).controller('zoneController', function($rootScope,$scope,$openPhoto, $stateParams, $controller) {
		$scope.openPhoto = function(){
			$openPhoto.show({
				targetWidth:180,
				targetHeight:180,
				allowEdit : true,
				quality:80
			},{
				onsuccess:function(file){
					//这里写上传服务器
					$scope.user.avatar = "data:image/jpeg;base64,"+file;
					$scope.$apply();
				},
				onerror:function(file){
					alert(file);
				}
			});
		}


		$scope.user = {
			avatar: Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg'
		};

		$scope.updateUserInfo = function(userData){
			$scope.user.groups = userData.groups || 0;
			$scope.user.photos = userData.photos || 0;
			$scope.user.follows = userData.follows || 0;
			$scope.user.likes = userData.likes || 0;
			$scope.user.nickname = userData.nickname;

			if (userData.avatar && userData.avatar.length > 0){
				angular.element(document.querySelectorAll('.sidemenu-bg')[0]).scope().avatar = 
					$scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + userData.avatar;

			}else{
				angular.element(document.querySelectorAll('.sidemenu-bg')[0]).scope().avatar = 
					$scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
			}

		};

		// TODO 取操作放在common server中
	

		if( localStorage.getItem('here_userInfo') ){
			$scope.updateUserInfo( JSON.parse(localStorage.getItem('here_userInfo')) );
		}

		Here.isLogin && Here.api.get('/api/get_user', {
			username : Here.userInfo.username
		}, {
			success : function(data) {
				$scope.updateUserInfo( data );
				$scope.$apply();
				localStorage.setItem( 'here_userInfo', JSON.stringify(data) );
			},
			error : function(data) {

			}
		});
		
	});
})();
