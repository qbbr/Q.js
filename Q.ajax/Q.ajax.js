/**
 * Q.ajax Library
 * @author Sokolov Innokenty, <qbbr@qbbr.ru>
 */
if(!Q)var Q={};(function(){Q.ajax=function(){var o=null;if(window.XMLHttpRequest)o=new XMLHttpRequest();else if(window.ActiveXObject){try{o=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){try{o=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}}return{type:"",onFail:null,onSuccess:null,onStart:null,get:function(u){this.a(u,null,"GET");},post:function(u,d){var p=[];for(var g in d){p.push(g+"="+encodeURIComponent(d[g]));}this.a(u,p.join("&"),"POST");},a:function(u,d,m){if(o&&u){typeof this.onStart=="function"&&this.onStart();o.overrideMimeType&&o.overrideMimeType("text/plain");u+=(u.indexOf("?")+1?"&":"?")+"timestamp="+(new Date).getTime();o.open(m,u,true);if(m=="POST"){o.setRequestHeader("Content-type","application/x-www-form-urlencoded");o.setRequestHeader("Content-length",d.length);o.setRequestHeader("Connection","close");}(function(o,s){o.onreadystatechange=function(){if(o.readyState==4){if(o.status==200){var a=o.responseText;if(s.type=="json"&&a)a=eval("("+a.replace(/[\r\n]/g,"")+")");typeof s.onSuccess=="function"&&s.onSuccess(a);}else typeof s.onFail=="function"&&s.onFail(o.status);}}})(o,this);o.send(d);}}}}})();