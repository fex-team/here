(function(win, doc) {

	function displayImage(file, img, onsuccess, onerror) {
		getImageData(file,function(base64){
			img.src = base64;
			onsuccess && onsuccess();
		},onerror)
		
	};
	
	function getImageData(file,onsuccess,onerror){
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
				onsuccess && onsuccess(evt.target.result);
			};
			reader.readAsDataURL(file);
		}

		function fail(evt) {
			onerror && onerror(evt.code);
			console.log(evt.code);
		}
	}

	var webdb = function() {

		function values(obj) {
			var vals = [];
			for (var key in obj ) {
				if (obj.hasOwnProperty(key)) {
					vals.push('"' + obj[key] + '"');
				}
			}
			return vals;
		}

		var webdb = {};

		webdb.db = null;
		webdb.open = function() {
			var dbSize = 5 * 1024 * 1024;
			webdb.db = openDatabase("Here", "1", "Todo manager", dbSize);
		};
		webdb.onError = function(tx, e) {
			console.info(e);
		};
		webdb.onSuccess = function(tx, r) {
			// console.info("intert ok");
		};
		webdb.createTable = function() {
			var db = webdb.db;
			var table_picture = "CREATE TABLE IF NOT EXISTS `picture` ( `id` varchar(255) NOT NULL, `groupId` varchar(255) DEFAULT NULL, `sensorX` float DEFAULT NULL, `sensorY` float DEFAULT NULL, `sensorZ` float DEFAULT NULL, `datetime` datetime DEFAULT NULL, `latitude` double DEFAULT NULL, `lontitude` double DEFAULT NULL, `radius` double DEFAULT NULL, `orientation` int(11) DEFAULT NULL, `width` int(11) DEFAULT NULL, `height` int(11) DEFAULT NULL, `filepath` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`));"
			db.transaction(function(tx) {
				tx.executeSql(table_picture, [], webdb.onSuccess, webdb.onError);
			});
		};

		webdb.addPicture = function(picture) {

			picture.id = +new Date;
			var db = webdb.db;
			db.transaction(function(tx) {
				var sql = "INSERT INTO picture(" + Object.keys(picture).join(',') + ") VALUES (" + values(picture).join(',') + ")";

				tx.executeSql(sql, [], webdb.onSuccess, webdb.onError);
			});
		}
		function renderRs(tx, rs) {
			var res = [];
			for (var i = 0; i < rs.rows.length; i++) {
				res.push(rs.rows.item(i));
			}
			return res;
		}


		webdb.getAllPictures = function(callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture", [], function() {
					callback(renderRs.apply(this, arguments));
				}, webdb.onError);
			});
		}

		webdb.getPictureById = function(id, callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture where id = ?", [id], function() {
					callback(renderRs.apply(this, arguments));
				}, webdb.onError);
			});
		}
		
		webdb.getPictureByGroupId = function(groupId, callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture where groupId = ?", [groupId], function() {
					callback(renderRs.apply(this, arguments));
				}, webdb.onError);
			});
		}

		webdb.getPictureByPage = function(offset, limit, callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture limit ?,?", [offset, limit], function() {
					callback(renderRs.apply(this, arguments));
				}, webdb.onError);
			});
		}

		webdb.init = function() {
			this.open();
			this.createTable();
		};

		webdb.init();

		return webdb;
	}();

	win.Utils = win.Utils || {};

	var camera = (function() {
		var started = false;
		var _group_id,_picArray,_callback,_result;
		return {
			start : function(group_id,picArray,callback) {
				_callback = callback;
				_picArray = picArray;
				if (picArray) {
					localStorage.setItem("maskPicArray", JSON.stringify(picArray));
				}else{
					localStorage.removeItem("maskPicArray");
				}
				_group_id = group_id;
				if (!started) {
					started = true;
					var host = window.location.host;
					window.here.openCamera("http://" + host + "/mask.html", function(a) {
						a = eval("(" + a + ")");
						if (group_id) {
							a.groupId = group_id;
						}
						_result = a;
						_callback&&_callback(a);
						started = false;
					}, function() {

					});
				}
			},
			getResult:function(){
				return _result;
			},
			getGroupId : function(){
				return _group_id;
			},
			restart:function(){
				this.start(_group_id,_picArray,_callback);
			}
		}

	})();

	win.Utils.NATIVE = {
		getImageData:getImageData,
		displayImage : displayImage,
		webdb : webdb,
		camera : camera
	};

})(window, document);
