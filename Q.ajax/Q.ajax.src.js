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
	HTTPobj : function() {
		h = null;
		if (window.XMLHttpRequest) { // Gecko, WebKit...
			 //try {
				 h = new XMLHttpRequest();
			 //} catch (e) {}
		} else if (window.ActiveXObject) { // Trident (MSHTML)
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

	get : function(url, callback, type) {
		this.ajax(url, null, callback, 'GET', type);
	},

	post : function(url, data, callback, type) {
		this.ajax(url, this.parseObj(data), callback, 'POST', type);
	},

	ajax : function (url, data, callback, method, type) {
		h = this.getHTTPobj();
		if (!h || !url) return;
		if (h.overrideMimeType) h.overrideMimeType('text/xml');

		if (!type) type = "text";
		if (!method) method = "GET";
		if (!data) data = null;

		url += (url.indexOf("?")+1) ? "&" : "?";
		url += "timestamp=" + new Date().getTime(); // fix IE bug (clear cache)

		h.open(method, url, true);

		if (method == "POST") {
			h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			h.setRequestHeader("Content-length", data.length);
			h.setRequestHeader("Connection", "close");
		}

		h.onreadystatechange = function () {
			if (h.readyState == 4 && h.status == 200) {
				a = "";
				if (h.responseText) a = h.responseText;
				if (type == "json") a = eval("("+a.replace(/[\r\n]/g, "")+")"); // fix IE bug (\n)
				if (callback) callback(a);
			}
		}
		h.send(data);
	},

	parseObj : function(o) {
		p = [];
		for (var g in o) {
			if (o[g]) p.push(g+"="+o[g]);
		}
		return p.join("&"); //.replace(/%20/g, "+");
	},

	getHTTPobj : function() {return this.HTTPobj();} // fix IE bug (clear cache)
}