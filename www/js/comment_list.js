(function() {
	angular.module('commentList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('commentListController', function($location, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		$scope.onItemClick = function() {
			
		}

		$scope.loading = (function() {
			
			$scope.loadingmore = true;

			var init = false;

			var more = false;

			return {
				init : function() {
					
					var comment_list = [];
					for (var i = 0; i < 10; i++) {
						comment_list.push({
							id : "123",
							nick : "威廉萌",
							comment : "好图片啊！",
							time : "04-19 18:50",
							photo : "img/1.png",
							img : "img/2.png"
						})

					}
					
					$scope.comment_list = comment_list;
					$scope.loadingmore = true;
					$scope.$apply();
					
					$scope.$broadcast('scroll.refreshComplete');
				},
				more : function() {
					
					if ($scope.loadingmore) {
						var comment_list = [];
						for (var i = 0; i < 10; i++) {
							comment_list.push({
								id : "123",
								nick : "more",
								comment : "好图片啊！",
								time : "04-19 18:50",
								photo : "img/1.png",
								img : "img/2.png"
							});

						}
						$scope.comment_list = $scope.comment_list.concat(comment_list);
						
						
						$scope.loadingmore = false;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');

				}
			}
		})();
		$scope.loading.init();

	});
})();
