/**
 * Q.pngfix Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

if(!Q)var Q={};Q.pngfix=function(){if(document.all&&!window.XMLHttpRequest){var r=/.png/i;var a=document.getElementsByTagName("img");for(var i=0;i<a.length;i++){var j=a[i];if(r.test(j.src)){var s=document.createElement("span");s.style.position="relative";s.style.display="inline-block";s.style.background="transparent";s.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+j.src+"', sizingMethod='scale')";s.style.width=j.offsetWidth+"px";s.style.height=j.offsetHeight+"px";if(j.style.border)s.style.border=j.style.border;if(j.style.padding)s.style.padding=j.style.padding;if(j.style.margin)s.style.margin=j.style.margin;if(j.id)s.id=j.id;if(j.className)s.className=j.className;if(j.title)s.title=j.title;j.parentNode.replaceChild(s,j);}}var t=document.getElementsByTagName("*");for(i=0;i<t.length;i++){var b=t[i].currentStyle["backgroundImage"];if(b&&r.test(b)){t[i].style.backgroundImage="none";t[i].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+b.split('url("')[1].split('")')[0]+"', sizingMethod='scale')";}}}}