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
		var h = null;
		if (window.XMLHttpRequest) { // Gecko, WebKit...
			 //try {
				 h = new XMLHttpRequest();
			 //} catch (e) {}
		} else if (window.ActiveXObject) { // IEcore
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
		this.a(u, this.p(d), c, 'POST', t);
	},

	a : function (u, d, c, m, t) {
		var h = this.g(), a;
		if (!h || !u) return;
		if (h.overrideMimeType) h.overrideMimeType('text/xml');

		if (!t) var t = "text";
		if (!m) var m = "GET";
		if (!d) var d = null;

		u += (u.indexOf("?")+1) ? "&" : "?";
		u += "timestamp=" + new Date().getTime(); // fix IE bug (clear cache);

		h.open(m, u, true);

		if (m == "POST") {
			h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			h.setRequestHeader("Content-length", d.length);
			h.setRequestHeader("Connection", "close");
		}

		h.onreadystatechange = function () {
			if (h.readyState == 4 && h.status == 200) {
				if (h.responseText) a = h.responseText;
				if (t == "json") a = eval("("+a.replace(/[\r\n]/g, "")+")"); // fix IE bug (\n)
				if (c) c(a);
			} else if (error) error(h.status);
		}
		h.send(d);
	},

	p : function(o) {
		var p = [];
		for (var g in o) {
			if (o[g]) p.push(g+"="+o[g]);
		}
		return p.join("&"); //.replace(/%20/g, "+");
	},

	g : function() {return this.o();} // fix IE bug (clear cache)
}