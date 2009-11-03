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
		if (!combination) return;
		this.key = combination.toLowerCase().split("+");
		this.callback = callback;
		document.onkeydown = Q.hotkey.init;
	},

	init: function(e) {
		e = e || window.event;
		var code, character, key = Q.hotkey.key;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		if (Q.hotkey.specKey.code) alert(1);
		var n = true;
		eval("if(Q.hotkey.specKey.k"+code+") {n = false;code=Q.hotkey.specKey.k"+code+";};");
		if (n) character = String.fromCharCode(code).toLowerCase();
		else character = code;
		var press = [], need = [], sorter = false, mk = 0;
		if (e.ctrlKey)	press.push("ctrl")
		if (e.shiftKey)	press.push("shift")
		if (e.altKey)		press.push("alt")
		if (press.length > 1) press.sort();
		press.push(character);
		for (var i = 0; i < key.length; i++) {
			if (key[i] == "ctrl") {
				need.push("ctrl"); mk++;
			} else if (key[i] == "shift") {
				need.push("shift"); mk++;
			} else if (key[i] == "alt") {
				need.push("alt"); mk++;
			} else {
				if(mk > 1 && !sorter) {
					need.sort();
					sorter = true;
				}
				need.push(key[i])
			}
		}

		if (press.toString() == need.toString()) {
			Q.hotkey.callback();
			return false;
		}
	}
};