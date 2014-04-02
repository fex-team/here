(function(win, doc) {

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

	};

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


		webdb.getAllPictures= function(callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture", [], function(){
					callback(renderRs.apply(this,arguments));
				}, webdb.onError);
			});
		}
		
		webdb.getPictureById = function(id,callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture where id = ?", [id], function(){
					callback(renderRs.apply(this,arguments));
				}, webdb.onError);
			});
		}
		
		webdb.getPictureByPage = function(offset,limit,callback) {
			var db = webdb.db;
			db.transaction(function(tx) {

				tx.executeSql("select * from picture limit ?,?", [offset,limit], function(){
					callback(renderRs.apply(this,arguments));
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

	var NATIVE = {
		displayImage : displayImage,
		webdb : webdb
	}

	win.NATIVE = NATIVE;

})(window, document);