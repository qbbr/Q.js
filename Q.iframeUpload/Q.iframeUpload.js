/**
 * Q.iframeUpload Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q)var Q={};Q.iframeUpload={parent:null,action:"upload.php",name:"qIframe-target",init:function(c){if(c)this.c=c;var m=document.createElement("form");m.method="post";m.enctype="multipart/form-data";m.action=this.action;m.target=this.name;m.onsubmit=function(){Q.iframeUpload.i.onload=function(){var d=frames[Q.iframeUpload.name].document.getElementsByTagName("body")[0].innerHTML;if(Q.iframeUpload.c)Q.iframeUpload.c(d);}}
var n=document.createElement("input");n.type="file";n.size=20;n.name="file";m.appendChild(n);var b=document.createElement("input");b.type="submit";b.value="загрузить";m.appendChild(b);var i=document.createElement("iframe");i.name=this.name;i.id=this.name;i.style.border="none";i.style.width="0px";i.style.height="0px";i.style.display="none";m.appendChild(i);this.i=i;this.m=m;if(this.parent)this.parent.appendChild(m);else document.body.appendChild(m);}}