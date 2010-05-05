/**
 * Q.location Library
 * Работа с URI
 *
 * @author Sokolov Innokenty, qbbr
 */

if (!Q) var Q = {};

Q.location = (function() {

	var hash = (window.location.hash.length)
		? atob(window.location.hash.substr(1)).split(";")
		: [];

	var url = (window.location.hash.length)
		? window.location.href.substr(0, window.location.href.length - window.location.hash.length)
		: window.location.href;
	
	return {

		/**
		 * получение hash`a
		 * @return string(base64)
		 */
		getHash: function() {
			return btoa(hash.join(";"));
		},

		/**
		 * получение hash`a в виде объекта
		 * @return obj
		 */
		getHashObj: function() {
			var o = {}, v;
			for (var i = 0; i < hash.length; i++) {
				v = hash[i].split("=");
				o[v[0]] = v[1];
			}

			return o;
		},

		/**
		 * получить значение
		 * @return string
		 */
		getHashParam: function(key) {
			return this.getHashObj()[key];
		},

		/**
		 * установить значение
		 * @return bool
		 */
		setHashParam: function(k, v) {
			if (!this.getHashObj()[k]) {
				hash.push(k + "=" + v);
				window.location.hash = this.getHash();
				return true;
			}

			return false;
		},

		/**
		 * текущий url без протокола и hash`a
		 * @return string
		 */
		getCurURL: function() {
			return url.replace(eval("/.*" + window.location.host + "(.*)/"), "$1");
		}

	}

})()