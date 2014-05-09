(function() {
	angular.module('likeList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('likeListController', function($location,shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		$scope.onItemClick = function() {
			location.href="#/page?id="+this.like.id;
		}
		
		$scope.onAvatarClick = function(){
			location.href="#/user?username="+this.like.username;
		}

		$scope.loading = (function() {
			
			$scope.loadingmore = false;
			
			var inited = false;
			var currentPage = 1;

			return {
				init : function() {

					currentPage = 1;
					Here.api.get('/api/get_received_likes', {
						username: $stateParams.username,
						page: currentPage
					}, {
						success : function(data) {
							
							var likes = data.likes;
							likes.forEach(function(like){
								like.photo =  getImg(like.hash);
				                like.avatar = getAvatar(like.avatar);
				            });

				            $scope.like_list = likes;
							$scope.loadingmore = data.hasMore;

				            $scope.$apply();

							$scope.$broadcast('scroll.refreshComplete');
							$scope.$broadcast('scroll.infiniteScrollComplete');

							currentPage = ++currentPage;

							inited = true;

						},
						error : function(data) {
							console.log(data);
							$scope.loadingmore = false;
							$scope.$apply();
							$scope.$broadcast('scroll.refreshComplete');
						}
					});
					
				},
				more : function() {
					if (inited && $scope.loadingmore) {
						Here.api.get('/api/get_received_likes', {
							username: $stateParams.username,
							page: currentPage
						}, {
							success : function(data) {
								
								var likes = data.likes;
								likes.forEach(function(like){
					                like.photo =  getImg(like.hash);
				                	like.avatar = getAvatar(like.avatar);
					                
					            });

					            $scope.like_list = $scope.like_list.concat(likes);
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
