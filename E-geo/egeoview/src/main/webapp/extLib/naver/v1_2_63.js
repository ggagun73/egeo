function naverMap() {
  function B(a) {
    return "undefined" != typeof a;
  }
  function y(a, b) {
    var c = a.style.cursor;
    a.style.cursor = b;
    "point" == b && (a.style.cursor = "hand");
    return c;
  }
  function O(a, b) {
    eval("window.eventFlash" + a + " = h8;");
  }
  function X(a, b, c, f) {
    var v;
    r.IE ? (v = document.createElement('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/wqe8/swflash.cab#version=9,0,0,0" width="' + c + '" height="' + f + '" align="middle"/>'), v.id = b, v.appendChild(document.createElement('<param NAME="allowScriptAccess" value="always" />')), v.appendChild(document.createElement('<param NAME="quality" VALUE="high" />')), v.appendChild(document.createElement('<param NAME="bgcolor" VALUE="#ffffff" />')), 
    v.appendChild(document.createElement('<param NAME="wmode" VALUE="transparent" />')), v.appendChild(document.createElement('<param NAME="movie" VALUE="' + a + '" />'))) : (v = document.createElement("embed"), v.setAttribute("name", b), v.setAttribute("src", a), v.setAttribute("width", c), v.setAttribute("height", f), v.setAttribute("align", "middle"), v.pluginspage = "http://www.macromedia.com/go/getflashplayer", v.setAttribute("swLiveConnect", !0), v.setAttribute("quality", "high"), v.setAttribute("bgcolor", 
    "#ffffff"), v.setAttribute("wmode", "transparent"), v.setAttribute("allowScriptAccess", "always"), v.setAttribute("TYPE", "application/x-shockwave-flash"));
    return v;
  }
  function Y(a) {
    for (;a && 0 < a.childNodes.length;) {
      0 < a.childNodes[0].childNodes.length && Y(a.childNodes[0]), a.removeChild(a.childNodes[0]);
    }
  }
  function F(a) {
    r.IE ? (window.event.cancelBubble = !0, window.event.returnValue = !1) : a && (a.cancelBubble = !0, a.preventDefault(), a.stopPropagation());
  }
  function L(a, b, c) {
    return window.setTimeout(function() {
      b.apply(a);
    }, c);
  }
  function e(a, b, c, f) {
    a ? (this.container = a, this.container.style.overflow = "hidden", "absolute" != this.container.style.position && "relative" != this.container.style.position && (this.container.style.position = "relative"), a = {}, b ? "object" !== typeof b ? (a.width = "undefined" !== typeof b ? b : this.container.offsetWidth, this.container.style.width = a.width + "px", a.height = "undefined" !== typeof c ? c : this.container.offsetHeight, this.container.style.height = a.height + "px", this.naverMark = "undefined" !== 
    typeof f ? f : !0) : (a = b, "undefined" !== typeof a.width ? this.container.style.width = a.width + "px" : a.width = this.container.offsetWidth, "undefined" !== typeof a.height ? this.container.style.height = a.height + "px" : a.height = this.container.offsetHeight, this.naverMark = "undefined" !== typeof a.naverMark ? a.naverMark : !0) : (a.width = this.container.offsetWidth, a.height = this.container.offsetHeight, this.naverMark = !0), "undefined" !== typeof a.mapMode && (g.mapMode = a.mapMode), 
    "undefined" !== typeof a.coordMode && (g.coordMode = a.coordMode), "undefined" !== typeof a.overlayType && (g.overlayType = a.overlayType), "land" == g.overlayType && (g.w6 = !0), this.ui6 = !0, this.rhu9 = new m(a.width, a.height), this.downpos = new m(0, 0), this.mapEventList = [], this.init()) : this.initFail(" container\ufffd\ufffd \ufffd\u00f9\u0678\ufffd div\ufffd\ufffd\u00fc\ufffd\u033e\ufffd\ufffd \ufffd\u0574\u03f4\ufffd. NMap\ufffd\ufffd\u00fc\ufffd\ufffd \ufffd\ufffd\u0230\ufffd\ufffd\u022d \ufffd\u0574\u03f4\ufffd. ");
  }
  function C(a, b) {
    this.gp4 = this.map = this.hideTimeout = null;
    this.opacity = 1;
    this.zIndex = 0;
    this.show = !0;
    this.rhbo4 = 0;
    this.content = "";
    this.yayq1 = B(a) ? a : null;
    this.size = B(b) ? b : null;
    this.parent = this.bound = null;
    this.conv = new w;
  }
  function M() {
    this.lineWeight = 1;
    this.lineColor = "red";
    this.fillColor = null;
  }
  function Q(a, b) {
    this.conv = new w;
    this.yayq1 = this.conv.inputFilter(a);
    this.size = b;
  }
  function P(a, b) {
    this.conv = new w;
    this.yayq1 = this.conv.inputFilter(a);
    r.IE && (b += 3);
    this.size = new m(b, b);
    this.k9 = null;
  }
  function u() {
    this.map = this.hideTimeout = null;
    this.content = "";
    this.infoDiv = null;
    this.opacity = 1;
    this.yik8 = "";
    this.yayq1 = this.size = null;
    this.autoPosY = this.autoPosX = !0;
    this.ogvt0 = new h(1, -1);
    this.currentSize = this.currentPos = null;
    this.offset = new m(0, 0);
    this.rhbo4 = 10;
    this.zIndex = 0;
    this.parent = null;
    this.conv = new w;
  }
  function N(a) {
    this.setType(a);
  }
  function R(a, b, c) {
    this.src = a;
    this.size = b;
    this.offset = c ? c : new m(Math.round(b.width / 2), Math.round(b.height / 2));
    this.zIndex = 0;
  }
  function q(a, b, c) {
    this.map = null;
    this.yayq1 = a;
    this.vn1 = b;
    this.a5 = !1;
    this.infowin = this.wul9 = null;
    this.cq5 = this.vn1.createObj();
    this.l44 = new m(1, 1);
    this.shift = !1;
    this.parent = this.su8 = this.q4 = this.text = null;
    void 0 == c ? this.version = 1 : 2 == c && (this.version = 2);
    this.conv = new w;
    this.draggable = this.dragging = !1;
  }
  function z(a, b, c, f) {
    this.gp4 = this.map = null;
    this.plx0 = [];
    this.width = a;
    this.height = b;
    this.rhbo4 = c;
    this.auyi5 = new h(-1E3, -1E3);
    this.igbx3 = !1;
    this.parent = f;
    this.leftTopPoint = new h(0, 0);
    this.yqou9 = !1;
    this.weight = 10;
    this.color = "#FF0000";
    this.opacity = .5;
    this.y2 = this.k9 = this.rt9 = null;
    this.dc4 = !0;
    this.szyg6 = !1;
  }
  function p() {
    this.map = null;
    this.td2 = [];
    this.ixet4 = [];
    this.yqou9 = !1;
    this.weight = 10;
    this.minWeight = 3;
    this.maxWeight = 20;
    this.color = "#FF0000";
    this.opacity = .5;
    this.left = g.maxX;
    this.top = g.minY;
    this.right = g.minX;
    this.bottom = g.maxY;
    this.turnOnList = [];
    this.enable = !1;
    this.addPoints.apply(this, arguments);
    this.pointIndex = 0;
    this.autoWeight = !0;
    this.rhbo4 = 5;
    this.arrow = 0;
    this.enable = !1;
    this.parent = this.endArrow = this.startArrow = null;
    this.conv = new w;
  }
  function S(a, b, c) {
    window.XMLHttpRequest ? this.klui7 = new XMLHttpRequest : window.ActiveXObject && (this.klui7 = new ActiveXObject("Microsoft.XMLHTTP"));
    this.xo3 = B(a) ? a : 0;
    this.nocache = B(b) ? b : 0;
    this.async = B(c) ? c : !0;
  }
  function I() {
    this.PI = Math.PI;
    this.HALF_PI = .5 * Math.PI;
    this.TWO_PI = 2 * Math.PI;
    this.R2D = 57.2957795131;
    this.D2R = .0174532925199;
    this.EPSLN = 1E-10;
    this.SRS_WGS84_SEMIMAJOR = 6378137;
    this.SEC_TO_RAD = 4.84813681109536E-6;
    this.PJD_UNKNOWN = 0;
    this.PJD_3PARAM = 1;
    this.PJD_7PARAM = 2;
    this.PJD_GRIDSHIFT = 3;
    this.PJD_WGS84 = 4;
  }
  function K() {
    Object.extend(this, new I);
    this.GEOCENT_LAT_ERROR = 1;
    this.COS_67P5 = .3826834323650898;
    this.AD_C = 1.0026;
    this.system = {TM128:{su8:"TM128_katech (3 param datum shift)", proj:"tmerc", lat0:38, lon0:128, x0:4E5, y0:6E5, k0:.9999, a:6377397.155, b:6356078.963342249, towgs84:"-146.43,507.89,681.46,0,0,0,0"}, LatLng:{su8:"Naver map / WGS84", proj:"longlat", a:6378137, b:6356752.314658148, datum:"WGS84"}, UTMK:{su8:"UTM_K", proj:"tmerc", datum:"WGS84", lat0:38, lon0:127.5, x0:1E6, y0:2E6, k0:.9996, a:6378137, b:6356752.314140356}};
    this.csErrorMessage = "";
  }
  function H() {
    Object.extend(this, new I);
  }
  function w() {
    this.cs = new K;
  }
  var U = new function() {
    function a(a, b) {
      return a + 22 + 75 * (26 > a) - ((0 != b) << 5);
    }
    function b(a, b, c) {
      a = c ? Math.floor(a / 700) : a >> 1;
      a += Math.floor(a / b);
      for (b = 0;455 < a;b += 36) {
        a = Math.floor(a / 35);
      }
      return Math.floor(b + 36 * a / (a + 38));
    }
    function c(a, b) {
      a -= (26 > a - 97) << 5;
      return a + ((!b && 26 > a - 65) << 5);
    }
    this.utf16 = {decode:function(a) {
      for (var b = [], c = 0, d = a.length, k, e;c < d;) {
        k = a.charCodeAt(c++);
        if (55296 === (k & 63488)) {
          e = a.charCodeAt(c++);
          if (55296 !== (k & 64512) || 56320 !== (e & 64512)) {
            throw new RangeError("UTF-16(decode)- Illegal UTF-16 sequence");
          }
          k = ((k & 1023) << 10) + (e & 1023) + 65536;
        }
        b.push(k);
      }
      return b;
    }, encode:function(a) {
      for (var b = [], c = 0, d = a.length, k;c < d;) {
        k = a[c++];
        if (55296 === (k & 63488)) {
          throw new RangeError("UTF-16(encode)- Illegal UTF-16 value");
        }
        65535 < k && (k -= 65536, b.push(String.fromCharCode(k >>> 10 & 1023 | 55296)), k = 56320 | k & 1023);
        b.push(String.fromCharCode(k));
      }
      return b.join("");
    }};
    this.decode = function(a, c) {
      var d = [], t = [], k = a.length, e, g, h, T, n, m, q, p, r;
      e = 128;
      h = 0;
      T = 72;
      n = a.lastIndexOf("-");
      0 > n && (n = 0);
      for (m = 0;m < n;++m) {
        c && (t[d.length] = 26 > a.charCodeAt(m) - 65);
        if (128 <= a.charCodeAt(m)) {
          throw new RangeError("Illegal input >= 0x80");
        }
        d.push(a.charCodeAt(m));
      }
      for (n = 0 < n ? n + 1 : 0;n < k;) {
        m = h;
        g = 1;
        for (q = 36;;q += 36) {
          if (n >= k) {
            throw RangeError("punycode_bad_input(1)");
          }
          p = a.charCodeAt(n++);
          p = 10 > p - 48 ? p - 22 : 26 > p - 65 ? p - 65 : 26 > p - 97 ? p - 97 : 36;
          if (36 <= p) {
            throw RangeError("punycode_bad_input(2)");
          }
          if (p > Math.floor((2147483647 - h) / g)) {
            throw RangeError("punycode_overflow(1)");
          }
          h += p * g;
          r = q <= T ? 1 : q >= T + 26 ? 26 : q - T;
          if (p < r) {
            break;
          }
          if (g > Math.floor(2147483647 / (36 - r))) {
            throw RangeError("punycode_overflow(2)");
          }
          g *= 36 - r;
        }
        g = d.length + 1;
        T = b(h - m, g, 0 === m);
        if (Math.floor(h / g) > 2147483647 - e) {
          throw RangeError("punycode_overflow(3)");
        }
        e += Math.floor(h / g);
        h %= g;
        c && t.splice(h, 0, 26 > a.charCodeAt(n - 1) - 65);
        d.splice(h, 0, e);
        h++;
      }
      if (c) {
        for (h = 0, k = d.length;h < k;h++) {
          t[h] && (d[h] = String.fromCharCode(d[h]).toUpperCase().charCodeAt(0));
        }
      }
      return this.utf16.encode(d);
    };
    this.encode = function(f, v) {
      var d, t, k, e, g, h, n, p, m, q;
      v && (q = this.utf16.decode(f));
      f = this.utf16.decode(f.toLowerCase());
      var r = f.length;
      if (v) {
        for (h = 0;h < r;h++) {
          q[h] = f[h] != q[h];
        }
      }
      var u = [];
      d = 128;
      t = 0;
      g = 72;
      for (h = 0;h < r;++h) {
        128 > f[h] && u.push(String.fromCharCode(q ? c(f[h], q[h]) : f[h]));
      }
      k = e = u.length;
      for (0 < e && u.push("-");k < r;) {
        n = 2147483647;
        for (h = 0;h < r;++h) {
          p = f[h], p >= d && p < n && (n = p);
        }
        if (n - d > Math.floor((2147483647 - t) / (k + 1))) {
          throw RangeError("punycode_overflow (1)");
        }
        t += (n - d) * (k + 1);
        d = n;
        for (h = 0;h < r;++h) {
          p = f[h];
          if (p < d && 2147483647 < ++t) {
            return Error("punycode_overflow(2)");
          }
          if (p == d) {
            n = t;
            for (p = 36;;p += 36) {
              m = p <= g ? 1 : p >= g + 26 ? 26 : p - g;
              if (n < m) {
                break;
              }
              u.push(String.fromCharCode(a(m + (n - m) % (36 - m), 0)));
              n = Math.floor((n - m) / (36 - m));
            }
            u.push(String.fromCharCode(a(n, v && q[h] ? 1 : 0)));
            g = b(t, k + 1, k == e);
            t = 0;
            ++k;
          }
        }
        ++t;
        ++d;
      }
      return u.join("");
    };
    this.ToASCII = function(a) {
      a = a.split(".");
      for (var b = [], c = 0;c < a.length;++c) {
        var d = a[c];
        b.push(d.match(/[^A-Za-z0-9-]/) ? "xn--" + U.encode(d) : d);
      }
      return b.join(".");
    };
    this.ToUnicode = function(a) {
      a = a.split(".");
      for (var b = [], c = 0;c < a.length;++c) {
        var d = a[c];
        b.push(d.match(/^xn--/) ? U.decode(d.slice(4)) : d);
      }
      return b.join(".");
    };
  };
  navigator.appVersion.indexOf("Opera");
  navigator.userAgent.indexOf("MAC");
  if (!V) {
    var V = "wcs.naver.com"
  }
  var J = {normal:{fatm4:"http://image.map.naver.com/eclipse/image/2.63/", ewjt2:".png"}, satellite:{fatm4:"http://satellite.map.naver.com/base/1.43/", ewjt2:".jpg"}, hybrid:{fatm4:"http://satellite.map.naver.com/overlay/1.67/", ewjt2:".png"}, traffic:{fatm4:"2.63/", ewjt2:".png"}, land:{fatm4:"http://image.map.naver.com/land/image/1.12/", ewjt2:".png"}, none:!1}, ka = [{jb2:J.normal, peq1:J.none}, {jb2:J.satellite, peq1:J.hybrid}, {jb2:J.satellite, peq1:J.none}], g = {mapVersion:"2.63", mapMode:0, 
  overlayType:"traffic", coordMode:2, minLevel:0, maxLevel:12, tileSize:256, minX:340901120, maxX:359494656, minY:141928960, maxY:157454848, scale:null, rowCount:null, colCount:null, ap3:"http://static.naver.com/maps/thumbs_blank.png", g3:"http://static.naver.com/maps/mapbg_sea.png", dotTileUrl:"http://static.naver.com/maps/dot.gif", gmko2:function(a) {
    if ("undefined" !== typeof a) {
      return Math.pow(2, a) / 2;
    }
  }, getScale:function(a) {
    if (!this.scale) {
      this.scale = [.2];
      for (var b = this.minLevel;b < this.maxLevel;b++) {
        this.scale[b + 1] = this.scale[b] / 2;
      }
    }
    return this.scale[a];
  }, yglz4:function(a) {
    if (!this.rowCount) {
      this.rowCount = [];
      for (var b = this.minLevel;b <= this.maxLevel;b++) {
        this.rowCount[b] = Math.ceil((this.maxX - this.minX) * this.getScale(b) / this.tileSize);
      }
    }
    return this.rowCount[a];
  }, it3:function(a) {
    if (!this.colCount) {
      this.colCount = [];
      for (var b = this.minLevel;b <= this.maxLevel;b++) {
        this.colCount[b] = Math.ceil((this.maxY - this.minY) * this.getScale(b) / this.tileSize);
      }
    }
    return this.colCount[a];
  }, ii2:function(a, b, c) {
    c = (13 - c).toString();
    var f = Math.floor(a / 64).toString(), d = Math.floor(b / 64).toString(), l = Math.floor(f / 16).toString(), t = Math.floor(d / 16).toString();
    a = a.toString();
    b = b.toString();
    return "00000".substr(0, 2 - c.length) + c + "/" + "00000".substr(0, 5 - l.length) + l + "-" + "00000".substr(0, 5 - t.length) + t + "/" + "00000".substr(0, 5 - f.length) + f + "-" + "00000".substr(0, 5 - d.length) + d + "/" + "00000".substr(0, 5 - a.length) + a + "-" + "00000".substr(0, 5 - b.length) + b;
  }, o9:function(a, b, c, f) {
    if ("undefined" !== typeof a && "undefined" !== typeof b && "undefined" !== typeof c && "undefined" !== typeof f) {
      return 0 > a || 0 > b || a >= this.yglz4(c) || b >= this.it3(c) ? this.g3 : f.fatm4 + this.ii2(a, b, c) + f.ewjt2;
    }
  }, w6:!1}, r = {IE:!(!window.attachEvent || window.opera), IE6:navigator.userAgent.match("MSIE 5.5|MSIE 6"), Opera:!!window.opera, FF:-1 < navigator.userAgent.indexOf("Firefox"), Chrome:-1 < navigator.userAgent.indexOf("Chrome"), Safari:-1 < navigator.userAgent.indexOf("Safari") && !this.Chrome};
  window.Node && Node.prototype && !Node.prototype.contains && (Node.prototype.contains = function(a) {
    return 0 != (this.compareDocumentPosition(a) & 16) || this == a;
  });
  window.nullFunc = function() {
  };
  window.falseFunc = function() {
    return !1;
  };
  window.trueFunc = function() {
    return !0;
  };
  var A = {create:function() {
    return function() {
      this.qok9.apply(this, arguments);
    };
  }};
  Object.extend = function(a, b) {
    for (var c in b) {
      a[c] = b[c];
    }
    return a;
  };
  var m = A.create();
  Object.extend(m.prototype, {qok9:function(a, b) {
    this.width = a;
    this.height = b;
    return this;
  }, set:function(a, b) {
    this.width = a;
    this.height = b;
    return this;
  }, setWidth:function(a) {
    this.width = a;
    return this;
  }, setHeight:function(a) {
    this.height = a;
    return this;
  }, getWidth:function() {
    return this.width;
  }, getHeight:function() {
    return this.height;
  }, add:function(a, b) {
    return this.set(this.width + a, this.height + b);
  }, copy:function(a) {
    return a ? (a.set(this.width, this.height), a) : new m(this.width, this.height);
  }, equals:function(a) {
    return this.width == a.width && this.height == a.height;
  }, toString:function() {
    return this.width + "," + this.height;
  }});
  var h = A.create();
  Object.extend(h.prototype, {qok9:function(a, b) {
    this.x = a;
    this.y = b;
    this.z = 0;
    return this;
  }, classname:"NInner", coordMode:0, getCoordMode:function() {
    return this.coordMode;
  }, set:function(a, b) {
    this.x = a;
    this.y = b;
    return this;
  }, setX:function(a) {
    this.x = a;
  }, setY:function(a) {
    this.y = a;
  }, getX:function() {
    return this.x;
  }, getY:function() {
    return this.y;
  }, distance:function(a) {
    return "undefined" == typeof a ? null : Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
  }, distanceFrom:function(a) {
    return "undefined" == typeof a ? null : Math.floor(Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y)) / 10);
  }, add:function(a, b) {
    return this.set(this.x + a, this.y + b);
  }, copy:function(a) {
    return a ? (a.set(this.x, this.y), a) : new h(this.x, this.y);
  }, equals:function(a) {
    return this.x == a.x && this.y == a.y;
  }});
  h.prototype.toString = function() {
    return this.x + "," + this.y;
  };
  var D = A.create();
  D.prototype = Object.extend(new h, {qok9:function(a, b) {
    this.x = a;
    this.y = b;
    return this;
  }, classname:"NUTMK", coordMode:1, distanceFrom:function(a) {
    if ("undefined" == typeof a) {
      return null;
    }
    var b = new w, c = b.fromUTMKToInner(this);
    a = b.fromUTMKToInner(a);
    return c.distanceFrom(a);
  }, copy:function(a) {
    return a ? (a.set(this.x, this.y), a) : new D(this.x, this.y);
  }});
  var G = A.create();
  G.prototype = Object.extend(new h, {qok9:function(a, b) {
    this.x = a;
    this.y = b;
    return this;
  }, classname:"NTM128", coordMode:2, distanceFrom:function(a) {
    if ("undefined" == typeof a) {
      return null;
    }
    var b = new w, c = b.fromTM128ToInner(this);
    a = b.fromTM128ToInner(a);
    return c.distanceFrom(a);
  }, copy:function(a) {
    return a ? (a.set(this.x, this.y), a) : new G(this.x, this.y);
  }});
  var E = A.create();
  E.prototype = Object.extend(new h, {qok9:function(a, b) {
    this.x = b;
    this.y = a;
    return this;
  }, classname:"NLatLng", coordMode:3, set:function(a, b) {
    this.x = b;
    this.y = a;
    return this;
  }, lat:function() {
    return this.y;
  }, lng:function() {
    return this.x;
  }, distanceFrom:function(a) {
    if ("undefined" == typeof a) {
      return null;
    }
    var b = new w, c = b.fromLatLngToInner(this);
    a = b.fromLatLngToInner(a);
    return c.distanceFrom(a);
  }, add:null, copy:function(a) {
    return a ? (a.set(this.lat(), this.lng()), a) : new E(this.lat(), this.lng());
  }});
  E.prototype.toString = function() {
    return this.lat() + "," + this.lng();
  };
  var d = A.create();
  Object.extend(d, {attachEvent:function(a, b, c, f) {
    f = f || !1;
    r.FF ? a.addEventListener("mousewheel" == b ? "DOMMouseScroll" : b, c, f) : r.Chrome || r.Safari ? a.addEventListener(b, c, f) : r.IE || r.Opera ? a.attachEvent("on" + b, c) : a["on" + b] = c;
  }, detachEvent:function(a, b, c) {
    r.FF ? a.removeEventListener("mousewheel" == b ? "DOMMouseScroll" : b, c, !1) : r.Chrome || r.Safari ? a.removeEventListener(b, c, !1) : r.IE || r.Opera ? a.detachEvent("on" + b, c) : a["on" + b] = null;
  }, n6:function(a, b) {
    return function(c) {
      c || (c = window.event);
      c && !c.target && (c.target = c.srcElement);
      b.call(a, c);
    };
  }, createCallback:function(a, b) {
    return function() {
      b.apply(a, arguments);
    };
  }, attachDom:function(a, b, c, f) {
    c = d.n6(c, f);
    d.attachEvent(a, b, c);
    return c;
  }, addListener:function(a, b, c) {
    b = d.pex1(b);
    a[b] ? a[b].push(c) : a[b] = Array(c);
  }, bind:function(a, b, c, f) {
    c = this.createCallback(c, f);
    d.addListener(a, b, c);
    return c;
  }, removeListener:function(a, b, c) {
    b = d.pex1(b);
    if ((a = a[b]) && 0 < a.length) {
      b = !1;
      for (var f = 0;f < a.length;f++) {
        a[f] == c && (b = !0), b && f != a.length - 1 && (a[f] = a[f + 1]);
      }
      b && a.pop();
    }
  }, trigger:function(a, b) {
    var c = d.pex1(b);
    if ((c = a[c]) && 0 < c.length) {
      for (var f = [], v = 2;v < arguments.length;v++) {
        f.push(arguments[v]);
      }
      f.push(a);
      for (v = 0;v < c.length;v++) {
        var l = c[v];
        if (l) {
          try {
            l.apply(a, f);
          } catch (t) {
          }
        }
      }
    }
  }, pex1:function(a) {
    return "_Event__" + a;
  }, fca8:function(a, b) {
    var c = new h(0, 0);
    if (B(a.offsetX)) {
      for (var f = a.target || a.srcElement;f && f != b;) {
        c.add(f.offsetLeft, f.offsetTop);
        try {
          f = f.offsetParent;
        } catch (d) {
          f = b;
        }
      }
      c.add(a.offsetX, a.offsetY);
    } else {
      if (B(a.pageX)) {
        for (c.set(a.pageX, a.pageY);b;) {
          c.add(-b.offsetLeft, -b.offsetTop), b = b.offsetParent;
        }
      }
    }
    return c;
  }, stopEvent:function(a) {
    a = a || window.event;
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
  }});
  var Z = A.create();
  Object.extend(Z.prototype, {qok9:function(a) {
    this.src = a;
    this.cursor = "default";
    y(this.src, this.cursor);
    this.sg6 = new m(0, 0);
    this.rhu9 = new m(this.src.offsetWidth, this.src.offsetHeight);
    this.ru5 = new h(0, 0);
    this.y6 = this.src.setCapture ? this.src : window;
    this.ecoa5 = d.n6(this, this.qjl3);
    this.ry0 = d.n6(this, this.s0);
    this.onmouseout = d.n6(this, this.djai6);
    r.IE || d.attachEvent(window, "mouseout", this.onmouseout);
  }, setDefaultCursor:function(a) {
    this.cursor = a;
    y(this.src, this.cursor);
  }, h58:function(a) {
    a || (a = window.event);
    this.ru5.set(a.clientX, a.clientY);
    this.cursor = y(this.src, "move");
    d.attachEvent(this.y6, "mousemove", this.ecoa5);
    d.attachEvent(this.y6, "mouseup", this.ry0);
    this.src.setCapture && this.src.setCapture();
    F(a);
    d.trigger(this, "startDrag");
  }, s0:function(a) {
    a || (a = window.event);
    y(this.src, this.cursor);
    d.detachEvent(this.y6, "mousemove", this.ecoa5);
    d.detachEvent(this.y6, "mouseup", this.ry0);
    this.oi3(a);
    document.releaseCapture && document.releaseCapture();
    d.trigger(this, "endDrag");
  }, qjl3:function(a) {
    a || (a = window.event);
    this.oi3(a);
    d.trigger(this, "drag");
  }, oi3:function(a) {
    a || (a = window.event);
    var b = new m(this.sg6.width + (a.clientX - this.ru5.x), this.sg6.height + (a.clientY - this.ru5.y));
    this.move(b);
    this.ru5.set(a.clientX, a.clientY);
  }, djai6:function(a) {
    a || (a = window.event);
    a.relatedTarget || (y(this.src, this.cursor), d.detachEvent(this.y6, "mousemove", this.ecoa5), d.detachEvent(this.y6, "mouseup", this.ry0), d.detachEvent(this.y6, "mouseup", this.ry0));
  }, move:function(a) {
    this.sg6.set(a.width, a.height);
    this.src.style.left = a.width + "px";
    this.src.style.top = a.height + "px";
    d.trigger(this, "move");
  }});
  var aa = A.create();
  Object.extend(aa.prototype, {qok9:function(a) {
    this.ticks = a;
    this.tick = 0;
  }, qok3:function() {
    this.tick = 0;
  }, gsf5:function() {
    this.tick++;
    return (Math.sin(Math.PI * (this.tick / this.ticks - .5)) + 1) / 2;
  }, ahav6:function() {
    return this.tick < this.ticks;
  }});
  e.prototype.initFail = function(a) {
    alert(a);
    for (var b in e.prototype) {
      this[b] = nullFunc;
    }
  };
  e.prototype.init = function() {
    Object.extend(this, new w);
    this.eehl9 = new h(0, 0);
    this.yayq1 = new h(0, 0);
    this.dxms5 = new h(0, 0);
    this.ss4 = new h(0, 0);
    this.hfbw6 = new h(0, 0);
    this.xe0 = [];
    this.q88 = [];
    this.fp5 = [];
    this.center = new h(.5, .5);
    this.gxur2 = null;
    this.userOverlays = [];
    this.mm7 = null;
    this.b5 = !1;
    this.lg6();
    this.x2();
    this.jo5();
    this.tbs1 = new Z(this.div);
    this.resizeType = new h(0, 0);
    this.bp7 = [0, 0, 0, 0];
    this.wheelAdapter = d.n6(this, this.btiu1);
    this.infowin = new u;
    this.addOverlay(this.infowin);
    this.naverMark && this.addControl(new W);
    this.qo5 = "http://openapi.map.naver.com/common/valid.php";
    this.gxur2 = "358498244c05d27ed028831b7ae692b2";
    this.q48();
    d.bind(this.tbs1, "drag", this, this.zx7);
    d.bind(this.tbs1, "startDrag", this, this.onStartDrag);
    d.bind(this.tbs1, "endDrag", this, this.onEndDrag);
    d.bind(this.tbs1, "move", this, this.ap38);
    var a;
    a = d.attachDom(this.container, "mousedown", this, this.lv3);
    this.mapEventList.push({src:this.container, p38:"mousedown", cbFunc:a});
    a = d.attachDom(this.container, "mousemove", this, this.phm7);
    this.mapEventList.push({src:this.container, p38:"mousemove", cbFunc:a});
    a = d.attachDom(window, "resize", this, this.resize);
    this.mapEventList.push({src:window, p38:"resize", cbFunc:a});
    a = d.attachDom(window, "beforeprint", this, this.ks8);
    this.mapEventList.push({src:window, p38:"beforeprint", cbFunc:a});
    a = d.attachDom(window, "afterprint", this, this.nzi2);
    this.mapEventList.push({src:window, p38:"afterprint", cbFunc:a});
    a = d.attachDom(this.container, "click", this, this.click);
    this.mapEventList.push({src:this.container, p38:"click", cbFunc:a});
    a = d.attachDom(this.container, "mouseup", this, this.mouseup);
    this.mapEventList.push({src:this.container, p38:"mouseup", cbFunc:a});
    a = d.attachDom(this.container, "dblclick", this, this.yys2);
    this.mapEventList.push({src:this.container, p38:"dblclick", cbFunc:a});
    a = d.attachDom(this.container, "contextmenu", this, this.contextmenu);
    this.mapEventList.push({src:this.container, p38:"contextmenu", cbFunc:a});
    a = d.attachDom(window, "load", this, this.load);
    this.mapEventList.push({src:window, p38:"load", cbFunc:a});
    a = d.attachDom(window, "unload", this, this.unload);
    this.mapEventList.push({src:window, p38:"unload", cbFunc:a});
    d.trigger(this.container, "ready");
  };
  e.prototype.setMapMode = function(a) {
    if ("undefined" != typeof a) {
      g.mapMode = a;
      switch(g.mapMode) {
        case 0:
          this.hybridImages && (this.cbc7(this.hybridImages, this.hybridLayer), this.hybridImages = null);
          break;
        case 1:
          this.hybridImages || (this.hybridImages = [], this.xdcx4(this.hybridImages, this.hybridLayer));
          break;
        case 2:
          this.hybridImages && (this.cbc7(this.hybridImages, this.hybridLayer), this.hybridImages = null);
          break;
        default:
          return;
      }
      this.d6();
    }
  };
  e.prototype.getMapMode = function() {
    return g.mapMode;
  };
  e.prototype.getDefaultLayer = function() {
    return ka[g.mapMode].jb2;
  };
  e.prototype.p3 = function() {
    g.w6 = !0;
    g.overlayType = "traffic";
    this.overlayImages = [];
    this.xdcx4(this.overlayImages, this.trafficLayer);
    this.d6();
  };
  e.prototype.t2 = function() {
    g.w6 = !1;
    this.cbc7(this.overlayImages, this.trafficLayer);
    this.overlayImages = null;
  };
  e.prototype.setLandOn = function() {
    g.w6 = !0;
    g.overlayType = "land";
    this.overlayImages = [];
    this.xdcx4(this.overlayImages, this.trafficLayer);
    this.d6();
  };
  e.prototype.setLandOff = function() {
    g.w6 = !1;
    this.cbc7(this.overlayImages, this.trafficLayer);
    this.overlayImages = null;
  };
  e.prototype.setMapCursor = function(a) {
    this.tbs1.setDefaultCursor(a);
  };
  e.prototype.ks8 = function() {
    d.trigger(this, "beforePrint");
  };
  e.prototype.nzi2 = function() {
    d.trigger(this, "afterPrint");
  };
  e.prototype.q48 = function() {
    var a = new Date, a = this.qo5 + "?key=" + this.gxur2 + "&uri=" + encodeURI(document.location.href) + "&time=" + a.getTime();
    this.qchw1 = n.create(null, 1, 1, 0, 0, 0);
    d.attachDom(this.qchw1, "error", this, this.kjkk7);
    this.qchw1.src = a;
  };
  e.prototype.kjkk7 = function() {
    this.ui6 = !1;
    this.container.style.display = "none";
  };
  e.prototype.load = function() {
    if (0 == this.rhu9.width || 0 == this.rhu9.height) {
      this.resize(), null != this.mm7 ? this.setBound(this.mm7) : this.setCenterAndZoom(this.eehl9, this.ir3);
    }
  };
  e.prototype.unload = function() {
    if (null != this.mapEventList) {
      for (var a = 0;a < this.mapEventList.length;a++) {
        d.detachEvent(this.mapEventList[a].src, this.mapEventList[a].p38, this.mapEventList[a].cbFunc), this.mapEventList[a] = null;
      }
      this.mapEventList = null;
    }
    this.cbc7(this.i4, this.mapLayer);
    this.i4 = null;
    this.cbc7(this.hybridImages, this.hybridLayer);
    this.hybridImages = null;
    this.cbc7(this.overlayImages, this.trafficLayer);
    this.overlayImages = null;
    d.trigger(this, "unload");
    this.center = this.fp5 = this.xe0 = this.hfbw6 = this.ss4 = this.dxms5 = this.yayq1 = g = null;
    this.b5 = !1;
    this.infowin = this.wheelAdapter = this.mm7 = null;
    this.div.removeChild(this.overlay);
    this.overlay = null;
    this.div.removeChild(this.infoLayer);
    this.infoLayer = null;
    this.div.removeChild(this.markLayer);
    this.markLayer = null;
    this.div.removeChild(this.pathLayer);
    this.pathLayer = null;
    this.div.removeChild(this.trafficLayer);
    this.trafficLayer = null;
    this.div.removeChild(this.hybridLayer);
    this.hybridLayer = null;
    this.div.removeChild(this.mapLayer);
    this.mapLayer = null;
    this.container.removeChild(this.div);
    this.div = null;
    this.container.removeChild(this.staticLayer);
    this.tbs1 = this.userOverlays = this.checkContainer = this.checkLayer = this.staticLayer = null;
    Y(this.container);
    this.container = null;
  };
  e.prototype.lg6 = function() {
    this.uqpq8 = 0;
    this.ir3 = 2;
    this.dblClickMode = 0;
    this.o4 = !0;
    this.d0 = g.minLevel;
    this.luet0 = g.maxLevel;
  };
  e.prototype.setDblClickMode = function(a) {
    this.dblClickMode = a;
  };
  e.prototype.p21 = function(a) {
    var b = document.createElement("div");
    b.style.position = "absolute";
    b.style.top = "0px";
    b.style.left = "0px";
    b.style.zIndex = a;
    r.IE ? (b.unselectable = "on", b.onselectstart = falseFunc) : b.style.MozUserSelect = "none";
    return b;
  };
  e.prototype.x2 = function() {
    this.div = this.p21(0);
    this.container.appendChild(this.div);
    this.staticLayer = this.p21(10);
    this.container.appendChild(this.staticLayer);
    this.mapLayer = this.p21(10);
    this.div.appendChild(this.mapLayer);
    this.hybridLayer = this.p21(15);
    this.div.appendChild(this.hybridLayer);
    this.trafficLayer = this.p21(20);
    this.div.appendChild(this.trafficLayer);
    this.pathLayer = this.p21(30);
    this.div.appendChild(this.pathLayer);
    this.markLayer = this.p21(40);
    this.div.appendChild(this.markLayer);
    this.infoLayer = this.p21(50);
    this.div.appendChild(this.infoLayer);
    this.overlay = this.p21(100);
    this.div.appendChild(this.overlay);
    this.checkContainer = this.p21(-1E3);
    this.checkContainer.style.width = "10000px";
    this.checkContainer.style.height = "10000px";
    this.checkContainer.style.left = "-10000px";
    this.checkContainer.style.top = "-10000px";
    this.container.appendChild(this.checkContainer);
    this.checkLayer = this.p21(0);
    this.checkContainer.appendChild(this.checkLayer);
  };
  e.prototype.createOverlayPane = function(a) {
    a = this.p21(a);
    this.div.appendChild(a);
    this.userOverlays.push(a);
    return a;
  };
  e.prototype.getHTMLSize = function(a) {
    this.checkLayer.innerHTML = a;
    a = new m(this.checkLayer.offsetWidth, this.checkLayer.offsetHeight);
    this.checkLayer.innerHTML = "";
    return a;
  };
  e.prototype.getDomSize = function(a) {
    var b = null;
    a.parentNode && (b = a.parentNode, b.removeChild(a));
    this.checkLayer.appendChild(a);
    var c = new m(this.checkLayer.offsetWidth, this.checkLayer.offsetHeight);
    this.checkLayer.removeChild(a);
    null != b && b.appendChild(a);
    return c;
  };
  e.prototype.jo5 = function() {
    this.i4 = [];
    1 === g.mapMode && (this.hybridImages = []);
    !0 === g.w6 && (this.overlayImages = []);
    this.zom4();
    this.mhfw7();
  };
  e.prototype.zx7 = function() {
    d.trigger(this, "drag");
  };
  e.prototype.onStartDrag = function() {
    d.trigger(this, "startDrag", this.getBound());
  };
  e.prototype.onEndDrag = function() {
    d.trigger(this, "endDrag", this.getBound());
  };
  e.prototype.ap38 = function() {
    this.pzx8();
    d.trigger(this, "move", this.tbs1.sg6);
  };
  e.prototype.dvk6 = function(a) {
    a = d.fca8(a, this.container);
    a.add(-Math.round((this.bp7[0] - this.bp7[2]) / 2), -Math.round((this.bp7[1] - this.bp7[3]) / 2));
    return new h(a.x - Math.floor(this.rhu9.width / 2), Math.floor(this.rhu9.height / 2) - a.y);
  };
  e.prototype.k47 = function(a) {
    a = this.dvk6(a);
    var b = this.getCenterPixel();
    b.add(a.x, a.y);
    return b;
  };
  e.prototype.currentMousePoint = function(a) {
    return this.outputFilter(this.fromPixelToPoint(this.k47(a), this.uqpq8));
  };
  e.prototype.fromPointToPixel = function(a, b, c) {
    c || (c = new h);
    b = g.getScale(b);
    c.set(Math.round((a.x - g.minX) * b), Math.round((a.y - g.minY) * b));
    return c;
  };
  e.prototype.fromPixelToPoint = function(a, b, c) {
    c || new h;
    b = g.getScale(b);
    return new h(Math.round(a.x / b) + g.minX, Math.round(a.y / b) + g.minY);
  };
  e.prototype.sna4 = function(a) {
  };
  e.prototype.click = function(a) {
    a || (a = window.event);
    100 > Math.pow(this.tbs1.sg6.width - this.downpos.width, 2) + Math.pow(this.tbs1.sg6.height - this.downpos.height, 2) && d.trigger(this, "click", this.currentMousePoint(a));
    d.stopEvent(a);
  };
  e.prototype.contextmenu = function(a) {
    a || (a = window.event);
    d.trigger(this, "contextmenu", this.currentMousePoint(a));
    d.stopEvent(a);
  };
  e.prototype.w0 = function(a) {
    a || (a = window.event);
    d.trigger(this, "keydown", this.sna4(a));
    d.stopEvent(a);
  };
  e.prototype.yys2 = function(a) {
    a || (a = window.event);
    if (this.o4 && 4 > this.dblClickMode) {
      var b = this.dvk6(a);
      this.pan(b.x, b.y);
    }
    d.trigger(this, "dblclick", this.currentMousePoint(a));
  };
  e.prototype.btiu1 = function(a) {
    var b = 0;
    a = a || window.event;
    b = a.wheelDelta ? a.wheelDelta / 120 : -a.detail / 3;
    0 < b ? this.zoomIn(a) : 0 > b && this.zoomOut(a);
    a.preventDefault ? a.preventDefault() : a.cancelBubble = !0;
    return !1;
  };
  e.prototype.move = function(a, b) {
    if (this.o4) {
      var c = this.tbs1.sg6.copy();
      c.add(a, b);
      this.tbs1.move(c);
    }
  };
  e.prototype.pan = function(a, b) {
    this.o4 && (this.wu5 = new m(-a, b), this.y97 = this.tbs1.sg6.copy(), this.wnq8 = new aa(Math.max(20, Math.floor(Math.sqrt(a * a + b * b) / 20))), this.qchm4());
  };
  e.prototype.qchm4 = function() {
    if (this.o4) {
      var a = this.wnq8.gsf5();
      this.tbs1.move(new m(this.y97.width + this.wu5.width * a, this.y97.height + this.wu5.height * a));
      this.zx7();
      this.wnq8.ahav6() && (this.i7 = L(this, function() {
        this.qchm4();
      }, 10));
    }
  };
  e.prototype.panToPoint = function(a) {
    a = this.fromPointToPixel(this.inputFilter(a), this.getZoom());
    var b = this.getCenterPixel();
    this.pan(a.x - b.x, a.y - b.y);
  };
  e.prototype.stopPan = function() {
    this.i7 && clearTimeout(this.i7);
    this.wnq8 && this.wnq8.qok3();
  };
  e.prototype.setBoundOffset = function(a, b, c, f) {
    this.bp7 = a instanceof Array ? a : [a, b, c, f];
    d.trigger(this, "redraw");
  };
  e.prototype.getBoundOffset = function() {
    return this.bp7;
  };
  e.prototype.getMapSize = function() {
    return this.rhu9;
  };
  e.prototype.getBoundPixel = function() {
    return [this.ss4.x * g.tileSize + this.zo63.width - this.tbs1.sg6.width + this.bp7[0], (this.ss4.y + 1) * g.tileSize - this.zo63.height + this.tbs1.sg6.height - this.bp7[1], this.ss4.x * g.tileSize + this.zo63.width + this.rhu9.width - this.tbs1.sg6.width + this.bp7[2], (this.ss4.y + 1) * g.tileSize - this.zo63.height - this.rhu9.height + this.tbs1.sg6.height - this.bp7[3]];
  };
  e.prototype.getBound = function() {
    var a = g.getScale(this.uqpq8), b = this.getBoundPixel();
    return this.outputFilter([Math.floor(b[0] / a) + g.minX, Math.floor(b[1] / a) + g.minY, Math.floor(b[2] / a) + g.minX, Math.floor(b[3] / a) + g.minY]);
  };
  e.prototype.setBound = function(a, b, c, f) {
    a = a instanceof Array ? this.inputFilter(a) : this.inputFilter([a, b, c, f]);
    b = this.luet0;
    c = a[2] - a[0];
    f = a[1] - a[3];
    for (var d = new h(Math.round((a[0] + a[2]) / 2), Math.round((a[1] + a[3]) / 2)), l, t = this.d0;t <= this.luet0;t++) {
      if (l = g.getScale(t), (this.rhu9.width - this.bp7[0] - this.bp7[2]) / l > c && (this.rhu9.height - this.bp7[1] - this.bp7[3]) / l > f) {
        b = t;
        break;
      }
    }
    this.setCenterAndZoom(d, b);
    this.mm7 = [a[0], a[1], a[2], a[3]];
  };
  e.prototype.getCenterPixel = function(a) {
    a instanceof h || (a = new h(0, 0));
    a.set(this.dxms5.x + Math.round((this.bp7[0] - this.bp7[2]) / 2) + this.center.x * this.rhu9.width + this.zo63.width - this.tbs1.sg6.width, this.dxms5.y - Math.round((this.bp7[1] - this.bp7[3]) / 2) - this.center.y * this.rhu9.height - this.zo63.height + this.tbs1.sg6.height);
    return a;
  };
  e.prototype.getCenter = function(a) {
    var b = this.fromPixelToPoint(this.getCenterPixel(), this.uqpq8), b = this.outputFilter(b);
    return a ? a.set(b.x, b.y) : b;
  };
  e.prototype.pzx8 = function() {
    var a = this.tbs1.sg6, a = new m(this.hfbw6.x * g.tileSize + a.width, -this.hfbw6.y * g.tileSize + a.height);
    a.width < -this.zo63.width / 2 ? (this.v4(this.i4, 0), 1 == g.mapMode && this.v4(this.hybridImages, 1), g.w6 && this.v4(this.overlayImages, 2)) : a.width > this.zo63.width / 2 && (this.gre6(this.i4, 0), 1 == g.mapMode && this.gre6(this.hybridImages, 1), g.w6 && this.gre6(this.overlayImages, 2));
    a.height < -this.zo63.height / 2 ? (this.jd8(this.i4, 0), 1 == g.mapMode && this.jd8(this.hybridImages, 1), g.w6 && this.jd8(this.overlayImages, 2)) : a.height > this.zo63.height / 2 && (this.h1(this.i4, 0), 1 == g.mapMode && this.h1(this.hybridImages, 1), g.w6 && this.h1(this.overlayImages, 2));
  };
  e.prototype.v4 = function(a, b) {
    b || this.hfbw6.x++;
    var c = a.shift();
    a.push(c);
    for (var f = a.length - 1, d = 0;d < c.length;d++) {
      this.ue4(c[d], f, d, b);
    }
  };
  e.prototype.gre6 = function(a, b) {
    b || this.hfbw6.x--;
    var c = a.pop();
    if (c) {
      a.unshift(c);
      for (var f = 0;f < c.length;f++) {
        this.ue4(c[f], 0, f, b);
      }
    }
  };
  e.prototype.h1 = function(a, b) {
    b || this.hfbw6.y++;
    for (var c = 0;c < a.length;c++) {
      var f = a[c].pop();
      a[c].unshift(f);
      this.ue4(f, c, 0, b);
    }
  };
  e.prototype.jd8 = function(a, b) {
    b || this.hfbw6.y--;
    for (var c = a[0].length - 1, f = 0;f < a.length;f++) {
      var d = a[f].shift();
      a[f].push(d);
      this.ue4(d, f, c, b);
    }
  };
  e.prototype.resize = function() {
    if (this.rhu9.width != this.container.offsetWidth || this.rhu9.height != this.container.offsetHeight) {
      var a = this.getCenterPixel();
      a.add((this.container.offsetWidth - this.rhu9.width) * this.center.x * this.resizeType.x, (this.container.offsetHeight - this.rhu9.height) * this.center.y * this.resizeType.y);
      this.rhu9.width = this.container.offsetWidth;
      this.rhu9.height = this.container.offsetHeight;
      this.zom4();
      this.mhfw7();
      this.qv5(a);
    }
  };
  e.prototype.phm7 = function(a) {
    a || (a = window.event);
    d.trigger(this, "mousemove", this.currentMousePoint(a));
  };
  e.prototype.lv3 = function(a) {
    a || (a = window.event);
    window.clearTimeout(this.i7);
    switch(this.dblClickMode) {
      case 0:
        this.o4 && this.tbs1.h58(a);
        break;
      case 1:
        this.qv5(this.k47(a));
        this.zoomIn();
        break;
      case 2:
        this.qv5(this.k47(a));
        this.zoomOut();
        break;
      case 3:
        this.selectObj.startSelect(a);
        break;
      case 4:
        this.o4 && this.tbs1.h58(a);
    }
    this.tbs1.sg6.copy(this.downpos);
    d.trigger(this, "mousedown", this.currentMousePoint(a));
  };
  e.prototype.mouseup = function(a) {
    a || (a = window.event);
    d.trigger(this, "mouseup", this.currentMousePoint(a));
  };
  e.prototype.mhfw7 = function() {
    this.xdcx4(this.i4, this.mapLayer);
    1 == g.mapMode && (this.hybridImages || (this.hybridImages = []), this.xdcx4(this.hybridImages, this.hybridLayer));
    g.w6 && (this.overlayImages || (this.overlayImages = []), this.xdcx4(this.overlayImages, this.trafficLayer));
  };
  e.prototype.setZoom = function(a, b) {
    if (this.uqpq8 != a) {
      this.mm7 = null;
      var c = this.getCenter(), f = this.uqpq8;
      this.uqpq8 = a;
      this.setCenter(c);
      d.trigger(this, "zoom", this.uqpq8, f, b);
    }
  };
  e.prototype.getZoom = function() {
    return this.uqpq8;
  };
  e.prototype.setMinLevel = function(a) {
    this.d0 = a;
  };
  e.prototype.setMaxLevel = function(a) {
    this.luet0 = a;
  };
  e.prototype.zoomIn = function(a) {
    this.uqpq8 > this.d0 && this.setZoom(this.uqpq8 - 1, a);
  };
  e.prototype.zoomOut = function(a) {
    this.uqpq8 < this.luet0 && this.setZoom(this.uqpq8 + 1, a);
  };
  e.prototype.enableDrag = function() {
    this.o4 = !0;
  };
  e.prototype.disableDrag = function() {
    this.o4 = !1;
  };
  e.prototype.enableWheelZoom = function() {
    this.container.onmousewheel = falseFunc;
    d.attachEvent(this.container, "mousewheel", this.wheelAdapter);
  };
  e.prototype.disableWheelZoom = function() {
    this.container.onmousewheel = "";
    d.detachEvent(this.container, "mousewheel", this.wheelAdapter);
  };
  e.prototype.setCenterAndZoom = function(a, b) {
    var c = this.inputFilter(a), f = -1;
    b = parseInt(b);
    b != this.uqpq8 && (f = this.uqpq8, this.uqpq8 = b);
    this.ir3 = b;
    this.setCenter(c);
    this.eehl9.set(c.x, c.y);
    -1 != f && d.trigger(this, "zoom", this.uqpq8, f);
  };
  e.prototype.initPoint = function() {
    this.qv5(this.fromPointToPixel(this.eehl9, this.uqpq8));
    this.setZoom(this.ir3);
    this.dblClickMode = 0;
  };
  e.prototype.setCenter = function(a) {
    "undefined" != typeof a && "undefined" != typeof a.x && "undefined" != typeof a.y && (a = this.inputFilter(a), -1 == this.uqpq8 && (this.uqpq8 = 2, d.trigger(this, "zoom", this.uqpq8, -1)), this.yayq1.set(a.x, a.y), a = this.fromPointToPixel(this.yayq1, this.uqpq8), this.qv5(a));
  };
  e.prototype.qv5 = function(a) {
    this.dxms5.set(a.x - Math.round((this.bp7[0] - this.bp7[2]) / 2) - this.center.x * this.rhu9.width - this.zo63.width, a.y + Math.round((this.bp7[1] - this.bp7[3]) / 2) + this.center.y * this.rhu9.height + this.zo63.height);
    this.ss4.set(Math.floor(this.dxms5.x / g.tileSize), Math.floor(this.dxms5.y / g.tileSize));
    this.hfbw6.set(0, 0);
    a = new m(this.ss4.x * g.tileSize - this.dxms5.x, this.dxms5.y - (this.ss4.y + 1) * g.tileSize);
    a.width < -this.zo63.width / 2 ? (this.ss4.x++, a.width += g.tileSize) : a.width > this.zo63.width / 2 && (this.ss4.x--, a.width -= g.tileSize);
    a.height < -this.zo63.height / 2 ? (this.ss4.y--, a.height += g.tileSize) : a.height > this.zo63.height / 2 && (this.ss4.y++, a.height -= g.tileSize);
    var b = screen.updateInterval || 0;
    screen.updateInterval = 1E3;
    this.tbs1.move(a);
    this.dxms5.add(a.width, -a.height);
    this.d6();
    d.trigger(this, "redraw");
    screen.updateInterval = b;
  };
  e.prototype.zom4 = function() {
    this.wnv8 = new m(Math.ceil(this.rhu9.width / g.tileSize) + 2, Math.ceil(this.rhu9.height / g.tileSize) + 2);
    this.zo63 = new m(Math.round((this.wnv8.width * g.tileSize - this.rhu9.width) / 2), Math.round((this.wnv8.height * g.tileSize - this.rhu9.height) / 2));
  };
  e.prototype.qe3 = function() {
    return [this.ss4.x + this.hfbw6.x, this.ss4.y + this.hfbw6.y, this.ss4.x + this.wnv8.width + this.hfbw6.x, this.ss4.y - this.wnv8.height + this.hfbw6.y];
  };
  e.prototype.xdcx4 = function(a, b) {
    for (var c;a.length > this.wnv8.width;) {
      c = a.pop();
      for (var f = 0;f < c.length;f++) {
        b.removeChild(c[f]), delete c[f];
      }
    }
    for (f = a.length;f < this.wnv8.width;f++) {
      a.push([]);
    }
    for (f = 0;f < this.wnv8.width;f++) {
      for (;a[f].length > this.wnv8.height;) {
        c = a[f].pop(), b.removeChild(c);
      }
      for (var d = a[f].length;d < this.wnv8.height;d++) {
        c = n.create(null, g.tileSize, g.tileSize, 0, 0, 0, b), c.twa7 = -1, c.uy6 = -1, a[f].push(c);
      }
    }
  };
  e.prototype.cbc7 = function(a, b) {
    if (a) {
      for (var c = 0;c < a.length;c++) {
        for (var f = 0;f < a[c].length;f++) {
          null !== a[c][f] && (b.removeChild(a[c][f]), a[c][f] = null);
        }
      }
    }
  };
  e.prototype.ljm0 = function(a) {
    for (var b = [], c = 0;c < a.length;c++) {
      for (var f = 0;f < a[c].length;f++) {
        var d = a[c][f];
        d.xpos = c;
        d.ypos = f;
        var l = Math.min(c, a.length - c - 1), t = Math.min(f, a[c].length - f - 1);
        d.gx3 = 0 == l || 0 == t ? 0 : l + t;
        b.push(d);
      }
    }
    b.sort(function(a, b) {
      return b.gx3 - a.gx3;
    });
    return b;
  };
  e.prototype.d6 = function() {
    for (var a = this.ljm0(this.i4), b = 0;b < a.length;b++) {
      this.ue4(this.i4[a[b].xpos][a[b].ypos], a[b].xpos, a[b].ypos, 0);
    }
    if (1 == g.mapMode) {
      for (a = this.ljm0(this.hybridImages), b = 0;b < a.length;b++) {
        this.ue4(this.hybridImages[a[b].xpos][a[b].ypos], a[b].xpos, a[b].ypos, 1);
      }
    }
    if (g.w6) {
      for (a = this.ljm0(this.overlayImages), b = 0;b < a.length;b++) {
        this.ue4(this.overlayImages[a[b].xpos][a[b].ypos], a[b].xpos, a[b].ypos, 2);
      }
    }
  };
  e.prototype.CheckHangul = function(a) {
    for (var b = "false", c = 0;c < a.length;c++) {
      if (44032 <= a.charCodeAt(c) && 55203 >= a.charCodeAt(c)) {
        b = "true";
        break;
      }
    }
    return "true" == b ? !0 : !1;
  };
  e.prototype.ue4 = function(a, b, c, f) {
    var v = this.getZoom(), l;
    switch(f) {
      case 0:
        l = g.o9(this.ss4.x + b + this.hfbw6.x, this.ss4.y - c + this.hfbw6.y, this.uqpq8, this.getDefaultLayer());
        break;
      case 1:
        l = g.o9(this.ss4.x + b + this.hfbw6.x, this.ss4.y - c + this.hfbw6.y, this.uqpq8, J.hybrid);
        break;
      case 2:
        l = g.o9(this.ss4.x + b + this.hfbw6.x, this.ss4.y - c + this.hfbw6.y, this.uqpq8, "land" == g.overlayType ? J.land : J.traffic);
        break;
      default:
        return;
    }
    l != a.src && (a.src = g.dotTileUrl, r.IE6 && 0 < f && (a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + g.dotTileUrl + "',sizingMethod='scale')"));
    var t = eval(String.fromCharCode(100, 111, 99, 117, 109, 101, 110, 116, 46, 108, 111, 99, 97, 116, 105, 111, 110, 46, 104, 114, 101, 102)), k = document.domain;
    if (this.CheckHangul(k)) {
      if (-1 < k.indexOf(".")) {
        for (var k = k.split("."), e = 0;e < k.length;e++) {
          if (this.CheckHangul(k[e])) {
            var h = U.ToASCII(k[e]), t = t.replace(k[e], h)
          }
        }
      } else {
        e = U.ToASCII(k), t = t.replace(k, e);
      }
    }
    -1 == t.indexOf(String.fromCharCode(50, 48, 51, 46, 50, 51, 54, 46, 50, 49, 54, 46, 51, 48, 47, 109, 97, 112)) && -1 == t.indexOf(String.fromCharCode(110, 104, 110, 99, 111, 114, 112, 46, 99, 111, 109)) && -1 == t.indexOf(String.fromCharCode(109, 101, 50, 100, 97, 121, 46, 110, 101, 116)) && -1 == t.indexOf(String.fromCharCode(110, 104, 110, 110, 101, 120, 116, 46, 111, 114, 103)) && -1 == t.indexOf(String.fromCharCode(110, 97, 118, 101, 114, 99, 111, 114, 112, 46, 99, 111, 109)) && -1 == t.indexOf(String.fromCharCode(110, 
    104, 110, 115, 121, 115, 116, 101, 109, 46, 99, 111, 109)) || !this.ui6 || (r.IE6 && 0 < f ? this.setPng(a, l) : (a.src = l, a.onerror = function() {
      a.onerror = falseFunc;
      a.src = g.dotTileUrl;
    }));
    a.style.left = (b + this.hfbw6.x) * g.tileSize - this.zo63.width + "px";
    a.style.top = (c - this.hfbw6.y) * g.tileSize - this.zo63.height + "px";
    -1 != a.twa7 && -1 != a.uy6 && d.trigger(this, "removeTile", v, a.twa7, a.uy6);
    a.twa7 = this.ss4.x + b + this.hfbw6.x;
    a.uy6 = this.ss4.y - c + this.hfbw6.y;
    d.trigger(this, "drawTile", v, a.twa7, a.uy6);
  };
  e.prototype.setPng = function(a, b) {
    var c = a.style;
    c.visibility = "hidden";
    c.width = a.clientWidth;
    c.height = a.clientHeight;
    var f = g.dotTileUrl, d = function() {
      a.detachEvent("onerror", d);
      a.detachEvent("onload", l);
      a.setAttribute("src", f);
    }, l = function() {
      a.detachEvent("onerror", d);
      a.detachEvent("onload", l);
      a.style.visibility = "visible";
      c.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "',sizingMethod='scale')";
      a.setAttribute("src", f);
    };
    a.attachEvent("onerror", d);
    a.attachEvent("onload", l);
    a.setAttribute("src", b);
  };
  e.prototype.getTileIndex = function(a) {
    new h(0, 0);
  };
  e.prototype.u27 = function(a, b) {
    b || (b = new h(0, 0));
    b.set(a.x - this.ss4.x * g.tileSize - this.zo63.width, (this.ss4.y + 1) * g.tileSize - this.zo63.height - a.y);
    return b;
  };
  e.prototype.addOverlay = function(a, b, c) {
    this.xe0.push([a, b]);
    a.init(this, c);
    a.redraw(this);
  };
  e.prototype.removeOverlay = function(a) {
    for (var b = 0;this.xe0 && b < this.xe0.length;b++) {
      if (a == this.xe0[b][0]) {
        a.unload();
        this.xe0.splice(b, 1);
        break;
      }
    }
  };
  e.prototype.clearOverlays = function(a) {
    for (var b = [], c = 0, f = 0;this.xe0 && f < this.xe0.length;f++) {
      a && a != this.xe0[f][1] ? (b[c] = this.xe0[f], c++) : (this.xe0[f][0].unload(), this.xe0[f] = null);
    }
    this.xe0 = b;
  };
  e.prototype.addControl = function(a) {
    this.q88.push(a);
    a.init(this);
    a.redraw(this);
  };
  e.prototype.removeControl = function(a) {
    for (var b = 0;b < this.q88.length;b++) {
      if (a == this.q88[b]) {
        a.unload();
        this.q88.splice(b, 1);
        break;
      }
    }
  };
  e.prototype.hjtt8 = function(a) {
    for (var b = [], c, f, d = 0;d < this.fp5.length;d++) {
      b[d] = this.fp5[d].getPos();
      for (var l = 0;l < d;l++) {
        c = (b[l].x - b[d].x) * (b[l].x - b[d].x), f = (b[l].y - b[d].y) * (b[l].y - b[d].y), 9 > c && 9 > f && b[d].add(5, 5);
      }
      if (a == this.fp5[d]) {
        return b[d];
      }
    }
  };
  e.prototype.wvj1 = function(a) {
    this.fp5.push(a);
  };
  e.prototype.p95 = function(a) {
    for (var b = 0;b < this.fp5.length;b++) {
      if (this.fp5[b] == a) {
        this.fp5.splice(b, 1);
        break;
      }
    }
  };
  e.prototype.linkInfoWin = function(a) {
    this.infowin = a;
  };
  e.prototype.setInfoWin = function(a, b) {
    this.infowin.set(a, b);
  };
  e.prototype.setInfoWinZIndex = function(a) {
    this.infowin.setZIndex(a);
  };
  e.prototype.showInfoWin = function() {
    this.infowin.showWindow();
  };
  e.prototype.hideInfoWin = function(a) {
    a ? this.infowin.delayHideWindow(a) : this.infowin.hideWindow();
  };
  var n = A.create();
  Object.extend(n, {ap3:g.dotTileUrl, m0:function(a, b, c, f, d, l, e, k) {
    k = k ? k.createElement("div") : document.createElement("div");
    e && e.appendChild(k);
    k.style.position = "absolute";
    k.oncontextmenu = falseFunc;
    l || (l = 0);
    k.style.zIndex = l;
    B(b) && (k.style.width = b + "px", k.width = b);
    B(c) && (k.style.height = c + "px", k.height = c);
    B(f) && (k.style.left = f + "px");
    B(d) && (k.style.top = d + "px");
    k.src = a;
    return k;
  }, createOverlay:function(a, b, c, f, d, l, e, k) {
    r.IE6 ? (b = n.m0(a, b, c, f, d, l, e, k), b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a + "',sizingMethod='crop')") : b = n.create(a, b, c, f, d, l, e, k);
    return b;
  }, create:function(a, b, c, f, d, l, e, k) {
    k = k ? k.createElement("img") : document.createElement("img");
    e && e.appendChild(k);
    k.style.position = "absolute";
    r.IE ? (k.galleryImg = "no", k.unselectable = "on", k.onselectstart = falseFunc) : k.style.MozUserSelect = "none";
    k.oncontextmenu = falseFunc;
    l || (l = 0);
    k.style.zIndex = l;
    k.src = a ? a : n.ap3;
    B(b) && (k.style.width = b + "px", k.width = b);
    B(c) && (k.style.height = c + "px", k.height = c);
    B(f) && (k.style.left = f + "px");
    B(d) && (k.style.top = d + "px");
    return k;
  }});
  var x = A.create();
  Object.extend(x.prototype, {qok9:function(a, b) {
    this.align = "left";
    this.valign = "top";
    this.content = this.gp4 = this.map = null;
    this.opacity = 1;
    this.zIndex = 0;
    a ? this.setSize(a) : this.size = new m(0, 0);
    b ? this.setPos(b) : this.ogvt0 = new h(0, 0);
  }, init:function(a) {
    this.map = a;
    this.gp4 = this.map.p21(0);
    this.map.staticLayer.appendChild(this.gp4);
    this.gp4.style.overflow = "hidden";
    this.gp4.className = "noprint";
    d.bind(this.map, "redraw", this, this.redraw);
    d.bind(this.map, "unload", this, this.unload);
    d.attachDom(this.gp4, "mousedown", this, this.rt6);
    d.attachDom(this.gp4, "mouseup", this, this.mouseUp);
    d.attachDom(this.gp4, "click", this, this.click);
    d.attachDom(this.gp4, "contextmenu", this, this.contextmenu);
    d.attachDom(this.gp4, "dblclick", this, this.dblclick);
  }, enableEventBubble:function(a) {
    d.detachEvent(this.gp4, a, d.stopEvent);
  }, disableEventBubble:function(a) {
    d.attachEvent(this.gp4, a, d.stopEvent);
  }, rt6:function(a) {
    a || (a = window.event);
    d.trigger(this, "mousedown");
    F(a);
  }, mouseUp:function(a) {
    d.trigger(this, "mouseup");
  }, click:function(a) {
    a || (a = window.event);
    d.trigger(this, "click");
    d.stopEvent(a);
  }, contextmenu:function(a) {
    a || (a = window.event);
    d.trigger(this, "contextmenu");
    F(a);
  }, dblclick:function(a) {
    a || (a = window.event);
    d.trigger(this, "dblclick");
    F(a);
  }, unload:function() {
    this.map && this.map.staticLayer.removeChild(this.gp4);
    this.gp4 && (this.gp4 = null);
    this.map = null;
  }, setSize:function(a) {
    this.size = a;
    null != this.gp4 && (this.gp4.style.width = a.width + "px", this.gp4.style.height = a.height + "px");
    this.redraw();
  }, setPos:function(a) {
    this.ogvt0 = a;
    this.redraw();
  }, setZIndex:function(a) {
    this.zIndex = a;
    this.redraw();
  }, setOpacity:function(a) {
    this.opacity = a;
    this.redraw();
  }, setAlign:function(a) {
    this.align = a;
    this.redraw();
  }, setValign:function(a) {
    this.valign = a;
    this.redraw();
  }, setContent:function(a) {
    this.gp4 && (this.gp4.innerHTML = a);
  }, appendChild:function(a) {
    this.gp4.appendChild(a);
  }, removeChild:function(a) {
    this.gp4.removeChild(a);
  }, redraw:function() {
    if (null != this.map) {
      var a = this.getPos();
      this.gp4.style.opacity = this.opacity;
      this.gp4.style.left = a.x + "px";
      this.gp4.style.top = a.y + "px";
      this.gp4.style.width = this.size.width + "px";
      this.gp4.style.height = this.size.height + "px";
      this.gp4.style.zIndex = this.zIndex;
    }
  }, show:function() {
    null != this.gp4 && (this.gp4.style.display = "");
  }, hide:function() {
    null != this.gp4 && (this.gp4.style.display = "none");
  }, getPos:function() {
    var a, b, c = this.map.getBoundOffset();
    switch(this.align) {
      case "left":
        a = this.ogvt0.x + c[0];
        break;
      case "center":
        a = Math.round((this.ogvt0.x + (this.map.rhu9.width - c[0] - c[2]) - this.size.width) / 2) + c[0];
        break;
      case "right":
        a = this.map.rhu9.width - this.size.width - this.ogvt0.x - c[2];
    }
    switch(this.valign) {
      case "top":
        b = this.ogvt0.y + c[1];
        break;
      case "center":
        b = Math.round((this.ogvt0.y + (this.map.rhu9.height - c[1] - c[3]) - this.size.height) / 2) + c[1];
        break;
      case "bottom":
        b = this.map.rhu9.height - this.size.height - this.ogvt0.y - c[3];
    }
    return new h(a, b);
  }});
  var W = A.create();
  W.prototype = Object.extend(new x(new m(46, 8), new h(7, 7)), {qok9:function() {
    this.setAlign("left");
    this.setValign("bottom");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    a = n.createOverlay("http://static.naver.com/maps/naver.png", 46, 8, 0, 0, 0);
    a.className = "noprint";
    y(a, "pointer");
    this.appendChild(a);
    d.attachDom(a, "click", this, this.goNaver);
  }, goNaver:function() {
    window.open("http://map.naver.com", "_blank");
  }});
  V = A.create();
  V.prototype = Object.extend(new x(new m(290, 25), new h(64, 15)), {qok9:function(a) {
    this.setAlign("right");
    this.setValign("top");
    this.opts = a || {mapModeBtn:!0, trafficBtn:!1, panoramaBtn:!1};
    this.layerWidth = 0;
    this.opts.mapModeBtn && (this.layerWidth += 165);
    this.trafficBtnPos = this.layerWidth;
    this.opts.trafficBtn && (this.layerWidth += 68);
    this.panoramaBtnPos = this.layerWidth;
    this.opts.panoramaBtn && (this.layerWidth += 61);
    this.gccl7 = !1;
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.setSize(new m(this.layerWidth, 25));
    this.opts.mapModeBtn && this.initMapMode();
    this.opts.trafficBtn && this.mpuq8();
    this.opts.panoramaBtn && this.wlt9();
    this.opts.panoramaDefaultOn && this.xeg8();
  }, initMapMode:function() {
    this.mapModeBtn1 = n.createOverlay("http://static.naver.com/maps/tab_traffic_t1.png", 54, 25, 0, 0, 0);
    this.mapModeBtn1.className = "noprint";
    y(this.mapModeBtn1, "pointer");
    this.appendChild(this.mapModeBtn1);
    d.attachDom(this.mapModeBtn1, "click", this, this.setNormalMap);
    this.mapModeBtn2 = n.createOverlay("http://static.naver.com/maps/tab_traffic_t2.png", 54, 25, 53, 0, 0);
    this.mapModeBtn2.className = "noprint";
    y(this.mapModeBtn2, "pointer");
    this.appendChild(this.mapModeBtn2);
    d.attachDom(this.mapModeBtn2, "click", this, this.setHybridMap);
    this.mapModeBtn3 = n.createOverlay("http://static.naver.com/maps/tab_traffic_t3.png", 54, 25, 106, 0, 0);
    this.mapModeBtn3.className = "noprint";
    y(this.mapModeBtn3, "pointer");
    this.appendChild(this.mapModeBtn3);
    d.attachDom(this.mapModeBtn3, "click", this, this.setSatelliteMap);
    d.bind(this.map, "mapMode", this, this.setMapModeBtns);
    d.trigger(this.map, "mapMode", this.map.getMapMode());
  }, mpuq8:function() {
    this.trafficBtn = n.createOverlay("http://static.naver.com/maps/tab_traffic_t4.png", 64, 25, this.trafficBtnPos, 0, 0);
    this.trafficBtn.className = "noprint";
    y(this.trafficBtn, "pointer");
    this.appendChild(this.trafficBtn);
    d.attachDom(this.trafficBtn, "click", this, this.jluo3);
    this.z7 = new ba;
    this.map.addControl(this.z7);
  }, wlt9:function() {
    this.panoramaBtn = n.createOverlay("http://static.naver.com/maps/tab_traffic_t5.png", 57, 25, this.panoramaBtnPos, 0, 0);
    this.panoramaBtn.className = "noprint";
    y(this.panoramaBtn, "pointer");
    this.appendChild(this.panoramaBtn);
    d.attachDom(this.panoramaBtn, "click", this, this.xeg8);
    d.bind(this.map, "togglePanorama", this, this.xeg8);
    this.panorama = new NPanorama(this.map);
    this.panoListbtn = new ca;
    this.map.addControl(this.panoListbtn);
    d.attachDom(this.panoramaBtn, "mouseover", this, this.mouseoverPanoramaBtn);
    d.attachDom(this.panoramaBtn, "mouseout", this, this.mouseoutPanoramaBtn);
    this.map.panorama = this.panorama;
  }, setNormalMap:function(a) {
    this.map.setMapMode(0);
    window.clickcr && (a || (a = window.event), clickcr(this.mapModeBtn1, "map.normal", "", "1", a, 1));
    document.getElementById("_nds") && (document.getElementById("_nds").src = "http://lcs.naver.com/u{" + document.URL + "normal}");
    d.trigger(this.map, "mapMode", 0);
  }, setHybridMap:function(a) {
    this.map.setMapMode(1);
    window.clickcr && (a || (a = window.event), clickcr(this.mapModeBtn2, "map.hybrid", "", "2", a, 1));
    document.getElementById("_nds") && (document.getElementById("_nds").src = "http://lcs.naver.com/u{" + document.URL + "hybrid}");
    d.trigger(this.map, "mapMode", 1);
  }, setSatelliteMap:function(a) {
    this.map.setMapMode(2);
    window.clickcr && (a || (a = window.event), clickcr(this.mapModeBtn3, "map.satellite", "", "3", a, 1));
    document.getElementById("_nds") && (document.getElementById("_nds").src = "http://lcs.naver.com/u{" + document.URL + "satellite}");
    d.trigger(this.map, "mapMode", 2);
  }, setMapModeBtns:function(a) {
    switch(a) {
      case 0:
        this.setBtnImage(this.mapModeBtn1, "http://static.naver.com/maps/tab_traffic_t1_on.png");
        this.setBtnImage(this.mapModeBtn2, "http://static.naver.com/maps/tab_traffic_t2.png");
        this.setBtnImage(this.mapModeBtn3, "http://static.naver.com/maps/tab_traffic_t3.png");
        break;
      case 1:
        this.setBtnImage(this.mapModeBtn1, "http://static.naver.com/maps/tab_traffic_t1.png");
        this.setBtnImage(this.mapModeBtn2, "http://static.naver.com/maps/tab_traffic_t2_on.png");
        this.setBtnImage(this.mapModeBtn3, "http://static.naver.com/maps/tab_traffic_t3.png");
        break;
      case 2:
        this.setBtnImage(this.mapModeBtn1, "http://static.naver.com/maps/tab_traffic_t1.png"), this.setBtnImage(this.mapModeBtn2, "http://static.naver.com/maps/tab_traffic_t2.png"), this.setBtnImage(this.mapModeBtn3, "http://static.naver.com/maps/tab_traffic_t3_on.png");
    }
  }, jluo3:function(a) {
    g.w6 ? (this.map.t2(), this.setBtnImage(this.trafficBtn, "http://static.naver.com/maps/tab_traffic_t4.png"), this.z7.close()) : (window.clickcr && (a || (a = window.event), clickcr(this.trafficBtn, "map.traffic", "", "4", a, 1)), document.getElementById("_nds") && (document.getElementById("_nds").src = "http://lcs.naver.com/u{" + document.URL + "traffic}"), this.map.p3(), this.setBtnImage(this.trafficBtn, "http://static.naver.com/maps/tab_traffic_t4_on.png"), this.z7.open());
  }, xeg8:function(a) {
    this.gccl7 ? (this.setBtnImage(this.panoramaBtn, "http://static.naver.com/maps/tab_traffic_t5.png"), this.panorama.off(), this.gccl7 = !1, this.panoListbtn.close()) : (window.clickcr && (a || (a = window.event), clickcr(this.panoramaBtn, "map.panorama", "", "5", a, 1)), document.getElementById("_nds") && (document.getElementById("_nds").src = "http://lcs.naver.com/u{" + document.URL + "panorama}"), this.setBtnImage(this.panoramaBtn, "http://static.naver.com/maps/tab_traffic_t5_on.png"), this.panorama.on(), 
    this.gccl7 = !0, this.panoListbtn.open());
  }, mouseoverPanoramaBtn:function() {
    this.gccl7 && (this.panoListbtn.clearMouseOutEvent(), this.panoListbtn.open());
  }, mouseoutPanoramaBtn:function() {
    this.gccl7 && this.panoListbtn.mouseOut();
  }, setBtnImage:function(a, b) {
    r.IE6 ? a.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '",sizingMethod="crop")' : a.src = b;
  }});
  var ca = A.create();
  ca.prototype = Object.extend(new x(new m(57, 26), new h(68, 39)), {qok9:function() {
    this.setAlign("right");
    this.setValign("top");
    this._tid = null;
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.listPopupBtn = n.createOverlay("http://static.naver.com/maps/area_view.gif", 57, 26, 0, 0, 0);
    y(this.listPopupBtn, "pointer");
    this.appendChild(this.listPopupBtn);
    d.attachDom(this.listPopupBtn, "click", this, this.openPopupLayer);
    d.attachDom(this.listPopupBtn, "mouseout", this, this.mouseOut);
    d.attachDom(this.listPopupBtn, "mouseover", this, this.clearMouseOutEvent);
    this.close();
  }, close:function() {
    this.gp4.style.display = "none";
  }, open:function() {
    this.gp4.style.display = "";
  }, openPopupLayer:function() {
    this.map.panorama.showNotice(!0);
  }, mouseOut:function() {
    this.clearMouseOutEvent();
    this._tid = L(this, function() {
      this.close();
      this._tid = null;
    }, 1E3);
  }, clearMouseOutEvent:function() {
    null != this._tid && clearTimeout(this._tid);
    this._tid = null;
  }});
  var ba = A.create();
  ba.prototype = Object.extend(new x(new m(229, 23), new h(129, 42)), {qok9:function() {
    this.setAlign("right");
    this.setValign("top");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.gp4.style.background = "url(http://static.naver.com/maps/mymap/bg_traffic_status2.gif) no-repeat";
    this.imgTxt1 = n.createOverlay("http://static.naver.com/maps/mymap/txt_congestion.gif", 17, 14, 7, 5, 0);
    this.imgStatus1 = n.createOverlay("http://static.naver.com/maps/mymap/ico_traffic_status1.gif", 20, 14, 28, 5, 0);
    this.imgStatus2 = n.createOverlay("http://static.naver.com/maps/mymap/ico_traffic_status2.gif", 20, 14, 48, 5, 0);
    this.imgStatus3 = n.createOverlay("http://static.naver.com/maps/mymap/ico_traffic_status3.gif", 20, 14, 68, 5, 0);
    this.imgStatus4 = n.createOverlay("http://static.naver.com/maps/mymap/ico_traffic_status4.gif", 20, 14, 88, 5, 0);
    this.imgTxt2 = n.createOverlay("http://static.naver.com/maps/mymap/txt_smooth.gif", 18, 14, 112, 5, 0);
    this.imgBar = n.createOverlay("http://static.naver.com/maps/mymap/bg_bar.gif", 1, 14, 133, 5, 0);
    this.txtTime = this.map.p21(0);
    this.txtTime.style.width = "30px";
    this.txtTime.style.height = "12px";
    this.txtTime.style.top = "6px";
    this.txtTime.style.left = "137px";
    this.txtTime.style.textAlign = "right";
    this.txtTime.style.fontFamily = "Tahoma";
    this.txtTime.style.fontWeight = "600";
    this.txtTime.style.fontSize = "9px";
    this.txtTime.innerHTML = this.getTime();
    this.imgTxt3 = n.createOverlay("http://static.naver.com/maps/mymap/txt_now.gif", 18, 14, 170, 5, 0);
    this.refreshBtn = n.createOverlay("http://static.naver.com/maps/mymap/btn_refresh2.gif", 14, 14, 194, 5, 0);
    this.closeBtn = n.createOverlay("http://static.naver.com/maps/mymap/btn_close2.gif", 14, 14, 210, 5, 0);
    y(this.imgStatus1, "pointer");
    y(this.imgStatus2, "pointer");
    y(this.imgStatus3, "pointer");
    y(this.imgStatus4, "pointer");
    y(this.refreshBtn, "pointer");
    y(this.closeBtn, "pointer");
    this.appendChild(this.imgTxt1);
    this.appendChild(this.imgStatus1);
    this.appendChild(this.imgStatus2);
    this.appendChild(this.imgStatus3);
    this.appendChild(this.imgStatus4);
    this.appendChild(this.imgTxt2);
    this.appendChild(this.imgBar);
    this.appendChild(this.txtTime);
    this.appendChild(this.imgTxt3);
    this.appendChild(this.refreshBtn);
    this.appendChild(this.closeBtn);
    d.attachDom(this.imgStatus1, "mouseover", this, this.mouseoverTip1);
    d.attachDom(this.imgStatus2, "mouseover", this, this.mouseoverTip2);
    d.attachDom(this.imgStatus3, "mouseover", this, this.mouseoverTip3);
    d.attachDom(this.imgStatus4, "mouseover", this, this.mouseoverTip4);
    d.attachDom(this.imgStatus1, "mouseout", this, this.mouseoutTip1);
    d.attachDom(this.imgStatus2, "mouseout", this, this.mouseoutTip2);
    d.attachDom(this.imgStatus3, "mouseout", this, this.mouseoutTip3);
    d.attachDom(this.imgStatus4, "mouseout", this, this.mouseoutTip4);
    d.attachDom(this.refreshBtn, "click", this, this.refresh);
    d.attachDom(this.closeBtn, "click", this, this.close);
    this.trafficTip = new da;
    this.map.addControl(this.trafficTip);
    this.close();
  }, close:function() {
    this.gp4.style.display = "none";
  }, open:function() {
    this.txtTime.innerHTML = this.getTime();
    this.gp4.style.display = "";
  }, refresh:function() {
    this.txtTime.innerHTML = this.getTime();
    this.map.t2();
    this.map.p3();
  }, mouseoverTip1:function() {
    this.trafficTip.setImageSize(new m(130, 53));
    this.trafficTip.setImageUrl("http://static.naver.com/maps/mymap/tip_1.gif");
    this.trafficTip.setPos(new h(192, 66));
    this.trafficTip.open();
  }, mouseoverTip2:function() {
    this.trafficTip.setImageSize(new m(126, 53));
    this.trafficTip.setImageUrl("http://static.naver.com/maps/mymap/tip_2.gif");
    this.trafficTip.setPos(new h(172, 66));
    this.trafficTip.open();
  }, mouseoverTip3:function() {
    this.trafficTip.setImageSize(new m(126, 53));
    this.trafficTip.setImageUrl("http://static.naver.com/maps/mymap/tip_3.gif");
    this.trafficTip.setPos(new h(152, 66));
    this.trafficTip.open();
  }, mouseoverTip4:function() {
    this.trafficTip.setImageSize(new m(130, 53));
    this.trafficTip.setImageUrl("http://static.naver.com/maps/mymap/tip_4.gif");
    this.trafficTip.setPos(new h(132, 66));
    this.trafficTip.open();
  }, mouseoutTip1:function() {
    this.trafficTip.close();
  }, mouseoutTip2:function() {
    this.trafficTip.close();
  }, mouseoutTip3:function() {
    this.trafficTip.close();
  }, mouseoutTip4:function() {
    this.trafficTip.close();
  }, getTime:function() {
    var a = new Date, b = a.getHours();
    10 > b && (b = "0" + b);
    a = a.getMinutes();
    10 > a && (a = "0" + a);
    return b + ":" + a;
  }});
  var da = A.create();
  da.prototype = Object.extend(new x(new m(130, 53), new h(68, 64)), {qok9:function() {
    this.setAlign("right");
    this.setValign("top");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.imgTip = n.createOverlay("http://static.naver.com/maps/mymap/tip_1.gif", 130, 53, 0, 0, 0);
    this.appendChild(this.imgTip);
    this.close();
  }, setImageSize:function(a) {
    a && (this.imgTip.style.width = a.width);
  }, setImageUrl:function(a) {
    a && (r.IE6 ? this.imgTip.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '",sizingMethod="crop")' : this.imgTip.src = a);
  }, open:function() {
    this.gp4.style.display = "";
  }, close:function() {
    this.gp4.style.display = "none";
  }});
  var ea = A.create();
  ea.prototype = Object.extend(new x(new m(52, 16), new h(60, 5)), {qok9:function() {
    this.setAlign("left");
    this.setValign("bottom");
    this.scale = null;
  }, init:function(a) {
    x.prototype.init.call(this, a);
    var b = n.create("http://static.naver.com/maps/scale_bar.gif", 52, 11, 0, 5, 0);
    this.appendChild(b);
    this.scaleLayer = this.map.p21(0);
    this.scaleLayer.style.width = "52px";
    this.scaleLayer.style.rhbo4 = "0 0 0 0px";
    this.scaleLayer.style.padding = "0";
    this.scaleLayer.style.color = "#000";
    this.scaleLayer.style.font = "10px Tahoma";
    this.scaleLayer.style.textAlign = "center";
    this.scaleLayer.style.letterSpacing = "-1px";
    this.scale = this.scaleLayer.innerText;
    this.calc(a.getZoom());
    this.appendChild(this.scaleLayer);
    d.bind(this.map, "zoom", this, this.calc);
    d.bind(this.map, "mapMode", this, this.setFontColor);
    d.trigger(this.map, "mapMode", this.map.getMapMode());
  }, calc:function(a) {
    a = 50 * g.gmko2(a);
    a = 1E3 < a ? Math.round(a / 10) / 100 + "km" : Math.round(a) + "m";
    this.scaleLayer.innerHTML = a;
  }, setFontColor:function(a) {
    this.scaleLayer.style.color = 0 === a ? "#000" : "#FFF";
  }, unload:function() {
    x.prototype.unload.call(this);
    this.scaleLayer = null;
  }});
  var fa = A.create();
  fa.prototype = Object.extend(new x(new m(62, 23), new h(155, 5)), {qok9:function() {
    this.setAlign("right");
    this.setValign("bottom");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    a = n.create("http://static.naver.com/n/local/206/map/0730/btn_save.gif", 62, 23, 0, 0, 0);
    y(a, "pointer");
    this.appendChild(a);
    d.attachDom(a, "click", this, this.saveMap);
  }, saveMap:function() {
    var a = this.map.inputFilter(this.map.getBound()), b = this.map.getZoom();
    document.location.href = "http://down.map.naver.com/?left=" + a[0] + "&top=" + a[1] + "&right=" + a[2] + "&bottom=" + a[3] + "&lvl=" + b;
  }});
  var ga = A.create();
  ga.prototype = Object.extend(new x(new m(62, 23), new h(7, 7)), {qok9:function() {
    this.setAlign("right");
    this.setValign("bottom");
    this.i10 = this.mapDiv = null;
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.button = n.create("http://static.naver.com/n/local/206/map/0730/btn_print.gif", 62, 23, 0, 0, 0);
    y(this.button, "pointer");
    this.appendChild(this.button);
    d.attachDom(this.button, "click", this, this.faa9);
  }, set:function(a, b) {
  }, ks8:function() {
    this.mapDiv.style.display = "none";
    this.map.getBound();
    this.map.getZoom();
    var a = this.map.getBoundOffset(), b = this.map.getMapSize();
    this.container.style.left = -1 * a[0] + "px";
    this.container.style.top = -1 * a[1] + "px";
    this.i10.style.width = b.width - (a[0] + a[2]) + "px";
    this.i10.style.height = b.height - (a[1] + a[3]) + "px";
    this.map.container.removeChild(this.map.div);
    this.container.appendChild(this.map.div);
    this.i10.style.display = "";
  }, nzi2:function() {
    this.i10.style.display = "none";
    this.container.removeChild(this.map.div);
    this.map.container.appendChild(this.map.div);
    this.mapDiv.style.display = "";
  }, faa9:function() {
    top.focus();
    openPrintMap();
  }, unload:function() {
    this.container = null;
  }});
  var ha = A.create();
  ha.prototype = Object.extend(new x(new m(55, 169), new h(6, 15)), {qok9:function() {
    this.setAlign("right");
    this.setValign("top");
    this.right = {board:{x:29, y:0}, bar:{x:33, y:24}, tvn6:{x:32, y:3}, ueiz1:{x:32, y:150}, ballon1:{x:0, y:131, img:"http://static.naver.com/maps/zoomControl/ballon1_l.png"}, ballon2:{x:0, y:113, img:"http://static.naver.com/maps/zoomControl/ballon2_l.png"}, ballon3:{x:0, y:86, img:"http://static.naver.com/maps/zoomControl/ballon3_l.png"}, ballon4:{x:0, y:59, img:"http://static.naver.com/maps/zoomControl/ballon4_l.png"}, ballon5:{x:0, y:41, img:"http://static.naver.com/maps/zoomControl/ballon5_l.png"}};
    this.left = {board:{x:0, y:0}, bar:{x:4, y:24}, tvn6:{x:3, y:3}, ueiz1:{x:3, y:150}, ballon1:{x:28, y:131, img:"http://static.naver.com/maps/zoomControl/ballon1_r.png"}, ballon2:{x:28, y:113, img:"http://static.naver.com/maps/zoomControl/ballon2_r.png"}, ballon3:{x:28, y:86, img:"http://static.naver.com/maps/zoomControl/ballon3_r.png"}, ballon4:{x:28, y:59, img:"http://static.naver.com/maps/zoomControl/ballon4_r.png"}, ballon5:{x:28, y:41, img:"http://static.naver.com/maps/zoomControl/ballon5_r.png"}};
    this.alignPos = this.right;
  }, init:function(a) {
    x.prototype.init.call(this, a);
    "left" == this.align.toLowerCase() && (this.alignPos = this.left);
    this.setZIndex(0);
    this.qeba0 = d.n6(this, this.c3);
    this.qg3 = d.n6(this, this.move);
    this.rl1 = d.n6(this, this.end);
    this.p5 = d.bind(this.map, "redraw", this, this.redraw);
    this.board = n.createOverlay("http://static.naver.com/maps/zoomControl/board.png", 26, 169, this.alignPos.board.x, this.alignPos.board.y, 0);
    this.appendChild(this.board);
    d.attachDom(this.board, "click", this, this.boardClick);
    d.attachDom(this.board, "mouseover", this, this.boardMouseover);
    d.attachDom(this.board, "mouseout", this, this.boardMouseout);
    this.bar = n.createOverlay("http://static.naver.com/maps/zoomControl/btn_level.png", 18, 12, this.alignPos.bar.x, this.alignPos.bar.y, 0);
    this.appendChild(this.bar);
    y(this.bar, "pointer");
    d.attachEvent(this.bar, "mousedown", this.qeba0);
    d.attachDom(this.bar, "mouseover", this, this.barMouseover);
    this.tvn6 = n.createOverlay("http://static.naver.com/maps/zoomControl/btn_plus.png", 20, 17, this.alignPos.tvn6.x, this.alignPos.tvn6.y, 0);
    this.appendChild(this.tvn6);
    y(this.tvn6, "pointer");
    d.attachDom(this.tvn6, "click", this, this.zoomIn);
    d.attachDom(this.tvn6, "mouseover", this, this.zoomInMouseover);
    d.attachDom(this.tvn6, "mouseout", this, this.zoomInMouseout);
    this.ueiz1 = n.createOverlay("http://static.naver.com/maps/zoomControl/btn_minus.png", 20, 17, this.alignPos.ueiz1.x, this.alignPos.ueiz1.y, 0);
    this.appendChild(this.ueiz1);
    y(this.ueiz1, "pointer");
    d.attachDom(this.ueiz1, "click", this, this.zoomOut);
    d.attachDom(this.ueiz1, "mouseover", this, this.zoomOutMouseover);
    d.attachDom(this.ueiz1, "mouseout", this, this.zoomOutMouseout);
    this.ballonInit();
    this.initBallonTimer = L(this, function() {
      this.ballonOff();
    }, 2E3);
    d.bind(this.map, "zoom", this, this.we3);
    this.we3(this.map.getZoom());
    this.initBoardTimer = L(this, function() {
      this.boardFadeOut();
    }, 3E3);
  }, zoomIn:function() {
    this.map.zoomIn();
    this.boardMouseover();
  }, zoomInMouseover:function() {
    this.ue4(this.tvn6, "http://static.naver.com/maps/zoomControl/btn_plus_on.png");
    this.boardMouseover();
  }, zoomInMouseout:function() {
    this.ue4(this.tvn6, "http://static.naver.com/maps/zoomControl/btn_plus.png");
    this.boardMouseout();
  }, zoomOut:function() {
    this.map.zoomOut();
    this.boardMouseover();
  }, zoomOutMouseover:function() {
    this.ue4(this.ueiz1, "http://static.naver.com/maps/zoomControl/btn_minus_on.png");
    this.boardMouseover();
  }, zoomOutMouseout:function() {
    this.ue4(this.ueiz1, "http://static.naver.com/maps/zoomControl/btn_minus.png");
    this.boardMouseout();
  }, zoom:function(a) {
    this.map.setZoom(a);
  }, boardClick:function(a, b) {
    var c = a || window.event, c = d.fca8(c, c.target || c.srcElement).y;
    24 > c && (c = 24);
    132 < c && (c = 132);
    c = Math.round((c - 24) / 9);
    c = Math.max(Math.min(c, 13), 0);
    this.zoom(c);
  }, boardMouseover:function(a, b) {
    this.initBallonTimer && (clearTimeout(this.initBallonTimer), this.initBallonTimer = null);
    this.initBoardTimer && (clearTimeout(this.initBoardTimer), this.initBoardTimer = null);
    this.boardTimer && (clearTimeout(this.boardTimer), this.boardTimer = null);
    this.ballonTimer && (clearTimeout(this.ballonTimer), this.ballonTimer = null);
    this.boardFadeIn();
    this.ballonOn();
  }, boardMouseout:function(a, b) {
    this.boardTimer = L(this, function() {
      this.boardFadeOut();
    }, 1E3);
    this.ballonTimer = L(this, function() {
      this.ballonOff();
    }, 1E3);
  }, boardFadeIn:function() {
    this.gp4.style.opacity = 1;
    this.gp4.style.filter = "alpha(opacity = 100)";
  }, boardFadeOut:function() {
    this.gp4.style.opacity = .5;
    this.gp4.style.filter = "alpha(opacity = 50)";
  }, resize:function(a, b) {
  }, barMouseover:function(a) {
    this.boardTimer && (clearTimeout(this.boardTimer), this.boardTimer = null);
    this.ballonTimer && (clearTimeout(this.ballonTimer), this.ballonTimer = null);
    this.boardFadeIn();
    this.ballonOn();
  }, we3:function(a, b, c) {
    this.bar.style.top = 9 * a + 24 + "px";
    a = null;
    (c = c || window.event) && (a = d.fca8(c, this.board));
    a && (0 > a.x || 26 < a.x || 0 > a.y || 169 < a.y) && (this.boardMouseover(), this.boardMouseout());
  }, c3:function(a) {
    this.vofy1 = (a || window.event).clientY;
    this.eehl9 = parseInt(this.bar.style.top);
    this.qg3 = d.attachDom(this.gp4, "mousemove", this, this.move);
    this.rl1 = d.attachDom(this.gp4, "mouseup", this, this.end);
    this.bar.setCapture && this.bar.setCapture();
    r.IE || d.attachDom(this.gp4, "mouseout", this, this.outEndFF);
  }, outEndFF:function(a) {
    a = a || window.event;
    var b = a.relatedTarget || a.toElement;
    this.gp4.contains(b) && this.gp4 != b || this.end(a);
  }, end:function(a) {
    a = Math.max(Math.min(Math.ceil((parseInt(this.bar.style.top) - 24) / 9), 13), 0);
    this.zoom(a);
    d.detachEvent(this.gp4, "mousemove", this.qg3);
    d.detachEvent(this.gp4, "mouseup", this.rl1);
    document.releaseCapture && document.releaseCapture();
    r.IE || d.detachEvent(this.gp4, "mouseout", this, this.outEndFF);
  }, move:function(a) {
    a = this.eehl9 + (a || window.event).clientY - this.vofy1;
    24 > a && (a = 24);
    132 < a && (a = 132);
    this.bar.style.top = a + "px";
  }, ballonInit:function() {
    this.ballon1 = n.createOverlay(this.alignPos.ballon1.img, 27, 13, this.alignPos.ballon1.x, this.alignPos.ballon1.y, 0);
    this.appendChild(this.ballon1);
    this.ballon2 = n.createOverlay(this.alignPos.ballon2.img, 27, 13, this.alignPos.ballon2.x, this.alignPos.ballon2.y, 0);
    this.appendChild(this.ballon2);
    this.ballon3 = n.createOverlay(this.alignPos.ballon3.img, 27, 13, this.alignPos.ballon3.x, this.alignPos.ballon3.y, 0);
    this.appendChild(this.ballon3);
    this.ballon4 = n.createOverlay(this.alignPos.ballon4.img, 27, 13, this.alignPos.ballon4.x, this.alignPos.ballon4.y, 0);
    this.appendChild(this.ballon4);
    this.ballon5 = n.createOverlay(this.alignPos.ballon5.img, 27, 13, this.alignPos.ballon5.x, this.alignPos.ballon5.y, 0);
    this.appendChild(this.ballon5);
  }, ballonOn:function() {
    this.ballon1.style.display = "";
    this.ballon2.style.display = "";
    this.ballon3.style.display = "";
    this.ballon4.style.display = "";
    this.ballon5.style.display = "";
  }, ballonOff:function() {
    this.ballon1.style.display = "none";
    this.ballon2.style.display = "none";
    this.ballon3.style.display = "none";
    this.ballon4.style.display = "none";
    this.ballon5.style.display = "none";
  }, ue4:function(a, b) {
    r.IE6 ? a.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '",sizingMethod="crop")' : a.src = b;
  }, unload:function() {
    this.removeChild(this.bar);
    this.bar = null;
    x.prototype.unload.call(this);
  }});
  var ia = A.create();
  ia.prototype = Object.extend(new x(new m(55, 173), new h(6, 15)), {qok9:function() {
    this.setAlign("right");
    this.setValign("top");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.zoomControl = X("http://static.naver.com/maps/common/levelBar.swf", "levelBar", 55, 173);
    this.zoomControl.style.position = "absolute";
    this.appendChild(this.zoomControl);
    O("ZoomIn", d.createCallback(this, this.zoomIn));
    O("ZoomOut", d.createCallback(this, this.zoomOut));
    O("Zoom", d.createCallback(this, this.zoom));
    O("Loaded", d.createCallback(this, this.we3));
    O("ResizeZoom", d.createCallback(this, this.resize));
    d.bind(this.map, "zoom", this, this.we3);
  }, zoomIn:function(a) {
    this.map.setZoom(a);
  }, zoomOut:function(a) {
    this.map.setZoom(a);
  }, zoom:function(a) {
    this.map.setZoom(a);
  }, resize:function(a, b) {
  }, we3:function(a) {
    var b;
    b = window.document.levelBar ? window.document.levelBar : r.IE ? document.getElementById("levelBar") : document.embeds && document.embeds.levelBar ? document.embeds.levelBar : void 0;
    void 0 == a && (a = this.map.getZoom());
    void 0 != b.setFlashZoom && b.setFlashZoom(a);
  }});
  var ja = A.create();
  ja.prototype = Object.extend(new x(new m(182, 207), new h(7, 7)), {qok9:function() {
    this.setAlign("right");
    this.setValign("top");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.miniMapLayer = this.map.p21(0);
    this.appendChild(this.miniMapLayer);
    this.miniMapLayer.style.backgroundImage = "url(http://static.naver.com/n/local/206/map/0816/bg_map.gif)";
    this.miniMapLayer.style.width = "135px";
    this.miniMapLayer.style.height = "168px";
    a = n.create("http://static.naver.com/n/local/206/map/0730/map_x.gif", 6, 5);
    a.style.top = "5px";
    a.style.right = "6px";
    y(a, "pointer");
    d.attachDom(a, "click", this, this.hideIMap);
    this.miniMapLayer.appendChild(a);
    a = this.map.p21(0);
    a.style.position = "relative";
    a.style.left = "11px";
    a.style.top = "17px";
    this.miniMapLayer.appendChild(a);
    this.miniMap = new e(a, 114, 141, !1);
    this.rect = new Q;
    this.miniMap.addOverlay(this.rect);
    this.rect.setOpacity(.5);
    this.MapBound2Mini();
    this.button = n.create("http://static.naver.com/n/local/206/map/0730/btn_minimap.gif", 45, 18);
    this.button.style.bottom = "0px";
    this.button.style.right = "0px";
    y(this.button, "pointer");
    this.button.style.display = "none";
    d.attachDom(this.button, "click", this, this.kr0);
    this.appendChild(this.button);
    d.attachEvent(this.miniMapLayer, "mousewheel", d.stopEvent);
    d.bind(this.map, "zoom", this, this.MapBound2Mini);
    d.bind(this.map, "move", this, this.MapCenter2Mini);
    d.bind(this.miniMap, "endDrag", this, this.miniCenter2Map);
  }, MapCenter2Mini:function() {
    this.miniMap.setCenter(this.map.getCenter());
    this.rect.setCenter(this.map.getCenter());
  }, miniCenter2Map:function() {
    this.map.setCenter(this.miniMap.getCenter());
  }, MapBound2Mini:function() {
    var a = this.map.getBound(), b = Math.round(.1 * (a[2] - a[0])), c = Math.round(.1 * (a[3] - a[1]));
    this.rect.setBound(this.map.getBound());
    a[0] -= b;
    a[1] -= c;
    a[2] += b;
    a[3] += c;
    this.miniMap.setBound(a);
  }, miniBound2Map:function() {
    this.map.setBound(this.miniMap.getBound());
  }, kr0:function() {
    this.miniMapLayer.style.display = "";
    this.button.style.display = "none";
  }, hideIMap:function() {
    this.miniMapLayer.style.display = "none";
    this.button.style.display = "";
  }});
  A = A.create();
  A.prototype = Object.extend(new x(new m(140, 149), new h(6, 5)), {qok9:function() {
    this.setAlign("right");
    this.setValign("bottom");
  }, init:function(a) {
    x.prototype.init.call(this, a);
    this.mrox6 = X("http://static.naver.com/maps/common/minimap.swf", "indexMap", 140, 149);
    this.mrox6.style.position = "absolute";
    this.mrox6.style.align = "right";
    this.appendChild(this.mrox6);
    O("Map", d.createCallback(this, this.setMapBound));
    O("ResizeMap", d.createCallback(this, this.resize));
  }, setMapBound:function(a) {
    this.map.setBound([[349433541, 149576214, 349690459, 149385651], [349216205, 150021274, 350243909, 149259026], [349054134, 149523975, 349311040, 149333418], [350650919, 150201742, 351678798, 149439397], [350061325, 149062282, 350575178, 148681091], [348737106, 148913289, 350126039, 147757589], [350534548, 148742302, 351562295, 147979801], [350716709, 147416221, 351563467, 146652646], [348997611, 147792586, 350025102, 147030105], [348672353, 147094927, 349699747, 146332394], [349771384, 148335618, 
    350052299, 147985768], [350767479, 147805127, 351142280, 147442702], [351361970, 147487854, 351809299, 147112701], [351176583, 147074308, 351664681, 146692827], [348862843, 145050738, 349376455, 144669366], [349220263, 146961591, 349565546, 146733217], [349038551, 150251030, 349360157, 150013911], [348921273, 150936636, 349564477, 150462393], [348279991, 150569270, 348923193, 150095036], [350406871, 150668955, 350728475, 150431834], [347937914, 151611513, 349224319, 150663036], [347310710, 152919678, 
    348597117, 151971192], [348342391, 152338556, 349628795, 151390075], [351229116, 154602550, 351872318, 154128310], [349258871, 153083513, 350545274, 152135030], [350217910, 153812793, 350861117, 153338559], [348707517, 153412159, 349350714, 152937914]][a]);
  }, resize:function(a, b) {
    30 < a ? (this.mrox6.width = "140", this.mrox6.height = "149", this.setPos(new h(8, 5))) : (this.mrox6.width = "26", this.mrox6.height = "22", this.setPos(new h(-106, -122)));
  }, kr0:function() {
    this.mrox6.style.display = "";
    d.trigger(this, "show");
  }, hideIMap:function() {
    this.mrox6.style.display = "none";
    d.trigger(this, "hide");
  }});
  C.prototype.init = function(a, b) {
    this.map = a;
    this.gp4 = this.map.p21(0);
    this.gp4.style.padding = this.rhbo4 + "px " + this.rhbo4 + "px " + this.rhbo4 + "px " + this.rhbo4 + "px ";
    this.gp4.oncontextmenu = falseFunc;
    this.gp4.onselectstart = falseFunc;
    this.gp4.ondragstart = falseFunc;
    B(b) ? this.parent = b : this.parent = this.map.infoLayer;
    this.parent.appendChild(this.gp4);
    this.show = !0;
    this.redrawCallback = d.bind(this.map, "redraw", this, this.redraw);
    d.bind(this.map, "unload", this, this.unload);
    d.bind(this.map, "zoom", this, this.calcSize);
    d.attachDom(this.gp4, "mousedown", this, this.rt6);
    d.attachDom(this.gp4, "mouseup", this, this.mouseUp);
    d.attachDom(this.gp4, "mouseover", this, this.mouseover);
    d.attachDom(this.gp4, "mouseout", this, this.mouseout);
    d.attachDom(this.gp4, "click", this, this.click);
  };
  C.prototype.calcSize = function() {
  };
  C.prototype.rt6 = function(a) {
    d.trigger(this, "mousedown");
  };
  C.prototype.mouseUp = function(a) {
    d.trigger(this, "mouseup");
  };
  C.prototype.mouseover = function(a) {
    d.trigger(this, "mouseover");
  };
  C.prototype.mouseout = function(a) {
    d.trigger(this, "mouseout");
  };
  C.prototype.click = function(a) {
    d.trigger(this, "click");
  };
  C.prototype.setCenter = function(a) {
    a = convdconv.inputFilter(a);
    if (null != this.bound) {
      var b = a.x - this.yayq1.x, c = a.y - this.yayq1.y;
      this.bound[0] += b;
      this.bound[1] += c;
      this.bound[2] += b;
      this.bound[3] += c;
    }
    this.yayq1 = a;
    this.redraw();
  };
  C.prototype.setSize = function(a) {
    this.bound = null;
    this.size = a;
    this.redraw();
  };
  C.prototype.setBound = function(a) {
    this.bound = this.conv.inputFilter(a);
    this.size = null;
    this.yayq1 = new h(Math.round((this.bound[0] + this.bound[2]) / 2), Math.round((this.bound[1] + this.bound[3]) / 2));
  };
  C.prototype.setContent = function(a) {
    this.content = a;
    this.redraw();
  };
  C.prototype.setOpacity = function(a) {
    this.opacity = a;
    this.redraw();
  };
  C.prototype.getPos = function() {
    return this.map.u27(this.map.fromPointToPixel(this.yayq1, this.map.uqpq8));
  };
  C.prototype.draw = function(a, b, c, f) {
    this.gp4.style.width = c + "px";
    this.gp4.style.height = f + "px";
    this.gp4.style.left = a + "px";
    this.gp4.style.top = b + "px";
    this.gp4.innerHTML = this.content;
    this.gp4.style.opacity = this.opacity;
    this.gp4.style.filter = "alpha(opacity = " + 100 * this.opacity + ")";
  };
  C.prototype.redraw = function() {
    if (null != this.map) {
      if (null != this.bound) {
        var a = this.bound[2], b = this.bound[3], c = this.map.u27(this.map.fromPointToPixel(new h(this.bound[0], this.bound[1]), this.map.uqpq8)), a = this.map.u27(this.map.fromPointToPixel(new h(a, b), this.map.uqpq8));
        this.draw(c.x, c.y, a.x - c.x, a.y - c.y);
      } else {
        null != this.size && (c = this.getPos(), this.draw(c.x - Math.round(this.size.width / 2), c.y - Math.round(this.size.height / 2), this.size.width, this.size.height));
      }
    }
  };
  C.prototype.showWindow = function() {
    null != this.hideTimeout && (window.clearTimeout(this.hideTimeout), this.hideTimeout = null);
    this.show || (this.show = !0, d.addListener(this.map, "redraw", this.redrawCallback), this.gp4.style.display = "", this.redraw());
  };
  C.prototype.hideWindow = function() {
    this.show && (this.show = !1, d.removeListener(this.map, "redraw", this.redrawCallback), this.gp4.style.display = "none");
  };
  C.prototype.delayHideWindow = function(a) {
    a || (a = 500);
    null != this.hideTimeout && window.clearTimeout(this.hideTimeout);
    this.hideTimeout = L(this, function() {
      this.hideWindow();
    }, a);
  };
  C.prototype.unload = function() {
    this.hideWindow();
    this.gp4 && (this.gp4.innerHTML = "");
    this.parent && this.parent.removeChild(this.gp4);
    this.map = this.redrawCallback = this.ogvt0 = this.gp4 = this.parent = null;
  };
  M.prototype = new C;
  M.prototype.setLineWeight = function(a) {
    this.lineWeight = a;
    this.redraw();
  };
  M.prototype.setLineColor = function(a) {
    this.lineColor = a;
    this.redraw();
  };
  M.prototype.setFillColor = function(a) {
    this.fillColor = a;
    this.redraw();
  };
  Q.prototype = new M;
  Q.prototype.init = function(a, b) {
    M.prototype.init.call(this, a, b);
    this.innerLayer = this.map.p21(0);
    this.innerLayer.style.overflow = "hidden";
    this.gp4.appendChild(this.innerLayer);
  };
  Q.prototype.draw = function(a, b, c, f) {
    r.IE ? (this.gp4.style.width = c + this.lineWeight + "px", this.gp4.style.height = f + this.lineWeight + "px") : (this.gp4.style.width = c - this.lineWeight + "px", this.gp4.style.height = f - this.lineWeight + "px");
    this.gp4.style.left = a - this.lineWeight / 2 + "px";
    this.gp4.style.top = b - this.lineWeight / 2 + "px";
    null != this.fillColor && (this.innerLayer.style.width = c - this.lineWeight + "px", this.innerLayer.style.height = f - this.lineWeight + "px", this.innerLayer.style.backgroundColor = this.fillColor);
    this.gp4.style.opacity = this.opacity;
    this.gp4.style.filter = "alpha(opacity = " + 100 * this.opacity + ")";
    this.gp4.style.border = this.lineWeight + "px " + this.lineColor + " solid";
  };
  P.prototype = new M;
  P.prototype.init = function(a, b) {
    M.prototype.init.call(this, a, b);
  };
  P.prototype.draw = function(a, b, c, f) {
    this.gp4.style.width = c + "px";
    this.gp4.style.height = f + "px";
    this.gp4.style.left = a + "px";
    this.gp4.style.top = b + "px";
    r.IE ? this.drawIE(c, f) : this.drawFF(c, f);
  };
  P.prototype.drawIE = function(a, b) {
    null == this.k9 && (this.k9 = document.createElement("oval"), this.k9.style.position = "absolute", this.gp4.appendChild(this.k9), this.k9.unselectable = "on", this.k9.filled = "False", this.k9.style.behavior = "url(#default#VML);", this.jx1 = document.createElement("stroke"), this.k9.appendChild(this.jx1), this.jx1.style.behavior = "url(#default#VML);");
    var c = Math.max(Math.min(a, b), 3);
    this.k9.style.left = Math.round((a - c) / 2) + "px";
    this.k9.style.top = Math.round((b - c) / 2) + "px";
    this.k9.style.width = c - 3 + "px";
    this.k9.style.height = c - 3 + "px";
    this.k9.strokeweight = this.lineWeight;
    this.k9.strokecolor = this.lineColor;
    this.jx1.opacity = this.opacity;
  };
  P.prototype.drawFF = function(a, b) {
    null == this.k9 && (this.k9 = document.createElement("canvas"), this.k9.style.position = "absolute", this.gp4.appendChild(this.k9));
    if (144E4 < a * b) {
      this.gp4.style.display = "none";
    } else {
      this.gp4.style.display = "";
      var c = Math.min(a, b) + this.lineWeight;
      a += 2 * this.lineWeight;
      b += 2 * this.lineWeight;
      this.k9.style.left = Math.round(-this.lineWeight) + "px";
      this.k9.style.top = Math.round(-this.lineWeight) + "px";
      this.k9.width = a;
      this.k9.height = b;
      var f;
      try {
        f = this.k9.getContext("2d");
      } catch (d) {
        f = null;
      }
      f && (f.globalAlpha = this.opacity, f.strokeStyle = this.lineColor, f.lineWidth = this.lineWeight, f.scale(1, 1), f.beginPath(), f.arc(a / 2, b / 2, (c - this.lineWeight) / 2, 0, 2 * Math.PI, !0), f.stroke());
    }
  };
  u.prototype.init = function(a, b) {
    this.redrawCallback = d.createCallback(this, this.redraw);
    this.map = a;
    this.infoDiv = this.map.p21(0);
    B(b) ? this.parent = b : this.parent = this.map.infoLayer;
    this.parent.appendChild(this.infoDiv);
    this.initWin();
    d.attachDom(this.infoDiv, "mouseout", this, this.mouseout);
    d.attachDom(this.infoDiv, "mouseover", this, this.mouseover);
    this.disableEventBubble("mousedown");
    this.disableEventBubble("click");
    this.disableEventBubble("dblclick");
    d.attachDom(this.infoDiv, "contextmenu", this, this.contextmenu);
  };
  u.prototype.enableEventBubble = function(a) {
    d.detachEvent(this.infoDiv, a, d.stopEvent);
  };
  u.prototype.disableEventBubble = function(a) {
    d.attachEvent(this.infoDiv, a, d.stopEvent);
  };
  u.prototype.setPos = function(a) {
    this.ogvt0 = a;
  };
  u.prototype.setZIndex = function(a) {
    this.zIndex = a;
    this.currentPos && this.redraw();
  };
  u.prototype.setAutoPosX = function(a) {
    this.autoPosX = a;
  };
  u.prototype.setAutoPosY = function(a) {
    this.autoPosY = a;
  };
  u.prototype.setOffset = function(a) {
    this.offset = a;
  };
  u.prototype.initWin = function() {
    this.infoDiv.style.padding = "0px 0px 0px 0px";
    this.infoDiv.style.display = "none";
    this.fby8 = this.map.p21(0);
    this.infoDiv.appendChild(this.fby8);
    this.fby8.style.position = "relative";
    this.fby8.noWrap = !0;
  };
  u.prototype.setOpacity = function(a) {
    this.opacity != a && (this.opacity = a, this.redraw());
  };
  u.prototype.setSize = function(a) {
    this.size = a;
    this.currentPos && this.redraw();
  };
  u.prototype.setPoint = function(a) {
    this.yayq1 = this.conv.inputFilter(a);
    this.currentPos && this.redraw();
  };
  u.prototype.setContent = function(a) {
    this.content = a;
    this.currentPos && this.redraw();
  };
  u.prototype.set = function(a, b) {
    this.yayq1 = this.conv.inputFilter(a);
    this.content = b;
    this.currentPos && this.redraw();
  };
  u.prototype.setClassName = function(a) {
    this.yik8 = a;
    this.currentPos && (this.currentSize = null, this.redraw());
  };
  u.prototype.yh5 = function() {
    var a = this.map.u27(this.map.fromPointToPixel(this.yayq1, this.map.uqpq8)), b, c;
    null != this.size ? (c = this.size.width / 2, b = this.size.height / 2) : (c = this.infoDiv.offsetWidth / 2, b = this.infoDiv.offsetHeight / 2);
    var f;
    f = this.map.tbs1.sg6.width + a.x;
    var a = this.map.tbs1.sg6.height + a.y, d = f - c + c * this.currentPos.x, l = a - b + b * this.currentPos.y, e = d + 2 * c - (this.map.rhu9.width - this.map.bp7[2]), d = this.map.bp7[0] - d, k = this.map.bp7[1] - l, l = l + 2 * b - (this.map.rhu9.height - this.map.bp7[3]);
    this.autoPosX && (1 == this.currentPos.x && 0 < e && f > this.map.rhu9.width - f + this.rhbo4 || -1 == this.currentPos.x && 0 < d && this.map.rhu9.width - f > f + this.rhbo4) && (this.currentPos.x *= -1);
    this.autoPosY && (1 == this.currentPos.y && 0 < l && l > Math.max(k, this.rhbo4) || -1 == this.currentPos.y && 0 < k && k > Math.max(l, this.rhbo4)) && (this.currentPos.y *= -1);
    c = f - c + c * this.currentPos.x + this.offset.width * this.currentPos.x;
    b = a - b + b * this.currentPos.y + this.offset.height * this.currentPos.y;
    this.infoDiv.style.left = c - this.map.tbs1.sg6.width + "px";
    this.infoDiv.style.top = b - this.map.tbs1.sg6.height + "px";
  };
  u.prototype.redraw = function(a) {
    if (null != this.map && null != this.yayq1 && "none" != this.infoDiv.style.display) {
      this.infoDiv.style.zIndex = this.zIndex;
      this.fby8.className = this.yik8;
      null != this.content && (this.fby8.innerHTML = this.content, this.currentSize = this.content = null);
      if (null == this.currentSize || 1 == a) {
        this.fby8.style.width = "", this.fby8.style.height = "", this.fby8.style.paddingLeft = "0px", this.fby8.style.paddingTop = "0px", this.currentSize = this.map.getDomSize(this.fby8), this.fby8.style.width = this.currentSize.width, this.fby8.style.height = this.currentSize.height, r.IE || (this.infoDiv.style.width = this.currentSize.width + "px", this.infoDiv.style.height = this.currentSize.height + "px");
      }
      null != this.size && (this.infoDiv.style.width = this.size.width + "px", this.infoDiv.style.height = this.size.height + "px", this.fby8.style.width = this.size.width + "px", this.fby8.style.height = this.size.height + "px");
      1 != this.opacity && (this.fby8.style.opacity = this.opacity, this.infoDiv.style.filter = "alpha(opacity = " + 100 * this.opacity + ")");
      this.yh5();
    }
  };
  u.prototype.pan = function() {
    var a = this.map.u27(this.map.fromPointToPixel(this.yayq1, this.map.uqpq8)), b = this.map.tbs1.sg6.width + a.x, a = this.map.tbs1.sg6.height + a.y - 40;
    this.map.pan(Math.min(Math.max(0, 10 - b), this.map.rhu9.width - 10 - (b + this.infoDiv.clientWidth)), Math.min(Math.max(0, 10 - (a - this.infoDiv.clientHeight)), this.map.rhu9.height - 10 - a));
  };
  u.prototype.contextmenu = function(a) {
    a || (a = window.event);
    d.trigger(this, "contextmenu");
    F(a);
  };
  u.prototype.mouseover = function(a) {
    a || (a = window.event);
    a && F(a);
    d.trigger(this, "mouseover");
  };
  u.prototype.mouseout = function(a) {
    a || (a = window.event);
    a && F(a);
    this.infoDiv.contains && !this.infoDiv.contains(a.relatedTarget || a.toElement) && d.trigger(this, "mouseout");
  };
  u.prototype.showWindow = function() {
    null != this.hideTimeout && (window.clearTimeout(this.hideTimeout), this.hideTimeout = null);
    null == this.currentPos && (this.currentPos = this.ogvt0.copy(), d.addListener(this.map, "redraw", this.redrawCallback), d.addListener(this.map, "move", this.redrawCallback), this.infoDiv.style.display = "", this.redraw());
  };
  u.prototype.hideWindow = function() {
    null != this.currentPos && (this.currentPos = null, d.removeListener(this.map, "redraw", this.redrawCallback), d.removeListener(this.map, "move", this.redrawCallback), this.infoDiv.style.display = "none");
  };
  u.prototype.delayHideWindow = function(a) {
    a || (a = 500);
    null != this.hideTimeout && window.clearTimeout(this.hideTimeout);
    this.hideTimeout = L(this, function() {
      this.hideWindow();
    }, a);
  };
  u.prototype.unload = function() {
    this.infoDiv.removeChild(this.fby8);
    this.fby8 = null;
    this.parent.removeChild(this.infoDiv);
    this.infoDiv.innerHTML = "";
    this.map = this.redrawCallback = this.ogvt0 = this.parent = this.infoDiv = null;
  };
  N.prototype = new u;
  N.prototype.initWin = function() {
    this.setOffset(new m(14, 0));
    this.setOpacity(1);
    this.infoDiv.style.padding = "0px 0px 0px 0px";
    this.infoDiv.style.display = "none";
    this.fby8 = this.map.p21(0);
    this.infoDiv.appendChild(this.fby8);
    this.setSkin();
  };
  N.prototype.set = function(a, b, c) {
    this.setType(c);
    this.setSkin();
    u.prototype.set.call(this, a, b);
  };
  N.prototype.setType = function(a) {
    this.type = void 0 != a ? a : "S";
  };
  N.prototype.setSkin = function() {
    this.fby8.style.position = "relative";
    "P" == this.type ? (this.fby8.style.background = "url(http://static.naver.com/maps/bg_box1.gif) left top no-repeat", this.fby8.className = "layer_ty1") : "L" == this.type ? (this.fby8.style.background = "url(http://static.naver.com/maps/bg_box2.gif) left top no-repeat", this.fby8.className = "layer_ty1 layer_ty2") : "S" == this.type && (this.fby8.style.background = "url(http://static.naver.com/maps/bg_box3.gif) left top no-repeat", this.fby8.className = "layer_ty1 layer_ty3");
  };
  N.prototype.redraw = function() {
    null != this.map && null != this.yayq1 && "none" != this.infoDiv.style.display && (this.fby8.style.width = "", this.fby8.style.height = "", this.infoDiv.style.width = "", this.infoDiv.style.height = "", this.fby8.innerHTML = this.content, this.infoDiv.style.width = this.fby8.offsetWidth + "px", this.infoDiv.style.height = this.fby8.offsetHeight + "px", this.infoDiv.style.zIndex = this.zIndex, u.prototype.yh5.call(this));
  };
  N.prototype.unload = function() {
    this.infoDiv.removeChild(this.a3);
    u.prototype.unload.call(this);
  };
  R.prototype.getOffset = function() {
    return this.offset;
  };
  R.prototype.getSize = function() {
    return this.size;
  };
  R.prototype.getSrcType = function() {
    return this.src.slice(this.src.length - 3, this.src.length).toLowerCase();
  };
  R.prototype.createObj = function(a) {
    a = "png" == this.getSrcType() ? n.createOverlay(this.src, this.size.width, this.size.height, 0, 0, 0) : n.create(this.src, this.size.width, this.size.height, 0, 0, 0);
    y(a, "pointer");
    return a;
  };
  q.prototype.setZindex = function(a) {
    this.cq5.style.zIndex = a;
  };
  q.prototype.setInfowin = function(a) {
    this.infowin = a;
  };
  q.prototype.unsetInfowin = function() {
    this.infowin = null;
  };
  q.prototype.setText = function(a) {
    null != this.q4 && (this.q4.unload(), this.q4 = null);
    this.text = a;
    this.redraw();
  };
  q.prototype.setTitle = function(a) {
    this.su8 = a;
  };
  q.prototype.getTitle = function(a) {
    return this.su8;
  };
  q.prototype.getText = function() {
    return this.text;
  };
  q.prototype.setContent = function(a) {
    this.content = a;
  };
  q.prototype.setIconImage = function(a) {
    a && (r.IE6 ? this.cq5.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '",sizingMethod="crop")' : this.cq5.src = a);
  };
  q.prototype.setTargeturl = function(a) {
    this.wul9 = a;
    this.cq5.onclick = function() {
      window.open(a, "_blank");
    };
  };
  q.prototype.unsetTargeturl = function() {
    this.wul9 = null;
    this.cq5.onclick = "";
  };
  q.prototype.setPropagationEvent = function(a) {
    this.a5 = a;
  };
  q.prototype.setPoint = function(a) {
    this.yayq1 = this.conv.inputFilter(a);
    this.redraw();
  };
  q.prototype.getPoint = function(a) {
    a ? a.set(this.yayq1.x, this.yayq1.y) : a = this.yayq1.copy();
    return this.conv.outputFilter(a);
  };
  q.prototype.getPos = function() {
    var a = this.map.u27(this.map.fromPointToPixel(this.yayq1, this.map.uqpq8)), b = this.vn1.getOffset();
    return new h(a.x - b.width, a.y - b.height);
  };
  q.prototype.init = function(a, b) {
    this.map = a;
    B(b) ? this.parent = b : this.parent = this.map.markLayer;
    this.parent.appendChild(this.cq5);
    d.attachDom(this.cq5, "mouseover", this, this.mouseover);
    d.attachDom(this.cq5, "mouseout", this, this.mouseout);
    d.attachDom(this.cq5, "mousedown", this, this.lv3);
    d.attachDom(this.cq5, "mouseup", this, this.mouseup);
    d.attachDom(this.cq5, "click", this, this.click);
    d.bind(this.map, "unload", this, this.unload);
    this.p5 = d.bind(this.map, "redraw", this, this.redraw);
    this.setPoint(this.yayq1);
    d.bind(this.map, "mousemove", this, this.mousedragginng);
  };
  q.prototype.unload = function() {
    d.removeListener(this.map, "zoom", this.p5);
    null != this.q4 && this.q4.unload();
    this.map && this.parent && (this.parent.removeChild(this.cq5), this.map.p95(this), this.parent = null);
    this.infowin = this.cq5 = null;
  };
  q.prototype.enableShift = function() {
    this.shift = !0;
    this.map.wvj1(this);
    this.redraw();
  };
  q.prototype.disableShift = function() {
    this.shift = !1;
    this.map.p95(this);
    this.redraw();
  };
  q.prototype.redraw = function(a) {
    var b;
    B(a) || (a = !1);
    null != this.map && (this.shift ? (b = this.map.hjtt8(this), void 0 == b && (b = this.getPos())) : b = this.getPos(), null != this.cq5 && (this.cq5.style.left = b.x + "px", this.cq5.style.top = b.y + "px", this.cq5.ogvt0 = b), null != this.text ? null == this.q4 ? this.setOverlay() : this.q4.redraw(a) : null != this.q4 && (this.q4.unload(), this.q4 = null));
  };
  q.prototype.setOverlay = function() {
    this.q4 = new u;
    this.q4.init(this.map, this.parent);
    this.q4.set(this.yayq1, this.text);
    2 == this.version && this.q4.setAutoPosX(!1);
    this.q4.setAutoPosY(!1);
    this.q4.setPos(new NPoint(1, 1));
    this.q4.showWindow();
    if (2 == this.version) {
      this.q4.setClassName("layer_ty4");
      var a = this.vn1.getSize(), b = this.map.getDomSize(this.q4.fby8);
      this.q4.setOffset(new NSize(-b.width / 2, 2 * -a.height + 8));
    } else {
      a = this.vn1.getSize(), b = this.vn1.getOffset(), this.q4.setOffset(new NSize(-b.width + a.width, -b.height + 2));
    }
    this.q4.redraw(!0);
  };
  q.prototype.show = function() {
    null != (this.map && this.cq5) && (this.cq5.style.display = "", null != this.q4 && this.q4.showWindow());
  };
  q.prototype.hide = function() {
    null != (this.map && this.cq5) && (this.cq5.style.display = "none", null != this.q4 && this.q4.hideWindow());
  };
  q.prototype.setInfoWinZIndex = function(a) {
    this.map.setInfoWinZIndex(a);
  };
  q.prototype.showInfoWin = function(a) {
    this.map.setInfoWin(this.getPoint(), a);
    this.map.showInfoWin();
  };
  q.prototype.hideInfoWin = function(a) {
    this.map.hideInfoWin(a);
  };
  q.prototype.showInfo = function() {
    null != this.infowin && (this.infowin.set(this.getPoint(), this.content), this.infowin.showWindow());
  };
  q.prototype.click = function(a) {
    this.ignoreClickOnce ? this.ignoreClickOnce = !1 : (a || (a = window.event), !this.a5 && a && F(a), d.trigger(this, "click", this.getPoint()));
  };
  q.prototype.lv3 = function(a) {
    a || (a = window.event);
    !this.a5 && a && F(a);
    this.draggable && (this.dragging = !0, a = this.map.currentMousePoint(a), this.dragMouseOffset = new h(this.yayq1.x - a.x, this.yayq1.y - a.y), this.ignoreClickOnce = !1);
    d.trigger(this, "mousedown");
  };
  q.prototype.mouseup = function(a) {
    a || (a = window.event);
    !this.a5 && a && F(a);
    if (this.draggable && this.dragging) {
      this.dragging = !1;
      if (this.onEndDrag) {
        this.onEndDrag(this, this.getPoint());
      }
      this.redraw();
    }
    d.trigger(this, "mouseup");
  };
  q.prototype.mousedragginng = function(a) {
    if (this.draggable && this.dragging) {
      if (!this.ignoreClickOnce && (this.yayq1.x != a.x || this.yayq1.y != a.y) && (this.ignoreClickOnce = !0, this.onStartDrag)) {
        this.onStartDrag(this, this.getPoint());
      }
      this.ignoreClickOnce && (this.yayq1.x = a.x + this.dragMouseOffset.x, this.yayq1.y = a.y + this.dragMouseOffset.y, this.redraw());
    }
  };
  q.prototype.mouseover = function(a) {
    a || (a = window.event);
    !this.a5 && a && F(a);
    this.wta7 = this.cq5.style.zIndex;
    this.cq5.style.zIndex = 999;
    this.cq5.style.left = this.cq5.ogvt0.x - this.l44.width + "px";
    this.cq5.style.top = this.cq5.ogvt0.y - this.l44.height + "px";
    this.showInfo();
    d.trigger(this, "mouseover", this.getPoint());
  };
  q.prototype.setOverAmt = function(a, b) {
    this.l44.set(a, b);
  };
  q.prototype.mouseout = function(a) {
    a || (a = window.event);
    !this.a5 && a && F(a);
    this.cq5.style.zIndex = this.wta7;
    this.cq5.style.left = this.cq5.ogvt0.x + "px";
    this.cq5.style.top = this.cq5.ogvt0.y + "px";
    null != this.infowin && this.infowin.delayHideWindow();
    d.trigger(this, "mouseout");
  };
  q.prototype.setMovable = function(a, b, c) {
    this.draggable = a;
    b && (this.onStartDrag = b);
    c && (this.onEndDrag = c);
  };
  q.prototype.getMovable = function(a, b, c) {
    return this.draggable;
  };
  z.prototype.zk6 = function(a, b) {
    this.leftTopPoint.set(a, b);
  };
  z.prototype.init = function(a) {
    this.map = a;
    this.parent || (this.parent = this.map.pathLayer);
    d.bind(this.map, "beforePrint", this, this.ks8);
    d.bind(this.map, "afterPrint", this, this.nzi2);
    d.bind(this.map, "unload", this, this.unload);
  };
  z.prototype.ks8 = function() {
    this.ue8() && (this.y2 = this.j3(this.gp4));
  };
  z.prototype.nzi2 = function() {
    null != this.y2 && (this.gp4.removeChild(this.y2), this.y2 = null);
  };
  z.prototype.setWeight = function(a) {
    this.weight = a;
    null != this.rt9 && (r.IE ? this.rt9.weight = Math.round(this.getWeight() / 1.3) : this.rt9.lineWidth = a);
  };
  z.prototype.getWeight = function() {
    return this.weight;
  };
  z.prototype.setColor = function(a) {
    this.color = a;
    null != this.rt9 && (r.IE ? this.rt9.color = a : this.rt9.strokeStyle = a);
  };
  z.prototype.getColor = function() {
    return this.color;
  };
  z.prototype.setOpacity = function(a) {
    this.opacity = a;
    null != this.rt9 && (r.IE ? this.rt9.opacity = a : this.rt9.globalAlpha = a);
  };
  z.prototype.getOpacity = function() {
    return this.opacity;
  };
  z.prototype.redraw = function() {
    null == this.gp4 && (this.gp4 = this.vc0());
    this.polyline(this.gp4);
    this.dc4 = !1;
  };
  z.prototype.show = function() {
    this.dc4 && this.redraw();
    this.ue8() || (this.parent.appendChild(this.gp4), this.igbx3 = !0);
  };
  z.prototype.hide = function() {
    this.ue8() && (this.parent.removeChild(this.gp4), this.igbx3 = !1);
  };
  z.prototype.vc0 = function() {
    var a = document.createElement("div");
    a.style.position = "absolute";
    a.style.width = this.width + 2 * this.rhbo4 + "px";
    a.style.height = this.height + 2 * this.rhbo4 + "px";
    a.style.overflow = "hidden";
    return a;
  };
  z.prototype.ue8 = function() {
    return this.igbx3;
  };
  z.prototype.setPos = function(a, b) {
    this.gp4.style.left = a - this.rhbo4 + "px";
    this.gp4.style.top = b - this.rhbo4 + "px";
  };
  z.prototype.moveTo = function(a) {
    this.plx0.push(this.auyi5);
    this.lineTo(a);
  };
  z.prototype.lineTo = function(a) {
    a = new h(a.x - this.leftTopPoint.x + this.rhbo4, this.leftTopPoint.y - a.y + this.rhbo4);
    this.szyg6 = !0;
    this.plx0.push(a);
  };
  z.prototype.fix = function() {
    if (this.szyg6) {
      for (var a = this.plx0.length - 1;1 < a;a--) {
        this.plx0[a - 1].equals(this.auyi5) ? this.plx0[a].equals(this.plx0[a - 2]) && this.plx0.splice(a - 1, 2) : this.plx0[a].equals(this.plx0[a - 1]) && this.plx0.splice(a, 1);
      }
      this.szyg6 = !1;
    }
  };
  z.prototype.printMode = function(a) {
    this.yqou9 = a;
  };
  z.prototype.polyline = function(a) {
    null != this.k9 && a.removeChild(this.k9);
    this.k9 = this.yqou9 ? this.j3(a) : r.IE ? this.vo3(a) : this.pf6(a);
  };
  z.prototype.j3 = function(a) {
    var b = "http://down.map.naver.com/path.php?path=" + this.plx0.join(",") + "&width=" + (this.width + 2 * this.rhbo4) + "&height=" + (this.height + 2 * this.rhbo4) + "&line_width=" + this.getWeight() + "&color=" + this.getColor().substr(1), b = n.create(b, this.width + 2 * this.rhbo4, this.height + 2 * this.rhbo4, 0, 0);
    a.appendChild(b);
    return b;
  };
  z.prototype.vo3 = function(a) {
    var b, c = "";
    b = document.createElement("shape");
    b.oncontextmenu = falseFunc;
    a.appendChild(b);
    b.unselectable = "on";
    b.fill = !1;
    b.filled = !1;
    b.style.position = "absolute";
    b.style.behavior = "url(#default#VML);";
    a = document.createElement("stroke");
    b.appendChild(a);
    a.endcap = "flat";
    a.joinstyle = "round";
    a.opacity = this.getOpacity();
    a.color = this.getColor();
    a.style.behavior = "url(#default#VML);";
    b.style.width = this.width + 2 * this.rhbo4 + "px";
    b.style.height = this.height + 2 * this.rhbo4 + "px";
    b.coordorigin = "0 0";
    b.coordsize = this.width + 2 * this.rhbo4 + " " + (this.height + 2 * this.rhbo4);
    var c = "", f = !1;
    this.fix();
    for (var d = 0;d < this.plx0.length;d++) {
      this.plx0[d].equals(this.auyi5) ? (d++, d < this.plx0.length - 1 && (c = c + " m " + this.plx0[d].x + "," + this.plx0[d].y + " l ", f = !0)) : f ? (f = !1, c = c + this.plx0[d].x + "," + this.plx0[d].y) : c = c + "," + this.plx0[d].x + "," + this.plx0[d].y;
    }
    b.path = c + " e";
    a.weight = Math.round(this.getWeight() / 1.3);
    b.style.left = "0px";
    b.style.top = "0px";
    this.rt9 = a;
    return b;
  };
  z.prototype.pf6 = function(a) {
    var b = document.createElement("canvas");
    a.appendChild(b);
    b.oncontextmenu = falseFunc;
    b.style.position = "absolute";
    b.width = this.width + 2 * this.rhbo4;
    b.height = this.height + 2 * this.rhbo4;
    b.style.left = "0px";
    b.style.top = "0px";
    if (b.getContext) {
      a = b.getContext("2d");
      a.lineWidth = this.getWeight();
      a.globalAlpha = this.getOpacity();
      a.lineCap = "butt";
      a.lineJoin = "round";
      a.translate(0, 0);
      a.beginPath();
      a.strokeStyle = this.getColor();
      for (var c = 0;c < this.plx0.length;c++) {
        this.plx0[c].equals(this.auyi5) ? (c++, a.moveTo(this.plx0[c].x, this.plx0[c].y)) : a.lineTo(this.plx0[c].x, this.plx0[c].y), 0 == c % 40 && a.stroke();
      }
      a.stroke();
      this.rt9 = a;
    }
    return b;
  };
  z.prototype.unload = function() {
    this.map && this.parent && (null != this.gp4 && (this.gp4.parentNode == this.parent && this.parent.removeChild(this.gp4), this.gp4 = null), this.parent = this.map = null);
    this.rt9 = this.leftTopPoint = this.auyi5 = this.plx0 = null;
  };
  p.prototype.enablePrint = function() {
    this.yqou9 = !0;
  };
  p.prototype.disablePrint = function() {
    this.yqou9 = !1;
  };
  p.prototype.setArrow = function(a) {
    this.arrow = a;
    this.drawArrow();
  };
  p.prototype.drawArrowIE = function(a, b, c) {
    var f;
    b = this.conv.inputFilter(b);
    var d = this.conv.inputFilter(c);
    c = this.map.u27(this.map.fromPointToPixel(b, this.map.getZoom()));
    b = this.map.u27(this.map.fromPointToPixel(d, this.map.getZoom()));
    var l;
    f = 2 * (this.getWeight() + 3);
    l = this.getWeight() + 3;
    d = Math.pow(Math.pow(c.x - b.x, 2) + Math.pow(c.y - b.y, 2), .5);
    if (0 == d) {
      return null;
    }
    var e = (b.x - c.x) / d, k = (b.y - c.y) / d;
    b = c.x + Math.round(f * e + l * k);
    var d = c.y + Math.round(f * k - l * e), g = c.x + Math.round(f * e - l * k);
    l = c.y + Math.round(f * k + l * e);
    var e = Math.min(c.x, b, g), k = Math.min(c.y, d, l), h = Math.max(c.x, b, g) - e, n = Math.max(c.y, d, l) - k;
    f = document.createElement("shape");
    a.appendChild(f);
    f.unselectable = "on";
    f.style.position = "absolute";
    f.style.behavior = "url(#default#VML);";
    a = document.createElement("stroke");
    f.appendChild(a);
    a.endcap = "flat";
    a.joinstyle = "miter";
    a.opacity = this.getOpacity();
    a.color = this.getColor();
    a.style.behavior = "url(#default#VML);";
    fillProperty = document.createElement("fill");
    f.appendChild(fillProperty);
    fillProperty.opacity = this.getOpacity();
    fillProperty.color = this.getColor();
    fillProperty.style.behavior = "url(#default#VML);";
    f.style.width = h + "px";
    f.style.height = n + "px";
    f.style.left = e + "px";
    f.style.top = k + "px";
    f.coordorigin = e + " " + k;
    f.coordsize = h + " " + n;
    f.path = "m " + c + " l " + b + "," + d + ", " + g + "," + l + " x e";
    return f;
  };
  p.prototype.drawArrowFF = function(a, b, c) {
    var d;
    b = this.conv.inputFilter(b);
    var e = this.conv.inputFilter(c);
    c = this.map.u27(this.map.fromPointToPixel(b, this.map.getZoom()));
    b = this.map.u27(this.map.fromPointToPixel(e, this.map.getZoom()));
    var l;
    d = 2 * (this.getWeight() + 3);
    l = this.getWeight() + 3;
    e = Math.pow(Math.pow(c.x - b.x, 2) + Math.pow(c.y - b.y, 2), .5);
    if (0 == e) {
      return null;
    }
    var g = (b.x - c.x) / e, k = (b.y - c.y) / e;
    b = c.x + Math.round(d * g + l * k);
    var e = c.y + Math.round(d * k - l * g), h = c.x + Math.round(d * g - l * k);
    l = c.y + Math.round(d * k + l * g);
    var g = Math.min(c.x, b, h), k = Math.min(c.y, e, l), n = Math.max(c.x, b, h) - g, p = Math.max(c.y, e, l) - k;
    d = document.createElement("canvas");
    d.width = n;
    d.height = p;
    a.appendChild(d);
    d.style.position = "absolute";
    var m;
    try {
      m = d.getContext("2d");
    } catch (q) {
      m = null;
    }
    m && (m.globalAlpha = this.getOpacity(), m.strokeStyle = this.getColor(), m.fillStyle = this.getColor(), m.scale(1, 1), m.translate(-g, -k), m.beginPath(), m.moveTo(c.x, c.y), m.lineTo(b, e), m.lineTo(h, l), m.lineTo(c.x, c.y), m.fill(), m.stroke());
    d.style.left = g + "px";
    d.style.top = k + "px";
    return d;
  };
  p.prototype.drawArrow = function() {
    null != this.map && (null != this.startArrow && this.gp4.removeChild(this.startArrow), null != this.endArrow && this.gp4.removeChild(this.endArrow), 2 > this.td2.length || (1 == this.arrow % 2 && (this.startArrow = r.IE ? this.drawArrowIE(this.gp4, this.td2[0], this.td2[1]) : this.drawArrowFF(this.gp4, this.td2[0], this.td2[1])), 1 < this.arrow && (this.endArrow = r.IE ? this.drawArrowIE(this.gp4, this.td2[this.td2.length - 1], this.td2[this.td2.length - 2]) : this.drawArrowFF(this.gp4, this.td2[this.td2.length - 
    1], this.td2[this.td2.length - 2]))));
  };
  p.prototype.se9 = function(a, b) {
    this.ixet4[a] || (this.ixet4[a] = [], this.turnOnList[a] = []);
    this.ixet4[a][b.x] || (this.ixet4[a][b.x] = []);
    if (!this.ixet4[a][b.x][b.y]) {
      var c = new z(g.tileSize, g.tileSize, 20, this.gp4);
      c.printMode(this.yqou9);
      c.init(this.map);
      c.zk6(b.x * g.tileSize, (b.y + 1) * g.tileSize);
      c.itnq4 = b.copy();
      this.ixet4[a][b.x][b.y] = c;
    }
    return this.ixet4[a][b.x][b.y];
  };
  p.prototype.igbx3 = function(a, b, c) {
    if (this.ixet4 && this.ixet4[a] && this.ixet4[a][b] && this.ixet4[a][b][c] && this.enable) {
      var d = this.ixet4[a][b][c];
      d.setWeight(this.getWeight());
      d.setColor(this.getColor());
      d.setOpacity(this.getOpacity());
      d.show();
      d.setPos((b - this.map.ss4.x) * g.tileSize - this.map.zo63.width, (this.map.ss4.y - c) * g.tileSize - this.map.zo63.height);
      this.turnOnList[a].push(d);
    }
  };
  p.prototype.i5 = function(a, b, c) {
    if (this.ixet4 && this.ixet4[a] && this.ixet4[a][b] && this.ixet4[a][b][c] && this.enable) {
      for (b = this.ixet4[a][b][c], b.hide(), c = 0;c < this.turnOnList[a].length;c++) {
        if (b == this.turnOnList[a][c]) {
          this.turnOnList[a].splice(c, 1);
          break;
        }
      }
    }
  };
  p.prototype.init = function(a, b) {
    this.map = a;
    this.gp4 = this.map.p21(0);
    B(b) ? this.parent = b : this.parent = this.map.pathLayer;
    this.parent.appendChild(this.gp4);
    this.redrawCallback = d.bind(this.map, "redraw", this, this.redraw);
    this.p5 = d.bind(this.map, "zoom", this, this.qok9);
    this.turnOnCallback = d.bind(this.map, "drawTile", this, this.igbx3);
    this.turnOffCallback = d.bind(this.map, "removeTile", this, this.i5);
    d.bind(this.map, "unload", this, this.unload);
    this.enable = !0;
    this.qok9(this.map.getZoom());
  };
  p.prototype.mnhb3 = function() {
    if (null != this.map && this.enable && this.ixet4 && this.ixet4[this.r1]) {
      for (var a = this.map.qe3(), b = a[0];b < a[2];b++) {
        for (var c = a[1];c > a[3];c--) {
          this.igbx3(this.r1, b, c);
        }
      }
    }
    this.drawArrow();
  };
  p.prototype.gdx2 = function(a) {
    if (null != this.map && this.enable) {
      for (;0 < this.turnOnList[a].length;) {
        this.turnOnList[a].pop().hide();
      }
    }
  };
  p.prototype.xp7 = function(a, b, c) {
    var d, e, l, t, k = c.x > b.x ? 1 : -1, m = c.y > b.y ? 1 : -1, n = g.tileSize, p = new h(Math.floor(b.x / n), Math.floor(b.y / n)), q = new h(Math.floor(c.x / n), Math.floor(c.y / n));
    for (l = this.se9(a, p);!q.equals(p);) {
      var r = k, u = m;
      d = p.x * n;
      l = (p.y + 1) * n;
      t = (p.x + 1) * n;
      e = p.y * n;
      d = c.x > b.x ? t : d;
      t = c.y > b.y ? l : e;
      b.y == c.y && b.x == c.x ? (r = u = 0, e = b.x, l = b.y) : b.y == c.y ? (u = 0, e = d, l = b.y) : b.x == c.x ? (r = 0, e = b.x, l = t) : (e = (c.y - b.y) / (c.x - b.x), l = b.y + (d - b.x) * e, e = b.x + (t - b.y) / e, 0 < (c.y - b.y) * (t - l) ? (u = 0, e = d) : 0 > (c.y - b.y) * (t - l) && (0 != d - e && (r = 0), l = t));
      d = new h(Math.round(e), Math.round(l));
      b.set(e, l);
      l = this.se9(a, p);
      l.lineTo(d);
      p.set(Math.floor((b.x + r) / n), Math.floor((b.y + u) / n));
      l = this.se9(a, p);
      l.moveTo(d);
    }
    l.lineTo(c);
  };
  p.prototype.c6 = function(a, b, c) {
    var d, e = this.map.fromPointToPixel(b[c], a);
    if (1 == this.arrow % 2 && 0 == c) {
      d = this.map.fromPointToPixel(b[1], a);
      var l = 2 * (this.getWeight() + 3), t = d.distance(e);
      t <= l ? e = d.copy() : e.add(Math.round((d.x - e.x) / t * l), Math.round((d.y - e.y) / t * l));
    }
    0 == c && this.se9(a, new h(Math.floor(e.x / g.tileSize), Math.floor(e.y / g.tileSize))).moveTo(e);
    for (c += 1;c < b.length;c++) {
      d = this.map.fromPointToPixel(b[c], a), c == b.length - 1 && 1 < this.arrow && (l = 2 * (this.getWeight() + 3), t = d.distance(e), t <= l ? d = e.copy() : d.add(-Math.round((d.x - e.x) / t * l), -Math.round((d.y - e.y) / t * l))), 8 > Math.abs(e.x - d.x) + Math.abs(e.y - d.y) && c < b.length - 1 || (this.xp7(a, e, d), e = d);
    }
  };
  p.prototype.qok9 = function(a, b) {
    this.r1 = a;
    !this.enable || 2 > this.td2.length || (0 <= b && this.gdx2(b), this.ixet4[this.r1] && null != this.ixet4[this.r1] || this.c6(a, this.td2, 0), this.mnhb3());
  };
  p.prototype.setWeight = function(a) {
    this.weight = a;
    this.mnhb3();
  };
  p.prototype.getWeight = function(a) {
    return a = this.autoWeight ? Math.min(Math.max(Math.round(this.weight * (12 - this.r1) / 12), this.minWeight), this.maxWeight) : Math.min(Math.max(this.weight, this.minWeight), this.maxWeight);
  };
  p.prototype.setAutoWeight = function(a) {
    this.autoWeight = a;
  };
  p.prototype.setMinWeight = function(a) {
    this.minWeight = a;
  };
  p.prototype.setMaxWeight = function(a) {
    this.maxWeight = a;
  };
  p.prototype.setOpacity = function(a) {
    this.opacity = a;
    this.mnhb3();
  };
  p.prototype.getOpacity = function() {
    return this.opacity;
  };
  p.prototype.setColor = function(a) {
    this.color = a;
    this.mnhb3();
  };
  p.prototype.getColor = function() {
    return this.color;
  };
  p.prototype.addPoints = function() {
    for (var a, b = 0;b < arguments.length;b++) {
      a = this.conv.inputFilter(arguments[b]), this.left = Math.min(this.left, a.x), this.top = Math.max(this.top, a.y), this.right = Math.max(this.right, a.x), this.bottom = Math.min(this.bottom, a.y), this.td2.push(a);
    }
    if (null != this.map && (a = Math.max(this.td2.length - arguments.length - 1, 0), 2 <= this.td2.length)) {
      this.ixet4[this.r1] || (this.ixet4[this.r1] = [], this.turnOnList[this.r1] = []);
      for (var c in this.ixet4) {
        isNaN(c) || this.c6(c, this.td2, a);
      }
      this.bl5();
      this.enable = !0;
      this.mnhb3();
    }
  };
  p.prototype.getBound = function() {
    return [this.left, this.top, this.right, this.bottom];
  };
  p.prototype.getPoints = function() {
    return this.td2;
  };
  p.prototype.getPoint = function(a) {
    return this.td2[a];
  };
  p.prototype.setPoint = function(a, b) {
    var c = this.conv.inputFilter(b);
    this.td2[a] instanceof h && (this.td2[a].set(c.x, c.y), this.oz21());
  };
  p.prototype.oz21 = function() {
    this.nbv4();
    this.qok9(this.r1);
    this.redraw();
  };
  p.prototype.redraw = function() {
    null != this.map && this.mnhb3();
  };
  p.prototype.show = function() {
    this.enable = !0;
    this.qok9(this.r1);
  };
  p.prototype.hide = function() {
    this.gdx2(this.r1);
    this.enable = !1;
  };
  p.prototype.bl5 = function() {
    for (var a in this.ixet4) {
      if (!isNaN(a)) {
        for (var b in this.ixet4[a]) {
          if (!isNaN(b)) {
            for (var c in this.ixet4[a][b]) {
              isNaN(c) || (this.ixet4[a][b][c].dc4 = !0);
            }
          }
        }
      }
    }
  };
  p.prototype.nbv4 = function() {
    for (var a in this.ixet4) {
      if (!isNaN(a)) {
        for (var b in this.ixet4[a]) {
          if (!isNaN(b)) {
            for (var c in this.ixet4[a][b]) {
              isNaN(c) || (this.ixet4[a][b][c].unload(), delete this.ixet4[a][b][c], this.ixet4[a][b][c] = null);
            }
            this.ixet4[a][b] = null;
          }
        }
        this.ixet4[a] = null;
      }
    }
  };
  p.prototype.unload = function() {
    this.map && this.parent && (d.removeListener(this.map, "zoom", this.p5), this.parent.removeChild(this.gp4), this.parent = null);
    this.nbv4();
    this.ixet4 = null;
  };
  S.prototype.setType = function(a) {
    this.xo3 = a;
  };
  S.prototype.setCacheAction = function(a) {
    this.nocache = a;
  };
  S.prototype.loadhttp = function(a, b) {
    var c = this.klui7, d = this.c91, e = [];
    e.push(c);
    e.push(this.xo3);
    for (var l = 1;l < arguments.length;l++) {
      e.push(arguments[l]);
    }
    c.open("GET", a, this.async);
    c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    this.nocache && c.setRequestHeader("If-Modified-Since", "0");
    this.async && (c.onreadystatechange = function() {
      d.apply(this, e);
    });
    c.send(null);
    if (0 == this.async) {
      return 0 == this.xo3 ? c.responseText : c.responseXML;
    }
  };
  S.prototype.c91 = function(a, b, c) {
    if (null != a && 4 == a.readyState && 0 != a.responseText.length) {
      var d = [];
      0 == b ? d.push(a.responseText) : d.push(a.responseXML);
      for (var e = 3;e < arguments.length;e++) {
        d.push(arguments[e]);
      }
      200 != a.status && (d[0] = null);
      c.apply(this, d);
    }
  };
  I.prototype.e0fn = function(a) {
    return 1 - .25 * a * (1 + a / 16 * (3 + 1.25 * a));
  };
  I.prototype.e1fn = function(a) {
    return .375 * a * (1 + .25 * a * (1 + .46875 * a));
  };
  I.prototype.e2fn = function(a) {
    return .05859375 * a * a * (1 + .75 * a);
  };
  I.prototype.e3fn = function(a) {
    return 35 / 3072 * a * a * a;
  };
  I.prototype.mlfn = function(a, b, c, d, e) {
    return a * e - b * Math.sin(2 * e) + c * Math.sin(4 * e) - d * Math.sin(6 * e);
  };
  I.prototype.sign = function(a) {
    return 0 > a ? -1 : 1;
  };
  I.prototype.adjust_lon = function(a) {
    return a = Math.abs(a) < this.PI ? a : a - this.sign(a) * this.TWO_PI;
  };
  K.prototype.setCS = function(a) {
    a || (a = this.system.TM128, this.csErrorMessage += "No coordinate system definition provided, assuming longlat TM128");
    var b = {};
    b.su8 = void 0 != a.su8 ? a.su8 : null;
    b.proj = void 0 != a.proj ? a.proj : null;
    b.a = void 0 != a.a ? parseFloat(a.a) : null;
    b.b = void 0 != a.b ? parseFloat(a.b) : null;
    b.lon0 = void 0 != a.lon0 ? a.lon0 * this.D2R : null;
    b.lat0 = void 0 != a.lat0 ? a.lat0 * this.D2R : null;
    b.x0 = void 0 != a.x0 ? parseFloat(a.x0) : null;
    b.y0 = void 0 != a.y0 ? parseFloat(a.y0) : null;
    b.k0 = void 0 != a.k0 ? parseFloat(a.k0) : null;
    b.to_meter = void 0 != a.to_meter ? eval(a.to_meter) : null;
    b.zone = void 0 != a.zone ? parseInt(a.zone) : null;
    b.datum_params = void 0 != a.towgs84 ? a.towgs84.split(",") : null;
    b.from_greenwich = void 0 != a.from_greenwich ? a.from_greenwich * this.D2R : null;
    if (b.datum_params) {
      for (a = 0;a < b.datum_params.length;a++) {
        b.datum_params[a] = parseFloat(b.datum_params[a]);
      }
      if (0 != b.datum_params[0] || 0 != b.datum_params[1] || 0 != b.datum_params[2]) {
        b.datum_type = this.PJD_3PARAM;
      }
      3 < b.datum_params.length && (0 != b.datum_params[3] || 0 != b.datum_params[4] || 0 != b.datum_params[5] || 0 != b.datum_params[6]) && (b.datum_type = this.PJD_7PARAM, b.datum_params[3] *= this.SEC_TO_RAD, b.datum_params[4] *= this.SEC_TO_RAD, b.datum_params[5] *= this.SEC_TO_RAD, b.datum_params[6] = b.datum_params[6] / 1E6 + 1);
    }
    b.datum_type || (b.datum_type = this.PJD_WGS84);
    b.a || (b.a = 6378137, b.b = 6356752.31424518, this.csErrorMessage += "\nEllipsoid parameters not provided, assuming WGS84");
    b.a2 = b.a * b.a;
    b.b2 = b.b * b.b;
    b.es = (b.a2 - b.b2) / b.a2;
    b.e = Math.sqrt(b.es);
    b.ep2 = (b.a2 - b.b2) / b.b2;
    "longlat" != b.proj && (a = new I, Object.extend(b, a), a = new H, Object.extend(b, a[b.proj]), b.init(b));
    return b;
  };
  K.prototype.transform = function(a, b, c) {
    if (0 != c.x && 0 != c.y) {
      "longlat" == a.proj ? (c.x *= this.D2R, c.y *= this.D2R) : (a.to_meter && (c.x *= a.to_meter, c.y *= a.to_meter), a.inverse(c));
      a.from_greenwich && (c.x += a.from_greenwich);
      if (0 != this.datum_transform(a, b, c)) {
        return 0;
      }
      b.from_greenwich && (c.x -= b.from_greenwich);
      "longlat" == b.proj ? (c.x *= this.R2D, c.y *= this.R2D) : (b.forward(c), b.to_meter && (c.x /= b.to_meter, c.y /= b.to_meter));
    }
  };
  K.prototype.datum_transform = function(a, b, c) {
    if (this.compare_datums(a, b)) {
      return 0;
    }
    a.datum_type == this.PJD_GRIDSHIFT && alert("ERROR: Grid shift transformations are not implemented yet.");
    b.datum_type == this.PJD_GRIDSHIFT && alert("ERROR: Grid shift transformations are not implemented yet.");
    if (a.datum_type == this.PJD_3PARAM || a.datum_type == this.PJD_7PARAM || b.datum_type == this.PJD_3PARAM || b.datum_type == this.PJD_7PARAM) {
      this.geodetic_to_geocentric(a, c), a.datum_type != this.PJD_3PARAM && a.datum_type != this.PJD_7PARAM || this.geocentric_to_wgs84(a, c), b.datum_type != this.PJD_3PARAM && b.datum_type != this.PJD_7PARAM || this.geocentric_from_wgs84(b, c), this.geocentric_to_geodetic(b, c);
    }
    b.datum_type == this.PJD_GRIDSHIFT && alert("ERROR: Grid shift transformations are not implemented yet.");
    return 0;
  };
  K.prototype.compare_datums = function(a, b) {
    return a.datum_type != b.datum_type ? 0 : a.datum_type == this.PJD_3PARAM ? a.datum_params[0] == b.datum_params[0] && a.datum_params[1] == b.datum_params[1] && a.datum_params[2] == b.datum_params[2] : a.datum_type == this.PJD_7PARAM ? a.datum_params[0] == b.datum_params[0] && a.datum_params[1] == b.datum_params[1] && a.datum_params[2] == b.datum_params[2] && a.datum_params[3] == b.datum_params[3] && a.datum_params[4] == b.datum_params[4] && a.datum_params[5] == b.datum_params[5] && a.datum_params[6] == 
    b.datum_params[6] : a.datum_type == this.PJD_GRIDSHIFT ? 0 == strcmp(pj_param(a.params, "snadgrids").s, pj_param(b.params, "snadgrids").s) : 1;
  };
  K.prototype.geodetic_to_geocentric = function(a, b) {
    var c = b.x, d = b.y, e = b.z, l, g, k, h = 0;
    if (d < -this.HALF_PI && d > -1.001 * this.HALF_PI) {
      d = -this.HALF_PI;
    } else {
      if (d > this.HALF_PI && d < 1.001 * this.HALF_PI) {
        d = this.HALF_PI;
      } else {
        if (d < -this.HALF_PI || d > this.HALF_PI) {
          h |= this.GEOCENT_LAT_ERROR;
        }
      }
    }
    h || (c > this.PI && (c -= 2 * this.PI), k = Math.sin(d), g = Math.cos(d), d = a.a / Math.sqrt(1 - a.es * k * k), l = (d + e) * g * Math.cos(c), g = (d + e) * g * Math.sin(c), k *= d * (1 - a.es) + e);
    b.x = l;
    b.y = g;
    b.z = k;
    return h;
  };
  K.prototype.geocentric_to_geodetic = function(a, b) {
    var c = b.x, d = b.y, e = b.z, l, g, k, h, n, c = parseFloat(c), d = parseFloat(d), e = parseFloat(e);
    n = !1;
    if (0 != c) {
      l = Math.atan2(d, c);
    } else {
      if (0 < d) {
        l = this.HALF_PI;
      } else {
        if (0 > d) {
          l = -this.HALF_PI;
        } else {
          if (n = !0, l = 0, 0 < e) {
            g = this.HALF_PI;
          } else {
            if (0 > e) {
              g = -this.HALF_PI;
            } else {
              return;
            }
          }
        }
      }
    }
    k = c * c + d * d;
    c = Math.sqrt(k);
    d = e * this.AD_C;
    k = Math.sqrt(d * d + k);
    d /= k;
    k = c / k;
    d = e + a.b * a.ep2 * d * d * d;
    h = c - a.a * a.es * k * k * k;
    k = Math.sqrt(d * d + h * h);
    d /= k;
    k = h / k;
    h = a.a / Math.sqrt(1 - a.es * d * d);
    e = k >= this.COS_67P5 ? c / k - h : k <= -this.COS_67P5 ? c / -k - h : e / d + h * (a.es - 1);
    0 == n && (g = Math.atan(d / k));
    b.x = l;
    b.y = g;
    b.z = e;
    return 0;
  };
  K.prototype.geocentric_to_wgs84 = function(a, b) {
    if (a.datum_type == this.PJD_3PARAM) {
      b.x += a.datum_params[0], b.y += a.datum_params[1], b.z += a.datum_params[2];
    } else {
      var c = a.datum_params[3], d = a.datum_params[4], e = a.datum_params[5], g = a.datum_params[6], h = g * (e * b.x + b.y - c * b.z) + a.datum_params[1], c = g * (-d * b.x + c * b.y + b.z) + a.datum_params[2];
      b.x = g * (b.x - e * b.y + d * b.z) + a.datum_params[0];
      b.y = h;
      b.z = c;
    }
  };
  K.prototype.geocentric_from_wgs84 = function(a, b) {
    if (a.datum_type == this.PJD_3PARAM) {
      b.x -= a.datum_params[0], b.y -= a.datum_params[1], b.z -= a.datum_params[2];
    } else {
      var c = a.datum_params[3], d = a.datum_params[4], e = a.datum_params[5], g = a.datum_params[6], h = (b.x - a.datum_params[0]) / g, k = (b.y - a.datum_params[1]) / g, g = (b.z - a.datum_params[2]) / g;
      b.x = h + e * k - d * g;
      b.y = -e * h + k + c * g;
      b.z = d * h - c * k + g;
    }
  };
  H.prototype.tmerc = {};
  H.prototype.tmerc.init = function(a) {
    a.e0 = this.e0fn(a.es);
    a.e1 = this.e1fn(a.es);
    a.e2 = this.e2fn(a.es);
    a.e3 = this.e3fn(a.es);
    a.ml0 = a.a * this.mlfn(a.e0, a.e1, a.e2, a.e3, a.lat0);
    a.ind = 1E-5 > a.es ? 1 : 0;
  };
  H.prototype.tmerc.forward = function(a) {
    var b = this.adjust_lon(a.x - this.lon0), c, d;
    c = Math.sin(a.y);
    var e = Math.cos(a.y);
    if (0 != this.ind) {
      var g = e * Math.sin(b);
      if (1E-10 > Math.abs(Math.abs(g) - 1)) {
        return alert("Error in ll2tm(): Point projects into infinity"), 93;
      }
      d = .5 * this.a * this.k0 * Math.log((1 + g) / (1 - g));
      c = Math.acos(e * Math.cos(b) / Math.sqrt(1 - g * g));
      0 > a.y && (c = -c);
      b = this.a * this.k0 * (c - this.lat0);
    } else {
      d = e * b;
      var b = Math.pow(d, 2), e = this.ep2 * Math.pow(e, 2), g = Math.tan(a.y), h = Math.pow(g, 2);
      c = 1 - this.es * Math.pow(c, 2);
      c = this.a / Math.sqrt(c);
      var k = this.a * this.mlfn(this.e0, this.e1, this.e2, this.e3, a.y);
      d = this.k0 * c * d * (1 + b / 6 * (1 - h + e + b / 20 * (5 - 18 * h + Math.pow(h, 2) + 72 * e - 58 * this.ep2))) + this.x0;
      b = this.k0 * (k - this.ml0 + c * g * b * (.5 + b / 24 * (5 - h + 9 * e + 4 * Math.pow(e, 2) + b / 30 * (61 - 58 * h + Math.pow(h, 2) + 600 * e - 330 * this.ep2)))) + this.y0;
    }
    a.x = d;
    a.y = b;
  };
  H.prototype.tmerc.inverse = function(a) {
    var b, c, d, e;
    if (0 != this.ind) {
      b = Math.exp(a.x / (this.a * this.k0)), c = .5 * (b - 1 / b), d = this.lat0 + a.y / (this.a * this.k0), e = Math.cos(d), b = Math.sqrt((1 - e * e) / (1 + c * c)), b = Math.asin(b), 0 > d && (b = -b), c = 0 == c && 0 == e ? this.lon0 : this.adjust_lon(Math.atan2(c, e) + this.lon0);
    } else {
      a.x -= this.x0;
      a.y -= this.y0;
      c = b = (this.ml0 + a.y / this.k0) / this.a;
      for (e = 0;;e++) {
        d = (b + this.e1 * Math.sin(2 * c) - this.e2 * Math.sin(4 * c) + this.e3 * Math.sin(6 * c)) / this.e0 - c;
        c += d;
        if (Math.abs(d) <= this.EPSLN) {
          break;
        }
        if (6 <= e) {
          return 95;
        }
      }
      if (Math.abs(c) < this.HALF_PI) {
        d = Math.cos(c);
        var g = Math.tan(c);
        e = this.ep2 * Math.pow(d, 2);
        var h = Math.pow(e, 2), k = Math.pow(g, 2), n = Math.pow(k, 2);
        b = 1 - this.es * Math.pow(Math.sin(c), 2);
        var p = this.a / Math.sqrt(b), m = a.x / (p * this.k0), q = Math.pow(m, 2);
        b = c - p * g * q / (p * (1 - this.es) / b) * (.5 - q / 24 * (5 + 3 * k + 10 * e - 4 * h - 9 * this.ep2 - q / 30 * (61 + 90 * k + 298 * e + 45 * n - 252 * this.ep2 - 3 * h)));
        c = this.adjust_lon(this.lon0 + m * (1 - q / 6 * (1 + 2 * k + e - q / 20 * (5 - 2 * e + 28 * k - 3 * h + 8 * this.ep2 + 24 * n))) / d);
      } else {
        b = this.HALF_PI * this.sign(a.y), c = this.lon0;
      }
    }
    a.x = c;
    a.y = b;
  };
  H.prototype.utm = {};
  H.prototype.utm.init = function(a) {
    a.lat0 = 0;
    a.lon0 = (6 * Math.abs(a.zone) - 183) * this.D2R;
    a.x0 = 5E5;
    a.y0 = 0 > a.zone ? 1E7 : 0;
    a.k0 || (a.k0 = .9996);
    this.tmerc.init(a);
  };
  H.prototype.utm.forward = H.prototype.tmerc.forward;
  H.prototype.utm.inverse = H.prototype.tmerc.inverse;
  w.prototype.getCoordMode = function(a) {
    if (!a) {
      return !1;
    }
    if (a instanceof Array || "string" != typeof a && 4 == a.length) {
      a = a[0];
    } else {
      if (a instanceof Object && "x" in a) {
        a = a.x;
      } else {
        if ("number" != typeof a) {
          return !1;
        }
      }
    }
    return 13E7 <= a ? 0 : 0 < a && 180 > a && -1 < a.toString().indexOf(".") ? 3 : -1 == a.toString().indexOf(".") ? 2 : 1;
  };
  w.prototype.fromLatLngToTM128 = function(a) {
    if (a) {
      return a = a.copy(), this.cs.transform(this.cs.setCS(this.cs.system.LatLng), this.cs.setCS(this.cs.system.TM128), a), new G(parseInt(a.x), parseInt(a.y));
    }
  };
  w.prototype.fromTM128ToLatLng = function(a) {
    if (a) {
      return a = a.copy(), this.cs.transform(this.cs.setCS(this.cs.system.TM128), this.cs.setCS(this.cs.system.LatLng), a), new E(parseFloat(a.y).toFixed(7), parseFloat(a.x).toFixed(7));
    }
  };
  w.prototype.fromLatLngToUTMK = function(a) {
    if (a) {
      return a = a.copy(), this.cs.transform(this.cs.setCS(this.cs.system.LatLng), this.cs.setCS(this.cs.system.UTMK), a), new D(parseFloat(a.x).toFixed(1), parseFloat(a.y).toFixed(1));
    }
  };
  w.prototype.fromUTMKToLatLng = function(a) {
    if (a) {
      return a = a.copy(), this.cs.transform(this.cs.setCS(this.cs.system.UTMK), this.cs.setCS(this.cs.system.LatLng), a), new E(parseFloat(a.y).toFixed(7), parseFloat(a.x).toFixed(7));
    }
  };
  w.prototype.fromTM128ToUTMK = function(a) {
    if (a) {
      return a = a.copy(), this.cs.transform(this.cs.setCS(this.cs.system.TM128), this.cs.setCS(this.cs.system.UTMK), a), new D(parseFloat(a.x).toFixed(1), parseFloat(a.y).toFixed(1));
    }
  };
  w.prototype.fromUTMKToTM128 = function(a) {
    if (a) {
      return a = a.copy(), this.cs.transform(this.cs.setCS(this.cs.system.UTMK), this.cs.setCS(this.cs.system.TM128), a), new G(parseInt(a.x), parseInt(a.y));
    }
  };
  w.prototype.fromLatLngToInner = function(a) {
    if (a) {
      return a = this.fromLatLngToUTMK(a), this.fromUTMKToInner(a);
    }
  };
  w.prototype.fromInnerToLatLng = function(a) {
    if (a) {
      return a = this.fromInnerToUTMK(a), this.fromUTMKToLatLng(a);
    }
  };
  w.prototype.fromTM128ToInner = function(a) {
    if (a) {
      return a = this.fromTM128ToUTMK(a), this.fromUTMKToInner(a);
    }
  };
  w.prototype.fromInnerToTM128 = function(a) {
    if (a) {
      return a = this.fromInnerToUTMK(a), this.fromUTMKToTM128(a);
    }
  };
  w.prototype.fromUTMKToInner = function(a) {
    if (a) {
      return new h(parseInt(10 * a.x + 34E7), parseInt(10 * a.y + 13E7));
    }
  };
  w.prototype.fromInnerToUTMK = function(a) {
    if (a) {
      return new D(parseFloat((a.x - 34E7) / 10).toFixed(1), parseFloat((a.y - 13E7) / 10).toFixed(1));
    }
  };
  w.prototype.toInner = function(a) {
    if (a) {
      var b;
      if (a instanceof Array || "string" != typeof a && 4 == a.length) {
        switch(this.getCoordMode(a)) {
          case 0:
            return a;
          case 1:
            b = this.fromUTMKToInner(new D(a[0], a[1]));
            a = this.fromUTMKToInner(new D(a[2], a[3]));
            break;
          case 2:
            b = this.fromTM128ToInner(new G(a[0], a[1]));
            a = this.fromTM128ToInner(new G(a[2], a[3]));
            break;
          case 3:
            b = this.fromLatLngToInner(new E(a[1], a[0]));
            a = this.fromLatLngToInner(new E(a[3], a[2]));
            break;
          default:
            return !1;
        }
        return [b.x, b.y, a.x, a.y];
      }
      switch(a.getCoordMode()) {
        case 0:
          return a;
        case 1:
          return this.fromUTMKToInner(a);
        case 2:
          return this.fromTM128ToInner(a);
        case 3:
          return this.fromLatLngToInner(a);
        default:
          return !1;
      }
    }
  };
  w.prototype.toLatLng = function(a) {
    if (a) {
      var b;
      if (a instanceof Array || "string" != typeof a && 4 == a.length) {
        switch(this.getCoordMode(a)) {
          case 0:
            b = this.fromInnerToLatLng(new h(a[0], a[1]));
            a = this.fromInnerToLatLng(new h(a[2], a[3]));
            break;
          case 1:
            b = this.fromUTMKToLatLng(new D(a[0], a[1]));
            a = this.fromUTMKToLatLng(new D(a[2], a[3]));
            break;
          case 2:
            b = this.fromTM128ToLatLng(new G(a[0], a[1]));
            a = this.fromTM128ToLatLng(new G(a[2], a[3]));
            break;
          case 3:
            return a;
          default:
            return !1;
        }
        return [b.x, b.y, a.x, a.y];
      }
      switch(a.getCoordMode()) {
        case 0:
          return this.fromInnerToLatLng(a);
        case 1:
          return this.fromUTMKToLatLng(a);
        case 2:
          return this.fromTM128ToLatLng(a);
        case 3:
          return a;
        default:
          return !1;
      }
    }
  };
  w.prototype.toTM128 = function(a) {
    if (a) {
      var b;
      if (a instanceof Array || "string" != typeof a && 4 == a.length) {
        switch(this.getCoordMode(a)) {
          case 0:
            b = this.fromInnerToTM128(new h(a[0], a[1]));
            a = this.fromInnerToTM128(new h(a[2], a[3]));
            break;
          case 1:
            b = this.fromUTMKToTM128(new D(a[0], a[1]));
            a = this.fromUTMKToTM128(new D(a[2], a[3]));
            break;
          case 2:
            return a;
          case 3:
            b = this.fromLatLngToTM128(new E(a[1], a[0]));
            a = this.fromLatLngToTM128(new E(a[3], a[2]));
            break;
          default:
            return !1;
        }
        return [b.x, b.y, a.x, a.y];
      }
      switch(a.getCoordMode()) {
        case 0:
          return this.fromInnerToTM128(a);
        case 1:
          return this.fromUTMKToTM128(a);
        case 2:
          return a;
        case 3:
          return this.fromLatLngToTM128(a);
        default:
          return !1;
      }
    }
  };
  w.prototype.toUTMK = function(a) {
    if (a) {
      var b;
      if (a instanceof Array) {
        switch(this.getCoordMode(a) || "string" != typeof a && 4 == a.length) {
          case 0:
            b = this.fromInnerToUTMK(new h(a[0], a[1]));
            a = this.fromInnerToUTMK(new h(a[2], a[3]));
            break;
          case 1:
            return a;
          case 2:
            b = this.fromTM128ToUTMK(new G(a[0], a[1]));
            a = this.fromTM128ToUTMK(new G(a[2], a[3]));
            break;
          case 3:
            b = this.fromLatLngToUTMK(new E(a[1], a[0]));
            a = this.fromLatLngToUTMK(new E(a[3], a[2]));
            break;
          default:
            return !1;
        }
        return [b.x, b.y, a.x, a.y];
      }
      switch(a.getCoordMode()) {
        case 0:
          return this.fromInnerToUTMK(a);
        case 1:
          return a;
        case 2:
          return this.fromTM128ToUTMK(a);
        case 3:
          return this.fromLatLngToUTMK(a);
        default:
          return !1;
      }
    }
  };
  w.prototype.inputFilter = function(a) {
    if (a) {
      return this.toInner(a);
    }
  };
  w.prototype.outputFilter = function(a) {
    if (a) {
      switch(g.coordMode) {
        case 0:
          return this.toInner(a);
        case 1:
          return this.toUTMK(a);
        case 2:
          return this.toTM128(a);
        case 3:
          return this.toLatLng(a);
        default:
          return this.toInner(a);
      }
    }
  };
  window.N_MAP_SPEC = g;
  window.NMap = e;
  window.NImage = n;
  window.NEvent = d;
  window.NPoint = function(a, b) {
    switch(g.coordMode) {
      case 0:
        return new h(a, b);
      case 1:
        return new D(a, b);
      case 2:
        return new G(a, b);
      case 3:
        return new E(a, b);
      default:
        return new h(a, b);
    }
  };
  window.NInner = h;
  window.NTM128 = G;
  window.NUTMK = D;
  window.NLatLng = E;
  window.NSize = m;
  window.NIcon = R;
  window.NMark = q;
  window.NMark2 = function(a, b) {
    return new q(a, b, 2);
  };
  window.NPolyline = p;
  window.NNaverMark = W;
  window.NScale = ea;
  window.NMapBtns = V;
  window.NSaveBtn = fa;
  window.NPrintBtn = ga;
  window.NZoomControl = ha;
  window.NZoomControl2 = ia;
  window.NIndexMap = A;
  window.NMiniMap = ja;
  window.NXmlhttp = S;
  window.NInfoWindow = u;
  window.NInfoWindowSkin = N;
  window.NStaticOverlay = x;
  window.NDynamicOverlay = C;
  window.NRectangle = Q;
  window.NCircle = P;
  window.NSimpleMap = function(a, b, c, d, e, l, p, k) {
    a.style.position = "relative";
    a.style.width = e + "px";
    a.style.height = l + "px";
    a.style.overflow = "hidden";
    a.oncontextmenu = falseFunc;
    a.onselectstart = falseFunc;
    a.ondragstart = falseFunc;
    var m = fromPointToPixel(new h(b, c), d);
    b = Math.round(m.x - e / 2);
    c = Math.round(m.y + l / 2);
    e = Math.round(m.x + e / 2);
    l = Math.round(m.y - l / 2);
    var m = g.tileSize, q = b % m, r = m - c % m;
    if (B(p) && "" != p) {
      var u;
      u = document.createElement("A");
      u.href = p;
      a.appendChild(u);
      a = u;
      B(k) && "" != k && (u.target = k);
    }
    for (p = Math.floor(b / m);p <= Math.floor(e / m);p++) {
      for (j = Math.floor(c / m);j >= Math.floor(l / m);j--) {
        n.create(g.o9(p, j, d, J[0]), m, m, (p - Math.floor(b / m)) * m - q, (Math.floor(c / m) - j) * m - r, 0, a).border = 0;
      }
    }
  };
  window.NCoordConv = w;
}
naverMap();