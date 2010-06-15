/**
 * Q querySelector
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */


/**


Basic selectors (E):
*                  -  get all elements
#id                -  get element by id
.className         -  get elements by className
tagName            -  get elements by tag name
tagName.className  -  get elements by tag name and class name


Attribute selectors:
E[attr]         -  has attribute
E[attr=value]   -  equal
E[attr!=value]  -  not equal
E[attr^=value]  -  start with
E[attr$=value]  -  end
E[attr~=value]  -  isset word
E[attr*=value]  -  contains


Pseudo-class:
E:nth-child(1)
E:nth-child(even)
E:nth-child(odd)
*/

(function() {

	window.Q = function(selector) {

		if (typeof document.querySelectorAll == "function") {
			return document.querySelectorAll(selector);
		}

		var selector_regexp = /^(\w*|\*)([\.#])?(\w*)?\[?(\w*)?(\=|!\=|\*\=|~\=|\^\=|\$\=)?['"]?([\w\s]*)?['"]?\]?:?(nth-child)?\(?([\d\w]*)?\)?$/, found = [], j;

		// delete space
		selector = selector.replace(/\s*([^\w])\s*/g, "$1").split(",");

		for (var i = 0; i < selector.length; i++) {
			var sel = selector[i], elms = [], s_elms = [];

			if (sel.match(selector_regexp)) {
				var tagName = RegExp.$1,
				separator = RegExp.$2,
				id_or_className = RegExp.$3,
				attr = RegExp.$4,
				ss = RegExp.$5,
				attr_value = RegExp.$6,
				// pseudo-classes
				pseudo = RegExp.$7,
				pseudo_value = RegExp.$8;
				
				switch (separator) {
					// by id
					case "#":
						s_elms = document.getElementById(id_or_className);
						if (!s_elms || tagName && s_elms.tagName.toLowerCase() != tagName) {
							continue;
						}
						elms.push(s_elms);
						
						break;

					// by class name
					case ".":
						s_elms = document.getElementsByClassName(id_or_className);
						for (j = 0; j < s_elms.length; j++) {
							if (tagName == "" || s_elms[j].tagName.toLowerCase() == tagName) {
								elms.push(s_elms[j]);
							}
						}

						break;

					// by tag name
					default:
						s_elms = document.getElementsByTagName(tagName);
						for (j = 0; j < s_elms.length; j++) {
							elms.push(s_elms[j]);
						}
						
						break;
				}

				for (j = 0; j < elms.length; j++) {
					// pseudo-class
					if (pseudo == "nth-child" && pseudo_value) {

						switch (pseudo_value) {
							case "even":
								if ((j + 1) % 2) continue;
								break;

							case "odd":
								if (j % 2) continue;
								break;

							default:
								if (pseudo_value != j + 1) continue;
								break;
						}

					}

					var push_it = false;
					
					if (attr) {
						var cur_attr_value = elms[j].getAttribute(attr);

						if (cur_attr_value && cur_attr_value != null && ss) {

							switch (ss) {
								case "=":
									if (cur_attr_value == attr_value) push_it = true;
									break;

								case "!=":
									if (cur_attr_value != attr_value) push_it = true;
									break;

								case "^=":
									if (cur_attr_value.indexOf(attr_value) == 0) push_it = true;
									break;

								case "$=":
									if (cur_attr_value.lastIndexOf(attr_value) == cur_attr_value.length - attr_value.length) push_it = true;
									break;

								case "~=":
									if (cur_attr_value.match(new RegExp("(\\s|^)" + attr_value + "(\\s|$)"))) push_it = true;
									break;

								case "*=":
									if (cur_attr_value.indexOf(attr_value) != -1) push_it = true;
									break;
							}

						} else if (cur_attr_value || cur_attr_value == "") {
							push_it = true;
						}
					} else {
						push_it = true;
					}

					if (push_it) found.push(elms[j]);
				}

			}

		}

		return found;
	};
	

	if (!document.getElementsByClassName) {
		/**
		 * getElementsByClassName
		 * @param {string} c className
		 */
		document.getElementsByClassName = function(c) {
			var a = [],
			r = new RegExp("(\\s|^)" + c + "(\\s|$)"),
			e = this.getElementsByTagName("*");

			for (var i = 0; i < e.length; i++) {
				if (r.test(e[i].className)) a.push(e[i]);
			}

			return a;
		}
	}

})();