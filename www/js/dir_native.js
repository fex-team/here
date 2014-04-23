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
	}).directive("srcResize", function() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var src = attrs.srcResize;
				var ratio = window.devicePixelRatio || 1;
				setTimeout(function() {
					var width = $(element[0]).width() * ratio;

					var type = attrs.srcType || "img";
					if (type == "img") {
						element.attr("src", src + "&maxWidth=" + width);
					} else if (type == "background") {

						element.css({
							"background-image" : "url(" + src + "&maxWidth=" + width + ")"
						});

					}
				}, 50);

			}
		};
	}).directive("srcResize", function() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var src = attrs.srcResize;
				var ratio = window.devicePixelRatio || 1;
				setTimeout(function() {
					var width = $(element[0]).width() * ratio;

					var type = attrs.srcType || "img";
					if (type == "img") {
						element.attr("src", src + "&maxWidth=" + width);
					} else if (type == "background") {

						element.css({
							"background-image" : "url(" + src + "&maxWidth=" + width + ")"
						});

					}
				}, 50);

			}
		};
	}).directive("iframeSrc", function() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {

				function jump(url) {
					element[0].contentWindow.location.replace(url);
				}


				scope.$watch(attrs.iframeSrc, function(value) {

					jump(value);
				});

			}
		};
	});
})();
