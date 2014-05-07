(function() {
	angular.module('page', ['ionic', 'hereApp.controllers', 'component.openPhoto'])
	.controller('pageController', function($location, shareDialogAPI, $ionicActionSheet, $ionicPopup, $rootScope, $scope, $openPhoto, $stateParams, $controller) {


		Here.api.get('/api/get_photo', {
					hash : $stateParams.hash
				}, {
					success : function(photo) {
						photo['src'] = Here.serverAddress + '&c=api&a=img&hash=' + photo.hash ;

						if( photo.avatar == '' ){
							photo['avatar'] = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
						}else{
							photo['avatar'] = Here.serverAddress + '&c=api&a=img&hash=' + photo.avatar;
						}

						photo.likeed = 'likeed';

						$scope.photo = photo;
						commentLoading.init();
					},
					error : function(data) {
					}
				});




		$scope.pblishButton = [{
			type : ' ion-ios7-checkmark-outline button-icon ',
			tap : function(e) {
				$scope.onPublish();
			}
		}];
		
		$scope.onPublish = function(){

			var photoId = $scope.photo.id;
			var content = $scope.photo.newComment;

			if (content === '' || !content) {
				$ionicPopup.alert({
					title: '警告',
	          		content: '评论内容不能为空！'
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

			console.log('图片Id：' + photoId);
			console.log('评论内容：' + content);

			Here.api.post('/api/comment', {
					'photoId' : photoId,
					'content' : content
				}, {
					success : function(data) {
						var userInfo = JSON.parse(localStorage.getItem('here_userInfo'));

						$scope.commentList.unshift({
							avatar: userInfo.avatar ? Here.serverAddress + '&c=api&a=img&hash=' + userInfo.avatar : Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg',
							nickname : Here.userInfo.nickname,
							content : $scope.photo.newComment,
							time : '刚刚'
						});
						$scope.photo.comments = ++$scope.photo.comments;
						$scope.photo.newComment = '';
						$scope.$apply();
						$scope.switchTab("comment");
						history.back();
						setTimeout(function(){
							$scrollEl.scrollTop(342);
						},50);
					},
					error : function(data) {
						$ionicPopup.alert({
							title: '警告',
			          		content: data.message
						});
					}
				});
			
		}
		
		window.onpopstate = function() {
			
			if (/^\#\/page[^_]/.test(location.hash)) {
				$scope.showPblish = false;
				$scope.showPage = true;
				$scope.$apply();
			}
		}
		
		$scope.switchPblish = function(){
			$location.hash("page_pblish");
			$scope.showPblish = true;
			$scope.showPage = false;
			
		}

		$scope.openShare = function() {

			shareDialogAPI.open(false, this.photo.src);
		}

		$scope.onLike = function(){
			if(this.photo.likeed == "likeed"){
				$ionicPopup.alert({
					title: '警告',
	          		content: '您已赞过'
				});
				return;
			}
			
			if( !Here.isLogin ){
				$ionicPopup.alert({
					title: '警告',
	          		content: '请先登录'
				}).then(function(res) {
					location.href = "#/login?referer=" + encodeURIComponent(location.hash);
				});
				return;
			}
			var photoId = $scope.photo.id;
			Here.api.post('/api/like', {
				'photoId' : photoId
			}, {
				success : function(data) {
					var userInfo = JSON.parse(localStorage.getItem('here_userInfo'));

					$scope.likeList.unshift({
						avatar: userInfo.avatar ? Here.serverAddress + '&c=api&a=img&hash=' + userInfo.avatar : Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg',
						nickname : Here.userInfo.nickname,
						time : '刚刚'
					});
					$scope.photo.likes = ++$scope.photo.likes;
					$scope.switchTab("like");
					this.photo.likeed == "likeed";
					$scope.$apply();
				},
				error : function(data) {
					$ionicPopup.alert({
						title: '警告',
		          		content: data.message
					});
				}
			});

		}

		$scope.onCommentClick = function() {
			$ionicActionSheet.show({
				buttons : [{
					text : '回复'
				}, {
					text : '复制'
				}],
				titleText : '操作评论',
				cancelText : '取消',
				buttonClicked : function(i) {
					switch(i) {
						case 1:
							rename(index);
							break;
						case 0:
							sync(index);
							break;
					}

					return true;
				},
				cancel : function() {

				},
				destructiveButtonClicked : function() {
					remove(index);
					return true;
				}
			});
		};
		var $scrollEl = $("#page-page-scroll");

		var $fixedbar = $("#page-fixed-bar");

		var offset = {
			"like" : 0,
			"comment" : 0
		};

		var scrollTop = 0;

		$scope.switchTab = (function() {

			return function(tab) {

				if ($scope.showlist) {
					offset[$scope.showlist] = scrollTop;
				}

				var top = offset[tab];
				if (scrollTop < 342) {
					top = scrollTop;
				} else if (scrollTop > 342 && offset[tab] < 342) {
					top = 342;
				}

				if (tab == "like") {
					likeLoading.init();
				} else {
					commentLoading.init();
				}

				$scope.showlist = tab;
				setTimeout(function() {
					$scrollEl.scrollTop(top);
				}, 20);

			}
		})();

		function loadingMore() {
			if ($scope.showlist == "comment" && $scope.showCommentLoading) {
				commentLoading.more();
			}
			if ($scope.showlist == "like" && $scope.showLikeLoading) {
				likeLoading.more();
			}
		}


		$scope.showlist = "comment";

		var commentLoading = (function() {
			var init = false;
			var moreLoading = false;
			return {
				"init" : function() {
					if (!init) {
						init = true;

						Here.api.get('/api/get_comments', {
								photoId : $scope.photo.id
							}, {
								success : function(comments) {
									comments.forEach(function(comment){
										if( comment.avatar == '' ){
											comment['avatar'] = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
										}else{
											comment['avatar'] = Here.serverAddress + '&c=api&a=img&hash=' + comment.avatar;
										}
									});
									$scope.commentList = comments;
									$scope.showCommentLoading = false;
									$scope.$apply();

								},
								error : function(data) {
								}
							});
					}

				},
				"more" : function() {
					if (!moreLoading) {
						console.info("more");
						moreLoading = true;
						setTimeout(function() {
							var commentList = [];
							for (var i = 0; i < 5; i++) {
								commentList.push({
									id : "123",
									name : "more" + i,
									content : "more" + i,
									photo : "img/1.png",
									time : "05-03 23:33"
								});
							}
							$scope.showCommentLoading = false;
							$scope.commentList = $scope.commentList.concat(commentList);
							$scope.$apply();
						}, 2000);
					}

				}
			}

		})();

		var likeLoading = (function() {
			var init = false;
			var moreLoading = false;
			return {
				"init" : function() {
					if (!init) {
						init = true;

						Here.api.get('/api/get_likes', {
								photoId : $scope.photo.id
							}, {
								success : function(likes) {
									likes.forEach(function(like){
										if( like.avatar == '' ){
											like['avatar'] = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
										}else{
											like['avatar'] = Here.serverAddress + '&c=api&a=img&hash=' + like.avatar;
										}
									});
									$scope.likeList = likes;
									$scope.showLikeLoading = false;
									$scope.$apply();

								},
								error : function(data) {
								}
							});
					}

				},
				"more" : function() {
					if (!moreLoading) {
						moreLoading = true;
						setTimeout(function() {
							var likeList = [];
							for (var i = 0; i < 5; i++) {
								likeList.push({
									id : "123",
									name : "more" + i,
									photo : "img/1.png",
								});
							}
							$scope.showLikeLoading = false; $scope.likeList = $scope.likeList.concat(likeList);
							$scope.$apply();
						}, 2000);

					}

				}
			}

		})();

		var $view = $("#page-page-view");

		$scrollEl.bind("scroll", function() {
			scrollTop = $(this).scrollTop();
			if (scrollTop + $(this).height() > $view.height()) {
				loadingMore();
			}
		});

	});
})();
