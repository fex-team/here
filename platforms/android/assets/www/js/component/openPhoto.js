(function(win){
	
	
	
	angular.module('component.openPhoto',[]).factory("$openPhoto",function(){
		
		var template = '<div class="openshare-box active"><div class=openshare-inner><div class=openshare-row><h1>设置头像</h1><ul><li class="capture">拍照上传<li class="loadGallery">从本地相册读取</ul></div><div class=openshare-row><div class=close>取消</div></div></div></div>';
		
		var $template = $(template);
		
		function hide(){
			$template.remove();
		}
		
		var _callback,_params;
		
		function capture(){
			navigator.camera.getPicture(_callback.onsuccess, _callback.onerror, { 
				quality: _params.quality||80,
			    destinationType: navigator.camera.DestinationType.DATA_URL,
			    targetWidth:_params.targetWidth||120,
			    targetHeight:_params.targetHeight||120,
			    allowEdit:true
			});
			
		}
		
		function loadGallery(){
			navigator.camera.getPicture(_callback.onsuccess, _callback.onerror, {
			    quality: _params.quality||80,
			    destinationType: navigator.camera.DestinationType.DATA_URL,
			    targetWidth:_params.targetWidth||120,
			    targetHeight:_params.targetHeight||120,
			    allowEdit:true,
			    sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
			});
			
			
			
		}
		
		$template.bind("click",function(){
			hide();
		});
		
		$template.find(".openshare-inner").bind("click",function(){
			return false;
		});
		
		$template.find(".capture").bind("click",function(){
			capture();
			hide();
		});
		
		$template.find(".loadGallery").bind("click",function(){
			loadGallery();
			hide();
		});
		
		$template.find(".close").bind("click",function(){
			hide();
		});
		
		function show(){
			$(document.body).append($template);	
		}
		
		return {
			
			show:function(params,callback){
				_callback = callback;
				_params = params;
				show();
			}
			
		}
		
	});
})(window);
