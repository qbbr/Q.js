/**
 * Q.pngfix Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

/**
 * @example Q.pngfix()
 * @desc Set png-opacity to document
 */
if(!Q) var Q = {};
Q.pngfix = function() {
	if (document.all && !window.XMLHttpRequest) {
		// png img in source
		var r = /.png/i;
		var a = document.getElementsByTagName("img");
		for (var i = 0; i < a.length; i++) {
			var f = a[i];
			if (r.test(f.src)) {
				var s = document.createElement("span");
				s.style.position = "relative";
				//span.style.whiteSpace = "pre-line";
				s.style.display = "inline-block";
				s.style.background = "transparent";
				s.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + f.src + "', sizingMethod='scale')";
				s.style.width = f.offsetWidth + "px";
				s.style.height = f.offsetHeight + "px";

				if (f.style.border) s.style.border = f.style.border;
				if (f.style.padding) s.style.padding = f.style.padding;
				if (f.style.margin) s.style.margin = f.style.margin;
				//if (img.align) span.style.float = img.align;

				if (f.id) s.id = f.id;
				if (f.className) s.className = f.className;
				if (f.title) s.title = f.title;

				f.parentNode.replaceChild(s, f);
			}
		}


		// png background in css
		var l = document.getElementsByTagName("*");
		for (i = 0; i < l.length; i++) {
			var b = l[i].currentStyle["backgroundImage"];
			if (b && r.test(b)) {
				l[i].style.backgroundImage = "none";
				l[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b.split('url("')[1].split('")')[0] + "', sizingMethod='scale')";
			}
		}

	}
}