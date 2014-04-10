(function() {
	angular.module('gallery', ['ionic', 'hereApp.controllers']).controller('galleryNetworkController', function($scope, $stateParams, $controller) {
		var groups = [];
		var webdb = Utils.NATIVE.webdb;
		var i = 0;
		webdb.getCover(function(res){
			res.forEach(function(pic,index){
				
				Utils.NATIVE.getImageData(pic.filepath, function(base64) {
					
					groups.push({
						photo:base64,
						name:"未命名相册"	
					});
					i++;
					if(i == res.length){
						$scope.groups = groups;	
						$scope.$apply();
					}
				});
								
			});
			
		});
		
		
		
	});
})();
