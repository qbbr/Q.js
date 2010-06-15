/**
 * Q.location Library
 * Работа с URI (base64)
 *
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */

if (!Q) var Q = {};

Q.location = (function() {

	var hash = (window.location.hash)
		? atob(window.location.hash.substr(1)).split(";")
		: [];

	var url = (window.location.hash)
		? window.location.href.substr(0, window.location.href.length - window.location.hash.length)
		: window.location.href;

	return {

		/**
		 * получение hash`a
		 * @public
		 * @return {string(base64)}
		 */
		getHash: function() {
			return btoa(hash.join(";"));
		},

		/**
		 * получение hash`a в виде объекта
		 * @public
		 * @return {obj}
		 */
		getHashObj: function() {
			var o = {}, v;
			for (var i = 0; i < hash.length; i++) {
				v = hash[i].split("==");
				o[v[0]] = v[1];
			}

			return o;
		},

		/**
		 * получить значение
		 * @public
		 * @param {str|int} k ключ
		 * @return {string}
		 */
		getHashParam: function(k) {
			return this.getHashObj()[k];
		},

		/**
		 * установить значение
		 * @public
		 * @param {str|int} k ключ
		 * @param {str|int} v значение
		 * @return {bool}
		 */
		setHashParam: function(k, v) {
			if (this.getHashObj()[k]) {
				var b;
				for (var i = 0; i < hash.length; i++) {
					b = hash[i].split("==");
					if (b[0] == k) {
						hash[i] = k + "==" + v;
						break;
					}
				}
			} else {
				hash.push(k + "==" + v);
			}
			window.location.hash = this.getHash();

			return true;
		},

		/**
		 * текущий url без протокола и hash`a
		 * @public
		 * @return {string}
		 */
		getCurURL: function() {
			return url.replace(eval("/.*" + window.location.host + "(.*)/"), "$1");
		}

	}

})();