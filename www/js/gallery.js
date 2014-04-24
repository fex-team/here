(function() {

	angular.module('gallery', ['ionic', 'hereApp.controllers', 'angular-gestures'])
	.controller('galleryLocalController', function($scope, $stateParams, $controller, $ionicActionSheet, $ionicPopup) {
		$scope.item_width = document.body.clientWidth / 2;
		$scope.onItemClick = function(id){
			location.href="#/detail?groupId="+id+"&native=true";
		}
		var groups = [];
		var webdb = Utils.NATIVE.webdb;
		var i = 0;
		webdb.getCover(function(res) {
			res.forEach(function(pic, index) {

				groups.push({
					id : pic.id,
					photo : pic.filepath,
					name : pic.name || "未命名相册"
				});
				i++;
				if (i == res.length) {
					$scope.groups = groups;
					$scope.$apply();
				}
			});

			
		});
		
		//test

			/*
			groups.push({
							id : "123123213",
							photo : "img/1.png",
							name : "112321321"
						});
						groups.push({
							id : "11",
							photo : "img/2.png",
							name : "112321321"
						});
			
						$scope.groups = groups;
						$scope.$apply();*/
			
			//test end

		var __hold = 0;

		function rename(index) {
			
			$ionicPopup.prompt({
				title : '重命名'
			}).then(function(res) {
				if(res){
					webdb.updateNameById(groups[index].id,res);
				
					groups[index].name = res;
				}
				
			});

		}

		function sync(index) {
			location.href = "#/sync?groupId="+groups[index].id;
		}

		function remove(index) {
			$ionicPopup.confirm({
				title : '删除',
				content : '确定要删除本相册吗?'
			}).then(function(res) {
				if (res) {
					groups.remove(index, index)
				}
			});

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
	}).controller('galleryNetworkController', function($scope, $ionicPopup, $element){
		$scope.groups = [];
		var loading = '<div class="position-loading">'+
                        '<div class="windows9">'+
                            '<div class="wBall" id="wBall_1">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_2">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_3">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_4">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_5">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        var loadingEl = angular.element(loading);
		$scope.item_width = document.body.clientWidth / 2;

		$element.append(loadingEl);
		Here.api.get('/api/get_group_by_username', {
					username : Here.userInfo.username
				}, {
					success : function(data) {
						loadingEl.remove();
						data.forEach(function(group){
							group.src = Here.serverAddress + '&c=api&a=img&hash=' + group.hash;
						});
						$scope.groups = data;
						$scope.$apply();
					},
					error : function(data) {
						loadingEl.remove();
						$scope.groups = null;
						$scope.$apply();
					}
				});
	}).controller('myGroupController', function($scope, $ionicPopup, $element){
		$scope.groups = [];
		var loading = '<div class="position-loading">'+
                        '<div class="windows9">'+
                            '<div class="wBall" id="wBall_1">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_2">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_3">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_4">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                            '<div class="wBall" id="wBall_5">'+
                                '<div class="wInnerBall"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        var loadingEl = angular.element(loading);
		$scope.item_width = document.body.clientWidth / 2;
		$element.append(loadingEl);
		Here.api.get('/api/get_collectGroup', {}, {
					success : function(data) {
						loadingEl.remove();
						data.forEach(function(group){
							group.src = Here.serverAddress + '&c=api&a=img&hash=' + group.hash;
						});
						$scope.groups = data;
						$scope.$apply();
					},
					error : function(data) {
						loadingEl.remove();
						$scope.groups = null;
						$scope.$apply();
					}
				});
	}).controller('gallery_header', function($scope) {
        $scope.back = [{
            type : 'button back-button button-icon icon ion-arrow-left-c',
            tap : function(e) {
                location.href = "#/sidemenu/zone";
            }
        }];
	})
})();
