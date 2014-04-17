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

		// 取操作放在common server中
		// TODO 取一次，存在localstorage里面
		Here.isLogin && Here.api.get('/api/get_user', {
			username : Here.userInfo.username
		}, {
			success : function(data) {
				$scope.user.groups = data.groups;
				$scope.user.photos = data.photos;
				$scope.user.follows = data.follows;
				$scope.user.likes = data.likes;

				if (data.avatar && data.avatar.length > 0){
					angular.element(document.querySelectorAll('.sidemenu-bg')[0]).scope().avatar = 
						$scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + data.avatar;

				}else{
					angular.element(document.querySelectorAll('.sidemenu-bg')[0]).scope().avatar = 
						$scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
				}

				$scope.$apply();
			},
			error : function(data) {

			}
		});
		
	});
})();
