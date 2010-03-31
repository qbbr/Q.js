/**
 * Q.fancybox Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

if(!Q) var Q = {};
Q.fancybox = {
	ie6: (document.all && !window.XMLHttpRequest),
	r: new RegExp('(\\s|^)Q.fancybox(\\s|$)'),
	ir: /\.(jpg|jpeg|gif|png|bmp)/i,
	h: document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight,

	popup: function(u, t) {
		this.g(true);
		if (this.m) Q.fancybox.d();
		var i;
		if (u.match(this.ir)) { // type = image
			i = new Image();
			if(t) i.title = t;
			i.onload = function() {
				Q.fancybox.g(false);
				Q.fancybox.s();
			}
			i.src = u;
		} else { // type = ajax
			i = document.createElement("div");
			Q.ajax.get(u, function(data) {
				Q.fancybox.i.innerHTML = data;
				Q.fancybox.g(false);
				Q.fancybox.s();
			});
		}
		this.i = i;
		return false;
	},

	s: function() {
		if (!this.i) return;
		if (this.ie6 && document.body.offsetHeight > this.h) this.h = document.body.offsetHeight;
		this.overlay(true);
		var m = document.createElement("div");
		this.m = m;
		m.className = "Q-main";
		m.appendChild(this.i);
		this.p(m, 0);
		document.body.appendChild(m);

		// title - description
		if (this.i.title) {
			var a = document.createElement("div");
			a.style.width = this.i.offsetWidth + "px";
			a.className = "Q-description";
			a.innerHTML = this.i.title;
			m.appendChild(a);
		}

		// close button
		var c = document.createElement("div");
		this.c = c;
		c.className = "Q-close";
		c.onclick = function() {
			Q.fancybox.d();
		}
		document.body.appendChild(c);

		this.size();
		this.cb = function() {
			Q.fancybox.c.style.display = "block";
		}
		this.f(true, 0);
	},

	size: function() {
		if (!this.m) return;
		this.m.style.left = ((document.body.clientWidth - this.i.offsetWidth) / 2) + "px";
		this.m.style.top = ((this.h - this.i.offsetHeight) / 2) + "px";
		this.c.style.left = ((document.body.clientWidth - this.i.offsetWidth) / 2) + this.i.offsetWidth + 8 + "px";
		this.c.style.top = ((this.h - this.i.offsetHeight) / 2) - 13 + "px";
	},

	f: function(b, o) {
		if (!this.m) return;
		if ( (b && o < 1) || (!b && o > 0) ) {
			if (b) o += o/2 + 0.1;
			else o -= o/3 + 0.1;
			this.p(this.m, o);
			setTimeout("Q.fancybox.f(" + b + ", " + o + ")", 50);
		} else {
			if (this.cb) this.cb();
		}
	},

	p: function(e, o) {
		e.style.opacity = o;
		e.style.filter = 'alpha(opacity=' + o * 100 + ')';
	},

	d: function() {
		if (this.m) {
			document.body.removeChild(Q.fancybox.c);
			this.cb = function() {
				document.body.removeChild(Q.fancybox.m);
				Q.fancybox.overlay(false);
				Q.fancybox.m = Q.fancybox.i = Q.fancybox.c = null;
			}
			this.f(false, 1);
		}
	},

	overlay: function(b) {
		if (b) {
			if (this.o) {
				this.o.style.display = "block";
			} else {
				var o = document.createElement("div");
				this.o = o;
				o.className = "Q-overlay";
				o.style.filter = "alpha(opacity=" + 30 + ")";
				o.style.display = "block";
				if (this.ie6) {
					o.style.height = this.h + "px"; // IE 6 SUCKS
				}
				o.onclick = function() {
					Q.fancybox.overlay(false);
					Q.fancybox.d();
				}
				document.body.appendChild(o);
			}
		} else {
			if (this.o) this.o.style.display = "none";
		}
	},

	g: function(b) {
		if (b) {
			if (this.l) {
				this.l.style.display = "block";
			} else {
				var l = document.createElement("div");
				this.l = l;
				l.className = "Q-load";
				l.style.filter = "alpha(opacity=" + 80 + ")";
				l.style.display = "block";
				document.body.appendChild(l);
				l.style.left = ((document.body.clientWidth - l.offsetWidth) / 2) + "px"
				l.style.top = ((this.h - l.offsetHeight) / 2) + "px"
			}
		} else {
			if (this.l) this.l.style.display = "none";
		}
	},

	init: function() {
		var a = document.getElementsByTagName("a");
		for (i = 0; i < a.length; i++) {
			if (a[i].className.match(Q.fancybox.r)) {
				a[i].onclick = function() {
					return Q.fancybox.popup(this.href, this.title);
				}
			}
		}

		window.onresize = function() {
			Q.fancybox.h = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
			Q.fancybox.size();
			if (Q.fancybox.ie6 && Q.fancybox.o) Q.fancybox.o.style.height = Q.fancybox.h + "px"; // IE 6 SUCKS
		}
	}
}