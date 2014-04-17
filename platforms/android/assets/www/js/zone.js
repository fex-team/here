(function(){
	angular.module('zone', ['ionic', 'hereApp.controllers','component.openPhoto']).controller('zoneController', function($scope,$openPhoto, $stateParams, $controller) {
		$scope.openPhoto = function(){
			$openPhoto.show({
				targetWidth:180,
				targetHeight:180,
				allowEdit : true,
				quality:80
			},{
				onsuccess:function(file){
					//这里写上传服务器
					$scope.user.photo = "data:image/jpeg;base64,"+file;
					$scope.$apply();
				},
				onerror:function(file){
					alert(file);
				}
			});
		}
		$scope.user = {
			photo:"http://tp4.sinaimg.cn/2129028663/180/5684393877/1"
		}
		
	});
})();
