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

	HTTPobj: function() {
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

	get: function(url, callback, type) {
		this.ajax(url, null, callback, "GET", type);
	},

	post: function(url, data, callback, type) {
		p = [];
		for (var g in data) p.push(g + "=" + encodeURIComponent(data[g])); // .replace(/%20/g, "+") - replace space on plus
		this.ajax(url, p.join("&"), callback, "POST", type);
	},

	ajax: function(url, data, callback, method, type) {
		h = this.getHTTPobj(); // called every time (disable cache)
		if (h && url) {
			if (typeof this.onStart == "function") this.onStart(); // on ajax start
			if (h.overrideMimeType) h.overrideMimeType("text/plain"); // or text/xml

			url += ((url.indexOf("?") + 1) ? "&" : "?") + "timestamp=" + new Date().getTime(); // timestamp - fix IE bug (disable cache)

			h.open(method, url, true);

			if (method == "POST") {
				h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				h.setRequestHeader("Content-length", data.length);
				h.setRequestHeader("Connection", "close");
			}

			h.onreadystatechange = function() {
				if (h.readyState == 4) {
					if (h.status == 200) {
						a = h.responseText;
						if (type == "json" && a) a = eval("(" + a.replace(/[\r\n]/g, "") + ")"); // fix IE bug (\n)
						if (callback) callback(a);
						if (typeof Q.ajax.onSuccess == "function") Q.ajax.onSuccess(); // ajax is complite and success
					} else {
						if (typeof Q.ajax.onFail == "function") Q.ajax.onFail(); // ajax is complite and fail
					}
				}
			}
			h.send(data);
		}
	},

	getHTTPobj: function() {
		return this.HTTPobj();
	}
}