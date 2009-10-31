/**
 * Q.animation Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q) var Q = {};
Q.animation = {
	timer: Array(),
	rc: Array(),

	parseObj : function(obj) {
		var p = [];
		for (var g in obj) {
			if (typeof obj == "object") {
				p2 = Array();
				var obj2 = obj[g];
				for (var g2 in obj2) {
					if (!obj2[g2]) continue;
					p2.push([g2,obj2[g2]]);
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
		this.e = e;
		this.ee = e;
		this.obj = this.parseObj(o);
		this.i = 0;
		this.make(0);
	},

	make: function(o) {
		this.l = 0;
		for (var i = 0; i < this.obj[o].length; i++) {
			this.animation(this.obj[o][i][0], this.css(this.obj[o][i][0]), this.obj[o][i][1], o+"_"+i);
		}
	},

	animation: function(attr, start, end, n) {
		start = parseInt(this.css(attr));
		if(!start) start = 0;
		var change = end - start;
		var total = start + Math.ceil((change/2));
		this.css(attr, total);
		if(change == 0 || total == end-1 || total == end+1) {
			this.stopTimer(n);
			this.css(attr, end);
			this.l++;
			if (this.l == this.obj[this.i].length) {
				this.i++;
				if (this.obj.length > this.i) {
					this.make(this.i);
				}
			}
			return;
		}
		this.stopTimer(n);
		this.startTimer(n, function() {Q.animation.animation(attr, start, end, n);}, this.s);
	},

	startTimer: function(n, f, t) {
		if(!this.timer[n])  {
			this.timer[n] = setTimeout(f, t);
		}
	},

	stopTimer: function(n) {
		if(this.timer[n]) {
			clearTimeout(this.timer[n]);
			this.timer[n] = null;
		}
	},

	css: function(s, v) {
		var ss = this.replace(s);
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
	replace: function(p) {
		if(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
			return p;
		} else return (this.rc[p]) ? this.rc[p] : p;
	}

};