angular.module('hereApp.controllers', []).controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {

	$scope.leftButtons = [{
		type : 'button-icon button-clear ion-navicon',
		tap : function(e) {
			$ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
		}
	}];

	$scope.$on('closeSlideMenu', function(event){
		$ionicSideMenuDelegate.close($scope.$$childHead);
	});

	$scope.back = [{
		type : 'button back-button button-icon icon ion-arrow-left-c button back-button button-icon icon ion-arrow-left-c',
		tap : function(e) {
			window.history.back();
		}
	}];

	$scope.attendees = [{
		firstname : 'Nicolas',
		lastname : 'Cage'
	}, {
		firstname : 'Jean-Claude',
		lastname : 'Van Damme'
	}, {
		firstname : 'Keanu',
		lastname : 'Reeves'
	}, {
		firstname : 'Steven',
		lastname : 'Seagal'
	}];
}).controller('MenuContentController', function($scope, $element){
	$scope.candrag = true;
	$scope.$on('candrag', function(event, can){
		$scope.candrag = can;
		// $scope.$apply();
	});
} );