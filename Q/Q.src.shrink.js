/**
 * Q Library
 * Copyright (c) 2009 Sokolov Innokenty
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
		if (!this.hasClass(e,c)) e.className += " "+c;
	},

	hasClass: function(e, c) {
		return e.className.match(new RegExp('(\\s|^)'+c+'(\\s|$)'));
	},

	removeClass: function(e, c) {
		//if (this.hasClass(e,cls)) {
			var reg = new RegExp('(\\s|^)'+c+'(\\s|$)');
			e.className=e.className.replace(reg,' ');
		//}
	},

	setCookie: function(n,v,d) {
		var e = '';
		if (d) {
			var t = new Date();
			t.setTime(t.getTime()+(d*24*60*60*1000));
			e = "; expires="+t.toGMTString();
		} else e = "";
		document.cookie = n+"="+v+e+"; path=/";
	},

	getCookie: function(n) {
		var q = n + "=";
		var a = document.cookie.split(';');
		for (var i=0;i < a.length;i++) {
			var c = a[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(q) == 0) return c.substring(q.length,c.length);
		}
		return null;
	},

	parentNodeByTagName: function(e, t) {
		while(e.parentNode) {
			e=e.parentNode;
			if (e.parentNode.nodeName.toLowerCase() == t.toLowerCase()) {
				return e.parentNode;
				break;
			}
		}
		return null;
	}
};