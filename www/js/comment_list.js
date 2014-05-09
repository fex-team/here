(function() {
	angular.module('commentList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('commentListController', function($location, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		console.log( $stateParams );
		var api = $stateParams.type == 'receiver' ? '/api/get_received_comments' : '/api/get_posted_comments';

		$scope.onItemClick = function() {
			
		}

		$scope.loading = (function() {
			
			$scope.loadingmore = true;

			var inited = false;

			var more = false;

			var currentPage = 1;

			return {
				init : function() {
					currentPage = 1;
					Here.api.get(api, {
						username: $stateParams.username,
						page: currentPage
					}, {
				        success : function(data) {
				        	var comments = data.comments;
				            comments.forEach(function(comment){
				                comment.photo_background = {'background-image': 'url(' +Here.serverAddress + '&c=api&a=img&hash=' + comment.hash + ')'};
				                if(comment.avatar == ''){
				                	comment.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg' + ')'};
				                }else{
				                	comment.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=' + comment.avatar + ')'};
				                }
				                
				            });

				            $scope.comment_list = comments;
							$scope.loadingmore = data.hasMore;
				            $scope.$apply();
				            
				            $scope.$broadcast('scroll.refreshComplete');
							$scope.$broadcast('scroll.infiniteScrollComplete');
							
				            currentPage = ++currentPage;

				            inited = true;
				        },
				        error : function(data) {
				        	$scope.comment_list = [];
				        	$scope.loadingmore = false;
				            $scope.$apply();
				            $scope.$broadcast('scroll.refreshComplete');
				        }
				    });

				},
				moreDataCanBeLoaded: function(){
					if(inited){
						return true;
					}

					return false;
				},
				more : function() {
					if (inited && $scope.loadingmore) {
						Here.api.get(api, {
								username: $stateParams.username,
						page: currentPage
							}, {
								success : function(data) {
									
									var comments = data.comments;
						            comments.forEach(function(comment){
						                comment.photo_background = {'background-image': 'url(' +Here.serverAddress + '&c=api&a=img&hash=' + comment.hash + ')'};
						                if(comment.avatar == ''){
						                	comment.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg' + ')'};
						                }else{
						                	comment.avatar_background = {'background-image': 'url(' + Here.serverAddress + '&c=api&a=img&hash=' + comment.avatar + ')'};
						                }
						                
						            });

						            $scope.comment_list = $scope.comment_list.concat(comments);
									$scope.loadingmore = data.hasMore;
						            $scope.$apply();
						            // $scope.$broadcast('scroll.refreshComplete');

									setTimeout(function(){
										$scope.loadingmore && $scope.$broadcast('scroll.infiniteScrollComplete');
									}, 100);
									currentPage = ++currentPage;
								},
								error : function(data) {
									console.log(data);
									$scope.loadingmore = false;
									$scope.$apply();
									$scope.$broadcast('scroll.refreshComplete');
								}
							});
					}else{
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}

				}
			}
		})();
		$scope.loading.init();

	});
})();
