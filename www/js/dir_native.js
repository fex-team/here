(function() {
	angular.module('nativeDirective', []).directive('nativeSrc', function() {

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
				
				setTimeout(function() {
					var width = attrs.nativeSrcWidth || $(element[0]).width();
					var height = attrs.nativeSrcHeight || $(element[0]).height();

					var type = attrs.nativeSrcType || "img";
					getBase64(attrs.nativeSrc, width, height, function(base64) {

						if (type == "img") {
							element.attr("src", base64);
						} else if (type == "background") {

							element.css({
								"background-image" : "url(" + base64 + ")"
							});

						}

					});
				}, 50);

			}
		};
	});
})();
