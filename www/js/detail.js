(function() {

	var groups;
	
	function getNativePhoto(groupId,callback){
		
		var res = [];
		
		var i = 0;
		var name = Here.userInfo ? Here.userInfo.nickname : "时光相机用户";
		Utils.NATIVE.webdb.getPictureByGroupId(groupId,function(arr){
			if(arr.length == 0){
				callback && callback([]);
			}
			arr.forEach(function(pic,index){
				
				Utils.NATIVE.getImageData(pic.filepath,function(base64){
					res.push({
						commentShow:false,
						id:pic.id,
						latitude:pic.latitude,
						longitude:pic.lontitude,
						nickname:name,
						src:base64,
						time:pic.datetime,
						measurement:pic.width+"X"+pic.height,
					});
					
					if(i == arr.length-1){
						callback && callback(res);
					}
					i++;
				});
				
				
			});
		});
		/*commentShow: false
comments: "3"
direction: null
environment: null
follows: "2"
hash: "/jianling/3432a67ad8b528dbb95e03ea5ee372d9.jpg"
id: "25"
latitude: ""
longitude: ""
measurement: "950X604"
nickname: "chengyang"
src: "http://hereend.duapp.com/here/?m=here&c=api&a=img&hash=/jianling/3432a67ad8b528dbb95e03ea5ee372d9.jpg"
time: "2014-04-01 20:05:26"
username: "jianling"*/

	}

	angular.module('detail', ['ionic', 'hereApp.controllers','capture']).controller('DetailHeaderController', function($scope, $stateParams,$controller ) {
	
		$scope.detailCamera = [{
			type : 'button ion-ios7-camera-outline button-icon icon',
			tap : function(e) {
				var arr = [];
				groups.photos.forEach(function(photo,index){
					arr.push(photo.src);
				});
				
				Utils.NATIVE.camera.start($stateParams.groupId,arr,function(a){
					Utils.NATIVE.webdb.addPicture(a);
					location.reload();
					// location.href="#/capture_confirm";
				});
			}
		}]
	}).controller('DetailController', function($scope, $stateParams) {
		
		Here.api.get('/api/get_group', {
			groupId : $stateParams.groupId
		}, {
			success : function(data) {
				data.photos.forEach(function(photo, index) {
					photo['src'] = Here.serverAddress + '&c=api&a=img&hash=' + photo.hash;
					photo.commentShow = false;
				});
				
				getNativePhoto($stateParams.groupId,function(res){
					data.photos = res.concat(data.photos);
					groups = data;
					$scope.group = data;
					$scope.$apply();
					angular.element(document.querySelector('#detail-header')).find('h1').html(data.name);
				});
				
				
			},
			error : function(data) {
				console.log(data);
			}
		});

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
		$scope.doFollow = function() {
			//TODO 先判断登录状态
			var photoId = this.photo.id;
			Here.api.post('/api/follow', {
				'photoId' : photoId
			}, {
				success : function(data) {
					$scope.group.photos.forEach(function(photo) {
						if (photoId === photo.id) {
							photo.follows = ++photo.follows;
						}
					});
					$scope.$apply();
				},
				error : function(data) {
					alert(data.message);
				}
			});
		};

	}).controller('CommentController', function($rootScope, $scope, $element) {

		$scope.submitComment = function() {
			var photoId = $element.find('input').attr('data-photoId');

			if ($scope.commentContent === '' || !$scope.commentContent) {
				alert('评论内容不能为空！');
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
							photo.commentItems.push({
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
					alert(data.message);
				}
			});

		}
	});
})(); 