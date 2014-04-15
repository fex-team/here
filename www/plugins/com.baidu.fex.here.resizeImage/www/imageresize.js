cordova.define("com.baidu.fex.here.resizeImage.resizeImage", function(require, exports, module) { 

module.exports = {
	load:function(filepath,width,height,onsuccess,onerror){
		debugger;
		cordova.exec(function(base64){
			onsuccess && onsuccess("data:image/jpg;base64,"+base64);
		}, onerror, "com.baidu.fex.here.resizeImage.ImageResizePlugin", "load", [{"filepath":filepath,"width":width,"height":height}]);
	}
}



});
