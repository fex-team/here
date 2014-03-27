angular.module('hereApp.controllers', []).controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {

	$scope.leftButtons = [{
		type : 'button-icon button-clear ion-navicon',
		tap : function(e) {
			$ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
		}
	}];

	$scope.back = [{
		type : 'button back-button button-icon icon ion-arrow-left-c button back-button button-icon icon ion-arrow-left-c',
		tap : function(e) {
			window.history.back();
		}
	}];
})
