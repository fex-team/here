(function() {
	angular.module('List', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('ListController', function($location, shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		var groupId = $stateParams['groupId'];

		$scope.showdroplist = false;

		$scope.rightButtons = [{
			type : ' ion-ios7-camera-outline button-icon ',
			tap : function(e) {

				/*
				 var arr = [];
				 groups.photos.forEach(function(photo, index) {
				 arr.push(photo.src);
				 });

				 Utils.NATIVE.camera.start($stateParams.groupId, arr, function(a) {
				 location.href = "#/capture_confirm";
				 });*/

			}
		}, {
			type : 'button ion-ios7-more button-icon icon',
			tap : function(e) {

				$scope.showdroplist = !$scope.showdroplist;

				e.stopPropagation();
			}
		}];

		$scope.openShare = function() {
			console.info(this.item.photo);
			shareDialogAPI.open(false, this.item.photo);
		}

		$scope.loading = (function() {

			function getAvatar(avatar){
				var res;
				if( avatar == '' ){
					res = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
				}else{
					res = Here.serverAddress + '&c=api&a=img&hash=' + avatar;
				}
				return res;
			}
			
			var myusername = Here.userInfo&&Here.userInfo.username;

			function getList(arr,merge){
				merge = merge||{};
				var res = [];
				arr.forEach(function(photo){
					res.push(angular.extend({
						id:photo.id,
						nickname:photo.nickname,
						username:photo.username,
						time:photo.time,
						avatar:getAvatar(photo.avatar),
						comments:photo.comments,
						likes:photo.likes,
						liked:photo.liked,
						img:Here.serverAddress + '&c=api&a=img&hash=' + photo.hash,
						my:myusername===photo.username
					},merge));
					
				});
				return res;
			}
				
			$scope.loadingmore = true;

			var inited = false;
			var currentPage = 1;

			return {
				init : function() {
					Here.api.get('/api/get_group', {
						groupId : groupId,
						page: currentPage
					}, {
						success : function(data) {
							var cover = {
								id:data.id,
								name:data.name,
								userId:data.userId
							};
							$scope.cover = cover;
							var list = getList(data.photos,{
								offline:false
							});
							$scope.list = list;
							$scope.loadingmore = data.hasMore;
							$scope.$apply();
							$scope.$broadcast('scroll.refreshComplete');
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
						Here.api.get('/api/get_group', {
								groupId : groupId,
								page: currentPage
							}, {
								success : function(data) {
									var cover = {
										id:data.id,
										name:data.name,
										userId:data.userId
									};
									$scope.cover = cover;
									var list = getList(data.photos,{
										offline:false
									});
									$scope.list = $scope.list.concat(list);
									$scope.loadingmore = data.hasMore;
									$scope.$apply();
									// $scope.$broadcast('scroll.refreshComplete');
									// 
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
