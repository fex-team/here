(function() {

	angular.module('syncModule', ['ionic', 'hereApp.controllers']).controller('syncController', function($rootScope, $stateParams, $scope, $location, $stateParams, $controller, $ionicSlideBoxDelegate) {
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

	angular.module('syncConfirmModule', ['ionic', 'hereApp.controllers']).controller('syncConfirmController', function($rootScope, $stateParams, $location, $scope, $ionicSlideBoxDelegate) {
		
		$scope.screen_width = document.body.clientWidth;
		var groupId = $stateParams.groupId;
		$scope.listData = JSON.parse(sessionStorage.getItem("sync_group" + groupId));

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
				angular.element(document.querySelectorAll('#syncForm')[0]).scope().createAlbum(function(groupId){
					var photos = [];
					$scope.listData.forEach(function( photo ){
						photos.push({
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
				if(JSON.parse(result.response).no === 1){
					Utils.NATIVE.webdb.deleteById(photo.localId);
				}
				if(photos.length > 0){
					syncPhoto(groupId, photos);
				}else{
					alert('创建成功');
				}
			}, function() {
				if(photos.length > 0){
					syncPhoto(groupId, photos);
				}else{
					alert('创建成功');
				}
			});
		}


	}).controller('syncFormController', function($stateParams, $location, $scope, $ionicSlideBoxDelegate) {
		$scope.albumName = '';

		$scope.createAlbum = function(callback){
			console.log($scope.albumName);

			Here.api.post('/api/create_group', {
				'name' : $scope.albumName
			}, {
				success : function(data) {
					callback(data.id);
				},
				error : function(data) {
					alert('创建相册失败：' + data.message);
				}
			});
		}
	});

})();
