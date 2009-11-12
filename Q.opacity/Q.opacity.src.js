/**
 * Q.opacity Library
 * Copyright (c) 2009 Sokolov Innokenty
 */

/**
 * @example Q.opacity.set(elm, opacity)
 * @desc Set opacity to elm
 */
if(!Q) var Q = {};
Q.opacity = {
	set: function(elm, opacity) {
		if (!elm || !opacity) return;
		if (typeof document.body.style.opacity == 'string') { // CSS3 (Gecko, WebKit...)
			elm.style.opacity = opacity;
		} else if (document.body.filters) { // Trident (MSHTML) 5.5+
			opacity *= 100;
			var alpha = elm.filters["DXImageTransform.Microsoft.alpha"] || elm.filters.alpha;
			if (alpha) alpha.opacity = opacity;
			else elm.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity + ")";
		}
	}
}