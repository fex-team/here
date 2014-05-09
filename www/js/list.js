(function() {
	angular.module('List', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('ListController', function($location, shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller,$ionicPopup,$ionicLoading) {

		

		var groupId = $stateParams['groupId'];

		$scope.showdroplist = false;

		$scope.rightButtons = [{
			type : ' ion-ios7-camera-outline button-icon ',
			tap : function(e) {

				var arr = [];
				$scope.list.forEach(function(photo, index) {
					arr.push(photo.img);
				});

				Utils.NATIVE.camera.start($stateParams.groupId, arr, function(a) {
					location.href = "#/capture_confirm";
				});

			}
		}, {
			type : 'button ion-ios7-more button-icon icon',
			tap : function(e) {

				$scope.showdroplist = !$scope.showdroplist;

				e.stopPropagation();
			}
		}];

		$scope.openShare = function() {
			
			shareDialogAPI.open(false, this.item.img);
			
		}
		
		$scope.onAvatarClick = function(){
			
			if(!this.item.offline){
				location.href="#/user?username="+this.item.username;
			}
		}
		
		$scope.onItemClick = function(){
			if(!this.item.offline){
				location.href="#/page?id="+this.item.id;
			}
		}
		
		$scope.onDel = function(){
			var me = this;
			$ionicPopup.confirm({
				title : '删除',
				content : '你确认要删除该照片吗?'
			}).then(function(res) {
				if(res){
					
					me.item.offline && Utils.NATIVE.webdb.deleteById(me.item.id);	
					me.item.show = false;
				}
				
				
			});
		}
		
		$scope.onAsync = function() {
			
			if ($stateParams['native']) {
				$ionicPopup.confirm({
					title : '提醒',
					content : '你还没有创建相册，是否要先创建相册?'
				}).then(function(res) {
					if (res) {
						location.href = "#/sync?groupId="+$stateParams.groupId
					}
				});
				return;
			}
			if (!Here.isLogin) {
				$ionicPopup.alert({
					title: '警告',
	          		content: '请先登录'
				}).then(function(res) {
					location.href = "#/login?referer=" + encodeURIComponent(location.hash);
				});
				return;
			}

			
			var loading = $ionicLoading.show({
		      content: '同步中...',
		    });
			var me = this;
			Utils.NATIVE.uploadPhoto(Here.serverAddress + '&c=api&a=upload', this.item.img, {
				groupId : $stateParams.groupId,
				longitude : this.item.longitude,
				latitude : this.item.latitude,
				measurement : this.item.measurement,
				time : this.item.time,
				show : true
			}, function(result) {
				
				loading.hide();
				Utils.NATIVE.webdb.deleteById(me.item.id);
				me.item.offline = false;
				me.item.id = JSON.parse(result.response).data.photoId;

				$scope.$apply();

				
				//TODO 删除本地图片
			}, function() {
				$ionicPopup.alert({
					title: '警告',
	          		content: '同步失败'
				});
			});

		};
		
		function getAvatar(avatar) {
			var res;
			if (avatar == '') {
				res = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
			} else {
				res = Here.serverAddress + '&c=api&a=img&hash=' + avatar;
			}
			return res;
		}

		function convertNativePhoto(photo) {

			return {
				id : photo.id,
				nickname : "我的汇报",
				time : photo.time,
				offline : true,
				img : photo.filepath,
				my : true,
				likes:0,
				comments:0,
				latitude : photo.latitude,
				longitude : photo.lontitude,
				show:true,
				measurement : photo.width + "X" + photo.height,
				time:DateFormate(new Date(parseInt(photo.datetime)), "yyyy-MM-dd HH:mm:ss")
			};
		}

		function getNativeList(groupId, callback) {

			var res = [];

			var i = 0;

			Utils.NATIVE.webdb.getPictureByGroupId(groupId, function(arr) {
				if (arr.length == 0) {
					callback && callback([]);
				}
				arr.forEach(function(pic, index) {

					res.push(convertNativePhoto(pic));

					if (i == arr.length - 1) {
						callback && callback(res);
					}
					i++;

				});
			});

		}
		
		var LocalAlbumLoading = (function(){
			
			return {
				init:function(){
					Utils.NATIVE.webdb.getPictureById($stateParams.groupId, function(res) {
						var cover = res[0];
						var list  = [convertNativePhoto(cover)];
						$scope.cover = {
							id : $stateParams.groupId,
							name : cover.name || "未命名相册"
							
						};
						
						getNativeList(cover.id, function(res) {
							list = list.concat(res);
							$scope.list = list;
							$scope.loadingmore = false;
							$scope.$apply();
							$scope.$broadcast('scroll.refreshComplete');
						});
					});
				},
				moreDataCanBeLoaded: function(){

				},
				more:function(){
					
				}
			}
			
		})();

		var NetworkAlbumLoading = (function() {

			var myusername = Here.userInfo && Here.userInfo.username;

			function getList(arr, merge) {
				merge = merge || {};
				var res = [];
				arr.forEach(function(photo) {
					res.push(angular.extend({
						id : photo.id,
						nickname : photo.nickname,
						username : photo.username,
						time : photo.time,
						avatar : getAvatar(photo.avatar),
						comments : photo.comments,
						likes : photo.likes,
						liked : photo.liked,
						img : Here.serverAddress + '&c=api&a=img&hash=' + photo.hash,
						my : myusername === photo.username,
						show:true
					}, merge));

				});
				return res;
			}
				
			$scope.loadingmore = false;

			var inited = false;
			var currentPage = 1;
			var first = true;
			var isLoading = false;

			return {
				init : function() {
					isLoading = true;
					currentPage = 1;
					first = true;
					Here.api.get('/api/get_group', {
						groupId : groupId,
						page : currentPage
					}, {
						success : function(data) {
							var cover = {
								id : data.id,
								name : data.name,
								userId : data.userId
							};

							$scope.cover = cover;
							var list = getList(data.photos, {
								offline : false
							});
							getNativeList($stateParams.groupId, function(res) {
								list = res.concat(list);

								$scope.list = list;
								$scope.loadingmore = data.hasMore;
								$scope.$apply();

								$scope.$broadcast('scroll.refreshComplete');
								$scope.$broadcast('scroll.infiniteScrollComplete');

								currentPage = ++currentPage;

								setTimeout(function(){
					            	isLoading = false;
					            	inited = true;
					            }, 200);
					            first = false;
							});

						},
						error : function(data) {
							console.log(data);
							$scope.loadingmore = false;
							$scope.$apply();
							$scope.$broadcast('scroll.refreshComplete');
						}
					});
										
				},
				moreDataCanBeLoaded: function(){
					if(inited || first){
						return true;
					}

					return false;
				},
				more : function() {

					if (inited && $scope.loadingmore && !isLoading) {
						isLoading = true;
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
										isLoading = false;
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

		$scope.loading = (function() {
			var loading = $stateParams['native']=="true"?LocalAlbumLoading:NetworkAlbumLoading;
			return {
				init : loading.init,
				moreDataCanBeLoaded : loading.moreDataCanBeLoaded,
				more : loading.more
			}

		})();
		$scope.loading.init();

	});
})();
