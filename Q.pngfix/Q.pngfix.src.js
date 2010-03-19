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
		var reg = /.png/i;
		var imgs = document.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			var img = imgs[i];
			if (reg.test(img.src)) {
				var span = document.createElement("span");
				span.style.position = "relative";
				//span.style.whiteSpace = "pre-line";
				span.style.display = "inline-block";
				span.style.background = "transparent";
				span.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.src + "', sizingMethod='scale')";
				span.style.width = img.offsetWidth + "px";
				span.style.height = img.offsetHeight + "px";

				if (img.style.border) span.style.border = img.style.border;
				if (img.style.padding) span.style.padding = img.style.padding;
				if (img.style.margin) span.style.margin = img.style.margin;
				//if (img.align) span.style.float = img.align;

				if (img.id) span.id = img.id;
				if (img.className) span.className = img.className;
				if (img.title) span.title = img.title;
			
				img.parentNode.replaceChild(span, img);
			}
		}


		// png background in css
		var all = document.getElementsByTagName("*");
		for (i = 0; i < all.length; i++) {
			var b = all[i].currentStyle["backgroundImage"];
			if (b && reg.test(b)) {
				all[i].style.backgroundImage = "none";
				all[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b.split('url("')[1].split('")')[0] + "', sizingMethod='scale')";
			}
		}

	}
}