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
	var _key = [];

	/**
	 * массив callback функций
	 * @private
	 */
	var _callback = [];

	/**
	 * список специальных клавиш
	 * @private
	 */
	var _specKey = {
		13: "enter",
		122: "f11",
		27: "esc"
	};

	return {

		/**
		 * создать хоткей
		 * @public
		 * @param {string} combination комбинация клавиш
		 * @param {string} callback функция
		 * @return {void|false}
		 */
		bind: function(combination, callback) {
			if (combination && callback) {
				_key[combination] = combination.toLowerCase().split("+");
				_callback[combination] = callback;

				document.onkeydown = function(e) {
					e = e || window.event;
					var press = [], need = [], code;

					code = (e.keyCode) ? e.keyCode : e.which;

					code = (_specKey[code])
						? _specKey[code]
						: String.fromCharCode(code).toLowerCase();

					e.ctrlKey && press.push("ctrl");
					e.shiftKey && press.push("shift");
					e.altKey && press.push("alt");

					press.length > 1 && press.sort();

					press.push(code);

					var press_str = press.toString().replace(/\,/g, "+");

					if (_key[press_str]) {
						var key = _key[press_str];
						for (var i = 0, m = 0, s = false; i < key.length; i++) {
							if (key[i] == "ctrl" || key[i] == "shift" || key[i] == "alt" ) m++;
							else if (m > 1 && !s && need.sort()) s = true;
							need.push(key[i]);
						}

						if (press.toString() == need.toString()) {
							_callback[press_str]();
							return false;
						}
					}

				}
			}
		},

		/**
		 * удалить хоткей
		 * @public
		 * @param {string} combination комбинация клавиш
		 * @return {void}
		 */
		unbind: function(combination) {
			if (_key[combination]) _key[combination] = null;
			if (_callback[combination]) _callback[combination] = null;
		}

	}

})();