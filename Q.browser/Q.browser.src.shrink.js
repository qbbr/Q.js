/**
 * Q.browser Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

/**
 * @example Q.browser()
 * @desc return obj with browser and version
 * @example if (Q.browser().ie)
 * @example if (Q.browser().ie == 6)
 */

if (!Q) var Q = {};

Q.browser = function() {
	var u = navigator.userAgent, i = 0, g = /Gecko\//.test(u) ? u.match(/; rv:1\.(\d+?)\.(\d)/) : 0;

	if (document.all) {
		if (window.XDomainRequest) {
			i = 8;
		} else if (window.XMLHttpRequest) {
			i = 7;
		} else if (document.compatMode) {
			i = 6;
		} else if (window.attachEvent) {
			i = 5;
		} else {
			i = 4;
		}
	}

	return {
		ie: i,
		gecko: g ? '1.' + g.slice(1).join('.') : 0,
		opera: window.opera && opera.version ? opera.version()[0] : 0,
		webkit: /AppleWebKit/.test(u) ? u.match(/AppleWebKit\/(\d+?\.\d+?\s)/)[1] : 0
	};
}