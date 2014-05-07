(function() {
	angular.module('likeList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('likeListController', function($location,shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		$scope.onItemClick = function() {
			
		}

		$scope.loading = (function() {
			
			$scope.loadingmore = true;
			
			var init = false;

			var more = false;

			return {
				init : function() {
					
					Here.api.get('/api/get_received_likes', {
						username: $stateParams.username
					}, {
				        success : function(data) {

				            data.forEach(function(like){
				                like.photo_background = {'background-image': 'url(' +Here.serverAddress + '&c=api&a=img&hash=' + like.hash + '&maxWidth=' + 77 * devicePixelRatio +  ')'};
				                if(like.avatar == ''){
				                	like.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg' + ')'};
				                }else{
				                	like.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=' + like.avatar + ')'};
				                }
				                
				            });

				            $scope.like_list = data;
							$scope.loadingmore = false;
				            $scope.$apply();
				            $scope.$broadcast('scroll.refreshComplete');
				        },
				        error : function(data) {
				        	$scope.like_list = [];
				        	$scope.loadingmore = false;
				            $scope.$apply();
				            $scope.$broadcast('scroll.refreshComplete');
				        }
				    });
				},
				more : function() {
					
					// if ($scope.loadingmore) {
					// 	var like_list = [];
					// 	for (var i = 0; i < 10; i++) {
					// 		like_list.push({
					// 			id : "123",
					// 			nick : "more",
					// 			time : "04-19 18:50",
					// 			photo : "img/1.png",
					// 			img : "img/2.png"
					// 		});

					// 	}
					// 	$scope.like_list = $scope.like_list.concat(like_list);
						
						
					// 	$scope.loadingmore = false;
					// }
					// $scope.$broadcast('scroll.infiniteScrollComplete');

				}
			}
		})();
		$scope.loading.init();

		
		
		

	});
})();
