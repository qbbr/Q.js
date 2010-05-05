/**
 * Q Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

if (!Q) var Q = {};

Q = {
	id: function(id) {
		return (document.getElementById(id)) ? document.getElementById(id) : null;
	},

	btn: function(t, p) {
		/*if(!p) p = document;*/
		return p.getElementsByTagName(t);
	},

	addClass: function(e, cls) {
		if (!this.hasClass(e, cls)) e.className += " " + cls;
	},

	hasClass: function(e, cls) {
		return e.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
	},

	removeClass: function(e, cls) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		e.className = e.className.replace(reg, " ");
	},

	setCookie: function(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}
		document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
	},

	getCookie: function(name) {
		var f = name + "=";
		var ca = document.cookie.split(';');
		for (i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1,c.length);
			if (c.indexOf(f) == 0) return c.substring(f.length,c.length);
		}
		return null;
	},

	getElmPosition: function(obj) {
		var curleft = 0, curtop = 0;
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [curleft, curtop];
	},

	parentNodeByTagName: function(e, tagname) {
		while(e.parentNode) {
			e = e.parentNode;
			if (e.parentNode.nodeName.toLowerCase() == tagname.toLowerCase()) {
				return e.parentNode;
				break;
			}
		}
		return null;
	},

	opacity: function(elm, opacity) {
		if (!elm) return;
		elm.style.opacity = opacity;
		elm.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
	}
};



/**
 * @todo onDomReady
 */

var dom_ready = false, call_list = [];
document.onReady = function(f) {
	if (dom_ready) {
		f();
	} else {
		call_list.push(f);
	}
}

window.onload = function() {
	dom_ready = true;
	for (var i = 0; i < call_list.length; i++) {
		call_list[i]();
	}
}


/**
 * @todo getElementsByClassName
 */

if (!document.getElementsByClassName) {
	document.getElementsByClassName = function(cls) {
		var a = [];
		var r = new RegExp("(^|\\s)" + cls + "(\\s|$)");
		var e = this.getElementsByTagName("*");

		for (var i = 0; i < e.length; i++) {
			if (r.test(e[i].className)) a.push(e[i]);
		}
		return a;
	}
}


/**
 * @todo array
 */

Array.prototype.in_array = function(v) {
	var l = this.length;
	for (var i = 0; i < l; i++) {
    if (this[i] === v) return true;
	}
	return false;
}


/**
 * @todo string
 */

String.prototype.trim = function(c) {
	return this.ltrim(c).rtrim(c);
}

String.prototype.ltrim = function(c) {
	c = c || "\\s";
	return this.replace(new RegExp("^[" + c + "]+", "g"), "");
}

String.prototype.rtrim = function(c) {
	c = c || "\\s";
	return this.replace(new RegExp("[" + c + "]+$", "g"), "");
}

String.prototype.strip_tags = function() {
	return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
}

String.prototype.escapeHTML = function() {
	return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

String.prototype.unescapeHTML = function() {
	return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}