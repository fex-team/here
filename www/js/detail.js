(function() {
	var formate = function( date, fmt ) {         
	    var o = {         
	    "M+" : date.getMonth()+1, //月份         
	    "d+" : date.getDate(), //日         
	    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
	    "H+" : date.getHours(), //小时         
	    "m+" : date.getMinutes(), //分         
	    "s+" : date.getSeconds(), //秒         
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度         
	    "S" : date.getMilliseconds() //毫秒         
	    };         
	    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;
	};

	// hack
	window.DateFormate = formate;

	var groups;

	function convertPhoto(pic) {
		var name = Here.userInfo ? Here.userInfo.nickname : "时光相机用户";
		return {
			offline : true,
			commentShow : false,
			localId : pic.id,
			latitude : pic.latitude,
			longitude : pic.lontitude,
			nickname : name,
			src : pic.filepath,
			filepath : pic.filepath,
			type : "native",
			time : formate(new Date(parseInt(pic.datetime)), "yyyy-MM-dd HH:mm:ss"),
			measurement : pic.width + "X" + pic.height,
			show : true
		};
	}

	function getNativePhoto(groupId, callback) {

		var res = [];

		var i = 0;

		Utils.NATIVE.webdb.getPictureByGroupId(groupId, function(arr) {
			if (arr.length == 0) {
				callback && callback([]);
			}
			arr.forEach(function(pic, index) {

				res.push(convertPhoto(pic));

				if (i == arr.length - 1) {
					callback && callback(res);
				}
				i++;

			});
		});


		// test
		// res.push({
		// 	offline: true,
		// 	commentShow : false,
		// 	localId : 25,
		// 	latitude : '',
		// 	longitude : '',
		// 	filepath : '',
		// 	nickname : '时光相机用户',
		// 	src : 'http://172.22.72.159/end/here/?m=here&c=api&a=img&hash=/testuser/d5f54c6c1dc5eb8edd8bd18c232708e8.png',
		// 	time : formate(new Date(Date.now()), "yyyy-MM-dd HH:mm:ss"),
		// 	measurement : 1024 + "X" + 768
		// });

		// callback && callback(res);
	}
	
	var $headerScope;
	
	
	

	angular.module('detail', ['ionic', 'hereApp.controllers']).controller('DetailHeaderController', function($scope, $stateParams, $controller, $ionicPopup) {

		$scope.droplist = {
			visible : ""
		}
		
		angular.element(document.getElementById("sharelist")).bind("click",function(){

			$headerScope.sharelist.visible = "";
		}).children().bind("click",function(e){

			e.stopPropagation();
			return false;
		});
		
		$scope.shareWechat = function(sence){
			nativeshare.wechat($headerScope.path,sence);
		}
		

		angular.element(document).bind("click", function() {
			
			$scope.droplist.visible = "";
			$scope.$apply();
		});

		$scope.detailCamera = [{
			type : 'button ion-ios7-camera-outline button-icon icon',
			tap : function(e) {
				var arr = [];
				groups.photos.forEach(function(photo, index) {
					arr.push(photo.src);
				});

				Utils.NATIVE.camera.start($stateParams.groupId, arr, function(a) {
					location.href = "#/capture_confirm";
				});
			}
		}, {
			type : 'button ion-ios7-more button-icon icon',
			tap : function(e) {

				if ($scope.droplist.visible == "active") {
					$scope.droplist.visible = "";
				} else {
					$scope.droplist.visible = "active";
				}

				e.stopPropagation();
			}
		}]
		$scope.sharelist = {
			visible : ""
		}
		$scope.path = "";
		
		$headerScope = $scope;
	}).controller('DetailController', function($scope, $stateParams, $ionicPopup) {

		$scope.doRefresh = function() {
			if ($stateParams['native']) {

				Utils.NATIVE.webdb.getPictureById($stateParams.groupId, function(res) {
					var cover = res[0];
					var data = {
						id : $stateParams.groupId,
						name : cover.name,
						photos : [convertPhoto(cover)]
					};
					getNativePhoto(cover.id, function(res) {
						data.photos = res.concat(data.photos);

						groups = data;
						$scope.group = data;
						$scope.$apply();
						angular.element(document.querySelector('#detail-header')).find('h1').html(data.name);
						$scope.$broadcast('scroll.refreshComplete');
					});
				});

			} else {
				Here.api.get('/api/get_group', {
					groupId : $stateParams.groupId
				}, {
					success : function(data) {
						data.photos.forEach(function(photo, index) {
							photo['src'] = Here.serverAddress + '&c=api&a=img&hash=' + photo.hash;

							if( photo.avatar == '' ){
								photo['avatar'] = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
							}else{
								photo['avatar'] = Here.serverAddress + '&c=api&a=img&hash=' + photo.avatar;
							}
							photo.commentShow = false;
							photo.show = true;
						});

						getNativePhoto($stateParams.groupId, function(res) {
							data.photos = res.concat(data.photos);

							groups = data;
							$scope.group = data;
							$scope.$apply();
							angular.element(document.querySelector('#detail-header')).find('h1').html(data.name);
							$scope.$broadcast('scroll.refreshComplete');
						});

					},
					error : function(data) {
						console.log(data);
						$scope.$broadcast('scroll.refreshComplete');
					}
				});
			}

		}
		$scope.doRefresh();
		// 显示评论区域
		$scope.showComment = function() {
			var photoId = this.photo.id;

			$scope.group.photos.forEach(function(photo) {
				if (photoId === photo.id) {
					if (photo.commentItems == undefined) {
						Here.api.get('/api/get_comments', {
							photoId : photoId
						}, {
							success : function(data) {
								if( data != null ){
									data.forEach(function(comment){
										if( comment.avatar == '' ){
											comment['avatar'] = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
										}else{
											comment['avatar'] = Here.serverAddress + '&c=api&a=img&hash=' + comment.avatar;
										}
									});
								}
								$scope.group.photos.forEach(function(photo) {
									if (photoId === photo.id) {
										photo.commentItems = data || [];
									}
								});

								$scope.$apply();
							},
							error : function(data) {

							}
						});
					}//if

					photo.commentShow = !photo.commentShow;
				}//if
			});
		};

		// 关注照片
		$scope.doLike = function() {
			if( !Here.isLogin ){
				$ionicPopup.alert({
					title: '警告',
	          		content: '请先登录'
				});
				return;
			}
			var photoId = this.photo.id;
			Here.api.post('/api/like', {
				'photoId' : photoId
			}, {
				success : function(data) {
					$scope.group.photos.forEach(function(photo) {
						if (photoId === photo.id) {
							photo.likes = ++photo.likes;
						}
					});
					$scope.$apply();
				},
				error : function(data) {
					$ionicPopup.alert({
						title: '警告',
		          		content: data.message
					});
				}
			});
		};

		$scope.doDel = function() {
			// A confirm dialog
			var me = this;
			$ionicPopup.confirm({
				title : '删除',
				content : '你确认要删除该照片吗?'
			}).then(function(res) {
				if (res) {
					Utils.NATIVE.webdb.deleteById(me.photo.localId);
					me.photo.show = false;
				}
			});

		}
		// 同步照片
		$scope.doAsync = function() {
			var me = this;
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
				});
				return;
			}

			var me = this;

			console.log(this.photo);
			Utils.NATIVE.uploadPhoto(Here.serverAddress + '&c=api&a=upload', this.photo.filepath, {
				groupId : $stateParams.groupId,
				longitude : this.photo.longitude,
				latitude : this.photo.latitude,
				measurement : this.photo.measurement,
				direction : this.photo.direction,
				time : this.photo.time,
				show : true
			}, function(result) {
				me.photo.offline = false;
				me.photo.id = JSON.parse(result.response).data.photoId;

				$scope.$apply();

				Utils.NATIVE.webdb.deleteById(me.photo.localId);
				//TODO 删除本地图片
			}, function() {
				$ionicPopup.alert({
					title: '警告',
	          		content: '同步失败'
				});
			});

		};

		$scope.openShare = function() {
			
			$headerScope.path = this.photo.src;
			$headerScope.sharelist.visible = "active";

		};

	}).controller('CommentController', function($rootScope, $scope, $element, $ionicPopup) {

		$scope.doComment = function() {
			var photoId = this.photo.id;

			if ($scope.commentContent === '' || !$scope.commentContent) {
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
				});
				return;
			}

			console.log('图片Id：' + photoId);
			console.log('评论内容：' + $scope.commentContent);

			Here.api.post('/api/comment', {
				'photoId' : photoId,
				'content' : $scope.commentContent
			}, {
				success : function(data) {
					$scope.group.photos.forEach(function(photo) {
						if (photoId === photo.id) {

							var userInfo = JSON.parse(localStorage.getItem('here_userInfo'));

							photo.commentItems.push({
								avatar: userInfo.avatar ? Here.serverAddress + '&c=api&a=img&hash=' + userInfo.avatar : Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg',
								nickname : Here.userInfo.nickname,
								content : $scope.commentContent,
								time : '刚刚'
							});
							photo.comments = ++photo.comments;
						}
					});
					$scope.commentContent = '';
					$scope.$apply();
				},
				error : function(data) {
					$ionicPopup.alert({
						title: '警告',
		          		content: data.message
					});
				}
			});
		};
	}).controller('DropController', function($scope, $stateParams, $ionicPopup, $element){
		var groupId = $stateParams.groupId;
		var element = $element;
		$scope.collected = false;

		Here.api.get('/api/check_collect', {
							groupId : groupId
						}, {
							success : function(data) {
								$scope.collected = true;
								element.children().children()[0].innerHTML = '已收藏';
								$scope.$apply();
							},
							error : function(data) {

							}
						});

		$scope.openShare = function() {
			$headerScope.sharelist.visible = "active";
		};

		$scope.doCollect = function($event){
			if($scope.collected){
				return;
			}
			

			if(!Here.isLogin){
				$ionicPopup.alert({
					title: '警告',
	          		content: '您未登录'
				});
				return;
			}

			Here.api.post('/api/collect', {
				'groupId' : groupId
			}, {
				success : function(data) {
					$event.toElement.innerHTML = '已收藏';
					$scope.collected = true;
				},
				error : function(data) {
					$ionicPopup.alert({
						title: '警告',
		          		content: data.message
					});
				}
			});
		}
	});
})();
