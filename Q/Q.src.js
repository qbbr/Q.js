/**
 * Q Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

if(!Q) var Q = {};
Q = {
	id: function(id) {
		return (document.getElementById(id)) ? document.getElementById(id) : null;
	},

	btn: function(t, p) {
		/*if(!p) p = document;*/
		return p.getElementsByTagName(t);
	},

	addClass: function(e, cls) {
		if (!this.hasClass(e,cls)) e.className += " "+cls;
	},

	hasClass: function(e, cls) {
		return e.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	},

	removeClass: function(e, cls) {
		//if (this.hasClass(e,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			e.className=e.className.replace(reg,' ');
		//}
	},

	setCookie: function(name,value,days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		} else expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},

	getCookie: function(name) {
		var EQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(EQ) == 0) return c.substring(EQ.length,c.length);
		}
		return null;
	},

	parentNodeByTagName: function(e, tagname) {
		while(e.parentNode) {
			e=e.parentNode;
			if (e.parentNode.nodeName.toLowerCase() == tagname.toLowerCase()) {
				return e.parentNode;
				break;
			}
		}
		return null;
	}
};