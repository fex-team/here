function Swipe(e, t) {"use strict";
	function h() {
		o = s.children;
		f = o.length;
		if (o.length < 2)
			t.continuous = false;
		if (i.transitions && t.continuous && o.length < 3) {
			s.appendChild(o[0].cloneNode(true));
			s.appendChild(s.children[1].cloneNode(true));
			o = s.children
		}
		u = new Array(o.length);
		a = e.getBoundingClientRect().width || e.offsetWidth;
		s.style.width = o.length * a + "px";
		var n = o.length;
		while (n--) {
			var r = o[n];
			r.style.width = a + "px";
			r.setAttribute("data-index", n);
			if (i.transitions) {
				r.style.left = n * -a + "px";
				g(n, l > n ? -a : l < n ? a : 0, 0)
			}
		}
		if (t.continuous && i.transitions) {
			g(v(l - 1), -a, 0);
			g(v(l + 1), a, 0)
		}
		if (!i.transitions)
			s.style.left = l * -a + "px";
		e.style.visibility = "visible"
	}

	function p() {
		if (t.continuous)
			m(l - 1);
		else if (l)
			m(l - 1)
	}

	function d() {
		if (t.continuous)
			m(l + 1);
		else if (l < o.length - 1)
			m(l + 1)
	}

	function v(e) {
		return (o.length + e % o.length) % o.length
	}

	function m(e, n) {
		if (l == e)
			return;
		if (i.transitions) {
			var s = Math.abs(l - e) / (l - e);
			if (t.continuous) {
				var f = s;
				s = -u[v(e)] / a;
				if (s !== f)
					e = -s * o.length + e
			}
			var h = Math.abs(l - e) - 1;
			while (h--)g(v((e > l ? e : l) - h - 1), a * s, 0);
			e = v(e);
			g(l, a * s, n || c);
			g(e, 0, n || c);
			if (t.continuous)
				g(v(e - s), -(a * s), 0)
		} else {
			e = v(e);
			b(l * -a, e * -a, n || c)
		}
		l = e;
		r(t.callback && t.callback(l, o[l]))
	}

	function g(e, t, n) {
		y(e, t, n);
		u[e] = t
	}

	function y(e, t, n) {
		var r = o[e];
		var i = r && r.style;
		if (!i)
			return;
		i.webkitTransitionDuration = i.MozTransitionDuration = i.msTransitionDuration = i.OTransitionDuration = i.transitionDuration = n + "ms";
		i.webkitTransform = "translate(" + t + "px,0)" + "translateZ(0)";
		i.msTransform = i.MozTransform = i.OTransform = "translateX(" + t + "px)"
	}

	function b(e, n, r) {
		if (!r) {
			s.style.left = n + "px";
			return
		}
		var i = +(new Date);
		var u = setInterval(function() {
			var a = +(new Date) - i;
			if (a > r) {
				s.style.left = n + "px";
				if (w)
					S();
				t.transitionEnd && t.transitionEnd.call(event, l, o[l]);
				clearInterval(u);
				return
			}
			s.style.left = (n - e) * (Math.floor(a / r * 100) / 100) + e + "px"
		}, 4)
	}

	function S() {
		E = setTimeout(d, w)
	}

	function x() {
		w = 0;
		clearTimeout(E)
	}

	var n = function() {
	};
	var r = function(e) {
		setTimeout(e || n, 0)
	};
	var i = {
		addEventListener : !!window.addEventListener,
		touch : "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
		transitions : function(e) {
			var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
			for (var n in t)
			if (e.style[t[n]] !== undefined)
				return true;
			return false
		}(document.createElement("swipe"))
	};
	if (!e)
		return;
	var s = e.children[0];
	var o, u, a, f;
	t = t || {};
	var l = parseInt(t.startSlide, 10) || 0;
	var c = t.speed || 300;
	t.continuous = t.continuous !== undefined ? t.continuous : true;
	var w = t.auto || 0;
	var E;
	var T = {};
	var N = {};
	var C;
	var k = {
		handleEvent : function(e) {
			switch(e.type) {
				case"touchstart":
					this.start(e);
					break;
				case"touchmove":
					this.move(e);
					break;
				case"touchend":
					r(this.end(e));
					break;
				case"webkitTransitionEnd":
				case"msTransitionEnd":
				case"oTransitionEnd":
				case"otransitionend":
				case"transitionend":
					r(this.transitionEnd(e));
					break;
				case"resize":
					r(h);
					break
			}
			if (t.stopPropagation)
				e.stopPropagation()
		},
		start : function(e) {
			var t = e.touches[0];
			T = {
				x : t.pageX,
				y : t.pageY,
				time : +(new Date)
			};
			C = undefined;
			N = {};
			s.addEventListener("touchmove", this, false);
			s.addEventListener("touchend", this, false)
		},
		move : function(e) {
			if (e.touches.length > 1 || e.scale && e.scale !== 1)
				return;
			if (t.disableScroll)
				e.preventDefault();
			var n = e.touches[0];
			N = {
				x : n.pageX - T.x,
				y : n.pageY - T.y
			};
			if ( typeof C == "undefined") {
				C = !!(C || Math.abs(N.x) < Math.abs(N.y))
			}
			if (!C) {
				e.preventDefault();
				x();
				if (t.continuous) {
					y(v(l - 1), N.x + u[v(l - 1)], 0);
					y(l, N.x + u[l], 0);
					y(v(l + 1), N.x + u[v(l + 1)], 0)
				} else {
					N.x = N.x / (!l && N.x > 0 || l == o.length - 1 && N.x < 0 ? Math.abs(N.x) / a + 1 : 1);
					y(l - 1, N.x + u[l - 1], 0);
					y(l, N.x + u[l], 0);
					y(l + 1, N.x + u[l + 1], 0)
				}
			}
		},
		end : function(e) {
			var n = +(new Date) - T.time;
			var r = Number(n) < 250 && Math.abs(N.x) > 20 || Math.abs(N.x) > a / 2;
			var i = !l && N.x > 0 || l == o.length - 1 && N.x < 0;
			if (t.continuous)
				i = false;
			var f = N.x < 0;
			if (!C) {
				if (r && !i) {
					if (f) {
						if (t.continuous) {
							g(v(l - 1), -a, 0);
							g(v(l + 2), a, 0)
						} else {
							g(l - 1, -a, 0)
						}
						g(l, u[l] - a, c);
						g(v(l + 1), u[v(l + 1)] - a, c);
						l = v(l + 1)
					} else {
						if (t.continuous) {
							g(v(l + 1), a, 0);
							g(v(l - 2), -a, 0)
						} else {
							g(l + 1, a, 0)
						}
						g(l, u[l] + a, c);
						g(v(l - 1), u[v(l - 1)] + a, c);
						l = v(l - 1)
					}
					t.callback && t.callback(l, o[l])
				} else {
					if (t.continuous) {
						g(v(l - 1), -a, c);
						g(l, 0, c);
						g(v(l + 1), a, c)
					} else {
						g(l - 1, -a, c);
						g(l, 0, c);
						g(l + 1, a, c)
					}
				}
			}
			s.removeEventListener("touchmove", k, false);
			s.removeEventListener("touchend", k, false)
		},
		transitionEnd : function(e) {
			if (parseInt(e.target.getAttribute("data-index"), 10) == l) {
				if (w)
					S();
				t.transitionEnd && t.transitionEnd.call(e, l, o[l])
			}
		}
	};
	h();
	if (w)
		S();
	if (i.addEventListener) {
		if (i.touch)
			s.addEventListener("touchstart", k, false);
		if (i.transitions) {
			s.addEventListener("webkitTransitionEnd", k, false);
			s.addEventListener("msTransitionEnd", k, false);
			s.addEventListener("oTransitionEnd", k, false);
			s.addEventListener("otransitionend", k, false);
			s.addEventListener("transitionend", k, false)
		}
		window.addEventListener("resize", k, false)
	} else {
		window.onresize = function() {
			h()
		}
	}
	return {
		setup : function() {
			h()
		},
		slide : function(e, t) {
			x();
			m(e, t)
		},
		prev : function() {
			x();
			p()
		},
		next : function() {
			x();
			d()
		},
		stop : function() {
			x()
		},
		getPos : function() {
			return l
		},
		getNumSlides : function() {
			return f
		},
		kill : function() {
			x();
			s.style.width = "";
			s.style.left = "";
			var e = o.length;
			while (e--) {
				var t = o[e];
				t.style.width = "";
				t.style.left = "";
				if (i.transitions)
					y(e, 0, 0)
			}
			if (i.addEventListener) {
				s.removeEventListener("touchstart", k, false);
				s.removeEventListener("webkitTransitionEnd", k, false);
				s.removeEventListener("msTransitionEnd", k, false);
				s.removeEventListener("oTransitionEnd", k, false);
				s.removeEventListener("otransitionend", k, false);
				s.removeEventListener("transitionend", k, false);
				window.removeEventListener("resize", k, false)
			} else {
				window.onresize = null
			}
		}
	}
}

if (window.jQuery || window.Zepto) {
	(function(e) {
		e.fn.Swipe = function(t) {
			return this.each(function() {
				e(this).data("Swipe", new Swipe(e(this)[0], t))
			})
		}
	})(window.jQuery || window.Zepto)
}