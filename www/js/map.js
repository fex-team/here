(function() {

	var map = (function() {

		var map;

		function loadScript() {
			var script = document.createElement("script");
			script.src = "http://api.map.baidu.com/api?v=1.5&ak=hmPxdBHxPZvZU2x3RN9SSKGt&callback=_map_ready";
			document.body.appendChild(script);
		}

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

		var _callback;

		window._map_ready = function() {
			_callback && _callback();
		}

		return {
			ready : function(callback) {
				_callback = callback;
				loadScript();
			},
			init : function(el, point, callback) {
				map = new BMap.Map(el);

				map.centerAndZoom(point, 15);
				map.addEventListener("dragend", function() {

					callback && callback(getBounds());
				});
				map.addEventListener("resize", function() {

					callback && callback(getBounds());
				});
				callback && callback(getBounds());
			},
			clearOverlays : function() {
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
					//TODO 从地图API取地址
					// $scope.popup.city = obj.city;
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

	var addedGroup = {};

	angular.module("map", ['ionic', 'hereApp.controllers']).controller('map_display', function($scope, $element, $stateParams) {
		var position = $stateParams.position;
		var longitude = position.split(',')[0];
		var latitude = position.split(',')[1];
		map.ready(function() {
			map.init("map-container", new BMap.Point(longitude,latitude), function(bounds) {
				console.info(bounds);
				// map.clearOverlays();

				Here.api.get('/api/get_besides_cover', {
					position: (bounds.x1 + bounds.x2)/2 + ',' + (bounds.y1 + bounds.y2)/2
				}, {
                    success: function(data){
                    	if(!$.isArray(data)){
                    		return;
                    	}
                        data.forEach(function(group){
                        	if(addedGroup[group.id]){
                        		return;
                        	}
                            map.addMarker(group.name, new BMap.Point(parseFloat(group.longitude),parseFloat(group.latitude)), {
								album : group.name,
								// city : "北京",
								time : group.time.split(' ')[0],
								follow : group.count,
								url : 'detail?groupId=' + group.id,
								photo : Here.serverAddress + '&c=api&a=img&hash=' + group.hash
							}, $scope);

							addedGroup[group.id] = true;
                        });

                        $scope.$apply();
                    },
                    error: function(data){
                        
                    }
                });

			});
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

