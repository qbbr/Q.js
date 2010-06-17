/**
 * Q.iframe_uploader Library
 * отправка формы по средставм iframe (как бэ AJAX 90х)
 *
 * @author Sokolov Innokenty, <i.sokolov@temamedia.ru>
 */
if(!Q)var Q={};Q.iframe_uploader={i:function(c){var u=this.u();var d=document.createElement('div');d.innerHTML='<iframe style="display:none" src="about:blank" id="'+u+'" name="'+u+'" onload="Q.iframe_uploader.l(\''+u+'\')"></iframe>';document.body.appendChild(d);document.getElementById(u).c=c;return u;},submit:function(s,c){s.setAttribute('target',Q.iframe_uploader.i(c));return true;},l:function(u){var i=document.getElementById(u);var d=i.contentDocument?i.contentDocument:i.contentWindow?i.contentWindow.document:window.frames[u].document;if(d.location.href!='about:blank'&&typeof i.c=='function'){i.c(d.body.innerHTML);(function(iframe){setTimeout(function(){iframe.parentNode.parentNode.removeChild(iframe.parentNode);},50);})(i);}},u:function(){var u=0;return function(){return'iframe_uploader_'+u++;}}()};