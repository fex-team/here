(function() {

	var map = (function() {

		var map;

		function getBounds() {
			var bs = map.getBounds();
			var bssw = bs.getSouthWest();
			var bsne = bs.getNorthEast();

			var topLat = bsne.lat;
			var bottomLat = bssw.lat;
			var leftLng = bssw.lng;
			var rightLng = bsne.lng;
			return {
				x1 : leftLng,
				x2 : rightLng,
				y1 : topLat,
				y2 : bottomLat

			}
		}

		return {
			init : function(el, point, callback) {
				map = new BMap.Map(el);
				
				map.centerAndZoom(point, 15);
				map.addEventListener("dragend", function() {

					callback && callback(getBounds());
				});
				map.addEventListener("resize", function() {

					callback && callback(getBounds());
				});
				callback&&callback(getBounds());
			},
			clearOverlays:function(){
				map.clearOverlays();
			},
			/**
			 *
			 * @param {String} text 文本
			 * @param {Point} point 经纬度
			 * @param {Object} obj 对象，弹出 {album,city,follow,time}
			 * @param {$Scope} $scope
			 */
			addMarker : function(text, point, obj, $scope) {
				var myLabel = new BMap.Label("", {
					position : point,
					offset : new BMap.Size(-40, -32),
				});

				myLabel.setContent("<div class='map-maker'><p>" + text + "</p> <span class='map-maker-triangle'></span></div>");
				myLabel.setStyle({
					"background" : "none",
					"border" : "none"
				});

				myLabel.addEventListener("click", function() {
					$scope.popup.album = obj.album;
					$scope.popup.city = obj.city;
					$scope.popup.time = obj.time;
					$scope.popup.follow = obj.follow;
					$scope.popup.url = obj.url;
					$scope.popup.display = "block";
					$scope.popup.photo = obj.photo;
					$scope.popup.state = "popup-showing active";
					$scope.$apply();

				});

				map.addOverlay(myLabel);

			}
		}

	})();

	angular.module("map", ['ionic', 'hereApp.controllers']).controller('map_display', function($scope, $element) {

		map.init("map-container", new BMap.Point(116.404, 39.915), function(bounds) {
			console.info(bounds);
			map.clearOverlays();
			map.addMarker("天安门广场", new BMap.Point(116.404, 39.915), {
				album : "天安门广场",
				city : "北京",
				time : "2014-03-02",
				follow : "10",
				url : "detail",
				photo : "http://img.51766.com/tamcl/1175499862824.jpg"
			}, $scope);

			map.addMarker("中南海", new BMap.Point(116.414, 39.925), {
				album : "中南海",
				city : "北京",
				time : "2014-03-02",
				follow : "1",
				url : "detail",
				photo : "http://img.51766.com/tamcl/1175499862824.jpg"
			}, $scope);
		});

		$scope.closePopup = function() {
			$scope.popup = {
				"display" : "none",
				"state" : ""
			}

		}

		$scope.closePopup();

	});
})();

