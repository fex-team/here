(function(){
	angular.module('person_detail', ['ionic', 'hereApp.controllers']).controller('person_detail_header', function($scope, $stateParams, $controller) {
		$scope.person_detail_edit = [{
			type : 'button ion-ios7-compose-outline button-icon icon',
			tap : function(e) {
		
				location.href = "#/person_edit";
			}
		}];
	});
})();
