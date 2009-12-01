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
	set: function(e, o) {
		if (!e || !o) return;
		if (typeof document.body.style.opacity == 'string') { // CSS2 (Gecko, WebKit...)
			e.style.opacity = o;
		} else if (document.body.filters) { // Trident (MSHTML) 5.5+
			o *= 100;
			var alpha = e.filters["DXImageTransform.Microsoft.alpha"] || e.filters.alpha;
			if (alpha) alpha.opacity = o;
			else e.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + o + ")";
		}
	}
}