/**
 * Q.ajax Library
 * Copyright (c) 2010 Sokolov Innokenty
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
	onStart: null,
	onSuccess: null,
	onFail: null,

	o: function() {
		h = null;
		if (window.XMLHttpRequest) h = new XMLHttpRequest(); // Gecko, WebKit...
		else if (window.ActiveXObject) { // IE (Trident [MSHTML])
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

	get: function(u, c, t) {
		this.a(u, null, c, "GET", t);
	},

	post: function(u, d, c, t) {
		p = [];
		for (var g in d) p.push(g + "=" + encodeURIComponent(d[g])); // .replace(/%20/g, "+") - replace space on plus
		this.a(u, p.join("&"), c, "POST", t);
	},

	a: function(u, d, c, m, t) {
		h = this.g(); // called every time (disable cache)
		if (h && u) {
			if (typeof this.onStart == "function") this.onStart(); // on ajax start
			if (h.overrideMimeType) h.overrideMimeType("text/plain"); // or text/xml

			u += ((u.indexOf("?") + 1) ? "&" : "?") + "timestamp=" + new Date().getTime(); // timestamp - fix IE bug (disable cache)

			h.open(m, u, true);

			if (m == "POST") {
				h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				h.setRequestHeader("Content-length", d.length);
				h.setRequestHeader("Connection", "close");
			}

			h.onreadystatechange = function() {
				if (h.readyState == 4) {
					if (h.status == 200) {
						a = h.responseText;
						if (t == "json" && a) a = eval("(" + a.replace(/[\r\n]/g, "") + ")"); // fix IE bug (\n)
						if (c) c(a);
						if (typeof Q.ajax.onSuccess == "function") Q.ajax.onSuccess(); // ajax is complite and success
					} else {
						if (typeof Q.ajax.onFail == "function") Q.ajax.onFail(); // ajax is complite and fail
					}
				}
			}
			h.send(d);
		}
	},

	g: function() {
		return this.o();
	}
}