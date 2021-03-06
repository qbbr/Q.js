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
	font: "14px Arial, Sans-serif",
	borderColor: "#555",
	borderWidth: 12,
	opacity: 0.5,
	padding: 5,
	backgroundColor: "white",
	color: "#333",
	btnClose: true,

	iframe: function(s) {
		this.show('<iframe class="iframe" src="' + s + '" frameborder="0" marginheight="0" marginwidth="0"></iframe>');
	},


	show: function(t) {
		if (this.b) this.close();
		if (!t) t = "";
		var l = (document.body.clientWidth - this.width) / 2;
		var u = (document.body.clientHeight - this.height) / 2;

		var m = document.createElement("div");
		this.m = m;
		m.style.left = l + "px";
		m.style.top = u + "px";
		m.style.width = this.width + "px";
		m.style.zIndex = 93;
		m.style.font = this.font;
		m.style.color = this.color;
		m.innerHTML = t;

		if (this.btnClose) {
			var c = document.createElement("div");
			c.style.borderTop = "1px solid " + this.borderColor;
			c.style.marginTop = "10px";
			c.style.textAlign = "right";
			var a = document.createElement("a");
			a.style.color = "black";
			a.style.fontWeight = "bold";
			a.style.cursor = "pointer";
			a.onclick = function() {
				Q.box.close();
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
		e.style.left = l - this.padding + "px";
		e.style.top = u - this.padding + "px";
		e.style.width = this.width + 2*this.padding + "px";
		e.style.backgroundColor = this.backgroundColor;
		e.style.zIndex = 92;
		document.body.appendChild(e);

		var b = document.createElement("div");
		this.b = b;
		b.style.left = l - this.borderWidth - this.padding + "px";
		b.style.top = u - this.borderWidth - this.padding + "px";
		b.style.width = this.width + 2*this.padding + 2*this.borderWidth + "px";
		b.style.backgroundColor = this.borderColor;
		b.style.borderRadius = "10px";
		b.style.MozBorderRadius = "10px";
		b.style.zIndex = 91;
		Q.opacity(b, this.opacity);

		document.body.appendChild(b);

		m.style.position = e.style.position = b.style.position = "absolute";

		this.a();

		setTimeout(function() {
			Q.box.i();
		}, 100);
	},

	a: function() {
		var h = this.m.offsetHeight;
		this.e.style.height = h + 2*this.padding + "px";
		this.b.style.height = h + 2*this.padding + 2*this.borderWidth + "px";
	},

	close: function() {
		document.body.removeChild(this.b);
		document.body.removeChild(this.e);
		document.body.removeChild(this.m);
		this.u();
		this.b = this.e = this.m = null;
	},

	i: function() {
		document.body.onclick = function() {
			Q.box.close();
		}
	},

	u: function() {
		document.body.onclick = null;
	}
}