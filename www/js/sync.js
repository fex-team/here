(function() {
	
	angular.module('syncModule', ['ionic', 'hereApp.controllers']).controller('syncController', function($rootScope, $stateParams,$scope,$location, $stateParams, $controller,$ionicSlideBoxDelegate) {
		$scope.item_width = document.body.clientWidth / 3;
		var groupId = $stateParams.groupId;
		$scope.listData = JSON.parse(sessionStorage.getItem("sync_group"+groupId));
		
		if(!$scope.listData){
			$scope.listData = (function(){
				var arr = [];
				for(var i = 1;i<10;i++){
					arr.push({
						id:i,
						photo:"img/1.png",
						selected:false
					});
				}
				return arr;
			})();
			
		}
		
		
		function getSelectLength(){
			var i = 0;
			$scope.listData.forEach(function(data){
				if(data.selected){
					i++;
				}
			});
			
			return i;
		}
		
		function getDataLength(){
			return $scope.listData.length;
		}
		

		
		$scope.syncRightButton = [{
			type : 'button  button-positive',
			tap : function(e) {
				sessionStorage.setItem("sync_group"+groupId,JSON.stringify($scope.listData));
				$location.path("sync_confirm");
			}
			
		}];
		
		$scope.$on('syncItemSelectChange',function(obj){
			
			$scope.syncRightButton[0].content="完成("+getSelectLength() + "/" + getDataLength()+")";
		});
		
		$scope.$emit('syncItemSelectChange'); 
		
		$scope.$on('syncDetailPosition',function(obj,index){
			var data = $scope.listData[index];
			$scope.slideCheck = data.selected;
			$scope.title=(index+1) + "/" + getDataLength();
		});
		$scope.$on('syncListProfile',function(){
			
			$scope.detail_state="";
			$scope.title="同步相册";
			$scope.$apply();
			
		});
		
		$scope.detail_state="";
		$scope.title="同步相册";
		
		$scope.$on('syncDetailProfile',function(obj,index){
			$scope.detail_state="active";
			$scope.$emit("syncDetailPosition",index);
			$ionicSlideBoxDelegate.update();
			
			$scope.slideBoxController.slide(index);
		});
		$scope.slideCheck = true;
		$scope.onSlideChange = function(){
			var index = $scope.slideBoxController.currentIndex();
			$scope.$emit("syncDetailPosition",index);
		}
		window.onpopstate = function(){
			if(/^\#\/sync[^_]/.test(location.hash)){
				$scope.$emit("syncListProfile");
			
			}
		}
		
		$scope.onSlideItemCheck = function(){
			var index = $scope.slideBoxController.currentIndex();
			var data = $scope.listData[index];
			data.selected = this.slideCheck;
			$scope.$emit('syncItemSelectChange'); 
		}
		
	}).controller('syncItemController', function($scope,$element,$location) {
		$scope.mask_visibility = "none";
		$scope.onItemClick = function(index){
			$location.hash("syncDetailProfile");
			$scope.$emit("syncDetailProfile",index);
		}
		$scope.onCheck = function() {
			
			
			$scope.$emit('syncItemSelectChange'); 

		}
	});
	
	angular.module('syncConfirmModule', ['ionic', 'hereApp.controllers']).controller('syncConfirmController', function($stateParams,$location, $scope,$ionicSlideBoxDelegate) {
		var groupId = $stateParams.groupId;
		$scope.listData = JSON.parse(sessionStorage.getItem("sync_group"+groupId));
	
		
		
		function getDataLength(){
			var i = 0;
			$scope.listData.forEach(function(item){
				if(item.selected){
					i++;
				}
			});
			
			return i;
		}
		
		$scope.$on('syncDetailPosition',function(obj,index){
			var data = $scope.listData[index];
			$scope.slideCheck = data.selected;
			$scope.detail_title=(index+1) + "/" + getDataLength();
		});
		
		
		
		$scope.onSlideChange = function(){
			var index = $scope.slideBoxController.currentIndex();
			$scope.$emit("syncDetailPosition",index);
		}
		
		
		
		$scope.$on('syncConfirmDetailProfile',function(obj,index){
			$scope.detail_state="active";
			$scope.$emit("syncDetailPosition",index);
			$ionicSlideBoxDelegate.update();
			
			$scope.slideBoxController.slide(index);
		});
		
		$scope.syncConfirmRightButton = [{
			type : 'button  button-positive',
			tap : function(e) {
				$location.path("sync_confirm");
			},
			content:"完成"
			
		}];
		
		$scope.syncConfirmDetailRightButton = [{
			type : 'button ion-ios7-camera-outline button-icon icon ion-ios7-trash-outline',
			tap : function(e) {
				var index = $scope.slideBoxController.currentIndex();
				$scope.listData[index].selected = false;
				$ionicSlideBoxDelegate.update();
				index = Math.max(0,index);
				setTimeout(function(){
					// $scope.slideBoxController.slide(0);	
				},100);
			}
			
		}];
		
		$scope.add = function(){
			history.back();
		}
		
		window.onpopstate = function(){
			if(/^\#\/sync_confirm/.test(location.hash)){

				$scope.detail_state = "";
				$scope.$apply();
			}
		}
		
		$scope.onItemClick = function(index){
			$location.hash("syncConfirmDetailProfile");
			$scope.$emit("syncConfirmDetailProfile",index);
		}
		
	});
	
	
})();
