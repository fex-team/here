(function() {
	
	
	var _capture_result;
	angular.module("capture", ['ionic', 'hereApp.controllers']).controller('capture_action', function($rootScope, $scope, $stateParams, $element) {
		$scope.start = function(groupId,pic){
			Utils.NATIVE.camera.start(groupId,pic,function(res){
				_capture_result = res;
				location.href="#/capture_confirm";
			});
		}
		$scope.restart = function(){
			Utils.NATIVE.camera.restart();
			history.back();
		}
		$scope.ok = function(){
			Utils.NATIVE.webdb.addPicture(_capture_result);
			history.back();
		}

	}).controller('capture_picture', function($rootScope, $scope, $stateParams, $element) {

		Utils.NATIVE.displayImage(_capture_result['filepath'], $element[0]);

	});
})();

