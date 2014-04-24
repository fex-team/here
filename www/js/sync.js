(function() {

var loading;
	angular.module('syncModule', ['ionic', 'hereApp.controllers']).controller('syncController', function($rootScope, $stateParams, $scope, $location, $stateParams, $controller, $ionicSlideBoxDelegate,$ionicLoading,$ionicPopup) {
		$scope.item_width = document.body.clientWidth / 3;
		$scope.screen_width = document.body.clientWidth;
		var groupId = $stateParams.groupId;
		// $scope.listData = JSON.parse(sessionStorage.getItem("sync_group"+groupId));
		var webdb = Utils.NATIVE.webdb;
		$scope.listData = [];
		webdb.getGroup(groupId, function(res) { 
			var group = [];
			res.forEach(function(pic) {
				group.push({
					id : pic.id,
					photo : pic.filepath,
					localId : pic.id,
					latitude : pic.latitude,
					longitude : pic.lontitude,
					time : window.DateFormate(new Date(parseInt(pic.datetime)), "yyyy-MM-dd HH:mm:ss"),
					measurement : pic.width + "X" + pic.height,
					selected : false
				})
			});
			$scope.listData = group;
			$scope.$apply();
		});

		function getSelectLength() {
			var i = 0;
			$scope.listData.forEach(function(data) {
				if (data.selected) {
					i++;
				}
			});

			return i;
		}

		function getDataLength() {
			return $scope.listData.length;
		}


		$scope.syncRightButton = [{
			type : 'button  button-positive',
			tap : function(e) {
				sessionStorage.setItem("sync_group" + groupId, JSON.stringify($scope.listData));
				$location.path("sync_confirm");
			}
		}];

		$scope.$on('syncItemSelectChange', function(obj) {

			$scope.syncRightButton[0].content = "完成(" + getSelectLength() + "/" + getDataLength() + ")";
		});

		$scope.$emit('syncItemSelectChange');

		$scope.$on('syncDetailPosition', function(obj, index) {
			var data = $scope.listData[index];
			$scope.slideCheck = data.selected;
			$scope.title = (index + 1) + "/" + getDataLength();
		});
		$scope.$on('syncListProfile', function() {

			$scope.detail_state = "";
			$scope.title = "同步相册";
			$scope.$apply();

		});

		$scope.detail_state = "";
		$scope.title = "同步相册";

		$scope.$on('syncDetailProfile', function(obj, index) {
			$scope.detail_state = "active";
			$scope.$emit("syncDetailPosition", index);
			$ionicSlideBoxDelegate.update();

			$scope.slideBoxController.slide(index);
		});
		$scope.slideCheck = true;
		$scope.onSlideChange = function() {
			var index = $scope.slideBoxController.currentIndex();
			$scope.$emit("syncDetailPosition", index);
		}
		window.onpopstate = function() {
			if (/^\#\/sync[^_]/.test(location.hash)) {
				$scope.$emit("syncListProfile");

			}
		}

		$scope.onSlideItemCheck = function() {
			var index = $scope.slideBoxController.currentIndex();
			var data = $scope.listData[index];
			data.selected = this.slideCheck;
			$scope.$emit('syncItemSelectChange');
		}
	}).controller('syncItemController', function($scope, $element, $location) {
		$scope.mask_visibility = "none";
		$scope.onItemClick = function(index) {
			$location.hash("syncDetailProfile");
			$scope.$emit("syncDetailProfile", index);
		}
		$scope.onCheck = function() {

			$scope.$emit('syncItemSelectChange');

		}
	});

	angular.module('syncConfirmModule', ['ionic', 'hereApp.controllers']).controller('syncConfirmController', function($rootScope, $stateParams, $location, $scope, $ionicSlideBoxDelegate,$ionicPopup) {
		
		$scope.screen_width = document.body.clientWidth;
		var groupId = $stateParams.groupId;
		$scope.listData = JSON.parse(sessionStorage.getItem("sync_group" + groupId));

		$scope.group = {};

		function getDataLength() {
			var i = 0;
			$scope.listData.forEach(function(item) {
				if (item.selected) {
					i++;
				}
			});

			return i;
		}


		$scope.$on('syncDetailPosition', function(obj, index) {
			var data = $scope.listData[index];
			$scope.slideCheck = data.selected;
			$scope.detail_title = (index + 1) + "/" + getDataLength();
		});

		$scope.onSlideChange = function() {
			var index = $scope.slideBoxController.currentIndex();
			$scope.$emit("syncDetailPosition", index);
		}

		$scope.$on('syncConfirmDetailProfile', function(obj, index) {
			$scope.detail_state = "active";
			$scope.$emit("syncDetailPosition", index);
			$ionicSlideBoxDelegate.update();

			$scope.slideBoxController.slide(index);
		});

		$scope.syncConfirmRightButton = [{
			type : 'button  button-positive',
			tap : function(e){
				angular.element(document.querySelectorAll('#syncForm')[0]).scope().createAlbum(function(groupId, groupName){

					$scope.group.id = groupId;
					$scope.group.name = groupName;

					var photos = [];
					$scope.listData.forEach(function( photo ){
						photo.selected && photos.push({
							localId: photo.id,
							latitude: photo.latitude,
							longitude: photo.longitude,
							filepath: photo.photo,
							measurement: photo.measurement
						});
					});
					syncPhoto(groupId, photos);
				});
				$location.path("sync_confirm");
			},
			content : "完成"

		}];

		$scope.syncConfirmDetailRightButton = [{
			type : 'button ion-ios7-camera-outline button-icon icon ion-ios7-trash-outline',
			tap : function(e) {
				var index = $scope.slideBoxController.currentIndex();
				$scope.listData[index].selected = false;
				$ionicSlideBoxDelegate.update();
				index = Math.max(0, index);
				setTimeout(function() {
					// $scope.slideBoxController.slide(0);
				}, 100);
			}
		}];

		$scope.add = function() {

			history.back();
		}

		window.onpopstate = function() {
			if (/^\#\/sync_confirm/.test(location.hash)) {

				$scope.detail_state = "";
				$scope.$apply();
			}
		}

		$scope.onItemClick = function(index) {
			$location.hash("syncConfirmDetailProfile");
			$scope.$emit("syncConfirmDetailProfile", index);
		}

		function syncPhoto(groupId, photos){
			var photo = photos.shift();
			console.log(photo);
			
			Utils.NATIVE.uploadPhoto(Here.serverAddress + '&c=api&a=upload', photo.filepath, {
				groupId : groupId,
				longitude : photo.longitude,
				latitude : photo.latitude,
				measurement : photo.measurement,
				// direction : this.photo.direction,
				time : photo.time
			}, function(result) {
				result = JSON.parse(result.response);
				if(result.no === 1){
					Utils.NATIVE.webdb.deleteById(photo.localId);

					// 更新相册封面
					if(!$scope.group.cover){
						Here.api.post('/api/update_group', {
							'groupId': groupId,
							'cover': result.data.photoId
						}, {
							success : function(data) {
								$scope.group.cover = result.data.photoId;
							},
							error : function(data) {
								loading.hide();
								$ionicPopup.alert({
			                        title: '错误',
			                        content: data.message
			                    });
							}
						});
					}
				}
				
				if(photos.length > 0){
					syncPhoto(groupId, photos);
				}else{
					loading.hide();
					// alert('创建成功');

					
					// 更新本地groupId
					Utils.NATIVE.webdb.updateGroupId(groupId, $stateParams.groupId);
					
					location.href = "#/gallery/network";
				}
			}, function() {
				if(photos.length > 0){
					syncPhoto(groupId, photos);
				}else{
					loading.hide();
					$ionicPopup.alert({
                        title: '通知',
                        content: '创建成功'
                    });
				}
			});
		}


	}).controller('syncFormController', function($stateParams, $location, $scope, $ionicSlideBoxDelegate,$ionicLoading,$ionicPopup) {
		$scope.albumName = '';
		
		$scope.createAlbum = function(callback){
			console.log($scope.albumName);
			loading = $ionicLoading.show({
		      content: '同步中...',
		    });
			Here.api.post('/api/create_group', {
				'name' : $scope.albumName
			}, {
				success : function(data) {
					callback(data.id, $scope.albumName);
				},
				error : function(data) {
					loading.hide();
					$ionicPopup.alert({
                        title: '错误',
                        content: '创建相册失败：' + data.message
                    });
				}
			});
		}
	});

})();
