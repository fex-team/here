(function() {

	angular.module('nativeDirective', []).directive('nativeSrc', function($timeout) {

		function getBase64(file, width, height, callback) {
			/*
			 Utils.NATIVE.getImageData(file,callback,function(){
			 console.error("loadError"+e);
			 });*/

			resizeImage.load(file, width, height, callback, function() {

			});

			// callback&&callback("http://www.baidu.com/img/bdlogo.gif");
		}

		return {
			restrict : 'A',
			link : function(scope, element, attrs) {

				
				$timeout(function() {
					
					var width = attrs.nativeSrcWidth || $(element[0]).width();
					var height = attrs.nativeSrcHeight || $(element[0]).height();

					var type = attrs.nativeSrcType || "img";
					(function(el){
						
						getBase64(attrs.nativeSrc, width, height, function(base64) {

							if (type == "img") {
								el.attr("src", base64);
							} else if (type == "background") { 
							
								
								el.css("background-image","url(" + base64 + ")");
							}
	
						});
					})(element);
					
				});

			}
		};
	}).directive("srcResize", function($timeout) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var src = attrs.srcResize;
				var ratio = window.devicePixelRatio || 1;
				$timeout(function() {
					var width = $(element[0]).width() * ratio;

					var type = attrs.srcType || "img";
					if (type == "img") {
						element.attr("src", src + "&maxWidth=" + width);
					} else if (type == "background") {

						element.css({
							"background-image" : "url(" + src + "&maxWidth=" + width + ")"
						});

					}
				});

			}
		};
	}).directive("iframeSrc", function() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {

				function jump(url) {
				
					if(!url){
						url = "about:blank";
					}
					element[0].contentWindow.location.replace(url);
				}


				scope.$watch(attrs.iframeSrc, function(value) {

					jump(value);
				});

			}
		};
	});
})();
