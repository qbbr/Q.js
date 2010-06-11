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
		var o = null;

		if (window.XMLHttpRequest) o = new XMLHttpRequest(); // Gecko, WebKit...
		else if (window.ActiveXObject) { // IE (Trident [MSHTML])
			try {
				o = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					o = new ActiveXObject("Microsoft.XMLHTTP");
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
			 * @param {string} u
			 */
			get: function(u) {
				this.a(u, null, "GET");
			},

			/**
			 * HTTP_POST request
			 * @public
			 * @param {string} u
			 * @param {obj} d
			 */
			post: function(u, d) {
				var p = [];
				for (var g in d) {
					p.push(g + "=" + encodeURIComponent(d[g])); // .replace(/%20/g, "+") - replace space on plus
				}
				this.a(u, p.join("&"), "POST");
			},

			/**
			 * request
			 * @public
			 * @param {string} u
			 * @param {obj} d
			 * @param {string} m [GET|POST]
			 */
			a: function(u, d, m) {
				if (o && u) {
					typeof this.onStart == "function" && this.onStart(); // on ajax start

					o.overrideMimeType && o.overrideMimeType("text/plain"); // or text/xml

					u += (u.indexOf("?") + 1 ? "&" : "?") + "timestamp=" + new Date().getTime(); // timestamp - fix IE bug (disable cache)

					o.open(m, u, true);

					if (m == "POST") {
						o.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						o.setRequestHeader("Content-length", d.length);
						o.setRequestHeader("Connection", "close");
					}

					(function(o, s) {
						o.onreadystatechange = function() {
							if (o.readyState == 4) {
								if (o.status == 200) {
									var a = o.responseText;
									if (s.type == "json" && a) a = eval("(" + a.replace(/[\r\n]/g, "") + ")"); // fix IE bug (\n)
									typeof s.onSuccess == "function" && s.onSuccess(a); // ajax is complite and success
								} else typeof s.onFail == "function" && s.onFail(o.status); // ajax is complite and fail
							}
						}
					})(o, this);

					o.send(d);
				}
			}

		}

	}

})();