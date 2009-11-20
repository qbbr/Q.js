/**
 * Q.box Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

/**
 * @example Q.box.show(text)
 * @desc show popup box where innerHTML = text
 */
if (!Q) var Q = {};
Q.box = {
	width: 300,
	height: 100,
	borderColor: "#555",
	borderWidth: 12,
	padding: 5,
	backgroundColor: "white",
	btnClose: true,

	show: function(t) {
		if (this.b) this.c();
		if (!t) t = "";
		var left = (document.body.clientWidth - this.width) / 2;
		var top = (document.body.clientHeight - this.height) / 2 - 100;

		var m = document.createElement("div");
		this.m = m;
		m.style.position = "absolute";
		m.style.left = left + "px";
		m.style.top = top + "px";
		m.style.width = this.width + "px";
		m.style.zIndex = 13;
		m.style.fontFamily = "Arial, Sans-serif";
		m.style.fontSize = "14px";
		m.style.color = "#555";
		m.innerHTML = t;

		if (this.btnClose) {
			var c = document.createElement("div");
			c.style.borderTop = "1px solid " + this.borderColor;
			c.style.marginTop = "10px";
			c.style.textAlign = "right";
			var a = document.createElement("a");
			a.style.color = "black";
			a.style.fontWeight = "bold";
			a.style.fontFamily = "Arial, Sans-serif";
			a.style.fontSize = "14px";
			a.style.cursor = "pointer";
			a.onclick = function() {
				Q.box.c();
			}
			a.innerHTML = "закрыть";
			c.appendChild(a);
			m.appendChild(c);
		}

		m.onmouseover = function() {
			Q.box.u();
		}
		m.onmouseout = function() {
			Q.box.i();
		}

		document.body.appendChild(m);

		var e = document.createElement("div");
		this.e = e;
		e.style.position = "absolute";
		e.style.left = left - this.padding + "px";
		e.style.top = top - this.padding + "px";
		e.style.width = this.width + 2*this.padding + "px";
		e.style.backgroundColor = this.backgroundColor;
		e.style.zIndex = 12;
		document.body.appendChild(e);

		var b = document.createElement("div");
		this.b = b;
		b.style.position = "absolute";
		b.style.left = left - this.borderWidth - this.padding + "px";
		b.style.top = top - this.borderWidth - this.padding + "px";
		b.style.width = this.width + 2*this.padding + 2*this.borderWidth + "px";
		b.style.backgroundColor = this.borderColor;
		b.style.borderRadius = "10px";
		b.style.MozBorderRadius = "10px";
		b.style.zIndex = 11;
		this.o(b, 0.8);
		document.body.appendChild(b);

		this.autoHeight();

		setTimeout(function() {
			Q.box.i();
		}, 100);
	},

	autoHeight: function() {
		var h = this.m.offsetHeight;
		this.e.style.height = h + 2*this.padding + "px";
		this.b.style.height = h + 2*this.padding + 2*this.borderWidth + "px";
	},

	o: function(e, o) {
		if (typeof document.body.style.opacity == 'string') { // CSS2 (Gecko, WebKit...)
			e.style.opacity = o;
		} else if (document.body.filters) { // Trident (MSHTML) 5.5+
			o *= 100;
			var alpha = e.filters["DXImageTransform.Microsoft.alpha"] || e.filters.alpha;
			if (alpha) alpha.opacity = o;
			else e.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + o + ")";
		}
	},

	c: function() {
		document.body.removeChild(this.e);
		document.body.removeChild(this.b);
		document.body.removeChild(this.m);
		this.u();
		this.b = this.e = this.m = null;
	},

	i: function() {
		document.body.onclick = function() {
			Q.box.c();
		}
	},

	u: function() {
		document.body.onclick = null;
	}
}