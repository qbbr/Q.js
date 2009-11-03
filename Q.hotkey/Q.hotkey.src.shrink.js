/**
 * Q.hotkey Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

/**
 * @example Q.hotkey.bind(combination, callback)
 * @desc bind shortcut combination (onkeydown)
 */
if(!Q) var Q={};
Q.hotkey = {
	s: {
		k13: "enter",
		k122: "f11"
	},

	bind: function(h, c) {
		if (!h) return;
		this.k = h.toLowerCase().split("+");
		this.c = c;
		document.onkeydown = Q.hotkey.i;
	},

	i: function(e) {
		e = e || window.event;
		var c, h, k = Q.hotkey.k;
		if (e.keyCode) c = e.keyCode;
		else if (e.which) c = e.which;
		var q = true;
		eval("if(Q.hotkey.s.k"+c+") {n = false;code=Q.hotkey.s.k"+c+";};");
		if (q) h = String.fromCharCode(c).toLowerCase();
		else h = c;
		var p = [], n = [], s = false, m = 0;
		if (e.ctrlKey)	p.push("ctrl")
		if (e.shiftKey)	p.push("shift")
		if (e.altKey)		p.push("alt")
		if (p.length > 1) p.sort();
		p.push(h);
		for (var i = 0; i < k.length; i++) {
			if (k[i] == "ctrl") {
				n.push("ctrl"); m++;
			} else if (k[i] == "shift") {
				n.push("shift"); m++;
			} else if (k[i] == "alt") {
				n.push("alt"); m++;
			} else {
				if(m > 1 && !s) {
					n.sort();
					s = true;
				}
				n.push(k[i])
			}
		}

		if (p.toString() == n.toString()) {
			Q.hotkey.c();
			return false;
		}
	}
};