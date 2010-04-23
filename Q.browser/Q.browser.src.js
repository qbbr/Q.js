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
	var ua = navigator.userAgent, ie = 0, gecko = /Gecko\//.test(ua) ? ua.match(/; rv:1\.(\d+?)\.(\d)/) : 0;

	if (document.all) {
		if (window.XDomainRequest) {
			ie = 8;
		} else if (window.XMLHttpRequest) {
			ie = 7;
		} else if (document.compatMode) {
			ie = 6;
		} else if (window.attachEvent) {
			ie = 5;
		} else {
			ie = 4;
		}
	}

	return {
		ie: ie,
		gecko: gecko ? '1.' + gecko.slice(1).join('.') : 0,
		opera: window.opera && opera.version ? opera.version()[0] : 0,
		webkit: /AppleWebKit/.test(ua) ? ua.match(/AppleWebKit\/(\d+?\.\d+?\s)/)[1] : 0
	};
}