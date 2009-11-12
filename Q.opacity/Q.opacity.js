/**
 * Q.opacity Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q)var Q={};Q.opacity={set:function(e,o){if(!e||!o)return;if(typeof document.body.style.opacity=='string'){e.style.opacity=o;}else if(document.body.filters){o*=100;var alpha=e.filters["DXImageTransform.Microsoft.alpha"]||e.filters.alpha;if(alpha)alpha.opacity=o;else e.style.filter+="progid:DXImageTransform.Microsoft.Alpha(opacity="+o+")";}}}