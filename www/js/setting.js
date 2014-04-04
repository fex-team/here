(function() {

	angular.module("settings", ['ionic', 'hereApp.controllers'])
		.controller('settingsController', function($scope, $ionicPopup, $state) {
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
						Here.api.get('/user/logout', {}, {
					                    success: function(data){
					                        alert('你已退出');
					                        Here.userInfo = {};
					                        $state.go('sidemenu.home');
					                    },
					                    error: function(data){
					                        console.log(data);
					                    }
					                });
					} else {
						console.log('You are not sure');
					}
				});
			};

			$scope.isLogin = false;
			//TODO 改成从cookies判断
			Here.userInfo && Here.userInfo.appKey && ($scope.isLogin = true);
		});
})();

