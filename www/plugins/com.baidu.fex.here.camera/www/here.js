cordova.define("com.baidu.fex.here.camera.here", function(require, exports, module) { var exec = require("cordova/exec");

module.exports = {
	openCamera:function(maskUrl,onsuccess,onerror){
		cordova.exec(onsuccess, onerror, "Here", "camera", [{"maskUrl":maskUrl}]);
	}
}
});
