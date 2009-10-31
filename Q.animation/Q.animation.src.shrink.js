/**
 * Q.animation Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q) var Q = {};
Q.animate = {
	timer: Array(),

	parseObj : function(o) {
		var p = [];
		for (var g in o) {
			if (typeof obj == "object") {
				var p2 = [];
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
			this.animate(this.obj[o][i][0], this.css(this.obj[o][i][0]), this.obj[o][i][1], o+"_"+i);
		}
	},

	animate: function(a, s, e, n) {
		s = parseInt(this.css(a));
		if(!s) s = 0;
		var change = e - s;
		var total = s + Math.ceil((change/2));
		this.css(a, total);
		if(change == 0 || total == e-1 || total == e+1) {
			this.stopTimer(n);
			this.css(a, e);
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
		this.startTimer(n, function() {Q.animate.animate(a, s, e, n);}, this.s);
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
		switch (s) {
			case "width":
				if (v) this.e.style.width = parseInt(v)+"px";
				else return this.e.style.width;
				break;
			case "height":
				if (v) this.e.style.height = parseInt(v)+"px";
				return this.e.style.height;
				break;
			case "paddingLeft":
				if (v) this.e.style.paddingLeft = parseInt(v)+"px";
				return this.e.style.paddingLeft;
				break;
			case "borderWidth":
				if (v) this.e.style.borderWidth = parseInt(v)+"px";
				return this.e.style.borderWidth;
				break;
			case "fontSize":
				if (v) this.e.style.fontSize = parseInt(v)+"px";
				return this.e.style.fontSize;
				break;
		}
	}

}