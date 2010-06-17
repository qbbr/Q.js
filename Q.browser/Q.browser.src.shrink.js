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

	var u = navigator.userAgent,
		g = /Gecko\//.test(u) ? u.match(/; rv:1\.(\d+?)\.(\d)/) : 0,
		i = 0;

	if (document.all) {
		i = window.XDomainRequest ? 8 : window.XMLHttpRequest ? 7 : document.compatMode ? 6 : window.attachEvent ? 5 : 4;
	}

	return {
		ie: i,
		gecko: g ? '1.' + g.slice(1).join('.') : 0,
		opera: window.opera && opera.version ? opera.version()[0] : 0,
		webkit: /AppleWebKit/.test(u) ? u.match(/AppleWebKit\/(\d+?\.\d+?\s)/)[1] : 0
	}

})();