cordova.define("com.baidu.fex.here.share", function(require, exports, module) {

	function getBase64FromImageUrl(URL) {
		var img = new Image();
		img.src = URL;
		img.onload = function() {

			var canvas = document.createElement("canvas");
			canvas.width = this.width;
			canvas.height = this.height;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0);

			var dataURL = canvas.toDataURL("image/png");

			dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

		}
	}


	module.exports = {
		wechat : function(data, scene) {
			debugger;
			var type;
			if (/^http:\/\//.test(data)) {
				type = "datauri";
				data = getBase64FromImageUrl(data);
			}else{
				type = "file";
			}

			cordova.exec(function() {
			}, function() {
			}, "com.baidu.fex.here.share", "wechat", [{
				"type" : type,
				"data" : data,
				"scene" : scene
			}]);
		},
		WECHAT_SCENE : {
			session : 0,
			timeline : 1
		}
	}

});
