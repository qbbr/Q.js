/**
 * Q Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

if(!Q) var Q = {};

Q = {
	id: function(i) {
		return (document.getElementById(i)) ? document.getElementById(i) : null;
	},

	btn: function(t, p) {
		/*if(!p) p = document;*/
		return p.getElementsByTagName(t);
	},

	addClass: function(e, c) {
		if (!this.hasClass(e, c)) e.className += " " + c;
	},

	hasClass: function(e, c) {
		return e.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"));
	},

	removeClass: function(e, c) {
		var reg = new RegExp("(\\s|^)" + c + "(\\s|$)");
		e.className = e.className.replace(reg, " ");
	},

	setCookie: function(n, v, d) {
		var expires = "";
		if (d) {
			var date = new Date();
			date.setTime(date.getTime() + (d * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}
		document.cookie = n + "=" + v + expires + "; path=/";
	},

	getCookie: function(n) {
		var f = n + "=";
		var a = document.cookie.split(';');
		for (i = 0; i < a.length; i++) {
			var c = a[i];
			while (c.charAt(0) == ' ') c = c.substring(1,c.length);
			if (c.indexOf(f) == 0) return c.substring(f.length,c.length);
		}
		return null;
	},

	getElmPosition: function(o) {
		var l = 0, t = 0;
		do {
			l += o.offsetLeft;
			t += o.offsetTop;
		} while (o = o.offsetParent);
		return [l, t];
	},

	parentNodeByTagName: function(e, t) {
		while(e.parentNode) {
			e = e.parentNode;
			if (e.parentNode.nodeName.toLowerCase() == t.toLowerCase()) {
				return e.parentNode;
				break;
			}
		}
		return null;
	},

	opacity: function(e, o) {
		if (!e) return;
		e.style.opacity = o;
		e.style.filter = 'alpha(opacity=' + o * 100 + ')';
	}
};