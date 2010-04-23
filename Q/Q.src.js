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
		document.cookie = name + "=" + value + expires + "; path=/";
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