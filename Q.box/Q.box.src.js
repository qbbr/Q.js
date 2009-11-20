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

	show: function(text) {
		if (this.box) this.close();
		if (!text) text = "";
		var left = (document.body.clientWidth - this.width) / 2;
		var top = (document.body.clientHeight - this.height) / 2 - 100;

		var main = document.createElement("div");
		this.main = main;
		main.style.position = "absolute";
		main.style.left = left + "px";
		main.style.top = top + "px";
		main.style.width = this.width + "px";
		main.style.zIndex = 13;
		main.style.fontFamily = "Arial, Sans-serif";
		main.style.fontSize = "14px";
		main.style.color = "#555";
		main.innerHTML = text;

		if (this.btnClose) {
			var close = document.createElement("div");
			close.style.borderTop = "1px solid " + this.borderColor;
			close.style.marginTop = "10px";
			close.style.textAlign = "right";
			var a = document.createElement("a");
			a.style.color = "black";
			a.style.fontWeight = "bold";
			a.style.fontFamily = "Arial, Sans-serif";
			a.style.fontSize = "14px";
			a.style.cursor = "pointer";
			a.onclick = function() {
				Q.box.close();
			}
			a.innerHTML = "закрыть";
			close.appendChild(a);
			main.appendChild(close);
		}

		main.onmouseover = function() {
			Q.box.unBindClose();
		}
		main.onmouseout = function() {
			Q.box.bindClose();
		}

		document.body.appendChild(main);

		var blank = document.createElement("div");
		this.blank = blank;
		blank.style.position = "absolute";
		blank.style.left = left - this.padding + "px";
		blank.style.top = top - this.padding + "px";
		blank.style.width = this.width + 2*this.padding + "px";
		blank.style.backgroundColor = this.backgroundColor;
		blank.style.zIndex = 12;
		document.body.appendChild(blank);

		var box = document.createElement("div");
		this.box = box;
		box.style.position = "absolute";
		box.style.left = left - this.borderWidth - this.padding + "px";
		box.style.top = top - this.borderWidth - this.padding + "px";
		box.style.width = this.width + 2*this.padding + 2*this.borderWidth + "px";
		box.style.backgroundColor = this.borderColor;
		box.style.borderRadius = "10px";
		box.style.MozBorderRadius = "10px";
		box.style.zIndex = 11;
		this.opacity(box, 0.8);
		document.body.appendChild(box);

		this.autoHeight();

		setTimeout(function() {
			Q.box.bindClose();
		}, 100);
	},

	autoHeight: function() {
		var h = this.main.offsetHeight;
		this.blank.style.height = h + 2*this.padding + "px";
		this.box.style.height = h + 2*this.padding + 2*this.borderWidth + "px";
	},

	opacity: function(elm, opacity) {
		if (typeof document.body.style.opacity == 'string') { // CSS2 (Gecko, WebKit...)
			elm.style.opacity = opacity;
		} else if (document.body.filters) { // Trident (MSHTML) 5.5+
			opacity *= 100;
			var alpha = elm.filters["DXImageTransform.Microsoft.alpha"] || elm.filters.alpha;
			if (alpha) alpha.opacity = opacity;
			else elm.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity + ")";
		}
	},

	close: function() {
		document.body.removeChild(this.box);
		document.body.removeChild(this.blank);
		document.body.removeChild(this.main);
		this.unBindClose();
		this.box = this.blank = this.main = null;
	},

	bindClose: function() {
		document.body.onclick = function() {
			Q.box.close();
		}
	},

	unBindClose: function() {
		document.body.onclick = null;
	}
}