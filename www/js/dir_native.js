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
					(function(el) {

						getBase64(attrs.nativeSrc, width, height, function(base64) {

							if (type == "img") {
								el.attr("src", base64);
							} else if (type == "background") {

								el.css("background-image", "url(" + base64 + ")");
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

					if (!url) {
						url = "about:blank";
					}
					element[0].contentWindow.location.replace(url);
				}


				scope.$watch(attrs.iframeSrc, function(value) {

					jump(value);
				});

			}
		};
	}).directive("scrollFix", function($window, $timeout) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {

				var id = attrs['scrollFix'];
				var el;
				if (id) {
					el = $(id);
				} else {
					el = $(window);
				}
				var $element = $(element[0]);
				var $next = $element.next();
				var top = $element.offset().top+$element.height();
				el.bind("scroll", function() {
					var _top = $(this).scrollTop();
					if (_top > top) {
						if (!$element.hasClass("fixed")) {
							$element.addClass("fixed").appendTo("#page-page-content");
						}

					} else {
						$next.before($element.removeClass("fixed"));
					}

				});

			}
		};
	})
})();
