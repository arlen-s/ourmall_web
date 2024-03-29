! function() {
	var a = {
		platformId: 905,
		urls: ["https://a.config.skype.com", "https://b.config.skype.com"],
		team: "SkypeLyncWebExperience",
		maximumAttempts: 3,
		waitDuration: 3e3
	};
	window.Skype = window.Skype || {};
	var b = "1.2.5";
	! function(a) {
		function e(a, b) {
			var c = a;
			return b = void 0 === b ? 1 : b, "object" != typeof c && (c = {
				message: a || "unknown error"
			}), void 0 === c.code && (c.code = b), c
		}

		function g(a) {
			return e(a, 0)
		}

		function i(a) {
			if(void 0 === a || null === a) throw "settings object is required"
		}

		function j(a) {
			if("function" != typeof a) throw "onSuccess callback is required"
		}
		a.getVersion = function() {
			return b
		}, a.initialize = function(b, k, l) {
			"use strict";

			function m(a) {
				l && l(e(a))
			}

			function n(a) {
				return d.isSupported(window) ? a.packageUrl : a.packageUrlUnsupportedBrowser ? a.packageUrlUnsupportedBrowser : void m(g("no package for unsupported browsers to load for this config"))
			}

			function o(c) {
				if(!c.packageUrl) return void m(g("no package to load for this config"));
				var d = (new Date).getTime(),
					e = {};
				a.onExperienceLoaded = function(e) {
					var f = (new Date).getTime();
					e.init({
						initParams: b,
						config: c,
						configLoadDuration: d - p,
						packageLoadDuration: f - d
					}, k, m), delete a.onExperienceLoaded
				}, c.corsScript && (e.crossOrigin = ""), h.loadScript(n(c), null, m, e)
			}
			var p = (new Date).getTime();
			i(b), j(k), b.fingerprint = f.get(window), c.loadConfig(b, o, m)
		}
	}(window.Skype);
	var c = function() {
			"use strict";

			function c(b) {
				var c = [];
				return a && a.urls && (c = i(a.urls, b)), c
			}

			function d() {
				for(var c = b.split(".", 4); c.length < 4;) c.push(0);
				return a.platformId + "_" + c.join(".")
			}

			function f(a) {
				var b, c, d = [];
				for(b in a) c = a[b], void 0 !== c && d.push([b, c].join("="));
				return d.join("&")
			}

			function h(b, c) {
				var e = a.team,
					g = d(),
					h = b + "/config/v1/" + e + "/" + g,
					i = f(c),
					j = h;
				return i && (j += "?" + i), j
			}

			function i(a, b) {
				for(var c = [], d = {
						apikey: b.apiKey,
						fingerprint: b.fingerprint,
						ecsoverride: e.get(window)
					}, f = 0; f < a.length; f++) c.push(h(a[f], d));
				return c
			}

			function j(b, d, e) {
				function f(a) {
					o++, g.request(a, "onConfigurationLoaded", j, l, "ecsConfig")
				}

				function h() {
					return o / n.length >= (a.maximumAttempts || k)
				}

				function i(b) {
					var c = b.ConfigIDs && b.ConfigIDs[a.team];
					return c ? c.split(/\s*,\s*/) : []
				}

				function j(c) {
					var f;
					m || (m = !0, f = c && c[a.team], f ? (f.configIds = i(c), d && d(f)) : e && e("no configuration is matching parameters", b))
				}

				function l() {
					h() ? e && e("configuration service unreachable") : f(n[++p % n.length])
				}
				var m, n, o = 0,
					p = 0;
				return b && b.apiKey ? (n = c(b), n && n.length ? void f(n[p]) : void(e && e("no configuration service endpoint"))) : void(e && e("apiKey is required"))
			}
			var k = 2;
			return {
				loadConfig: j
			}
		}(),
		d = function() {
			"use strict";

			function a(a) {
				return b(a) || !c(a)
			}

			function b(a) {
				return a.navigator.userAgent.indexOf("SkypeShell") > -1
			}

			function c(a) {
				var b = d(a);
				return b > -1 && 9 >= b
			}

			function d(a) {
				var b, c = -1,
					d = a.navigator.userAgent || "",
					e = a.navigator.appName || "";
				return "Microsoft Internet Explorer" === e && (b = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"), b.exec(d) && (c = parseFloat(RegExp.$1))), c
			}
			return {
				isSupported: a
			}
		}(),
		e = function() {
			"use strict";

			function a(a) {
				a = a || window;
				var b = a.location.search.match(new RegExp(c, "i"));
				return b && b[1] ? b[1] : (b = a.document.cookie.match(new RegExp(d, "i")), b && b[1] ? b[1] : void 0)
			}
			var b = "ecsoverride",
				c = "\\b" + b + "=([^&]+)",
				d = "\\b" + b + "=([^;]+)";
			return {
				get: a
			}
		}(),
		f = function() {
			"use strict";

			function a() {
				return("0000000" + Date.now().toString(16)).slice(-8) + "-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
					var b = Math.floor(16 * Math.random());
					return("x" === a ? b : 8 + b % 4).toString(16)
				})
			}

			function b(b) {
				b = b || window;
				var d = b.localStorage.getItem(c);
				if(!d) {
					d = a();
					try {
						b.localStorage.setItem(c, d)
					} catch(e) {}
				}
				return d
			}
			var c = "skype.fingerprint";
			return {
				get: b
			}
		}(),
		g = function(b) {
			"use strict";

			function c(c, e, f, g, i) {
				if(!c || !e) throw "mandatory options missing";
				var j, k, l = function() {
					b.clearInterval(k), g && (g(), g = null, f = null)
				};
				j = c + (/\?/.test(c) ? "&" : "?") + "callback=Skype." + e, b.Skype[e] = function() {
					b.clearInterval(k), f && f.apply(null, arguments)
				}, h.loadScript(j, d, l, {
					id: i
				}), k = b.setTimeout(l, a.timeout || 2e4)
			}
			var d = function() {};
			return {
				request: c
			}
		}(window),
		h = function() {
			"use strict";

			function a(a, b, c, d) {
				var e = document.createElement("script");
				d = d || {}, e.src = a, e.type = "text/javascript", e.defer = !0, b && (e.onload = b), c && (e.onerror = c);
				for(var f in d) void 0 !== d[f] && (e[f] = d[f]);
				document.getElementsByTagName("head")[0].appendChild(e)
			}
			return {
				loadScript: a
			}
		}()
}();