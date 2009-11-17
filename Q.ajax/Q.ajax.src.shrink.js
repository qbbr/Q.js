/**
 * Q.ajax Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

/**
 * @example Q.ajax.get(url, callback, type)
 * @desc Using an HTTP GET request.
 *
 * @example Q.ajax.post(url, data, callback, type)
 * @desc Using an HTTP POST request
 */
if(!Q) var Q = {};
Q.ajax = {
	o : function() {
		h = null;
		if (window.XMLHttpRequest) h = new XMLHttpRequest(); // Gecko, WebKit...
		else if (window.ActiveXObject) { // Trident (MSHTML)
			try {
				h = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					h = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		return h;
	},

	get : function(u, c, t) {
		this.a(u, null, c, 'GET', t);
	},

	post : function(u, d, c, t) {
		p = [];
		for (var g in d) p.push(g + "=" + d[g]);
		//.replace(/%20/g, "+");
		this.a(u, p.join("&"), c, 'POST', t);
	},

	a : function(u, d, c, m, t) {
		h = this.g();
		if (!h || !u) return;
		if (h.overrideMimeType) h.overrideMimeType('text/plain');

		// t = t || "text"; // if (!type) type = "text";
		// m = m || "GET"; // if (!method) method = "GET";
		// data = data || null; // if (!data) data = null;

		u += ((u.indexOf("?") + 1) ? "&" : "?") + "timestamp=" + new Date().getTime(); // timestamp = fix IE bug (disable cache)

		h.open(m, u, true);

		if (m == "POST") {
			h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			h.setRequestHeader("Content-length", d.length);
			h.setRequestHeader("Connection", "close");
		}

		h.onreadystatechange = function() {
			if (h.readyState == 4 && h.status == 200) {
				a = h.responseText;
				if (t == "json") a = eval("(" + a.replace(/[\r\n]/g, "") + ")"); // fix IE bug (\n)
				if (c) c(a);
			}
		}
		h.send(d);
	},

	g : function() {return this.o();} // fix IE bug (disable cache)
}