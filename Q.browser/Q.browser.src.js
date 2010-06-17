/**
 * Q.browser Library
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */

/**
 * @example Q.browser
 * @desc return obj with browser and version
 * @example if (Q.browser.ie)
 * @example if (Q.browser.ie == 6)
 */

if (!Q) var Q = {};

Q.browser = (function() {

	var ua = navigator.userAgent,
		gecko = /Gecko\//.test(ua) ? ua.match(/; rv:1\.(\d+?)\.(\d)/) : 0,
		ie = 0;

	if (document.all) {
		ie = window.XDomainRequest ? 8 : window.XMLHttpRequest ? 7 : document.compatMode ? 6 : window.attachEvent ? 5 : 4;
	}

	return {
		ie: ie,
		gecko: gecko ? '1.' + gecko.slice(1).join('.') : 0,
		opera: window.opera && opera.version ? opera.version()[0] : 0,
		webkit: /AppleWebKit/.test(ua) ? ua.match(/AppleWebKit\/(\d+?\.\d+?\s)/)[1] : 0
	}

})();