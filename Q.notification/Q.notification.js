/**
 * Q.notification Library
 * Copyright (c) 2010 Sokolov Innokenty
 */

if(!Q)var Q={};Q.notification={sec:4,backgroundColor:"#333",color:"white",opacity:0.7,show:function(t){this.c();b=document.createElement("div");b.style.position=(document.all)?"absolute":"fixed";b.style.top="10px";b.style.right="10px";b.style.backgroundColor=this.backgroundColor;b.style.color=this.color;b.style.padding="5px 10px";b.style.borderRadius="5px";b.style.MozBorderRadius="5px";b.style.cursor="help";b.style.opacity=this.opacity;b.style.filter='alpha(opacity='+this.opacity*100+')';b.innerHTML=t;b.onclick=function(){Q.notification.c();}
this.t=setTimeout(function(){Q.notification.c();},this.sec*1000);this.b=b;document.body.appendChild(b);},c:function(){if(this.b){document.body.removeChild(this.b);this.b=null;}if(this.t){clearTimeout(this.t);this.t=null;}}}