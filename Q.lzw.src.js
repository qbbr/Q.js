/**
 * Q.lzw Library
 * алгоритм сжатия данных Ле́мпеля — Зи́ва — Ве́лча
 * 
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */

if (!Q) var Q = {};

Q.lzw = (function() {
		
		var separator = ",";

		return {

			compress: function(text) {
				var i, w = "", result = [], dictionary = {}, dict_size = 256;

				for (i = 0; i < 256; i++) {
					dictionary[String.fromCharCode(i)] = i;
				}

				for (i = 0; i < text.length; i++) {
					var c = text.charAt(i),  wc = w + c;

					if (dictionary[wc]) {
						w = wc;
					} else {
						result.push(dictionary[w]);

						dictionary[wc] = dict_size++;
						w = "" + c; // is string
					}
				}

				if (w != "") result.push(dictionary[w]);

				return result.join(separator);
			},

			decompress: function(text) {
				var i, dictionary = [], dictSize = 256;

				for (i = 0; i < 256; i++) {
					dictionary[i] = String.fromCharCode(i);
				}

				text = text.split(separator);

				var w = String.fromCharCode(text[0]), result = w;

			for (i = 1; i < text.length; i++) {
				var entry = "";

				if (dictionary[text[i]]) {
					entry = dictionary[text[i]];
				} else if (text[i] == dictSize) {
					entry = w + w.charAt(0);
				} else {
					return null;
				}

				result += entry;

				dictionary[dictSize++] = w + entry.charAt(0);

				w = entry;
			}

			return result;
		}

	}

})();