(function(){
	angular.module('person_detail', ['ionic', 'hereApp.controllers']).controller('person_detail_header', function($scope, $stateParams, $controller) {
		$scope.person_detail_edit = [{
			type : 'button ion-ios7-compose-outline button-icon icon',
			tap : function(e) {
				var arr = [];
				groups.photos.forEach(function(photo, index) {
					arr.push(photo.src);
				});

				Utils.NATIVE.camera.start($stateParams.groupId, arr, function(a) {
					location.href = "#/capture_confirm";
				});
			}
		}];
	});
})();
