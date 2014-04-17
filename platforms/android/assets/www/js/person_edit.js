(function() {
	angular.module('person_edit', ['ionic', 'hereApp.controllers','component.openPhoto']).controller('person_edit_header', function($scope, $stateParams,$openPhoto, $controller) {
		$scope.person_edit_ok = [{
			type : 'button ion-ios7-checkmark-outline button-icon icon',
			tap : function(e) {
				location.href = "#/person_edit";
			}
		}];
		
	}).controller("person_edit",function($scope, $stateParams,$openPhoto, $controller){
		$scope.openPhoto = function() {
			$openPhoto.show({
				targetWidth : 180,
				targetHeight : 180,
				allowEdit : true,
				quality : 80
			}, {
				onsuccess : function(file) {
					//这里写上传服务器
					$scope.user.photo = "data:image/jpeg;base64," + file;
					$scope.$apply();
				},
				onerror : function(file) {
					alert(file);
				}
			});
		}
		$scope.user = {
			photo : "http://tp4.sinaimg.cn/2129028663/180/5684393877/1"
		}
	});
})();
