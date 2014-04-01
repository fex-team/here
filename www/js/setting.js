(function() {

	angular.module("settings", ['ionic', 'hereApp.controllers']).controller('settings_actions', function($scope, $ionicPopup) {
		$scope.openMarket = function() {
			if (/android/i.test(navigator.userAgent.toLowerCase())) {
				window.open('market://details?id=com.baidu.fex.here');
			}
		};
		$scope.clearCache = function() {
			$ionicPopup.confirm({
				title : '确认',
				content : '你确定要清空缓存吗?'
			}).then(function(res) {
				if (res) {
					console.log('You are sure');
				} else {
					console.log('You are not sure');
				}
			});
		};
		$scope.logout = function() {
			$ionicPopup.confirm({
				title : '确认',
				content : '你确定登出吗?'
			}).then(function(res) {
				if (res) {
					console.log('You are sure');
				} else {
					console.log('You are not sure');
				}
			});
		};
	})
})();

