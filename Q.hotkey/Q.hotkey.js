/**
 * Q.hotkey Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q)var Q={};Q.hotkey={s:{k13:"enter",k122:"f11"},bind:function(h,c){if(!h||!c)return;this.k=h.toLowerCase().split("+");this.c=c;document.onkeydown=function(e){e=e||window.event;var c,k=Q.hotkey.k;if(e.keyCode)c=e.keyCode;else if(e.which)c=e.which;eval("if(Q.hotkey.s.k"+c+") {c=Q.hotkey.s.k"+c+";} else {c = String.fromCharCode(c).toLowerCase();}");var p=[],n=[],s=false,m=0;if(e.ctrlKey)p.push("ctrl");if(e.shiftKey)p.push("shift");if(e.altKey)p.push("alt");if(p.length>1)p.sort();p.push(c);for(var i=0;i<k.length;i++){if(k[i]=="ctrl"||k[i]=="shift"||k[i]=="alt"){m++;}else if(m>1&&!s){n.sort();s=true;}n.push(k[i]);}if(p.toString()==n.toString()){Q.hotkey.c();return false;}}}};