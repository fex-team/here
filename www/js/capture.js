(function() {
	
	
	angular.module("capture", ['ionic', 'hereApp.controllers']).controller('capture_action', function($rootScope, $scope, $stateParams, $element) {
		$scope.start = function(groupId,pic){
			Utils.NATIVE.camera.start(groupId,pic,function(res){
				location.href="#/capture_confirm";
			});
		}
		$scope.restart = function(){
			Utils.NATIVE.camera.restart();
			history.back();
		}
		$scope.ok = function(){
			Utils.NATIVE.webdb.addPicture(Utils.NATIVE.camera.getResult());
			history.back();
		}

	}).controller('capture_picture', function($rootScope, $scope, $stateParams, $element) {

		$scope.data = Utils.NATIVE.camera.getResult();

	});
})();

