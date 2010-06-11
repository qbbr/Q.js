/**
 * Q.ajax Library
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */

/**
 * @example
 * var AJAX = new Q.ajax();
 * ajax.type = "json";
 * ajax.onSuccess = function() {...};
 * ajax.get("/path/to/json/");
 */

if (!Q) var Q = {};

(function(){

	/**
	 * @constructor
	 * @return {void}
	 */
	Q.ajax = function() {

		/**
		 * XMLHttp object
		 * @private
		 */
		var Obj = null;

		if (window.XMLHttpRequest) Obj = new XMLHttpRequest(); // Gecko, WebKit...
		else if (window.ActiveXObject) { // IE (Trident [MSHTML])
			try {
				Obj = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					Obj = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}

		return {

			/**
			 * type of data back from server
			 * @public
			 */
			type: "", // text|json

			/**
			 * callback function - ajax request is fail
			 * @public
			 * @param {int} error
			 */
			onFail: null,

			/**
			 * callback function - ajax request is success
			 * @public
			 * @param {string} data from server
			 */
			onSuccess: null,

			/**
			 * callback function - ajax start
			 * @public
			 */
			onStart: null,

			/**
			 * HTTP_GET request
			 * @public
			 * @param {string} url
			 */
			get: function(url) {
				this.ajax(url, null, "GET");
			},

			/**
			 * HTTP_POST request
			 * @public
			 * @param {string} url
			 * @param {obj} data
			 */
			post: function(url, data) {
				var p = [];
				for (var g in data) {
					p.push(g + "=" + encodeURIComponent(data[g])); // .replace(/%20/g, "+") - replace space on plus
				}
				this.ajax(url, p.join("&"), "POST");
			},

			/**
			 * request
			 * @public
			 * @param {string} url
			 * @param {obj} data
			 * @param {string} method [GET|POST]
			 */
			ajax: function(url, data, method) {
				if (Obj && url) {
					typeof this.onStart == "function" && this.onStart(); // on ajax start

					Obj.overrideMimeType && Obj.overrideMimeType("text/plain"); // or text/xml

					url += (url.indexOf("?") + 1 ? "&" : "?") + "timestamp=" + new Date().getTime(); // timestamp - fix IE bug (disable cache)

					Obj.open(method, url, true);

					if (method == "POST") {
						Obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						Obj.setRequestHeader("Content-length", data.length);
						Obj.setRequestHeader("Connection", "close");
					}

					(function(Obj, self) {
						Obj.onreadystatechange = function() {
							if (Obj.readyState == 4) {
								if (Obj.status == 200) {
									var a = Obj.responseText;
									if (self.type == "json" && a) a = eval("(" + a.replace(/[\r\n]/g, "") + ")"); // fix IE bug (\n)
									typeof self.onSuccess == "function" && self.onSuccess(a); // ajax is complite and success
								} else typeof self.onFail == "function" && self.onFail(Obj.status); // ajax is complite and fail
							}
						}
					})(Obj, this);

					Obj.send(data);
				}
			}

		}

	}

})();