/**
 * Q.hotkey Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

/**
 * @example Q.hotkey.bind(combination, callback)
 * @desc bind shortcut combination (onkeydown)
 */
if(!Q) var Q = {};
Q.hotkey = {
	key: [],
	callback: [],
	specKey: {
		k13: "enter",
		k122: "f11"
	},

	bind: function(combination, callback) {
		if (!combination || !callback) return;
		this.key[combination] = combination.toLowerCase().split("+");
		this.callback[combination] = callback;
		document.onkeydown = function(e) {
			press = [], need = [], s = false, m = 0, e = e || window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			eval("if(Q.hotkey.specKey.k"+code+") {code = Q.hotkey.specKey.k"+code+";} else {code = String.fromCharCode(code).toLowerCase();}");
			if (e.ctrlKey) press.push("ctrl");
			if (e.shiftKey) press.push("shift");
			if (e.altKey) press.push("alt");
			if (press.length > 1) press.sort();
			press.push(code);
			pressS = press.toString().replace(/\,/g, "+");
			if (!Q.hotkey.key[pressS]) return;
			key = Q.hotkey.key[pressS];
			for (i = 0; i < key.length; i++) {
				if (key[i] == "ctrl" || key[i] == "shift" || key[i] == "alt" ) m++;
				else if (m > 1 && !s) {
					need.sort();
					s = true;
				}
				need.push(key[i]);
			}

			if (press.toString() == need.toString()) {
				Q.hotkey.callback[pressS]();
				return false;
			}
		}
	}
}