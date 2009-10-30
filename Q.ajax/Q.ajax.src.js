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
		var h = false;
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

	get : function(url, callback, type) {
		this.ajax(url, null, callback, 'GET', type);
	},

	post : function(url, data, callback, type) {
		this.ajax(url, this.parseObj(data), callback, 'POST', type);
	},

	ajax : function (url, data, callback, method, type) {
		var h = this.getHTTPobj();
		if (!h || !url) return;
		if (h.overrideMimeType) h.overrideMimeType('text/xml');

		if (!type) var type = "text";
		if (!method) var method = "GET";
		if (!data) var data = null;

		var n = "timestamp=" + new Date().getTime(); // fix IE bug (clear cache)
		url += (url.indexOf("?")+1) ? "&" : "?";
		url += n;

		h.open(method, url, true);

		if (method == "POST") {
			h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			h.setRequestHeader("Content-length", data.length);
			h.setRequestHeader("Connection", "close");
		}

		h.onreadystatechange = function () {
			if (h.readyState == 4) {
				if (h.status == 200) {
					var a = "";
					if (h.responseText) a = h.responseText;
					if (type == "json") {
						a = eval("("+a.replace(/[\n\r]/g,"")+")"); // fix IE bug (\n)
					}
					if (callback) callback(a);
				} else if (error) error(h.status);
			}
		}
		h.send(data);
	},

	parseObj : function(o) {
		var p = [];
		for (var g in o) {
			if (o[g]) p.push(g+"="+o[g]);
		}
		return p.join("&"); //.replace(/%20/g, "+");
	},

	getHTTPobj : function() {return this.HTTPobj();} // fix IE bug (clear cache)
}