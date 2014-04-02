(function() {
	var _capture_param,group_id;
	var capture_action = (function() {
		var started = false;
		var gid;
		return function(group_id) {
			gid = group_id;
			if (!started) {
				started = true;
				var host = window.location.host;
				window.here.openCamera("http://" + host + "/mask.html", function(a) {
					a = eval("(" + a + ")");
					if(group_id){
						a.groupId = group_id;	
					}
				
					_capture_param = a;
					location.href = "#/capture_confirm";
					started = false;
				}, function() {

				});
			}
		}
	})();
	angular.module("capture", ['ionic', 'hereApp.controllers']).controller('capture_start', function($rootScope, $scope, $stateParams, $element) {
		$element.bind("click", function() {
			group_id = $stateParams['group_id'];
			capture_action(group_id);
		});

	}).controller('capture_picture', function($rootScope, $scope, $stateParams, $element) {

		NATIVE.displayImage(_capture_param['filepath'], $element[0]);

	}).controller('capture_restart', function($element) {
		$element.bind("click", function() {
			
			capture_action(group_id);
			history.back();
		});

	}).controller('capture_ok', function($element) {
		$element.bind("click", function() {
			NATIVE.webdb.addPicture(_capture_param);
			history.back();
		});

	});
})();

