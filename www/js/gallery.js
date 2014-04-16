(function() {
	
	angular.module('gallery', ['ionic', 'hereApp.controllers', 'angular-gestures']).controller('galleryNetworkController', function($scope, $stateParams, $controller, $ionicActionSheet,$ionicPopup) {
		var groups = [];
		var webdb = Utils.NATIVE.webdb;
		var i = 0;
		webdb.getCover(function(res) {
			res.forEach(function(pic, index) {

				Utils.NATIVE.getImageData(pic.filepath, function(base64) {

					groups.push({
						id : pic.id,
						photo : base64,
						name : "未命名相册"
					});
					i++;
					if (i == res.length) {
						$scope.groups = groups;
						$scope.$apply();
					}
				});

			});

			//test
			groups.push({
				id : "123123213",
				photo : "img/1.png",
				name : "未命名相册1"
			});
			groups.push({
				id : "11",
				photo : "img/2.png",
				name : "未命名相册2"
			});
			
			$scope.groups = groups;
			$scope.$apply();
			//test end
		});

		var __hold = 0;

		function rename(index) {

			$ionicPopup.prompt({
				title : '重命名'
			}).then(function(res) {
				//TODO update database
				groups[index].name = res;
			});

		}

		function sync(index) {

		}
		
		function remove(index){
			groups.remove(index,index)
		}


		$scope.holdGesture = function(event, index) {
			__hold++;
			if (__hold == 2) {
				$ionicActionSheet.show({
					buttons : [{
						text : '同步'
					}, {
						text : '重命名'
					}],
					destructiveText : '删除',
					titleText : '操作相册',
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
				__hold = 0;
			}

		}
	});
})();
