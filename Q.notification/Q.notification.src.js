/**
 * Q.notification Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

if (!Q) var Q = {};
Q.notification = {
	sec: 4,
	backgroundColor: "#333",
	color: "white",
	opacity: 0.7,

	show: function(text) {
		this.close();
		box = document.createElement("div");
		box.style.position = Q.browser().ie ? "absolute" : "fixed";
		box.style.top = "10px";
		box.style.right = "10px";
		box.style.backgroundColor = this.backgroundColor;
		box.style.color = this.color;
		box.style.padding = "5px 10px";
		box.style.borderRadius = "5px";
		box.style.MozBorderRadius = "5px";
		box.style.cursor = "help";
		Q.opacity(box, 0.7);
		box.innerHTML = text;
		box.onclick = function() {
			Q.notification.close();
		}
		this.t = setTimeout(
			function() {
				Q.notification.close();
			}, this.sec*1000
		);
		this.box = box;
		document.body.appendChild(box);
	},

	close: function() {
		if (this.box) {
			document.body.removeChild(this.box);
			this.box = null;
		}
		if (this.t) {
			clearTimeout(this.t);
			this.t = null;
		}
	}
}