(function(win) {

	angular.module('component.shareDialog', []).directive('shareDetailDialog', function() {
		return {
			restrict : 'E',
			scope : {},
			controller : function($scope, $element, $sce,shareDetailDialogAPI) {
				
				
				
				$element.find("iframe")[0].onload = function(){
					
					$scope.api.loading = false;
					$scope.$apply();
				}
			
				$scope.api = shareDetailDialogAPI;
				
			},
			templateUrl : 'templates/component/share_detail_dialog.html',
			replace : true
		}
	}).factory('shareDetailDialogAPI',function(){
		return {
			show:false,
			url:"",
			loading:true,
			open:function(url){
				this.show = true;
				this.url = url;
				this.loading = true;
			}
		}
	}).factory('shareDialogAPI',function(){
		return {
			show:false,
			isNative:false,
			pic:"",
			open:function(isNative,pic){
				this.show = true;
				this.pic = pic;
				this.isNative = isNative;
			}
		}
	}).directive('shareDialog', function() {
		return {
			restrict : 'E',
			scope : {
				isNative:"@",
				pic:"@"
			},
			//http://widget.renren.com/dialog/share?resourceUrl=http%3A%2F%2Fdev.renren.com%2Fwebsite%2F%3Fwidget%3Drrshare%26content%3Duse&images=http%3A%2F%2Fdev.renren.com%2Fimg%2Frrshare_chrome_drag.png&charset=UTF-8
			controller : function($scope, $element, $sce,shareDialogAPI,shareDetailDialogAPI) {
				
				$scope.api = shareDialogAPI;
				$scope.shareWechat = function(sence){
					nativeshare.wechat(this.api.pic,sence);
				};
				$scope.shareWeibo = function(){
					var pic = this.api.pic;
					var params = ["url="+escape(location.href),"type=button","language=zh_cn","appkey=waEVb","title=我在分享了一张图片","searchPic=true","style=number"];
					params.push("pic="+escape(pic));
					var src = "http://service.weibo.com/share/share.php?"+params.join("&");
					shareDetailDialogAPI.open(src);
				}
				$scope.shareTecent = function(){
					var pic = this.api.pic;
					var params = ["appkey=801498973","title=我分享","url="+escape(location.href),"pic="+escape(pic)];
					
					var src = "http://share.v.t.qq.com/index.php?c=share&a=index&f=f1&"+params.join("&");
					shareDetailDialogAPI.open(src);
				}
				
			},
			templateUrl : 'templates/component/share_dialog.html',
			link : function(scope, element, attrs) {
				
			},
			replace : true
		}
	});

})(window);
