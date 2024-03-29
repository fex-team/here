(function() {
	angular.module('commentList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('commentListController', function($location, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		console.log( $stateParams );
		var api = $stateParams.type == 'receiver' ? '/api/get_received_comments' : '/api/get_posted_comments';

		$scope.onItemClick = function() {
			location.href="#/page?id="+this.comment.id;
		}
		
		$scope.onAvatarClick = function(){
			location.href="#/user?username="+this.comment.username;
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
						            	
				                comment.photo =  getImg(comment.hash);
				                comment.avatar = getAvatar(comment.avatar);
				                
				                
				            });

				            $scope.comment_list = comments;
							$scope.loadingmore = data.hasMore;
				            $scope.$apply();
				            
				            $scope.$broadcast('scroll.refreshComplete');
							$scope.$broadcast('scroll.infiniteScrollComplete');
							
				            currentPage = ++currentPage;

				            setTimeout(function(){
				            	inited = true;
				            }, 200);
				            first = false;
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
					if (inited && $scope.loadingmore) {
						Here.api.get(api, {
								username: $stateParams.username,
						page: currentPage
							}, {
								success : function(data) {
									
									var comments = data.comments;
						            comments.forEach(function(comment){
						            	
						                comment.photo =  getImg(comment.hash);
						                comment.avatar = getAvatar(comment.avatar);
						                
						                
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
