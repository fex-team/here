(function() {

	var LazyLoad = (function() {
		var imgQueue = [];

		var height = $(window).height();

		var width = $(window).width();

		function removeItem(arr, item) {
			var i;
			while (( i = arr.indexOf(item)) !== -1) {
				arr.splice(i, 1);
			}
		}

		function loop() {
			for (var i = 0; i < imgQueue.length; ++i) {
				var item = imgQueue[i], offset = item.$img.offset();
				if (offset.width > 0 && offset.height > 0 && offset.top < height && offset.left < width) {
					item.callback(item.$img);
					imgQueue.splice(i--, 1);

				}
			}

		}

		setInterval(function() {
			loop();
			// console.info(imgQueue.length);
		}, 1000);

		return {

			addInQueue : function(item) {
				imgQueue.push(item);
			},
			removeFromQueue : function(item) {
				removeItem(imgQueue, item);
			}
		}

	})();

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
				var item = {
					$img : $(element[0]),
					callback : function($img) {
						var width = attrs.nativeSrcWidth || $img.width();
						var height = attrs.nativeSrcHeight || $img.height();

						var type = attrs.nativeSrcType || "img";
						(function(el) {

							getBase64(attrs.nativeSrc, width, height, function(base64) {

								if (type == "img") {
									el.attr("src", base64);
								} else if (type == "background") {

									el.css("background-image", "url(" + base64 + ")");
								}

							});
						})($img);
					}
				}
				LazyLoad.addInQueue(item);

				element.on('$destroy', function() {
					LazyLoad.removeFromQueue(item);
				});
			}
		};
	}).directive("srcResize", function($timeout,$sce) {

		function load($img, src,srcType) {
			var ratio = window.devicePixelRatio || 1;
			var width = $img.width() * ratio;

			var type = srcType || "img";
			if (type == "img") {
				$img.attr("src", src + "&maxWidth=" + width);
			} else if (type == "background") {

				$img.css({
					"background-image" : "url(" + src + "&maxWidth=" + width + ")"
				});

			}
		}

		return {
			restrict : 'A',
			link : function(scope, element, attrs) {

				var item = {
					$img : $(element[0]),
					callback : function($img) {

						load($img,attrs.srcResize,attrs.srcType);
						
						

					}
				};
				LazyLoad.addInQueue(item);

				element.on('$destroy', function() {
					LazyLoad.removeFromQueue(item);
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
				var top = $element.offset().top + $element.height();
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
	});
})();
