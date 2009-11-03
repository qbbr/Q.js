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
	specKey: {
		k13: "enter",
		k122: "f11"
	},

	bind: function(combination, callback) {
		if (!combination || !callback) return;
		this.key = combination.toLowerCase().split("+");
		this.callback = callback;
		document.onkeydown = function(e) {
			e = e || window.event;
			var code, key = Q.hotkey.key;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			eval("if(Q.hotkey.specKey.k"+code+") {code=Q.hotkey.specKey.k"+code+";} else {code = String.fromCharCode(code).toLowerCase();}");
			var press = [], need = [], s = false, m = 0;
			if (e.ctrlKey) press.push("ctrl");
			if (e.shiftKey) press.push("shift");
			if (e.altKey) press.push("alt");
			if (press.length > 1) press.sort();
			press.push(code);
			for (var i = 0; i < key.length; i++) {
				if (key[i] == "ctrl" || key[i] == "shift" || key[i] == "alt" ) {
					m++;
				} else if (m > 1 && !s) {
					need.sort();
					s = true;
				}
				need.push(key[i]);
			}

			if (press.toString() == need.toString()) {
				Q.hotkey.callback();
				return false;
			}
		}
	}
};