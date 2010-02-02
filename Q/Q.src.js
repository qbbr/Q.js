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
		if (!this.hasClass(e,cls)) e.className += " " + cls;
	},

	hasClass: function(e, cls) {
		return e.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	},

	removeClass: function(e, cls) {
		//if (this.hasClass(e,cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			e.className = e.className.replace(reg,' ');
		//}
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
		var EQ = name + "=";
		var ca = document.cookie.split(';');
		for (i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1,c.length);
			if (c.indexOf(EQ) == 0) return c.substring(EQ.length,c.length);
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
	},

	browser: function() {
		var ua = navigator.userAgent, ie = 0, gecko = /Gecko\//.test(ua) ? ua.match(/; rv:1\.(\d+?)\.(\d)/) : 0;

		if (document.all) {
			if (window.XDomainRequest) {
				ie = 8;
			} else if (window.XMLHttpRequest) {
				ie = 7;
			} else if (document.compatMode) {
				ie = 6;
			} else if (window.attachEvent) {
				ie = 5;
			} else {
				ie = 4;
			}
		}

		return {
			ie: ie,
			gecko: gecko ? '1.' + gecko.slice(1).join('.') : 0,
			opera: window.opera && opera.version ? opera.version()[0] : 0,
			webkit: /AppleWebKit/.test(ua) ? ua.match(/AppleWebKit\/(\d+?\.\d+?\s)/)[1] : 0
		};
	}
};