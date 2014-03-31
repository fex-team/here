(function(win,doc) {

	function displayImage(file, img, onsuccess, onerror) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, onFail);

		function onFail(message) {
			alert('Failed because: ' + message);
		}

		function gotFS(fileSystem) {
			fileSystem.root.getFile(file, {
				create : true
			}, gotFileEntry, fail);
		}

		function gotFileEntry(fileEntry) {
			fileEntry.file(gotFile, fail);
		}

		function gotFile(file) {
			readDataUrl(file);
		}

		function readDataUrl(file) {
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				img.src = evt.target.result;
				onsuccess && onsuccess();
			};
			reader.readAsDataURL(file);
		}

		function fail(evt) {
			onerror && onerror(evt.code);
			console.log(evt.code);
		}

	}
	
	
	var NATIVE = {
		displayImage:displayImage
	}
	
	
	win.NATIVE = NATIVE;
	

})(window,document);

