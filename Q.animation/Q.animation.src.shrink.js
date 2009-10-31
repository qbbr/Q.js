/**
 * Q.animation Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q) var Q = {};
Q.animation = {
	t: Array(),
	rc: Array(),

	o : function(o) {
		var p = [];
		for (var g in o) {
			if (typeof o == "object") {
				p2 = Array();
				var o2 = o[g];
				for (var g2 in o2) {
					if (!o2[g2]) continue;
					p2.push([g2,o2[g2]]);
				}
				p.push(p2);
			}
		}
		return p;
	},

	go: function(e, o, s) {
		if(!e || !o) return;
		this.rc["fontSize"] = "font-size";
		this.s = (s) ? s : 100;
		this.e = e;s
		this.ee = e;
		this.obj = this.o(o);
		this.i = 0;
		this.m(0);
	},

	m: function(o) {
		this.l = 0;
		for (var i = 0; i < this.obj[o].length; i++) {
			this.a(this.obj[o][i][0], this.css(this.obj[o][i][0]), this.obj[o][i][1], o+"_"+i);
		}
	},

	a: function(a, s, e, n) {
		s = parseInt(this.css(a));
		if(!s) s = 0;
		var c = e - s;
		var total = s + Math.ceil((c/2));
		this.css(a, total);
		if(c == 0 || total == e-1 || total == e+1) {
			this.stpT(n);
			this.css(a, e);
			this.l++;
			if (this.l == this.obj[this.i].length) {
				this.i++;
				if (this.obj.length > this.i) {
					this.m(this.i);
				}
			}
			return;
		}
		this.stpT(n);
		this.strT(n, function() {Q.animation.a(a, s, e, n);}, this.s);
	},

	strT: function(n, f, t) {
		if(!this.t[n])  {
			this.t[n] = setTimeout(f, t);
		}
	},

	stpT: function(n) {
		if(this.t[n]) {
			clearTimeout(this.t[n]);
			this.t[n] = null;
		}
	},

	css: function(s, v) {
		var ss = this.r(s);
		/*
		switch (s) {
			case "fontSize":
				if (v) this.e.style.fontSize = parseInt(v)+"px";
				return this.getStyle(this.e, ss);
				break;
			default:
				if (v) eval("this.e.style."+s+" = parseInt(v)+'px'");
				return eval("this.e.style."+s);
				break
		}*/
		if (v) eval("this.e.style."+s+" = parseInt("+v+")+'px'");
		else return eval("this.e.style."+s);
		//return this.getStyle(this.e, ss);

	},
/*
	getStyle: function(elm,styleProp){
		if (elm.currentStyle) var y = elm.currentStyle[styleProp];
		else if (window.getComputedStyle) var y = document.defaultView.getComputedStyle(elm,null).getPropertyValue(styleProp);
		else if (elm.style) var y = "elm.style."+styleProp;
		return y;
	},
*/
	r: function(p) {
		if(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
			return p;
		} else return (this.rc[p]) ? this.rc[p] : p;
	}

};