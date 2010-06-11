/**
 * Q.hotkey Library
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */

/**
 * @example Q.hotkey.bind(combination, callback)
 * @desc bind shortcut combination (onkeydown)
 *
 * @example Q.hotkey.unbind(combination)
 * @desc unbind combination
 */

if (!Q) var Q = {};

Q.hotkey = (function() {

	/**
	 * массив комбинаций клавиш
	 * @private
	 */
	var a = [];

	/**
	 * массив callback функций
	 * @private
	 */
	var b = [];

	/**
	 * список специальных клавиш
	 * @private
	 */
	var g = {
		13: "enter",
		122: "f11",
		27: "esc"
	};

	return {

		/**
		 * создать хоткей
		 * @public
		 * @param {string} c комбинация клавиш
		 * @param {string} f функция
		 * @return {void|false}
		 */
		bind: function(c, f) {
			if (c && f) {
				a[c] = c.toLowerCase().split("+");
				b[c] = f;

				document.onkeydown = function(e) {
					e = e || window.event;
					var p = [], n = [], d;

					d = (e.keyCode) ? e.keyCode : e.which;

					d = (g[d])
						? g[d]
						: String.fromCharCode(d).toLowerCase();

					e.ctrlKey && p.push("ctrl");
					e.shiftKey && p.push("shift");
					e.altKey && p.push("alt");

					p.length > 1 && p.sort();

					p.push(d);

					var h = p.toString().replace(/\,/g, "+");

					if (a[h]) {
						var k = a[h];
						for (var i = 0, m = 0, s = false; i < k.length; i++) {
							if (k[i] == "ctrl" || k[i] == "shift" || k[i] == "alt" ) m++;
							else if (m > 1 && !s && n.sort()) s = true;
							n.push(k[i]);
						}

						if (p.toString() == n.toString()) {
							b[h]();
							return false;
						}
					}

				}
			}
		},

		/**
		 * удалить хоткей
		 * @public
		 * @param {string} c комбинация клавиш
		 * @return {void}
		 */
		unbind: function(c) {
			if (a[c]) a[c] = null;
			if (b[c]) b[c] = null;
		}

	}

})();