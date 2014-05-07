(function() {

	angular.module("settings", ['ionic', 'hereApp.controllers'])
		.controller('settingsController', function($rootScope, $scope, $ionicPopup, $state) {

			if(cookie.get('appKey') && cookie.get('appKey').length > 0){
				$rootScope.isLogin = true;
			}

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
					                        // $ionicPopup.alert({
			                          //           title: '通知',
			                          //           content: '您已退出，即将返回首页'
			                          //       });
					                        Here.userInfo = {};
					                        Here.isLogin = false;
                                			$rootScope.isLogin = false;
                                			cookie.remove('appKey');
                                			cookie.remove('nickname');
                                			cookie.remove('username');

                                			setTimeout(function(){
					                        	$state.go('sidemenu.home');

					                        	//TODO 刷新侧边栏信息
                                			}, 200);
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

		});
})();

