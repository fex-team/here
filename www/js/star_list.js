(function() {
	angular.module('starList', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('starListController', function($location,shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		var star_list = [];
		for(var i = 0;i<10;i++){
			star_list.push({
				id:"123",
				nick:"威廉萌",
				time:"04-19 18:50",
				photo:"img/1.png",
				img:"img/2.png"
			})
			
		}
		var loading = function(){
			
			var init = false;
			
			var more = false;
			
			return {
				init:function(){
					
				},
				more:function(){
					
				}
			}
		}
		loading.init();
		
		
		

	});
})();
