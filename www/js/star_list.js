(function() {
	angular.module('starList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('starListController', function($location,shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		$scope.onItemClick = function() {
			
		}

		$scope.loading = (function() {
			
			$scope.loadingmore = true;
			
			var init = false;

			var more = false;

			return {
				init : function() {
					
					var star_list = [];
					for (var i = 0; i < 10; i++) {
						star_list.push({
							id : "123",
							nick : "威廉萌",
							time : "04-19 18:50",
							photo : "img/1.png",
							img : "img/2.png"
						})

					}
					
					$scope.star_list = star_list;
					$scope.loadingmore = true;
					$scope.$apply();
					
					$scope.$broadcast('scroll.refreshComplete');
				},
				more : function() {
					
					if ($scope.loadingmore) {
						var star_list = [];
						for (var i = 0; i < 10; i++) {
							star_list.push({
								id : "123",
								nick : "more",
								time : "04-19 18:50",
								photo : "img/1.png",
								img : "img/2.png"
							});

						}
						$scope.star_list = $scope.star_list.concat(star_list);
						
						
						$scope.loadingmore = false;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');

				}
			}
		})();
		$scope.loading.init();

		
		
		

	});
})();
