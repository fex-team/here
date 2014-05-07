(function() {
	angular.module('commentList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('commentListController', function($location, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		console.log( $stateParams );
		var api = $stateParams.type == 'receiver' ? '/api/get_received_comments' : '/api/get_posted_comments';

		$scope.onItemClick = function() {
			
		}

		$scope.loading = (function() {
			
			$scope.loadingmore = true;

			var init = false;

			var more = false;

			return {
				init : function() {
					
					Here.api.get(api, {
						username: $stateParams.username
					}, {
				        success : function(data) {

				            data.forEach(function(comment){
				                comment.photo_background = {'background-image': 'url(' +Here.serverAddress + '&c=api&a=img&hash=' + comment.hash + ')'};
				                if(comment.avatar == ''){
				                	comment.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg' + ')'};
				                }else{
				                	comment.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=' + comment.avatar + ')'};
				                }
				                
				            });

				            $scope.comment_list = data;
							$scope.loadingmore = false;
				            $scope.$apply();
				            $scope.$broadcast('scroll.refreshComplete');
				        },
				        error : function(data) {
				        	$scope.comment_list = [];
				        	$scope.loadingmore = false;
				            $scope.$apply();
				            $scope.$broadcast('scroll.refreshComplete');
				        }
				    });

				},
				more : function() {
					
					// if ($scope.loadingmore) {
					// 	var comment_list = [];
					// 	for (var i = 0; i < 10; i++) {
					// 		comment_list.push({
					// 			id : "123",
					// 			nick : "more",
					// 			comment : "好图片啊！",
					// 			time : "04-19 18:50",
					// 			photo : "img/1.png",
					// 			img : "img/2.png"
					// 		});

					// 	}
					// 	$scope.comment_list = $scope.comment_list.concat(comment_list);
						
						
					// 	$scope.loadingmore = false;
					// }
					// $scope.$broadcast('scroll.infiniteScrollComplete');

				}
			}
		})();
		$scope.loading.init();

	});
})();
