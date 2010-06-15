/**
 * Q.tabs Library
 *
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */

/**
 * @example
 * new Q.tabs(document.getElementById("tabs")).set();
 *
 * @example
 * var tab1 = new Q.tabs(document.getElementById("tabss"));
 * tab1.set(2);
 */

if (!Q) var Q = {};

(function() {

	/**
	 * @constructor
	 * @param {obj} elm tabs parent elm
	 * @return {void}
	 */
	Q.tabs = function(elm) {
		var l = elm.getElementsByTagName("ul")[0].getElementsByTagName("li");
		var r = [];

		for (var i = 0; i < l.length; i++) {
			var a = l[i].getElementsByTagName("a")[0];
			var h = a.href.replace(/.*\/(.*)/, "$1");
			
			if (h) {
				var c = document.getElementById(h);
				if (!c) continue;

				r.push(c);

				(function(i) {
					a.onclick = function() {
						set(i);
						return false;
					}
				})(i);
			}
		}

		/**
		 * set tab
		 * @private
		 * @param {int} n tab number
		 * @return {void}
		 */
		var set = function(n) {
			n = n || 0;

			for (var i = 0; i < r.length; i++) {
				if (i == n) {
					r[i].style.display = "";
				} else {
					r[i].style.display = "none";
				}
			}
		};

		return {

			/**
			 * set tab
			 * @public
			 * @param {int} n tab number
			 * @return {void}
			 */
			set: function(n) {
				set(n);
			}

		}

	};

})();