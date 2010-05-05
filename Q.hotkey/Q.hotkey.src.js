/**
 * Q.hotkey Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

/**
 * @example Q.hotkey.bind(combination, callback)
 * @desc bind shortcut combination (onkeydown)
 *
 * @example Q.hotkey.unbind(combination)
 * @desc unbind combination
 */

if (!Q) var Q = {};

Q.hotkey = {
	key: [],
	callback: [],
	specKey: {
		k13: "enter",
		k122: "f11",
		k27: "esc"
	},

	bind: function(combination, callback) {
		if (!combination || !callback) return;
		this.key[combination] = combination.toLowerCase().split("+");
		this.callback[combination] = callback;

		document.onkeydown = function(e) {
			e = e || window.event;
			var press = [], need = [];

			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;

			eval("if (Q.hotkey.specKey.k" + code + ") {code = Q.hotkey.specKey.k" + code + ";} else {code = String.fromCharCode(code).toLowerCase();}");
			
			if (e.ctrlKey) press.push("ctrl");
			if (e.shiftKey) press.push("shift");
			if (e.altKey) press.push("alt");

			if (press.length > 1) press.sort();

			press.push(code);
			
			var press_str = press.toString().replace(/\,/g, "+");

			if (!Q.hotkey.key[press_str]) return;

			var key = Q.hotkey.key[press_str];

			var s = false, m = 0;
			for (i = 0; i < key.length; i++) {
				if (key[i] == "ctrl" || key[i] == "shift" || key[i] == "alt" ) m++;
				else if (m > 1 && !s) {
					need.sort();
					s = true;
				}
				need.push(key[i]);
			}

			if (press.toString() == need.toString()) {
				Q.hotkey.callback[press_str]();
				return false;
			}
		}
	},

	unbind: function(combination) {
		if (this.key[combination]) {
			this.key[combination] = null
		}
		
		if (this.callback[combination]) {
			this.callback[combination] = null;
		}
	}
}