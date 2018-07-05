// Input 0
(function(a) {
  a.jgrid = a.jgrid || {};
  a.extend(a.jgrid, {defaults:{recordtext:"\ubcf4\uae30 {0} - {1} / {2}", emptyrecords:"\ud45c\uc2dc\ud560 \ud589\uc774 \uc5c6\uc2b5\ub2c8\ub2e4", loadtext:"\uc870\ud68c\uc911...", pgtext:"\ud398\uc774\uc9c0 {0} / {1}"}, search:{caption:"\uac80\uc0c9...", Find:"\ucc3e\uae30", Reset:"\ucd08\uae30\ud654", odata:[{oper:"eq", text:"\uac19\ub2e4"}, {oper:"ne", text:"\uac19\uc9c0 \uc54a\ub2e4"}, {oper:"lt", text:"\uc791\ub2e4"}, {oper:"le", text:"\uc791\uac70\ub098 \uac19\ub2e4"}, {oper:"gt", text:"\ud06c\ub2e4"}, 
  {oper:"ge", text:"\ud06c\uac70\ub098 \uac19\ub2e4"}, {oper:"bw", text:"\ub85c \uc2dc\uc791\ud55c\ub2e4"}, {oper:"bn", text:"\ub85c \uc2dc\uc791\ud558\uc9c0 \uc54a\ub294\ub2e4"}, {oper:"in", text:"\ub0b4\uc5d0 \uc788\ub2e4"}, {oper:"ni", text:"\ub0b4\uc5d0 \uc788\uc9c0 \uc54a\ub2e4"}, {oper:"ew", text:"\ub85c \ub05d\ub09c\ub2e4"}, {oper:"en", text:"\ub85c \ub05d\ub098\uc9c0 \uc54a\ub294\ub2e4"}, {oper:"cn", text:"\ub0b4\uc5d0 \uc874\uc7ac\ud55c\ub2e4"}, {oper:"nc", text:"\ub0b4\uc5d0 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub294\ub2e4"}, 
  {oper:"nu", text:"is null"}, {oper:"nn", text:"is not null"}], groupOps:[{op:"AND", text:"\uc804\ubd80"}, {op:"OR", text:"\uc784\uc758"}], operandTitle:"Click to select search operation.", resetTitle:"Reset Search Value"}, edit:{addCaption:"\ud589 \ucd94\uac00", editCaption:"\ud589 \uc218\uc815", bSubmit:"\uc804\uc1a1", bCancel:"\ucde8\uc18c", bClose:"\ub2eb\uae30", saveData:"\uc790\ub8cc\uac00 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4! \uc800\uc7a5\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?", bYes:"\uc608", 
  bNo:"\uc544\ub2c8\uc624", bExit:"\ucde8\uc18c", msg:{required:"\ud544\uc218\ud56d\ubaa9\uc785\ub2c8\ub2e4", number:"\uc720\ud6a8\ud55c \ubc88\ud638\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694", minValue:"\uc785\ub825\uac12\uc740 \ud06c\uac70\ub098 \uac19\uc544\uc57c \ud569\ub2c8\ub2e4", maxValue:"\uc785\ub825\uac12\uc740 \uc791\uac70\ub098 \uac19\uc544\uc57c \ud569\ub2c8\ub2e4", email:"\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \uc774\uba54\uc77c\uc8fc\uc18c\uc785\ub2c8\ub2e4", integer:"\uc720\ud6a8\ud55c \uc22b\uc790\ub97c \uc785\ub825\ud558\uc138\uc694", 
  date:"\uc720\ud6a8\ud55c \ub0a0\uc9dc\ub97c \uc785\ub825\ud558\uc138\uc694", url:"\uc740 \uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 URL\uc785\ub2c8\ub2e4. \ubb38\uc7a5\uc55e\uc5d0 \ub2e4\uc74c\ub2e8\uc5b4\uac00 \ud544\uc694\ud569\ub2c8\ub2e4('http://' or 'https://')", nodefined:" \uc740 \uc815\uc758\ub3c4\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4!", novalue:" \ubc18\ud658\uac12\uc774 \ud544\uc694\ud569\ub2c8\ub2e4!", customarray:"\uc0ac\uc6a9\uc790\uc815\uc758 \ud568\uc218\ub294 \ubc30\uc5f4\uc744 \ubc18\ud658\ud574\uc57c \ud569\ub2c8\ub2e4!", 
  customfcheck:"Custom function should be present in case of custom checking!"}}, view:{caption:"\ud589 \uc870\ud68c", bClose:"\ub2eb\uae30"}, del:{caption:"\uc0ad\uc81c", msg:"\uc120\ud0dd\ub41c \ud589\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?", bSubmit:"\uc0ad\uc81c", bCancel:"\ucde8\uc18c"}, nav:{edittext:"", edittitle:"\uc120\ud0dd\ub41c \ud589 \ud3b8\uc9d1", addtext:"", addtitle:"\ud589 \uc0bd\uc785", deltext:"", deltitle:"\uc120\ud0dd\ub41c \ud589 \uc0ad\uc81c", searchtext:"", 
  searchtitle:"\ud589 \ucc3e\uae30", refreshtext:"", refreshtitle:"\uadf8\ub9ac\ub4dc \uac31\uc2e0", alertcap:"\uacbd\uace0", alerttext:"\ud589\uc744 \uc120\ud0dd\ud558\uc138\uc694", viewtext:"", viewtitle:"\uc120\ud0dd\ub41c \ud589 \uc870\ud68c"}, col:{caption:"\uc5f4\uc744 \uc120\ud0dd\ud558\uc138\uc694", bSubmit:"\ud655\uc778", bCancel:"\ucde8\uc18c"}, errors:{errcap:"\uc624\ub958", nourl:"\uc124\uc815\ub41c url\uc774 \uc5c6\uc2b5\ub2c8\ub2e4", norecords:"\ucc98\ub9ac\ud560 \ud589\uc774 \uc5c6\uc2b5\ub2c8\ub2e4", 
  model:"colNames\uc758 \uae38\uc774\uac00 colModel\uacfc \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4!"}, formatter:{integer:{thousandsSeparator:",", defaultValue:"0"}, number:{decimalSeparator:".", thousandsSeparator:",", decimalPlaces:2, defaultValue:"0.00"}, currency:{decimalSeparator:".", thousandsSeparator:",", decimalPlaces:2, prefix:"", suffix:"", defaultValue:"0.00"}, date:{dayNames:"Sun Mon Tue Wed Thr Fri Sat \uc77c \uc6d4 \ud654 \uc218 \ubaa9 \uae08 \ud1a0".split(" "), monthNames:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 1\uc6d4 2\uc6d4 3\uc6d4 4\uc6d4 5\uc6d4 6\uc6d4 7\uc6d4 8\uc6d4 9\uc6d4 10\uc6d4 11\uc6d4 12\uc6d4".split(" "), 
  AmPm:["am", "pm", "AM", "PM"], S:function(a) {
    return 11 > a || 13 < a ? ["st", "nd", "rd", "th"][Math.min((a - 1) % 10, 3)] : "th";
  }, srcformat:"Y-m-d", newformat:"m-d-Y", parseRe:/[#%\\\/:_;.,\t\s-]/, masks:{ISO8601Long:"Y-m-d H:i:s", ISO8601Short:"Y-m-d", ShortDate:"Y/j/n", LongDate:"l, F d, Y", FullDateTime:"l, F d, Y g:i:s A", MonthDay:"F d", ShortTime:"g:i A", LongTime:"g:i:s A", SortableDateTime:"Y-m-d\\TH:i:s", UniversalSortableDateTime:"Y-m-d H:i:sO", YearMonth:"F, Y"}, reformatAfterEdit:!1}, baseLinkUrl:"", showAction:"", target:"", checkbox:{disabled:!0}, idName:"id"}});
})(jQuery);
// Input 1
/*
 jqGrid  4.6.0 - jQuery Grid
 Copyright (c) 2008, Tony Tomov, tony@trirand.com
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2014-02-20
*/
(function(a) {
  a.jgrid = a.jgrid || {};
  a.extend(a.jgrid, {version:"4.6.0", htmlDecode:function(a) {
    return a && ("&nbsp;" === a || "&#160;" === a || 1 === a.length && 160 === a.charCodeAt(0)) ? "" : a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a;
  }, htmlEncode:function(a) {
    return a ? String(a).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a;
  }, format:function(d) {
    var f = a.makeArray(arguments).slice(1);
    null == d && (d = "");
    return d.replace(/\{(\d+)\}/g, function(a, e) {
      return f[e];
    });
  }, msie:"Microsoft Internet Explorer" === navigator.appName, msiever:function() {
    var a = -1;
    null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (a = parseFloat(RegExp.$1));
    return a;
  }, getCellIndex:function(d) {
    d = a(d);
    if (d.is("tr")) {
      return -1;
    }
    d = (d.is("td") || d.is("th") ? d : d.closest("td,th"))[0];
    return a.jgrid.msie ? a.inArray(d, d.parentNode.cells) : d.cellIndex;
  }, stripHtml:function(a) {
    a = String(a);
    var f = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
    return a ? (a = a.replace(f, "")) && "&nbsp;" !== a && "&#160;" !== a ? a.replace(/\"/g, "'") : "" : a;
  }, stripPref:function(d, f) {
    var c = a.type(d);
    if ("string" === c || "number" === c) {
      d = String(d), f = "" !== d ? String(f).replace(String(d), "") : f;
    }
    return f;
  }, parse:function(d) {
    "while(1);" === d.substr(0, 9) && (d = d.substr(9));
    "/*" === d.substr(0, 2) && (d = d.substr(2, d.length - 4));
    d || (d = "{}");
    return !0 === a.jgrid.useJSON && "object" === typeof JSON && "function" === typeof JSON.parse ? JSON.parse(d) : eval("(" + d + ")");
  }, parseDate:function(d, f, c, e) {
    var b = /^\/Date\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\)\/$/, k = "string" === typeof f ? f.match(b) : null, b = function(a, b) {
      a = String(a);
      for (b = parseInt(b, 10) || 2;a.length < b;) {
        a = "0" + a;
      }
      return a;
    }, h = {m:1, d:1, y:1970, h:0, i:0, s:0, u:0}, g = 0, l, m, g = function(a, b) {
      0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12);
      return b;
    };
    void 0 === e && (e = a.jgrid.formatter.date);
    void 0 === e.parseRe && (e.parseRe = /[#%\\\/:_;.,\t\s-]/);
    e.masks.hasOwnProperty(d) && (d = e.masks[d]);
    if (f && null != f) {
      if (isNaN(f - 0) || "u" !== String(d).toLowerCase()) {
        if (f.constructor === Date) {
          g = f;
        } else {
          if (null !== k) {
            if (g = new Date(parseInt(k[1], 10)), k[3]) {
              var n = 60 * Number(k[5]) + Number(k[6]), n = n * ("-" === k[4] ? 1 : -1), n = n - g.getTimezoneOffset();
              g.setTime(Number(Number(g) + 6E4 * n));
            }
          } else {
            n = 0;
            "ISO8601Long" === e.srcformat && "Z" === f.charAt(f.length - 1) && (n -= (new Date).getTimezoneOffset());
            f = String(f).replace(/\T/g, "#").replace(/\t/, "%").split(e.parseRe);
            d = d.replace(/\T/g, "#").replace(/\t/, "%").split(e.parseRe);
            l = 0;
            for (m = d.length;l < m;l++) {
              "M" === d[l] && (k = a.inArray(f[l], e.monthNames), -1 !== k && 12 > k && (f[l] = k + 1, h.m = f[l])), "F" === d[l] && (k = a.inArray(f[l], e.monthNames, 12), -1 !== k && 11 < k && (f[l] = k + 1 - 12, h.m = f[l])), "a" === d[l] && (k = a.inArray(f[l], e.AmPm), -1 !== k && 2 > k && f[l] === e.AmPm[k] && (f[l] = k, h.h = g(f[l], h.h))), "A" === d[l] && (k = a.inArray(f[l], e.AmPm), -1 !== k && 1 < k && f[l] === e.AmPm[k] && (f[l] = k - 2, h.h = g(f[l], h.h))), "g" === d[l] && (h.h = parseInt(f[l], 
              10)), void 0 !== f[l] && (h[d[l].toLowerCase()] = parseInt(f[l], 10));
            }
            h.f && (h.m = h.f);
            if (0 === h.m && 0 === h.y && 0 === h.d) {
              return "&#160;";
            }
            h.m = parseInt(h.m, 10) - 1;
            g = h.y;
            70 <= g && 99 >= g ? h.y = 1900 + h.y : 0 <= g && 69 >= g && (h.y = 2E3 + h.y);
            g = new Date(h.y, h.m, h.d, h.h, h.i, h.s, h.u);
            0 < n && g.setTime(Number(Number(g) + 6E4 * n));
          }
        }
      } else {
        g = new Date(1E3 * parseFloat(f));
      }
    } else {
      g = new Date(h.y, h.m, h.d, h.h, h.i, h.s, h.u);
    }
    if (void 0 === c) {
      return g;
    }
    e.masks.hasOwnProperty(c) ? c = e.masks[c] : c || (c = "Y-m-d");
    d = g.getHours();
    f = g.getMinutes();
    h = g.getDate();
    n = g.getMonth() + 1;
    k = g.getTimezoneOffset();
    l = g.getSeconds();
    m = g.getMilliseconds();
    var r = g.getDay(), q = g.getFullYear(), p = (r + 6) % 7 + 1, t = (new Date(q, n - 1, h) - new Date(q, 0, 1)) / 864E5, v = {d:b(h), D:e.dayNames[r], j:h, l:e.dayNames[r + 7], N:p, S:e.S(h), w:r, z:t, W:5 > p ? Math.floor((t + p - 1) / 7) + 1 : Math.floor((t + p - 1) / 7) || (4 > ((new Date(q - 1, 0, 1)).getDay() + 6) % 7 ? 53 : 52), F:e.monthNames[n - 1 + 12], m:b(n), M:e.monthNames[n - 1], n:n, t:"?", L:"?", o:"?", Y:q, y:String(q).substring(2), a:12 > d ? e.AmPm[0] : e.AmPm[1], A:12 > d ? e.AmPm[2] : 
    e.AmPm[3], B:"?", g:d % 12 || 12, G:d, h:b(d % 12 || 12), H:b(d), i:b(f), s:b(l), u:m, e:"?", I:"?", O:(0 < k ? "-" : "+") + b(100 * Math.floor(Math.abs(k) / 60) + Math.abs(k) % 60, 4), P:"?", T:(String(g).match(/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g) || [""]).pop().replace(/[^-+\dA-Z]/g, ""), Z:"?", c:"?", r:"?", U:Math.floor(g / 1E3)};
    return c.replace(/\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, function(a) {
      return v.hasOwnProperty(a) ? v[a] : a.substring(1);
    });
  }, jqID:function(a) {
    return String(a).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&");
  }, guid:1, uidPref:"jqg", randId:function(d) {
    return (d || a.jgrid.uidPref) + a.jgrid.guid++;
  }, getAccessor:function(a, f) {
    var c, e, b = [], k;
    if ("function" === typeof f) {
      return f(a);
    }
    c = a[f];
    if (void 0 === c) {
      try {
        if ("string" === typeof f && (b = f.split(".")), k = b.length) {
          for (c = a;c && k--;) {
            e = b.shift(), c = c[e];
          }
        }
      } catch (h) {
      }
    }
    return c;
  }, getXmlData:function(d, f, c) {
    var e = "string" === typeof f ? f.match(/^(.*)\[(\w+)\]$/) : null;
    if ("function" === typeof f) {
      return f(d);
    }
    if (e && e[2]) {
      return e[1] ? a(e[1], d).attr(e[2]) : a(d).attr(e[2]);
    }
    d = a(f, d);
    return c ? d : 0 < d.length ? a(d).text() : void 0;
  }, cellWidth:function() {
    var d = a("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"), f = d.appendTo("body").find("td").width();
    d.remove();
    return .1 < Math.abs(f - 5);
  }, cell_width:!0, ajaxOptions:{}, from:function(d) {
    return new function(d, c) {
      "string" === typeof d && (d = a.data(d));
      var e = this, b = d, k = !0, h = !1, g = c, l = /[\$,%]/g, m = null, n = null, r = 0, q = !1, p = "", t = [], v = !0;
      if ("object" === typeof d && d.push) {
        0 < d.length && (v = "object" !== typeof d[0] ? !1 : !0);
      } else {
        throw "data provides is not an array";
      }
      this._hasData = function() {
        return null === b ? !1 : 0 === b.length ? !1 : !0;
      };
      this._getStr = function(a) {
        var b = [];
        h && b.push("jQuery.trim(");
        b.push("String(" + a + ")");
        h && b.push(")");
        k || b.push(".toLowerCase()");
        return b.join("");
      };
      this._strComp = function(a) {
        return "string" === typeof a ? ".toString()" : "";
      };
      this._group = function(a, b) {
        return {field:a.toString(), unique:b, items:[]};
      };
      this._toStr = function(b) {
        h && (b = a.trim(b));
        b = b.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
        return k ? b : b.toLowerCase();
      };
      this._funcLoop = function(c) {
        var e = [];
        a.each(b, function(a, b) {
          e.push(c(b));
        });
        return e;
      };
      this._append = function(a) {
        var b;
        g = null === g ? "" : g + ("" === p ? " && " : p);
        for (b = 0;b < r;b++) {
          g += "(";
        }
        q && (g += "!");
        g += "(" + a + ")";
        q = !1;
        p = "";
        r = 0;
      };
      this._setCommand = function(a, b) {
        m = a;
        n = b;
      };
      this._resetNegate = function() {
        q = !1;
      };
      this._repeatCommand = function(a, b) {
        return null === m ? e : null !== a && null !== b ? m(a, b) : null !== n && v ? m(n, a) : m(a);
      };
      this._equals = function(a, b) {
        return 0 === e._compare(a, b, 1);
      };
      this._compare = function(a, b, c) {
        var e = Object.prototype.toString;
        void 0 === c && (c = 1);
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        if (null === a && null === b) {
          return 0;
        }
        if (null === a && null !== b) {
          return 1;
        }
        if (null !== a && null === b) {
          return -1;
        }
        if ("[object Date]" === e.call(a) && "[object Date]" === e.call(b)) {
          return a < b ? -c : a > b ? c : 0;
        }
        k || "number" === typeof a || "number" === typeof b || (a = String(a), b = String(b));
        return a < b ? -c : a > b ? c : 0;
      };
      this._performSort = function() {
        0 !== t.length && (b = e._doSort(b, 0));
      };
      this._doSort = function(a, b) {
        var c = t[b].by, d = t[b].dir, g = t[b].type, f = t[b].datefmt, h = t[b].sfunc;
        if (b === t.length - 1) {
          return e._getOrder(a, c, d, g, f, h);
        }
        b++;
        c = e._getGroup(a, c, d, g, f);
        d = [];
        for (g = 0;g < c.length;g++) {
          for (h = e._doSort(c[g].items, b), f = 0;f < h.length;f++) {
            d.push(h[f]);
          }
        }
        return d;
      };
      this._getOrder = function(b, c, d, g, f, h) {
        var m = [], q = [], n = "a" === d ? 1 : -1, r, p;
        void 0 === g && (g = "text");
        p = "float" === g || "number" === g || "currency" === g || "numeric" === g ? function(a) {
          a = parseFloat(String(a).replace(l, ""));
          return isNaN(a) ? 0 : a;
        } : "int" === g || "integer" === g ? function(a) {
          return a ? parseFloat(String(a).replace(l, "")) : 0;
        } : "date" === g || "datetime" === g ? function(b) {
          return a.jgrid.parseDate(f, b).getTime();
        } : a.isFunction(g) ? g : function(b) {
          b = b ? a.trim(String(b)) : "";
          return k ? b : b.toLowerCase();
        };
        a.each(b, function(b, e) {
          r = "" !== c ? a.jgrid.getAccessor(e, c) : e;
          void 0 === r && (r = "");
          r = p(r, e);
          q.push({vSort:r, index:b});
        });
        a.isFunction(h) ? q.sort(function(a, b) {
          a = a.vSort;
          b = b.vSort;
          return h.call(this, a, b, n);
        }) : q.sort(function(a, b) {
          a = a.vSort;
          b = b.vSort;
          return e._compare(a, b, n);
        });
        g = 0;
        for (var t = b.length;g < t;) {
          d = q[g].index, m.push(b[d]), g++;
        }
        return m;
      };
      this._getGroup = function(b, c, d, g, f) {
        var h = [], k = null, l = null, m;
        a.each(e._getOrder(b, c, d, g, f), function(b, d) {
          m = a.jgrid.getAccessor(d, c);
          null == m && (m = "");
          e._equals(l, m) || (l = m, null !== k && h.push(k), k = e._group(c, m));
          k.items.push(d);
        });
        null !== k && h.push(k);
        return h;
      };
      this.ignoreCase = function() {
        k = !1;
        return e;
      };
      this.useCase = function() {
        k = !0;
        return e;
      };
      this.trim = function() {
        h = !0;
        return e;
      };
      this.noTrim = function() {
        h = !1;
        return e;
      };
      this.execute = function() {
        var c = g, d = [];
        if (null === c) {
          return e;
        }
        a.each(b, function() {
          eval(c) && d.push(this);
        });
        b = d;
        return e;
      };
      this.data = function() {
        return b;
      };
      this.select = function(c) {
        e._performSort();
        if (!e._hasData()) {
          return [];
        }
        e.execute();
        if (a.isFunction(c)) {
          var d = [];
          a.each(b, function(a, b) {
            d.push(c(b));
          });
          return d;
        }
        return b;
      };
      this.hasMatch = function() {
        if (!e._hasData()) {
          return !1;
        }
        e.execute();
        return 0 < b.length;
      };
      this.andNot = function(a, b, c) {
        q = !q;
        return e.and(a, b, c);
      };
      this.orNot = function(a, b, c) {
        q = !q;
        return e.or(a, b, c);
      };
      this.not = function(a, b, c) {
        return e.andNot(a, b, c);
      };
      this.and = function(a, b, c) {
        p = " && ";
        return void 0 === a ? e : e._repeatCommand(a, b, c);
      };
      this.or = function(a, b, c) {
        p = " || ";
        return void 0 === a ? e : e._repeatCommand(a, b, c);
      };
      this.orBegin = function() {
        r++;
        return e;
      };
      this.orEnd = function() {
        null !== g && (g += ")");
        return e;
      };
      this.isNot = function(a) {
        q = !q;
        return e.is(a);
      };
      this.is = function(a) {
        e._append("this." + a);
        e._resetNegate();
        return e;
      };
      this._compareValues = function(b, c, d, g, f) {
        var h;
        h = v ? "jQuery.jgrid.getAccessor(this,'" + c + "')" : "this";
        void 0 === d && (d = null);
        var k = d, m = void 0 === f.stype ? "text" : f.stype;
        if (null !== d) {
          switch(m) {
            case "int":
            ;
            case "integer":
              k = isNaN(Number(k)) || "" === k ? "0" : k;
              h = "parseInt(" + h + ",10)";
              k = "parseInt(" + k + ",10)";
              break;
            case "float":
            ;
            case "number":
            ;
            case "numeric":
              k = String(k).replace(l, "");
              k = isNaN(Number(k)) || "" === k ? "0" : k;
              h = "parseFloat(" + h + ")";
              k = "parseFloat(" + k + ")";
              break;
            case "date":
            ;
            case "datetime":
              k = String(a.jgrid.parseDate(f.newfmt || "Y-m-d", k).getTime());
              h = 'jQuery.jgrid.parseDate("' + f.srcfmt + '",' + h + ").getTime()";
              break;
            default:
              h = e._getStr(h), k = e._getStr('"' + e._toStr(k) + '"');
          }
        }
        e._append(h + " " + g + " " + k);
        e._setCommand(b, c);
        e._resetNegate();
        return e;
      };
      this.equals = function(a, b, c) {
        return e._compareValues(e.equals, a, b, "==", c);
      };
      this.notEquals = function(a, b, c) {
        return e._compareValues(e.equals, a, b, "!==", c);
      };
      this.isNull = function(a, b, c) {
        return e._compareValues(e.equals, a, null, "===", c);
      };
      this.greater = function(a, b, c) {
        return e._compareValues(e.greater, a, b, ">", c);
      };
      this.less = function(a, b, c) {
        return e._compareValues(e.less, a, b, "<", c);
      };
      this.greaterOrEquals = function(a, b, c) {
        return e._compareValues(e.greaterOrEquals, a, b, ">=", c);
      };
      this.lessOrEquals = function(a, b, c) {
        return e._compareValues(e.lessOrEquals, a, b, "<=", c);
      };
      this.startsWith = function(b, c) {
        var d = null == c ? b : c, d = h ? a.trim(d.toString()).length : d.toString().length;
        v ? e._append(e._getStr("jQuery.jgrid.getAccessor(this,'" + b + "')") + ".substr(0," + d + ") == " + e._getStr('"' + e._toStr(c) + '"')) : (null != c && (d = h ? a.trim(c.toString()).length : c.toString().length), e._append(e._getStr("this") + ".substr(0," + d + ") == " + e._getStr('"' + e._toStr(b) + '"')));
        e._setCommand(e.startsWith, b);
        e._resetNegate();
        return e;
      };
      this.endsWith = function(b, c) {
        var d = null == c ? b : c, d = h ? a.trim(d.toString()).length : d.toString().length;
        v ? e._append(e._getStr("jQuery.jgrid.getAccessor(this,'" + b + "')") + ".substr(" + e._getStr("jQuery.jgrid.getAccessor(this,'" + b + "')") + ".length-" + d + "," + d + ') == "' + e._toStr(c) + '"') : e._append(e._getStr("this") + ".substr(" + e._getStr("this") + '.length-"' + e._toStr(b) + '".length,"' + e._toStr(b) + '".length) == "' + e._toStr(b) + '"');
        e._setCommand(e.endsWith, b);
        e._resetNegate();
        return e;
      };
      this.contains = function(a, b) {
        v ? e._append(e._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + '.indexOf("' + e._toStr(b) + '",0) > -1') : e._append(e._getStr("this") + '.indexOf("' + e._toStr(a) + '",0) > -1');
        e._setCommand(e.contains, a);
        e._resetNegate();
        return e;
      };
      this.groupBy = function(a, c, d, g) {
        return e._hasData() ? e._getGroup(b, a, c, d, g) : null;
      };
      this.orderBy = function(b, c, d, g, f) {
        c = null == c ? "a" : a.trim(c.toString().toLowerCase());
        null == d && (d = "text");
        null == g && (g = "Y-m-d");
        null == f && (f = !1);
        if ("desc" === c || "descending" === c) {
          c = "d";
        }
        if ("asc" === c || "ascending" === c) {
          c = "a";
        }
        t.push({by:b, dir:c, type:d, datefmt:g, sfunc:f});
        return e;
      };
      return e;
    }(d, null);
  }, getMethod:function(d) {
    return this.getAccessor(a.fn.jqGrid, d);
  }, extend:function(d) {
    a.extend(a.fn.jqGrid, d);
    this.no_legacy_api || a.fn.extend(d);
  }});
  a.fn.jqGrid = function(d) {
    if ("string" === typeof d) {
      var f = a.jgrid.getMethod(d);
      if (!f) {
        throw "jqGrid - No such method: " + d;
      }
      var c = a.makeArray(arguments).slice(1);
      return f.apply(this, c);
    }
    return this.each(function() {
      if (!this.grid) {
        var c = a.extend(!0, {url:"", height:150, page:1, rowNum:20, rowTotal:null, records:0, pager:"", pgbuttons:!0, pginput:!0, colModel:[], rowList:[], colNames:[], sortorder:"asc", sortname:"", datatype:"xml", mtype:"GET", altRows:!1, selarrrow:[], savedRow:[], shrinkToFit:!0, xmlReader:{}, jsonReader:{}, subGrid:!1, subGridModel:[], reccount:0, lastpage:0, lastsort:0, selrow:null, beforeSelectRow:null, onSelectRow:null, onSortCol:null, ondblClickRow:null, onRightClickRow:null, onPaging:null, 
        onSelectAll:null, onInitGrid:null, loadComplete:null, gridComplete:null, loadError:null, loadBeforeSend:null, afterInsertRow:null, beforeRequest:null, beforeProcessing:null, onHeaderClick:null, viewrecords:!1, loadonce:!1, multiselect:!1, multikey:!1, editurl:null, search:!1, caption:"", hidegrid:!0, hiddengrid:!1, postData:{}, userData:{}, treeGrid:!1, treeGridModel:"nested", treeReader:{}, treeANode:-1, ExpandColumn:null, tree_root_level:0, prmNames:{page:"page", rows:"rows", sort:"sidx", 
        order:"sord", search:"_search", nd:"nd", id:"id", oper:"oper", editoper:"edit", addoper:"add", deloper:"del", subgridid:"id", npage:null, totalrows:"totalrows"}, forceFit:!1, gridstate:"visible", cellEdit:!1, cellsubmit:"remote", nv:0, loadui:"enable", toolbar:[!1, ""], scroll:!1, multiboxonly:!1, deselectAfterSort:!0, scrollrows:!1, autowidth:!1, scrollOffset:18, cellLayout:5, subGridWidth:20, multiselectWidth:20, gridview:!1, rownumWidth:25, rownumbers:!1, pagerpos:"center", recordpos:"right", 
        footerrow:!1, userDataOnFooter:!1, hoverrows:!0, altclass:"ui-priority-secondary", viewsortcols:[!1, "vertical", !0], resizeclass:"", autoencode:!1, remapColumns:[], ajaxGridOptions:{}, direction:"ltr", toppager:!1, headertitles:!1, scrollTimeout:40, data:[], _index:{}, grouping:!1, groupingView:{groupField:[], groupOrder:[], groupText:[], groupColumnShow:[], groupSummary:[], showSummaryOnHide:!1, sortitems:[], sortnames:[], summary:[], summaryval:[], plusicon:"ui-icon-circlesmall-plus", 
        minusicon:"ui-icon-circlesmall-minus", displayField:[], groupSummaryPos:[], formatDisplayField:[], _locgr:!1}, ignoreCase:!1, cmTemplate:{}, idPrefix:"", multiSort:!1}, a.jgrid.defaults, d || {}), b = this, f = {headers:[], cols:[], footers:[], dragStart:function(d, f, g) {
          var h = a(this.bDiv).offset().left;
          this.resizing = {idx:d, startX:f.clientX, sOL:f.clientX - h};
          this.hDiv.style.cursor = "col-resize";
          this.curGbox = a("#rs_m" + a.jgrid.jqID(c.id), "#gbox_" + a.jgrid.jqID(c.id));
          this.curGbox.css({display:"block", left:f.clientX - h, top:g[1], height:g[2]});
          a(b).triggerHandler("jqGridResizeStart", [f, d]);
          a.isFunction(c.resizeStart) && c.resizeStart.call(b, f, d);
          document.onselectstart = function() {
            return !1;
          };
        }, dragMove:function(a) {
          if (this.resizing) {
            var b = a.clientX - this.resizing.startX;
            a = this.headers[this.resizing.idx];
            var d = "ltr" === c.direction ? a.width + b : a.width - b, f;
            33 < d && (this.curGbox.css({left:this.resizing.sOL + b}), !0 === c.forceFit ? (f = this.headers[this.resizing.idx + c.nv], b = "ltr" === c.direction ? f.width - b : f.width + b, 33 < b && (a.newWidth = d, f.newWidth = b)) : (this.newWidth = "ltr" === c.direction ? c.tblwidth + b : c.tblwidth - b, a.newWidth = d));
          }
        }, dragEnd:function() {
          this.hDiv.style.cursor = "default";
          if (this.resizing) {
            var d = this.resizing.idx, f = this.headers[d].newWidth || this.headers[d].width, f = parseInt(f, 10);
            this.resizing = !1;
            a("#rs_m" + a.jgrid.jqID(c.id)).css("display", "none");
            c.colModel[d].width = f;
            this.headers[d].width = f;
            this.headers[d].el.style.width = f + "px";
            this.cols[d].style.width = f + "px";
            0 < this.footers.length && (this.footers[d].style.width = f + "px");
            !0 === c.forceFit ? (f = this.headers[d + c.nv].newWidth || this.headers[d + c.nv].width, this.headers[d + c.nv].width = f, this.headers[d + c.nv].el.style.width = f + "px", this.cols[d + c.nv].style.width = f + "px", 0 < this.footers.length && (this.footers[d + c.nv].style.width = f + "px"), c.colModel[d + c.nv].width = f) : (c.tblwidth = this.newWidth || c.tblwidth, a("table:first", this.bDiv).css("width", c.tblwidth + "px"), a("table:first", this.hDiv).css("width", c.tblwidth + "px"), 
            this.hDiv.scrollLeft = this.bDiv.scrollLeft, c.footerrow && (a("table:first", this.sDiv).css("width", c.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft));
            a(b).triggerHandler("jqGridResizeStop", [f, d]);
            a.isFunction(c.resizeStop) && c.resizeStop.call(b, f, d);
          }
          this.curGbox = null;
          document.onselectstart = function() {
            return !0;
          };
        }, populateVisible:function() {
          f.timer && clearTimeout(f.timer);
          f.timer = null;
          var b = a(f.bDiv).height();
          if (b) {
            var d = a("table:first", f.bDiv), g, h;
            if (d[0].rows.length) {
              try {
                h = (g = d[0].rows[1]) ? a(g).outerHeight() || f.prevRowHeight : f.prevRowHeight;
              } catch (l) {
                h = f.prevRowHeight;
              }
            }
            if (h) {
              f.prevRowHeight = h;
              var m = c.rowNum;
              g = f.scrollTop = f.bDiv.scrollTop;
              var q = Math.round(d.position().top) - g, n = q + d.height();
              h *= m;
              var r, p, t;
              n < b && 0 >= q && (void 0 === c.lastpage || parseInt((n + g + h - 1) / h, 10) <= c.lastpage) && (p = parseInt((b - n + h - 1) / h, 10), 0 <= n || 2 > p || !0 === c.scroll ? (r = Math.round((n + g) / h) + 1, q = -1) : q = 1);
              0 < q && (r = parseInt(g / h, 10) + 1, p = parseInt((g + b) / h, 10) + 2 - r, t = !0);
              !p || c.lastpage && (r > c.lastpage || 1 === c.lastpage || r === c.page && r === c.lastpage) || (f.hDiv.loading ? f.timer = setTimeout(f.populateVisible, c.scrollTimeout) : (c.page = r, t && (f.selectionPreserver(d[0]), f.emptyRows.call(d[0], !1, !1)), f.populate(p)));
            }
          }
        }, scrollGrid:function(a) {
          if (c.scroll) {
            var b = f.bDiv.scrollTop;
            void 0 === f.scrollTop && (f.scrollTop = 0);
            b !== f.scrollTop && (f.scrollTop = b, f.timer && clearTimeout(f.timer), f.timer = setTimeout(f.populateVisible, c.scrollTimeout));
          }
          f.hDiv.scrollLeft = f.bDiv.scrollLeft;
          c.footerrow && (f.sDiv.scrollLeft = f.bDiv.scrollLeft);
          a && a.stopPropagation();
        }, selectionPreserver:function(b) {
          var c = b.p, e = c.selrow, d = c.selarrrow ? a.makeArray(c.selarrrow) : null, f = b.grid.bDiv.scrollLeft, g = function() {
            var h;
            c.selrow = null;
            c.selarrrow = [];
            if (c.multiselect && d && 0 < d.length) {
              for (h = 0;h < d.length;h++) {
                d[h] !== e && a(b).jqGrid("setSelection", d[h], !1, null);
              }
            }
            e && a(b).jqGrid("setSelection", e, !1, null);
            b.grid.bDiv.scrollLeft = f;
            a(b).unbind(".selectionPreserver", g);
          };
          a(b).bind("jqGridGridComplete.selectionPreserver", g);
        }};
        if ("TABLE" !== this.tagName.toUpperCase()) {
          alert("Element is not a table");
        } else {
          if (void 0 !== document.documentMode && 5 >= document.documentMode) {
            alert("Grid can not be used in this ('quirks') mode!");
          } else {
            a(this).empty().attr("tabindex", "0");
            this.p = c;
            this.p.useProp = !!a.fn.prop;
            var h, g;
            if (0 === this.p.colNames.length) {
              for (h = 0;h < this.p.colModel.length;h++) {
                this.p.colNames[h] = this.p.colModel[h].label || this.p.colModel[h].name;
              }
            }
            if (this.p.colNames.length !== this.p.colModel.length) {
              alert(a.jgrid.errors.model);
            } else {
              var l = a("<div class='ui-jqgrid-view'></div>"), m = a.jgrid.msie;
              b.p.direction = a.trim(b.p.direction.toLowerCase());
              -1 === a.inArray(b.p.direction, ["ltr", "rtl"]) && (b.p.direction = "ltr");
              g = b.p.direction;
              a(l).insertBefore(this);
              a(this).removeClass("scroll").appendTo(l);
              var n = a("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
              a(n).attr({id:"gbox_" + this.id, dir:g}).insertBefore(l);
              a(l).attr("id", "gview_" + this.id).appendTo(n);
              a("<div class='ui-widget-overlay jqgrid-overlay' id='lui_" + this.id + "'></div>").insertBefore(l);
              a("<div class='loading ui-state-default ui-state-active' id='load_" + this.id + "'>" + this.p.loadtext + "</div>").insertBefore(l);
              a(this).attr({cellspacing:"0", cellpadding:"0", border:"0", role:"grid", "aria-multiselectable":!!this.p.multiselect, "aria-labelledby":"gbox_" + this.id});
              var r = function(a, b) {
                a = parseInt(a, 10);
                return isNaN(a) ? b || 0 : a;
              }, q = function(c, e, d, g, h, l) {
                var m = b.p.colModel[c], q = m.align, n = 'style="', r = m.classes, p = m.name, t = [];
                q && (n += "text-align:" + q + ";");
                !0 === m.hidden && (n += "display:none;");
                if (0 === e) {
                  n += "width: " + f.headers[c].width + "px;";
                } else {
                  if (m.cellattr && a.isFunction(m.cellattr) && (c = m.cellattr.call(b, h, d, g, m, l)) && "string" === typeof c) {
                    if (c = c.replace(/style/i, "style").replace(/title/i, "title"), -1 < c.indexOf("title") && (m.title = !1), -1 < c.indexOf("class") && (r = void 0), t = c.replace("-style", "-sti").split(/style/), 2 === t.length) {
                      t[1] = a.trim(t[1].replace("-sti", "-style").replace("=", ""));
                      if (0 === t[1].indexOf("'") || 0 === t[1].indexOf('"')) {
                        t[1] = t[1].substring(1);
                      }
                      n += t[1].replace(/'/gi, '"');
                    } else {
                      n += '"';
                    }
                  }
                }
                t.length || (t[0] = "", n += '"');
                n += (void 0 !== r ? ' class="' + r + '"' : "") + (m.title && d ? ' title="' + a.jgrid.stripHtml(d) + '"' : "");
                n += ' aria-describedby="' + b.p.id + "_" + p + '"';
                return n + t[0];
              }, p = function(c) {
                return null == c || "" === c ? "&#160;" : b.p.autoencode ? a.jgrid.htmlEncode(c) : String(c);
              }, t = function(c, e, d, f, g) {
                var h = b.p.colModel[d];
                void 0 !== h.formatter ? (c = "" !== String(b.p.idPrefix) ? a.jgrid.stripPref(b.p.idPrefix, c) : c, c = {rowId:c, colModel:h, gid:b.p.id, pos:d}, e = a.isFunction(h.formatter) ? h.formatter.call(b, e, c, f, g) : a.fmatter ? a.fn.fmatter.call(b, h.formatter, e, c, f, g) : p(e)) : e = p(e);
                return e;
              }, v = function(a, b, c, e, d, f) {
                b = t(a, b, c, d, "add");
                return '<td role="gridcell" ' + q(c, e, b, d, a, f) + ">" + b + "</td>";
              }, u = function(a, c, e, d) {
                d = '<input role="checkbox" type="checkbox" id="jqg_' + b.p.id + "_" + a + '" class="cbox" name="jqg_' + b.p.id + "_" + a + '"' + (d ? 'checked="checked"' : "") + "/>";
                return '<td role="gridcell" ' + q(c, e, "", null, a, !0) + ">" + d + "</td>";
              }, w = function(a, b, c, e) {
                c = (parseInt(c, 10) - 1) * parseInt(e, 10) + 1 + b;
                return '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + q(a, b, c, null, b, !0) + ">" + c + "</td>";
              }, y = function(a) {
                var c, e = [], d = 0, f;
                for (f = 0;f < b.p.colModel.length;f++) {
                  c = b.p.colModel[f], "cb" !== c.name && "subgrid" !== c.name && "rn" !== c.name && (e[d] = "local" === a ? c.name : "xml" === a || "xmlstring" === a ? c.xmlmap || c.name : c.jsonmap || c.name, !1 !== b.p.keyIndex && !0 === c.key && (b.p.keyName = e[d]), d++);
                }
                return e;
              }, x = function(c) {
                var e = b.p.remapColumns;
                e && e.length || (e = a.map(b.p.colModel, function(a, b) {
                  return b;
                }));
                c && (e = a.map(e, function(a) {
                  return a < c ? null : a - c;
                }));
                return e;
              }, B = function(b, c) {
                var e;
                this.p.deepempty ? a(this.rows).slice(1).remove() : (e = 0 < this.rows.length ? this.rows[0] : null, a(this.firstChild).empty().append(e));
                b && this.p.scroll && (a(this.grid.bDiv.firstChild).css({height:"auto"}), a(this.grid.bDiv.firstChild.firstChild).css({height:0, display:"none"}), 0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0));
                !0 === c && this.p.treeGrid && (this.p.data = [], this.p._index = {});
              }, C = function() {
                var c = b.p.data.length, e, d, f;
                e = !0 === b.p.rownumbers ? 1 : 0;
                d = !0 === b.p.multiselect ? 1 : 0;
                f = !0 === b.p.subGrid ? 1 : 0;
                e = !1 === b.p.keyIndex || !0 === b.p.loadonce ? b.p.localReader.id : b.p.colModel[b.p.keyIndex + d + f + e].name;
                for (d = 0;d < c;d++) {
                  f = a.jgrid.getAccessor(b.p.data[d], e), void 0 === f && (f = String(d + 1)), b.p._index[f] = d;
                }
              }, O = function(c, e, d, f, g, h) {
                var k = "-1", l = "", m;
                e = e ? "display:none;" : "";
                d = "ui-widget-content jqgrow ui-row-" + b.p.direction + (d ? " " + d : "") + (h ? " ui-state-highlight" : "");
                h = a(b).triggerHandler("jqGridRowAttr", [f, g, c]);
                "object" !== typeof h && (h = a.isFunction(b.p.rowattr) ? b.p.rowattr.call(b, f, g, c) : {});
                if (!a.isEmptyObject(h)) {
                  h.hasOwnProperty("id") && (c = h.id, delete h.id);
                  h.hasOwnProperty("tabindex") && (k = h.tabindex, delete h.tabindex);
                  h.hasOwnProperty("style") && (e += h.style, delete h.style);
                  h.hasOwnProperty("class") && (d += " " + h["class"], delete h["class"]);
                  try {
                    delete h.role;
                  } catch (q) {
                  }
                  for (m in h) {
                    h.hasOwnProperty(m) && (l += " " + m + "=" + h[m]);
                  }
                }
                return '<tr role="row" id="' + c + '" tabindex="' + k + '" class="' + d + '"' + ("" === e ? "" : ' style="' + e + '"') + l + ">";
              }, D = function(c, e, d, f, g) {
                var h = new Date, k = "local" !== b.p.datatype && b.p.loadonce || "xmlstring" === b.p.datatype, l = b.p.xmlReader, m = "local" === b.p.datatype ? "local" : "xml";
                k && (b.p.data = [], b.p._index = {}, b.p.localReader.id = "_id_");
                b.p.reccount = 0;
                if (a.isXMLDoc(c)) {
                  -1 !== b.p.treeANode || b.p.scroll ? d = 1 < d ? d : 1 : (B.call(b, !1, !0), d = 1);
                  var q = a(b), n, p, t = 0, R, T = !0 === b.p.multiselect ? 1 : 0, C = 0, D, U = !0 === b.p.rownumbers ? 1 : 0, M, z = [], A, W = {}, G, K, I = [], F = !0 === b.p.altRows ? b.p.altclass : "", E;
                  !0 === b.p.subGrid && (C = 1, D = a.jgrid.getMethod("addSubGridCell"));
                  l.repeatitems || (z = y(m));
                  M = !1 === b.p.keyIndex ? a.isFunction(l.id) ? l.id.call(b, c) : l.id : b.p.keyIndex;
                  0 < z.length && !isNaN(M) && (M = b.p.keyName);
                  m = -1 === String(M).indexOf("[") ? z.length ? function(b, c) {
                    return a(M, b).text() || c;
                  } : function(b, c) {
                    return a(l.cell, b).eq(M).text() || c;
                  } : function(a, b) {
                    return a.getAttribute(M.replace(/[\[\]]/g, "")) || b;
                  };
                  b.p.userData = {};
                  b.p.page = r(a.jgrid.getXmlData(c, l.page), b.p.page);
                  b.p.lastpage = r(a.jgrid.getXmlData(c, l.total), 1);
                  b.p.records = r(a.jgrid.getXmlData(c, l.records));
                  a.isFunction(l.userdata) ? b.p.userData = l.userdata.call(b, c) || {} : a.jgrid.getXmlData(c, l.userdata, !0).each(function() {
                    b.p.userData[this.getAttribute("name")] = a(this).text();
                  });
                  c = a.jgrid.getXmlData(c, l.root, !0);
                  (c = a.jgrid.getXmlData(c, l.row, !0)) || (c = []);
                  var X = c.length, H = 0, S = [], N = parseInt(b.p.rowNum, 10), Z = b.p.scroll ? a.jgrid.randId() : 1;
                  0 < X && 0 >= b.p.page && (b.p.page = 1);
                  if (c && X) {
                    g && (N *= g + 1);
                    g = a.isFunction(b.p.afterInsertRow);
                    var J = !1, aa;
                    b.p.grouping && (J = !0 === b.p.groupingView.groupCollapse, aa = a.jgrid.getMethod("groupingPrepare"));
                    for (;H < X;) {
                      G = c[H];
                      K = m(G, Z + H);
                      K = b.p.idPrefix + K;
                      n = 0 === d ? 0 : d + 1;
                      E = 1 === (n + H) % 2 ? F : "";
                      var P = I.length;
                      I.push("");
                      U && I.push(w(0, H, b.p.page, b.p.rowNum));
                      T && I.push(u(K, U, H, !1));
                      C && I.push(D.call(q, T + U, H + d));
                      if (l.repeatitems) {
                        A || (A = x(T + C + U));
                        var L = a.jgrid.getXmlData(G, l.cell, !0);
                        a.each(A, function(a) {
                          var c = L[this];
                          if (!c) {
                            return !1;
                          }
                          R = c.textContent || c.text;
                          W[b.p.colModel[a + T + C + U].name] = R;
                          I.push(v(K, R, a + T + C + U, H + d, G, W));
                        });
                      } else {
                        for (n = 0;n < z.length;n++) {
                          R = a.jgrid.getXmlData(G, z[n]), W[b.p.colModel[n + T + C + U].name] = R, I.push(v(K, R, n + T + C + U, H + d, G, W));
                        }
                      }
                      I[P] = O(K, J, E, W, G, !1);
                      I.push("</tr>");
                      b.p.grouping && (S.push(I), b.p.groupingView._locgr || aa.call(q, W, H), I = []);
                      if (k || !0 === b.p.treeGrid) {
                        W._id_ = a.jgrid.stripPref(b.p.idPrefix, K), b.p.data.push(W), b.p._index[W._id_] = b.p.data.length - 1;
                      }
                      !1 === b.p.gridview && (a("tbody:first", e).append(I.join("")), q.triggerHandler("jqGridAfterInsertRow", [K, W, G]), g && b.p.afterInsertRow.call(b, K, W, G), I = []);
                      W = {};
                      t++;
                      H++;
                      if (t === N) {
                        break;
                      }
                    }
                  }
                  !0 === b.p.gridview && (p = -1 < b.p.treeANode ? b.p.treeANode : 0, b.p.grouping ? (k || q.jqGrid("groupingRender", S, b.p.colModel.length, b.p.page, N), S = null) : !0 === b.p.treeGrid && 0 < p ? a(b.rows[p]).after(I.join("")) : a("tbody:first", e).append(I.join("")));
                  if (!0 === b.p.subGrid) {
                    try {
                      q.jqGrid("addSubGrid", T + U);
                    } catch (ga) {
                    }
                  }
                  b.p.totaltime = new Date - h;
                  0 < t && 0 === b.p.records && (b.p.records = X);
                  I = null;
                  if (!0 === b.p.treeGrid) {
                    try {
                      q.jqGrid("setTreeNode", p + 1, t + p + 1);
                    } catch (ia) {
                    }
                  }
                  b.p.treeGrid || b.p.scroll || (b.grid.bDiv.scrollTop = 0);
                  b.p.reccount = t;
                  b.p.treeANode = -1;
                  b.p.userDataOnFooter && q.jqGrid("footerData", "set", b.p.userData, !0);
                  k && (b.p.records = X, b.p.lastpage = Math.ceil(X / N));
                  f || b.updatepager(!1, !0);
                  if (k) {
                    for (;t < X;) {
                      G = c[t];
                      K = m(G, t + Z);
                      K = b.p.idPrefix + K;
                      if (l.repeatitems) {
                        A || (A = x(T + C + U));
                        var Va = a.jgrid.getXmlData(G, l.cell, !0);
                        a.each(A, function(a) {
                          var c = Va[this];
                          if (!c) {
                            return !1;
                          }
                          R = c.textContent || c.text;
                          W[b.p.colModel[a + T + C + U].name] = R;
                        });
                      } else {
                        for (n = 0;n < z.length;n++) {
                          R = a.jgrid.getXmlData(G, z[n]), W[b.p.colModel[n + T + C + U].name] = R;
                        }
                      }
                      W._id_ = a.jgrid.stripPref(b.p.idPrefix, K);
                      b.p.grouping && aa.call(q, W, t);
                      b.p.data.push(W);
                      b.p._index[W._id_] = b.p.data.length - 1;
                      W = {};
                      t++;
                    }
                    b.p.grouping && (b.p.groupingView._locgr = !0, q.jqGrid("groupingRender", S, b.p.colModel.length, b.p.page, N), S = null);
                  }
                }
              }, K = function(c, e, d, f, g) {
                var h = new Date;
                if (c) {
                  -1 !== b.p.treeANode || b.p.scroll ? d = 1 < d ? d : 1 : (B.call(b, !1, !0), d = 1);
                  var k, l = "local" !== b.p.datatype && b.p.loadonce || "jsonstring" === b.p.datatype;
                  l && (b.p.data = [], b.p._index = {}, b.p.localReader.id = "_id_");
                  b.p.reccount = 0;
                  "local" === b.p.datatype ? (e = b.p.localReader, k = "local") : (e = b.p.jsonReader, k = "json");
                  var m = a(b), q = 0, n, p, t, R = [], T = b.p.multiselect ? 1 : 0, C = !0 === b.p.subGrid ? 1 : 0, U, D = !0 === b.p.rownumbers ? 1 : 0, M = x(T + C + D);
                  k = y(k);
                  var W, z, A, G = {}, K, I, F = [], E = !0 === b.p.altRows ? b.p.altclass : "", X;
                  b.p.page = r(a.jgrid.getAccessor(c, e.page), b.p.page);
                  b.p.lastpage = r(a.jgrid.getAccessor(c, e.total), 1);
                  b.p.records = r(a.jgrid.getAccessor(c, e.records));
                  b.p.userData = a.jgrid.getAccessor(c, e.userdata) || {};
                  C && (U = a.jgrid.getMethod("addSubGridCell"));
                  A = !1 === b.p.keyIndex ? a.isFunction(e.id) ? e.id.call(b, c) : e.id : b.p.keyIndex;
                  e.repeatitems || (R = k, 0 < R.length && !isNaN(A) && (A = b.p.keyName));
                  z = a.jgrid.getAccessor(c, e.root);
                  null == z && a.isArray(c) && (z = c);
                  z || (z = []);
                  c = z.length;
                  p = 0;
                  0 < c && 0 >= b.p.page && (b.p.page = 1);
                  var H = parseInt(b.p.rowNum, 10), S = b.p.scroll ? a.jgrid.randId() : 1, N = !1, Z;
                  g && (H *= g + 1);
                  "local" !== b.p.datatype || b.p.deselectAfterSort || (N = !0);
                  var aa = a.isFunction(b.p.afterInsertRow), J = [], P = !1, L;
                  b.p.grouping && (P = !0 === b.p.groupingView.groupCollapse, L = a.jgrid.getMethod("groupingPrepare"));
                  for (;p < c;) {
                    g = z[p];
                    I = a.jgrid.getAccessor(g, A);
                    void 0 === I && ("number" === typeof A && null != b.p.colModel[A + T + C + D] && (I = a.jgrid.getAccessor(g, b.p.colModel[A + T + C + D].name)), void 0 === I && (I = S + p, 0 === R.length && e.cell && (n = a.jgrid.getAccessor(g, e.cell) || g, I = null != n && void 0 !== n[A] ? n[A] : I)));
                    I = b.p.idPrefix + I;
                    n = 1 === d ? 0 : d;
                    X = 1 === (n + p) % 2 ? E : "";
                    N && (Z = b.p.multiselect ? -1 !== a.inArray(I, b.p.selarrrow) : I === b.p.selrow);
                    var ga = F.length;
                    F.push("");
                    D && F.push(w(0, p, b.p.page, b.p.rowNum));
                    T && F.push(u(I, D, p, Z));
                    C && F.push(U.call(m, T + D, p + d));
                    W = k;
                    e.repeatitems && (e.cell && (g = a.jgrid.getAccessor(g, e.cell) || g), a.isArray(g) && (W = M));
                    for (t = 0;t < W.length;t++) {
                      n = a.jgrid.getAccessor(g, W[t]), G[b.p.colModel[t + T + C + D].name] = n, F.push(v(I, n, t + T + C + D, p + d, g, G));
                    }
                    F[ga] = O(I, P, X, G, g, Z);
                    F.push("</tr>");
                    b.p.grouping && (J.push(F), b.p.groupingView._locgr || L.call(m, G, p), F = []);
                    if (l || !0 === b.p.treeGrid) {
                      G._id_ = a.jgrid.stripPref(b.p.idPrefix, I), b.p.data.push(G), b.p._index[G._id_] = b.p.data.length - 1;
                    }
                    !1 === b.p.gridview && (a("#" + a.jgrid.jqID(b.p.id) + " tbody:first").append(F.join("")), m.triggerHandler("jqGridAfterInsertRow", [I, G, g]), aa && b.p.afterInsertRow.call(b, I, G, g), F = []);
                    G = {};
                    q++;
                    p++;
                    if (q === H) {
                      break;
                    }
                  }
                  !0 === b.p.gridview && (K = -1 < b.p.treeANode ? b.p.treeANode : 0, b.p.grouping ? l || (m.jqGrid("groupingRender", J, b.p.colModel.length, b.p.page, H), J = null) : !0 === b.p.treeGrid && 0 < K ? a(b.rows[K]).after(F.join("")) : a("#" + a.jgrid.jqID(b.p.id) + " tbody:first").append(F.join("")));
                  if (!0 === b.p.subGrid) {
                    try {
                      m.jqGrid("addSubGrid", T + D);
                    } catch (ia) {
                    }
                  }
                  b.p.totaltime = new Date - h;
                  0 < q && 0 === b.p.records && (b.p.records = c);
                  if (!0 === b.p.treeGrid) {
                    try {
                      m.jqGrid("setTreeNode", K + 1, q + K + 1);
                    } catch (Va) {
                    }
                  }
                  b.p.treeGrid || b.p.scroll || (b.grid.bDiv.scrollTop = 0);
                  b.p.reccount = q;
                  b.p.treeANode = -1;
                  b.p.userDataOnFooter && m.jqGrid("footerData", "set", b.p.userData, !0);
                  l && (b.p.records = c, b.p.lastpage = Math.ceil(c / H));
                  f || b.updatepager(!1, !0);
                  if (l) {
                    for (;q < c && z[q];) {
                      g = z[q];
                      I = a.jgrid.getAccessor(g, A);
                      void 0 === I && ("number" === typeof A && null != b.p.colModel[A + T + C + D] && (I = a.jgrid.getAccessor(g, b.p.colModel[A + T + C + D].name)), void 0 === I && (I = S + q, 0 === R.length && e.cell && (d = a.jgrid.getAccessor(g, e.cell) || g, I = null != d && void 0 !== d[A] ? d[A] : I)));
                      if (g) {
                        I = b.p.idPrefix + I;
                        W = k;
                        e.repeatitems && (e.cell && (g = a.jgrid.getAccessor(g, e.cell) || g), a.isArray(g) && (W = M));
                        for (t = 0;t < W.length;t++) {
                          G[b.p.colModel[t + T + C + D].name] = a.jgrid.getAccessor(g, W[t]);
                        }
                        G._id_ = a.jgrid.stripPref(b.p.idPrefix, I);
                        b.p.grouping && L.call(m, G, q);
                        b.p.data.push(G);
                        b.p._index[G._id_] = b.p.data.length - 1;
                        G = {};
                      }
                      q++;
                    }
                    b.p.grouping && (b.p.groupingView._locgr = !0, m.jqGrid("groupingRender", J, b.p.colModel.length, b.p.page, H));
                  }
                }
              }, H = function() {
                function c(a) {
                  var b = 0, e, d, f, h, k;
                  if (null != a.groups) {
                    (d = a.groups.length && "OR" === a.groupOp.toString().toUpperCase()) && v.orBegin();
                    for (e = 0;e < a.groups.length;e++) {
                      0 < b && d && v.or();
                      try {
                        c(a.groups[e]);
                      } catch (l) {
                        alert(l);
                      }
                      b++;
                    }
                    d && v.orEnd();
                  }
                  if (null != a.rules) {
                    try {
                      (f = a.rules.length && "OR" === a.groupOp.toString().toUpperCase()) && v.orBegin();
                      for (e = 0;e < a.rules.length;e++) {
                        k = a.rules[e], h = a.groupOp.toString().toUpperCase(), t[k.op] && k.field && (0 < b && h && "OR" === h && (v = v.or()), v = t[k.op](v, h)(k.field, k.data, g[k.field])), b++;
                      }
                      f && v.orEnd();
                    } catch (m) {
                      alert(m);
                    }
                  }
                }
                var e = b.p.multiSort ? [] : "", d = [], f = !1, g = {}, h = [], k = [], l, m, q;
                if (a.isArray(b.p.data)) {
                  var n = b.p.grouping ? b.p.groupingView : !1, r, p;
                  a.each(b.p.colModel, function() {
                    m = this.sorttype || "text";
                    "date" === m || "datetime" === m ? (this.formatter && "string" === typeof this.formatter && "date" === this.formatter ? (l = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : a.jgrid.formatter.date.srcformat, q = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat : a.jgrid.formatter.date.newformat) : l = q = this.datefmt || "Y-m-d", g[this.name] = {stype:m, srcfmt:l, newfmt:q, sfunc:this.sortfunc || null}) : g[this.name] = 
                    {stype:m, srcfmt:"", newfmt:"", sfunc:this.sortfunc || null};
                    if (b.p.grouping) {
                      for (p = 0, r = n.groupField.length;p < r;p++) {
                        if (this.name === n.groupField[p]) {
                          var c = this.name;
                          this.index && (c = this.index);
                          h[p] = g[c];
                          k[p] = c;
                        }
                      }
                    }
                    b.p.multiSort ? this.lso && (e.push(this.name), c = this.lso.split("-"), d.push(c[c.length - 1])) : f || this.index !== b.p.sortname && this.name !== b.p.sortname || (e = this.name, f = !0);
                  });
                  if (b.p.treeGrid) {
                    a(b).jqGrid("SortTree", e, b.p.sortorder, g[e].stype || "text", g[e].srcfmt || "");
                  } else {
                    var t = {eq:function(a) {
                      return a.equals;
                    }, ne:function(a) {
                      return a.notEquals;
                    }, lt:function(a) {
                      return a.less;
                    }, le:function(a) {
                      return a.lessOrEquals;
                    }, gt:function(a) {
                      return a.greater;
                    }, ge:function(a) {
                      return a.greaterOrEquals;
                    }, cn:function(a) {
                      return a.contains;
                    }, nc:function(a, b) {
                      return "OR" === b ? a.orNot().contains : a.andNot().contains;
                    }, bw:function(a) {
                      return a.startsWith;
                    }, bn:function(a, b) {
                      return "OR" === b ? a.orNot().startsWith : a.andNot().startsWith;
                    }, en:function(a, b) {
                      return "OR" === b ? a.orNot().endsWith : a.andNot().endsWith;
                    }, ew:function(a) {
                      return a.endsWith;
                    }, ni:function(a, b) {
                      return "OR" === b ? a.orNot().equals : a.andNot().equals;
                    }, "in":function(a) {
                      return a.equals;
                    }, nu:function(a) {
                      return a.isNull;
                    }, nn:function(a, b) {
                      return "OR" === b ? a.orNot().isNull : a.andNot().isNull;
                    }}, v = a.jgrid.from(b.p.data);
                    b.p.ignoreCase && (v = v.ignoreCase());
                    if (!0 === b.p.search) {
                      var u = b.p.postData.filters;
                      if (u) {
                        "string" === typeof u && (u = a.jgrid.parse(u)), c(u);
                      } else {
                        try {
                          v = t[b.p.postData.searchOper](v)(b.p.postData.searchField, b.p.postData.searchString, g[b.p.postData.searchField]);
                        } catch (w) {
                        }
                      }
                    }
                    if (b.p.grouping) {
                      for (p = 0;p < r;p++) {
                        v.orderBy(k[p], n.groupOrder[p], h[p].stype, h[p].srcfmt);
                      }
                    }
                    b.p.multiSort ? a.each(e, function(a) {
                      v.orderBy(this, d[a], g[this].stype, g[this].srcfmt, g[this].sfunc);
                    }) : e && b.p.sortorder && f && ("DESC" === b.p.sortorder.toUpperCase() ? v.orderBy(b.p.sortname, "d", g[e].stype, g[e].srcfmt, g[e].sfunc) : v.orderBy(b.p.sortname, "a", g[e].stype, g[e].srcfmt, g[e].sfunc));
                    var u = v.select(), y = parseInt(b.p.rowNum, 10), R = u.length, x = parseInt(b.p.page, 10), T = Math.ceil(R / y), C = {};
                    if ((b.p.search || b.p.resetsearch) && b.p.grouping && b.p.groupingView._locgr) {
                      b.p.groupingView.groups = [];
                      var D, U = a.jgrid.getMethod("groupingPrepare"), B, M;
                      if (b.p.footerrow && b.p.userDataOnFooter) {
                        for (B in b.p.userData) {
                          b.p.userData.hasOwnProperty(B) && (b.p.userData[B] = 0);
                        }
                        M = !0;
                      }
                      for (D = 0;D < R;D++) {
                        if (M) {
                          for (B in b.p.userData) {
                            b.p.userData[B] += parseFloat(u[D][B] || 0);
                          }
                        }
                        U.call(a(b), u[D], D, y);
                      }
                    }
                    u = u.slice((x - 1) * y, x * y);
                    g = v = null;
                    C[b.p.localReader.total] = T;
                    C[b.p.localReader.page] = x;
                    C[b.p.localReader.records] = R;
                    C[b.p.localReader.root] = u;
                    C[b.p.localReader.userdata] = b.p.userData;
                    u = null;
                    return C;
                  }
                }
              }, z = function() {
                b.grid.hDiv.loading = !0;
                if (!b.p.hiddengrid) {
                  switch(b.p.loadui) {
                    case "enable":
                      a("#load_" + a.jgrid.jqID(b.p.id)).show();
                      break;
                    case "block":
                      a("#lui_" + a.jgrid.jqID(b.p.id)).show(), a("#load_" + a.jgrid.jqID(b.p.id)).show();
                  }
                }
              }, P = function() {
                b.grid.hDiv.loading = !1;
                switch(b.p.loadui) {
                  case "enable":
                    a("#load_" + a.jgrid.jqID(b.p.id)).hide();
                    break;
                  case "block":
                    a("#lui_" + a.jgrid.jqID(b.p.id)).hide(), a("#load_" + a.jgrid.jqID(b.p.id)).hide();
                }
              }, L = function(c) {
                if (!b.grid.hDiv.loading) {
                  var e = b.p.scroll && !1 === c, d = {}, f, g = b.p.prmNames;
                  0 >= b.p.page && (b.p.page = Math.min(1, b.p.lastpage));
                  null !== g.search && (d[g.search] = b.p.search);
                  null !== g.nd && (d[g.nd] = (new Date).getTime());
                  null !== g.rows && (d[g.rows] = b.p.rowNum);
                  null !== g.page && (d[g.page] = b.p.page);
                  null !== g.sort && (d[g.sort] = b.p.sortname);
                  null !== g.order && (d[g.order] = b.p.sortorder);
                  null !== b.p.rowTotal && null !== g.totalrows && (d[g.totalrows] = b.p.rowTotal);
                  var h = a.isFunction(b.p.loadComplete), k = h ? b.p.loadComplete : null, l = 0;
                  c = c || 1;
                  1 < c ? null !== g.npage ? (d[g.npage] = c, l = c - 1, c = 1) : k = function(a) {
                    b.p.page++;
                    b.grid.hDiv.loading = !1;
                    h && b.p.loadComplete.call(b, a);
                    L(c - 1);
                  } : null !== g.npage && delete b.p.postData[g.npage];
                  if (b.p.grouping) {
                    a(b).jqGrid("groupingSetup");
                    var m = b.p.groupingView, q, n = "";
                    for (q = 0;q < m.groupField.length;q++) {
                      var r = m.groupField[q];
                      a.each(b.p.colModel, function(a, c) {
                        c.name === r && c.index && (r = c.index);
                      });
                      n += r + " " + m.groupOrder[q] + ", ";
                    }
                    d[g.sort] = n + d[g.sort];
                  }
                  a.extend(b.p.postData, d);
                  var p = b.p.scroll ? b.rows.length - 1 : 1, d = a(b).triggerHandler("jqGridBeforeRequest");
                  if (!1 !== d && "stop" !== d) {
                    if (a.isFunction(b.p.datatype)) {
                      b.p.datatype.call(b, b.p.postData, "load_" + b.p.id, p, c, l);
                    } else {
                      if (a.isFunction(b.p.beforeRequest) && (d = b.p.beforeRequest.call(b), void 0 === d && (d = !0), !1 === d)) {
                        return;
                      }
                      f = b.p.datatype.toLowerCase();
                      switch(f) {
                        case "json":
                        ;
                        case "jsonp":
                        ;
                        case "xml":
                        ;
                        case "script":
                          a.ajax(a.extend({url:b.p.url, type:b.p.mtype, dataType:f, data:a.isFunction(b.p.serializeGridData) ? b.p.serializeGridData.call(b, b.p.postData) : b.p.postData, success:function(d, g, h) {
                            if (a.isFunction(b.p.beforeProcessing) && !1 === b.p.beforeProcessing.call(b, d, g, h)) {
                              P();
                            } else {
                              "xml" === f ? D(d, b.grid.bDiv, p, 1 < c, l) : K(d, b.grid.bDiv, p, 1 < c, l);
                              a(b).triggerHandler("jqGridLoadComplete", [d]);
                              k && k.call(b, d);
                              a(b).triggerHandler("jqGridAfterLoadComplete", [d]);
                              e && b.grid.populateVisible();
                              if (b.p.loadonce || b.p.treeGrid) {
                                b.p.datatype = "local";
                              }
                              1 === c && P();
                            }
                          }, error:function(e, d, f) {
                            a.isFunction(b.p.loadError) && b.p.loadError.call(b, e, d, f);
                            1 === c && P();
                          }, beforeSend:function(c, e) {
                            var d = !0;
                            a.isFunction(b.p.loadBeforeSend) && (d = b.p.loadBeforeSend.call(b, c, e));
                            void 0 === d && (d = !0);
                            if (!1 === d) {
                              return !1;
                            }
                            z();
                          }}, a.jgrid.ajaxOptions, b.p.ajaxGridOptions));
                          break;
                        case "xmlstring":
                          z();
                          d = "string" !== typeof b.p.datastr ? b.p.datastr : a.parseXML(b.p.datastr);
                          D(d, b.grid.bDiv);
                          a(b).triggerHandler("jqGridLoadComplete", [d]);
                          h && b.p.loadComplete.call(b, d);
                          a(b).triggerHandler("jqGridAfterLoadComplete", [d]);
                          b.p.datatype = "local";
                          b.p.datastr = null;
                          P();
                          break;
                        case "jsonstring":
                          z();
                          d = "string" === typeof b.p.datastr ? a.jgrid.parse(b.p.datastr) : b.p.datastr;
                          K(d, b.grid.bDiv);
                          a(b).triggerHandler("jqGridLoadComplete", [d]);
                          h && b.p.loadComplete.call(b, d);
                          a(b).triggerHandler("jqGridAfterLoadComplete", [d]);
                          b.p.datatype = "local";
                          b.p.datastr = null;
                          P();
                          break;
                        case "local":
                        ;
                        case "clientside":
                          z(), b.p.datatype = "local", d = H(), K(d, b.grid.bDiv, p, 1 < c, l), a(b).triggerHandler("jqGridLoadComplete", [d]), k && k.call(b, d), a(b).triggerHandler("jqGridAfterLoadComplete", [d]), e && b.grid.populateVisible(), P();
                      }
                    }
                  }
                }
              }, ha = function(c) {
                a("#cb_" + a.jgrid.jqID(b.p.id), b.grid.hDiv)[b.p.useProp ? "prop" : "attr"]("checked", c);
                if (b.p.frozenColumns && b.p.id + "_frozen") {
                  a("#cb_" + a.jgrid.jqID(b.p.id), b.grid.fhDiv)[b.p.useProp ? "prop" : "attr"]("checked", c);
                }
              }, ca = function(c, e) {
                var d = "", f = "<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;' class='ui-pg-table'><tbody><tr>", h = "", k, l, m, q, n = function(c) {
                  var e;
                  a.isFunction(b.p.onPaging) && (e = b.p.onPaging.call(b, c));
                  if ("stop" === e) {
                    return !1;
                  }
                  b.p.selrow = null;
                  b.p.multiselect && (b.p.selarrrow = [], ha(!1));
                  b.p.savedRow = [];
                  return !0;
                };
                c = c.substr(1);
                e += "_" + c;
                k = "pg_" + c;
                l = c + "_left";
                m = c + "_center";
                q = c + "_right";
                a("#" + a.jgrid.jqID(c)).append("<div id='" + k + "' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;' role='row'><tbody><tr><td id='" + l + "' align='left'></td><td id='" + m + "' align='center' style='white-space:pre;'></td><td id='" + q + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr");
                if (0 < b.p.rowList.length) {
                  h = "<td dir='" + g + "'>";
                  h += "<select class='ui-pg-selbox' role='listbox'>";
                  for (l = 0;l < b.p.rowList.length;l++) {
                    h += '<option role="option" value="' + b.p.rowList[l] + '"' + (b.p.rowNum === b.p.rowList[l] ? ' selected="selected"' : "") + ">" + b.p.rowList[l] + "</option>";
                  }
                  h += "</select></td>";
                }
                "rtl" === g && (f += h);
                !0 === b.p.pginput && (d = "<td dir='" + g + "'>" + a.jgrid.format(b.p.pgtext || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + a.jgrid.jqID(c) + "'></span>") + "</td>");
                !0 === b.p.pgbuttons ? (l = ["first" + e, "prev" + e, "next" + e, "last" + e], "rtl" === g && l.reverse(), f += "<td id='" + l[0] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-first'></span></td>", f += "<td id='" + l[1] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-prev'></span></td>", f = f + ("" !== d ? "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>" + d + "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>" : 
                "") + ("<td id='" + l[2] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-next'></span></td>"), f += "<td id='" + l[3] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-end'></span></td>") : "" !== d && (f += d);
                "ltr" === g && (f += h);
                f += "</tr></tbody></table>";
                !0 === b.p.viewrecords && a("td#" + c + "_left", "#" + k).append("<div dir='" + g + "' style='text-align:left' class='ui-paging-info'></div>");
                a("td#" + c + "_" + b.p.pagerpos, "#" + k).append(f);
                h = a(".ui-jqgrid").css("font-size") || "11px";
                a(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + h + ";visibility:hidden;' ></div>");
                f = a(f).clone().appendTo("#testpg").width();
                a("#testpg").remove();
                0 < f && ("" !== d && (f += 50), a("td#" + c + "_" + b.p.pagerpos, "#" + k).width(f));
                b.p._nvtd = [];
                b.p._nvtd[0] = f ? Math.floor((b.p.width - f) / 2) : Math.floor(b.p.width / 3);
                b.p._nvtd[1] = 0;
                f = null;
                a(".ui-pg-selbox", "#" + k).bind("change", function() {
                  if (500 <= a(this).val()) {
                    if (confirm("\ub290\ub824\uc9c8\uc218 \uc788\uc2b5\ub2c8\ub2e4. \uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")) {
                      if (!n("records")) {
                        return !1;
                      }
                      b.p.page = Math.round(b.p.rowNum * (b.p.page - 1) / this.value - .5) + 1;
                      b.p.rowNum = this.value;
                      b.p.pager && a(".ui-pg-selbox", b.p.pager).val(this.value);
                      b.p.toppager && a(".ui-pg-selbox", b.p.toppager).val(this.value);
                      L();
                    }
                  } else {
                    if (!n("records")) {
                      return !1;
                    }
                    b.p.page = Math.round(b.p.rowNum * (b.p.page - 1) / this.value - .5) + 1;
                    b.p.rowNum = this.value;
                    b.p.pager && a(".ui-pg-selbox", b.p.pager).val(this.value);
                    b.p.toppager && a(".ui-pg-selbox", b.p.toppager).val(this.value);
                    L();
                  }
                  return !1;
                });
                !0 === b.p.pgbuttons && (a(".ui-pg-button", "#" + k).hover(function() {
                  a(this).hasClass("ui-state-disabled") ? this.style.cursor = "default" : (a(this).addClass("ui-state-hover"), this.style.cursor = "pointer");
                }, function() {
                  a(this).hasClass("ui-state-disabled") || (a(this).removeClass("ui-state-hover"), this.style.cursor = "default");
                }), a("#first" + a.jgrid.jqID(e) + ", #prev" + a.jgrid.jqID(e) + ", #next" + a.jgrid.jqID(e) + ", #last" + a.jgrid.jqID(e)).click(function() {
                  if (a(this).hasClass("ui-state-disabled")) {
                    return !1;
                  }
                  var c = r(b.p.page, 1), d = r(b.p.lastpage, 1), f = !1, g = !0, h = !0, k = !0, l = !0;
                  0 === d || 1 === d ? l = k = h = g = !1 : 1 < d && 1 <= c ? 1 === c ? h = g = !1 : c === d && (l = k = !1) : 1 < d && 0 === c && (l = k = !1, c = d - 1);
                  if (!n(this.id)) {
                    return !1;
                  }
                  this.id === "first" + e && g && (b.p.page = 1, f = !0);
                  this.id === "prev" + e && h && (b.p.page = c - 1, f = !0);
                  this.id === "next" + e && k && (b.p.page = c + 1, f = !0);
                  this.id === "last" + e && l && (b.p.page = d, f = !0);
                  f && L();
                  return !1;
                }));
                !0 === b.p.pginput && a("input.ui-pg-input", "#" + k).keypress(function(c) {
                  if (13 === (c.charCode || c.keyCode || 0)) {
                    if (!n("user")) {
                      return !1;
                    }
                    a(this).val(r(a(this).val(), 1));
                    b.p.page = 0 < a(this).val() ? a(this).val() : b.p.page;
                    L();
                    return !1;
                  }
                  return this;
                });
              }, da = function(c, e) {
                var d, f = "", g = b.p.colModel, h = !1, k;
                k = b.p.frozenColumns ? e : b.grid.headers[c].el;
                var l = "";
                a("span.ui-grid-ico-sort", k).addClass("ui-state-disabled");
                a(k).attr("aria-selected", "false");
                if (g[c].lso) {
                  if ("asc" === g[c].lso) {
                    g[c].lso += "-desc", l = "desc";
                  } else {
                    if ("desc" === g[c].lso) {
                      g[c].lso += "-asc", l = "asc";
                    } else {
                      if ("asc-desc" === g[c].lso || "desc-asc" === g[c].lso) {
                        g[c].lso = "";
                      }
                    }
                  }
                } else {
                  g[c].lso = l = g[c].firstsortorder || "asc";
                }
                l ? (a("span.s-ico", k).show(), a("span.ui-icon-" + l, k).removeClass("ui-state-disabled"), a(k).attr("aria-selected", "true")) : b.p.viewsortcols[0] || a("span.s-ico", k).hide();
                b.p.sortorder = "";
                a.each(g, function(a) {
                  this.lso && (0 < a && h && (f += ", "), d = this.lso.split("-"), f += g[a].index || g[a].name, f += " " + d[d.length - 1], h = !0, b.p.sortorder = d[d.length - 1]);
                });
                k = f.lastIndexOf(b.p.sortorder);
                f = f.substring(0, k);
                b.p.sortname = f;
              }, S = function(c, e, d, f, g) {
                if (b.p.colModel[e].sortable && !(0 < b.p.savedRow.length)) {
                  d || (b.p.lastsort === e ? "asc" === b.p.sortorder ? b.p.sortorder = "desc" : "desc" === b.p.sortorder && (b.p.sortorder = "asc") : b.p.sortorder = b.p.colModel[e].firstsortorder || "asc", b.p.page = 1);
                  if (b.p.multiSort) {
                    da(e, g);
                  } else {
                    if (f) {
                      if (b.p.lastsort === e && b.p.sortorder === f && !d) {
                        return;
                      }
                      b.p.sortorder = f;
                    }
                    d = b.grid.headers[b.p.lastsort].el;
                    g = b.p.frozenColumns ? g : b.grid.headers[e].el;
                    a("span.ui-grid-ico-sort", d).addClass("ui-state-disabled");
                    a(d).attr("aria-selected", "false");
                    b.p.frozenColumns && (b.grid.fhDiv.find("span.ui-grid-ico-sort").addClass("ui-state-disabled"), b.grid.fhDiv.find("th").attr("aria-selected", "false"));
                    a("span.ui-icon-" + b.p.sortorder, g).removeClass("ui-state-disabled");
                    a(g).attr("aria-selected", "true");
                    b.p.viewsortcols[0] || b.p.lastsort === e || (b.p.frozenColumns && b.grid.fhDiv.find("span.s-ico").hide(), a("span.s-ico", d).hide(), a("span.s-ico", g).show());
                    c = c.substring(5 + b.p.id.length + 1);
                    b.p.sortname = b.p.colModel[e].index || c;
                  }
                  "stop" === a(b).triggerHandler("jqGridSortCol", [b.p.sortname, e, b.p.sortorder]) ? b.p.lastsort = e : a.isFunction(b.p.onSortCol) && "stop" === b.p.onSortCol.call(b, b.p.sortname, e, b.p.sortorder) ? b.p.lastsort = e : ("local" === b.p.datatype ? b.p.deselectAfterSort && a(b).jqGrid("resetSelection") : (b.p.selrow = null, b.p.multiselect && ha(!1), b.p.selarrrow = [], b.p.savedRow = []), b.p.scroll && (g = b.grid.bDiv.scrollLeft, B.call(b, !0, !1), b.grid.hDiv.scrollLeft = g), 
                  b.p.subGrid && "local" === b.p.datatype && a("td.sgexpanded", "#" + a.jgrid.jqID(b.p.id)).each(function() {
                    a(this).trigger("click");
                  }), L(), b.p.lastsort = e, b.p.sortname !== c && e && (b.p.lastsort = e));
                }
              }, ja = function(c) {
                c = a(b.grid.headers[c].el);
                c = [c.position().left + c.outerWidth()];
                "rtl" === b.p.direction && (c[0] = b.p.width - c[0]);
                c[0] -= b.grid.bDiv.scrollLeft;
                c.push(a(b.grid.hDiv).position().top);
                c.push(a(b.grid.bDiv).offset().top - a(b.grid.hDiv).offset().top + a(b.grid.bDiv).height());
                return c;
              }, fa = function(c) {
                var e, d = b.grid.headers, f = a.jgrid.getCellIndex(c);
                for (e = 0;e < d.length;e++) {
                  if (c === d[e].el) {
                    f = e;
                    break;
                  }
                }
                return f;
              };
              this.p.id = this.id;
              -1 === a.inArray(b.p.multikey, ["shiftKey", "altKey", "ctrlKey"]) && (b.p.multikey = !1);
              b.p.keyIndex = !1;
              b.p.keyName = !1;
              for (h = 0;h < b.p.colModel.length;h++) {
                b.p.colModel[h] = a.extend(!0, {}, b.p.cmTemplate, b.p.colModel[h].template || {}, b.p.colModel[h]), !1 === b.p.keyIndex && !0 === b.p.colModel[h].key && (b.p.keyIndex = h);
              }
              b.p.sortorder = b.p.sortorder.toLowerCase();
              a.jgrid.cell_width = a.jgrid.cellWidth();
              !0 === b.p.grouping && (b.p.scroll = !1, b.p.rownumbers = !1, b.p.treeGrid = !1, b.p.gridview = !0);
              if (!0 === this.p.treeGrid) {
                try {
                  a(this).jqGrid("setTreeGrid");
                } catch (V) {
                }
                "local" !== b.p.datatype && (b.p.localReader = {id:"_id_"});
              }
              if (this.p.subGrid) {
                try {
                  a(b).jqGrid("setSubGrid");
                } catch (ea) {
                }
              }
              this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({name:"cb", width:a.jgrid.cell_width ? b.p.multiselectWidth + b.p.cellLayout : b.p.multiselectWidth, sortable:!1, resizable:!1, hidedlg:!0, search:!1, align:"center", fixed:!0}));
              this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({name:"rn", width:b.p.rownumWidth, sortable:!1, resizable:!1, hidedlg:!0, search:!1, align:"center", fixed:!0}));
              b.p.xmlReader = a.extend(!0, {root:"rows", row:"row", page:"rows>page", total:"rows>total", records:"rows>records", repeatitems:!0, cell:"cell", id:"[id]", userdata:"userdata", subgrid:{root:"rows", row:"row", repeatitems:!0, cell:"cell"}}, b.p.xmlReader);
              b.p.jsonReader = a.extend(!0, {root:"rows", page:"page", total:"total", records:"records", repeatitems:!0, cell:"cell", id:"id", userdata:"userdata", subgrid:{root:"rows", repeatitems:!0, cell:"cell"}}, b.p.jsonReader);
              b.p.localReader = a.extend(!0, {root:"rows", page:"page", total:"total", records:"records", repeatitems:!1, cell:"cell", id:"id", userdata:"userdata", subgrid:{root:"rows", repeatitems:!0, cell:"cell"}}, b.p.localReader);
              b.p.scroll && (b.p.pgbuttons = !1, b.p.pginput = !1, b.p.rowList = []);
              b.p.data.length && C();
              var M = "<thead><tr class='ui-jqgrid-labels' role='rowheader'>", I, A, aa, ka, F, N, J, ga, E = ga = "", ia = [], ma = [];
              A = [];
              if (!0 === b.p.shrinkToFit && !0 === b.p.forceFit) {
                for (h = b.p.colModel.length - 1;0 <= h;h--) {
                  if (!b.p.colModel[h].hidden) {
                    b.p.colModel[h].resizable = !1;
                    break;
                  }
                }
              }
              "horizontal" === b.p.viewsortcols[1] && (ga = " ui-i-asc", E = " ui-i-desc");
              I = m ? "class='ui-th-div-ie'" : "";
              ga = "<span class='s-ico' style='display:none'><span sort='asc' class='ui-grid-ico-sort ui-icon-asc" + ga + " ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-" + g + "'></span>" + ("<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + E + " ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-" + g + "'></span></span>");
              if (b.p.multiSort) {
                for (ia = b.p.sortname.split(","), h = 0;h < ia.length;h++) {
                  A = a.trim(ia[h]).split(" "), ia[h] = a.trim(A[0]), ma[h] = A[1] ? a.trim(A[1]) : b.p.sortorder || "asc";
                }
              }
              for (h = 0;h < this.p.colNames.length;h++) {
                A = b.p.headertitles ? ' title="' + a.jgrid.stripHtml(b.p.colNames[h]) + '"' : "", M += "<th id='" + b.p.id + "_" + b.p.colModel[h].name + "' role='columnheader' class='ui-state-default ui-th-column ui-th-" + g + "'" + A + ">", A = b.p.colModel[h].index || b.p.colModel[h].name, M += "<div id='jqgh_" + b.p.id + "_" + b.p.colModel[h].name + "' " + I + ">" + b.p.colNames[h], b.p.colModel[h].width = b.p.colModel[h].width ? parseInt(b.p.colModel[h].width, 10) : 150, "boolean" !== typeof b.p.colModel[h].title && 
                (b.p.colModel[h].title = !0), b.p.colModel[h].lso = "", A === b.p.sortname && (b.p.lastsort = h), b.p.multiSort && (A = a.inArray(A, ia), -1 !== A && (b.p.colModel[h].lso = ma[A])), M += ga + "</div></th>";
              }
              M += "</tr></thead>";
              ga = null;
              a(this).append(M);
              a("thead tr:first th", this).hover(function() {
                a(this).addClass("ui-state-hover");
              }, function() {
                a(this).removeClass("ui-state-hover");
              });
              if (this.p.multiselect) {
                var Y = [], R;
                a("#cb_" + a.jgrid.jqID(b.p.id), this).bind("click", function() {
                  b.p.selarrrow = [];
                  var c = !0 === b.p.frozenColumns ? b.p.id + "_frozen" : "";
                  this.checked ? (a(b.rows).each(function(e) {
                    0 < e && !a(this).hasClass("ui-subgrid") && !a(this).hasClass("jqgroup") && !a(this).hasClass("ui-state-disabled") && (a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + a.jgrid.jqID(this.id))[b.p.useProp ? "prop" : "attr"]("checked", !0), a(this).addClass("ui-state-highlight").attr("aria-selected", "true"), b.p.selarrrow.push(this.id), b.p.selrow = this.id, c && (a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + a.jgrid.jqID(this.id), b.grid.fbDiv)[b.p.useProp ? "prop" : "attr"]("checked", !0), 
                    a("#" + a.jgrid.jqID(this.id), b.grid.fbDiv).addClass("ui-state-highlight")));
                  }), R = !0, Y = []) : (a(b.rows).each(function(e) {
                    0 < e && !a(this).hasClass("ui-subgrid") && !a(this).hasClass("ui-state-disabled") && (a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + a.jgrid.jqID(this.id))[b.p.useProp ? "prop" : "attr"]("checked", !1), a(this).removeClass("ui-state-highlight").attr("aria-selected", "false"), Y.push(this.id), c && (a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + a.jgrid.jqID(this.id), b.grid.fbDiv)[b.p.useProp ? "prop" : "attr"]("checked", !1), a("#" + a.jgrid.jqID(this.id), b.grid.fbDiv).removeClass("ui-state-highlight")));
                  }), b.p.selrow = null, R = !1);
                  a(b).triggerHandler("jqGridSelectAll", [R ? b.p.selarrrow : Y, R]);
                  a.isFunction(b.p.onSelectAll) && b.p.onSelectAll.call(b, R ? b.p.selarrrow : Y, R);
                });
              }
              !0 === b.p.autowidth && (M = a(n).innerWidth(), b.p.width = 0 < M ? M : "nw");
              (function() {
                var c = 0, e = a.jgrid.cell_width ? 0 : r(b.p.cellLayout, 0), d = 0, g, h = r(b.p.scrollOffset, 0), l, m = !1, q, n = 0, p;
                a.each(b.p.colModel, function() {
                  void 0 === this.hidden && (this.hidden = !1);
                  if (b.p.grouping && b.p.autowidth) {
                    var f = a.inArray(this.name, b.p.groupingView.groupField);
                    0 <= f && b.p.groupingView.groupColumnShow.length > f && (this.hidden = !b.p.groupingView.groupColumnShow[f]);
                  }
                  this.widthOrg = l = r(this.width, 0);
                  !1 === this.hidden && (c += l + e, this.fixed ? n += l + e : d++);
                });
                isNaN(b.p.width) && (b.p.width = c + (!1 !== b.p.shrinkToFit || isNaN(b.p.height) ? 0 : h));
                f.width = b.p.width;
                b.p.tblwidth = c;
                !1 === b.p.shrinkToFit && !0 === b.p.forceFit && (b.p.forceFit = !1);
                !0 === b.p.shrinkToFit && 0 < d && (q = f.width - e * d - n, isNaN(b.p.height) || (q -= h, m = !0), c = 0, a.each(b.p.colModel, function(a) {
                  !1 !== this.hidden || this.fixed || (this.width = l = Math.round(q * this.width / (b.p.tblwidth - e * d - n)), c += l, g = a);
                }), p = 0, m ? f.width - n - (c + e * d) !== h && (p = f.width - n - (c + e * d) - h) : m || 1 === Math.abs(f.width - n - (c + e * d)) || (p = f.width - n - (c + e * d)), b.p.colModel[g].width += p, b.p.tblwidth = c + p + e * d + n, b.p.tblwidth > b.p.width && (b.p.colModel[g].width -= b.p.tblwidth - parseInt(b.p.width, 10), b.p.tblwidth = b.p.width));
              })();
              a(n).css("width", f.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + b.p.id + "'>&#160;</div>");
              a(l).css("width", f.width + "px");
              var M = a("thead:first", b).get(0), U = "";
              b.p.footerrow && (U += "<table role='grid' style='width:" + b.p.tblwidth + "px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-" + g + "'>");
              var l = a("tr:first", M), T = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
              b.p.disableClick = !1;
              a("th", l).each(function(c) {
                aa = b.p.colModel[c].width;
                void 0 === b.p.colModel[c].resizable && (b.p.colModel[c].resizable = !0);
                b.p.colModel[c].resizable ? (ka = document.createElement("span"), a(ka).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + g).css("cursor", "col-resize"), a(this).addClass(b.p.resizeclass)) : ka = "";
                a(this).css("width", aa + "px").prepend(ka);
                ka = null;
                var e = "";
                b.p.colModel[c].hidden && (a(this).css("display", "none"), e = "display:none;");
                T += "<td role='gridcell' style='height:0px;width:" + aa + "px;" + e + "'></td>";
                f.headers[c] = {width:aa, el:this};
                F = b.p.colModel[c].sortable;
                "boolean" !== typeof F && (F = b.p.colModel[c].sortable = !0);
                e = b.p.colModel[c].name;
                "cb" !== e && "subgrid" !== e && "rn" !== e && b.p.viewsortcols[2] && a(">div", this).addClass("ui-jqgrid-sortable");
                F && (b.p.multiSort ? b.p.viewsortcols[0] ? (a("div span.s-ico", this).show(), b.p.colModel[c].lso && a("div span.ui-icon-" + b.p.colModel[c].lso, this).removeClass("ui-state-disabled")) : b.p.colModel[c].lso && (a("div span.s-ico", this).show(), a("div span.ui-icon-" + b.p.colModel[c].lso, this).removeClass("ui-state-disabled")) : b.p.viewsortcols[0] ? (a("div span.s-ico", this).show(), c === b.p.lastsort && a("div span.ui-icon-" + b.p.sortorder, this).removeClass("ui-state-disabled")) : 
                c === b.p.lastsort && (a("div span.s-ico", this).show(), a("div span.ui-icon-" + b.p.sortorder, this).removeClass("ui-state-disabled")));
                b.p.footerrow && (U += "<td role='gridcell' " + q(c, 0, "", null, "", !1) + ">&#160;</td>");
              }).mousedown(function(c) {
                if (1 === a(c.target).closest("th>span.ui-jqgrid-resize").length) {
                  var e = fa(this);
                  if (!0 === b.p.forceFit) {
                    var d = b.p, g = e, h;
                    for (h = e + 1;h < b.p.colModel.length;h++) {
                      if (!0 !== b.p.colModel[h].hidden) {
                        g = h;
                        break;
                      }
                    }
                    d.nv = g - e;
                  }
                  f.dragStart(e, c, ja(e));
                  return !1;
                }
              }).click(function(c) {
                if (b.p.disableClick) {
                  return b.p.disableClick = !1;
                }
                var e = "th>div.ui-jqgrid-sortable", d, f;
                b.p.viewsortcols[2] || (e = "th>div>span>span.ui-grid-ico-sort");
                c = a(c.target).closest(e);
                if (1 === c.length) {
                  var g;
                  if (b.p.frozenColumns) {
                    var h = a(this)[0].id.substring(b.p.id.length + 1);
                    a(b.p.colModel).each(function(a) {
                      if (this.name === h) {
                        return g = a, !1;
                      }
                    });
                  } else {
                    g = fa(this);
                  }
                  b.p.viewsortcols[2] || (d = !0, f = c.attr("sort"));
                  null != g && S(a("div", this)[0].id, g, d, f, this);
                  return !1;
                }
              });
              if (b.p.sortable && a.fn.sortable) {
                try {
                  a(b).jqGrid("sortableColumns", l);
                } catch (W) {
                }
              }
              b.p.footerrow && (U += "</tr></tbody></table>");
              T += "</tr>";
              l = document.createElement("tbody");
              this.appendChild(l);
              a(this).addClass("ui-jqgrid-btable").append(T);
              var T = null, l = a("<table class='ui-jqgrid-htable' style='width:" + b.p.tblwidth + "px' role='grid' aria-labelledby='gbox_" + this.id + "' cellspacing='0' cellpadding='0' border='0'></table>").append(M), X = b.p.caption && !0 === b.p.hiddengrid ? !0 : !1;
              h = a("<div class='ui-jqgrid-hbox" + ("rtl" === g ? "-rtl" : "") + "'></div>");
              M = null;
              f.hDiv = document.createElement("div");
              a(f.hDiv).css({width:f.width + "px"}).addClass("ui-state-default ui-jqgrid-hdiv").append(h);
              a(h).append(l);
              l = null;
              X && a(f.hDiv).hide();
              b.p.pager && ("string" === typeof b.p.pager ? "#" !== b.p.pager.substr(0, 1) && (b.p.pager = "#" + b.p.pager) : b.p.pager = "#" + a(b.p.pager).attr("id"), a(b.p.pager).css({width:f.width + "px"}).addClass("ui-state-default ui-jqgrid-pager ui-corner-bottom").appendTo(n), X && a(b.p.pager).hide(), ca(b.p.pager, ""));
              !1 === b.p.cellEdit && !0 === b.p.hoverrows && a(b).bind("mouseover", function(c) {
                J = a(c.target).closest("tr.jqgrow");
                "ui-subgrid" !== a(J).attr("class") && a(J).addClass("ui-state-hover");
              }).bind("mouseout", function(c) {
                J = a(c.target).closest("tr.jqgrow");
                a(J).removeClass("ui-state-hover");
              });
              var G, Z, pa;
              a(b).before(f.hDiv).click(function(c) {
                N = c.target;
                J = a(N, b.rows).closest("tr.jqgrow");
                if (0 === a(J).length || -1 < J[0].className.indexOf("ui-state-disabled") || (a(N, b).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== b.id) {
                  return this;
                }
                var e = a(N).hasClass("cbox"), d = a(b).triggerHandler("jqGridBeforeSelectRow", [J[0].id, c]);
                (d = !1 === d || "stop" === d ? !1 : !0) && a.isFunction(b.p.beforeSelectRow) && (d = b.p.beforeSelectRow.call(b, J[0].id, c));
                if ("A" !== N.tagName && ("INPUT" !== N.tagName && "TEXTAREA" !== N.tagName && "OPTION" !== N.tagName && "SELECT" !== N.tagName || e) && !0 === d) {
                  if (G = J[0].id, Z = a.jgrid.getCellIndex(N), pa = a(N).closest("td,th").html(), a(b).triggerHandler("jqGridCellSelect", [G, Z, pa, c]), a.isFunction(b.p.onCellSelect) && b.p.onCellSelect.call(b, G, Z, pa, c), !0 === b.p.cellEdit) {
                    if (b.p.multiselect && e) {
                      a(b).jqGrid("setSelection", G, !0, c);
                    } else {
                      G = J[0].rowIndex;
                      try {
                        a(b).jqGrid("editCell", G, Z, !0);
                      } catch (f) {
                      }
                    }
                  } else {
                    if (b.p.multikey) {
                      c[b.p.multikey] ? a(b).jqGrid("setSelection", G, !0, c) : b.p.multiselect && e && (e = a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + G).is(":checked"), a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + G)[b.p.useProp ? "prop" : "attr"]("checked", e));
                    } else {
                      if (b.p.multiselect && b.p.multiboxonly && !e) {
                        var g = b.p.frozenColumns ? b.p.id + "_frozen" : "";
                        a(b.p.selarrrow).each(function(c, e) {
                          var d = a(b).jqGrid("getGridRowById", e);
                          a(d).removeClass("ui-state-highlight");
                          a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + a.jgrid.jqID(e))[b.p.useProp ? "prop" : "attr"]("checked", !1);
                          g && (a("#" + a.jgrid.jqID(e), "#" + a.jgrid.jqID(g)).removeClass("ui-state-highlight"), a("#jqg_" + a.jgrid.jqID(b.p.id) + "_" + a.jgrid.jqID(e), "#" + a.jgrid.jqID(g))[b.p.useProp ? "prop" : "attr"]("checked", !1));
                        });
                        b.p.selarrrow = [];
                      }
                      a(b).jqGrid("setSelection", G, !0, c);
                    }
                  }
                }
              }).bind("reloadGrid", function(c, e) {
                !0 === b.p.treeGrid && (b.p.datatype = b.p.treedatatype);
                e && e.current && b.grid.selectionPreserver(b);
                "local" === b.p.datatype ? (a(b).jqGrid("resetSelection"), b.p.data.length && C()) : b.p.treeGrid || (b.p.selrow = null, b.p.multiselect && (b.p.selarrrow = [], ha(!1)), b.p.savedRow = []);
                b.p.scroll && B.call(b, !0, !1);
                if (e && e.page) {
                  var d = e.page;
                  d > b.p.lastpage && (d = b.p.lastpage);
                  1 > d && (d = 1);
                  b.p.page = d;
                  b.grid.bDiv.scrollTop = b.grid.prevRowHeight ? (d - 1) * b.grid.prevRowHeight * b.p.rowNum : 0;
                }
                b.grid.prevRowHeight && b.p.scroll ? (delete b.p.lastpage, b.grid.populateVisible()) : b.grid.populate();
                !0 === b.p._inlinenav && a(b).jqGrid("showAddEditButtons");
                return !1;
              }).dblclick(function(c) {
                N = c.target;
                J = a(N, b.rows).closest("tr.jqgrow");
                0 !== a(J).length && (G = J[0].rowIndex, Z = a.jgrid.getCellIndex(N), a(b).triggerHandler("jqGridDblClickRow", [a(J).attr("id"), G, Z, c]), a.isFunction(b.p.ondblClickRow) && b.p.ondblClickRow.call(b, a(J).attr("id"), G, Z, c));
              }).bind("contextmenu", function(c) {
                N = c.target;
                J = a(N, b.rows).closest("tr.jqgrow");
                0 !== a(J).length && (b.p.multiselect || a(b).jqGrid("setSelection", J[0].id, !0, c), G = J[0].rowIndex, Z = a.jgrid.getCellIndex(N), a(b).triggerHandler("jqGridRightClickRow", [a(J).attr("id"), G, Z, c]), a.isFunction(b.p.onRightClickRow) && b.p.onRightClickRow.call(b, a(J).attr("id"), G, Z, c));
              });
              f.bDiv = document.createElement("div");
              m && "auto" === String(b.p.height).toLowerCase() && (b.p.height = "100%");
              a(f.bDiv).append(a('<div style="position:relative;' + (m && 8 > a.jgrid.msiever() ? "height:0.01%;" : "") + '"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({height:b.p.height + (isNaN(b.p.height) ? "" : "px"), width:f.width + "px"}).scroll(f.scrollGrid);
              a("table:first", f.bDiv).css({width:b.p.tblwidth + "px"});
              a.support.tbody || 2 === a("tbody", this).length && a("tbody:gt(0)", this).remove();
              b.p.multikey && (a.jgrid.msie ? a(f.bDiv).bind("selectstart", function() {
                return !1;
              }) : a(f.bDiv).bind("mousedown", function() {
                return !1;
              }));
              X && a(f.bDiv).hide();
              f.cDiv = document.createElement("div");
              var la = !0 === b.p.hidegrid ? a("<a role='link' class='ui-jqgrid-titlebar-close ui-corner-all HeaderButton' />").hover(function() {
                la.addClass("ui-state-hover");
              }, function() {
                la.removeClass("ui-state-hover");
              }).append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css("rtl" === g ? "left" : "right", "0px") : "";
              a(f.cDiv).append(la).append("<span class='ui-jqgrid-title'>" + b.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === g ? "-rtl" : "") + " ui-widget-header ui-corner-top ui-helper-clearfix");
              a(f.cDiv).insertBefore(f.hDiv);
              b.p.toolbar[0] && (f.uDiv = document.createElement("div"), "top" === b.p.toolbar[1] ? a(f.uDiv).insertBefore(f.hDiv) : "bottom" === b.p.toolbar[1] && a(f.uDiv).insertAfter(f.hDiv), "both" === b.p.toolbar[1] ? (f.ubDiv = document.createElement("div"), a(f.uDiv).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id).insertBefore(f.hDiv), a(f.ubDiv).addClass("ui-userdata ui-state-default").attr("id", "tb_" + this.id).insertAfter(f.hDiv), X && a(f.ubDiv).hide()) : a(f.uDiv).width(f.width).addClass("ui-userdata ui-state-default").attr("id", 
              "t_" + this.id), X && a(f.uDiv).hide());
              b.p.toppager && (b.p.toppager = a.jgrid.jqID(b.p.id) + "_toppager", f.topDiv = a("<div id='" + b.p.toppager + "'></div>")[0], b.p.toppager = "#" + b.p.toppager, a(f.topDiv).addClass("ui-state-default ui-jqgrid-toppager").width(f.width).insertBefore(f.hDiv), ca(b.p.toppager, "_t"));
              b.p.footerrow && (f.sDiv = a("<div class='ui-jqgrid-sdiv'></div>")[0], h = a("<div class='ui-jqgrid-hbox" + ("rtl" === g ? "-rtl" : "") + "'></div>"), a(f.sDiv).append(h).width(f.width).insertAfter(f.hDiv), a(h).append(U), f.footers = a(".ui-jqgrid-ftable", f.sDiv)[0].rows[0].cells, b.p.rownumbers && (f.footers[0].className = "ui-state-default jqgrid-rownum"), X && a(f.sDiv).hide());
              h = null;
              if (b.p.caption) {
                var wa = b.p.datatype;
                !0 === b.p.hidegrid && (a(".ui-jqgrid-titlebar-close", f.cDiv).click(function(c) {
                  var e = a.isFunction(b.p.onHeaderClick), d = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-pager, .ui-jqgrid-sdiv", g, h = this;
                  !0 === b.p.toolbar[0] && ("both" === b.p.toolbar[1] && (d += ", #" + a(f.ubDiv).attr("id")), d += ", #" + a(f.uDiv).attr("id"));
                  g = a(d, "#gview_" + a.jgrid.jqID(b.p.id)).length;
                  "visible" === b.p.gridstate ? a(d, "#gbox_" + a.jgrid.jqID(b.p.id)).slideUp("fast", function() {
                    g--;
                    0 === g && (a("span", h).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"), b.p.gridstate = "hidden", a("#gbox_" + a.jgrid.jqID(b.p.id)).hasClass("ui-resizable") && a(".ui-resizable-handle", "#gbox_" + a.jgrid.jqID(b.p.id)).hide(), a(b).triggerHandler("jqGridHeaderClick", [b.p.gridstate, c]), e && (X || b.p.onHeaderClick.call(b, b.p.gridstate, c)));
                  }) : "hidden" === b.p.gridstate && a(d, "#gbox_" + a.jgrid.jqID(b.p.id)).slideDown("fast", function() {
                    g--;
                    0 === g && (a("span", h).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"), X && (b.p.datatype = wa, L(), X = !1), b.p.gridstate = "visible", a("#gbox_" + a.jgrid.jqID(b.p.id)).hasClass("ui-resizable") && a(".ui-resizable-handle", "#gbox_" + a.jgrid.jqID(b.p.id)).show(), a(b).triggerHandler("jqGridHeaderClick", [b.p.gridstate, c]), e && (X || b.p.onHeaderClick.call(b, b.p.gridstate, c)));
                  });
                  return !1;
                }), X && (b.p.datatype = "local", a(".ui-jqgrid-titlebar-close", f.cDiv).trigger("click")));
              } else {
                a(f.cDiv).hide();
              }
              a(f.hDiv).after(f.bDiv).mousemove(function(a) {
                if (f.resizing) {
                  return f.dragMove(a), !1;
                }
              });
              a(".ui-jqgrid-labels", f.hDiv).bind("selectstart", function() {
                return !1;
              });
              a(document).bind("mouseup.jqGrid" + b.p.id, function() {
                return f.resizing ? (f.dragEnd(), !1) : !0;
              });
              b.formatCol = q;
              b.sortData = S;
              b.updatepager = function(c, e) {
                var d, f, g, h, k, l, m, q = "", n = b.p.pager ? "_" + a.jgrid.jqID(b.p.pager.substr(1)) : "", p = b.p.toppager ? "_" + b.p.toppager.substr(1) : "";
                g = parseInt(b.p.page, 10) - 1;
                0 > g && (g = 0);
                g *= parseInt(b.p.rowNum, 10);
                k = g + b.p.reccount;
                if (b.p.scroll) {
                  d = a("tbody:first > tr:gt(0)", b.grid.bDiv);
                  g = k - d.length;
                  b.p.reccount = d.length;
                  if (d = d.outerHeight() || b.grid.prevRowHeight) {
                    f = g * d, m = parseInt(b.p.records, 10) * d, a(">div:first", b.grid.bDiv).css({height:m}).children("div:first").css({height:f, display:f ? "" : "none"}), 0 == b.grid.bDiv.scrollTop && 1 < b.p.page && (b.grid.bDiv.scrollTop = b.p.rowNum * (b.p.page - 1) * d);
                  }
                  b.grid.bDiv.scrollLeft = b.grid.hDiv.scrollLeft;
                }
                q = b.p.pager || "";
                if (q += b.p.toppager ? q ? "," + b.p.toppager : b.p.toppager : "") {
                  m = a.jgrid.formatter.integer || {}, d = r(b.p.page), f = r(b.p.lastpage), a(".selbox", q)[this.p.useProp ? "prop" : "attr"]("disabled", !1), !0 === b.p.pginput && (a(".ui-pg-input", q).val(b.p.page), h = b.p.toppager ? "#sp_1" + n + ",#sp_1" + p : "#sp_1" + n, a(h).html(a.fmatter ? a.fmatter.util.NumberFormat(b.p.lastpage, m) : b.p.lastpage)), b.p.viewrecords && (0 === b.p.reccount ? a(".ui-paging-info", q).html(b.p.emptyrecords) : (h = g + 1, l = b.p.records, a.fmatter && (h = 
                  a.fmatter.util.NumberFormat(h, m), k = a.fmatter.util.NumberFormat(k, m), l = a.fmatter.util.NumberFormat(l, m)), a(".ui-paging-info", q).html(a.jgrid.format(b.p.recordtext, h, k, l)))), !0 === b.p.pgbuttons && (0 >= d && (d = f = 0), 1 === d || 0 === d ? (a("#first" + n + ", #prev" + n).addClass("ui-state-disabled").removeClass("ui-state-hover"), b.p.toppager && a("#first_t" + p + ", #prev_t" + p).addClass("ui-state-disabled").removeClass("ui-state-hover")) : (a("#first" + n + 
                  ", #prev" + n).removeClass("ui-state-disabled"), b.p.toppager && a("#first_t" + p + ", #prev_t" + p).removeClass("ui-state-disabled")), d === f || 0 === d ? (a("#next" + n + ", #last" + n).addClass("ui-state-disabled").removeClass("ui-state-hover"), b.p.toppager && a("#next_t" + p + ", #last_t" + p).addClass("ui-state-disabled").removeClass("ui-state-hover")) : (a("#next" + n + ", #last" + n).removeClass("ui-state-disabled"), b.p.toppager && a("#next_t" + p + ", #last_t" + p).removeClass("ui-state-disabled")))
                  ;
                }
                !0 === c && !0 === b.p.rownumbers && a(">td.jqgrid-rownum", b.rows).each(function(c) {
                  a(this).html(g + 1 + c);
                });
                e && b.p.jqgdnd && a(b).jqGrid("gridDnD", "updateDnD");
                a(b).triggerHandler("jqGridGridComplete");
                a.isFunction(b.p.gridComplete) && b.p.gridComplete.call(b);
                a(b).triggerHandler("jqGridAfterGridComplete");
              };
              b.refreshIndex = C;
              b.setHeadCheckBox = ha;
              b.constructTr = O;
              b.formatter = function(a, c, b, e, d) {
                return t(a, c, b, e, d);
              };
              a.extend(f, {populate:L, emptyRows:B, beginReq:z, endReq:P});
              this.grid = f;
              b.addXmlData = function(a) {
                D(a, b.grid.bDiv);
              };
              b.addJSONData = function(a) {
                K(a, b.grid.bDiv);
              };
              this.grid.cols = this.rows[0].cells;
              a(b).triggerHandler("jqGridInitGrid");
              a.isFunction(b.p.onInitGrid) && b.p.onInitGrid.call(b);
              L();
              b.p.hiddengrid = !1;
            }
          }
        }
      }
    });
  };
  a.jgrid.extend({getGridParam:function(a) {
    var f = this[0];
    if (f && f.grid) {
      return a ? void 0 !== f.p[a] ? f.p[a] : null : f.p;
    }
  }, setGridParam:function(d) {
    return this.each(function() {
      this.grid && "object" === typeof d && a.extend(!0, this.p, d);
    });
  }, getGridRowById:function(d) {
    var f;
    this.each(function() {
      try {
        for (var c = this.rows.length;c--;) {
          if (d.toString() === this.rows[c].id) {
            f = this.rows[c];
            break;
          }
        }
      } catch (e) {
        f = a(this.grid.bDiv).find("#" + a.jgrid.jqID(d));
      }
    });
    return f;
  }, getDataIDs:function() {
    var d = [], f = 0, c, e = 0;
    this.each(function() {
      if ((c = this.rows.length) && 0 < c) {
        for (;f < c;) {
          a(this.rows[f]).hasClass("jqgrow") && (d[e] = this.rows[f].id, e++), f++;
        }
      }
    });
    return d;
  }, setSelection:function(d, f, c) {
    return this.each(function() {
      var e, b, k, h, g, l;
      void 0 !== d && (f = !1 === f ? !1 : !0, !(b = a(this).jqGrid("getGridRowById", d)) || !b.className || -1 < b.className.indexOf("ui-state-disabled") || (!0 === this.p.scrollrows && (k = a(this).jqGrid("getGridRowById", d).rowIndex, 0 <= k && (e = a(this.grid.bDiv)[0].clientHeight, h = a(this.grid.bDiv)[0].scrollTop, g = a(this.rows[k]).position().top, k = this.rows[k].clientHeight, g + k >= e + h ? a(this.grid.bDiv)[0].scrollTop = g - (e + h) + k + h : g < e + h && g < h && (a(this.grid.bDiv)[0].scrollTop = 
      g))), !0 === this.p.frozenColumns && (l = this.p.id + "_frozen"), this.p.multiselect ? (this.setHeadCheckBox(!1), this.p.selrow = b.id, h = a.inArray(this.p.selrow, this.p.selarrrow), -1 === h ? ("ui-subgrid" !== b.className && a(b).addClass("ui-state-highlight").attr("aria-selected", "true"), e = !0, this.p.selarrrow.push(this.p.selrow)) : ("ui-subgrid" !== b.className && a(b).removeClass("ui-state-highlight").attr("aria-selected", "false"), e = !1, this.p.selarrrow.splice(h, 1), g = this.p.selarrrow[0], 
      this.p.selrow = void 0 === g ? null : g), a("#jqg_" + a.jgrid.jqID(this.p.id) + "_" + a.jgrid.jqID(b.id))[this.p.useProp ? "prop" : "attr"]("checked", e), l && (-1 === h ? a("#" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(l)).addClass("ui-state-highlight") : a("#" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(l)).removeClass("ui-state-highlight"), a("#jqg_" + a.jgrid.jqID(this.p.id) + "_" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(l))[this.p.useProp ? "prop" : "attr"]("checked", e)), f && (a(this).triggerHandler("jqGridSelectRow", 
      [b.id, e, c]), this.p.onSelectRow && this.p.onSelectRow.call(this, b.id, e, c))) : "ui-subgrid" !== b.className && (this.p.selrow !== b.id ? (a(a(this).jqGrid("getGridRowById", this.p.selrow)).removeClass("ui-state-highlight").attr({"aria-selected":"false", tabindex:"-1"}), a(b).addClass("ui-state-highlight").attr({"aria-selected":"true", tabindex:"0"}), l && (a("#" + a.jgrid.jqID(this.p.selrow), "#" + a.jgrid.jqID(l)).removeClass("ui-state-highlight"), a("#" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(l)).addClass("ui-state-highlight")), 
      e = !0) : e = !1, this.p.selrow = b.id, f && (a(this).triggerHandler("jqGridSelectRow", [b.id, e, c]), this.p.onSelectRow && this.p.onSelectRow.call(this, b.id, e, c)))));
    });
  }, resetSelection:function(d) {
    return this.each(function() {
      var f = this, c, e;
      !0 === f.p.frozenColumns && (e = f.p.id + "_frozen");
      if (void 0 !== d) {
        c = d === f.p.selrow ? f.p.selrow : d;
        a("#" + a.jgrid.jqID(f.p.id) + " tbody:first tr#" + a.jgrid.jqID(c)).removeClass("ui-state-highlight").attr("aria-selected", "false");
        e && a("#" + a.jgrid.jqID(c), "#" + a.jgrid.jqID(e)).removeClass("ui-state-highlight");
        if (f.p.multiselect) {
          a("#jqg_" + a.jgrid.jqID(f.p.id) + "_" + a.jgrid.jqID(c), "#" + a.jgrid.jqID(f.p.id))[f.p.useProp ? "prop" : "attr"]("checked", !1);
          if (e) {
            a("#jqg_" + a.jgrid.jqID(f.p.id) + "_" + a.jgrid.jqID(c), "#" + a.jgrid.jqID(e))[f.p.useProp ? "prop" : "attr"]("checked", !1);
          }
          f.setHeadCheckBox(!1);
        }
        c = null;
      } else {
        f.p.multiselect ? (a(f.p.selarrrow).each(function(c, d) {
          a(a(f).jqGrid("getGridRowById", d)).removeClass("ui-state-highlight").attr("aria-selected", "false");
          a("#jqg_" + a.jgrid.jqID(f.p.id) + "_" + a.jgrid.jqID(d))[f.p.useProp ? "prop" : "attr"]("checked", !1);
          e && (a("#" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(e)).removeClass("ui-state-highlight"), a("#jqg_" + a.jgrid.jqID(f.p.id) + "_" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(e))[f.p.useProp ? "prop" : "attr"]("checked", !1));
        }), f.setHeadCheckBox(!1), f.p.selarrrow = [], f.p.selrow = null) : f.p.selrow && (a("#" + a.jgrid.jqID(f.p.id) + " tbody:first tr#" + a.jgrid.jqID(f.p.selrow)).removeClass("ui-state-highlight").attr("aria-selected", "false"), e && a("#" + a.jgrid.jqID(f.p.selrow), "#" + a.jgrid.jqID(e)).removeClass("ui-state-highlight"), f.p.selrow = null);
      }
      !0 === f.p.cellEdit && 0 <= parseInt(f.p.iCol, 10) && 0 <= parseInt(f.p.iRow, 10) && (a("td:eq(" + f.p.iCol + ")", f.rows[f.p.iRow]).removeClass("edit-cell ui-state-highlight"), a(f.rows[f.p.iRow]).removeClass("selected-row ui-state-hover"));
      f.p.savedRow = [];
    });
  }, getRowData:function(d) {
    var f = {}, c, e = !1, b, k = 0;
    this.each(function() {
      var h = this, g, l;
      if (void 0 === d) {
        e = !0, c = [], b = h.rows.length;
      } else {
        l = a(h).jqGrid("getGridRowById", d);
        if (!l) {
          return f;
        }
        b = 2;
      }
      for (;k < b;) {
        e && (l = h.rows[k]), a(l).hasClass("jqgrow") && (a('td[role="gridcell"]', l).each(function(c) {
          g = h.p.colModel[c].name;
          if ("cb" !== g && "subgrid" !== g && "rn" !== g) {
            if (!0 === h.p.treeGrid && g === h.p.ExpandColumn) {
              f[g] = a.jgrid.htmlDecode(a("span:first", this).html());
            } else {
              try {
                f[g] = a.unformat.call(h, this, {rowId:l.id, colModel:h.p.colModel[c]}, c);
              } catch (b) {
                f[g] = a.jgrid.htmlDecode(a(this).html());
              }
            }
          }
        }), e && (c.push(f), f = {})), k++;
      }
    });
    return c || f;
  }, delRowData:function(d) {
    var f = !1, c, e;
    this.each(function() {
      c = a(this).jqGrid("getGridRowById", d);
      if (!c) {
        return !1;
      }
      a(c).remove();
      this.p.records--;
      this.p.reccount--;
      this.updatepager(!0, !1);
      f = !0;
      this.p.multiselect && (e = a.inArray(d, this.p.selarrrow), -1 !== e && this.p.selarrrow.splice(e, 1));
      this.p.selrow = this.p.multiselect && 0 < this.p.selarrrow.length ? this.p.selarrrow[this.p.selarrrow.length - 1] : null;
      if ("local" === this.p.datatype) {
        var b = a.jgrid.stripPref(this.p.idPrefix, d), b = this.p._index[b];
        void 0 !== b && (this.p.data.splice(b, 1), this.refreshIndex());
      }
      if (!0 === this.p.altRows && f) {
        var k = this.p.altclass;
        a(this.rows).each(function(c) {
          1 === c % 2 ? a(this).addClass(k) : a(this).removeClass(k);
        });
      }
    });
    return f;
  }, setRowData:function(d, f, c) {
    var e, b = !0, k;
    this.each(function() {
      if (!this.grid) {
        return !1;
      }
      var h = this, g, l, m = typeof c, n = {};
      l = a(this).jqGrid("getGridRowById", d);
      if (!l) {
        return !1;
      }
      if (f) {
        try {
          if (a(this.p.colModel).each(function(c) {
            e = this.name;
            var b = a.jgrid.getAccessor(f, e);
            void 0 !== b && (n[e] = this.formatter && "string" === typeof this.formatter && "date" === this.formatter ? a.unformat.date.call(h, b, this) : b, g = h.formatter(d, b, c, f, "edit"), k = this.title ? {title:a.jgrid.stripHtml(g)} : {}, !0 === h.p.treeGrid && e === h.p.ExpandColumn ? a("td[role='gridcell']:eq(" + c + ") > span:first", l).html(g).attr(k) : a("td[role='gridcell']:eq(" + c + ")", l).html(g).attr(k));
          }), "local" === h.p.datatype) {
            var r = a.jgrid.stripPref(h.p.idPrefix, d), q = h.p._index[r], p;
            if (h.p.treeGrid) {
              for (p in h.p.treeReader) {
                h.p.treeReader.hasOwnProperty(p) && delete n[h.p.treeReader[p]];
              }
            }
            void 0 !== q && (h.p.data[q] = a.extend(!0, h.p.data[q], n));
            n = null;
          }
        } catch (t) {
          b = !1;
        }
      }
      b && ("string" === m ? a(l).addClass(c) : null !== c && "object" === m && a(l).css(c), a(h).triggerHandler("jqGridAfterGridComplete"));
    });
    return b;
  }, addRowData:function(d, f, c, e) {
    c || (c = "last");
    var b = !1, k, h, g, l, m, n, r, q, p = "", t, v, u, w, y, x;
    f && (a.isArray(f) ? (t = !0, c = "last", v = d) : (f = [f], t = !1), this.each(function() {
      var B = f.length;
      m = !0 === this.p.rownumbers ? 1 : 0;
      g = !0 === this.p.multiselect ? 1 : 0;
      l = !0 === this.p.subGrid ? 1 : 0;
      t || (void 0 !== d ? d = String(d) : (d = a.jgrid.randId(), !1 !== this.p.keyIndex && (v = this.p.colModel[this.p.keyIndex + g + l + m].name, void 0 !== f[0][v] && (d = f[0][v]))));
      u = this.p.altclass;
      for (var C = 0, O = "", D = {}, K = a.isFunction(this.p.afterInsertRow) ? !0 : !1;C < B;) {
        w = f[C];
        h = [];
        if (t) {
          try {
            d = w[v], void 0 === d && (d = a.jgrid.randId());
          } catch (H) {
            d = a.jgrid.randId();
          }
          O = !0 === this.p.altRows ? 0 === (this.rows.length - 1) % 2 ? u : "" : "";
        }
        x = d;
        d = this.p.idPrefix + d;
        m && (p = this.formatCol(0, 1, "", null, d, !0), h[h.length] = '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + p + ">0</td>");
        g && (q = '<input role="checkbox" type="checkbox" id="jqg_' + this.p.id + "_" + d + '" class="cbox"/>', p = this.formatCol(m, 1, "", null, d, !0), h[h.length] = '<td role="gridcell" ' + p + ">" + q + "</td>");
        l && (h[h.length] = a(this).jqGrid("addSubGridCell", g + m, 1));
        for (r = g + l + m;r < this.p.colModel.length;r++) {
          y = this.p.colModel[r], k = y.name, D[k] = w[k], q = this.formatter(d, a.jgrid.getAccessor(w, k), r, w), p = this.formatCol(r, 1, q, w, d, D), h[h.length] = '<td role="gridcell" ' + p + ">" + q + "</td>";
        }
        h.unshift(this.constructTr(d, !1, O, D, w, !1));
        h[h.length] = "</tr>";
        if (0 === this.rows.length) {
          a("table:first", this.grid.bDiv).append(h.join(""));
        } else {
          switch(c) {
            case "last":
              a(this.rows[this.rows.length - 1]).after(h.join(""));
              n = this.rows.length - 1;
              break;
            case "first":
              a(this.rows[0]).after(h.join(""));
              n = 1;
              break;
            case "after":
              if (n = a(this).jqGrid("getGridRowById", e)) {
                a(this.rows[n.rowIndex + 1]).hasClass("ui-subgrid") ? a(this.rows[n.rowIndex + 1]).after(h) : a(n).after(h.join("")), n = n.rowIndex + 1;
              }
              break;
            case "before":
              if (n = a(this).jqGrid("getGridRowById", e)) {
                a(n).before(h.join("")), n = n.rowIndex - 1;
              }
            ;
          }
        }
        !0 === this.p.subGrid && a(this).jqGrid("addSubGrid", g + m, n);
        this.p.records++;
        this.p.reccount++;
        a(this).triggerHandler("jqGridAfterInsertRow", [d, w, w]);
        K && this.p.afterInsertRow.call(this, d, w, w);
        C++;
        "local" === this.p.datatype && (D[this.p.localReader.id] = x, this.p._index[x] = this.p.data.length, this.p.data.push(D), D = {});
      }
      !0 !== this.p.altRows || t || ("last" === c ? 1 === (this.rows.length - 1) % 2 && a(this.rows[this.rows.length - 1]).addClass(u) : a(this.rows).each(function(c) {
        1 === c % 2 ? a(this).addClass(u) : a(this).removeClass(u);
      }));
      this.updatepager(!0, !0);
      b = !0;
    }));
    return b;
  }, footerData:function(d, f, c) {
    function e(a) {
      for (var c in a) {
        if (a.hasOwnProperty(c)) {
          return !1;
        }
      }
      return !0;
    }
    var b, k = !1, h = {}, g;
    void 0 == d && (d = "get");
    "boolean" !== typeof c && (c = !0);
    d = d.toLowerCase();
    this.each(function() {
      var l = this, m;
      if (!l.grid || !l.p.footerrow || "set" === d && e(f)) {
        return !1;
      }
      k = !0;
      a(this.p.colModel).each(function(e) {
        b = this.name;
        "set" === d ? void 0 !== f[b] && (m = c ? l.formatter("", f[b], e, f, "edit") : f[b], g = this.title ? {title:a.jgrid.stripHtml(m)} : {}, a("tr.footrow td:eq(" + e + ")", l.grid.sDiv).html(m).attr(g), k = !0) : "get" === d && (h[b] = a("tr.footrow td:eq(" + e + ")", l.grid.sDiv).html());
      });
    });
    return "get" === d ? h : k;
  }, showHideCol:function(d, f) {
    return this.each(function() {
      var c = this, e = !1, b = a.jgrid.cell_width ? 0 : c.p.cellLayout, k;
      if (c.grid) {
        "string" === typeof d && (d = [d]);
        f = "none" !== f ? "" : "none";
        var h = "" === f ? !0 : !1, g = c.p.groupHeader && ("object" === typeof c.p.groupHeader || a.isFunction(c.p.groupHeader));
        g && a(c).jqGrid("destroyGroupHeader", !1);
        a(this.p.colModel).each(function(g) {
          if (-1 !== a.inArray(this.name, d) && this.hidden === h) {
            if (!0 === c.p.frozenColumns && !0 === this.frozen) {
              return !0;
            }
            a("tr[role=rowheader]", c.grid.hDiv).each(function() {
              a(this.cells[g]).css("display", f);
            });
            a(c.rows).each(function() {
              a(this).hasClass("jqgroup") || a(this.cells[g]).css("display", f);
            });
            c.p.footerrow && a("tr.footrow td:eq(" + g + ")", c.grid.sDiv).css("display", f);
            k = parseInt(this.width, 10);
            c.p.tblwidth = "none" === f ? c.p.tblwidth - (k + b) : c.p.tblwidth + (k + b);
            this.hidden = !h;
            e = !0;
            a(c).triggerHandler("jqGridShowHideCol", [h, this.name, g]);
          }
        });
        !0 === e && (!0 !== c.p.shrinkToFit || isNaN(c.p.height) || (c.p.tblwidth += parseInt(c.p.scrollOffset, 10)), a(c).jqGrid("setGridWidth", !0 === c.p.shrinkToFit ? c.p.tblwidth : c.p.width));
        g && a(c).jqGrid("setGroupHeaders", c.p.groupHeader);
      }
    });
  }, hideCol:function(d) {
    return this.each(function() {
      a(this).jqGrid("showHideCol", d, "none");
    });
  }, showCol:function(d) {
    return this.each(function() {
      a(this).jqGrid("showHideCol", d, "");
    });
  }, remapColumns:function(d, f, c) {
    function e(c) {
      var b;
      b = c.length ? a.makeArray(c) : a.extend({}, c);
      a.each(d, function(a) {
        c[a] = b[this];
      });
    }
    function b(c, b) {
      a(">tr" + (b || ""), c).each(function() {
        var c = this, b = a.makeArray(c.cells);
        a.each(d, function() {
          var a = b[this];
          a && c.appendChild(a);
        });
      });
    }
    var k = this.get(0);
    e(k.p.colModel);
    e(k.p.colNames);
    e(k.grid.headers);
    b(a("thead:first", k.grid.hDiv), c && ":not(.ui-jqgrid-labels)");
    f && b(a("#" + a.jgrid.jqID(k.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
    k.p.footerrow && b(a("tbody:first", k.grid.sDiv));
    k.p.remapColumns && (k.p.remapColumns.length ? e(k.p.remapColumns) : k.p.remapColumns = a.makeArray(d));
    k.p.lastsort = a.inArray(k.p.lastsort, d);
    k.p.treeGrid && (k.p.expColInd = a.inArray(k.p.expColInd, d));
    a(k).triggerHandler("jqGridRemapColumns", [d, f, c]);
  }, setGridWidth:function(d, f) {
    return this.each(function() {
      if (this.grid) {
        var c = this, e, b = 0, k = a.jgrid.cell_width ? 0 : c.p.cellLayout, h, g = 0, l = !1, m = c.p.scrollOffset, n, r = 0, q;
        "boolean" !== typeof f && (f = c.p.shrinkToFit);
        if (!isNaN(d)) {
          d = parseInt(d, 10);
          c.grid.width = c.p.width = d;
          a("#gbox_" + a.jgrid.jqID(c.p.id)).css("width", d + "px");
          a("#gview_" + a.jgrid.jqID(c.p.id)).css("width", d + "px");
          a(c.grid.bDiv).css("width", d + "px");
          a(c.grid.hDiv).css("width", d + "px");
          c.p.pager && a(c.p.pager).css("width", d + "px");
          c.p.toppager && a(c.p.toppager).css("width", d + "px");
          !0 === c.p.toolbar[0] && (a(c.grid.uDiv).css("width", d + "px"), "both" === c.p.toolbar[1] && a(c.grid.ubDiv).css("width", d + "px"));
          c.p.footerrow && a(c.grid.sDiv).css("width", d + "px");
          !1 === f && !0 === c.p.forceFit && (c.p.forceFit = !1);
          if (!0 === f) {
            a.each(c.p.colModel, function() {
              !1 === this.hidden && (e = this.widthOrg, b += e + k, this.fixed ? r += e + k : g++);
            });
            if (0 === g) {
              return;
            }
            c.p.tblwidth = b;
            n = d - k * g - r;
            !isNaN(c.p.height) && (a(c.grid.bDiv)[0].clientHeight < a(c.grid.bDiv)[0].scrollHeight || 1 === c.rows.length) && (l = !0, n -= m);
            var b = 0, p = 0 < c.grid.cols.length;
            a.each(c.p.colModel, function(a) {
              !1 !== this.hidden || this.fixed || (e = this.widthOrg, e = Math.round(n * e / (c.p.tblwidth - k * g - r)), 0 > e || (this.width = e, b += e, c.grid.headers[a].width = e, c.grid.headers[a].el.style.width = e + "px", c.p.footerrow && (c.grid.footers[a].style.width = e + "px"), p && (c.grid.cols[a].style.width = e + "px"), h = a));
            });
            if (!h) {
              return;
            }
            q = 0;
            l ? d - r - (b + k * g) !== m && (q = d - r - (b + k * g) - m) : 1 !== Math.abs(d - r - (b + k * g)) && (q = d - r - (b + k * g));
            c.p.colModel[h].width += q;
            c.p.tblwidth = b + q + k * g + r;
            c.p.tblwidth > d ? (l = c.p.tblwidth - parseInt(d, 10), c.p.tblwidth = d, e = c.p.colModel[h].width -= l) : e = c.p.colModel[h].width;
            c.grid.headers[h].width = e;
            c.grid.headers[h].el.style.width = e + "px";
            p && (c.grid.cols[h].style.width = e + "px");
            c.p.footerrow && (c.grid.footers[h].style.width = e + "px");
          }
          c.p.tblwidth && (a("table:first", c.grid.bDiv).css("width", c.p.tblwidth + "px"), a("table:first", c.grid.hDiv).css("width", c.p.tblwidth + "px"), c.grid.hDiv.scrollLeft = c.grid.bDiv.scrollLeft, c.p.footerrow && a("table:first", c.grid.sDiv).css("width", c.p.tblwidth + "px"));
        }
      }
    });
  }, setGridHeight:function(d) {
    return this.each(function() {
      if (this.grid) {
        var f = a(this.grid.bDiv);
        f.css({height:d + (isNaN(d) ? "" : "px")});
        !0 === this.p.frozenColumns && a("#" + a.jgrid.jqID(this.p.id) + "_frozen").parent().height(f.height() - 16);
        this.p.height = d;
        this.p.scroll && this.grid.populateVisible();
      }
    });
  }, setCaption:function(d) {
    return this.each(function() {
      this.p.caption = d;
      a("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl", this.grid.cDiv).html(d);
      a(this.grid.cDiv).show();
    });
  }, setLabel:function(d, f, c, e) {
    return this.each(function() {
      var b = -1;
      if (this.grid && void 0 !== d && (a(this.p.colModel).each(function(a) {
        if (this.name === d) {
          return b = a, !1;
        }
      }), 0 <= b)) {
        var k = a("tr.ui-jqgrid-labels th:eq(" + b + ")", this.grid.hDiv);
        if (f) {
          var h = a(".s-ico", k);
          a("[id^=jqgh_]", k).empty().html(f).append(h);
          this.p.colNames[b] = f;
        }
        c && ("string" === typeof c ? a(k).addClass(c) : a(k).css(c));
        "object" === typeof e && a(k).attr(e);
      }
    });
  }, setCell:function(d, f, c, e, b, k) {
    return this.each(function() {
      var h = -1, g, l;
      if (this.grid && (isNaN(f) ? a(this.p.colModel).each(function(a) {
        if (this.name === f) {
          return h = a, !1;
        }
      }) : h = parseInt(f, 10), 0 <= h && (g = a(this).jqGrid("getGridRowById", d)))) {
        var m = a("td:eq(" + h + ")", g);
        if ("" !== c || !0 === k) {
          g = this.formatter(d, c, h, g, "edit"), l = this.p.colModel[h].title ? {title:a.jgrid.stripHtml(g)} : {}, this.p.treeGrid && 0 < a(".tree-wrap", a(m)).length ? a("span", a(m)).html(g).attr(l) : a(m).html(g).attr(l), "local" === this.p.datatype && (g = this.p.colModel[h], c = g.formatter && "string" === typeof g.formatter && "date" === g.formatter ? a.unformat.date.call(this, c, g) : c, l = this.p._index[a.jgrid.stripPref(this.p.idPrefix, d)], void 0 !== l && (this.p.data[l][g.name] = c))
          ;
        }
        "string" === typeof e ? a(m).addClass(e) : e && a(m).css(e);
        "object" === typeof b && a(m).attr(b);
      }
    });
  }, getCell:function(d, f) {
    var c = !1;
    this.each(function() {
      var e = -1;
      if (this.grid && (isNaN(f) ? a(this.p.colModel).each(function(a) {
        if (this.name === f) {
          return e = a, !1;
        }
      }) : e = parseInt(f, 10), 0 <= e)) {
        var b = a(this).jqGrid("getGridRowById", d);
        if (b) {
          try {
            c = a.unformat.call(this, a("td:eq(" + e + ")", b), {rowId:b.id, colModel:this.p.colModel[e]}, e);
          } catch (k) {
            c = a.jgrid.htmlDecode(a("td:eq(" + e + ")", b).html());
          }
        }
      }
    });
    return c;
  }, getCol:function(d, f, c) {
    var e = [], b, k = 0, h, g, l;
    f = "boolean" !== typeof f ? !1 : f;
    void 0 === c && (c = !1);
    this.each(function() {
      var m = -1;
      if (this.grid && (isNaN(d) ? a(this.p.colModel).each(function(a) {
        if (this.name === d) {
          return m = a, !1;
        }
      }) : m = parseInt(d, 10), 0 <= m)) {
        var n = this.rows.length, r = 0, q = 0;
        if (n && 0 < n) {
          for (;r < n;) {
            if (a(this.rows[r]).hasClass("jqgrow")) {
              try {
                b = a.unformat.call(this, a(this.rows[r].cells[m]), {rowId:this.rows[r].id, colModel:this.p.colModel[m]}, m);
              } catch (p) {
                b = a.jgrid.htmlDecode(this.rows[r].cells[m].innerHTML);
              }
              c ? (l = parseFloat(b), isNaN(l) || (k += l, void 0 === g && (g = h = l), h = Math.min(h, l), g = Math.max(g, l), q++)) : f ? e.push({id:this.rows[r].id, value:b}) : e.push(b);
            }
            r++;
          }
          if (c) {
            switch(c.toLowerCase()) {
              case "sum":
                e = k;
                break;
              case "avg":
                e = k / q;
                break;
              case "count":
                e = n - 1;
                break;
              case "min":
                e = h;
                break;
              case "max":
                e = g;
            }
          }
        }
      }
    });
    return e;
  }, clearGridData:function(d) {
    return this.each(function() {
      if (this.grid) {
        "boolean" !== typeof d && (d = !1);
        if (this.p.deepempty) {
          a("#" + a.jgrid.jqID(this.p.id) + " tbody:first tr:gt(0)").remove();
        } else {
          var f = a("#" + a.jgrid.jqID(this.p.id) + " tbody:first tr:first")[0];
          a("#" + a.jgrid.jqID(this.p.id) + " tbody:first").empty().append(f);
        }
        this.p.footerrow && d && a(".ui-jqgrid-ftable td", this.grid.sDiv).html("&#160;");
        this.p.selrow = null;
        this.p.selarrrow = [];
        this.p.savedRow = [];
        this.p.records = 0;
        this.p.page = 1;
        this.p.lastpage = 0;
        this.p.reccount = 0;
        this.p.data = [];
        this.p._index = {};
        this.updatepager(!0, !1);
      }
    });
  }, getInd:function(d, f) {
    var c = !1, e;
    this.each(function() {
      (e = a(this).jqGrid("getGridRowById", d)) && (c = !0 === f ? e : e.rowIndex);
    });
    return c;
  }, bindKeys:function(d) {
    var f = a.extend({onEnter:null, onSpace:null, onLeftKey:null, onRightKey:null, scrollingRows:!0}, d || {});
    return this.each(function() {
      var c = this;
      a("body").is("[role]") || a("body").attr("role", "application");
      c.p.scrollrows = f.scrollingRows;
      a(c).keydown(function(e) {
        var b = a(c).find("tr[tabindex=0]")[0], d, h, g, l = c.p.treeReader.expanded_field;
        if (b) {
          if (g = c.p._index[a.jgrid.stripPref(c.p.idPrefix, b.id)], 37 === e.keyCode || 38 === e.keyCode || 39 === e.keyCode || 40 === e.keyCode) {
            if (38 === e.keyCode) {
              h = b.previousSibling;
              d = "";
              if (h) {
                if (a(h).is(":hidden")) {
                  for (;h;) {
                    if (h = h.previousSibling, !a(h).is(":hidden") && a(h).hasClass("jqgrow")) {
                      d = h.id;
                      break;
                    }
                  }
                } else {
                  d = h.id;
                }
              }
              a(c).jqGrid("setSelection", d, !0, e);
              e.preventDefault();
            }
            if (40 === e.keyCode) {
              h = b.nextSibling;
              d = "";
              if (h) {
                if (a(h).is(":hidden")) {
                  for (;h;) {
                    if (h = h.nextSibling, !a(h).is(":hidden") && a(h).hasClass("jqgrow")) {
                      d = h.id;
                      break;
                    }
                  }
                } else {
                  d = h.id;
                }
              }
              a(c).jqGrid("setSelection", d, !0, e);
              e.preventDefault();
            }
            37 === e.keyCode && (c.p.treeGrid && c.p.data[g][l] && a(b).find("div.treeclick").trigger("click"), a(c).triggerHandler("jqGridKeyLeft", [c.p.selrow]), a.isFunction(f.onLeftKey) && f.onLeftKey.call(c, c.p.selrow));
            39 === e.keyCode && (c.p.treeGrid && !c.p.data[g][l] && a(b).find("div.treeclick").trigger("click"), a(c).triggerHandler("jqGridKeyRight", [c.p.selrow]), a.isFunction(f.onRightKey) && f.onRightKey.call(c, c.p.selrow));
          } else {
            13 === e.keyCode ? (a(c).triggerHandler("jqGridKeyEnter", [c.p.selrow]), a.isFunction(f.onEnter) && f.onEnter.call(c, c.p.selrow)) : 32 === e.keyCode && (a(c).triggerHandler("jqGridKeySpace", [c.p.selrow]), a.isFunction(f.onSpace) && f.onSpace.call(c, c.p.selrow));
          }
        }
      });
    });
  }, unbindKeys:function() {
    return this.each(function() {
      a(this).unbind("keydown");
    });
  }, getLocalRow:function(d) {
    var f = !1, c;
    this.each(function() {
      void 0 !== d && (c = this.p._index[a.jgrid.stripPref(this.p.idPrefix, d)], 0 <= c && (f = this.p.data[c]));
    });
    return f;
  }});
})(jQuery);
(function(a) {
  a.jgrid.extend({getColProp:function(a) {
    var f = {}, c = this[0];
    if (!c.grid) {
      return !1;
    }
    var c = c.p.colModel, e;
    for (e = 0;e < c.length;e++) {
      if (c[e].name === a) {
        f = c[e];
        break;
      }
    }
    return f;
  }, setColProp:function(d, f) {
    return this.each(function() {
      if (this.grid && f) {
        var c = this.p.colModel, e;
        for (e = 0;e < c.length;e++) {
          if (c[e].name === d) {
            a.extend(!0, this.p.colModel[e], f);
            break;
          }
        }
      }
    });
  }, sortGrid:function(a, f, c) {
    return this.each(function() {
      var e = -1, b, k = !1;
      if (this.grid) {
        a || (a = this.p.sortname);
        for (b = 0;b < this.p.colModel.length;b++) {
          if (this.p.colModel[b].index === a || this.p.colModel[b].name === a) {
            e = b;
            !0 === this.p.frozenColumns && !0 === this.p.colModel[b].frozen && (k = this.grid.fhDiv.find("#" + this.p.id + "_" + a));
            break;
          }
        }
        -1 !== e && (b = this.p.colModel[e].sortable, k || (k = this.grid.headers[e].el), "boolean" !== typeof b && (b = !0), "boolean" !== typeof f && (f = !1), b && this.sortData("jqgh_" + this.p.id + "_" + a, e, f, c, k));
      }
    });
  }, clearBeforeUnload:function() {
    return this.each(function() {
      var d = this.grid;
      a.isFunction(d.emptyRows) && d.emptyRows.call(this, !0, !0);
      a(document).unbind("mouseup.jqGrid" + this.p.id);
      a(d.hDiv).unbind("mousemove");
      a(this).unbind();
      d.dragEnd = null;
      d.dragMove = null;
      d.dragStart = null;
      d.emptyRows = null;
      d.populate = null;
      d.populateVisible = null;
      d.scrollGrid = null;
      d.selectionPreserver = null;
      d.bDiv = null;
      d.cDiv = null;
      d.hDiv = null;
      d.cols = null;
      var f, c = d.headers.length;
      for (f = 0;f < c;f++) {
        d.headers[f].el = null;
      }
      this.grid = this.addJSONData = this.addXmlData = this.formatter = this.constructTr = this.setHeadCheckBox = this.refreshIndex = this.updatepager = this.sortData = this.formatCol = null;
    });
  }, GridDestroy:function() {
    return this.each(function() {
      if (this.grid) {
        this.p.pager && a(this.p.pager).remove();
        try {
          a(this).jqGrid("clearBeforeUnload"), a("#gbox_" + a.jgrid.jqID(this.id)).remove();
        } catch (d) {
        }
      }
    });
  }, GridUnload:function() {
    return this.each(function() {
      if (this.grid) {
        var d = a(this).attr("id"), f = a(this).attr("class");
        this.p.pager && a(this.p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
        var c = document.createElement("table");
        a(c).attr({id:d});
        c.className = f;
        d = a.jgrid.jqID(this.id);
        a(c).removeClass("ui-jqgrid-btable");
        1 === a(this.p.pager).parents("#gbox_" + d).length ? (a(c).insertBefore("#gbox_" + d).show(), a(this.p.pager).insertBefore("#gbox_" + d)) : a(c).insertBefore("#gbox_" + d).show();
        a(this).jqGrid("clearBeforeUnload");
        a("#gbox_" + d).remove();
      }
    });
  }, setGridState:function(d) {
    return this.each(function() {
      this.grid && ("hidden" === d ? (a(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + a.jgrid.jqID(this.p.id)).slideUp("fast"), this.p.pager && a(this.p.pager).slideUp("fast"), this.p.toppager && a(this.p.toppager).slideUp("fast"), !0 === this.p.toolbar[0] && ("both" === this.p.toolbar[1] && a(this.grid.ubDiv).slideUp("fast"), a(this.grid.uDiv).slideUp("fast")), this.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + a.jgrid.jqID(this.p.id)).slideUp("fast"), a(".ui-jqgrid-titlebar-close span", this.grid.cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"), 
      this.p.gridstate = "hidden") : "visible" === d && (a(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + a.jgrid.jqID(this.p.id)).slideDown("fast"), this.p.pager && a(this.p.pager).slideDown("fast"), this.p.toppager && a(this.p.toppager).slideDown("fast"), !0 === this.p.toolbar[0] && ("both" === this.p.toolbar[1] && a(this.grid.ubDiv).slideDown("fast"), a(this.grid.uDiv).slideDown("fast")), this.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + a.jgrid.jqID(this.p.id)).slideDown("fast"), a(".ui-jqgrid-titlebar-close span", 
      this.grid.cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"), this.p.gridstate = "visible"));
    });
  }, filterToolbar:function(d) {
    d = a.extend({autosearch:!0, searchOnEnter:!0, beforeSearch:null, afterSearch:null, beforeClear:null, afterClear:null, searchurl:"", stringResult:!1, groupOp:"AND", defaultSearch:"bw", searchOperators:!1, resetIcon:"x", operands:{eq:"==", ne:"!", lt:"<", le:"<=", gt:">", ge:">=", bw:"^", bn:"!^", "in":"=", ni:"!=", ew:"|", en:"!@", cn:"~", nc:"!~", nu:"#", nn:"!#"}}, a.jgrid.search, d || {});
    return this.each(function() {
      var f = this;
      if (!this.ftoolbar) {
        var c = function() {
          var c = {}, b = 0, e, k, n = {}, r;
          a.each(f.p.colModel, function() {
            var q = a("#gs_" + a.jgrid.jqID(this.name), !0 === this.frozen && !0 === f.p.frozenColumns ? f.grid.fhDiv : f.grid.hDiv);
            k = this.index || this.name;
            r = d.searchOperators ? q.parent().prev().children("a").attr("soper") || d.defaultSearch : this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq" : d.defaultSearch;
            if ((e = "custom" === this.stype && a.isFunction(this.searchoptions.custom_value) && 0 < q.length && "SPAN" === q[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(f, q.children(".customelement:first"), "get") : q.val()) || "nu" === r || "nn" === r) {
              c[k] = e, n[k] = r, b++;
            } else {
              try {
                delete f.p.postData[k];
              } catch (p) {
              }
            }
          });
          var q = 0 < b ? !0 : !1;
          if (!0 === d.stringResult || "local" === f.p.datatype) {
            var p = '{"groupOp":"' + d.groupOp + '","rules":[', t = 0;
            a.each(c, function(a, c) {
              0 < t && (p += ",");
              p += '{"field":"' + a + '",';
              p += '"op":"' + n[a] + '",';
              p += '"data":"' + (c + "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
              t++;
            });
            p += "]}";
            a.extend(f.p.postData, {filters:p});
            a.each(["searchField", "searchString", "searchOper"], function(a, c) {
              f.p.postData.hasOwnProperty(c) && delete f.p.postData[c];
            });
          } else {
            a.extend(f.p.postData, c);
          }
          var v;
          f.p.searchurl && (v = f.p.url, a(f).jqGrid("setGridParam", {url:f.p.searchurl}));
          var u = "stop" === a(f).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1;
          !u && a.isFunction(d.beforeSearch) && (u = d.beforeSearch.call(f));
          u || a(f).jqGrid("setGridParam", {search:q}).trigger("reloadGrid", [{page:1}]);
          v && a(f).jqGrid("setGridParam", {url:v});
          a(f).triggerHandler("jqGridToolbarAfterSearch");
          a.isFunction(d.afterSearch) && d.afterSearch.call(f);
        }, e = function(b, e, k) {
          a("#sopt_menu").remove();
          e = parseInt(e, 10);
          k = parseInt(k, 10) + 18;
          e = '<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:' + (a(".ui-jqgrid-view").css("font-size") || "11px") + ";left:" + e + "px;top:" + k + 'px;">';
          k = a(b).attr("soper");
          var m, n = [], r, q = 0, p = a(b).attr("colname");
          for (m = f.p.colModel.length;q < m && f.p.colModel[q].name !== p;) {
            q++;
          }
          q = f.p.colModel[q];
          p = a.extend({}, q.searchoptions);
          p.sopt || (p.sopt = [], p.sopt[0] = "select" === q.stype ? "eq" : d.defaultSearch);
          a.each(d.odata, function() {
            n.push(this.oper);
          });
          for (q = 0;q < p.sopt.length;q++) {
            r = a.inArray(p.sopt[q], n), -1 !== r && (m = k === d.odata[r].oper ? "ui-state-highlight" : "", e += '<li class="ui-menu-item ' + m + '" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' + d.odata[r].oper + '" oper="' + d.operands[d.odata[r].oper] + '"><table cellspacing="0" cellpadding="0" border="0"><tr><td width="25px">' + d.operands[d.odata[r].oper] + "</td><td>" + d.odata[r].text + "</td></tr></table></a></li>");
          }
          e += "</ul>";
          a("body").append(e);
          a("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
          a("#sopt_menu > li > a").hover(function() {
            a(this).addClass("ui-state-hover");
          }, function() {
            a(this).removeClass("ui-state-hover");
          }).click(function(e) {
            e = a(this).attr("value");
            var g = a(this).attr("oper");
            a(f).triggerHandler("jqGridToolbarSelectOper", [e, g, b]);
            a("#sopt_menu").hide();
            a(b).text(g).attr("soper", e);
            !0 === d.autosearch && (g = a(b).parent().next().children()[0], (a(g).val() || "nu" === e || "nn" === e) && c());
          });
        }, b = a("<tr class='ui-search-toolbar' role='rowheader'></tr>"), k;
        a.each(f.p.colModel, function(e) {
          var g = this, l, m;
          m = "";
          var n = "=", r, q = a("<th role='columnheader' class='ui-state-default ui-th-column ui-th-" + f.p.direction + "'></th>"), p = a("<div style='position:relative;height:100%;padding-right:0.3em;padding-left:0.3em;'></div>"), t = a("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear'></td></tr></table>");
          !0 === this.hidden && a(q).css("display", "none");
          this.search = !1 === this.search ? !1 : !0;
          void 0 === this.stype && (this.stype = "text");
          l = a.extend({}, this.searchoptions || {});
          if (this.search) {
            if (d.searchOperators) {
              m = l.sopt ? l.sopt[0] : "select" === g.stype ? "eq" : d.defaultSearch;
              for (r = 0;r < d.odata.length;r++) {
                if (d.odata[r].oper === m) {
                  n = d.operands[m] || "";
                  break;
                }
              }
              m = "<a title='" + (null != l.searchtitle ? l.searchtitle : d.operandTitle) + "' style='padding-right: 0.5em;' soper='" + m + "' class='soptclass' colname='" + this.name + "'>" + n + "</a>";
            }
            a("td:eq(0)", t).attr("colindex", e).append(m);
            void 0 === l.clearSearch && (l.clearSearch = !0);
            l.clearSearch ? (m = d.resetTitle || "Clear Search Value", a("td:eq(2)", t).append("<a title='" + m + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + d.resetIcon + "</a>")) : a("td:eq(2)", t).hide();
            switch(this.stype) {
              case "select":
                if (m = this.surl || l.dataUrl) {
                  a(p).append(t), a.ajax(a.extend({url:m, dataType:"html", success:function(b) {
                    void 0 !== l.buildSelect ? (b = l.buildSelect(b)) && a("td:eq(1)", t).append(b) : a("td:eq(1)", t).append(b);
                    void 0 !== l.defaultValue && a("select", p).val(l.defaultValue);
                    a("select", p).attr({name:g.index || g.name, id:"gs_" + g.name});
                    l.attr && a("select", p).attr(l.attr);
                    a("select", p).css({width:"100%"});
                    a.jgrid.bindEv.call(f, a("select", p)[0], l);
                    !0 === d.autosearch && a("select", p).change(function() {
                      c();
                      return !1;
                    });
                    b = null;
                  }}, a.jgrid.ajaxOptions, f.p.ajaxSelectOptions || {}));
                } else {
                  var v, u, w;
                  g.searchoptions ? (v = void 0 === g.searchoptions.value ? "" : g.searchoptions.value, u = void 0 === g.searchoptions.separator ? ":" : g.searchoptions.separator, w = void 0 === g.searchoptions.delimiter ? ";" : g.searchoptions.delimiter) : g.editoptions && (v = void 0 === g.editoptions.value ? "" : g.editoptions.value, u = void 0 === g.editoptions.separator ? ":" : g.editoptions.separator, w = void 0 === g.editoptions.delimiter ? ";" : g.editoptions.delimiter);
                  if (v) {
                    var y = document.createElement("select");
                    y.style.width = "100%";
                    a(y).attr({name:g.index || g.name, id:"gs_" + g.name});
                    var x;
                    if ("string" === typeof v) {
                      for (m = v.split(w), x = 0;x < m.length;x++) {
                        v = m[x].split(u), w = document.createElement("option"), w.value = v[0], w.innerHTML = v[1], y.appendChild(w);
                      }
                    } else {
                      if ("object" === typeof v) {
                        for (x in v) {
                          v.hasOwnProperty(x) && (w = document.createElement("option"), w.value = x, w.innerHTML = v[x], y.appendChild(w));
                        }
                      }
                    }
                    void 0 !== l.defaultValue && a(y).val(l.defaultValue);
                    l.attr && a(y).attr(l.attr);
                    a(p).append(t);
                    a.jgrid.bindEv.call(f, y, l);
                    a("td:eq(1)", t).append(y);
                    !0 === d.autosearch && a(y).change(function() {
                      c();
                      return !1;
                    });
                  }
                }
                break;
              case "text":
                u = void 0 !== l.defaultValue ? l.defaultValue : "";
                a("td:eq(1)", t).append("<input type='text' style='width:100%;padding:0px;' name='" + (g.index || g.name) + "' id='gs_" + g.name + "' value='" + u + "'/>");
                a(p).append(t);
                l.attr && a("input", p).attr(l.attr);
                a.jgrid.bindEv.call(f, a("input", p)[0], l);
                !0 === d.autosearch && (d.searchOnEnter ? a("input", p).keypress(function(a) {
                  return 13 === (a.charCode || a.keyCode || 0) ? (c(), !1) : this;
                }) : a("input", p).keydown(function(a) {
                  switch(a.which) {
                    case 13:
                      return !1;
                    case 9:
                    ;
                    case 16:
                    ;
                    case 37:
                    ;
                    case 38:
                    ;
                    case 39:
                    ;
                    case 40:
                    ;
                    case 27:
                      break;
                    default:
                      k && clearTimeout(k), k = setTimeout(function() {
                        c();
                      }, 500);
                  }
                }));
                break;
              case "custom":
                a("td:eq(1)", t).append("<span style='width:95%;padding:0px;' name='" + (g.index || g.name) + "' id='gs_" + g.name + "'/>");
                a(p).append(t);
                try {
                  if (a.isFunction(l.custom_element)) {
                    if (y = l.custom_element.call(f, void 0 !== l.defaultValue ? l.defaultValue : "", l)) {
                      y = a(y).addClass("customelement"), a(p).find(">span").append(y);
                    } else {
                      throw "e2";
                    }
                  } else {
                    throw "e1";
                  }
                } catch (B) {
                  "e1" === B && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === B ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, "string" === typeof B ? B : B.message, a.jgrid.edit.bClose);
                }
              ;
            }
          }
          a(q).append(p);
          a(b).append(q);
          d.searchOperators || a("td:eq(0)", t).hide();
        });
        a("table thead", f.grid.hDiv).append(b);
        d.searchOperators && (a(".soptclass", b).click(function(c) {
          var b = a(this).offset();
          e(this, b.left, b.top);
          c.stopPropagation();
        }), a("body").on("click", function(c) {
          "soptclass" !== c.target.className && a("#sopt_menu").hide();
        }));
        a(".clearsearchclass", b).click(function(b) {
          b = a(this).parents("tr:first");
          var e = parseInt(a("td.ui-search-oper", b).attr("colindex"), 10), k = a.extend({}, f.p.colModel[e].searchoptions || {}), k = k.defaultValue ? k.defaultValue : "";
          "select" === f.p.colModel[e].stype ? k ? a("td.ui-search-input select", b).val(k) : a("td.ui-search-input select", b)[0].selectedIndex = 0 : a("td.ui-search-input input", b).val(k);
          !0 === d.autosearch && c();
        });
        this.ftoolbar = !0;
        this.triggerToolbar = c;
        this.clearToolbar = function(c) {
          var b = {}, e = 0, k;
          c = "boolean" !== typeof c ? !0 : c;
          a.each(f.p.colModel, function() {
            var c, d = a("#gs_" + a.jgrid.jqID(this.name), !0 === this.frozen && !0 === f.p.frozenColumns ? f.grid.fhDiv : f.grid.hDiv);
            this.searchoptions && void 0 !== this.searchoptions.defaultValue && (c = this.searchoptions.defaultValue);
            k = this.index || this.name;
            switch(this.stype) {
              case "select":
                d.find("option").each(function(b) {
                  0 === b && (this.selected = !0);
                  if (a(this).val() === c) {
                    return this.selected = !0, !1;
                  }
                });
                if (void 0 !== c) {
                  b[k] = c, e++;
                } else {
                  try {
                    delete f.p.postData[k];
                  } catch (h) {
                  }
                }
                break;
              case "text":
                d.val(c || "");
                if (void 0 !== c) {
                  b[k] = c, e++;
                } else {
                  try {
                    delete f.p.postData[k];
                  } catch (q) {
                  }
                }
                break;
              case "custom":
                a.isFunction(this.searchoptions.custom_value) && 0 < d.length && "SPAN" === d[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(f, d.children(".customelement:first"), "set", c || "");
            }
          });
          var n = 0 < e ? !0 : !1;
          f.p.resetsearch = !0;
          if (!0 === d.stringResult || "local" === f.p.datatype) {
            var r = '{"groupOp":"' + d.groupOp + '","rules":[', q = 0;
            a.each(b, function(a, c) {
              0 < q && (r += ",");
              r += '{"field":"' + a + '",';
              r += '"op":"eq",';
              r += '"data":"' + (c + "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
              q++;
            });
            r += "]}";
            a.extend(f.p.postData, {filters:r});
            a.each(["searchField", "searchString", "searchOper"], function(a, c) {
              f.p.postData.hasOwnProperty(c) && delete f.p.postData[c];
            });
          } else {
            a.extend(f.p.postData, b);
          }
          var p;
          f.p.searchurl && (p = f.p.url, a(f).jqGrid("setGridParam", {url:f.p.searchurl}));
          var t = "stop" === a(f).triggerHandler("jqGridToolbarBeforeClear") ? !0 : !1;
          !t && a.isFunction(d.beforeClear) && (t = d.beforeClear.call(f));
          t || c && a(f).jqGrid("setGridParam", {search:n}).trigger("reloadGrid", [{page:1}]);
          p && a(f).jqGrid("setGridParam", {url:p});
          a(f).triggerHandler("jqGridToolbarAfterClear");
          a.isFunction(d.afterClear) && d.afterClear();
        };
        this.toggleToolbar = function() {
          var c = a("tr.ui-search-toolbar", f.grid.hDiv), b = !0 === f.p.frozenColumns ? a("tr.ui-search-toolbar", f.grid.fhDiv) : !1;
          "none" === c.css("display") ? (c.show(), b && b.show()) : (c.hide(), b && b.hide());
        };
      }
    });
  }, destroyFilterToolbar:function() {
    return this.each(function() {
      this.ftoolbar && (this.toggleToolbar = this.clearToolbar = this.triggerToolbar = null, this.ftoolbar = !1, a(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove());
    });
  }, destroyGroupHeader:function(d) {
    void 0 === d && (d = !0);
    return this.each(function() {
      var f, c, e, b, k, h;
      c = this.grid;
      var g = a("table.ui-jqgrid-htable thead", c.hDiv), l = this.p.colModel;
      if (c) {
        a(this).unbind(".setGroupHeaders");
        f = a("<tr>", {role:"rowheader"}).addClass("ui-jqgrid-labels");
        b = c.headers;
        c = 0;
        for (e = b.length;c < e;c++) {
          k = l[c].hidden ? "none" : "";
          k = a(b[c].el).width(b[c].width).css("display", k);
          try {
            k.removeAttr("rowSpan");
          } catch (m) {
            k.attr("rowSpan", 1);
          }
          f.append(k);
          h = k.children("span.ui-jqgrid-resize");
          0 < h.length && (h[0].style.height = "");
          k.children("div")[0].style.top = "";
        }
        a(g).children("tr.ui-jqgrid-labels").remove();
        a(g).prepend(f);
        !0 === d && a(this).jqGrid("setGridParam", {groupHeader:null});
      }
    });
  }, setGroupHeaders:function(d) {
    d = a.extend({useColSpanStyle:!1, groupHeaders:[]}, d || {});
    return this.each(function() {
      this.p.groupHeader = d;
      var f, c, e = 0, b, k, h, g, l, m = this.p.colModel, n = m.length, r = this.grid.headers, q = a("table.ui-jqgrid-htable", this.grid.hDiv), p = q.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header");
      b = q.children("thead");
      var t = q.find(".jqg-first-row-header");
      void 0 === t[0] ? t = a("<tr>", {role:"row", "aria-hidden":"true"}).addClass("jqg-first-row-header").css("height", "auto") : t.empty();
      var v, u = function(a, c) {
        var b = c.length, e;
        for (e = 0;e < b;e++) {
          if (c[e].startColumnName === a) {
            return e;
          }
        }
        return -1;
      };
      a(this).prepend(b);
      b = a("<tr>", {role:"rowheader"}).addClass("ui-jqgrid-labels jqg-third-row-header");
      for (f = 0;f < n;f++) {
        if (h = r[f].el, g = a(h), c = m[f], k = {height:"0px", width:r[f].width + "px", display:c.hidden ? "none" : ""}, a("<th>", {role:"gridcell"}).css(k).addClass("ui-first-th-" + this.p.direction).appendTo(t), h.style.width = "", k = u(c.name, d.groupHeaders), 0 <= k) {
          k = d.groupHeaders[k];
          e = k.numberOfColumns;
          l = k.titleText;
          for (k = c = 0;k < e && f + k < n;k++) {
            m[f + k].hidden || c++;
          }
          k = a("<th>").attr({role:"columnheader"}).addClass("ui-state-default ui-th-column-header ui-th-" + this.p.direction).css({height:"22px", "border-top":"0 none"}).html(l);
          0 < c && k.attr("colspan", String(c));
          this.p.headertitles && k.attr("title", k.text());
          0 === c && k.hide();
          g.before(k);
          b.append(h);
          --e;
        } else {
          0 === e ? d.useColSpanStyle ? g.attr("rowspan", "2") : (a("<th>", {role:"columnheader"}).addClass("ui-state-default ui-th-column-header ui-th-" + this.p.direction).css({display:c.hidden ? "none" : "", "border-top":"0 none"}).insertBefore(g), b.append(h)) : (b.append(h), e--);
        }
      }
      m = a(this).children("thead");
      m.prepend(t);
      b.insertAfter(p);
      q.append(m);
      d.useColSpanStyle && (q.find("span.ui-jqgrid-resize").each(function() {
        var c = a(this).parent();
        c.is(":visible") && (this.style.cssText = "height: " + c.height() + "px !important; cursor: col-resize;");
      }), q.find("div.ui-jqgrid-sortable").each(function() {
        var c = a(this), b = c.parent();
        b.is(":visible") && b.is(":has(span.ui-jqgrid-resize)") && c.css("top", (b.height() - c.outerHeight()) / 2 + "px");
      }));
      v = m.find("tr.jqg-first-row-header");
      a(this).bind("jqGridResizeStop.setGroupHeaders", function(a, c, b) {
        v.find("th").eq(b).width(c);
      });
    });
  }, setFrozenColumns:function() {
    return this.each(function() {
      if (this.grid) {
        var d = this, f = d.p.colModel, c = 0, e = f.length, b = -1, k = !1;
        if (!0 !== d.p.subGrid && !0 !== d.p.treeGrid && !0 !== d.p.cellEdit && !d.p.sortable && !d.p.scroll) {
          d.p.rownumbers && c++;
          for (d.p.multiselect && c++;c < e;) {
            if (!0 === f[c].frozen) {
              k = !0, b = c;
            } else {
              break;
            }
            c++;
          }
          if (0 <= b && k) {
            f = d.p.caption ? a(d.grid.cDiv).outerHeight() : 0;
            c = a(".ui-jqgrid-htable", "#gview_" + a.jgrid.jqID(d.p.id)).height();
            d.p.toppager && (f += a(d.grid.topDiv).outerHeight());
            !0 === d.p.toolbar[0] && "bottom" !== d.p.toolbar[1] && (f += a(d.grid.uDiv).outerHeight());
            d.grid.fhDiv = a('<div style="position:absolute;left:0px;top:' + f + "px;height:" + c + 'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>');
            d.grid.fbDiv = a('<div style="position:absolute;left:0px;top:' + (parseInt(f, 10) + parseInt(c, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');
            a("#gview_" + a.jgrid.jqID(d.p.id)).append(d.grid.fhDiv);
            f = a(".ui-jqgrid-htable", "#gview_" + a.jgrid.jqID(d.p.id)).clone(!0);
            if (d.p.groupHeader) {
              a("tr.jqg-first-row-header, tr.jqg-third-row-header", f).each(function() {
                a("th:gt(" + b + ")", this).remove();
              });
              var h = -1, g = -1, l, m;
              a("tr.jqg-second-row-header th", f).each(function() {
                l = parseInt(a(this).attr("colspan"), 10);
                if (m = parseInt(a(this).attr("rowspan"), 10)) {
                  h++, g++;
                }
                l && (h += l, g++);
                if (h === b) {
                  return !1;
                }
              });
              h !== b && (g = b);
              a("tr.jqg-second-row-header", f).each(function() {
                a("th:gt(" + g + ")", this).remove();
              });
            } else {
              a("tr", f).each(function() {
                a("th:gt(" + b + ")", this).remove();
              });
            }
            a(f).width(1);
            a(d.grid.fhDiv).append(f).mousemove(function(a) {
              if (d.grid.resizing) {
                return d.grid.dragMove(a), !1;
              }
            });
            a(d).bind("jqGridResizeStop.setFrozenColumns", function(c, b, e) {
              c = a(".ui-jqgrid-htable", d.grid.fhDiv);
              a("th:eq(" + e + ")", c).width(b);
              c = a(".ui-jqgrid-btable", d.grid.fbDiv);
              a("tr:first td:eq(" + e + ")", c).width(b);
            });
            a(d).bind("jqGridSortCol.setFrozenColumns", function(c, b, e) {
              c = a("tr.ui-jqgrid-labels:last th:eq(" + d.p.lastsort + ")", d.grid.fhDiv);
              b = a("tr.ui-jqgrid-labels:last th:eq(" + e + ")", d.grid.fhDiv);
              a("span.ui-grid-ico-sort", c).addClass("ui-state-disabled");
              a(c).attr("aria-selected", "false");
              a("span.ui-icon-" + d.p.sortorder, b).removeClass("ui-state-disabled");
              a(b).attr("aria-selected", "true");
              d.p.viewsortcols[0] || d.p.lastsort === e || (a("span.s-ico", c).hide(), a("span.s-ico", b).show());
            });
            a("#gview_" + a.jgrid.jqID(d.p.id)).append(d.grid.fbDiv);
            a(d.grid.bDiv).scroll(function() {
              a(d.grid.fbDiv).scrollTop(a(this).scrollTop());
            });
            !0 === d.p.hoverrows && a("#" + a.jgrid.jqID(d.p.id)).unbind("mouseover").unbind("mouseout");
            a(d).bind("jqGridAfterGridComplete.setFrozenColumns", function() {
              a("#" + a.jgrid.jqID(d.p.id) + "_frozen").remove();
              a(d.grid.fbDiv).height(a(d.grid.bDiv).height() - 16);
              var c = a("#" + a.jgrid.jqID(d.p.id)).clone(!0);
              a("tr[role=row]", c).each(function() {
                a("td[role=gridcell]:gt(" + b + ")", this).remove();
              });
              a(c).width(1).attr("id", d.p.id + "_frozen");
              a(d.grid.fbDiv).append(c);
              !0 === d.p.hoverrows && (a("tr.jqgrow", c).hover(function() {
                a(this).addClass("ui-state-hover");
                a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(d.p.id)).addClass("ui-state-hover");
              }, function() {
                a(this).removeClass("ui-state-hover");
                a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(d.p.id)).removeClass("ui-state-hover");
              }), a("tr.jqgrow", "#" + a.jgrid.jqID(d.p.id)).hover(function() {
                a(this).addClass("ui-state-hover");
                a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(d.p.id) + "_frozen").addClass("ui-state-hover");
              }, function() {
                a(this).removeClass("ui-state-hover");
                a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(d.p.id) + "_frozen").removeClass("ui-state-hover");
              }));
              c = null;
            });
            d.grid.hDiv.loading || a(d).triggerHandler("jqGridAfterGridComplete");
            d.p.frozenColumns = !0;
          }
        }
      }
    });
  }, destroyFrozenColumns:function() {
    return this.each(function() {
      if (this.grid && !0 === this.p.frozenColumns) {
        a(this.grid.fhDiv).remove();
        a(this.grid.fbDiv).remove();
        this.grid.fhDiv = null;
        this.grid.fbDiv = null;
        a(this).unbind(".setFrozenColumns");
        if (!0 === this.p.hoverrows) {
          var d;
          a("#" + a.jgrid.jqID(this.p.id)).bind("mouseover", function(f) {
            d = a(f.target).closest("tr.jqgrow");
            "ui-subgrid" !== a(d).attr("class") && a(d).addClass("ui-state-hover");
          }).bind("mouseout", function(f) {
            d = a(f.target).closest("tr.jqgrow");
            a(d).removeClass("ui-state-hover");
          });
        }
        this.p.frozenColumns = !1;
      }
    });
  }});
})(jQuery);
(function(a) {
  a.fn.jqm = function(c) {
    var b = {overlay:50, closeoverlay:!0, overlayClass:"jqmOverlay", closeClass:"jqmClose", trigger:".jqModal", ajax:e, ajaxText:"", target:e, modal:e, toTop:e, onShow:e, onHide:e, onLoad:e};
    return this.each(function() {
      if (this._jqm) {
        return f[this._jqm].c = a.extend({}, f[this._jqm].c, c);
      }
      d++;
      this._jqm = d;
      f[d] = {c:a.extend(b, a.jqm.params, c), a:e, w:a(this).addClass("jqmID" + d), s:d};
      b.trigger && a(this).jqmAddTrigger(b.trigger);
    });
  };
  a.fn.jqmAddClose = function(a) {
    return g(this, a, "jqmHide");
  };
  a.fn.jqmAddTrigger = function(a) {
    return g(this, a, "jqmShow");
  };
  a.fn.jqmShow = function(c) {
    return this.each(function() {
      a.jqm.open(this._jqm, c);
    });
  };
  a.fn.jqmHide = function(c) {
    return this.each(function() {
      a.jqm.close(this._jqm, c);
    });
  };
  a.jqm = {hash:{}, open:function(d, g) {
    var h = f[d], r = h.c, q = "." + r.closeClass, p = parseInt(h.w.css("z-index")), p = 0 < p ? p : 3E3, t = a("<div></div>").css({height:"100%", width:"100%", position:"fixed", left:0, top:0, "z-index":p - 1, opacity:r.overlay / 100});
    if (h.a) {
      return e;
    }
    h.t = g;
    h.a = !0;
    h.w.css("z-index", p);
    r.modal ? (c[0] || setTimeout(function() {
      k("bind");
    }, 1), c.push(d)) : 0 < r.overlay ? r.closeoverlay && h.w.jqmAddClose(t) : t = e;
    h.o = t ? t.addClass(r.overlayClass).prependTo("body") : e;
    r.ajax ? (p = r.target || h.w, t = r.ajax, p = "string" == typeof p ? a(p, h.w) : a(p), t = "@" == t.substr(0, 1) ? a(g).attr(t.substring(1)) : t, p.html(r.ajaxText).load(t, function() {
      r.onLoad && r.onLoad.call(this, h);
      q && h.w.jqmAddClose(a(q, h.w));
      b(h);
    })) : q && h.w.jqmAddClose(a(q, h.w));
    r.toTop && h.o && h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>').insertAfter(h.o);
    r.onShow ? r.onShow(h) : h.w.show();
    b(h);
    return e;
  }, close:function(b) {
    b = f[b];
    if (!b.a) {
      return e;
    }
    b.a = e;
    c[0] && (c.pop(), c[0] || k("unbind"));
    b.c.toTop && b.o && a("#jqmP" + b.w[0]._jqm).after(b.w).remove();
    if (b.c.onHide) {
      b.c.onHide(b);
    } else {
      b.w.hide(), b.o && b.o.remove();
    }
    return e;
  }, params:{}};
  var d = 0, f = a.jqm.hash, c = [], e = !1, b = function(c) {
    try {
      a(":input:visible", c.w)[0].focus();
    } catch (b) {
    }
  }, k = function(c) {
    a(document)[c]("keypress", h)[c]("keydown", h)[c]("mousedown", h);
  }, h = function(e) {
    var d = f[c[c.length - 1]], g = !a(e.target).parents(".jqmID" + d.s)[0];
    g && (a(".jqmID" + d.s).each(function() {
      var c = a(this), b = c.offset();
      if (b.top <= e.pageY && e.pageY <= b.top + c.height() && b.left <= e.pageX && e.pageX <= b.left + c.width()) {
        return g = !1;
      }
    }), b(d));
    return !g;
  }, g = function(c, b, d) {
    return c.each(function() {
      var c = this._jqm;
      a(b).each(function() {
        this[d] || (this[d] = [], a(this).click(function() {
          for (var a in{jqmShow:1, jqmHide:1}) {
            for (var c in this[a]) {
              if (f[this[a][c]]) {
                f[this[a][c]].w[a](this);
              }
            }
          }
          return e;
        }));
        this[d].push(c);
      });
    });
  };
})(jQuery);
(function(a) {
  a.fn.jqDrag = function(a) {
    return k(this, a, "d");
  };
  a.fn.jqResize = function(a, c) {
    return k(this, a, "r", c);
  };
  a.jqDnR = {dnr:{}, e:0, drag:function(a) {
    "d" == f.k ? c.css({left:f.X + a.pageX - f.pX, top:f.Y + a.pageY - f.pY}) : (c.css({width:Math.max(a.pageX - f.pX + f.W, 0), height:Math.max(a.pageY - f.pY + f.H, 0)}), b && e.css({width:Math.max(a.pageX - b.pX + b.W, 0), height:Math.max(a.pageY - b.pY + b.H, 0)}));
    return !1;
  }, stop:function() {
    a(document).unbind("mousemove", d.drag).unbind("mouseup", d.stop);
  }};
  var d = a.jqDnR, f = d.dnr, c = d.e, e, b, k = function(d, k, n, r) {
    return d.each(function() {
      k = k ? a(k, d) : d;
      k.bind("mousedown", {e:d, k:n}, function(d) {
        var k = d.data, l = {};
        c = k.e;
        e = r ? a(r) : !1;
        if ("relative" != c.css("position")) {
          try {
            c.position(l);
          } catch (m) {
          }
        }
        f = {X:l.left || h("left") || 0, Y:l.top || h("top") || 0, W:h("width") || c[0].scrollWidth || 0, H:h("height") || c[0].scrollHeight || 0, pX:d.pageX, pY:d.pageY, k:k.k};
        b = e && "d" != k.k ? {X:l.left || g("left") || 0, Y:l.top || g("top") || 0, W:e[0].offsetWidth || g("width") || 0, H:e[0].offsetHeight || g("height") || 0, pX:d.pageX, pY:d.pageY, k:k.k} : !1;
        if (a("input.hasDatepicker", c[0])[0]) {
          try {
            a("input.hasDatepicker", c[0]).datepicker("hide");
          } catch (n) {
          }
        }
        a(document).mousemove(a.jqDnR.drag).mouseup(a.jqDnR.stop);
        return !1;
      });
    });
  }, h = function(a) {
    return parseInt(c.css(a), 10) || !1;
  }, g = function(a) {
    return parseInt(e.css(a), 10) || !1;
  };
})(jQuery);
var xmlJsonClass = {xml2json:function(a, d) {
  9 === a.nodeType && (a = a.documentElement);
  var f = this.removeWhite(a), f = this.toObj(f), f = this.toJson(f, a.nodeName, "\t");
  return "{\n" + d + (d ? f.replace(/\t/g, d) : f.replace(/\t|\n/g, "")) + "\n}";
}, json2xml:function(a, d) {
  var f = function(a, c, e) {
    var d = "", l, m;
    if (a instanceof Array) {
      if (0 === a.length) {
        d += e + "<" + c + ">__EMPTY_ARRAY_</" + c + ">\n";
      } else {
        for (l = 0, m = a.length;l < m;l += 1) {
          var n = e + f(a[l], c, e + "\t") + "\n", d = d + n
        }
      }
    } else {
      if ("object" === typeof a) {
        l = !1;
        d += e + "<" + c;
        for (m in a) {
          a.hasOwnProperty(m) && ("@" === m.charAt(0) ? d += " " + m.substr(1) + '="' + a[m].toString() + '"' : l = !0);
        }
        d += l ? ">" : "/>";
        if (l) {
          for (m in a) {
            a.hasOwnProperty(m) && ("#text" === m ? d += a[m] : "#cdata" === m ? d += "<![CDATA[" + a[m] + "]]\x3e" : "@" !== m.charAt(0) && (d += f(a[m], m, e + "\t")));
          }
          d += ("\n" === d.charAt(d.length - 1) ? e : "") + "</" + c + ">";
        }
      } else {
        "function" === typeof a ? d += e + "<" + c + "><![CDATA[" + a + "]]\x3e</" + c + ">" : (void 0 === a && (a = ""), d = '""' === a.toString() || 0 === a.toString().length ? d + (e + "<" + c + ">__EMPTY_STRING_</" + c + ">") : d + (e + "<" + c + ">" + a.toString() + "</" + c + ">"));
      }
    }
    return d;
  }, c = "", e;
  for (e in a) {
    a.hasOwnProperty(e) && (c += f(a[e], e, ""));
  }
  return d ? c.replace(/\t/g, d) : c.replace(/\t|\n/g, "");
}, toObj:function(a) {
  var d = {}, f = /function/i;
  if (1 === a.nodeType) {
    if (a.attributes.length) {
      var c;
      for (c = 0;c < a.attributes.length;c += 1) {
        d["@" + a.attributes[c].nodeName] = (a.attributes[c].nodeValue || "").toString();
      }
    }
    if (a.firstChild) {
      var e = c = 0, b = !1, k;
      for (k = a.firstChild;k;k = k.nextSibling) {
        1 === k.nodeType ? b = !0 : 3 === k.nodeType && k.nodeValue.match(/[^ \f\n\r\t\v]/) ? c += 1 : 4 === k.nodeType && (e += 1);
      }
      if (b) {
        if (2 > c && 2 > e) {
          for (this.removeWhite(a), k = a.firstChild;k;k = k.nextSibling) {
            3 === k.nodeType ? d["#text"] = this.escape(k.nodeValue) : 4 === k.nodeType ? f.test(k.nodeValue) ? d[k.nodeName] = [d[k.nodeName], k.nodeValue] : d["#cdata"] = this.escape(k.nodeValue) : d[k.nodeName] ? d[k.nodeName] instanceof Array ? d[k.nodeName][d[k.nodeName].length] = this.toObj(k) : d[k.nodeName] = [d[k.nodeName], this.toObj(k)] : d[k.nodeName] = this.toObj(k);
          }
        } else {
          a.attributes.length ? d["#text"] = this.escape(this.innerXml(a)) : d = this.escape(this.innerXml(a));
        }
      } else {
        if (c) {
          a.attributes.length ? d["#text"] = this.escape(this.innerXml(a)) : (d = this.escape(this.innerXml(a)), "__EMPTY_ARRAY_" === d ? d = "[]" : "__EMPTY_STRING_" === d && (d = ""));
        } else {
          if (e) {
            if (1 < e) {
              d = this.escape(this.innerXml(a));
            } else {
              for (k = a.firstChild;k;k = k.nextSibling) {
                if (f.test(a.firstChild.nodeValue)) {
                  d = a.firstChild.nodeValue;
                  break;
                } else {
                  d["#cdata"] = this.escape(k.nodeValue);
                }
              }
            }
          }
        }
      }
    }
    a.attributes.length || a.firstChild || (d = null);
  } else {
    9 === a.nodeType ? d = this.toObj(a.documentElement) : alert("unhandled node type: " + a.nodeType);
  }
  return d;
}, toJson:function(a, d, f, c) {
  void 0 === c && (c = !0);
  var e = d ? '"' + d + '"' : "", b = "\t", k = "\n";
  c || (k = b = "");
  if ("[]" === a) {
    e += d ? ":[]" : "[]";
  } else {
    if (a instanceof Array) {
      var h, g, l = [];
      g = 0;
      for (h = a.length;g < h;g += 1) {
        l[g] = this.toJson(a[g], "", f + b, c);
      }
      e += (d ? ":[" : "[") + (1 < l.length ? k + f + b + l.join("," + k + f + b) + k + f : l.join("")) + "]";
    } else {
      if (null === a) {
        e += (d && ":") + "null";
      } else {
        if ("object" === typeof a) {
          h = [];
          for (g in a) {
            a.hasOwnProperty(g) && (h[h.length] = this.toJson(a[g], g, f + b, c));
          }
          e += (d ? ":{" : "{") + (1 < h.length ? k + f + b + h.join("," + k + f + b) + k + f : h.join("")) + "}";
        } else {
          e = "string" === typeof a ? e + ((d && ":") + '"' + a.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"') : e + ((d && ":") + a.toString());
        }
      }
    }
  }
  return e;
}, innerXml:function(a) {
  var d = "";
  if ("innerHTML" in a) {
    d = a.innerHTML;
  } else {
    var f = function(a) {
      var e = "", b;
      if (1 === a.nodeType) {
        e += "<" + a.nodeName;
        for (b = 0;b < a.attributes.length;b += 1) {
          e += " " + a.attributes[b].nodeName + '="' + (a.attributes[b].nodeValue || "").toString() + '"';
        }
        if (a.firstChild) {
          e += ">";
          for (b = a.firstChild;b;b = b.nextSibling) {
            e += f(b);
          }
          e += "</" + a.nodeName + ">";
        } else {
          e += "/>";
        }
      } else {
        3 === a.nodeType ? e += a.nodeValue : 4 === a.nodeType && (e += "<![CDATA[" + a.nodeValue + "]]\x3e");
      }
      return e;
    };
    for (a = a.firstChild;a;a = a.nextSibling) {
      d += f(a);
    }
  }
  return d;
}, escape:function(a) {
  return a.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r");
}, removeWhite:function(a) {
  a.normalize();
  var d;
  for (d = a.firstChild;d;) {
    if (3 === d.nodeType) {
      if (d.nodeValue.match(/[^ \f\n\r\t\v]/)) {
        d = d.nextSibling;
      } else {
        var f = d.nextSibling;
        a.removeChild(d);
        d = f;
      }
    } else {
      1 === d.nodeType && this.removeWhite(d), d = d.nextSibling;
    }
  }
  return a;
}};
(function(a) {
  a.fmatter = {};
  a.extend(a.fmatter, {isBoolean:function(a) {
    return "boolean" === typeof a;
  }, isObject:function(d) {
    return d && ("object" === typeof d || a.isFunction(d)) || !1;
  }, isString:function(a) {
    return "string" === typeof a;
  }, isNumber:function(a) {
    return "number" === typeof a && isFinite(a);
  }, isValue:function(a) {
    return this.isObject(a) || this.isString(a) || this.isNumber(a) || this.isBoolean(a);
  }, isEmpty:function(d) {
    if (!this.isString(d) && this.isValue(d)) {
      return !1;
    }
    if (!this.isValue(d)) {
      return !0;
    }
    d = a.trim(d).replace(/\&nbsp\;/ig, "").replace(/\&#160\;/ig, "");
    return "" === d;
  }});
  a.fn.fmatter = function(d, f, c, e, b) {
    var k = f;
    c = a.extend({}, a.jgrid.formatter, c);
    try {
      k = a.fn.fmatter[d].call(this, f, c, e, b);
    } catch (h) {
    }
    return k;
  };
  a.fmatter.util = {NumberFormat:function(d, f) {
    a.fmatter.isNumber(d) || (d *= 1);
    if (a.fmatter.isNumber(d)) {
      var c = 0 > d, e = String(d), b = f.decimalSeparator || ".", k;
      if (a.fmatter.isNumber(f.decimalPlaces)) {
        var h = f.decimalPlaces, e = Math.pow(10, h), e = String(Math.round(d * e) / e);
        k = e.lastIndexOf(".");
        if (0 < h) {
          for (0 > k ? (e += b, k = e.length - 1) : "." !== b && (e = e.replace(".", b));e.length - 1 - k < h;) {
            e += "0";
          }
        }
      }
      if (f.thousandsSeparator) {
        h = f.thousandsSeparator;
        k = e.lastIndexOf(b);
        k = -1 < k ? k : e.length;
        var b = e.substring(k), g = -1, l;
        for (l = k;0 < l;l--) {
          g++, 0 === g % 3 && l !== k && (!c || 1 < l) && (b = h + b), b = e.charAt(l - 1) + b;
        }
        e = b;
      }
      e = f.prefix ? f.prefix + e : e;
      return e = f.suffix ? e + f.suffix : e;
    }
    return d;
  }};
  a.fn.fmatter.defaultFormat = function(d, f) {
    return a.fmatter.isValue(d) && "" !== d ? d : f.defaultValue || "&#160;";
  };
  a.fn.fmatter.email = function(d, f) {
    return a.fmatter.isEmpty(d) ? a.fn.fmatter.defaultFormat(d, f) : '<a href="mailto:' + d + '">' + d + "</a>";
  };
  a.fn.fmatter.checkbox = function(d, f) {
    var c = a.extend({}, f.checkbox), e;
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    e = !0 === c.disabled ? 'disabled="disabled"' : "";
    if (a.fmatter.isEmpty(d) || void 0 === d) {
      d = a.fn.fmatter.defaultFormat(d, c);
    }
    d = String(d);
    d = (d + "").toLowerCase();
    return '<input type="checkbox" ' + (0 > d.search(/(false|f|0|no|n|off|undefined)/i) ? " checked='checked' " : "") + ' value="' + d + '" offval="no" ' + e + "/>";
  };
  a.fn.fmatter.link = function(d, f) {
    var c = {target:f.target}, e = "";
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    c.target && (e = "target=" + c.target);
    return a.fmatter.isEmpty(d) ? a.fn.fmatter.defaultFormat(d, f) : "<a " + e + ' href="' + d + '">' + d + "</a>";
  };
  a.fn.fmatter.showlink = function(d, f) {
    var c = {baseLinkUrl:f.baseLinkUrl, showAction:f.showAction, addParam:f.addParam || "", target:f.target, idName:f.idName}, e = "";
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    c.target && (e = "target=" + c.target);
    c = c.baseLinkUrl + c.showAction + "?" + c.idName + "=" + f.rowId + c.addParam;
    return a.fmatter.isString(d) || a.fmatter.isNumber(d) ? "<a " + e + ' href="' + c + '">' + d + "</a>" : a.fn.fmatter.defaultFormat(d, f);
  };
  a.fn.fmatter.integer = function(d, f) {
    var c = a.extend({}, f.integer);
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    return a.fmatter.isEmpty(d) ? c.defaultValue : a.fmatter.util.NumberFormat(d, c);
  };
  a.fn.fmatter.number = function(d, f) {
    var c = a.extend({}, f.number);
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    return a.fmatter.isEmpty(d) ? c.defaultValue : a.fmatter.util.NumberFormat(d, c);
  };
  a.fn.fmatter.currency = function(d, f) {
    var c = a.extend({}, f.currency);
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    return a.fmatter.isEmpty(d) ? c.defaultValue : a.fmatter.util.NumberFormat(d, c);
  };
  a.fn.fmatter.date = function(d, f, c, e) {
    c = a.extend({}, f.date);
    void 0 !== f.colModel && void 0 !== f.colModel.formatoptions && (c = a.extend({}, c, f.colModel.formatoptions));
    return c.reformatAfterEdit || "edit" !== e ? a.fmatter.isEmpty(d) ? a.fn.fmatter.defaultFormat(d, f) : a.jgrid.parseDate(c.srcformat, d, c.newformat, c) : a.fn.fmatter.defaultFormat(d, f);
  };
  a.fn.fmatter.select = function(d, f) {
    d = String(d);
    var c = !1, e = [], b, k;
    void 0 !== f.colModel.formatoptions ? (c = f.colModel.formatoptions.value, b = void 0 === f.colModel.formatoptions.separator ? ":" : f.colModel.formatoptions.separator, k = void 0 === f.colModel.formatoptions.delimiter ? ";" : f.colModel.formatoptions.delimiter) : void 0 !== f.colModel.editoptions && (c = f.colModel.editoptions.value, b = void 0 === f.colModel.editoptions.separator ? ":" : f.colModel.editoptions.separator, k = void 0 === f.colModel.editoptions.delimiter ? ";" : f.colModel.editoptions.delimiter);
    if (c) {
      var h = !0 === f.colModel.editoptions.multiple ? !0 : !1, g = [];
      h && (g = d.split(","), g = a.map(g, function(c) {
        return a.trim(c);
      }));
      if (a.fmatter.isString(c)) {
        var l = c.split(k), m = 0, n;
        for (n = 0;n < l.length;n++) {
          if (k = l[n].split(b), 2 < k.length && (k[1] = a.map(k, function(a, c) {
            if (0 < c) {
              return a;
            }
          }).join(b)), h) {
            -1 < a.inArray(k[0], g) && (e[m] = k[1], m++);
          } else {
            if (a.trim(k[0]) === a.trim(d)) {
              e[0] = k[1];
              break;
            }
          }
        }
      } else {
        a.fmatter.isObject(c) && (h ? e = a.map(g, function(a) {
          return c[a];
        }) : e[0] = c[d] || "");
      }
    }
    d = e.join(", ");
    return "" === d ? a.fn.fmatter.defaultFormat(d, f) : d;
  };
  a.fn.fmatter.rowactions = function(d) {
    var f = a(this).closest("tr.jqgrow"), c = f.attr("id"), e = a(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"), e = a("#" + e), b = e[0], k = b.p, h = k.colModel[a.jgrid.getCellIndex(this)], g = h.frozen ? a("tr#" + c + " td:eq(" + a.jgrid.getCellIndex(this) + ") > div", e) : a(this).parent(), l = {extraparam:{}}, m = function(c) {
      a.isFunction(l.afterRestore) && l.afterRestore.call(b, c);
      g.find("div.ui-inline-edit,div.ui-inline-del").show();
      g.find("div.ui-inline-save,div.ui-inline-cancel").hide();
    };
    void 0 !== h.formatoptions && (l = a.extend(l, h.formatoptions));
    void 0 !== k.editOptions && (l.editOptions = k.editOptions);
    void 0 !== k.delOptions && (l.delOptions = k.delOptions);
    f.hasClass("jqgrid-new-row") && (l.extraparam[k.prmNames.oper] = k.prmNames.addoper);
    f = {keys:l.keys, oneditfunc:l.onEdit, successfunc:l.onSuccess, url:l.url, extraparam:l.extraparam, aftersavefunc:function(c, e) {
      a.isFunction(l.afterSave) && l.afterSave.call(b, c, e);
      g.find("div.ui-inline-edit,div.ui-inline-del").show();
      g.find("div.ui-inline-save,div.ui-inline-cancel").hide();
    }, errorfunc:l.onError, afterrestorefunc:m, restoreAfterError:l.restoreAfterError, mtype:l.mtype};
    switch(d) {
      case "edit":
        e.jqGrid("editRow", c, f);
        g.find("div.ui-inline-edit,div.ui-inline-del").hide();
        g.find("div.ui-inline-save,div.ui-inline-cancel").show();
        e.triggerHandler("jqGridAfterGridComplete");
        break;
      case "save":
        e.jqGrid("saveRow", c, f) && (g.find("div.ui-inline-edit,div.ui-inline-del").show(), g.find("div.ui-inline-save,div.ui-inline-cancel").hide(), e.triggerHandler("jqGridAfterGridComplete"));
        break;
      case "cancel":
        e.jqGrid("restoreRow", c, m);
        g.find("div.ui-inline-edit,div.ui-inline-del").show();
        g.find("div.ui-inline-save,div.ui-inline-cancel").hide();
        e.triggerHandler("jqGridAfterGridComplete");
        break;
      case "del":
        e.jqGrid("delGridRow", c, l.delOptions);
        break;
      case "formedit":
        e.jqGrid("setSelection", c), e.jqGrid("editGridRow", c, l.editOptions);
    }
  };
  a.fn.fmatter.actions = function(d, f) {
    var c = {keys:!1, editbutton:!0, delbutton:!0, editformbutton:!1}, e = f.rowId, b = "";
    void 0 !== f.colModel.formatoptions && (c = a.extend(c, f.colModel.formatoptions));
    if (void 0 === e || a.fmatter.isEmpty(e)) {
      return "";
    }
    c.editformbutton ? b += "<div title='" + a.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ("id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-pencil'></span></div>" : c.editbutton && (b += "<div title='" + a.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + 
    ("id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ") + "><span class='ui-icon ui-icon-pencil'></span></div>");
    c.delbutton && (b += "<div title='" + a.jgrid.nav.deltitle + "' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' " + ("id='jDeleteButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-trash'></span></div>");
    b += "<div title='" + a.jgrid.edit.bSubmit + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + ("id='jSaveButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-disk'></span></div>";
    b += "<div title='" + a.jgrid.edit.bCancel + "' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' " + ("id='jCancelButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ") + "><span class='ui-icon ui-icon-cancel'></span></div>";
    return "<div style='margin-left:8px;'>" + b + "</div>";
  };
  a.unformat = function(d, f, c, e) {
    var b, k = f.colModel.formatter, h = f.colModel.formatoptions || {}, g = /([\.\*\_\'\(\)\{\}\+\?\\])/g, l = f.colModel.unformat || a.fn.fmatter[k] && a.fn.fmatter[k].unformat;
    if (void 0 !== l && a.isFunction(l)) {
      b = l.call(this, a(d).text(), f, d);
    } else {
      if (void 0 !== k && a.fmatter.isString(k)) {
        switch(b = a.jgrid.formatter || {}, k) {
          case "integer":
            h = a.extend({}, b.integer, h);
            f = h.thousandsSeparator.replace(g, "\\$1");
            f = new RegExp(f, "g");
            b = a(d).text().replace(f, "");
            break;
          case "number":
            h = a.extend({}, b.number, h);
            f = h.thousandsSeparator.replace(g, "\\$1");
            f = new RegExp(f, "g");
            b = a(d).text().replace(f, "").replace(h.decimalSeparator, ".");
            break;
          case "currency":
            h = a.extend({}, b.currency, h);
            f = h.thousandsSeparator.replace(g, "\\$1");
            f = new RegExp(f, "g");
            b = a(d).text();
            h.prefix && h.prefix.length && (b = b.substr(h.prefix.length));
            h.suffix && h.suffix.length && (b = b.substr(0, b.length - h.suffix.length));
            b = b.replace(f, "").replace(h.decimalSeparator, ".");
            break;
          case "checkbox":
            h = f.colModel.editoptions ? f.colModel.editoptions.value.split(":") : ["Yes", "No"];
            b = a("input", d).is(":checked") ? h[0] : h[1];
            break;
          case "select":
            b = a.unformat.select(d, f, c, e);
            break;
          case "actions":
            return "";
          default:
            b = a(d).text();
        }
      }
    }
    return void 0 !== b ? b : !0 === e ? a(d).text() : a.jgrid.htmlDecode(a(d).html());
  };
  a.unformat.select = function(d, f, c, e) {
    c = [];
    d = a(d).text();
    if (!0 === e) {
      return d;
    }
    e = a.extend({}, void 0 !== f.colModel.formatoptions ? f.colModel.formatoptions : f.colModel.editoptions);
    f = void 0 === e.separator ? ":" : e.separator;
    var b = void 0 === e.delimiter ? ";" : e.delimiter;
    if (e.value) {
      var k = e.value;
      e = !0 === e.multiple ? !0 : !1;
      var h = [];
      e && (h = d.split(","), h = a.map(h, function(c) {
        return a.trim(c);
      }));
      if (a.fmatter.isString(k)) {
        var g = k.split(b), l = 0, m;
        for (m = 0;m < g.length;m++) {
          if (b = g[m].split(f), 2 < b.length && (b[1] = a.map(b, function(a, c) {
            if (0 < c) {
              return a;
            }
          }).join(f)), e) {
            -1 < a.inArray(b[1], h) && (c[l] = b[0], l++);
          } else {
            if (a.trim(b[1]) === a.trim(d)) {
              c[0] = b[0];
              break;
            }
          }
        }
      } else {
        if (a.fmatter.isObject(k) || a.isArray(k)) {
          e || (h[0] = d), c = a.map(h, function(c) {
            var b;
            a.each(k, function(a, e) {
              if (e === c) {
                return b = a, !1;
              }
            });
            if (void 0 !== b) {
              return b;
            }
          });
        }
      }
      return c.join(", ");
    }
    return d || "";
  };
  a.unformat.date = function(d, f) {
    var c = a.jgrid.formatter.date || {};
    void 0 !== f.formatoptions && (c = a.extend({}, c, f.formatoptions));
    return a.fmatter.isEmpty(d) ? a.fn.fmatter.defaultFormat(d, f) : a.jgrid.parseDate(c.newformat, d, c.srcformat, c);
  };
})(jQuery);
(function(a) {
  a.extend(a.jgrid, {showModal:function(a) {
    a.w.show();
  }, closeModal:function(a) {
    a.w.hide().attr("aria-hidden", "true");
    a.o && a.o.remove();
  }, hideModal:function(d, f) {
    f = a.extend({jqm:!0, gb:""}, f || {});
    if (f.onClose) {
      var c = f.gb && "string" === typeof f.gb && "#gbox_" === f.gb.substr(0, 6) ? f.onClose.call(a("#" + f.gb.substr(6))[0], d) : f.onClose(d);
      if ("boolean" === typeof c && !c) {
        return;
      }
    }
    if (a.fn.jqm && !0 === f.jqm) {
      a(d).attr("aria-hidden", "true").jqmHide();
    } else {
      if ("" !== f.gb) {
        try {
          a(".jqgrid-overlay:first", f.gb).hide();
        } catch (e) {
        }
      }
      a(d).hide().attr("aria-hidden", "true");
    }
  }, findPos:function(a) {
    var f = 0, c = 0;
    if (a.offsetParent) {
      do {
        f += a.offsetLeft, c += a.offsetTop;
      } while (a = a.offsetParent);
    }
    return [f, c];
  }, createModal:function(d, f, c, e, b, k, h) {
    c = a.extend(!0, {}, a.jgrid.jqModal || {}, c);
    var g = document.createElement("div"), l, m = this;
    h = a.extend({}, h || {});
    l = "rtl" === a(c.gbox).attr("dir") ? !0 : !1;
    g.className = "ui-widget ui-widget-content ui-corner-all ui-jqdialog";
    g.id = d.themodal;
    var n = document.createElement("div");
    n.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
    n.id = d.modalhead;
    a(n).append("<span class='ui-jqdialog-title'>" + c.caption + "</span>");
    var r = a("<a class='ui-jqdialog-titlebar-close ui-corner-all'></a>").hover(function() {
      r.addClass("ui-state-hover");
    }, function() {
      r.removeClass("ui-state-hover");
    }).append("<span class='ui-icon ui-icon-closethick'></span>");
    a(n).append(r);
    l ? (g.dir = "rtl", a(".ui-jqdialog-title", n).css("float", "right"), a(".ui-jqdialog-titlebar-close", n).css("left", "0.3em")) : (g.dir = "ltr", a(".ui-jqdialog-title", n).css("float", "left"), a(".ui-jqdialog-titlebar-close", n).css("right", "0.3em"));
    var q = document.createElement("div");
    a(q).addClass("ui-jqdialog-content ui-widget-content").attr("id", d.modalcontent);
    a(q).append(f);
    g.appendChild(q);
    a(g).prepend(n);
    !0 === k ? a("body").append(g) : "string" === typeof k ? a(k).append(g) : a(g).insertBefore(e);
    a(g).css(h);
    void 0 === c.jqModal && (c.jqModal = !0);
    f = {};
    if (a.fn.jqm && !0 === c.jqModal) {
      0 === c.left && 0 === c.top && c.overlay && (h = [], h = a.jgrid.findPos(b), c.left = h[0] + 4, c.top = h[1] + 4), f.top = c.top + "px", f.left = c.left;
    } else {
      if (0 !== c.left || 0 !== c.top) {
        f.left = c.left, f.top = c.top + "px";
      }
    }
    a("a.ui-jqdialog-titlebar-close", n).click(function() {
      var b = a("#" + a.jgrid.jqID(d.themodal)).data("onClose") || c.onClose, e = a("#" + a.jgrid.jqID(d.themodal)).data("gbox") || c.gbox;
      m.hideModal("#" + a.jgrid.jqID(d.themodal), {gb:e, jqm:c.jqModal, onClose:b});
      return !1;
    });
    0 !== c.width && c.width || (c.width = 300);
    0 !== c.height && c.height || (c.height = 200);
    c.zIndex || (e = a(e).parents("*[role=dialog]").filter(":first").css("z-index"), c.zIndex = e ? parseInt(e, 10) + 2 : 950);
    e = 0;
    l && f.left && !k && (e = a(c.gbox).width() - (isNaN(c.width) ? 0 : parseInt(c.width, 10)) - 8, f.left = parseInt(f.left, 10) + parseInt(e, 10));
    f.left && (f.left += "px");
    a(g).css(a.extend({width:isNaN(c.width) ? "auto" : c.width + "px", height:isNaN(c.height) ? "auto" : c.height + "px", zIndex:c.zIndex, overflow:"hidden"}, f)).attr({tabIndex:"-1", role:"dialog", "aria-labelledby":d.modalhead, "aria-hidden":"true"});
    void 0 === c.drag && (c.drag = !0);
    void 0 === c.resize && (c.resize = !0);
    if (c.drag) {
      if (a(n).css("cursor", "move"), a.fn.jqDrag) {
        a(g).jqDrag(n);
      } else {
        try {
          a(g).draggable({handle:a("#" + a.jgrid.jqID(n.id))});
        } catch (p) {
        }
      }
    }
    if (c.resize) {
      if (a.fn.jqResize) {
        a(g).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se'></div>"), a("#" + a.jgrid.jqID(d.themodal)).jqResize(".jqResize", d.scrollelm ? "#" + a.jgrid.jqID(d.scrollelm) : !1);
      } else {
        try {
          a(g).resizable({handles:"se, sw", alsoResize:d.scrollelm ? "#" + a.jgrid.jqID(d.scrollelm) : !1});
        } catch (t) {
        }
      }
    }
    !0 === c.closeOnEscape && a(g).keydown(function(b) {
      27 == b.which && (b = a("#" + a.jgrid.jqID(d.themodal)).data("onClose") || c.onClose, m.hideModal("#" + a.jgrid.jqID(d.themodal), {gb:c.gbox, jqm:c.jqModal, onClose:b}));
    });
  }, viewModal:function(d, f) {
    f = a.extend({toTop:!0, overlay:10, modal:!1, overlayClass:"ui-widget-overlay", onShow:a.jgrid.showModal, onHide:a.jgrid.closeModal, gbox:"", jqm:!0, jqM:!0}, f || {});
    if (a.fn.jqm && !0 === f.jqm) {
      f.jqM ? a(d).attr("aria-hidden", "false").jqm(f).jqmShow() : a(d).attr("aria-hidden", "false").jqmShow();
    } else {
      "" !== f.gbox && (a(".jqgrid-overlay:first", f.gbox).show(), a(d).data("gbox", f.gbox));
      a(d).show().attr("aria-hidden", "false");
      try {
        a(":input:visible", d)[0].focus();
      } catch (c) {
      }
    }
  }, info_dialog:function(d, f, c, e) {
    var b = {width:290, height:"auto", dataheight:"auto", drag:!0, resize:!1, left:250, top:170, zIndex:1E3, jqModal:!0, modal:!1, closeOnEscape:!0, align:"center", buttonalign:"center", buttons:[]};
    a.extend(!0, b, a.jgrid.jqModal || {}, {caption:"<b>" + d + "</b>"}, e || {});
    var k = b.jqModal, h = this;
    a.fn.jqm && !k && (k = !1);
    d = "";
    if (0 < b.buttons.length) {
      for (e = 0;e < b.buttons.length;e++) {
        void 0 === b.buttons[e].id && (b.buttons[e].id = "info_button_" + e), d += "<a id='" + b.buttons[e].id + "' class='fm-button ui-state-default ui-corner-all'>" + b.buttons[e].text + "</a>";
      }
    }
    e = isNaN(b.dataheight) ? b.dataheight : b.dataheight + "px";
    f = "<div id='info_id'>" + ("<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + e + ";" + ("text-align:" + b.align + ";") + "'>" + f + "</div>");
    f += c ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + b.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button ui-state-default ui-corner-all'>" + c + "</a>" + d + "</div>" : "" !== d ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + b.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + d + "</div>" : 
    "";
    f += "</div>";
    try {
      "false" === a("#info_dialog").attr("aria-hidden") && a.jgrid.hideModal("#info_dialog", {jqm:k}), a("#info_dialog").remove();
    } catch (g) {
    }
    a.jgrid.createModal({themodal:"info_dialog", modalhead:"info_head", modalcontent:"info_content", scrollelm:"infocnt"}, f, b, "", "", !0);
    d && a.each(b.buttons, function(c) {
      a("#" + a.jgrid.jqID(this.id), "#info_id").bind("click", function() {
        b.buttons[c].onClick.call(a("#info_dialog"));
        return !1;
      });
    });
    a("#closedialog", "#info_id").click(function() {
      h.hideModal("#info_dialog", {jqm:k, onClose:a("#info_dialog").data("onClose") || b.onClose, gb:a("#info_dialog").data("gbox") || b.gbox});
      return !1;
    });
    a(".fm-button", "#info_dialog").hover(function() {
      a(this).addClass("ui-state-hover");
    }, function() {
      a(this).removeClass("ui-state-hover");
    });
    a.isFunction(b.beforeOpen) && b.beforeOpen();
    a.jgrid.viewModal("#info_dialog", {onHide:function(a) {
      a.w.hide().remove();
      a.o && a.o.remove();
    }, modal:b.modal, jqm:k});
    a.isFunction(b.afterOpen) && b.afterOpen();
    try {
      a("#info_dialog").focus();
    } catch (l) {
    }
  }, bindEv:function(d, f) {
    a.isFunction(f.dataInit) && f.dataInit.call(this, d, f);
    f.dataEvents && a.each(f.dataEvents, function() {
      void 0 !== this.data ? a(d).bind(this.type, this.data, this.fn) : a(d).bind(this.type, this.fn);
    });
  }, createEl:function(d, f, c, e, b) {
    function k(c, b, e) {
      var d = "dataInit dataEvents dataUrl buildSelect sopt searchhidden defaultValue attr custom_element custom_value".split(" ");
      void 0 !== e && a.isArray(e) && a.merge(d, e);
      a.each(b, function(b, e) {
        -1 === a.inArray(b, d) && a(c).attr(b, e);
      });
      b.hasOwnProperty("id") || a(c).attr("id", a.jgrid.randId());
    }
    var h = "", g = this;
    switch(d) {
      case "textarea":
        h = document.createElement("textarea");
        e ? f.cols || a(h).css({width:"98%"}) : f.cols || (f.cols = 20);
        f.rows || (f.rows = 2);
        if ("&nbsp;" === c || "&#160;" === c || 1 === c.length && 160 === c.charCodeAt(0)) {
          c = "";
        }
        h.value = c;
        k(h, f);
        a(h).attr({role:"textbox", multiline:"true"});
        break;
      case "checkbox":
        h = document.createElement("input");
        h.type = "checkbox";
        f.value ? (d = f.value.split(":"), c === d[0] && (h.checked = !0, h.defaultChecked = !0), h.value = d[0], a(h).attr("offval", d[1])) : (d = (c + "").toLowerCase(), 0 > d.search(/(false|f|0|no|n|off|undefined)/i) && "" !== d ? (h.checked = !0, h.defaultChecked = !0, h.value = c) : h.value = "on", a(h).attr("offval", "off"));
        k(h, f, ["value"]);
        a(h).attr("role", "checkbox");
        break;
      case "select":
        h = document.createElement("select");
        h.setAttribute("role", "select");
        e = [];
        !0 === f.multiple ? (d = !0, h.multiple = "multiple", a(h).attr("aria-multiselectable", "true")) : d = !1;
        if (void 0 !== f.dataUrl) {
          d = f.name ? String(f.id).substring(0, String(f.id).length - String(f.name).length - 1) : String(f.id);
          var l = f.postData || b.postData;
          g.p && g.p.idPrefix && (d = a.jgrid.stripPref(g.p.idPrefix, d));
          a.ajax(a.extend({url:a.isFunction(f.dataUrl) ? f.dataUrl.call(g, d, c, String(f.name)) : f.dataUrl, type:"GET", dataType:"html", data:a.isFunction(l) ? l.call(g, d, c, String(f.name)) : l, context:{elem:h, options:f, vl:c}, success:function(c) {
            var b = [], e = this.elem, d = this.vl, f = a.extend({}, this.options), h = !0 === f.multiple;
            c = a.isFunction(f.buildSelect) ? f.buildSelect.call(g, c) : c;
            "string" === typeof c && (c = a(a.trim(c)).html());
            c && (a(e).append(c), k(e, f, l ? ["postData"] : void 0), void 0 === f.size && (f.size = h ? 3 : 1), h ? (b = d.split(","), b = a.map(b, function(c) {
              return a.trim(c);
            })) : b[0] = a.trim(d), setTimeout(function() {
              a("option", e).each(function(c) {
                0 === c && e.multiple && (this.selected = !1);
                a(this).attr("role", "option");
                if (-1 < a.inArray(a.trim(a(this).text()), b) || -1 < a.inArray(a.trim(a(this).val()), b)) {
                  this.selected = "selected";
                }
              });
            }, 0));
          }}, b || {}));
        } else {
          if (f.value) {
            var m;
            void 0 === f.size && (f.size = d ? 3 : 1);
            d && (e = c.split(","), e = a.map(e, function(c) {
              return a.trim(c);
            }));
            "function" === typeof f.value && (f.value = f.value());
            var n, r, q = void 0 === f.separator ? ":" : f.separator;
            b = void 0 === f.delimiter ? ";" : f.delimiter;
            if ("string" === typeof f.value) {
              for (n = f.value.split(b), m = 0;m < n.length;m++) {
                r = n[m].split(q), 2 < r.length && (r[1] = a.map(r, function(a, c) {
                  if (0 < c) {
                    return a;
                  }
                }).join(q)), b = document.createElement("option"), b.setAttribute("role", "option"), b.value = r[0], b.innerHTML = r[1], h.appendChild(b), d || a.trim(r[0]) !== a.trim(c) && a.trim(r[1]) !== a.trim(c) || (b.selected = "selected"), d && (-1 < a.inArray(a.trim(r[1]), e) || -1 < a.inArray(a.trim(r[0]), e)) && (b.selected = "selected");
              }
            } else {
              if ("object" === typeof f.value) {
                for (m in q = f.value, q) {
                  q.hasOwnProperty(m) && (b = document.createElement("option"), b.setAttribute("role", "option"), b.value = m, b.innerHTML = q[m], h.appendChild(b), d || a.trim(m) !== a.trim(c) && a.trim(q[m]) !== a.trim(c) || (b.selected = "selected"), d && (-1 < a.inArray(a.trim(q[m]), e) || -1 < a.inArray(a.trim(m), e)) && (b.selected = "selected"));
                }
              }
            }
            k(h, f, ["value"]);
          }
        }
        break;
      case "text":
      ;
      case "password":
      ;
      case "button":
        m = "button" === d ? "button" : "textbox";
        h = document.createElement("input");
        h.type = d;
        h.value = c;
        k(h, f);
        "button" !== d && (e ? f.size || a(h).css({width:"98%"}) : f.size || (f.size = 20));
        a(h).attr("role", m);
        break;
      case "image":
      ;
      case "file":
        h = document.createElement("input");
        h.type = d;
        k(h, f);
        break;
      case "custom":
        h = document.createElement("span");
        try {
          if (a.isFunction(f.custom_element)) {
            if (q = f.custom_element.call(g, c, f)) {
              q = a(q).addClass("customelement").attr({id:f.id, name:f.name}), a(h).empty().append(q);
            } else {
              throw "e2";
            }
          } else {
            throw "e1";
          }
        } catch (p) {
          "e1" === p && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === p ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, "string" === typeof p ? p : p.message, a.jgrid.edit.bClose);
        }
      ;
    }
    return h;
  }, checkDate:function(a, f) {
    var c = {}, e;
    a = a.toLowerCase();
    e = -1 !== a.indexOf("/") ? "/" : -1 !== a.indexOf("-") ? "-" : -1 !== a.indexOf(".") ? "." : "/";
    a = a.split(e);
    f = f.split(e);
    if (3 !== f.length) {
      return !1;
    }
    var b = -1, k, h = e = -1, g;
    for (g = 0;g < a.length;g++) {
      k = isNaN(f[g]) ? 0 : parseInt(f[g], 10), c[a[g]] = k, k = a[g], -1 !== k.indexOf("y") && (b = g), -1 !== k.indexOf("m") && (h = g), -1 !== k.indexOf("d") && (e = g);
    }
    k = "y" === a[b] || "yyyy" === a[b] ? 4 : "yy" === a[b] ? 2 : -1;
    g = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var l;
    if (-1 === b) {
      return !1;
    }
    l = c[a[b]].toString();
    2 === k && 1 === l.length && (k = 1);
    if (l.length !== k || 0 === c[a[b]] && "00" !== f[b] || -1 === h) {
      return !1;
    }
    l = c[a[h]].toString();
    if (1 > l.length || 1 > c[a[h]] || 12 < c[a[h]] || -1 === e) {
      return !1;
    }
    l = c[a[e]].toString();
    !(k = 1 > l.length || 1 > c[a[e]] || 31 < c[a[e]]) && (k = 2 === c[a[h]]) && (b = c[a[b]], k = c[a[e]] > (0 !== b % 4 || 0 === b % 100 && 0 !== b % 400 ? 28 : 29));
    return k || c[a[e]] > g[c[a[h]]] ? !1 : !0;
  }, isEmpty:function(a) {
    return a.match(/^\s+$/) || "" === a ? !0 : !1;
  }, checkTime:function(d) {
    var f = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
    if (!a.jgrid.isEmpty(d)) {
      if (d = d.match(f)) {
        if (d[3]) {
          if (1 > d[1] || 12 < d[1]) {
            return !1;
          }
        } else {
          if (23 < d[1]) {
            return !1;
          }
        }
        if (59 < d[2]) {
          return !1;
        }
      } else {
        return !1;
      }
    }
    return !0;
  }, checkValues:function(d, f, c, e) {
    var b, k, h;
    h = this.p.colModel;
    if (void 0 === c) {
      if ("string" === typeof f) {
        for (c = 0, e = h.length;c < e;c++) {
          if (h[c].name === f) {
            b = h[c].editrules;
            f = c;
            null != h[c].formoptions && (k = h[c].formoptions.label);
            break;
          }
        }
      } else {
        0 <= f && (b = h[f].editrules);
      }
    } else {
      b = c, k = void 0 === e ? "_" : e;
    }
    if (b) {
      k || (k = null != this.p.colNames ? this.p.colNames[f] : h[f].label);
      if (!0 === b.required && a.jgrid.isEmpty(d)) {
        return [!1, k + ": " + a.jgrid.edit.msg.required, ""];
      }
      c = !1 === b.required ? !1 : !0;
      if (!0 === b.number && (!1 !== c || !a.jgrid.isEmpty(d)) && isNaN(d)) {
        return [!1, k + ": " + a.jgrid.edit.msg.number, ""];
      }
      if (void 0 !== b.minValue && !isNaN(b.minValue) && parseFloat(d) < parseFloat(b.minValue)) {
        return [!1, k + ": " + a.jgrid.edit.msg.minValue + " " + b.minValue, ""];
      }
      if (void 0 !== b.maxValue && !isNaN(b.maxValue) && parseFloat(d) > parseFloat(b.maxValue)) {
        return [!1, k + ": " + a.jgrid.edit.msg.maxValue + " " + b.maxValue, ""];
      }
      if (!(!0 !== b.email || !1 === c && a.jgrid.isEmpty(d) || (e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, 
      e.test(d)))) {
        return [!1, k + ": " + a.jgrid.edit.msg.email, ""];
      }
      if (!(!0 !== b.integer || !1 === c && a.jgrid.isEmpty(d) || !isNaN(d) && 0 === d % 1 && -1 === d.indexOf("."))) {
        return [!1, k + ": " + a.jgrid.edit.msg.integer, ""];
      }
      if (!(!0 !== b.date || !1 === c && a.jgrid.isEmpty(d) || (h[f].formatoptions && h[f].formatoptions.newformat ? (h = h[f].formatoptions.newformat, a.jgrid.formatter.date.masks.hasOwnProperty(h) && (h = a.jgrid.formatter.date.masks[h])) : h = h[f].datefmt || "Y-m-d", a.jgrid.checkDate(h, d)))) {
        return [!1, k + ": " + a.jgrid.edit.msg.date + " - " + h, ""];
      }
      if (!0 === b.time && !(!1 === c && a.jgrid.isEmpty(d) || a.jgrid.checkTime(d))) {
        return [!1, k + ": " + a.jgrid.edit.msg.date + " - hh:mm (am/pm)", ""];
      }
      if (!(!0 !== b.url || !1 === c && a.jgrid.isEmpty(d) || (e = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i, e.test(d)))) {
        return [!1, k + ": " + a.jgrid.edit.msg.url, ""];
      }
      if (!0 === b.custom && (!1 !== c || !a.jgrid.isEmpty(d))) {
        return a.isFunction(b.custom_func) ? (d = b.custom_func.call(this, d, k, f), a.isArray(d) ? d : [!1, a.jgrid.edit.msg.customarray, ""]) : [!1, a.jgrid.edit.msg.customfcheck, ""];
      }
    }
    return [!0, "", ""];
  }});
})(jQuery);
(function(a) {
  a.fn.jqFilter = function(d) {
    if ("string" === typeof d) {
      var f = a.fn.jqFilter[d];
      if (!f) {
        throw "jqFilter - No such method: " + d;
      }
      var c = a.makeArray(arguments).slice(1);
      return f.apply(this, c);
    }
    var e = a.extend(!0, {filter:null, columns:[], onChange:null, afterRedraw:null, checkValues:null, error:!1, errmsg:"", errorcheck:!0, showQuery:!0, sopt:null, ops:[], operands:null, numopts:"eq ne lt le gt ge nu nn in ni".split(" "), stropts:"eq ne bw bn ew en cn nc nu nn in ni".split(" "), strarr:["text", "string", "blob"], groupOps:[{op:"AND", text:"AND"}, {op:"OR", text:"OR"}], groupButton:!0, ruleButtons:!0, direction:"ltr"}, a.jgrid.filter, d || {});
    return this.each(function() {
      if (!this.filter) {
        this.p = e;
        if (null === this.p.filter || void 0 === this.p.filter) {
          this.p.filter = {groupOp:this.p.groupOps[0].op, rules:[], groups:[]};
        }
        var c, d = this.p.columns.length, f, g = /msie/i.test(navigator.userAgent) && !window.opera;
        this.p.initFilter = a.extend(!0, {}, this.p.filter);
        if (d) {
          for (c = 0;c < d;c++) {
            f = this.p.columns[c], f.stype ? f.inputtype = f.stype : f.inputtype || (f.inputtype = "text"), f.sorttype ? f.searchtype = f.sorttype : f.searchtype || (f.searchtype = "string"), void 0 === f.hidden && (f.hidden = !1), f.label || (f.label = f.name), f.index && (f.name = f.index), f.hasOwnProperty("searchoptions") || (f.searchoptions = {}), f.hasOwnProperty("searchrules") || (f.searchrules = {});
          }
          this.p.showQuery && a(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
          var l = function(c, b) {
            var d = [!0, ""], f = a("#" + a.jgrid.jqID(e.id))[0] || null;
            if (a.isFunction(b.searchrules)) {
              d = b.searchrules.call(f, c, b);
            } else {
              if (a.jgrid && a.jgrid.checkValues) {
                try {
                  d = a.jgrid.checkValues.call(f, c, -1, b.searchrules, b.label);
                } catch (g) {
                }
              }
            }
            d && d.length && !1 === d[0] && (e.error = !d[0], e.errmsg = d[1]);
          };
          this.onchange = function() {
            this.p.error = !1;
            this.p.errmsg = "";
            return a.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1;
          };
          this.reDraw = function() {
            a("table.group:first", this).remove();
            var c = this.createTableForGroup(e.filter, null);
            a(this).append(c);
            a.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p);
          };
          this.createTableForGroup = function(c, b) {
            var d = this, f, g = a("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"), h = "left";
            "rtl" === this.p.direction && (h = "right", g.attr("dir", "rtl"));
            null === b && g.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='" + h + "'></th></tr>");
            var k = a("<tr></tr>");
            g.append(k);
            h = a("<th colspan='5' align='" + h + "'></th>");
            k.append(h);
            if (!0 === this.p.ruleButtons) {
              var l = a("<select class='opsel'></select>");
              h.append(l);
              var k = "", w;
              for (f = 0;f < e.groupOps.length;f++) {
                w = c.groupOp === d.p.groupOps[f].op ? " selected='selected'" : "", k += "<option value='" + d.p.groupOps[f].op + "'" + w + ">" + d.p.groupOps[f].text + "</option>";
              }
              l.append(k).bind("change", function() {
                c.groupOp = a(l).val();
                d.onchange();
              });
            }
            k = "<span></span>";
            this.p.groupButton && (k = a("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>"), k.bind("click", function() {
              void 0 === c.groups && (c.groups = []);
              c.groups.push({groupOp:e.groupOps[0].op, rules:[], groups:[]});
              d.reDraw();
              d.onchange();
              return !1;
            }));
            h.append(k);
            if (!0 === this.p.ruleButtons) {
              var k = a("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"), y;
              k.bind("click", function() {
                void 0 === c.rules && (c.rules = []);
                for (f = 0;f < d.p.columns.length;f++) {
                  var b = void 0 === d.p.columns[f].search ? !0 : d.p.columns[f].search, e = !0 === d.p.columns[f].hidden;
                  if (!0 === d.p.columns[f].searchoptions.searchhidden && b || b && !e) {
                    y = d.p.columns[f];
                    break;
                  }
                }
                b = y.searchoptions.sopt ? y.searchoptions.sopt : d.p.sopt ? d.p.sopt : -1 !== a.inArray(y.searchtype, d.p.strarr) ? d.p.stropts : d.p.numopts;
                c.rules.push({field:y.name, op:b[0], data:""});
                d.reDraw();
                return !1;
              });
              h.append(k);
            }
            null !== b && (k = a("<input type='button' value='-' title='Delete group' class='delete-group'/>"), h.append(k), k.bind("click", function() {
              for (f = 0;f < b.groups.length;f++) {
                if (b.groups[f] === c) {
                  b.groups.splice(f, 1);
                  break;
                }
              }
              d.reDraw();
              d.onchange();
              return !1;
            }));
            if (void 0 !== c.groups) {
              for (f = 0;f < c.groups.length;f++) {
                h = a("<tr></tr>"), g.append(h), k = a("<td class='first'></td>"), h.append(k), k = a("<td colspan='4'></td>"), k.append(this.createTableForGroup(c.groups[f], c)), h.append(k);
              }
            }
            void 0 === c.groupOp && (c.groupOp = d.p.groupOps[0].op);
            if (void 0 !== c.rules) {
              for (f = 0;f < c.rules.length;f++) {
                g.append(this.createTableRowForRule(c.rules[f], c));
              }
            }
            return g;
          };
          this.createTableRowForRule = function(c, b) {
            var d = this, f = a("#" + a.jgrid.jqID(e.id))[0] || null, h = a("<tr></tr>"), k, l, u, w, y = "", x;
            h.append("<td class='first'></td>");
            var B = a("<td class='columns'></td>");
            h.append(B);
            var C = a("<select></select>"), O, D = [];
            B.append(C);
            C.bind("change", function() {
              c.field = a(C).val();
              u = a(this).parents("tr:first");
              for (k = 0;k < d.p.columns.length;k++) {
                if (d.p.columns[k].name === c.field) {
                  w = d.p.columns[k];
                  break;
                }
              }
              if (w) {
                w.searchoptions.id = a.jgrid.randId();
                g && "text" === w.inputtype && !w.searchoptions.size && (w.searchoptions.size = 10);
                var b = a.jgrid.createEl.call(f, w.inputtype, w.searchoptions, "", !0, d.p.ajaxSelectOptions || {}, !0);
                a(b).addClass("input-elm");
                l = w.searchoptions.sopt ? w.searchoptions.sopt : d.p.sopt ? d.p.sopt : -1 !== a.inArray(w.searchtype, d.p.strarr) ? d.p.stropts : d.p.numopts;
                var e = "", h = 0;
                D = [];
                a.each(d.p.ops, function() {
                  D.push(this.oper);
                });
                for (k = 0;k < l.length;k++) {
                  O = a.inArray(l[k], D), -1 !== O && (0 === h && (c.op = d.p.ops[O].oper), e += "<option value='" + d.p.ops[O].oper + "'>" + d.p.ops[O].text + "</option>", h++);
                }
                a(".selectopts", u).empty().append(e);
                a(".selectopts", u)[0].selectedIndex = 0;
                a.jgrid.msie && 9 > a.jgrid.msiever() && (e = parseInt(a("select.selectopts", u)[0].offsetWidth, 10) + 1, a(".selectopts", u).width(e), a(".selectopts", u).css("width", "auto"));
                a(".data", u).empty().append(b);
                a.jgrid.bindEv.call(f, b, w.searchoptions);
                a(".input-elm", u).bind("change", function(b) {
                  b = b.target;
                  c.data = "SPAN" === b.nodeName.toUpperCase() && w.searchoptions && a.isFunction(w.searchoptions.custom_value) ? w.searchoptions.custom_value.call(f, a(b).children(".customelement:first"), "get") : b.value;
                  d.onchange();
                });
                setTimeout(function() {
                  c.data = a(b).val();
                  d.onchange();
                }, 0);
              }
            });
            for (k = B = 0;k < d.p.columns.length;k++) {
              x = void 0 === d.p.columns[k].search ? !0 : d.p.columns[k].search;
              var K = !0 === d.p.columns[k].hidden;
              if (!0 === d.p.columns[k].searchoptions.searchhidden && x || x && !K) {
                x = "", c.field === d.p.columns[k].name && (x = " selected='selected'", B = k), y += "<option value='" + d.p.columns[k].name + "'" + x + ">" + d.p.columns[k].label + "</option>";
              }
            }
            C.append(y);
            y = a("<td class='operators'></td>");
            h.append(y);
            w = e.columns[B];
            w.searchoptions.id = a.jgrid.randId();
            g && "text" === w.inputtype && !w.searchoptions.size && (w.searchoptions.size = 10);
            B = a.jgrid.createEl.call(f, w.inputtype, w.searchoptions, c.data, !0, d.p.ajaxSelectOptions || {}, !0);
            if ("nu" === c.op || "nn" === c.op) {
              a(B).attr("readonly", "true"), a(B).attr("disabled", "true");
            }
            var H = a("<select class='selectopts'></select>");
            y.append(H);
            H.bind("change", function() {
              c.op = a(H).val();
              u = a(this).parents("tr:first");
              var b = a(".input-elm", u)[0];
              "nu" === c.op || "nn" === c.op ? (c.data = "", "SELECT" !== b.tagName.toUpperCase() && (b.value = ""), b.setAttribute("readonly", "true"), b.setAttribute("disabled", "true")) : ("SELECT" === b.tagName.toUpperCase() && (c.data = b.value), b.removeAttribute("readonly"), b.removeAttribute("disabled"));
              d.onchange();
            });
            l = w.searchoptions.sopt ? w.searchoptions.sopt : d.p.sopt ? d.p.sopt : -1 !== a.inArray(w.searchtype, d.p.strarr) ? d.p.stropts : d.p.numopts;
            y = "";
            a.each(d.p.ops, function() {
              D.push(this.oper);
            });
            for (k = 0;k < l.length;k++) {
              O = a.inArray(l[k], D), -1 !== O && (x = c.op === d.p.ops[O].oper ? " selected='selected'" : "", y += "<option value='" + d.p.ops[O].oper + "'" + x + ">" + d.p.ops[O].text + "</option>");
            }
            H.append(y);
            y = a("<td class='data'></td>");
            h.append(y);
            y.append(B);
            a.jgrid.bindEv.call(f, B, w.searchoptions);
            a(B).addClass("input-elm").bind("change", function() {
              c.data = "custom" === w.inputtype ? w.searchoptions.custom_value.call(f, a(this).children(".customelement:first"), "get") : a(this).val();
              d.onchange();
            });
            y = a("<td></td>");
            h.append(y);
            !0 === this.p.ruleButtons && (B = a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>"), y.append(B), B.bind("click", function() {
              for (k = 0;k < b.rules.length;k++) {
                if (b.rules[k] === c) {
                  b.rules.splice(k, 1);
                  break;
                }
              }
              d.reDraw();
              d.onchange();
              return !1;
            }));
            return h;
          };
          this.getStringForGroup = function(a) {
            var c = "(", b;
            if (void 0 !== a.groups) {
              for (b = 0;b < a.groups.length;b++) {
                1 < c.length && (c += " " + a.groupOp + " ");
                try {
                  c += this.getStringForGroup(a.groups[b]);
                } catch (e) {
                  alert(e);
                }
              }
            }
            if (void 0 !== a.rules) {
              try {
                for (b = 0;b < a.rules.length;b++) {
                  1 < c.length && (c += " " + a.groupOp + " "), c += this.getStringForRule(a.rules[b]);
                }
              } catch (d) {
                alert(d);
              }
            }
            c += ")";
            return "()" === c ? "" : c;
          };
          this.getStringForRule = function(c) {
            var b = "", d = "", f, g;
            for (f = 0;f < this.p.ops.length;f++) {
              if (this.p.ops[f].oper === c.op) {
                b = this.p.operands.hasOwnProperty(c.op) ? this.p.operands[c.op] : "";
                d = this.p.ops[f].oper;
                break;
              }
            }
            for (f = 0;f < this.p.columns.length;f++) {
              if (this.p.columns[f].name === c.field) {
                g = this.p.columns[f];
                break;
              }
            }
            if (void 0 == g) {
              return "";
            }
            f = c.data;
            if ("bw" === d || "bn" === d) {
              f += "%";
            }
            if ("ew" === d || "en" === d) {
              f = "%" + f;
            }
            if ("cn" === d || "nc" === d) {
              f = "%" + f + "%";
            }
            if ("in" === d || "ni" === d) {
              f = " (" + f + ")";
            }
            e.errorcheck && l(c.data, g);
            return -1 !== a.inArray(g.searchtype, ["int", "integer", "float", "number", "currency"]) || "nn" === d || "nu" === d ? c.field + " " + b + " " + f : c.field + " " + b + ' "' + f + '"';
          };
          this.resetFilter = function() {
            this.p.filter = a.extend(!0, {}, this.p.initFilter);
            this.reDraw();
            this.onchange();
          };
          this.hideError = function() {
            a("th.ui-state-error", this).html("");
            a("tr.error", this).hide();
          };
          this.showError = function() {
            a("th.ui-state-error", this).html(this.p.errmsg);
            a("tr.error", this).show();
          };
          this.toUserFriendlyString = function() {
            return this.getStringForGroup(e.filter);
          };
          this.toString = function() {
            function a(b) {
              var e = "(", d;
              if (void 0 !== b.groups) {
                for (d = 0;d < b.groups.length;d++) {
                  1 < e.length && (e = "OR" === b.groupOp ? e + " || " : e + " && "), e += a(b.groups[d]);
                }
              }
              if (void 0 !== b.rules) {
                for (d = 0;d < b.rules.length;d++) {
                  1 < e.length && (e = "OR" === b.groupOp ? e + " || " : e + " && ");
                  var f = b.rules[d];
                  if (c.p.errorcheck) {
                    for (var g = void 0, h = void 0, g = 0;g < c.p.columns.length;g++) {
                      if (c.p.columns[g].name === f.field) {
                        h = c.p.columns[g];
                        break;
                      }
                    }
                    h && l(f.data, h);
                  }
                  e += f.op + "(item." + f.field + ",'" + f.data + "')";
                }
              }
              e += ")";
              return "()" === e ? "" : e;
            }
            var c = this;
            return a(this.p.filter);
          };
          this.reDraw();
          if (this.p.showQuery) {
            this.onchange();
          }
          this.filter = !0;
        }
      }
    });
  };
  a.extend(a.fn.jqFilter, {toSQLString:function() {
    var a = "";
    this.each(function() {
      a = this.toUserFriendlyString();
    });
    return a;
  }, filterData:function() {
    var a;
    this.each(function() {
      a = this.p.filter;
    });
    return a;
  }, getParameter:function(a) {
    return void 0 !== a && this.p.hasOwnProperty(a) ? this.p[a] : this.p;
  }, resetFilter:function() {
    return this.each(function() {
      this.resetFilter();
    });
  }, addFilter:function(d) {
    "string" === typeof d && (d = a.jgrid.parse(d));
    this.each(function() {
      this.p.filter = d;
      this.reDraw();
      this.onchange();
    });
  }});
})(jQuery);
(function(a) {
  var d = {};
  a.jgrid.extend({searchGrid:function(d) {
    d = a.extend(!0, {recreateFilter:!1, drag:!0, sField:"searchField", sValue:"searchString", sOper:"searchOper", sFilter:"filters", loadDefaults:!0, beforeShowSearch:null, afterShowSearch:null, onInitializeSearch:null, afterRedraw:null, afterChange:null, closeAfterSearch:!1, closeAfterReset:!1, closeOnEscape:!1, searchOnEnter:!1, multipleSearch:!1, multipleGroup:!1, top:0, left:0, jqModal:!0, modal:!1, resize:!0, width:450, height:"auto", dataheight:"auto", showQuery:!1, errorcheck:!0, sopt:null, 
    stringResult:void 0, onClose:null, onSearch:null, onReset:null, toTop:!0, overlay:30, columns:[], tmplNames:null, tmplFilters:null, tmplLabel:" Template: ", showOnLoad:!1, layer:null, operands:{eq:"=", ne:"<>", lt:"<", le:"<=", gt:">", ge:">=", bw:"LIKE", bn:"NOT LIKE", "in":"IN", ni:"NOT IN", ew:"LIKE", en:"NOT LIKE", cn:"LIKE", nc:"NOT LIKE", nu:"IS NULL", nn:"ISNOT NULL"}}, a.jgrid.search, d || {});
    return this.each(function() {
      function c(c) {
        k = a(e).triggerHandler("jqGridFilterBeforeShow", [c]);
        void 0 === k && (k = !0);
        k && a.isFunction(d.beforeShowSearch) && (k = d.beforeShowSearch.call(e, c));
        k && (a.jgrid.viewModal("#" + a.jgrid.jqID(g.themodal), {gbox:"#gbox_" + a.jgrid.jqID(b), jqm:d.jqModal, modal:d.modal, overlay:d.overlay, toTop:d.toTop}), a(e).triggerHandler("jqGridFilterAfterShow", [c]), a.isFunction(d.afterShowSearch) && d.afterShowSearch.call(e, c));
      }
      var e = this;
      if (e.grid) {
        var b = "fbox_" + e.p.id, k = !0, h = !0, g = {themodal:"searchmod" + b, modalhead:"searchhd" + b, modalcontent:"searchcnt" + b, scrollelm:b}, l = e.p.postData[d.sFilter];
        "string" === typeof l && (l = a.jgrid.parse(l));
        !0 === d.recreateFilter && a("#" + a.jgrid.jqID(g.themodal)).remove();
        if (void 0 !== a("#" + a.jgrid.jqID(g.themodal))[0]) {
          c(a("#fbox_" + a.jgrid.jqID(+e.p.id)));
        } else {
          var m = a("<div><div id='" + b + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + a.jgrid.jqID(e.p.id)), n = "left", r = "";
          "rtl" === e.p.direction && (n = "right", r = " style='text-align:left'", m.attr("dir", "rtl"));
          var q = a.extend([], e.p.colModel), p = "<a id='" + b + "_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='ui-icon ui-icon-search'></span>" + d.Find + "</a>", t = "<a id='" + b + "_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='ui-icon ui-icon-arrowreturnthick-1-w'></span>" + d.Reset + "</a>", v = "", u = "", w, y = !1, x = -1;
          d.showQuery && (v = "<a id='" + b + "_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-comment'></span>Query</a>");
          d.columns.length ? (q = d.columns, x = 0, w = q[0].index || q[0].name) : a.each(q, function(a, c) {
            c.label || (c.label = e.p.colNames[a]);
            if (!y) {
              var b = void 0 === c.search ? !0 : c.search, d = !0 === c.hidden;
              if (c.searchoptions && !0 === c.searchoptions.searchhidden && b || b && !d) {
                y = !0, w = c.index || c.name, x = a;
              }
            }
          });
          if (!l && w || !1 === d.multipleSearch) {
            var B = "eq";
            0 <= x && q[x].searchoptions && q[x].searchoptions.sopt ? B = q[x].searchoptions.sopt[0] : d.sopt && d.sopt.length && (B = d.sopt[0]);
            l = {groupOp:"AND", rules:[{field:w, op:B, data:""}]};
          }
          y = !1;
          d.tmplNames && d.tmplNames.length && (y = !0, u = d.tmplLabel, u += "<select class='ui-template'>", u += "<option value='default'>Default</option>", a.each(d.tmplNames, function(a, c) {
            u += "<option value='" + a + "'>" + c + "</option>";
          }), u += "</select>");
          n = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + b + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton' style='text-align:" + n + "'>" + t + u + "</td><td class='EditButton' " + r + ">" + v + p + "</td></tr></tbody></table>";
          b = a.jgrid.jqID(b);
          a("#" + b).jqFilter({columns:q, filter:d.loadDefaults ? l : null, showQuery:d.showQuery, errorcheck:d.errorcheck, sopt:d.sopt, groupButton:d.multipleGroup, ruleButtons:d.multipleSearch, afterRedraw:d.afterRedraw, ops:d.odata, operands:d.operands, ajaxSelectOptions:e.p.ajaxSelectOptions, groupOps:d.groupOps, onChange:function() {
            this.p.showQuery && a(".query", this).html(this.toUserFriendlyString());
            a.isFunction(d.afterChange) && d.afterChange.call(e, a("#" + b), d);
          }, direction:e.p.direction, id:e.p.id});
          m.append(n);
          y && d.tmplFilters && d.tmplFilters.length && a(".ui-template", m).bind("change", function() {
            var c = a(this).val();
            "default" === c ? a("#" + b).jqFilter("addFilter", l) : a("#" + b).jqFilter("addFilter", d.tmplFilters[parseInt(c, 10)]);
            return !1;
          });
          !0 === d.multipleGroup && (d.multipleSearch = !0);
          a(e).triggerHandler("jqGridFilterInitialize", [a("#" + b)]);
          a.isFunction(d.onInitializeSearch) && d.onInitializeSearch.call(e, a("#" + b));
          d.gbox = "#gbox_" + b;
          d.layer ? a.jgrid.createModal(g, m, d, "#gview_" + a.jgrid.jqID(e.p.id), a("#gbox_" + a.jgrid.jqID(e.p.id))[0], "#" + a.jgrid.jqID(d.layer), {position:"relative"}) : a.jgrid.createModal(g, m, d, "#gview_" + a.jgrid.jqID(e.p.id), a("#gbox_" + a.jgrid.jqID(e.p.id))[0]);
          (d.searchOnEnter || d.closeOnEscape) && a("#" + a.jgrid.jqID(g.themodal)).keydown(function(c) {
            var e = a(c.target);
            if (!(!d.searchOnEnter || 13 !== c.which || e.hasClass("add-group") || e.hasClass("add-rule") || e.hasClass("delete-group") || e.hasClass("delete-rule") || e.hasClass("fm-button") && e.is("[id$=_query]"))) {
              return a("#" + b + "_search").click(), !1;
            }
            if (d.closeOnEscape && 27 === c.which) {
              return a("#" + a.jgrid.jqID(g.modalhead)).find(".ui-jqdialog-titlebar-close").click(), !1;
            }
          });
          v && a("#" + b + "_query").bind("click", function() {
            a(".queryresult", m).toggle();
            return !1;
          });
          void 0 === d.stringResult && (d.stringResult = d.multipleSearch);
          a("#" + b + "_search").bind("click", function() {
            var c = a("#" + b), k = {}, l, m;
            c.find(".input-elm:focus").change();
            m = c.jqFilter("filterData");
            if (d.errorcheck && (c[0].hideError(), d.showQuery || c.jqFilter("toSQLString"), c[0].p.error)) {
              return c[0].showError(), !1;
            }
            if (d.stringResult) {
              try {
                l = xmlJsonClass.toJson(m, "", "", !1);
              } catch (q) {
                try {
                  l = JSON.stringify(m);
                } catch (n) {
                }
              }
              "string" === typeof l && (k[d.sFilter] = l, a.each([d.sField, d.sValue, d.sOper], function() {
                k[this] = "";
              }));
            } else {
              d.multipleSearch ? (k[d.sFilter] = m, a.each([d.sField, d.sValue, d.sOper], function() {
                k[this] = "";
              })) : (k[d.sField] = m.rules[0].field, k[d.sValue] = m.rules[0].data, k[d.sOper] = m.rules[0].op, k[d.sFilter] = "");
            }
            e.p.search = !0;
            a.extend(e.p.postData, k);
            h = a(e).triggerHandler("jqGridFilterSearch");
            void 0 === h && (h = !0);
            h && a.isFunction(d.onSearch) && (h = d.onSearch.call(e, e.p.filters));
            !1 !== h && a(e).trigger("reloadGrid", [{page:1}]);
            d.closeAfterSearch && a.jgrid.hideModal("#" + a.jgrid.jqID(g.themodal), {gb:"#gbox_" + a.jgrid.jqID(e.p.id), jqm:d.jqModal, onClose:d.onClose});
            return !1;
          });
          a("#" + b + "_reset").bind("click", function() {
            var c = {}, k = a("#" + b);
            e.p.search = !1;
            e.p.resetsearch = !0;
            !1 === d.multipleSearch ? c[d.sField] = c[d.sValue] = c[d.sOper] = "" : c[d.sFilter] = "";
            k[0].resetFilter();
            y && a(".ui-template", m).val("default");
            a.extend(e.p.postData, c);
            h = a(e).triggerHandler("jqGridFilterReset");
            void 0 === h && (h = !0);
            h && a.isFunction(d.onReset) && (h = d.onReset.call(e));
            !1 !== h && a(e).trigger("reloadGrid", [{page:1}]);
            d.closeAfterReset && a.jgrid.hideModal("#" + a.jgrid.jqID(g.themodal), {gb:"#gbox_" + a.jgrid.jqID(e.p.id), jqm:d.jqModal, onClose:d.onClose});
            return !1;
          });
          c(a("#" + b));
          a(".fm-button:not(.ui-state-disabled)", m).hover(function() {
            a(this).addClass("ui-state-hover");
          }, function() {
            a(this).removeClass("ui-state-hover");
          });
        }
      }
    });
  }, editGridRow:function(f, c) {
    c = a.extend(!0, {top:0, left:0, width:300, datawidth:"auto", height:"auto", dataheight:"auto", modal:!1, overlay:30, drag:!0, resize:!0, url:null, mtype:"POST", clearAfterAdd:!0, closeAfterEdit:!1, reloadAfterSubmit:!0, onInitializeForm:null, beforeInitData:null, beforeShowForm:null, afterShowForm:null, beforeSubmit:null, afterSubmit:null, onclickSubmit:null, afterComplete:null, onclickPgButtons:null, afterclickPgButtons:null, editData:{}, recreateForm:!1, jqModal:!0, closeOnEscape:!1, addedrow:"first", 
    topinfo:"", bottominfo:"", saveicon:[], closeicon:[], savekey:[!1, 13], navkeys:[!1, 38, 40], checkOnSubmit:!1, checkOnUpdate:!1, _savedData:{}, processing:!1, onClose:null, ajaxEditOptions:{}, serializeEditData:null, viewPagerButtons:!0, overlayClass:"ui-widget-overlay"}, a.jgrid.edit, c || {});
    d[a(this)[0].p.id] = c;
    return this.each(function() {
      function e() {
        a(w + " > tbody > tr > td > .FormElement").each(function() {
          var c = a(".customelement", this);
          if (c.length) {
            var b = a(c[0]).attr("name");
            a.each(p.p.colModel, function() {
              if (this.name === b && this.editoptions && a.isFunction(this.editoptions.custom_value)) {
                try {
                  if (z[b] = this.editoptions.custom_value.call(p, a("#" + a.jgrid.jqID(b), w), "get"), void 0 === z[b]) {
                    throw "e1";
                  }
                } catch (c) {
                  "e1" === c ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, c.message, a.jgrid.edit.bClose);
                }
                return !0;
              }
            });
          } else {
            switch(a(this).get(0).type) {
              case "checkbox":
                a(this).is(":checked") ? z[this.name] = a(this).val() : (c = a(this).attr("offval"), z[this.name] = c);
                break;
              case "select-one":
                z[this.name] = a("option:selected", this).val();
                break;
              case "select-multiple":
                z[this.name] = a(this).val();
                z[this.name] = z[this.name] ? z[this.name].join(",") : "";
                a("option:selected", this).each(function(c, b) {
                  a(b).text();
                });
                break;
              case "password":
              ;
              case "text":
              ;
              case "textarea":
              ;
              case "button":
                z[this.name] = a(this).val();
            }
            p.p.autoencode && (z[this.name] = a.jgrid.htmlEncode(z[this.name]));
          }
        });
        return !0;
      }
      function b(c, b, e, f) {
        var g, h, k, l = 0, m, q, n, r = [], t = !1, u = "", w;
        for (w = 1;w <= f;w++) {
          u += "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>";
        }
        "_empty" !== c && (t = a(b).jqGrid("getInd", c));
        a(b.p.colModel).each(function(w) {
          g = this.name;
          q = (h = this.editrules && !0 === this.editrules.edithidden ? !1 : !0 === this.hidden ? !0 : !1) ? "style='display:none'" : "";
          if ("cb" !== g && "subgrid" !== g && !0 === this.editable && "rn" !== g) {
            if (!1 === t) {
              m = "";
            } else {
              if (g === b.p.ExpandColumn && !0 === b.p.treeGrid) {
                m = a("td[role='gridcell']:eq(" + w + ")", b.rows[t]).text();
              } else {
                try {
                  m = a.unformat.call(b, a("td[role='gridcell']:eq(" + w + ")", b.rows[t]), {rowId:c, colModel:this}, w);
                } catch (y) {
                  m = this.edittype && "textarea" === this.edittype ? a("td[role='gridcell']:eq(" + w + ")", b.rows[t]).text() : a("td[role='gridcell']:eq(" + w + ")", b.rows[t]).html();
                }
                if (!m || "&nbsp;" === m || "&#160;" === m || 1 === m.length && 160 === m.charCodeAt(0)) {
                  m = "";
                }
              }
            }
            var x = a.extend({}, this.editoptions || {}, {id:g, name:g}), D = a.extend({}, {elmprefix:"", elmsuffix:"", rowabove:!1, rowcontent:""}, this.formoptions || {}), U = parseInt(D.rowpos, 10) || l + 1, B = parseInt(2 * (parseInt(D.colpos, 10) || 1), 10);
            "_empty" === c && x.defaultValue && (m = a.isFunction(x.defaultValue) ? x.defaultValue.call(p) : x.defaultValue);
            this.edittype || (this.edittype = "text");
            p.p.autoencode && (m = a.jgrid.htmlDecode(m));
            n = a.jgrid.createEl.call(p, this.edittype, x, m, !1, a.extend({}, a.jgrid.ajaxOptions, b.p.ajaxSelectOptions || {}));
            if (d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) {
              d[p.p.id]._savedData[g] = m;
            }
            a(n).addClass("FormElement");
            -1 < a.inArray(this.edittype, ["text", "textarea", "password", "select"]) && a(n).addClass("ui-widget-content ui-corner-all");
            k = a(e).find("tr[rowpos=" + U + "]");
            if (D.rowabove) {
              var C = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + D.rowcontent + "</td></tr>");
              a(e).append(C);
              C[0].rp = U;
            }
            0 === k.length && (k = a("<tr " + q + " rowpos='" + U + "'></tr>").addClass("FormData").attr("id", "tr_" + g), a(k).append(u), a(e).append(k), k[0].rp = U);
            a("td:eq(" + (B - 2) + ")", k[0]).html(void 0 === D.label ? b.p.colNames[w] : D.label);
            a("td:eq(" + (B - 1) + ")", k[0]).append(D.elmprefix).append(n).append(D.elmsuffix);
            "custom" === this.edittype && a.isFunction(x.custom_value) && x.custom_value.call(p, a("#" + g, "#" + v), "set", m);
            a.jgrid.bindEv.call(p, n, x);
            r[l] = w;
            l++;
          }
        });
        0 < l && (w = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + b.p.id + "_id' value='" + c + "'/></td></tr>"), w[0].rp = l + 999, a(e).append(w), d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) && (d[p.p.id]._savedData[b.p.id + "_id"] = c);
        return r;
      }
      function k(c, b, e) {
        var f, g = 0, h, k, l, m, q;
        if (d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) {
          d[p.p.id]._savedData = {}, d[p.p.id]._savedData[b.p.id + "_id"] = c;
        }
        var n = b.p.colModel;
        if ("_empty" === c) {
          a(n).each(function() {
            f = this.name;
            l = a.extend({}, this.editoptions || {});
            (k = a("#" + a.jgrid.jqID(f), "#" + e)) && k.length && null !== k[0] && (m = "", "custom" === this.edittype && a.isFunction(l.custom_value) ? l.custom_value.call(p, a("#" + f, "#" + e), "set", m) : l.defaultValue ? (m = a.isFunction(l.defaultValue) ? l.defaultValue.call(p) : l.defaultValue, "checkbox" === k[0].type ? (q = m.toLowerCase(), 0 > q.search(/(false|f|0|no|n|off|undefined)/i) && "" !== q ? (k[0].checked = !0, k[0].defaultChecked = !0, k[0].value = m) : (k[0].checked = !1, k[0].defaultChecked = 
            !1)) : k.val(m)) : "checkbox" === k[0].type ? (k[0].checked = !1, k[0].defaultChecked = !1, m = a(k).attr("offval")) : k[0].type && "select" === k[0].type.substr(0, 6) ? k[0].selectedIndex = 0 : k.val(m), !0 === d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) && (d[p.p.id]._savedData[f] = m);
          }), a("#id_g", "#" + e).val(c);
        } else {
          var r = a(b).jqGrid("getInd", c, !0);
          r && (a('td[role="gridcell"]', r).each(function(k) {
            f = n[k].name;
            if ("cb" !== f && "subgrid" !== f && "rn" !== f && !0 === n[k].editable) {
              if (f === b.p.ExpandColumn && !0 === b.p.treeGrid) {
                h = a(this).text();
              } else {
                try {
                  h = a.unformat.call(b, a(this), {rowId:c, colModel:n[k]}, k);
                } catch (l) {
                  h = "textarea" === n[k].edittype ? a(this).text() : a(this).html();
                }
              }
              p.p.autoencode && (h = a.jgrid.htmlDecode(h));
              if (!0 === d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) {
                d[p.p.id]._savedData[f] = h;
              }
              f = a.jgrid.jqID(f);
              switch(n[k].edittype) {
                case "password":
                ;
                case "text":
                ;
                case "button":
                ;
                case "image":
                ;
                case "textarea":
                  if ("&nbsp;" === h || "&#160;" === h || 1 === h.length && 160 === h.charCodeAt(0)) {
                    h = "";
                  }
                  a("#" + f, "#" + e).val(h);
                  break;
                case "select":
                  var m = h.split(","), m = a.map(m, function(c) {
                    return a.trim(c);
                  });
                  a("#" + f + " option", "#" + e).each(function() {
                    n[k].editoptions.multiple || a.trim(h) !== a.trim(a(this).text()) && m[0] !== a.trim(a(this).text()) && m[0] !== a.trim(a(this).val()) ? n[k].editoptions.multiple ? -1 < a.inArray(a.trim(a(this).text()), m) || -1 < a.inArray(a.trim(a(this).val()), m) ? this.selected = !0 : this.selected = !1 : this.selected = !1 : this.selected = !0;
                  });
                  break;
                case "checkbox":
                  h = String(h);
                  if (n[k].editoptions && n[k].editoptions.value) {
                    if (n[k].editoptions.value.split(":")[0] === h) {
                      a("#" + f, "#" + e)[p.p.useProp ? "prop" : "attr"]({checked:!0, defaultChecked:!0});
                    } else {
                      a("#" + f, "#" + e)[p.p.useProp ? "prop" : "attr"]({checked:!1, defaultChecked:!1});
                    }
                  } else {
                    h = h.toLowerCase(), 0 > h.search(/(false|f|0|no|n|off|undefined)/i) && "" !== h ? (a("#" + f, "#" + e)[p.p.useProp ? "prop" : "attr"]("checked", !0), a("#" + f, "#" + e)[p.p.useProp ? "prop" : "attr"]("defaultChecked", !0)) : (a("#" + f, "#" + e)[p.p.useProp ? "prop" : "attr"]("checked", !1), a("#" + f, "#" + e)[p.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                  }
                  break;
                case "custom":
                  try {
                    if (n[k].editoptions && a.isFunction(n[k].editoptions.custom_value)) {
                      n[k].editoptions.custom_value.call(p, a("#" + f, "#" + e), "set", h);
                    } else {
                      throw "e1";
                    }
                  } catch (q) {
                    "e1" === q ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, q.message, a.jgrid.edit.bClose);
                  }
                ;
              }
              g++;
            }
          }), 0 < g && a("#id_g", w).val(c));
        }
      }
      function h() {
        a.each(p.p.colModel, function(a, c) {
          c.editoptions && !0 === c.editoptions.NullIfEmpty && z.hasOwnProperty(c.name) && "" === z[c.name] && (z[c.name] = "null");
        });
      }
      function g() {
        var b, e = [!0, "", ""], f = {}, g = p.p.prmNames, l, m, q, n, r, u = a(p).triggerHandler("jqGridAddEditBeforeCheckValues", [a("#" + v), L]);
        u && "object" === typeof u && (z = u);
        a.isFunction(d[p.p.id].beforeCheckValues) && (u = d[p.p.id].beforeCheckValues.call(p, z, a("#" + v), L)) && "object" === typeof u && (z = u);
        for (q in z) {
          if (z.hasOwnProperty(q) && (e = a.jgrid.checkValues.call(p, z[q], q), !1 === e[0])) {
            break;
          }
        }
        h();
        e[0] && (f = a(p).triggerHandler("jqGridAddEditClickSubmit", [d[p.p.id], z, L]), void 0 === f && a.isFunction(d[p.p.id].onclickSubmit) && (f = d[p.p.id].onclickSubmit.call(p, d[p.p.id], z, L) || {}), e = a(p).triggerHandler("jqGridAddEditBeforeSubmit", [z, a("#" + v), L]), void 0 === e && (e = [!0, "", ""]), e[0] && a.isFunction(d[p.p.id].beforeSubmit) && (e = d[p.p.id].beforeSubmit.call(p, z, a("#" + v), L)));
        if (e[0] && !d[p.p.id].processing) {
          d[p.p.id].processing = !0;
          a("#sData", w + "_2").addClass("ui-state-active");
          m = g.oper;
          l = g.id;
          z[m] = "_empty" === a.trim(z[p.p.id + "_id"]) ? g.addoper : g.editoper;
          z[m] !== g.addoper ? z[l] = z[p.p.id + "_id"] : void 0 === z[l] && (z[l] = z[p.p.id + "_id"]);
          delete z[p.p.id + "_id"];
          z = a.extend(z, d[p.p.id].editData, f);
          if (!0 === p.p.treeGrid) {
            for (r in z[m] === g.addoper && (n = a(p).jqGrid("getGridParam", "selrow"), z["adjacency" === p.p.treeGridModel ? p.p.treeReader.parent_id_field : "parent_id"] = n), p.p.treeReader) {
              p.p.treeReader.hasOwnProperty(r) && (f = p.p.treeReader[r], !z.hasOwnProperty(f) || z[m] === g.addoper && "parent_id_field" === r || delete z[f]);
            }
          }
          z[l] = a.jgrid.stripPref(p.p.idPrefix, z[l]);
          r = a.extend({url:d[p.p.id].url || a(p).jqGrid("getGridParam", "editurl"), type:d[p.p.id].mtype, data:a.isFunction(d[p.p.id].serializeEditData) ? d[p.p.id].serializeEditData.call(p, z) : z, complete:function(f, h) {
            var q;
            z[l] = p.p.idPrefix + z[l];
            300 <= f.status && 304 !== f.status ? (e[0] = !1, e[1] = a(p).triggerHandler("jqGridAddEditErrorTextFormat", [f, L]), a.isFunction(d[p.p.id].errorTextFormat) ? e[1] = d[p.p.id].errorTextFormat.call(p, f, L) : e[1] = h + " Status: '" + f.statusText + "'. Error code: " + f.status) : (e = a(p).triggerHandler("jqGridAddEditAfterSubmit", [f, z, L]), void 0 === e && (e = [!0, "", ""]), e[0] && a.isFunction(d[p.p.id].afterSubmit) && (e = d[p.p.id].afterSubmit.call(p, f, z, L)));
            if (!1 === e[0]) {
              a("#FormError>td", w).html(e[1]), a("#FormError", w).show();
            } else {
              if (p.p.autoencode && a.each(z, function(c, b) {
                z[c] = a.jgrid.htmlDecode(b);
              }), z[m] === g.addoper ? (e[2] || (e[2] = a.jgrid.randId()), z[l] = e[2], d[p.p.id].reloadAfterSubmit ? a(p).trigger("reloadGrid") : !0 === p.p.treeGrid ? a(p).jqGrid("addChildNode", e[2], n, z) : a(p).jqGrid("addRowData", e[2], z, c.addedrow), d[p.p.id].closeAfterAdd ? (!0 !== p.p.treeGrid && a(p).jqGrid("setSelection", e[2]), a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose})) : d[p.p.id].clearAfterAdd && k("_empty", 
              p, v)) : (d[p.p.id].reloadAfterSubmit ? (a(p).trigger("reloadGrid"), d[p.p.id].closeAfterEdit || setTimeout(function() {
                a(p).jqGrid("setSelection", z[l]);
              }, 1E3)) : !0 === p.p.treeGrid ? a(p).jqGrid("setTreeRow", z[l], z) : a(p).jqGrid("setRowData", z[l], z), d[p.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose})), a.isFunction(d[p.p.id].afterComplete) && (b = f, setTimeout(function() {
                a(p).triggerHandler("jqGridAddEditAfterComplete", [b, z, a("#" + v), L]);
                d[p.p.id].afterComplete.call(p, b, z, a("#" + v), L);
                b = null;
              }, 500)), d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) {
                if (a("#" + v).data("disabled", !1), "_empty" !== d[p.p.id]._savedData[p.p.id + "_id"]) {
                  for (q in d[p.p.id]._savedData) {
                    d[p.p.id]._savedData.hasOwnProperty(q) && z[q] && (d[p.p.id]._savedData[q] = z[q]);
                  }
                }
              }
            }
            d[p.p.id].processing = !1;
            a("#sData", w + "_2").removeClass("ui-state-active");
            try {
              a(":input:visible", "#" + v)[0].focus();
            } catch (r) {
            }
          }}, a.jgrid.ajaxOptions, d[p.p.id].ajaxEditOptions);
          r.url || d[p.p.id].useDataProxy || (a.isFunction(p.p.dataProxy) ? d[p.p.id].useDataProxy = !0 : (e[0] = !1, e[1] += " " + a.jgrid.errors.nourl));
          e[0] && (d[p.p.id].useDataProxy ? (f = p.p.dataProxy.call(p, r, "set_" + p.p.id), void 0 === f && (f = [!0, ""]), !1 === f[0] ? (e[0] = !1, e[1] = f[1] || "Error deleting the selected row!") : (r.data.oper === g.addoper && d[p.p.id].closeAfterAdd && a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose}), r.data.oper === g.editoper && d[p.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + 
          a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose}))) : a.ajax(r));
        }
        !1 === e[0] && (a("#FormError>td", w).html(e[1]), a("#FormError", w).show());
      }
      function l(a, c) {
        var b = !1, e;
        for (e in a) {
          if (a.hasOwnProperty(e) && a[e] != c[e]) {
            b = !0;
            break;
          }
        }
        return b;
      }
      function m() {
        var c = !0;
        a("#FormError", w).hide();
        d[p.p.id].checkOnUpdate && (z = {}, e(), P = l(z, d[p.p.id]._savedData)) && (a("#" + v).data("disabled", !0), a(".confirm", "#" + y.themodal).show(), c = !1);
        return c;
      }
      function n() {
        var c;
        if ("_empty" !== f && void 0 !== p.p.savedRow && 0 < p.p.savedRow.length && a.isFunction(a.fn.jqGrid.restoreRow)) {
          for (c = 0;c < p.p.savedRow.length;c++) {
            if (p.p.savedRow[c].id == f) {
              a(p).jqGrid("restoreRow", f);
              break;
            }
          }
        }
      }
      function r(c, b) {
        var e = b[1].length - 1;
        0 === c ? a("#pData", w + "_2").addClass("ui-state-disabled") : void 0 !== b[1][c - 1] && a("#" + a.jgrid.jqID(b[1][c - 1])).hasClass("ui-state-disabled") ? a("#pData", w + "_2").addClass("ui-state-disabled") : a("#pData", w + "_2").removeClass("ui-state-disabled");
        c === e ? a("#nData", w + "_2").addClass("ui-state-disabled") : void 0 !== b[1][c + 1] && a("#" + a.jgrid.jqID(b[1][c + 1])).hasClass("ui-state-disabled") ? a("#nData", w + "_2").addClass("ui-state-disabled") : a("#nData", w + "_2").removeClass("ui-state-disabled");
      }
      function q() {
        var c = a(p).jqGrid("getDataIDs"), b = a("#id_g", w).val();
        return [a.inArray(b, c), c];
      }
      var p = this;
      if (p.grid && f) {
        var t = p.p.id, v = "FrmGrid_" + t, u = "TblGrid_" + t, w = "#" + a.jgrid.jqID(u), y = {themodal:"editmod" + t, modalhead:"edithd" + t, modalcontent:"editcnt" + t, scrollelm:v}, x = a.isFunction(d[p.p.id].beforeShowForm) ? d[p.p.id].beforeShowForm : !1, B = a.isFunction(d[p.p.id].afterShowForm) ? d[p.p.id].afterShowForm : !1, C = a.isFunction(d[p.p.id].beforeInitData) ? d[p.p.id].beforeInitData : !1, O = a.isFunction(d[p.p.id].onInitializeForm) ? d[p.p.id].onInitializeForm : !1, D = !0, K = 
        1, H = 0, z, P, L, v = a.jgrid.jqID(v);
        "new" === f ? (f = "_empty", L = "add", c.caption = d[p.p.id].addCaption) : (c.caption = d[p.p.id].editCaption, L = "edit");
        c.recreateForm || a(p).data("formProp") && a.extend(d[a(this)[0].p.id], a(p).data("formProp"));
        var ha = !0;
        c.checkOnUpdate && c.jqModal && !c.modal && (ha = !1);
        var ca = isNaN(d[a(this)[0].p.id].dataheight) ? d[a(this)[0].p.id].dataheight : d[a(this)[0].p.id].dataheight + "px", D = isNaN(d[a(this)[0].p.id].datawidth) ? d[a(this)[0].p.id].datawidth : d[a(this)[0].p.id].datawidth + "px", ca = a("<form name='FormPost' id='" + v + "' class='FormGrid' onSubmit='return false;' style='width:" + D + ";overflow:auto;position:relative;height:" + ca + ";'></form>").data("disabled", !1), da = a("<table id='" + u + "' class='EditTable' cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), 
        D = a(p).triggerHandler("jqGridAddEditBeforeInitData", [a("#" + v), L]);
        void 0 === D && (D = !0);
        D && C && (D = C.call(p, a("#" + v), L));
        if (!1 !== D) {
          n();
          a(p.p.colModel).each(function() {
            var a = this.formoptions;
            K = Math.max(K, a ? a.colpos || 0 : 0);
            H = Math.max(H, a ? a.rowpos || 0 : 0);
          });
          a(ca).append(da);
          C = a("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='" + 2 * K + "'></td></tr>");
          C[0].rp = 0;
          a(da).append(C);
          C = a("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='" + 2 * K + "'>" + d[p.p.id].topinfo + "</td></tr>");
          C[0].rp = 0;
          a(da).append(C);
          var D = (C = "rtl" === p.p.direction ? !0 : !1) ? "nData" : "pData", S = C ? "pData" : "nData";
          b(f, p, da, K);
          var D = "<a id='" + D + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>", S = "<a id='" + S + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>", ja = "<a id='sData' class='fm-button ui-state-default ui-corner-all'>" + c.bSubmit + "</a>", fa = "<a id='cData' class='fm-button ui-state-default ui-corner-all'>" + c.bCancel + "</a>", u = "<table border='0' cellspacing='0' cellpadding='0' class='EditTable' id='" + 
          u + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (C ? S + D : D + S) + "</td><td class='EditButton'>" + ja + fa + "</td></tr>" + ("<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>" + d[p.p.id].bottominfo + "</td></tr>"), u = u + "</tbody></table>";
          if (0 < H) {
            var V = [];
            a.each(a(da)[0].rows, function(a, c) {
              V[a] = c;
            });
            V.sort(function(a, c) {
              return a.rp > c.rp ? 1 : a.rp < c.rp ? -1 : 0;
            });
            a.each(V, function(c, b) {
              a("tbody", da).append(b);
            });
          }
          c.gbox = "#gbox_" + a.jgrid.jqID(t);
          var ea = !1;
          !0 === c.closeOnEscape && (c.closeOnEscape = !1, ea = !0);
          u = a("<div></div>").append(ca).append(u);
          a.jgrid.createModal(y, u, d[a(this)[0].p.id], "#gview_" + a.jgrid.jqID(p.p.id), a("#gbox_" + a.jgrid.jqID(p.p.id))[0]);
          C && (a("#pData, #nData", w + "_2").css("float", "right"), a(".EditButton", w + "_2").css("text-align", "left"));
          d[p.p.id].topinfo && a(".tinfo", w).show();
          d[p.p.id].bottominfo && a(".binfo", w + "_2").show();
          u = u = null;
          a("#" + a.jgrid.jqID(y.themodal)).keydown(function(b) {
            var e = b.target;
            if (!0 === a("#" + v).data("disabled")) {
              return !1;
            }
            if (!0 === d[p.p.id].savekey[0] && b.which === d[p.p.id].savekey[1] && "TEXTAREA" !== e.tagName) {
              return a("#sData", w + "_2").trigger("click"), !1;
            }
            if (27 === b.which) {
              if (!m()) {
                return !1;
              }
              ea && a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:c.gbox, jqm:c.jqModal, onClose:d[p.p.id].onClose});
              return !1;
            }
            if (!0 === d[p.p.id].navkeys[0]) {
              if ("_empty" === a("#id_g", w).val()) {
                return !0;
              }
              if (b.which === d[p.p.id].navkeys[1]) {
                return a("#pData", w + "_2").trigger("click"), !1;
              }
              if (b.which === d[p.p.id].navkeys[2]) {
                return a("#nData", w + "_2").trigger("click"), !1;
              }
            }
          });
          c.checkOnUpdate && (a("a.ui-jqdialog-titlebar-close span", "#" + a.jgrid.jqID(y.themodal)).removeClass("jqmClose"), a("a.ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(y.themodal)).unbind("click").click(function() {
            if (!m()) {
              return !1;
            }
            a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose});
            return !1;
          }));
          c.saveicon = a.extend([!0, "left", "ui-icon-disk"], c.saveicon);
          c.closeicon = a.extend([!0, "left", "ui-icon-close"], c.closeicon);
          !0 === c.saveicon[0] && a("#sData", w + "_2").addClass("right" === c.saveicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.saveicon[2] + "'></span>");
          !0 === c.closeicon[0] && a("#cData", w + "_2").addClass("right" === c.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.closeicon[2] + "'></span>");
          if (d[p.p.id].checkOnSubmit || d[p.p.id].checkOnUpdate) {
            ja = "<a id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + c.bYes + "</a>", S = "<a id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + c.bNo + "</a>", fa = "<a id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + c.bExit + "</a>", u = c.zIndex || 999, u++, a("<div class='" + c.overlayClass + " jqgrid-overlay confirm' style='z-index:" + u + ";display:none;'>&#160;</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:" + 
            (u + 1) + "'>" + c.saveData + "<br/><br/>" + ja + S + fa + "</div>").insertAfter("#" + v), a("#sNew", "#" + a.jgrid.jqID(y.themodal)).click(function() {
              g();
              a("#" + v).data("disabled", !1);
              a(".confirm", "#" + a.jgrid.jqID(y.themodal)).hide();
              return !1;
            }), a("#nNew", "#" + a.jgrid.jqID(y.themodal)).click(function() {
              a(".confirm", "#" + a.jgrid.jqID(y.themodal)).hide();
              a("#" + v).data("disabled", !1);
              setTimeout(function() {
                a(":input:visible", "#" + v)[0].focus();
              }, 0);
              return !1;
            }), a("#cNew", "#" + a.jgrid.jqID(y.themodal)).click(function() {
              a(".confirm", "#" + a.jgrid.jqID(y.themodal)).hide();
              a("#" + v).data("disabled", !1);
              a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose});
              return !1;
            });
          }
          a(p).triggerHandler("jqGridAddEditInitializeForm", [a("#" + v), L]);
          O && O.call(p, a("#" + v), L);
          "_empty" !== f && d[p.p.id].viewPagerButtons ? a("#pData,#nData", w + "_2").show() : a("#pData,#nData", w + "_2").hide();
          a(p).triggerHandler("jqGridAddEditBeforeShowForm", [a("#" + v), L]);
          x && x.call(p, a("#" + v), L);
          a("#" + a.jgrid.jqID(y.themodal)).data("onClose", d[p.p.id].onClose);
          a.jgrid.viewModal("#" + a.jgrid.jqID(y.themodal), {gbox:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, overlay:c.overlay, modal:c.modal, overlayClass:c.overlayClass, onHide:function(c) {
            a(p).data("formProp", {top:parseFloat(a(c.w).css("top")), left:parseFloat(a(c.w).css("left")), width:a(c.w).width(), height:a(c.w).height(), dataheight:a("#" + v).height(), datawidth:a("#" + v).width()});
            c.w.remove();
            c.o && c.o.remove();
          }});
          ha || a("." + a.jgrid.jqID(c.overlayClass)).click(function() {
            if (!m()) {
              return !1;
            }
            a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose});
            return !1;
          });
          a(".fm-button", "#" + a.jgrid.jqID(y.themodal)).hover(function() {
            a(this).addClass("ui-state-hover");
          }, function() {
            a(this).removeClass("ui-state-hover");
          });
          a("#sData", w + "_2").click(function() {
            z = {};
            a("#FormError", w).hide();
            e();
            "_empty" === z[p.p.id + "_id"] ? g() : !0 === c.checkOnSubmit ? (P = l(z, d[p.p.id]._savedData)) ? (a("#" + v).data("disabled", !0), a(".confirm", "#" + a.jgrid.jqID(y.themodal)).show()) : g() : g();
            return !1;
          });
          a("#cData", w + "_2").click(function() {
            if (!m()) {
              return !1;
            }
            a.jgrid.hideModal("#" + a.jgrid.jqID(y.themodal), {gb:"#gbox_" + a.jgrid.jqID(t), jqm:c.jqModal, onClose:d[p.p.id].onClose});
            return !1;
          });
          a("#nData", w + "_2").click(function() {
            if (!m()) {
              return !1;
            }
            a("#FormError", w).hide();
            var b = q();
            b[0] = parseInt(b[0], 10);
            if (-1 !== b[0] && b[1][b[0] + 1]) {
              a(p).triggerHandler("jqGridAddEditClickPgButtons", ["next", a("#" + v), b[1][b[0]]]);
              var e;
              if (a.isFunction(c.onclickPgButtons) && (e = c.onclickPgButtons.call(p, "next", a("#" + v), b[1][b[0]]), void 0 !== e && !1 === e) || a("#" + a.jgrid.jqID(b[1][b[0] + 1])).hasClass("ui-state-disabled")) {
                return !1;
              }
              k(b[1][b[0] + 1], p, v);
              a(p).jqGrid("setSelection", b[1][b[0] + 1]);
              a(p).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", a("#" + v), b[1][b[0]]]);
              a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(p, "next", a("#" + v), b[1][b[0] + 1]);
              r(b[0] + 1, b);
            }
            return !1;
          });
          a("#pData", w + "_2").click(function() {
            if (!m()) {
              return !1;
            }
            a("#FormError", w).hide();
            var b = q();
            if (-1 !== b[0] && b[1][b[0] - 1]) {
              a(p).triggerHandler("jqGridAddEditClickPgButtons", ["prev", a("#" + v), b[1][b[0]]]);
              var e;
              if (a.isFunction(c.onclickPgButtons) && (e = c.onclickPgButtons.call(p, "prev", a("#" + v), b[1][b[0]]), void 0 !== e && !1 === e) || a("#" + a.jgrid.jqID(b[1][b[0] - 1])).hasClass("ui-state-disabled")) {
                return !1;
              }
              k(b[1][b[0] - 1], p, v);
              a(p).jqGrid("setSelection", b[1][b[0] - 1]);
              a(p).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", a("#" + v), b[1][b[0]]]);
              a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(p, "prev", a("#" + v), b[1][b[0] - 1]);
              r(b[0] - 1, b);
            }
            return !1;
          });
          a(p).triggerHandler("jqGridAddEditAfterShowForm", [a("#" + v), L]);
          B && B.call(p, a("#" + v), L);
          x = q();
          r(x[0], x);
        }
      }
    });
  }, viewGridRow:function(f, c) {
    c = a.extend(!0, {top:0, left:0, width:0, datawidth:"auto", height:"auto", dataheight:"auto", modal:!1, overlay:30, drag:!0, resize:!0, jqModal:!0, closeOnEscape:!1, labelswidth:"30%", closeicon:[], navkeys:[!1, 38, 40], onClose:null, beforeShowForm:null, beforeInitData:null, viewPagerButtons:!0, recreateForm:!1}, a.jgrid.view, c || {});
    d[a(this)[0].p.id] = c;
    return this.each(function() {
      function e() {
        !0 !== d[l.p.id].closeOnEscape && !0 !== d[l.p.id].navkeys[0] || setTimeout(function() {
          a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(t.modalhead)).focus();
        }, 0);
      }
      function b(b, e, d, f) {
        var g, h, k, l = 0, m, q, n = [], p = !1, r, t = "<td class='CaptionTD form-view-label ui-widget-content' width='" + c.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'>&#160;</td>", v = "", u = ["integer", "number", "currency"], w = 0, y = 0, x, B, C;
        for (r = 1;r <= f;r++) {
          v += 1 === r ? t : "<td class='CaptionTD form-view-label ui-widget-content'>&#160;</td><td class='DataTD form-view-data ui-widget-content'>&#160;</td>";
        }
        a(e.p.colModel).each(function() {
          (h = this.editrules && !0 === this.editrules.edithidden ? !1 : !0 === this.hidden ? !0 : !1) || "right" !== this.align || (this.formatter && -1 !== a.inArray(this.formatter, u) ? w = Math.max(w, parseInt(this.width, 10)) : y = Math.max(y, parseInt(this.width, 10)));
        });
        x = 0 !== w ? w : 0 !== y ? y : 0;
        p = a(e).jqGrid("getInd", b);
        a(e.p.colModel).each(function(c) {
          g = this.name;
          B = !1;
          q = (h = this.editrules && !0 === this.editrules.edithidden ? !1 : !0 === this.hidden ? !0 : !1) ? "style='display:none'" : "";
          C = "boolean" !== typeof this.viewable ? !0 : this.viewable;
          if ("cb" !== g && "subgrid" !== g && "rn" !== g && C) {
            m = !1 === p ? "" : g === e.p.ExpandColumn && !0 === e.p.treeGrid ? a("td:eq(" + c + ")", e.rows[p]).text() : a("td:eq(" + c + ")", e.rows[p]).html();
            B = "right" === this.align && 0 !== x ? !0 : !1;
            var b = a.extend({}, {rowabove:!1, rowcontent:""}, this.formoptions || {}), r = parseInt(b.rowpos, 10) || l + 1, t = parseInt(2 * (parseInt(b.colpos, 10) || 1), 10);
            if (b.rowabove) {
              var u = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + b.rowcontent + "</td></tr>");
              a(d).append(u);
              u[0].rp = r;
            }
            k = a(d).find("tr[rowpos=" + r + "]");
            0 === k.length && (k = a("<tr " + q + " rowpos='" + r + "'></tr>").addClass("FormData").attr("id", "trv_" + g), a(k).append(v), a(d).append(k), k[0].rp = r);
            a("td:eq(" + (t - 2) + ")", k[0]).html("<b>" + (void 0 === b.label ? e.p.colNames[c] : b.label) + "</b>");
            a("td:eq(" + (t - 1) + ")", k[0]).append("<span>" + m + "</span>").attr("id", "v_" + g);
            B && a("td:eq(" + (t - 1) + ") span", k[0]).css({"text-align":"right", width:x + "px"});
            n[l] = c;
            l++;
          }
        });
        0 < l && (b = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + b + "'/></td></tr>"), b[0].rp = l + 99, a(d).append(b));
        return n;
      }
      function k(c, b) {
        var e, d, f = 0, g, h;
        if (h = a(b).jqGrid("getInd", c, !0)) {
          a("td", h).each(function(c) {
            e = b.p.colModel[c].name;
            d = b.p.colModel[c].editrules && !0 === b.p.colModel[c].editrules.edithidden ? !1 : !0 === b.p.colModel[c].hidden ? !0 : !1;
            "cb" !== e && "subgrid" !== e && "rn" !== e && (g = e === b.p.ExpandColumn && !0 === b.p.treeGrid ? a(this).text() : a(this).html(), e = a.jgrid.jqID("v_" + e), a("#" + e + " span", "#" + r).html(g), d && a("#" + e, "#" + r).parents("tr:first").hide(), f++);
          }), 0 < f && a("#id_g", "#" + r).val(c);
        }
      }
      function h(c, b) {
        var e = b[1].length - 1;
        0 === c ? a("#pData", "#" + r + "_2").addClass("ui-state-disabled") : void 0 !== b[1][c - 1] && a("#" + a.jgrid.jqID(b[1][c - 1])).hasClass("ui-state-disabled") ? a("#pData", r + "_2").addClass("ui-state-disabled") : a("#pData", "#" + r + "_2").removeClass("ui-state-disabled");
        c === e ? a("#nData", "#" + r + "_2").addClass("ui-state-disabled") : void 0 !== b[1][c + 1] && a("#" + a.jgrid.jqID(b[1][c + 1])).hasClass("ui-state-disabled") ? a("#nData", r + "_2").addClass("ui-state-disabled") : a("#nData", "#" + r + "_2").removeClass("ui-state-disabled");
      }
      function g() {
        var c = a(l).jqGrid("getDataIDs"), b = a("#id_g", "#" + r).val();
        return [a.inArray(b, c), c];
      }
      var l = this;
      if (l.grid && f) {
        var m = l.p.id, n = "ViewGrid_" + a.jgrid.jqID(m), r = "ViewTbl_" + a.jgrid.jqID(m), q = "ViewGrid_" + m, p = "ViewTbl_" + m, t = {themodal:"viewmod" + m, modalhead:"viewhd" + m, modalcontent:"viewcnt" + m, scrollelm:n}, v = a.isFunction(d[l.p.id].beforeInitData) ? d[l.p.id].beforeInitData : !1, u = !0, w = 1, y = 0;
        c.recreateForm || a(l).data("viewProp") && a.extend(d[a(this)[0].p.id], a(l).data("viewProp"));
        var x = isNaN(d[a(this)[0].p.id].dataheight) ? d[a(this)[0].p.id].dataheight : d[a(this)[0].p.id].dataheight + "px", B = isNaN(d[a(this)[0].p.id].datawidth) ? d[a(this)[0].p.id].datawidth : d[a(this)[0].p.id].datawidth + "px", q = a("<form name='FormPost' id='" + q + "' class='FormGrid' style='width:" + B + ";overflow:auto;position:relative;height:" + x + ";'></form>"), C = a("<table id='" + p + "' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
        v && (u = v.call(l, a("#" + n)), void 0 === u && (u = !0));
        if (!1 !== u) {
          a(l.p.colModel).each(function() {
            var a = this.formoptions;
            w = Math.max(w, a ? a.colpos || 0 : 0);
            y = Math.max(y, a ? a.rowpos || 0 : 0);
          });
          a(q).append(C);
          b(f, l, C, w);
          p = "rtl" === l.p.direction ? !0 : !1;
          v = "<a id='" + (p ? "nData" : "pData") + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>";
          u = "<a id='" + (p ? "pData" : "nData") + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>";
          x = "<a id='cData' class='fm-button ui-state-default ui-corner-all'>" + c.bClose + "</a>";
          if (0 < y) {
            var O = [];
            a.each(a(C)[0].rows, function(a, c) {
              O[a] = c;
            });
            O.sort(function(a, c) {
              return a.rp > c.rp ? 1 : a.rp < c.rp ? -1 : 0;
            });
            a.each(O, function(c, b) {
              a("tbody", C).append(b);
            });
          }
          c.gbox = "#gbox_" + a.jgrid.jqID(m);
          q = a("<div></div>").append(q).append("<table border='0' class='EditTable' id='" + r + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + c.labelswidth + "'>" + (p ? u + v : v + u) + "</td><td class='EditButton'>" + x + "</td></tr></tbody></table>");
          a.jgrid.createModal(t, q, c, "#gview_" + a.jgrid.jqID(l.p.id), a("#gview_" + a.jgrid.jqID(l.p.id))[0]);
          p && (a("#pData, #nData", "#" + r + "_2").css("float", "right"), a(".EditButton", "#" + r + "_2").css("text-align", "left"));
          c.viewPagerButtons || a("#pData, #nData", "#" + r + "_2").hide();
          q = null;
          a("#" + t.themodal).keydown(function(b) {
            if (27 === b.which) {
              return d[l.p.id].closeOnEscape && a.jgrid.hideModal("#" + a.jgrid.jqID(t.themodal), {gb:c.gbox, jqm:c.jqModal, onClose:c.onClose}), !1;
            }
            if (!0 === c.navkeys[0]) {
              if (b.which === c.navkeys[1]) {
                return a("#pData", "#" + r + "_2").trigger("click"), !1;
              }
              if (b.which === c.navkeys[2]) {
                return a("#nData", "#" + r + "_2").trigger("click"), !1;
              }
            }
          });
          c.closeicon = a.extend([!0, "left", "ui-icon-close"], c.closeicon);
          !0 === c.closeicon[0] && a("#cData", "#" + r + "_2").addClass("right" === c.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.closeicon[2] + "'></span>");
          a.isFunction(c.beforeShowForm) && c.beforeShowForm.call(l, a("#" + n));
          a.jgrid.viewModal("#" + a.jgrid.jqID(t.themodal), {gbox:"#gbox_" + a.jgrid.jqID(m), jqm:c.jqModal, overlay:c.overlay, modal:c.modal, onHide:function(c) {
            a(l).data("viewProp", {top:parseFloat(a(c.w).css("top")), left:parseFloat(a(c.w).css("left")), width:a(c.w).width(), height:a(c.w).height(), dataheight:a("#" + n).height(), datawidth:a("#" + n).width()});
            c.w.remove();
            c.o && c.o.remove();
          }});
          a(".fm-button:not(.ui-state-disabled)", "#" + r + "_2").hover(function() {
            a(this).addClass("ui-state-hover");
          }, function() {
            a(this).removeClass("ui-state-hover");
          });
          e();
          a("#cData", "#" + r + "_2").click(function() {
            a.jgrid.hideModal("#" + a.jgrid.jqID(t.themodal), {gb:"#gbox_" + a.jgrid.jqID(m), jqm:c.jqModal, onClose:c.onClose});
            return !1;
          });
          a("#nData", "#" + r + "_2").click(function() {
            a("#FormError", "#" + r).hide();
            var b = g();
            b[0] = parseInt(b[0], 10);
            -1 !== b[0] && b[1][b[0] + 1] && (a.isFunction(c.onclickPgButtons) && c.onclickPgButtons.call(l, "next", a("#" + n), b[1][b[0]]), k(b[1][b[0] + 1], l), a(l).jqGrid("setSelection", b[1][b[0] + 1]), a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(l, "next", a("#" + n), b[1][b[0] + 1]), h(b[0] + 1, b));
            e();
            return !1;
          });
          a("#pData", "#" + r + "_2").click(function() {
            a("#FormError", "#" + r).hide();
            var b = g();
            -1 !== b[0] && b[1][b[0] - 1] && (a.isFunction(c.onclickPgButtons) && c.onclickPgButtons.call(l, "prev", a("#" + n), b[1][b[0]]), k(b[1][b[0] - 1], l), a(l).jqGrid("setSelection", b[1][b[0] - 1]), a.isFunction(c.afterclickPgButtons) && c.afterclickPgButtons.call(l, "prev", a("#" + n), b[1][b[0] - 1]), h(b[0] - 1, b));
            e();
            return !1;
          });
          q = g();
          h(q[0], q);
        }
      }
    });
  }, delGridRow:function(f, c) {
    c = a.extend(!0, {top:0, left:0, width:240, height:"auto", dataheight:"auto", modal:!1, overlay:30, drag:!0, resize:!0, url:"", mtype:"POST", reloadAfterSubmit:!0, beforeShowForm:null, beforeInitData:null, afterShowForm:null, beforeSubmit:null, onclickSubmit:null, afterSubmit:null, jqModal:!0, closeOnEscape:!1, delData:{}, delicon:[], cancelicon:[], onClose:null, ajaxDelOptions:{}, processing:!1, serializeDelData:null, useDataProxy:!1}, a.jgrid.del, c || {});
    d[a(this)[0].p.id] = c;
    return this.each(function() {
      var e = this;
      if (e.grid && f) {
        var b = a.isFunction(d[e.p.id].beforeShowForm), k = a.isFunction(d[e.p.id].afterShowForm), h = a.isFunction(d[e.p.id].beforeInitData) ? d[e.p.id].beforeInitData : !1, g = e.p.id, l = {}, m = !0, n = "DelTbl_" + a.jgrid.jqID(g), r, q, p, t, v = "DelTbl_" + g, u = {themodal:"delmod" + g, modalhead:"delhd" + g, modalcontent:"delcnt" + g, scrollelm:n};
        a.isArray(f) && (f = f.join());
        if (void 0 !== a("#" + a.jgrid.jqID(u.themodal))[0]) {
          h && (m = h.call(e, a("#" + n)), void 0 === m && (m = !0));
          if (!1 === m) {
            return;
          }
          a("#DelData>td", "#" + n).text(f);
          a("#DelError", "#" + n).hide();
          !0 === d[e.p.id].processing && (d[e.p.id].processing = !1, a("#dData", "#" + n).removeClass("ui-state-active"));
          b && d[e.p.id].beforeShowForm.call(e, a("#" + n));
          a.jgrid.viewModal("#" + a.jgrid.jqID(u.themodal), {gbox:"#gbox_" + a.jgrid.jqID(g), jqm:d[e.p.id].jqModal, jqM:!1, overlay:d[e.p.id].overlay, modal:d[e.p.id].modal});
        } else {
          var w = isNaN(d[e.p.id].dataheight) ? d[e.p.id].dataheight : d[e.p.id].dataheight + "px", y = isNaN(c.datawidth) ? c.datawidth : c.datawidth + "px", v = "<div id='" + v + "' class='formdata' style='width:" + y + ";overflow:auto;position:relative;height:" + w + ";'><table class='DelTable'><tbody>", v = v + "<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>", v = v + ("<tr id='DelData' style='display:none'><td >" + f + "</td></tr>"), v = v + ('<tr><td class="delmsg" style="white-space:pre;">' + 
          d[e.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>"), v = v + "</tbody></table></div>", v = v + ("<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='" + n + "_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" + ("<a id='dData' class='fm-button ui-state-default ui-corner-all'>" + c.bSubmit + "</a>") + "&#160;" + ("<a id='eData' class='fm-button ui-state-default ui-corner-all'>" + c.bCancel + "</a>") + 
          "</td></tr></tbody></table>");
          c.gbox = "#gbox_" + a.jgrid.jqID(g);
          a.jgrid.createModal(u, v, c, "#gview_" + a.jgrid.jqID(e.p.id), a("#gview_" + a.jgrid.jqID(e.p.id))[0]);
          h && (m = h.call(e, a("#" + n)), void 0 === m && (m = !0));
          if (!1 === m) {
            return;
          }
          a(".fm-button", "#" + n + "_2").hover(function() {
            a(this).addClass("ui-state-hover");
          }, function() {
            a(this).removeClass("ui-state-hover");
          });
          c.delicon = a.extend([!0, "left", "ui-icon-scissors"], d[e.p.id].delicon);
          c.cancelicon = a.extend([!0, "left", "ui-icon-cancel"], d[e.p.id].cancelicon);
          !0 === c.delicon[0] && a("#dData", "#" + n + "_2").addClass("right" === c.delicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.delicon[2] + "'></span>");
          !0 === c.cancelicon[0] && a("#eData", "#" + n + "_2").addClass("right" === c.cancelicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + c.cancelicon[2] + "'></span>");
          a("#dData", "#" + n + "_2").click(function() {
            var b = [!0, ""], f, h = a("#DelData>td", "#" + n).text();
            l = {};
            a.isFunction(d[e.p.id].onclickSubmit) && (l = d[e.p.id].onclickSubmit.call(e, d[e.p.id], h) || {});
            a.isFunction(d[e.p.id].beforeSubmit) && (b = d[e.p.id].beforeSubmit.call(e, h));
            if (b[0] && !d[e.p.id].processing) {
              d[e.p.id].processing = !0;
              p = e.p.prmNames;
              r = a.extend({}, d[e.p.id].delData, l);
              t = p.oper;
              r[t] = p.deloper;
              q = p.id;
              h = String(h).split(",");
              if (!h.length) {
                return !1;
              }
              for (f in h) {
                h.hasOwnProperty(f) && (h[f] = a.jgrid.stripPref(e.p.idPrefix, h[f]));
              }
              r[q] = h.join();
              a(this).addClass("ui-state-active");
              f = a.extend({url:d[e.p.id].url || a(e).jqGrid("getGridParam", "editurl"), type:d[e.p.id].mtype, data:a.isFunction(d[e.p.id].serializeDelData) ? d[e.p.id].serializeDelData.call(e, r) : r, complete:function(f, k) {
                var l;
                300 <= f.status && 304 !== f.status ? (b[0] = !1, a.isFunction(d[e.p.id].errorTextFormat) ? b[1] = d[e.p.id].errorTextFormat.call(e, f) : b[1] = k + " Status: '" + f.statusText + "'. Error code: " + f.status) : a.isFunction(d[e.p.id].afterSubmit) && (b = d[e.p.id].afterSubmit.call(e, f, r));
                if (!1 === b[0]) {
                  a("#DelError>td", "#" + n).html(b[1]), a("#DelError", "#" + n).show();
                } else {
                  if (d[e.p.id].reloadAfterSubmit && "local" !== e.p.datatype) {
                    a(e).trigger("reloadGrid");
                  } else {
                    if (!0 === e.p.treeGrid) {
                      try {
                        a(e).jqGrid("delTreeNode", e.p.idPrefix + h[0]);
                      } catch (m) {
                      }
                    } else {
                      for (l = 0;l < h.length;l++) {
                        a(e).jqGrid("delRowData", e.p.idPrefix + h[l]);
                      }
                    }
                    e.p.selrow = null;
                    e.p.selarrrow = [];
                  }
                  a.isFunction(d[e.p.id].afterComplete) && setTimeout(function() {
                    d[e.p.id].afterComplete.call(e, f, h);
                  }, 500);
                }
                d[e.p.id].processing = !1;
                a("#dData", "#" + n + "_2").removeClass("ui-state-active");
                b[0] && a.jgrid.hideModal("#" + a.jgrid.jqID(u.themodal), {gb:"#gbox_" + a.jgrid.jqID(g), jqm:c.jqModal, onClose:d[e.p.id].onClose});
              }}, a.jgrid.ajaxOptions, d[e.p.id].ajaxDelOptions);
              f.url || d[e.p.id].useDataProxy || (a.isFunction(e.p.dataProxy) ? d[e.p.id].useDataProxy = !0 : (b[0] = !1, b[1] += " " + a.jgrid.errors.nourl));
              b[0] && (d[e.p.id].useDataProxy ? (f = e.p.dataProxy.call(e, f, "del_" + e.p.id), void 0 === f && (f = [!0, ""]), !1 === f[0] ? (b[0] = !1, b[1] = f[1] || "Error deleting the selected row!") : a.jgrid.hideModal("#" + a.jgrid.jqID(u.themodal), {gb:"#gbox_" + a.jgrid.jqID(g), jqm:c.jqModal, onClose:d[e.p.id].onClose})) : a.ajax(f));
            }
            !1 === b[0] && (a("#DelError>td", "#" + n).html(b[1]), a("#DelError", "#" + n).show());
            return !1;
          });
          a("#eData", "#" + n + "_2").click(function() {
            a.jgrid.hideModal("#" + a.jgrid.jqID(u.themodal), {gb:"#gbox_" + a.jgrid.jqID(g), jqm:d[e.p.id].jqModal, onClose:d[e.p.id].onClose});
            return !1;
          });
          b && d[e.p.id].beforeShowForm.call(e, a("#" + n));
          a.jgrid.viewModal("#" + a.jgrid.jqID(u.themodal), {gbox:"#gbox_" + a.jgrid.jqID(g), jqm:d[e.p.id].jqModal, overlay:d[e.p.id].overlay, modal:d[e.p.id].modal});
        }
        k && d[e.p.id].afterShowForm.call(e, a("#" + n));
        !0 === d[e.p.id].closeOnEscape && setTimeout(function() {
          a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(u.modalhead)).focus();
        }, 0);
      }
    });
  }, navGrid:function(d, c, e, b, k, h, g) {
    c = a.extend({edit:!0, editicon:"ui-icon-pencil", add:!0, addicon:"ui-icon-plus", del:!0, delicon:"ui-icon-trash", search:!0, searchicon:"ui-icon-search", refresh:!0, refreshicon:"ui-icon-refresh", refreshstate:"firstpage", view:!1, viewicon:"ui-icon-document", position:"left", closeOnEscape:!0, beforeRefresh:null, afterRefresh:null, cloneToTop:!1, alertwidth:200, alertheight:"auto", alerttop:null, alertleft:null, alertzIndex:null}, a.jgrid.nav, c || {});
    return this.each(function() {
      if (!this.nav) {
        var l = {themodal:"alertmod_" + this.p.id, modalhead:"alerthd_" + this.p.id, modalcontent:"alertcnt_" + this.p.id}, m = this, n;
        if (m.grid && "string" === typeof d) {
          void 0 === a("#" + l.themodal)[0] && (c.alerttop || c.alertleft || (void 0 !== window.innerWidth ? (c.alertleft = window.innerWidth, c.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (c.alertleft = document.documentElement.clientWidth, c.alerttop = document.documentElement.clientHeight) : (c.alertleft = 1024, c.alerttop = 768), c.alertleft = c.alertleft / 2 - parseInt(c.alertwidth, 
          10) / 2, c.alerttop = c.alerttop / 2 - 25), a.jgrid.createModal(l, "<div>" + c.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {gbox:"#gbox_" + a.jgrid.jqID(m.p.id), jqModal:!0, drag:!0, resize:!0, caption:c.alertcap, top:c.alerttop, left:c.alertleft, width:c.alertwidth, height:c.alertheight, closeOnEscape:c.closeOnEscape, zIndex:c.alertzIndex}, "#gview_" + a.jgrid.jqID(m.p.id), a("#gbox_" + a.jgrid.jqID(m.p.id))[0], !0));
          var r = 1, q, p = function() {
            a(this).hasClass("ui-state-disabled") || a(this).addClass("ui-state-hover");
          }, t = function() {
            a(this).removeClass("ui-state-hover");
          };
          c.cloneToTop && m.p.toppager && (r = 2);
          for (q = 0;q < r;q++) {
            var v = a("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>"), u, w;
            0 === q ? (u = d, w = m.p.id, u === m.p.toppager && (w += "_top", r = 1)) : (u = m.p.toppager, w = m.p.id + "_top");
            "rtl" === m.p.direction && a(v).attr("dir", "rtl").css("float", "right");
            c.add && (b = b || {}, n = a("<td class='ui-pg-button ui-corner-all'></td>"), a(n).append("<div class='ui-pg-div'><span class='ui-icon " + c.addicon + "'></span>" + c.addtext + "</div>"), a("tr", v).append(n), a(n, v).attr({title:c.addtitle || "", id:b.id || "add_" + w}).click(function() {
              a(this).hasClass("ui-state-disabled") || (a.isFunction(c.addfunc) ? c.addfunc.call(m) : a(m).jqGrid("editGridRow", "new", b));
              return !1;
            }).hover(p, t), n = null);
            c.edit && (n = a("<td class='ui-pg-button ui-corner-all'></td>"), e = e || {}, a(n).append("<div class='ui-pg-div'><span class='ui-icon " + c.editicon + "'></span>" + c.edittext + "</div>"), a("tr", v).append(n), a(n, v).attr({title:c.edittitle || "", id:e.id || "edit_" + w}).click(function() {
              if (!a(this).hasClass("ui-state-disabled")) {
                var b = m.p.selrow;
                b ? a.isFunction(c.editfunc) ? c.editfunc.call(m, b) : a(m).jqGrid("editGridRow", b, e) : (a.jgrid.viewModal("#" + l.themodal, {gbox:"#gbox_" + a.jgrid.jqID(m.p.id), jqm:!0}), a("#jqg_alrt").focus());
              }
              return !1;
            }).hover(p, t), n = null);
            c.view && (n = a("<td class='ui-pg-button ui-corner-all'></td>"), g = g || {}, a(n).append("<div class='ui-pg-div'><span class='ui-icon " + c.viewicon + "'></span>" + c.viewtext + "</div>"), a("tr", v).append(n), a(n, v).attr({title:c.viewtitle || "", id:g.id || "view_" + w}).click(function() {
              if (!a(this).hasClass("ui-state-disabled")) {
                var b = m.p.selrow;
                b ? a.isFunction(c.viewfunc) ? c.viewfunc.call(m, b) : a(m).jqGrid("viewGridRow", b, g) : (a.jgrid.viewModal("#" + l.themodal, {gbox:"#gbox_" + a.jgrid.jqID(m.p.id), jqm:!0}), a("#jqg_alrt").focus());
              }
              return !1;
            }).hover(p, t), n = null);
            c.del && (n = a("<td class='ui-pg-button ui-corner-all'></td>"), k = k || {}, a(n).append("<div class='ui-pg-div'><span class='ui-icon " + c.delicon + "'></span>" + c.deltext + "</div>"), a("tr", v).append(n), a(n, v).attr({title:c.deltitle || "", id:k.id || "del_" + w}).click(function() {
              if (!a(this).hasClass("ui-state-disabled")) {
                var b;
                m.p.multiselect ? (b = m.p.selarrrow, 0 === b.length && (b = null)) : b = m.p.selrow;
                b ? a.isFunction(c.delfunc) ? c.delfunc.call(m, b) : a(m).jqGrid("delGridRow", b, k) : (a.jgrid.viewModal("#" + l.themodal, {gbox:"#gbox_" + a.jgrid.jqID(m.p.id), jqm:!0}), a("#jqg_alrt").focus());
              }
              return !1;
            }).hover(p, t), n = null);
            (c.add || c.edit || c.del || c.view) && a("tr", v).append("<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>");
            c.search && (n = a("<td class='ui-pg-button ui-corner-all'></td>"), h = h || {}, a(n).append("<div class='ui-pg-div'><span class='ui-icon " + c.searchicon + "'></span>" + c.searchtext + "</div>"), a("tr", v).append(n), a(n, v).attr({title:c.searchtitle || "", id:h.id || "search_" + w}).click(function() {
              a(this).hasClass("ui-state-disabled") || (a.isFunction(c.searchfunc) ? c.searchfunc.call(m, h) : a(m).jqGrid("searchGrid", h));
              return !1;
            }).hover(p, t), h.showOnLoad && !0 === h.showOnLoad && a(n, v).click(), n = null);
            c.refresh && (n = a("<td class='ui-pg-button ui-corner-all'></td>"), a(n).append("<div class='ui-pg-div'><span class='ui-icon " + c.refreshicon + "'></span>" + c.refreshtext + "</div>"), a("tr", v).append(n), a(n, v).attr({title:c.refreshtitle || "", id:"refresh_" + w}).click(function() {
              if (!a(this).hasClass("ui-state-disabled")) {
                a.isFunction(c.beforeRefresh) && c.beforeRefresh.call(m);
                m.p.search = !1;
                m.p.resetsearch = !0;
                try {
                  var b = m.p.id;
                  m.p.postData.filters = "";
                  try {
                    a("#fbox_" + a.jgrid.jqID(b)).jqFilter("resetFilter");
                  } catch (e) {
                  }
                  a.isFunction(m.clearToolbar) && m.clearToolbar.call(m, !1);
                } catch (d) {
                }
                switch(c.refreshstate) {
                  case "firstpage":
                    a(m).trigger("reloadGrid", [{page:1}]);
                    break;
                  case "current":
                    a(m).trigger("reloadGrid", [{current:!0}]);
                }
                a.isFunction(c.afterRefresh) && c.afterRefresh.call(m);
              }
              return !1;
            }).hover(p, t), n = null);
            n = a(".ui-jqgrid").css("font-size") || "11px";
            a("body").append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + n + ";visibility:hidden;' ></div>");
            n = a(v).clone().appendTo("#testpg2").width();
            a("#testpg2").remove();
            a(u + "_" + c.position, u).append(v);
            m.p._nvtd && (n > m.p._nvtd[0] && (a(u + "_" + c.position, u).width(n), m.p._nvtd[0] = n), m.p._nvtd[1] = n);
            v = n = n = null;
            this.nav = !0;
          }
        }
      }
    });
  }, navButtonAdd:function(d, c) {
    c = a.extend({caption:"newButton", title:"", buttonicon:"ui-icon-newwin", onClickButton:null, position:"last", cursor:"pointer"}, c || {});
    return this.each(function() {
      if (this.grid) {
        "string" === typeof d && 0 !== d.indexOf("#") && (d = "#" + a.jgrid.jqID(d));
        var e = a(".navtable", d)[0], b = this;
        if (e && (!c.id || void 0 === a("#" + a.jgrid.jqID(c.id), e)[0])) {
          var k = a("<td></td>");
          "NONE" === c.buttonicon.toString().toUpperCase() ? a(k).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'>" + c.caption + "</div>") : a(k).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'><span class='ui-icon " + c.buttonicon + "'></span>" + c.caption + "</div>");
          c.id && a(k).attr("id", c.id);
          "first" === c.position ? 0 === e.rows[0].cells.length ? a("tr", e).append(k) : a("tr td:eq(0)", e).before(k) : a("tr", e).append(k);
          a(k, e).attr("title", c.title || "").click(function(e) {
            a(this).hasClass("ui-state-disabled") || a.isFunction(c.onClickButton) && c.onClickButton.call(b, e);
            return !1;
          }).hover(function() {
            a(this).hasClass("ui-state-disabled") || a(this).addClass("ui-state-hover");
          }, function() {
            a(this).removeClass("ui-state-hover");
          });
        }
      }
    });
  }, navSeparatorAdd:function(d, c) {
    c = a.extend({sepclass:"ui-separator", sepcontent:"", position:"last"}, c || {});
    return this.each(function() {
      if (this.grid) {
        "string" === typeof d && 0 !== d.indexOf("#") && (d = "#" + a.jgrid.jqID(d));
        var e = a(".navtable", d)[0];
        if (e) {
          var b = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='" + c.sepclass + "'></span>" + c.sepcontent + "</td>";
          "first" === c.position ? 0 === e.rows[0].cells.length ? a("tr", e).append(b) : a("tr td:eq(0)", e).before(b) : a("tr", e).append(b);
        }
      }
    });
  }, GridToForm:function(d, c) {
    return this.each(function() {
      var e = this, b;
      if (e.grid) {
        var k = a(e).jqGrid("getRowData", d);
        if (k) {
          for (b in k) {
            k.hasOwnProperty(b) && (a("[name=" + a.jgrid.jqID(b) + "]", c).is("input:radio") || a("[name=" + a.jgrid.jqID(b) + "]", c).is("input:checkbox") ? a("[name=" + a.jgrid.jqID(b) + "]", c).each(function() {
              if (a(this).val() == k[b]) {
                a(this)[e.p.useProp ? "prop" : "attr"]("checked", !0);
              } else {
                a(this)[e.p.useProp ? "prop" : "attr"]("checked", !1);
              }
            }) : a("[name=" + a.jgrid.jqID(b) + "]", c).val(k[b]));
          }
        }
      }
    });
  }, FormToGrid:function(d, c, e, b) {
    return this.each(function() {
      if (this.grid) {
        e || (e = "set");
        b || (b = "first");
        var k = a(c).serializeArray(), h = {};
        a.each(k, function(a, c) {
          h[c.name] = c.value;
        });
        "add" === e ? a(this).jqGrid("addRowData", d, h, b) : "set" === e && a(this).jqGrid("setRowData", d, h);
      }
    });
  }});
})(jQuery);
(function(a) {
  a.jgrid.inlineEdit = a.jgrid.inlineEdit || {};
  a.jgrid.extend({editRow:function(d, f, c, e, b, k, h, g, l) {
    var m = {}, n = a.makeArray(arguments).slice(1);
    "object" === a.type(n[0]) ? m = n[0] : (void 0 !== f && (m.keys = f), a.isFunction(c) && (m.oneditfunc = c), a.isFunction(e) && (m.successfunc = e), void 0 !== b && (m.url = b), void 0 !== k && (m.extraparam = k), a.isFunction(h) && (m.aftersavefunc = h), a.isFunction(g) && (m.errorfunc = g), a.isFunction(l) && (m.afterrestorefunc = l));
    m = a.extend(!0, {keys:!1, oneditfunc:null, successfunc:null, url:null, extraparam:{}, aftersavefunc:null, errorfunc:null, afterrestorefunc:null, restoreAfterError:!0, mtype:"POST"}, a.jgrid.inlineEdit, m);
    return this.each(function() {
      var c = this, b, e, f, g = 0, h = null, k = {}, l, n;
      c.grid && (l = a(c).jqGrid("getInd", d, !0), !1 !== l && (f = a.isFunction(m.beforeEditRow) ? m.beforeEditRow.call(c, m, d) : void 0, void 0 === f && (f = !0), f && (f = a(l).attr("editable") || "0", "0" !== f || a(l).hasClass("not-editable-row") || (n = c.p.colModel, a('td[role="gridcell"]', l).each(function(f) {
        b = n[f].name;
        var l = !0 === c.p.treeGrid && b === c.p.ExpandColumn;
        if (l) {
          e = a("span:first", this).html();
        } else {
          try {
            e = a.unformat.call(c, this, {rowId:d, colModel:n[f]}, f);
          } catch (m) {
            e = n[f].edittype && "textarea" === n[f].edittype ? a(this).text() : a(this).html();
          }
        }
        if ("cb" !== b && "subgrid" !== b && "rn" !== b && (c.p.autoencode && (e = a.jgrid.htmlDecode(e)), k[b] = e, !0 === n[f].editable)) {
          null === h && (h = f);
          l ? a("span:first", this).html("") : a(this).html("");
          var t = a.extend({}, n[f].editoptions || {}, {id:d + "_" + b, name:b});
          n[f].edittype || (n[f].edittype = "text");
          if ("&nbsp;" === e || "&#160;" === e || 1 === e.length && 160 === e.charCodeAt(0)) {
            e = "";
          }
          var y = a.jgrid.createEl.call(c, n[f].edittype, t, e, !0, a.extend({}, a.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {}));
          a(y).addClass("editable");
          l ? a("span:first", this).append(y) : a(this).append(y);
          a.jgrid.bindEv.call(c, y, t);
          "select" === n[f].edittype && void 0 !== n[f].editoptions && !0 === n[f].editoptions.multiple && void 0 === n[f].editoptions.dataUrl && a.jgrid.msie && a(y).width(a(y).width());
          g++;
        }
      }), 0 < g && (k.id = d, c.p.savedRow.push(k), a(l).attr("editable", "1"), setTimeout(function() {
        a("td:eq(" + h + ") input", l).focus();
      }, 0), !0 === m.keys && a(l).bind("keydown", function(b) {
        if (27 === b.keyCode) {
          a(c).jqGrid("restoreRow", d, m.afterrestorefunc);
          if (c.p._inlinenav) {
            try {
              a(c).jqGrid("showAddEditButtons");
            } catch (e) {
            }
          }
          return !1;
        }
        if (13 === b.keyCode) {
          if ("TEXTAREA" === b.target.tagName) {
            return !0;
          }
          if (a(c).jqGrid("saveRow", d, m) && c.p._inlinenav) {
            try {
              a(c).jqGrid("showAddEditButtons");
            } catch (f) {
            }
          }
          return !1;
        }
      }), a(c).triggerHandler("jqGridInlineEditRow", [d, m]), a.isFunction(m.oneditfunc) && m.oneditfunc.call(c, d))))));
    });
  }, saveRow:function(d, f, c, e, b, k, h) {
    var g = a.makeArray(arguments).slice(1), l = {};
    "object" === a.type(g[0]) ? l = g[0] : (a.isFunction(f) && (l.successfunc = f), void 0 !== c && (l.url = c), void 0 !== e && (l.extraparam = e), a.isFunction(b) && (l.aftersavefunc = b), a.isFunction(k) && (l.errorfunc = k), a.isFunction(h) && (l.afterrestorefunc = h));
    var l = a.extend(!0, {successfunc:null, url:null, extraparam:{}, aftersavefunc:null, errorfunc:null, afterrestorefunc:null, restoreAfterError:!0, mtype:"POST"}, a.jgrid.inlineEdit, l), m = !1, n = this[0], r, q = {}, p = {}, t = {}, v, u, w;
    if (!n.grid) {
      return m;
    }
    w = a(n).jqGrid("getInd", d, !0);
    if (!1 === w) {
      return m;
    }
    g = a.isFunction(l.beforeSaveRow) ? l.beforeSaveRow.call(n, l, d) : void 0;
    void 0 === g && (g = !0);
    if (g) {
      g = a(w).attr("editable");
      l.url = l.url || n.p.editurl;
      if ("1" === g) {
        var y;
        a('td[role="gridcell"]', w).each(function(c) {
          y = n.p.colModel[c];
          r = y.name;
          if ("cb" !== r && "subgrid" !== r && !0 === y.editable && "rn" !== r && !a(this).hasClass("not-editable-cell")) {
            switch(y.edittype) {
              case "checkbox":
                var b = ["Yes", "No"];
                y.editoptions && (b = y.editoptions.value.split(":"));
                q[r] = a("input", this).is(":checked") ? b[0] : b[1];
                break;
              case "text":
              ;
              case "password":
              ;
              case "textarea":
              ;
              case "button":
                q[r] = a("input, textarea", this).val();
                break;
              case "select":
                if (y.editoptions.multiple) {
                  var b = a("select", this), e = [];
                  q[r] = a(b).val();
                  q[r] = q[r] ? q[r].join(",") : "";
                  a("select option:selected", this).each(function(c, b) {
                    e[c] = a(b).text();
                  });
                  p[r] = e.join(",");
                } else {
                  q[r] = a("select option:selected", this).val(), p[r] = a("select option:selected", this).text();
                }
                y.formatter && "select" === y.formatter && (p = {});
                break;
              case "custom":
                try {
                  if (y.editoptions && a.isFunction(y.editoptions.custom_value)) {
                    if (q[r] = y.editoptions.custom_value.call(n, a(".customelement", this), "get"), void 0 === q[r]) {
                      throw "e2";
                    }
                  } else {
                    throw "e1";
                  }
                } catch (d) {
                  "e1" === d && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === d ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, d.message, a.jgrid.edit.bClose);
                }
              ;
            }
            u = a.jgrid.checkValues.call(n, q[r], c);
            if (!1 === u[0]) {
              return !1;
            }
            n.p.autoencode && (q[r] = a.jgrid.htmlEncode(q[r]));
            "clientArray" !== l.url && y.editoptions && !0 === y.editoptions.NullIfEmpty && "" === q[r] && (t[r] = "null");
          }
        });
        if (!1 === u[0]) {
          try {
            var x = a(n).jqGrid("getGridRowById", d), B = a.jgrid.findPos(x);
            a.jgrid.info_dialog(a.jgrid.errors.errcap, u[1], a.jgrid.edit.bClose, {left:B[0], top:B[1] + a(x).outerHeight()});
          } catch (C) {
            alert(u[1]);
          }
          return m;
        }
        g = n.p.prmNames;
        x = d;
        B = !1 === n.p.keyIndex ? g.id : n.p.colModel[n.p.keyIndex + (!0 === n.p.rownumbers ? 1 : 0) + (!0 === n.p.multiselect ? 1 : 0) + (!0 === n.p.subGrid ? 1 : 0)].name;
        q && (q[g.oper] = g.editoper, void 0 === q[B] || "" === q[B] ? q[B] = d : w.id !== n.p.idPrefix + q[B] && (g = a.jgrid.stripPref(n.p.idPrefix, d), void 0 !== n.p._index[g] && (n.p._index[q[B]] = n.p._index[g], delete n.p._index[g]), d = n.p.idPrefix + q[B], a(w).attr("id", d), n.p.selrow === x && (n.p.selrow = d), a.isArray(n.p.selarrrow) && (g = a.inArray(x, n.p.selarrrow), 0 <= g && (n.p.selarrrow[g] = d)), n.p.multiselect && (g = "jqg_" + n.p.id + "_" + d, a("input.cbox", w).attr("id", 
        g).attr("name", g))), void 0 === n.p.inlineData && (n.p.inlineData = {}), q = a.extend({}, q, n.p.inlineData, l.extraparam));
        if ("clientArray" === l.url) {
          q = a.extend({}, q, p);
          n.p.autoencode && a.each(q, function(c, b) {
            q[c] = a.jgrid.htmlDecode(b);
          });
          g = a(n).jqGrid("setRowData", d, q);
          a(w).attr("editable", "0");
          for (B = 0;B < n.p.savedRow.length;B++) {
            if (String(n.p.savedRow[B].id) === String(x)) {
              v = B;
              break;
            }
          }
          0 <= v && n.p.savedRow.splice(v, 1);
          a(n).triggerHandler("jqGridInlineAfterSaveRow", [d, g, q, l]);
          a.isFunction(l.aftersavefunc) && l.aftersavefunc.call(n, d, g, l);
          m = !0;
          a(w).removeClass("jqgrid-new-row").unbind("keydown");
        } else {
          a("#lui_" + a.jgrid.jqID(n.p.id)).show(), t = a.extend({}, q, t), t[B] = a.jgrid.stripPref(n.p.idPrefix, t[B]), a.ajax(a.extend({url:l.url, data:a.isFunction(n.p.serializeRowData) ? n.p.serializeRowData.call(n, t) : t, type:l.mtype, async:!1, complete:function(c, b) {
            a("#lui_" + a.jgrid.jqID(n.p.id)).hide();
            if ("success" === b) {
              var e = !0, f;
              f = a(n).triggerHandler("jqGridInlineSuccessSaveRow", [c, d, l]);
              a.isArray(f) || (f = [!0, q]);
              f[0] && a.isFunction(l.successfunc) && (f = l.successfunc.call(n, c));
              a.isArray(f) ? (e = f[0], q = f[1] || q) : e = f;
              if (!0 === e) {
                n.p.autoencode && a.each(q, function(c, b) {
                  q[c] = a.jgrid.htmlDecode(b);
                });
                q = a.extend({}, q, p);
                a(n).jqGrid("setRowData", d, q);
                a(w).attr("editable", "0");
                for (e = 0;e < n.p.savedRow.length;e++) {
                  if (String(n.p.savedRow[e].id) === String(d)) {
                    v = e;
                    break;
                  }
                }
                0 <= v && n.p.savedRow.splice(v, 1);
                a(n).triggerHandler("jqGridInlineAfterSaveRow", [d, c, q, l]);
                a.isFunction(l.aftersavefunc) && l.aftersavefunc.call(n, d, c);
                m = !0;
                a(w).removeClass("jqgrid-new-row").unbind("keydown");
              } else {
                a(n).triggerHandler("jqGridInlineErrorSaveRow", [d, c, b, null, l]), a.isFunction(l.errorfunc) && l.errorfunc.call(n, d, c, b, null), !0 === l.restoreAfterError && a(n).jqGrid("restoreRow", d, l.afterrestorefunc);
              }
            }
          }, error:function(c, b, e) {
            a("#lui_" + a.jgrid.jqID(n.p.id)).hide();
            a(n).triggerHandler("jqGridInlineErrorSaveRow", [d, c, b, e, l]);
            if (a.isFunction(l.errorfunc)) {
              l.errorfunc.call(n, d, c, b, e);
            } else {
              c = c.responseText || c.statusText;
              try {
                a.jgrid.info_dialog(a.jgrid.errors.errcap, '<div class="ui-state-error">' + c + "</div>", a.jgrid.edit.bClose, {buttonalign:"right"});
              } catch (f) {
                alert(c);
              }
            }
            !0 === l.restoreAfterError && a(n).jqGrid("restoreRow", d, l.afterrestorefunc);
          }}, a.jgrid.ajaxOptions, n.p.ajaxRowOptions || {}));
        }
      }
      return m;
    }
  }, restoreRow:function(d, f) {
    var c = a.makeArray(arguments).slice(1), e = {};
    "object" === a.type(c[0]) ? e = c[0] : a.isFunction(f) && (e.afterrestorefunc = f);
    e = a.extend(!0, {}, a.jgrid.inlineEdit, e);
    return this.each(function() {
      var c = this, f = -1, h, g = {}, l;
      if (c.grid && (h = a(c).jqGrid("getInd", d, !0), !1 !== h && (l = a.isFunction(e.beforeCancelRow) ? e.beforeCancelRow.call(c, e, sr) : void 0, void 0 === l && (l = !0), l))) {
        for (l = 0;l < c.p.savedRow.length;l++) {
          if (String(c.p.savedRow[l].id) === String(d)) {
            f = l;
            break;
          }
        }
        if (0 <= f) {
          if (a.isFunction(a.fn.datepicker)) {
            try {
              a("input.hasDatepicker", "#" + a.jgrid.jqID(h.id)).datepicker("hide");
            } catch (m) {
            }
          }
          a.each(c.p.colModel, function() {
            !0 === this.editable && c.p.savedRow[f].hasOwnProperty(this.name) && (g[this.name] = c.p.savedRow[f][this.name]);
          });
          a(c).jqGrid("setRowData", d, g);
          a(h).attr("editable", "0").unbind("keydown");
          c.p.savedRow.splice(f, 1);
          a("#" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(c.p.id)).hasClass("jqgrid-new-row") && setTimeout(function() {
            a(c).jqGrid("delRowData", d);
            a(c).jqGrid("showAddEditButtons");
          }, 0);
        }
        a(c).triggerHandler("jqGridInlineAfterRestoreRow", [d]);
        a.isFunction(e.afterrestorefunc) && e.afterrestorefunc.call(c, d);
      }
    });
  }, addRow:function(d) {
    d = a.extend(!0, {rowID:null, initdata:{}, position:"first", useDefValues:!0, useFormatter:!1, addRowParams:{extraparam:{}}}, d || {});
    return this.each(function() {
      if (this.grid) {
        var f = this, c = a.isFunction(d.beforeAddRow) ? d.beforeAddRow.call(f, d.addRowParams) : void 0;
        void 0 === c && (c = !0);
        c && (d.rowID = a.isFunction(d.rowID) ? d.rowID.call(f, d) : null != d.rowID ? d.rowID : a.jgrid.randId(), !0 === d.useDefValues && a(f.p.colModel).each(function() {
          if (this.editoptions && this.editoptions.defaultValue) {
            var c = this.editoptions.defaultValue, c = a.isFunction(c) ? c.call(f) : c;
            d.initdata[this.name] = c;
          }
        }), a(f).jqGrid("addRowData", d.rowID, d.initdata, d.position), d.rowID = f.p.idPrefix + d.rowID, a("#" + a.jgrid.jqID(d.rowID), "#" + a.jgrid.jqID(f.p.id)).addClass("jqgrid-new-row"), d.useFormatter ? a("#" + a.jgrid.jqID(d.rowID) + " .ui-inline-edit", "#" + a.jgrid.jqID(f.p.id)).click() : (c = f.p.prmNames, d.addRowParams.extraparam[c.oper] = c.addoper, a(f).jqGrid("editRow", d.rowID, d.addRowParams), a(f).jqGrid("setSelection", d.rowID)));
      }
    });
  }, inlineNav:function(d, f) {
    f = a.extend(!0, {edit:!0, editicon:"ui-icon-pencil", add:!0, addicon:"ui-icon-plus", save:!0, saveicon:"ui-icon-disk", cancel:!0, cancelicon:"ui-icon-cancel", addParams:{addRowParams:{extraparam:{}}}, editParams:{}, restoreAfterSelect:!0}, a.jgrid.nav, f || {});
    return this.each(function() {
      if (this.grid) {
        var c = this, e, b = a.jgrid.jqID(c.p.id);
        c.p._inlinenav = !0;
        if (!0 === f.addParams.useFormatter) {
          var k = c.p.colModel, h;
          for (h = 0;h < k.length;h++) {
            if (k[h].formatter && "actions" === k[h].formatter) {
              k[h].formatoptions && (k = a.extend({keys:!1, onEdit:null, onSuccess:null, afterSave:null, onError:null, afterRestore:null, extraparam:{}, url:null}, k[h].formatoptions), f.addParams.addRowParams = {keys:k.keys, oneditfunc:k.onEdit, successfunc:k.onSuccess, url:k.url, extraparam:k.extraparam, aftersavefunc:k.afterSave, errorfunc:k.onError, afterrestorefunc:k.afterRestore});
              break;
            }
          }
        }
        f.add && a(c).jqGrid("navButtonAdd", d, {caption:f.addtext, title:f.addtitle, buttonicon:f.addicon, id:c.p.id + "_iladd", onClickButton:function() {
          a(c).jqGrid("addRow", f.addParams);
          f.addParams.useFormatter || (a("#" + b + "_ilsave").removeClass("ui-state-disabled"), a("#" + b + "_ilcancel").removeClass("ui-state-disabled"), a("#" + b + "_iladd").addClass("ui-state-disabled"), a("#" + b + "_iledit").addClass("ui-state-disabled"));
        }});
        f.edit && a(c).jqGrid("navButtonAdd", d, {caption:f.edittext, title:f.edittitle, buttonicon:f.editicon, id:c.p.id + "_iledit", onClickButton:function() {
          var e = a(c).jqGrid("getGridParam", "selrow");
          e ? (a(c).jqGrid("editRow", e, f.editParams), a("#" + b + "_ilsave").removeClass("ui-state-disabled"), a("#" + b + "_ilcancel").removeClass("ui-state-disabled"), a("#" + b + "_iladd").addClass("ui-state-disabled"), a("#" + b + "_iledit").addClass("ui-state-disabled")) : (a.jgrid.viewModal("#alertmod", {gbox:"#gbox_" + b, jqm:!0}), a("#jqg_alrt").focus());
        }});
        f.save && (a(c).jqGrid("navButtonAdd", d, {caption:f.savetext || "", title:f.savetitle || "Save row", buttonicon:f.saveicon, id:c.p.id + "_ilsave", onClickButton:function() {
          var e = c.p.savedRow[0].id;
          if (e) {
            var d = c.p.prmNames, h = d.oper, k = f.editParams;
            a("#" + a.jgrid.jqID(e), "#" + b).hasClass("jqgrid-new-row") ? (f.addParams.addRowParams.extraparam[h] = d.addoper, k = f.addParams.addRowParams) : (f.editParams.extraparam || (f.editParams.extraparam = {}), f.editParams.extraparam[h] = d.editoper);
            a(c).jqGrid("saveRow", e, k) && a(c).jqGrid("showAddEditButtons");
          } else {
            a.jgrid.viewModal("#alertmod", {gbox:"#gbox_" + b, jqm:!0}), a("#jqg_alrt").focus();
          }
        }}), a("#" + b + "_ilsave").addClass("ui-state-disabled"));
        f.cancel && (a(c).jqGrid("navButtonAdd", d, {caption:f.canceltext || "", title:f.canceltitle || "Cancel row editing", buttonicon:f.cancelicon, id:c.p.id + "_ilcancel", onClickButton:function() {
          var e = c.p.savedRow[0].id, d = f.editParams;
          e ? (a("#" + a.jgrid.jqID(e), "#" + b).hasClass("jqgrid-new-row") && (d = f.addParams.addRowParams), a(c).jqGrid("restoreRow", e, d), a(c).jqGrid("showAddEditButtons")) : (a.jgrid.viewModal("#alertmod", {gbox:"#gbox_" + b, jqm:!0}), a("#jqg_alrt").focus());
        }}), a("#" + b + "_ilcancel").addClass("ui-state-disabled"));
        !0 === f.restoreAfterSelect && (e = a.isFunction(c.p.beforeSelectRow) ? c.p.beforeSelectRow : !1, c.p.beforeSelectRow = function(b, d) {
          var h = !0;
          0 < c.p.savedRow.length && !0 === c.p._inlinenav && b !== c.p.selrow && null !== c.p.selrow && (c.p.selrow === f.addParams.rowID ? a(c).jqGrid("delRowData", c.p.selrow) : a(c).jqGrid("restoreRow", c.p.selrow, f.editParams), a(c).jqGrid("showAddEditButtons"));
          e && (h = e.call(c, b, d));
          return h;
        });
      }
    });
  }, showAddEditButtons:function() {
    return this.each(function() {
      if (this.grid) {
        var d = a.jgrid.jqID(this.p.id);
        a("#" + d + "_ilsave").addClass("ui-state-disabled");
        a("#" + d + "_ilcancel").addClass("ui-state-disabled");
        a("#" + d + "_iladd").removeClass("ui-state-disabled");
        a("#" + d + "_iledit").removeClass("ui-state-disabled");
      }
    });
  }});
})(jQuery);
(function(a) {
  a.jgrid.extend({editCell:function(d, f, c) {
    return this.each(function() {
      var e = this, b, k, h, g;
      if (e.grid && !0 === e.p.cellEdit) {
        f = parseInt(f, 10);
        e.p.selrow = e.rows[d].id;
        e.p.knv || a(e).jqGrid("GridNav");
        if (0 < e.p.savedRow.length) {
          if (!0 === c && d == e.p.iRow && f == e.p.iCol) {
            return;
          }
          a(e).jqGrid("saveCell", e.p.savedRow[0].id, e.p.savedRow[0].ic);
        } else {
          window.setTimeout(function() {
            a("#" + a.jgrid.jqID(e.p.knv)).attr("tabindex", "-1").focus();
          }, 0);
        }
        g = e.p.colModel[f];
        b = g.name;
        if ("subgrid" !== b && "cb" !== b && "rn" !== b) {
          h = a("td:eq(" + f + ")", e.rows[d]);
          if (!0 !== g.editable || !0 !== c || h.hasClass("not-editable-cell")) {
            0 <= parseInt(e.p.iCol, 10) && 0 <= parseInt(e.p.iRow, 10) && (a("td:eq(" + e.p.iCol + ")", e.rows[e.p.iRow]).removeClass("edit-cell ui-state-highlight"), a(e.rows[e.p.iRow]).removeClass("selected-row ui-state-hover")), h.addClass("edit-cell ui-state-highlight"), a(e.rows[d]).addClass("selected-row ui-state-hover"), k = h.html().replace(/\&#160\;/ig, ""), a(e).triggerHandler("jqGridSelectCell", [e.rows[d].id, b, k, d, f]), a.isFunction(e.p.onSelectCell) && e.p.onSelectCell.call(e, e.rows[d].id, 
            b, k, d, f);
          } else {
            0 <= parseInt(e.p.iCol, 10) && 0 <= parseInt(e.p.iRow, 10) && (a("td:eq(" + e.p.iCol + ")", e.rows[e.p.iRow]).removeClass("edit-cell ui-state-highlight"), a(e.rows[e.p.iRow]).removeClass("selected-row ui-state-hover"));
            a(h).addClass("edit-cell ui-state-highlight");
            a(e.rows[d]).addClass("selected-row ui-state-hover");
            try {
              k = a.unformat.call(e, h, {rowId:e.rows[d].id, colModel:g}, f);
            } catch (l) {
              k = g.edittype && "textarea" === g.edittype ? a(h).text() : a(h).html();
            }
            e.p.autoencode && (k = a.jgrid.htmlDecode(k));
            g.edittype || (g.edittype = "text");
            e.p.savedRow.push({id:d, ic:f, name:b, v:k});
            if ("&nbsp;" === k || "&#160;" === k || 1 === k.length && 160 === k.charCodeAt(0)) {
              k = "";
            }
            if (a.isFunction(e.p.formatCell)) {
              var m = e.p.formatCell.call(e, e.rows[d].id, b, k, d, f);
              void 0 !== m && (k = m);
            }
            a(e).triggerHandler("jqGridBeforeEditCell", [e.rows[d].id, b, k, d, f]);
            a.isFunction(e.p.beforeEditCell) && e.p.beforeEditCell.call(e, e.rows[d].id, b, k, d, f);
            var m = a.extend({}, g.editoptions || {}, {id:d + "_" + b, name:b}), n = a.jgrid.createEl.call(e, g.edittype, m, k, !0, a.extend({}, a.jgrid.ajaxOptions, e.p.ajaxSelectOptions || {}));
            a(h).html("").append(n).attr("tabindex", "0");
            a.jgrid.bindEv.call(e, n, m);
            window.setTimeout(function() {
              a(n).focus();
            }, 0);
            a("input, select, textarea", h).bind("keydown", function(c) {
              27 === c.keyCode && (0 < a("input.hasDatepicker", h).length ? a(".ui-datepicker").is(":hidden") ? a(e).jqGrid("restoreCell", d, f) : a("input.hasDatepicker", h).datepicker("hide") : a(e).jqGrid("restoreCell", d, f));
              if (13 === c.keyCode) {
                return a(e).jqGrid("saveCell", d, f), !1;
              }
              if (9 === c.keyCode) {
                if (e.grid.hDiv.loading) {
                  return !1;
                }
                c.shiftKey ? a(e).jqGrid("prevCell", d, f) : a(e).jqGrid("nextCell", d, f);
              }
              c.stopPropagation();
            });
            a(e).triggerHandler("jqGridAfterEditCell", [e.rows[d].id, b, k, d, f]);
            a.isFunction(e.p.afterEditCell) && e.p.afterEditCell.call(e, e.rows[d].id, b, k, d, f);
          }
          e.p.iCol = f;
          e.p.iRow = d;
        }
      }
    });
  }, saveCell:function(d, f) {
    return this.each(function() {
      var c = this, e;
      if (c.grid && !0 === c.p.cellEdit) {
        e = 1 <= c.p.savedRow.length ? 0 : null;
        if (null !== e) {
          var b = a("td:eq(" + f + ")", c.rows[d]), k, h, g = c.p.colModel[f], l = g.name, m = a.jgrid.jqID(l);
          switch(g.edittype) {
            case "select":
              if (g.editoptions.multiple) {
                var m = a("#" + d + "_" + m, c.rows[d]), n = [];
                (k = a(m).val()) ? k.join(",") : k = "";
                a("option:selected", m).each(function(c, b) {
                  n[c] = a(b).text();
                });
                h = n.join(",");
              } else {
                k = a("#" + d + "_" + m + " option:selected", c.rows[d]).val(), h = a("#" + d + "_" + m + " option:selected", c.rows[d]).text();
              }
              g.formatter && (h = k);
              break;
            case "checkbox":
              var r = ["Yes", "No"];
              g.editoptions && (r = g.editoptions.value.split(":"));
              h = k = a("#" + d + "_" + m, c.rows[d]).is(":checked") ? r[0] : r[1];
              break;
            case "password":
            ;
            case "text":
            ;
            case "textarea":
            ;
            case "button":
              h = k = a("#" + d + "_" + m, c.rows[d]).val();
              break;
            case "custom":
              try {
                if (g.editoptions && a.isFunction(g.editoptions.custom_value)) {
                  k = g.editoptions.custom_value.call(c, a(".customelement", b), "get");
                  if (void 0 === k) {
                    throw "e2";
                  }
                  h = k;
                } else {
                  throw "e1";
                }
              } catch (q) {
                "e1" === q && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === q ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, q.message, a.jgrid.edit.bClose);
              }
            ;
          }
          if (h !== c.p.savedRow[e].v) {
            if (e = a(c).triggerHandler("jqGridBeforeSaveCell", [c.rows[d].id, l, k, d, f])) {
              h = k = e;
            }
            a.isFunction(c.p.beforeSaveCell) && (e = c.p.beforeSaveCell.call(c, c.rows[d].id, l, k, d, f)) && (h = k = e);
            var p = a.jgrid.checkValues.call(c, k, f);
            if (!0 === p[0]) {
              e = a(c).triggerHandler("jqGridBeforeSubmitCell", [c.rows[d].id, l, k, d, f]) || {};
              a.isFunction(c.p.beforeSubmitCell) && ((e = c.p.beforeSubmitCell.call(c, c.rows[d].id, l, k, d, f)) || (e = {}));
              0 < a("input.hasDatepicker", b).length && a("input.hasDatepicker", b).datepicker("hide");
              if ("remote" === c.p.cellsubmit) {
                if (c.p.cellurl) {
                  var t = {};
                  c.p.autoencode && (k = a.jgrid.htmlEncode(k));
                  t[l] = k;
                  r = c.p.prmNames;
                  g = r.id;
                  m = r.oper;
                  t[g] = a.jgrid.stripPref(c.p.idPrefix, c.rows[d].id);
                  t[m] = r.editoper;
                  t = a.extend(e, t);
                  a("#lui_" + a.jgrid.jqID(c.p.id)).show();
                  c.grid.hDiv.loading = !0;
                  a.ajax(a.extend({url:c.p.cellurl, data:a.isFunction(c.p.serializeCellData) ? c.p.serializeCellData.call(c, t) : t, type:"POST", complete:function(e, g) {
                    a("#lui_" + c.p.id).hide();
                    c.grid.hDiv.loading = !1;
                    if ("success" === g) {
                      var m = a(c).triggerHandler("jqGridAfterSubmitCell", [c, e, t.id, l, k, d, f]) || [!0, ""];
                      !0 === m[0] && a.isFunction(c.p.afterSubmitCell) && (m = c.p.afterSubmitCell.call(c, e, t.id, l, k, d, f));
                      !0 === m[0] ? (a(b).empty(), a(c).jqGrid("setCell", c.rows[d].id, f, h, !1, !1, !0), a(b).addClass("dirty-cell"), a(c.rows[d]).addClass("edited"), a(c).triggerHandler("jqGridAfterSaveCell", [c.rows[d].id, l, k, d, f]), a.isFunction(c.p.afterSaveCell) && c.p.afterSaveCell.call(c, c.rows[d].id, l, k, d, f), c.p.savedRow.splice(0, 1)) : (a.jgrid.info_dialog(a.jgrid.errors.errcap, m[1], a.jgrid.edit.bClose), a(c).jqGrid("restoreCell", d, f));
                    }
                  }, error:function(b, e, g) {
                    a("#lui_" + a.jgrid.jqID(c.p.id)).hide();
                    c.grid.hDiv.loading = !1;
                    a(c).triggerHandler("jqGridErrorCell", [b, e, g]);
                    a.isFunction(c.p.errorCell) ? c.p.errorCell.call(c, b, e, g) : a.jgrid.info_dialog(a.jgrid.errors.errcap, b.status + " : " + b.statusText + "<br/>" + e, a.jgrid.edit.bClose);
                    a(c).jqGrid("restoreCell", d, f);
                  }}, a.jgrid.ajaxOptions, c.p.ajaxCellOptions || {}));
                } else {
                  try {
                    a.jgrid.info_dialog(a.jgrid.errors.errcap, a.jgrid.errors.nourl, a.jgrid.edit.bClose), a(c).jqGrid("restoreCell", d, f);
                  } catch (q) {
                  }
                }
              }
              "clientArray" === c.p.cellsubmit && (a(b).empty(), a(c).jqGrid("setCell", c.rows[d].id, f, h, !1, !1, !0), a(b).addClass("dirty-cell"), a(c.rows[d]).addClass("edited"), a(c).triggerHandler("jqGridAfterSaveCell", [c.rows[d].id, l, k, d, f]), a.isFunction(c.p.afterSaveCell) && c.p.afterSaveCell.call(c, c.rows[d].id, l, k, d, f), c.p.savedRow.splice(0, 1));
            } else {
              try {
                window.setTimeout(function() {
                  a.jgrid.info_dialog(a.jgrid.errors.errcap, k + " " + p[1], a.jgrid.edit.bClose);
                }, 100), a(c).jqGrid("restoreCell", d, f);
              } catch (q) {
              }
            }
          } else {
            a(c).jqGrid("restoreCell", d, f);
          }
        }
        window.setTimeout(function() {
          a("#" + a.jgrid.jqID(c.p.knv)).attr("tabindex", "-1").focus();
        }, 0);
      }
    });
  }, restoreCell:function(d, f) {
    return this.each(function() {
      var c = this, e;
      if (c.grid && !0 === c.p.cellEdit) {
        e = 1 <= c.p.savedRow.length ? 0 : null;
        if (null !== e) {
          var b = a("td:eq(" + f + ")", c.rows[d]);
          if (a.isFunction(a.fn.datepicker)) {
            try {
              a("input.hasDatepicker", b).datepicker("hide");
            } catch (k) {
            }
          }
          a(b).empty().attr("tabindex", "-1");
          a(c).jqGrid("setCell", c.rows[d].id, f, c.p.savedRow[e].v, !1, !1, !0);
          a(c).triggerHandler("jqGridAfterRestoreCell", [c.rows[d].id, c.p.savedRow[e].v, d, f]);
          a.isFunction(c.p.afterRestoreCell) && c.p.afterRestoreCell.call(c, c.rows[d].id, c.p.savedRow[e].v, d, f);
          c.p.savedRow.splice(0, 1);
        }
        window.setTimeout(function() {
          a("#" + c.p.knv).attr("tabindex", "-1").focus();
        }, 0);
      }
    });
  }, nextCell:function(d, f) {
    return this.each(function() {
      var c = !1, e;
      if (this.grid && !0 === this.p.cellEdit) {
        for (e = f + 1;e < this.p.colModel.length;e++) {
          if (!0 === this.p.colModel[e].editable) {
            c = e;
            break;
          }
        }
        !1 !== c ? a(this).jqGrid("editCell", d, c, !0) : 0 < this.p.savedRow.length && a(this).jqGrid("saveCell", d, f);
      }
    });
  }, prevCell:function(d, f) {
    return this.each(function() {
      var c = !1, e;
      if (this.grid && !0 === this.p.cellEdit) {
        for (e = f - 1;0 <= e;e--) {
          if (!0 === this.p.colModel[e].editable) {
            c = e;
            break;
          }
        }
        !1 !== c ? a(this).jqGrid("editCell", d, c, !0) : 0 < this.p.savedRow.length && a(this).jqGrid("saveCell", d, f);
      }
    });
  }, GridNav:function() {
    return this.each(function() {
      function d(b, e, d) {
        if ("v" === d.substr(0, 1)) {
          var f = a(c.grid.bDiv)[0].clientHeight, k = a(c.grid.bDiv)[0].scrollTop, r = c.rows[b].offsetTop + c.rows[b].clientHeight, q = c.rows[b].offsetTop;
          "vd" === d && r >= f && (a(c.grid.bDiv)[0].scrollTop = a(c.grid.bDiv)[0].scrollTop + c.rows[b].clientHeight);
          "vu" === d && q < k && (a(c.grid.bDiv)[0].scrollTop = a(c.grid.bDiv)[0].scrollTop - c.rows[b].clientHeight);
        }
        "h" === d && (d = a(c.grid.bDiv)[0].clientWidth, f = a(c.grid.bDiv)[0].scrollLeft, k = c.rows[b].cells[e].offsetLeft, c.rows[b].cells[e].offsetLeft + c.rows[b].cells[e].clientWidth >= d + parseInt(f, 10) ? a(c.grid.bDiv)[0].scrollLeft = a(c.grid.bDiv)[0].scrollLeft + c.rows[b].cells[e].clientWidth : k < f && (a(c.grid.bDiv)[0].scrollLeft = a(c.grid.bDiv)[0].scrollLeft - c.rows[b].cells[e].clientWidth));
      }
      function f(a, b) {
        var e, d;
        if ("lft" === b) {
          for (e = a + 1, d = a;0 <= d;d--) {
            if (!0 !== c.p.colModel[d].hidden) {
              e = d;
              break;
            }
          }
        }
        if ("rgt" === b) {
          for (e = a - 1, d = a;d < c.p.colModel.length;d++) {
            if (!0 !== c.p.colModel[d].hidden) {
              e = d;
              break;
            }
          }
        }
        return e;
      }
      var c = this;
      if (c.grid && !0 === c.p.cellEdit) {
        c.p.knv = c.p.id + "_kn";
        var e = a("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + c.p.knv + "'></div></div>"), b, k;
        a(e).insertBefore(c.grid.cDiv);
        a("#" + c.p.knv).focus().keydown(function(e) {
          k = e.keyCode;
          "rtl" === c.p.direction && (37 === k ? k = 39 : 39 === k && (k = 37));
          switch(k) {
            case 38:
              0 < c.p.iRow - 1 && (d(c.p.iRow - 1, c.p.iCol, "vu"), a(c).jqGrid("editCell", c.p.iRow - 1, c.p.iCol, !1));
              break;
            case 40:
              c.p.iRow + 1 <= c.rows.length - 1 && (d(c.p.iRow + 1, c.p.iCol, "vd"), a(c).jqGrid("editCell", c.p.iRow + 1, c.p.iCol, !1));
              break;
            case 37:
              0 <= c.p.iCol - 1 && (b = f(c.p.iCol - 1, "lft"), d(c.p.iRow, b, "h"), a(c).jqGrid("editCell", c.p.iRow, b, !1));
              break;
            case 39:
              c.p.iCol + 1 <= c.p.colModel.length - 1 && (b = f(c.p.iCol + 1, "rgt"), d(c.p.iRow, b, "h"), a(c).jqGrid("editCell", c.p.iRow, b, !1));
              break;
            case 13:
              0 <= parseInt(c.p.iCol, 10) && 0 <= parseInt(c.p.iRow, 10) && a(c).jqGrid("editCell", c.p.iRow, c.p.iCol, !0);
              break;
            default:
              return !0;
          }
          return !1;
        });
      }
    });
  }, getChangedCells:function(d) {
    var f = [];
    d || (d = "all");
    this.each(function() {
      var c = this, e;
      c.grid && !0 === c.p.cellEdit && a(c.rows).each(function(b) {
        var k = {};
        a(this).hasClass("edited") && (a("td", this).each(function(f) {
          e = c.p.colModel[f].name;
          if ("cb" !== e && "subgrid" !== e) {
            if ("dirty" === d) {
              if (a(this).hasClass("dirty-cell")) {
                try {
                  k[e] = a.unformat.call(c, this, {rowId:c.rows[b].id, colModel:c.p.colModel[f]}, f);
                } catch (g) {
                  k[e] = a.jgrid.htmlDecode(a(this).html());
                }
              }
            } else {
              try {
                k[e] = a.unformat.call(c, this, {rowId:c.rows[b].id, colModel:c.p.colModel[f]}, f);
              } catch (g) {
                k[e] = a.jgrid.htmlDecode(a(this).html());
              }
            }
          }
        }), k.id = this.id, f.push(k));
      });
    });
    return f;
  }});
})(jQuery);
(function(a) {
  a.jgrid.extend({setSubGrid:function() {
    return this.each(function() {
      var d, f;
      this.p.subGridOptions = a.extend({plusicon:"ui-icon-plus", minusicon:"ui-icon-minus", openicon:"ui-icon-carat-1-sw", expandOnLoad:!1, delayOnLoad:50, selectOnExpand:!1, selectOnCollapse:!1, reloadOnExpand:!0}, this.p.subGridOptions || {});
      this.p.colNames.unshift("");
      this.p.colModel.unshift({name:"subgrid", width:a.jgrid.cell_width ? this.p.subGridWidth + this.p.cellLayout : this.p.subGridWidth, sortable:!1, resizable:!1, hidedlg:!0, search:!1, fixed:!0});
      d = this.p.subGridModel;
      if (d[0]) {
        for (d[0].align = a.extend([], d[0].align || []), f = 0;f < d[0].name.length;f++) {
          d[0].align[f] = d[0].align[f] || "left";
        }
      }
    });
  }, addSubGridCell:function(a, f) {
    var c = "", e, b;
    this.each(function() {
      c = this.formatCol(a, f);
      b = this.p.id;
      e = this.p.subGridOptions.plusicon;
    });
    return '<td role="gridcell" aria-describedby="' + b + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + c + "><a style='cursor:pointer;'><span class='ui-icon " + e + "'></span></a></td>";
  }, addSubGrid:function(d, f) {
    return this.each(function() {
      var c = this;
      if (c.grid) {
        var e = function(b, e, d) {
          e = a("<td align='" + c.p.subGridModel[0].align[d] + "'></td>").html(e);
          a(b).append(e);
        }, b = function(b, d) {
          var f, g, h, k = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), l = a("<tr></tr>");
          for (g = 0;g < c.p.subGridModel[0].name.length;g++) {
            f = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + c.p.direction + "'></th>"), a(f).html(c.p.subGridModel[0].name[g]), a(f).width(c.p.subGridModel[0].width[g]), a(l).append(f);
          }
          a(k).append(l);
          b && (h = c.p.xmlReader.subgrid, a(h.root + " " + h.row, b).each(function() {
            l = a("<tr class='ui-widget-content ui-subtblcell'></tr>");
            if (!0 === h.repeatitems) {
              a(h.cell, this).each(function(c) {
                e(l, a(this).text() || "&#160;", c);
              });
            } else {
              var b = c.p.subGridModel[0].mapping || c.p.subGridModel[0].name;
              if (b) {
                for (g = 0;g < b.length;g++) {
                  e(l, a(b[g], this).text() || "&#160;", g);
                }
              }
            }
            a(k).append(l);
          }));
          f = a("table:first", c.grid.bDiv).attr("id") + "_";
          a("#" + a.jgrid.jqID(f + d)).append(k);
          c.grid.hDiv.loading = !1;
          a("#load_" + a.jgrid.jqID(c.p.id)).hide();
          return !1;
        }, k = function(b, d) {
          var f, g, h, k, l, m = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), n = a("<tr></tr>");
          for (g = 0;g < c.p.subGridModel[0].name.length;g++) {
            f = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + c.p.direction + "'></th>"), a(f).html(c.p.subGridModel[0].name[g]), a(f).width(c.p.subGridModel[0].width[g]), a(n).append(f);
          }
          a(m).append(n);
          if (b && (k = c.p.jsonReader.subgrid, f = a.jgrid.getAccessor(b, k.root), void 0 !== f)) {
            for (g = 0;g < f.length;g++) {
              h = f[g];
              n = a("<tr class='ui-widget-content ui-subtblcell'></tr>");
              if (!0 === k.repeatitems) {
                for (k.cell && (h = h[k.cell]), l = 0;l < h.length;l++) {
                  e(n, h[l] || "&#160;", l);
                }
              } else {
                var q = c.p.subGridModel[0].mapping || c.p.subGridModel[0].name;
                if (q.length) {
                  for (l = 0;l < q.length;l++) {
                    e(n, h[q[l]] || "&#160;", l);
                  }
                }
              }
              a(m).append(n);
            }
          }
          g = a("table:first", c.grid.bDiv).attr("id") + "_";
          a("#" + a.jgrid.jqID(g + d)).append(m);
          c.grid.hDiv.loading = !1;
          a("#load_" + a.jgrid.jqID(c.p.id)).hide();
          return !1;
        }, h = function(e) {
          var d, f, g, h;
          d = a(e).attr("id");
          f = {nd_:(new Date).getTime()};
          f[c.p.prmNames.subgridid] = d;
          if (!c.p.subGridModel[0]) {
            return !1;
          }
          if (c.p.subGridModel[0].params) {
            for (h = 0;h < c.p.subGridModel[0].params.length;h++) {
              for (g = 0;g < c.p.colModel.length;g++) {
                c.p.colModel[g].name === c.p.subGridModel[0].params[h] && (f[c.p.colModel[g].name] = a("td:eq(" + g + ")", e).text().replace(/\&#160\;/ig, ""));
              }
            }
          }
          if (!c.grid.hDiv.loading) {
            switch(c.grid.hDiv.loading = !0, a("#load_" + a.jgrid.jqID(c.p.id)).show(), c.p.subgridtype || (c.p.subgridtype = c.p.datatype), a.isFunction(c.p.subgridtype) ? c.p.subgridtype.call(c, f) : c.p.subgridtype = c.p.subgridtype.toLowerCase(), c.p.subgridtype) {
              case "xml":
              ;
              case "json":
                a.ajax(a.extend({type:c.p.mtype, url:c.p.subGridUrl, dataType:c.p.subgridtype, data:a.isFunction(c.p.serializeSubGridData) ? c.p.serializeSubGridData.call(c, f) : f, complete:function(e) {
                  "xml" === c.p.subgridtype ? b(e.responseXML, d) : k(a.jgrid.parse(e.responseText), d);
                }}, a.jgrid.ajaxOptions, c.p.ajaxSubgridOptions || {}));
            }
          }
          return !1;
        }, g, l, m, n = 0, r, q;
        a.each(c.p.colModel, function() {
          !0 !== this.hidden && "rn" !== this.name && "cb" !== this.name || n++;
        });
        var p = c.rows.length, t = 1;
        void 0 !== f && 0 < f && (t = f, p = f + 1);
        for (;t < p;) {
          a(c.rows[t]).hasClass("jqgrow") && a(c.rows[t].cells[d]).bind("click", function() {
            var b = a(this).parent("tr")[0];
            q = b.nextSibling;
            if (a(this).hasClass("sgcollapsed")) {
              l = c.p.id;
              g = b.id;
              if (!0 === c.p.subGridOptions.reloadOnExpand || !1 === c.p.subGridOptions.reloadOnExpand && !a(q).hasClass("ui-subgrid")) {
                m = 1 <= d ? "<td colspan='" + d + "'>&#160;</td>" : "";
                r = a(c).triggerHandler("jqGridSubGridBeforeExpand", [l + "_" + g, g]);
                (r = !1 === r || "stop" === r ? !1 : !0) && a.isFunction(c.p.subGridBeforeExpand) && (r = c.p.subGridBeforeExpand.call(c, l + "_" + g, g));
                if (!1 === r) {
                  return !1;
                }
                a(b).after("<tr role='row' class='ui-subgrid'>" + m + "<td class='ui-widget-content subgrid-cell'><span class='ui-icon " + c.p.subGridOptions.openicon + "'></span></td><td colspan='" + parseInt(c.p.colNames.length - 1 - n, 10) + "' class='ui-widget-content subgrid-data'><div id=" + l + "_" + g + " class='tablediv'></div></td></tr>");
                a(c).triggerHandler("jqGridSubGridRowExpanded", [l + "_" + g, g]);
                a.isFunction(c.p.subGridRowExpanded) ? c.p.subGridRowExpanded.call(c, l + "_" + g, g) : h(b);
              } else {
                a(q).show();
              }
              a(this).html("<a style='cursor:pointer;'><span class='ui-icon " + c.p.subGridOptions.minusicon + "'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");
              c.p.subGridOptions.selectOnExpand && a(c).jqGrid("setSelection", g);
            } else {
              if (a(this).hasClass("sgexpanded")) {
                r = a(c).triggerHandler("jqGridSubGridRowColapsed", [l + "_" + g, g]);
                r = !1 === r || "stop" === r ? !1 : !0;
                g = b.id;
                r && a.isFunction(c.p.subGridRowColapsed) && (r = c.p.subGridRowColapsed.call(c, l + "_" + g, g));
                if (!1 === r) {
                  return !1;
                }
                !0 === c.p.subGridOptions.reloadOnExpand ? a(q).remove(".ui-subgrid") : a(q).hasClass("ui-subgrid") && a(q).hide();
                a(this).html("<a style='cursor:pointer;'><span class='ui-icon " + c.p.subGridOptions.plusicon + "'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed");
                c.p.subGridOptions.selectOnCollapse && a(c).jqGrid("setSelection", g);
              }
            }
            return !1;
          }), t++;
        }
        !0 === c.p.subGridOptions.expandOnLoad && a(c.rows).filter(".jqgrow").each(function(c, b) {
          a(b.cells[0]).click();
        });
        c.subGridXml = function(a, c) {
          b(a, c);
        };
        c.subGridJson = function(a, c) {
          k(a, c);
        };
      }
    });
  }, expandSubGridRow:function(d) {
    return this.each(function() {
      if ((this.grid || d) && !0 === this.p.subGrid) {
        var f = a(this).jqGrid("getInd", d, !0);
        f && (f = a("td.sgcollapsed", f)[0]) && a(f).trigger("click");
      }
    });
  }, collapseSubGridRow:function(d) {
    return this.each(function() {
      if ((this.grid || d) && !0 === this.p.subGrid) {
        var f = a(this).jqGrid("getInd", d, !0);
        f && (f = a("td.sgexpanded", f)[0]) && a(f).trigger("click");
      }
    });
  }, toggleSubGridRow:function(d) {
    return this.each(function() {
      if ((this.grid || d) && !0 === this.p.subGrid) {
        var f = a(this).jqGrid("getInd", d, !0);
        if (f) {
          var c = a("td.sgcollapsed", f)[0];
          c ? a(c).trigger("click") : (c = a("td.sgexpanded", f)[0]) && a(c).trigger("click");
        }
      }
    });
  }});
})(jQuery);
(function(a) {
  a.jgrid.extend({setTreeNode:function(d, f) {
    return this.each(function() {
      var c = this;
      if (c.grid && c.p.treeGrid) {
        for (var e = c.p.expColInd, b = c.p.treeReader.expanded_field, k = c.p.treeReader.leaf_field, h = c.p.treeReader.level_field, g = c.p.treeReader.icon_field, l = c.p.treeReader.loaded, m, n, r, q;d < f;) {
          q = a.jgrid.stripPref(c.p.idPrefix, c.rows[d].id), q = c.p.data[c.p._index[q]], "nested" !== c.p.treeGridModel || q[k] || (m = parseInt(q[c.p.treeReader.left_field], 10), n = parseInt(q[c.p.treeReader.right_field], 10), q[k] = n === m + 1 ? "true" : "false", c.rows[d].cells[c.p._treeleafpos].innerHTML = q[k]), m = parseInt(q[h], 10), 0 === c.p.tree_root_level ? (r = m + 1, n = m) : (r = m, n = m - 1), r = "<div class='tree-wrap tree-wrap-" + c.p.direction + "' style='width:" + 18 * r + 
          "px;'>", r += "<div style='" + ("rtl" === c.p.direction ? "right:" : "left:") + 18 * n + "px;' class='ui-icon ", void 0 !== q[l] && (q[l] = "true" === q[l] || !0 === q[l] ? !0 : !1), "true" === q[k] || !0 === q[k] ? (r += (void 0 !== q[g] && "" !== q[g] ? q[g] : c.p.treeIcons.leaf) + " tree-leaf treeclick", q[k] = !0, n = "leaf") : (q[k] = !1, n = ""), q[b] = ("true" === q[b] || !0 === q[b] ? !0 : !1) && (q[l] || void 0 === q[l]), r = !1 === q[b] ? r + (!0 === q[k] ? "'" : c.p.treeIcons.plus + 
          " tree-plus treeclick'") : r + (!0 === q[k] ? "'" : c.p.treeIcons.minus + " tree-minus treeclick'"), r += "></div></div>", a(c.rows[d].cells[e]).wrapInner("<span class='cell-wrapper" + n + "'></span>").prepend(r), m !== parseInt(c.p.tree_root_level, 10) && ((q = (q = a(c).jqGrid("getNodeParent", q)) && q.hasOwnProperty(b) ? q[b] : !0) || a(c.rows[d]).css("display", "none")), a(c.rows[d].cells[e]).find("div.treeclick").bind("click", function(e) {
            e = a.jgrid.stripPref(c.p.idPrefix, a(e.target || e.srcElement, c.rows).closest("tr.jqgrow")[0].id);
            e = c.p._index[e];
            c.p.data[e][k] || (c.p.data[e][b] ? (a(c).jqGrid("collapseRow", c.p.data[e]), a(c).jqGrid("collapseNode", c.p.data[e])) : (a(c).jqGrid("expandRow", c.p.data[e]), a(c).jqGrid("expandNode", c.p.data[e])));
            return !1;
          }), !0 === c.p.ExpandColClick && a(c.rows[d].cells[e]).find("span.cell-wrapper").css("cursor", "pointer").bind("click", function(e) {
            e = a.jgrid.stripPref(c.p.idPrefix, a(e.target || e.srcElement, c.rows).closest("tr.jqgrow")[0].id);
            var d = c.p._index[e];
            c.p.data[d][k] || (c.p.data[d][b] ? (a(c).jqGrid("collapseRow", c.p.data[d]), a(c).jqGrid("collapseNode", c.p.data[d])) : (a(c).jqGrid("expandRow", c.p.data[d]), a(c).jqGrid("expandNode", c.p.data[d])));
            a(c).jqGrid("setSelection", e);
            return !1;
          }), d++;
        }
      }
    });
  }, setTreeGrid:function() {
    return this.each(function() {
      var d = this, f = 0, c, e = !1, b, k, h = [];
      if (d.p.treeGrid) {
        d.p.treedatatype || a.extend(d.p, {treedatatype:d.p.datatype});
        d.p.subGrid = !1;
        d.p.altRows = !1;
        d.p.pgbuttons = !1;
        d.p.pginput = !1;
        d.p.gridview = !0;
        null === d.p.rowTotal && (d.p.rowNum = 1E4);
        d.p.multiselect = !1;
        d.p.rowList = [];
        d.p.expColInd = 0;
        c = "ui-icon-triangle-1-" + ("rtl" === d.p.direction ? "w" : "e");
        d.p.treeIcons = a.extend({plus:c, minus:"ui-icon-triangle-1-s", leaf:"ui-icon-radio-off"}, d.p.treeIcons || {});
        "nested" === d.p.treeGridModel ? d.p.treeReader = a.extend({level_field:"level", left_field:"lft", right_field:"rgt", leaf_field:"isLeaf", expanded_field:"expanded", loaded:"loaded", icon_field:"icon"}, d.p.treeReader) : "adjacency" === d.p.treeGridModel && (d.p.treeReader = a.extend({level_field:"level", parent_id_field:"parent", leaf_field:"isLeaf", expanded_field:"expanded", loaded:"loaded", icon_field:"icon"}, d.p.treeReader));
        for (b in d.p.colModel) {
          if (d.p.colModel.hasOwnProperty(b)) {
            for (k in c = d.p.colModel[b].name, c !== d.p.ExpandColumn || e || (e = !0, d.p.expColInd = f), f++, d.p.treeReader) {
              d.p.treeReader.hasOwnProperty(k) && d.p.treeReader[k] === c && h.push(c);
            }
          }
        }
        a.each(d.p.treeReader, function(c, b) {
          b && -1 === a.inArray(b, h) && ("leaf_field" === c && (d.p._treeleafpos = f), f++, d.p.colNames.push(b), d.p.colModel.push({name:b, width:1, hidden:!0, sortable:!1, resizable:!1, hidedlg:!0, editable:!0, search:!1}));
        });
      }
    });
  }, expandRow:function(d) {
    this.each(function() {
      var f = this;
      if (f.grid && f.p.treeGrid) {
        var c = a(f).jqGrid("getNodeChildren", d), e = f.p.treeReader.expanded_field;
        a(c).each(function() {
          var c = f.p.idPrefix + a.jgrid.getAccessor(this, f.p.localReader.id);
          a(a(f).jqGrid("getGridRowById", c)).css("display", "");
          this[e] && a(f).jqGrid("expandRow", this);
        });
      }
    });
  }, collapseRow:function(d) {
    this.each(function() {
      var f = this;
      if (f.grid && f.p.treeGrid) {
        var c = a(f).jqGrid("getNodeChildren", d), e = f.p.treeReader.expanded_field;
        a(c).each(function() {
          var c = f.p.idPrefix + a.jgrid.getAccessor(this, f.p.localReader.id);
          a(a(f).jqGrid("getGridRowById", c)).css("display", "none");
          this[e] && a(f).jqGrid("collapseRow", this);
        });
      }
    });
  }, getRootNodes:function() {
    var d = [];
    this.each(function() {
      var f = this;
      if (f.grid && f.p.treeGrid) {
        switch(f.p.treeGridModel) {
          case "nested":
            var c = f.p.treeReader.level_field;
            a(f.p.data).each(function() {
              parseInt(this[c], 10) === parseInt(f.p.tree_root_level, 10) && d.push(this);
            });
            break;
          case "adjacency":
            var e = f.p.treeReader.parent_id_field;
            a(f.p.data).each(function() {
              null !== this[e] && "null" !== String(this[e]).toLowerCase() || d.push(this);
            });
        }
      }
    });
    return d;
  }, getNodeDepth:function(d) {
    var f = null;
    this.each(function() {
      if (this.grid && this.p.treeGrid) {
        switch(this.p.treeGridModel) {
          case "nested":
            f = parseInt(d[this.p.treeReader.level_field], 10) - parseInt(this.p.tree_root_level, 10);
            break;
          case "adjacency":
            f = a(this).jqGrid("getNodeAncestors", d).length;
        }
      }
    });
    return f;
  }, getNodeParent:function(d) {
    var f = null;
    this.each(function() {
      var c = this;
      if (c.grid && c.p.treeGrid) {
        switch(c.p.treeGridModel) {
          case "nested":
            var e = c.p.treeReader.left_field, b = c.p.treeReader.right_field, k = c.p.treeReader.level_field, h = parseInt(d[e], 10), g = parseInt(d[b], 10), l = parseInt(d[k], 10);
            a(this.p.data).each(function() {
              if (parseInt(this[k], 10) === l - 1 && parseInt(this[e], 10) < h && parseInt(this[b], 10) > g) {
                return f = this, !1;
              }
            });
            break;
          case "adjacency":
            var m = c.p.treeReader.parent_id_field, n = c.p.localReader.id;
            a(this.p.data).each(function() {
              if (this[n] === a.jgrid.stripPref(c.p.idPrefix, d[m])) {
                return f = this, !1;
              }
            });
        }
      }
    });
    return f;
  }, getNodeChildren:function(d) {
    var f = [];
    this.each(function() {
      var c = this;
      if (c.grid && c.p.treeGrid) {
        switch(c.p.treeGridModel) {
          case "nested":
            var e = c.p.treeReader.left_field, b = c.p.treeReader.right_field, k = c.p.treeReader.level_field, h = parseInt(d[e], 10), g = parseInt(d[b], 10), l = parseInt(d[k], 10);
            a(this.p.data).each(function() {
              parseInt(this[k], 10) === l + 1 && parseInt(this[e], 10) > h && parseInt(this[b], 10) < g && f.push(this);
            });
            break;
          case "adjacency":
            var m = c.p.treeReader.parent_id_field, n = c.p.localReader.id;
            a(this.p.data).each(function() {
              this[m] == a.jgrid.stripPref(c.p.idPrefix, d[n]) && f.push(this);
            });
        }
      }
    });
    return f;
  }, getFullTreeNode:function(d) {
    var f = [];
    this.each(function() {
      var c = this, e;
      if (c.grid && c.p.treeGrid) {
        switch(c.p.treeGridModel) {
          case "nested":
            var b = c.p.treeReader.left_field, k = c.p.treeReader.right_field, h = c.p.treeReader.level_field, g = parseInt(d[b], 10), l = parseInt(d[k], 10), m = parseInt(d[h], 10);
            a(this.p.data).each(function() {
              parseInt(this[h], 10) >= m && parseInt(this[b], 10) >= g && parseInt(this[b], 10) <= l && f.push(this);
            });
            break;
          case "adjacency":
            if (d) {
              f.push(d);
              var n = c.p.treeReader.parent_id_field, r = c.p.localReader.id;
              a(this.p.data).each(function(b) {
                e = f.length;
                for (b = 0;b < e;b++) {
                  if (a.jgrid.stripPref(c.p.idPrefix, f[b][r]) === this[n]) {
                    f.push(this);
                    break;
                  }
                }
              });
            }
          ;
        }
      }
    });
    return f;
  }, getNodeAncestors:function(d) {
    var f = [];
    this.each(function() {
      if (this.grid && this.p.treeGrid) {
        for (var c = a(this).jqGrid("getNodeParent", d);c;) {
          f.push(c), c = a(this).jqGrid("getNodeParent", c);
        }
      }
    });
    return f;
  }, isVisibleNode:function(d) {
    var f = !0;
    this.each(function() {
      if (this.grid && this.p.treeGrid) {
        var c = a(this).jqGrid("getNodeAncestors", d), e = this.p.treeReader.expanded_field;
        a(c).each(function() {
          f = f && this[e];
          if (!f) {
            return !1;
          }
        });
      }
    });
    return f;
  }, isNodeLoaded:function(d) {
    var f;
    this.each(function() {
      if (this.grid && this.p.treeGrid) {
        var c = this.p.treeReader.leaf_field, e = this.p.treeReader.loaded;
        f = void 0 !== d ? void 0 !== d[e] ? d[e] : d[c] || 0 < a(this).jqGrid("getNodeChildren", d).length ? !0 : !1 : !1;
      }
    });
    return f;
  }, expandNode:function(d) {
    return this.each(function() {
      if (this.grid && this.p.treeGrid) {
        var f = this.p.treeReader.expanded_field, c = this.p.treeReader.parent_id_field, e = this.p.treeReader.loaded, b = this.p.treeReader.level_field, k = this.p.treeReader.left_field, h = this.p.treeReader.right_field;
        if (!d[f]) {
          var g = a.jgrid.getAccessor(d, this.p.localReader.id), l = a("#" + this.p.idPrefix + a.jgrid.jqID(g), this.grid.bDiv)[0], m = this.p._index[g];
          a(this).jqGrid("isNodeLoaded", this.p.data[m]) ? (d[f] = !0, a("div.treeclick", l).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (d[f] = !0, a("div.treeclick", l).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = l.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {postData:{nodeid:g, 
          n_left:d[k], n_right:d[h], n_level:d[b]}}) : a(this).jqGrid("setGridParam", {postData:{nodeid:g, parentid:d[c], n_level:d[b]}}), a(this).trigger("reloadGrid"), d[e] = !0, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {postData:{nodeid:"", n_left:"", n_right:"", n_level:""}}) : a(this).jqGrid("setGridParam", {postData:{nodeid:"", parentid:"", n_level:""}}));
        }
      }
    });
  }, collapseNode:function(d) {
    return this.each(function() {
      if (this.grid && this.p.treeGrid) {
        var f = this.p.treeReader.expanded_field;
        d[f] && (d[f] = !1, f = a.jgrid.getAccessor(d, this.p.localReader.id), f = a("#" + this.p.idPrefix + a.jgrid.jqID(f), this.grid.bDiv)[0], a("div.treeclick", f).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus"));
      }
    });
  }, SortTree:function(d, f, c, e) {
    return this.each(function() {
      if (this.grid && this.p.treeGrid) {
        var b, k, h, g = [], l = this, m;
        b = a(this).jqGrid("getRootNodes");
        b = a.jgrid.from(b);
        b.orderBy(d, f, c, e);
        m = b.select();
        b = 0;
        for (k = m.length;b < k;b++) {
          h = m[b], g.push(h), a(this).jqGrid("collectChildrenSortTree", g, h, d, f, c, e);
        }
        a.each(g, function(c) {
          var b = a.jgrid.getAccessor(this, l.p.localReader.id);
          a("#" + a.jgrid.jqID(l.p.id) + " tbody tr:eq(" + c + ")").after(a("tr#" + a.jgrid.jqID(b), l.grid.bDiv));
        });
        g = m = b = null;
      }
    });
  }, collectChildrenSortTree:function(d, f, c, e, b, k) {
    return this.each(function() {
      if (this.grid && this.p.treeGrid) {
        var h, g, l, m;
        h = a(this).jqGrid("getNodeChildren", f);
        h = a.jgrid.from(h);
        h.orderBy(c, e, b, k);
        m = h.select();
        h = 0;
        for (g = m.length;h < g;h++) {
          l = m[h], d.push(l), a(this).jqGrid("collectChildrenSortTree", d, l, c, e, b, k);
        }
      }
    });
  }, setTreeRow:function(d, f) {
    var c = !1;
    this.each(function() {
      this.grid && this.p.treeGrid && (c = a(this).jqGrid("setRowData", d, f));
    });
    return c;
  }, delTreeNode:function(d) {
    return this.each(function() {
      var f = this.p.localReader.id, c, e = this.p.treeReader.left_field, b = this.p.treeReader.right_field, k, h, g;
      if (this.grid && this.p.treeGrid && (c = this.p._index[d], void 0 !== c)) {
        k = parseInt(this.p.data[c][b], 10);
        h = k - parseInt(this.p.data[c][e], 10) + 1;
        var l = a(this).jqGrid("getFullTreeNode", this.p.data[c]);
        if (0 < l.length) {
          for (c = 0;c < l.length;c++) {
            a(this).jqGrid("delRowData", l[c][f]);
          }
        }
        if ("nested" === this.p.treeGridModel) {
          f = a.jgrid.from(this.p.data).greater(e, k, {stype:"integer"}).select();
          if (f.length) {
            for (g in f) {
              f.hasOwnProperty(g) && (f[g][e] = parseInt(f[g][e], 10) - h);
            }
          }
          f = a.jgrid.from(this.p.data).greater(b, k, {stype:"integer"}).select();
          if (f.length) {
            for (g in f) {
              f.hasOwnProperty(g) && (f[g][b] = parseInt(f[g][b], 10) - h);
            }
          }
        }
      }
    });
  }, addChildNode:function(d, f, c, e) {
    var b = this[0];
    if (c) {
      var k = b.p.treeReader.expanded_field, h = b.p.treeReader.leaf_field, g = b.p.treeReader.level_field, l = b.p.treeReader.parent_id_field, m = b.p.treeReader.left_field, n = b.p.treeReader.right_field, r = b.p.treeReader.loaded, q, p, t, v, u;
      q = 0;
      var w = f, y;
      void 0 === e && (e = !1);
      if (void 0 === d || null === d) {
        u = b.p.data.length - 1;
        if (0 <= u) {
          for (;0 <= u;) {
            q = Math.max(q, parseInt(b.p.data[u][b.p.localReader.id], 10)), u--;
          }
        }
        d = q + 1;
      }
      var x = a(b).jqGrid("getInd", f);
      y = !1;
      void 0 === f || null === f || "" === f ? (w = f = null, q = "last", v = b.p.tree_root_level, u = b.p.data.length + 1) : (q = "after", p = b.p._index[f], t = b.p.data[p], f = t[b.p.localReader.id], v = parseInt(t[g], 10) + 1, u = a(b).jqGrid("getFullTreeNode", t), u.length ? (w = u = u[u.length - 1][b.p.localReader.id], u = a(b).jqGrid("getInd", w) + 1) : u = a(b).jqGrid("getInd", f) + 1, t[h] && (y = !0, t[k] = !0, a(b.rows[x]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(b.p.treeIcons.leaf + 
      " tree-leaf").addClass(b.p.treeIcons.minus + " tree-minus"), b.p.data[p][h] = !1, t[r] = !0));
      p = u + 1;
      void 0 === c[k] && (c[k] = !1);
      void 0 === c[r] && (c[r] = !1);
      c[g] = v;
      void 0 === c[h] && (c[h] = !0);
      "adjacency" === b.p.treeGridModel && (c[l] = f);
      if ("nested" === b.p.treeGridModel) {
        var B;
        if (null !== f) {
          h = parseInt(t[n], 10);
          g = a.jgrid.from(b.p.data);
          g = g.greaterOrEquals(n, h, {stype:"integer"});
          g = g.select();
          if (g.length) {
            for (B in g) {
              g.hasOwnProperty(B) && (g[B][m] = g[B][m] > h ? parseInt(g[B][m], 10) + 2 : g[B][m], g[B][n] = g[B][n] >= h ? parseInt(g[B][n], 10) + 2 : g[B][n]);
            }
          }
          c[m] = h;
          c[n] = h + 1;
        } else {
          h = parseInt(a(b).jqGrid("getCol", n, !1, "max"), 10);
          g = a.jgrid.from(b.p.data).greater(m, h, {stype:"integer"}).select();
          if (g.length) {
            for (B in g) {
              g.hasOwnProperty(B) && (g[B][m] = parseInt(g[B][m], 10) + 2);
            }
          }
          g = a.jgrid.from(b.p.data).greater(n, h, {stype:"integer"}).select();
          if (g.length) {
            for (B in g) {
              g.hasOwnProperty(B) && (g[B][n] = parseInt(g[B][n], 10) + 2);
            }
          }
          c[m] = h + 1;
          c[n] = h + 2;
        }
      }
      if (null === f || a(b).jqGrid("isNodeLoaded", t) || y) {
        a(b).jqGrid("addRowData", d, c, q, w), a(b).jqGrid("setTreeNode", u, p);
      }
      t && !t[k] && e && a(b.rows[x]).find("div.treeclick").click();
    }
  }});
})(jQuery);
(function(a) {
  a.extend(a.jgrid, {template:function(d) {
    var f = a.makeArray(arguments).slice(1), c, e = f.length;
    null == d && (d = "");
    return d.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(b, d) {
      if (!isNaN(parseInt(d, 10))) {
        return f[parseInt(d, 10)];
      }
      for (c = 0;c < e;c++) {
        if (a.isArray(f[c])) {
          for (var h = f[c], g = h.length;g--;) {
            if (d === h[g].nm) {
              return h[g].v;
            }
          }
        }
      }
    });
  }});
  a.jgrid.extend({groupingSetup:function() {
    return this.each(function() {
      var d, f, c = this.p.colModel, e = this.p.groupingView;
      if (null === e || "object" !== typeof e && !a.isFunction(e)) {
        this.p.grouping = !1;
      } else {
        if (e.groupField.length) {
          void 0 === e.visibiltyOnNextGrouping && (e.visibiltyOnNextGrouping = []);
          e.lastvalues = [];
          e._locgr || (e.groups = []);
          e.counters = [];
          for (d = 0;d < e.groupField.length;d++) {
            e.groupOrder[d] || (e.groupOrder[d] = "asc"), e.groupText[d] || (e.groupText[d] = "{0}"), "boolean" !== typeof e.groupColumnShow[d] && (e.groupColumnShow[d] = !0), "boolean" !== typeof e.groupSummary[d] && (e.groupSummary[d] = !1), e.groupSummaryPos[d] || (e.groupSummaryPos[d] = "footer"), !0 === e.groupColumnShow[d] ? (e.visibiltyOnNextGrouping[d] = !0, a(this).jqGrid("showCol", e.groupField[d])) : (e.visibiltyOnNextGrouping[d] = a("#" + a.jgrid.jqID(this.p.id + "_" + e.groupField[d])).is(":visible"), 
            a(this).jqGrid("hideCol", e.groupField[d]));
          }
          e.summary = [];
          e.hideFirstGroupCol && (e.formatDisplayField[0] = function(a) {
            return a;
          });
          d = 0;
          for (f = c.length;d < f;d++) {
            e.hideFirstGroupCol && !c[d].hidden && e.groupField[0] === c[d].name && (c[d].formatter = function() {
              return "";
            }), c[d].summaryType && (c[d].summaryDivider ? e.summary.push({nm:c[d].name, st:c[d].summaryType, v:"", sd:c[d].summaryDivider, vd:"", sr:c[d].summaryRound, srt:c[d].summaryRoundType || "round"}) : e.summary.push({nm:c[d].name, st:c[d].summaryType, v:"", sr:c[d].summaryRound, srt:c[d].summaryRoundType || "round"}));
          }
        } else {
          this.p.grouping = !1;
        }
      }
    });
  }, groupingPrepare:function(d, f) {
    this.each(function() {
      var c = this.p.groupingView, e = this, b, k = c.groupField.length, h, g, l, m = 0;
      for (b = 0;b < k;b++) {
        h = c.groupField[b], l = c.displayField[b], g = d[h], l = null == l ? null : d[l], null == l && (l = g), void 0 !== g && (0 === f ? (c.groups.push({idx:b, dataIndex:h, value:g, displayValue:l, startRow:f, cnt:1, summary:[]}), c.lastvalues[b] = g, c.counters[b] = {cnt:1, pos:c.groups.length - 1, summary:a.extend(!0, [], c.summary)}) : "object" === typeof g || (a.isArray(c.isInTheSameGroup) && a.isFunction(c.isInTheSameGroup[b]) ? c.isInTheSameGroup[b].call(e, c.lastvalues[b], g, b, c) : c.lastvalues[b] === 
        g) ? 1 === m ? (c.groups.push({idx:b, dataIndex:h, value:g, displayValue:l, startRow:f, cnt:1, summary:[]}), c.lastvalues[b] = g, c.counters[b] = {cnt:1, pos:c.groups.length - 1, summary:a.extend(!0, [], c.summary)}) : (c.counters[b].cnt += 1, c.groups[c.counters[b].pos].cnt = c.counters[b].cnt) : (c.groups.push({idx:b, dataIndex:h, value:g, displayValue:l, startRow:f, cnt:1, summary:[]}), c.lastvalues[b] = g, m = 1, c.counters[b] = {cnt:1, pos:c.groups.length - 1, summary:a.extend(!0, [], 
        c.summary)}), a.each(c.counters[b].summary, function() {
          a.isFunction(this.st) ? this.v = this.st.call(e, this.v, this.nm, d) : (this.v = a(e).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, d), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(e).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, d)));
        }), c.groups[c.counters[b].pos].summary = c.counters[b].summary);
      }
    });
    return this;
  }, groupingToggle:function(d) {
    this.each(function() {
      var f = this.p.groupingView, c = d.split("_"), e = parseInt(c[c.length - 2], 10);
      c.splice(c.length - 2, 2);
      var b = c.join("_"), c = f.minusicon, k = f.plusicon, h = a("#" + a.jgrid.jqID(d)), h = h.length ? h[0].nextSibling : null, g = a("#" + a.jgrid.jqID(d) + " span.tree-wrap-" + this.p.direction), l = function(c) {
        c = a.map(c.split(" "), function(a) {
          if (a.substring(0, b.length + 1) === b + "_") {
            return parseInt(a.substring(b.length + 1), 10);
          }
        });
        return 0 < c.length ? c[0] : void 0;
      }, m, n = !1, r = this.p.frozenColumns ? this.p.id + "_frozen" : !1, q = r ? a("#" + a.jgrid.jqID(d), "#" + a.jgrid.jqID(r)) : !1, q = q && q.length ? q[0].nextSibling : null;
      if (g.hasClass(c)) {
        if (f.showSummaryOnHide) {
          if (h) {
            for (;h && !(a(h).hasClass("jqfoot") && parseInt(a(h).attr("jqfootlevel"), 10) <= e);) {
              a(h).hide(), h = h.nextSibling, r && (a(q).hide(), q = q.nextSibling);
            }
          }
        } else {
          if (h) {
            for (;h;) {
              f = l(h.className);
              if (void 0 !== f && f <= e) {
                break;
              }
              a(h).hide();
              h = h.nextSibling;
              r && (a(q).hide(), q = q.nextSibling);
            }
          }
        }
        g.removeClass(c).addClass(k);
        n = !0;
      } else {
        if (h) {
          for (m = void 0;h;) {
            f = l(h.className);
            void 0 === m && (m = void 0 === f);
            if (void 0 !== f) {
              if (f <= e) {
                break;
              }
              f === e + 1 && (a(h).show().find(">td>span.tree-wrap-" + this.p.direction).removeClass(c).addClass(k), r && a(q).show().find(">td>span.tree-wrap-" + this.p.direction).removeClass(c).addClass(k));
            } else {
              m && (a(h).show(), r && a(q).show());
            }
            h = h.nextSibling;
            r && (q = q.nextSibling);
          }
        }
        g.removeClass(k).addClass(c);
      }
      a(this).triggerHandler("jqGridGroupingClickGroup", [d, n]);
      a.isFunction(this.p.onClickGroup) && this.p.onClickGroup.call(this, d, n);
    });
    return !1;
  }, groupingRender:function(d, f, c, e) {
    return this.each(function() {
      function b(a, c, b) {
        var e = !1;
        if (0 === c) {
          e = b[a];
        } else {
          var d = b[a].idx;
          if (0 === d) {
            e = b[a];
          } else {
            for (;0 <= a;a--) {
              if (b[a].idx === d - c) {
                e = b[a];
                break;
              }
            }
          }
        }
        return e;
      }
      function k(c, e, d, g) {
        var k = b(c, e, d), l = h.p.colModel, m, n = k.cnt;
        c = "";
        var q;
        for (q = g;q < f;q++) {
          var p = "<td " + h.formatCol(q, 1, "") + ">&#160;</td>", r = "{0}";
          a.each(k.summary, function() {
            if (this.nm === l[q].name) {
              l[q].summaryTpl && (r = l[q].summaryTpl);
              "string" === typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v /= this.vd : this.v && 0 < n && (this.v /= n));
              try {
                this.groupCount = k.cnt, this.groupIndex = k.dataIndex, this.groupValue = k.value, m = h.formatter("", this.v, q, this);
              } catch (c) {
                m = this.v;
              }
              p = "<td " + h.formatCol(q, 1, "") + ">" + a.jgrid.format(r, m) + "</td>";
              return !1;
            }
          });
          c += p;
        }
        return c;
      }
      var h = this, g = h.p.groupingView, l = "", m = "", n, r, q = g.groupCollapse ? g.plusicon : g.minusicon, p, t = [], v = g.groupField.length, q = q + (" tree-wrap-" + h.p.direction);
      a.each(h.p.colModel, function(a, c) {
        var b;
        for (b = 0;b < v;b++) {
          if (g.groupField[b] === c.name) {
            t[b] = a;
            break;
          }
        }
      });
      var u = 0, w = a.makeArray(g.groupSummary);
      w.reverse();
      a.each(g.groups, function(b, x) {
        if (g._locgr && !(x.startRow + x.cnt > (c - 1) * e && x.startRow < c * e)) {
          return !0;
        }
        u++;
        r = h.p.id + "ghead_" + x.idx;
        n = r + "_" + b;
        m = "<span style='cursor:pointer;' class='ui-icon " + q + "' onclick=\"jQuery('#" + a.jgrid.jqID(h.p.id) + "').jqGrid('groupingToggle','" + n + "');return false;\"></span>";
        try {
          a.isArray(g.formatDisplayField) && a.isFunction(g.formatDisplayField[x.idx]) ? (x.displayValue = g.formatDisplayField[x.idx].call(h, x.displayValue, x.value, h.p.colModel[t[x.idx]], x.idx, g), p = x.displayValue) : p = h.formatter(n, x.displayValue, t[x.idx], x.value);
        } catch (B) {
          p = x.displayValue;
        }
        "header" === g.groupSummaryPos[x.idx] ? (l += '<tr id="' + n + '"' + (g.groupCollapse && 0 < x.idx ? ' style="display:none;" ' : " ") + 'role="row" class= "ui-widget-content jqgroup ui-row-' + h.p.direction + " " + r + '"><td style="padding-left:' + 12 * x.idx + 'px;">' + m + a.jgrid.template(g.groupText[x.idx], p, x.cnt, x.summary) + "</td>", l += k(b, x.idx - 1, g.groups, 1), l += "</tr>") : l += '<tr id="' + n + '"' + (g.groupCollapse && 0 < x.idx ? ' style="display:none;" ' : " ") + 'role="row" class= "ui-widget-content jqgroup ui-row-' + 
        h.p.direction + " " + r + '"><td style="padding-left:' + 12 * x.idx + 'px;" colspan="' + f + '">' + m + a.jgrid.template(g.groupText[x.idx], p, x.cnt, x.summary) + "</td></tr>";
        if (v - 1 === x.idx) {
          var C = g.groups[b + 1], O, D = 0;
          O = x.startRow;
          var K = void 0 !== C ? g.groups[b + 1].startRow : d.length;
          g._locgr && (D = (c - 1) * e, D > x.startRow && (O = D));
          for (;O < K && d[O - D];O++) {
            l += d[O - D].join("");
          }
          if ("header" !== g.groupSummaryPos[x.idx]) {
            var H;
            if (void 0 !== C) {
              for (H = 0;H < g.groupField.length && C.dataIndex !== g.groupField[H];H++) {
              }
              u = g.groupField.length - H;
            }
            for (C = 0;C < u;C++) {
              w[C] && (D = "", g.groupCollapse && !g.showSummaryOnHide && (D = ' style="display:none;"'), l += "<tr" + D + ' jqfootlevel="' + (x.idx - C) + '" role="row" class="ui-widget-content jqfoot ui-row-' + h.p.direction + '">', l += k(b, C, g.groups, 0), l += "</tr>");
            }
            u = H;
          }
        }
      });
      a("#" + a.jgrid.jqID(h.p.id) + " tbody:first").append(l);
      l = null;
    });
  }, groupingGroupBy:function(d, f) {
    return this.each(function() {
      "string" === typeof d && (d = [d]);
      var c = this.p.groupingView;
      this.p.grouping = !0;
      void 0 === c.visibiltyOnNextGrouping && (c.visibiltyOnNextGrouping = []);
      var e;
      for (e = 0;e < c.groupField.length;e++) {
        !c.groupColumnShow[e] && c.visibiltyOnNextGrouping[e] && a(this).jqGrid("showCol", c.groupField[e]);
      }
      for (e = 0;e < d.length;e++) {
        c.visibiltyOnNextGrouping[e] = a("#" + a.jgrid.jqID(this.p.id) + "_" + a.jgrid.jqID(d[e])).is(":visible");
      }
      this.p.groupingView = a.extend(this.p.groupingView, f || {});
      c.groupField = d;
      a(this).trigger("reloadGrid");
    });
  }, groupingRemove:function(d) {
    return this.each(function() {
      void 0 === d && (d = !0);
      this.p.grouping = !1;
      if (!0 === d) {
        var f = this.p.groupingView, c;
        for (c = 0;c < f.groupField.length;c++) {
          !f.groupColumnShow[c] && f.visibiltyOnNextGrouping[c] && a(this).jqGrid("showCol", f.groupField);
        }
        a("tr.jqgroup, tr.jqfoot", "#" + a.jgrid.jqID(this.p.id) + " tbody:first").remove();
        a("tr.jqgrow:hidden", "#" + a.jgrid.jqID(this.p.id) + " tbody:first").show();
      } else {
        a(this).trigger("reloadGrid");
      }
    });
  }, groupingCalculations:{handler:function(a, f, c, e, b, k) {
    var h = {sum:function() {
      return parseFloat(f || 0) + parseFloat(k[c] || 0);
    }, min:function() {
      return "" === f ? parseFloat(k[c] || 0) : Math.min(parseFloat(f), parseFloat(k[c] || 0));
    }, max:function() {
      return "" === f ? parseFloat(k[c] || 0) : Math.max(parseFloat(f), parseFloat(k[c] || 0));
    }, count:function() {
      "" === f && (f = 0);
      return k.hasOwnProperty(c) ? f + 1 : 0;
    }, avg:function() {
      return h.sum();
    }};
    if (!h[a]) {
      throw "jqGrid Grouping No such method: " + a;
    }
    a = h[a]();
    null != e && ("fixed" === b ? a = a.toFixed(e) : (e = Math.pow(10, e), a = Math.round(a * e) / e));
    return a;
  }}});
})(jQuery);
(function(a) {
  a.jgrid.extend({jqGridImport:function(d) {
    d = a.extend({imptype:"xml", impstring:"", impurl:"", mtype:"GET", impData:{}, xmlGrid:{config:"roots>grid", data:"roots>rows"}, jsonGrid:{config:"grid", data:"data"}, ajaxOptions:{}}, d || {});
    return this.each(function() {
      var f = this, c = function(c, b) {
        var e = a(b.xmlGrid.config, c)[0], d = a(b.xmlGrid.data, c)[0], m, n;
        if (xmlJsonClass.xml2json && a.jgrid.parse) {
          e = xmlJsonClass.xml2json(e, " ");
          e = a.jgrid.parse(e);
          for (n in e) {
            e.hasOwnProperty(n) && (m = e[n]);
          }
          d ? (d = e.grid.datatype, e.grid.datatype = "xmlstring", e.grid.datastr = c, a(f).jqGrid(m).jqGrid("setGridParam", {datatype:d})) : a(f).jqGrid(m);
        } else {
          alert("xml2json or parse are not present");
        }
      }, e = function(c, b) {
        if (c && "string" === typeof c) {
          var e = !1;
          a.jgrid.useJSON && (a.jgrid.useJSON = !1, e = !0);
          var d = a.jgrid.parse(c);
          e && (a.jgrid.useJSON = !0);
          e = d[b.jsonGrid.config];
          if (d = d[b.jsonGrid.data]) {
            var m = e.datatype;
            e.datatype = "jsonstring";
            e.datastr = d;
            a(f).jqGrid(e).jqGrid("setGridParam", {datatype:m});
          } else {
            a(f).jqGrid(e);
          }
        }
      };
      switch(d.imptype) {
        case "xml":
          a.ajax(a.extend({url:d.impurl, type:d.mtype, data:d.impData, dataType:"xml", complete:function(b, e) {
            "success" === e && (c(b.responseXML, d), a(f).triggerHandler("jqGridImportComplete", [b, d]), a.isFunction(d.importComplete) && d.importComplete(b));
          }}, d.ajaxOptions));
          break;
        case "xmlstring":
          if (d.impstring && "string" === typeof d.impstring) {
            var b = a.parseXML(d.impstring);
            b && (c(b, d), a(f).triggerHandler("jqGridImportComplete", [b, d]), a.isFunction(d.importComplete) && d.importComplete(b), d.impstring = null);
            b = null;
          }
          break;
        case "json":
          a.ajax(a.extend({url:d.impurl, type:d.mtype, data:d.impData, dataType:"json", complete:function(c) {
            try {
              e(c.responseText, d), a(f).triggerHandler("jqGridImportComplete", [c, d]), a.isFunction(d.importComplete) && d.importComplete(c);
            } catch (b) {
            }
          }}, d.ajaxOptions));
          break;
        case "jsonstring":
          d.impstring && "string" === typeof d.impstring && (e(d.impstring, d), a(f).triggerHandler("jqGridImportComplete", [d.impstring, d]), a.isFunction(d.importComplete) && d.importComplete(d.impstring), d.impstring = null);
      }
    });
  }, jqGridExport:function(d) {
    d = a.extend({exptype:"xmlstring", root:"grid", ident:"\t"}, d || {});
    var f = null;
    this.each(function() {
      if (this.grid) {
        var c, e = a.extend(!0, {}, a(this).jqGrid("getGridParam"));
        e.rownumbers && (e.colNames.splice(0, 1), e.colModel.splice(0, 1));
        e.multiselect && (e.colNames.splice(0, 1), e.colModel.splice(0, 1));
        e.subGrid && (e.colNames.splice(0, 1), e.colModel.splice(0, 1));
        e.knv = null;
        if (e.treeGrid) {
          for (c in e.treeReader) {
            e.treeReader.hasOwnProperty(c) && (e.colNames.splice(e.colNames.length - 1), e.colModel.splice(e.colModel.length - 1));
          }
        }
        switch(d.exptype) {
          case "xmlstring":
            f = "<" + d.root + ">" + xmlJsonClass.json2xml(e, d.ident) + "</" + d.root + ">";
            break;
          case "jsonstring":
            f = "{" + xmlJsonClass.toJson(e, d.root, d.ident, !1) + "}", void 0 !== e.postData.filters && (f = f.replace(/filters":"/, 'filters":'), f = f.replace(/}]}"/, "}]}"));
        }
      }
    });
    return f;
  }, excelExport:function(d) {
    d = a.extend({exptype:"remote", url:null, oper:"oper", tag:"excel", exportOptions:{}}, d || {});
    return this.each(function() {
      if (this.grid) {
        var f;
        "remote" === d.exptype && (f = a.extend({}, this.p.postData), f[d.oper] = d.tag, f = jQuery.param(f), f = -1 !== d.url.indexOf("?") ? d.url + "&" + f : d.url + "?" + f, window.location = f);
      }
    });
  }});
})(jQuery);
(function(a) {
  a.jgrid.msie && 8 === a.jgrid.msiever() && (a.expr[":"].hidden = function(a) {
    return 0 === a.offsetWidth || 0 === a.offsetHeight || "none" === a.style.display;
  });
  a.jgrid._multiselect = !1;
  if (a.ui && a.ui.multiselect) {
    if (a.ui.multiselect.prototype._setSelected) {
      var d = a.ui.multiselect.prototype._setSelected;
      a.ui.multiselect.prototype._setSelected = function(f, c) {
        var e = d.call(this, f, c);
        if (c && this.selectedList) {
          var b = this.element;
          this.selectedList.find("li").each(function() {
            a(this).data("optionLink") && a(this).data("optionLink").remove().appendTo(b);
          });
        }
        return e;
      };
    }
    a.ui.multiselect.prototype.destroy && (a.ui.multiselect.prototype.destroy = function() {
      this.element.show();
      this.container.remove();
      void 0 === a.Widget ? a.widget.prototype.destroy.apply(this, arguments) : a.Widget.prototype.destroy.apply(this, arguments);
    });
    a.jgrid._multiselect = !0;
  }
  a.jgrid.extend({sortableColumns:function(d) {
    return this.each(function() {
      function c() {
        e.p.disableClick = !0;
      }
      var e = this, b = a.jgrid.jqID(e.p.id), b = {tolerance:"pointer", axis:"x", scrollSensitivity:"1", items:">th:not(:has(#jqgh_" + b + "_cb,#jqgh_" + b + "_rn,#jqgh_" + b + "_subgrid),:hidden)", placeholder:{element:function(c) {
        return a(document.createElement(c[0].nodeName)).addClass(c[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0];
      }, update:function(a, c) {
        c.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10));
        c.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10));
      }}, update:function(c, b) {
        var d = a(b.item).parent(), d = a(">th", d), f = {}, k = e.p.id + "_";
        a.each(e.p.colModel, function(a) {
          f[this.name] = a;
        });
        var r = [];
        d.each(function() {
          var c = a(">div", this).get(0).id.replace(/^jqgh_/, "").replace(k, "");
          f.hasOwnProperty(c) && r.push(f[c]);
        });
        a(e).jqGrid("remapColumns", r, !0, !0);
        a.isFunction(e.p.sortable.update) && e.p.sortable.update(r);
        setTimeout(function() {
          e.p.disableClick = !1;
        }, 50);
      }};
      e.p.sortable.options ? a.extend(b, e.p.sortable.options) : a.isFunction(e.p.sortable) && (e.p.sortable = {update:e.p.sortable});
      if (b.start) {
        var k = b.start;
        b.start = function(a, b) {
          c();
          k.call(this, a, b);
        };
      } else {
        b.start = c;
      }
      e.p.sortable.exclude && (b.items += ":not(" + e.p.sortable.exclude + ")");
      d.sortable(b).data("sortable").floating = !0;
    });
  }, columnChooser:function(d) {
    function c(c, b) {
      c && ("string" === typeof c ? a.fn[c] && a.fn[c].apply(b, a.makeArray(arguments).slice(2)) : a.isFunction(c) && c.apply(b, a.makeArray(arguments).slice(2)));
    }
    var e = this;
    if (!a("#colchooser_" + a.jgrid.jqID(e[0].p.id)).length) {
      var b = a('<div id="colchooser_' + e[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'), k = a("select", b);
      d = a.extend({width:420, height:240, classname:null, done:function(a) {
        a && e.jqGrid("remapColumns", a, !0);
      }, msel:"multiselect", dlog:"dialog", dialog_opts:{minWidth:470}, dlog_opts:function(c) {
        var b = {};
        b[c.bSubmit] = function() {
          c.apply_perm();
          c.cleanup(!1);
        };
        b[c.bCancel] = function() {
          c.cleanup(!0);
        };
        return a.extend(!0, {buttons:b, close:function() {
          c.cleanup(!0);
        }, modal:c.modal || !1, resizable:c.resizable || !0, width:c.width + 20}, c.dialog_opts || {});
      }, apply_perm:function() {
        a("option", k).each(function() {
          this.selected ? e.jqGrid("showCol", h[this.value].name) : e.jqGrid("hideCol", h[this.value].name);
        });
        var c = [];
        a("option:selected", k).each(function() {
          c.push(parseInt(this.value, 10));
        });
        a.each(c, function() {
          delete l[h[parseInt(this, 10)].name];
        });
        a.each(l, function() {
          var a = parseInt(this, 10);
          var b = c, e = a;
          if (0 <= e) {
            var d = b.slice(), f = d.splice(e, Math.max(b.length - e, e));
            e > b.length && (e = b.length);
            d[e] = a;
            c = d.concat(f);
          } else {
            c = void 0;
          }
        });
        d.done && d.done.call(e, c);
      }, cleanup:function(a) {
        c(d.dlog, b, "destroy");
        c(d.msel, k, "destroy");
        b.remove();
        a && d.done && d.done.call(e);
      }, msel_opts:{}}, a.jgrid.col, d || {});
      if (a.ui && a.ui.multiselect && "multiselect" === d.msel) {
        if (!a.jgrid._multiselect) {
          alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
          return;
        }
        d.msel_opts = a.extend(a.ui.multiselect.defaults, d.msel_opts);
      }
      d.caption && b.attr("title", d.caption);
      d.classname && (b.addClass(d.classname), k.addClass(d.classname));
      d.width && (a(">div", b).css({width:d.width, margin:"0 auto"}), k.css("width", d.width));
      d.height && (a(">div", b).css("height", d.height), k.css("height", d.height - 10));
      var h = e.jqGrid("getGridParam", "colModel"), g = e.jqGrid("getGridParam", "colNames"), l = {}, m = [];
      k.empty();
      a.each(h, function(c) {
        l[this.name] = c;
        this.hidedlg ? this.hidden || m.push(c) : k.append("<option value='" + c + "' " + (this.hidden ? "" : "selected='selected'") + ">" + a.jgrid.stripHtml(g[c]) + "</option>");
      });
      var n = a.isFunction(d.dlog_opts) ? d.dlog_opts.call(e, d) : d.dlog_opts;
      c(d.dlog, b, n);
      n = a.isFunction(d.msel_opts) ? d.msel_opts.call(e, d) : d.msel_opts;
      c(d.msel, k, n);
    }
  }, sortableRows:function(d) {
    return this.each(function() {
      var c = this;
      c.grid && !c.p.treeGrid && a.fn.sortable && (d = a.extend({cursor:"move", axis:"y", items:".jqgrow"}, d || {}), d.start && a.isFunction(d.start) ? (d._start_ = d.start, delete d.start) : d._start_ = !1, d.update && a.isFunction(d.update) ? (d._update_ = d.update, delete d.update) : d._update_ = !1, d.start = function(e, b) {
        a(b.item).css("border-width", "0");
        a("td", b.item).each(function(a) {
          this.style.width = c.grid.cols[a].style.width;
        });
        if (c.p.subGrid) {
          var k = a(b.item).attr("id");
          try {
            a(c).jqGrid("collapseSubGridRow", k);
          } catch (h) {
          }
        }
        d._start_ && d._start_.apply(this, [e, b]);
      }, d.update = function(e, b) {
        a(b.item).css("border-width", "");
        !0 === c.p.rownumbers && a("td.jqgrid-rownum", c.rows).each(function(b) {
          a(this).html(b + 1 + (parseInt(c.p.page, 10) - 1) * parseInt(c.p.rowNum, 10));
        });
        d._update_ && d._update_.apply(this, [e, b]);
      }, a("tbody:first", c).sortable(d), a("tbody:first", c).disableSelection());
    });
  }, gridDnD:function(d) {
    return this.each(function() {
      function c() {
        var c = a.data(e, "dnd");
        a("tr.jqgrow:not(.ui-draggable)", e).draggable(a.isFunction(c.drag) ? c.drag.call(a(e), c) : c.drag);
      }
      var e = this, b, k;
      if (e.grid && !e.p.treeGrid && a.fn.draggable && a.fn.droppable) {
        if (void 0 === a("#jqgrid_dnd")[0] && a("body").append("<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>"), "string" === typeof d && "updateDnD" === d && !0 === e.p.jqgdnd) {
          c();
        } else {
          if (d = a.extend({drag:function(c) {
            return a.extend({start:function(b, d) {
              var f;
              if (e.p.subGrid) {
                f = a(d.helper).attr("id");
                try {
                  a(e).jqGrid("collapseSubGridRow", f);
                } catch (k) {
                }
              }
              for (f = 0;f < a.data(e, "dnd").connectWith.length;f++) {
                0 === a(a.data(e, "dnd").connectWith[f]).jqGrid("getGridParam", "reccount") && a(a.data(e, "dnd").connectWith[f]).jqGrid("addRowData", "jqg_empty_row", {});
              }
              d.helper.addClass("ui-state-highlight");
              a("td", d.helper).each(function(a) {
                this.style.width = e.grid.headers[a].width + "px";
              });
              c.onstart && a.isFunction(c.onstart) && c.onstart.call(a(e), b, d);
            }, stop:function(b, d) {
              var f;
              d.helper.dropped && !c.dragcopy && (f = a(d.helper).attr("id"), void 0 === f && (f = a(this).attr("id")), a(e).jqGrid("delRowData", f));
              for (f = 0;f < a.data(e, "dnd").connectWith.length;f++) {
                a(a.data(e, "dnd").connectWith[f]).jqGrid("delRowData", "jqg_empty_row");
              }
              c.onstop && a.isFunction(c.onstop) && c.onstop.call(a(e), b, d);
            }}, c.drag_opts || {});
          }, drop:function(c) {
            return a.extend({accept:function(c) {
              if (!a(c).hasClass("jqgrow")) {
                return c;
              }
              c = a(c).closest("table.ui-jqgrid-btable");
              return 0 < c.length && void 0 !== a.data(c[0], "dnd") ? (c = a.data(c[0], "dnd").connectWith, -1 !== a.inArray("#" + a.jgrid.jqID(this.id), c) ? !0 : !1) : !1;
            }, drop:function(b, d) {
              if (a(d.draggable).hasClass("jqgrow")) {
                var f = a(d.draggable).attr("id"), f = d.draggable.parent().parent().jqGrid("getRowData", f);
                if (!c.dropbyname) {
                  var k = 0, r = {}, q, p, t = a("#" + a.jgrid.jqID(this.id)).jqGrid("getGridParam", "colModel");
                  try {
                    for (p in f) {
                      f.hasOwnProperty(p) && (q = t[k].name, "cb" !== q && "rn" !== q && "subgrid" !== q && f.hasOwnProperty(p) && t[k] && (r[q] = f[p]), k++);
                    }
                    f = r;
                  } catch (v) {
                  }
                }
                d.helper.dropped = !0;
                c.beforedrop && a.isFunction(c.beforedrop) && (q = c.beforedrop.call(this, b, d, f, a("#" + a.jgrid.jqID(e.p.id)), a(this)), void 0 !== q && null !== q && "object" === typeof q && (f = q));
                if (d.helper.dropped) {
                  var u;
                  c.autoid && (a.isFunction(c.autoid) ? u = c.autoid.call(this, f) : (u = Math.ceil(1E3 * Math.random()), u = c.autoidprefix + u));
                  a("#" + a.jgrid.jqID(this.id)).jqGrid("addRowData", u, f, c.droppos);
                }
                c.ondrop && a.isFunction(c.ondrop) && c.ondrop.call(this, b, d, f);
              }
            }}, c.drop_opts || {});
          }, onstart:null, onstop:null, beforedrop:null, ondrop:null, drop_opts:{activeClass:"ui-state-active", hoverClass:"ui-state-hover"}, drag_opts:{revert:"invalid", helper:"clone", cursor:"move", appendTo:"#jqgrid_dnd", zIndex:5E3}, dragcopy:!1, dropbyname:!1, droppos:"first", autoid:!0, autoidprefix:"dnd_"}, d || {}), d.connectWith) {
            for (d.connectWith = d.connectWith.split(","), d.connectWith = a.map(d.connectWith, function(c) {
              return a.trim(c);
            }), a.data(e, "dnd", d), 0 === e.p.reccount || e.p.jqgdnd || c(), e.p.jqgdnd = !0, b = 0;b < d.connectWith.length;b++) {
              k = d.connectWith[b], a(k).droppable(a.isFunction(d.drop) ? d.drop.call(a(e), d) : d.drop);
            }
          }
        }
      }
    });
  }, gridResize:function(d) {
    return this.each(function() {
      var c = this, e = a.jgrid.jqID(c.p.id);
      c.grid && a.fn.resizable && (d = a.extend({}, d || {}), d.alsoResize ? (d._alsoResize_ = d.alsoResize, delete d.alsoResize) : d._alsoResize_ = !1, d.stop && a.isFunction(d.stop) ? (d._stop_ = d.stop, delete d.stop) : d._stop_ = !1, d.stop = function(b, k) {
        a(c).jqGrid("setGridParam", {height:a("#gview_" + e + " .ui-jqgrid-bdiv").height()});
        a(c).jqGrid("setGridWidth", k.size.width, d.shrinkToFit);
        d._stop_ && d._stop_.call(c, b, k);
      }, d.alsoResize = d._alsoResize_ ? eval("(" + ("{'#gview_" + e + " .ui-jqgrid-bdiv':true,'" + d._alsoResize_ + "':true}") + ")") : a(".ui-jqgrid-bdiv", "#gview_" + e), delete d._alsoResize_, a("#gbox_" + e).resizable(d));
    });
  }});
})(jQuery);
function tableToGrid(a, d) {
  jQuery(a).each(function() {
    if (!this.grid) {
      jQuery(this).width("99%");
      var a = jQuery(this).width(), c = jQuery("tr td:first-child input[type=checkbox]:first", jQuery(this)), e = jQuery("tr td:first-child input[type=radio]:first", jQuery(this)), c = 0 < c.length, e = !c && 0 < e.length, b = c || e, k = [], h = [];
      jQuery("th", jQuery(this)).each(function() {
        0 === k.length && b ? (k.push({name:"__selection__", index:"__selection__", width:0, hidden:!0}), h.push("__selection__")) : (k.push({name:jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"), index:jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"), width:jQuery(this).width() || 150}), h.push(jQuery(this).html()));
      });
      var g = [], l = [], m = [];
      jQuery("tbody > tr", jQuery(this)).each(function() {
        var a = {}, c = 0;
        jQuery("td", jQuery(this)).each(function() {
          if (0 === c && b) {
            var e = jQuery("input", jQuery(this)), d = e.attr("value");
            l.push(d || g.length);
            e.is(":checked") && m.push(d);
            a[k[c].name] = e.attr("value");
          } else {
            a[k[c].name] = jQuery(this).html();
          }
          c++;
        });
        0 < c && g.push(a);
      });
      jQuery(this).empty();
      jQuery(this).addClass("scroll");
      jQuery(this).jqGrid(jQuery.extend({datatype:"local", width:a, colNames:h, colModel:k, multiselect:c}, d || {}));
      for (a = 0;a < g.length;a++) {
        e = null, 0 < l.length && (e = l[a]) && e.replace && (e = encodeURIComponent(e).replace(/[.\-%]/g, "_")), null === e && (e = a + 1), jQuery(this).jqGrid("addRowData", e, g[a]);
      }
      for (a = 0;a < m.length;a++) {
        jQuery(this).jqGrid("setSelection", m[a]);
      }
    }
  });
}
(function(a) {
  function d(a, c) {
    var e, b, d = [], h;
    if (!this || "function" !== typeof a || a instanceof RegExp) {
      throw new TypeError;
    }
    h = this.length;
    for (e = 0;e < h;e++) {
      if (this.hasOwnProperty(e) && (b = this[e], a.call(c, b, e, this))) {
        d.push(b);
        break;
      }
    }
    return d;
  }
  a.assocArraySize = function(a) {
    var c = 0, e;
    for (e in a) {
      a.hasOwnProperty(e) && c++;
    }
    return c;
  };
  a.jgrid.extend({pivotSetup:function(f, c) {
    var e = [], b = [], k = [], h = [], g = {grouping:!0, groupingView:{groupField:[], groupSummary:[], groupSummaryPos:[]}}, l = [], m = a.extend({rowTotals:!1, rowTotalsText:"Total", colTotals:!1, groupSummary:!0, groupSummaryPos:"header", frozenStaticCols:!1}, c || {});
    this.each(function() {
      function c(a, b, e) {
        a = d.call(a, b, e);
        return 0 < a.length ? a[0] : null;
      }
      function r(a, c) {
        var b = 0, e = !0, d;
        for (d in a) {
          if (a[d] != this[b]) {
            e = !1;
            break;
          }
          b++;
          if (b >= this.length) {
            break;
          }
        }
        e && (v = c);
        return e;
      }
      function q(c, b, e, d) {
        var f = b.length, g, k, l, m;
        m = a.isArray(e) ? e.length : 1;
        h = [];
        for (l = h.root = 0;l < m;l++) {
          var n = [], q;
          for (g = 0;g < f;g++) {
            if (null == e) {
              q = k = a.trim(b[g].member) + "_" + b[g].aggregator;
            } else {
              q = e[l].replace(/\s+/g, "");
              try {
                k = 1 === f ? q : q + "_" + b[g].aggregator + "_" + g;
              } catch (p) {
              }
            }
            var r = k, t = n, v = k, u = d[k], w = b[g].member, x = c, R = void 0;
            switch(b[g].aggregator) {
              case "sum":
                R = parseFloat(u || 0) + parseFloat(x[w] || 0);
                break;
              case "count":
                if ("" === u || null == u) {
                  u = 0;
                }
                R = x.hasOwnProperty(w) ? u + 1 : 0;
                break;
              case "min":
                R = "" === u || null == u ? parseFloat(x[w] || 0) : Math.min(parseFloat(u), parseFloat(x[w] || 0));
                break;
              case "max":
                R = "" === u || null == u ? parseFloat(x[w] || 0) : Math.max(parseFloat(u), parseFloat(x[w] || 0));
            }
            d[r] = t[v] = R;
          }
          h[q] = n;
        }
        return d;
      }
      function p(a) {
        var c, b, d, f, g;
        for (d in a) {
          if (a.hasOwnProperty(d)) {
            if ("object" !== typeof a[d] && ("level" === d && (void 0 === ha[a.level] && (ha[a.level] = "", 0 < a.level && "_r_Totals" !== a.text && (l[a.level - 1] = {useColSpanStyle:!1, groupHeaders:[]})), ha[a.level] !== a.text && a.children.length && "_r_Totals" !== a.text && 0 < a.level && (l[a.level - 1].groupHeaders.push({titleText:a.text}), b = l[a.level - 1].groupHeaders.length, g = 1 === b ? da : ca + (b - 1) * B, l[a.level - 1].groupHeaders[b - 1].startColumnName = e[g].name, l[a.level - 
            1].groupHeaders[b - 1].numberOfColumns = e.length - g, ca = e.length), ha[a.level] = a.text), a.level === x && "level" === d && 0 < x)) {
              if (1 < B) {
                b = 1;
                for (c in a.fields) {
                  1 === b && l[x - 1].groupHeaders.push({startColumnName:c, numberOfColumns:1, titleText:a.text}), b++;
                }
                l[x - 1].groupHeaders[l[x - 1].groupHeaders.length - 1].numberOfColumns = b - 1;
              } else {
                l.splice(x - 1, 1);
              }
            }
            null != a[d] && "object" === typeof a[d] && p(a[d]);
            if ("level" === d && 0 < a.level) {
              for (c in b = 0, a.fields) {
                g = {};
                for (f in m.aggregates[b]) {
                  if (m.aggregates[b].hasOwnProperty(f)) {
                    switch(f) {
                      case "member":
                      ;
                      case "label":
                      ;
                      case "aggregator":
                        break;
                      default:
                        g[f] = m.aggregates[b][f];
                    }
                  }
                }
                1 < B ? (g.name = c, g.label = m.aggregates[b].label || c) : (g.name = a.text, g.label = "_r_Totals" === a.text ? m.rowTotalsText : a.text);
                e.push(g);
                b++;
              }
            }
          }
        }
      }
      var t, v, u, w = f.length, y, x, B, C, O = 0;
      m.rowTotals && 0 < m.yDimension.length && (m.yDimension.splice(0, 0, {dataName:m.yDimension[0].dataName}), m.yDimension[0].converter = function() {
        return "_r_Totals";
      });
      y = a.isArray(m.xDimension) ? m.xDimension.length : 0;
      x = m.yDimension.length;
      B = a.isArray(m.aggregates) ? m.aggregates.length : 0;
      if (0 === y || 0 === B) {
        throw "xDimension or aggregates optiona are not set!";
      }
      var D;
      for (u = 0;u < y;u++) {
        D = {name:m.xDimension[u].dataName, frozen:m.frozenStaticCols}, D = a.extend(!0, D, m.xDimension[u]), e.push(D);
      }
      D = y - 1;
      for (var K = {};O < w;) {
        t = f[O];
        var H = [], z = [];
        C = {};
        u = 0;
        do {
          H[u] = a.trim(t[m.xDimension[u].dataName]), C[m.xDimension[u].dataName] = H[u], u++;
        } while (u < y);
        var P = 0;
        v = -1;
        u = c(b, r, H);
        if (!u) {
          P = 0;
          if (1 <= x) {
            for (P = 0;P < x;P++) {
              z[P] = a.trim(t[m.yDimension[P].dataName]), m.yDimension[P].converter && a.isFunction(m.yDimension[P].converter) && (z[P] = m.yDimension[P].converter.call(this, z[P], H, z));
            }
            C = q(t, m.aggregates, z, C);
          } else {
            0 === x && (C = q(t, m.aggregates, null, C));
          }
          b.push(C);
        } else {
          if (0 <= v) {
            P = 0;
            if (1 <= x) {
              for (P = 0;P < x;P++) {
                z[P] = a.trim(t[m.yDimension[P].dataName]), m.yDimension[P].converter && a.isFunction(m.yDimension[P].converter) && (z[P] = m.yDimension[P].converter.call(this, z[P], H, z));
              }
              u = q(t, m.aggregates, z, u);
            } else {
              0 === x && (u = q(t, m.aggregates, null, u));
            }
            b[v] = u;
          }
        }
        t = 0;
        var H = C = null, L;
        for (L in h) {
          if (0 === t) {
            K.children && void 0 !== K.children || (K = {text:L, level:0, children:[]}), C = K.children;
          } else {
            H = null;
            for (u = 0;u < C.length;u++) {
              if (C[u].text === L) {
                H = C[u];
                break;
              }
            }
            H ? C = H.children : (C.push({children:[], text:L, level:t, fields:h[L]}), C = C[C.length - 1].children);
          }
          t++;
        }
        O++;
      }
      var ha = [], ca = e.length, da = ca;
      0 < x && (l[x - 1] = {useColSpanStyle:!1, groupHeaders:[]});
      p(K, 0);
      if (m.colTotals) {
        for (O = b.length;O--;) {
          for (u = y;u < e.length;u++) {
            w = e[u].name, k[w] = k[w] ? k[w] + parseFloat(b[O][w] || 0) : parseFloat(b[O][w] || 0);
          }
        }
      }
      if (0 < D) {
        for (u = 0;u < D;u++) {
          g.groupingView.groupField[u] = e[u].name, g.groupingView.groupSummary[u] = m.groupSummary, g.groupingView.groupSummaryPos[u] = m.groupSummaryPos;
        }
      } else {
        g.grouping = !1;
      }
      g.sortname = e[D].name;
      g.groupingView.hideFirstGroupCol = !0;
    });
    return {colModel:e, rows:b, groupOptions:g, groupHeaders:l, summary:k};
  }, jqPivot:function(d, c, e, b) {
    return this.each(function() {
      function k(b) {
        var d = jQuery(h).jqGrid("pivotSetup", b, c), f = 0 < a.assocArraySize(d.summary) ? !0 : !1, k = a.jgrid.from(d.rows);
        for (b = 0;b < d.groupOptions.groupingView.groupField.length;b++) {
          k.orderBy(d.groupOptions.groupingView.groupField[b], "a", "text", "");
        }
        jQuery(h).jqGrid(a.extend({datastr:a.extend(k.select(), f ? {userdata:d.summary} : {}), datatype:"jsonstring", footerrow:f, userDataOnFooter:f, colModel:d.colModel, viewrecords:!0, sortname:c.xDimension[0].dataName}, e || {}, d.groupOptions));
        d = d.groupHeaders;
        if (d.length) {
          for (b = 0;b < d.length;b++) {
            d[b] && d[b].groupHeaders.length && jQuery(h).jqGrid("setGroupHeaders", d[b]);
          }
        }
        c.frozenStaticCols && jQuery(h).jqGrid("setFrozenColumns");
      }
      var h = this;
      "string" === typeof d ? a.ajax(a.extend({url:d, dataType:"json", success:function(c) {
        k(a.jgrid.getAccessor(c, b && b.reader ? b.reader : "rows"));
      }}, b || {})) : k(d);
    });
  }});
})(jQuery);
// Input 2
eval(function(a, d, f, c, e, b) {
  e = function(a) {
    return (a < d ? "" : e(parseInt(a / d))) + (35 < (a %= d) ? String.fromCharCode(a + 29) : a.toString(36));
  };
  if (!"".replace(/^/, String)) {
    for (;f--;) {
      b[e(f)] = c[f] || e(f);
    }
    c = [function(a) {
      return b[a];
    }];
    e = function() {
      return "\\w+";
    };
    f = 1;
  }
  for (;f--;) {
    c[f] && (a = a.replace(new RegExp("\\b" + e(f) + "\\b", "g"), c[f]));
  }
  return a;
}('4 1E=1E||{};(9($){1E={3Y:{2o:\'3.5.2\'},3Z:"5D 5E",3q:20,41:9(v){6(v!==14){$(".2X").1m({1w:\'3r\',2b:\'4L\'})}1d{$(".2X").1m({1w:\'4M\',2b:\'3s\'})}},3t:\'\',3u:9(a,b,c){c=c||"42";4 d;25(c.2p()){1i"42":1i"4N":d=$(a).2o(b).1b("1V");1j}15 d}};$.3v={};$.2o={};$.2Y(11,$.3v,1E);$.2Y(11,$.2o,1E);6($.1P.1M===1B){$.1P.1M=$.1P.5F}6($.1P.18===1B){$.1P.18=$.1P.5G;$.1P.1x=$.1P.5H}6(1y $.3w.4O===\'9\'){$.3w[\':\'].43=$.3w.4O(9(b){15 9(a){15 $(a).1p().3x().3y(b.3x())>=0}})}1d{$.3w[\':\'].43=9(a,i,m){15 $(a).1p().3x().3y(m[3].3x())>=0}}9 1V(q,t){4 t=$.2Y(11,{1N:{1b:1g,1n:0,3z:1g,2c:0,1Q:14,2Z:5I},3A:\'1V\',1w:5J,1W:7,3B:0,30:11,1J:5K,26:14,3C:\'5L\',2q:\'1X\',3D:\'3r\',2d:11,1C:\'\',3E:0.7,44:11,3F:0,1u:14,3G:\'5M\',2e:\'\',2f:\'\',2g:11,1F:11,2r:11,18:{3u:1g,2G:1g,3H:1g,28:1g,1G:1g,2H:1g,2I:1g,1X:1g,45:1g,48:1g,2s:1g,2J:1g,31:1g,2t:1g,2u:1g}},t);4 u=1a;4 x={49:\'5N\',1R:\'5O\',4a:\'5P\',2h:\'5Q\',1l:\'5R\'};4 y={1V:t.3A,32:\'32\',4P:\'5S 5T\',4b:\'4b\',3I:\'3I\',2K:\'2K\',1q:\'1q\',2X:\'2X\',4Q:\'4Q\',4R:\'4R\',19:\'19\',4c:\'4c\',3J:"3J",4d:"4d",1h:"1h",33:"5U",34:\'34\',3K:\'3K\'};4 z={12:\'5V\',2v:\'2v\',4S:\'5W 4T\',3L:"3L"};4 A=14,1Y=14,1k=14,3M={},q,35={},36=14;4 B=40,4e=38,4f=37,4g=39,4U=27,4h=13,3a=47,4i=16,4j=17,4V=8,4W=46;4 C=14,2i=14,3b=1g,2L=14,3c,5X=14;4 D=3d,3e=4k.5Y.5Z,4X=3e.60(/61/i);t.2g=t.2g.2j();t.1F=t.1F.2j();4 E=9(a){15(62.4Y.2j.4Z(a)=="[50 51]")?11:14};4 F=9(){4 a=3e.3y("63");6(a>0){15 2w(3e.64(a+5,3e.3y(".",a)))}1d{15 0}};4 G=9(){t.3A=$("#"+q).1b("65")||t.3A;t.1W=$("#"+q).1b("66")||t.1W;6($("#"+q).1b("52")==14){t.30=$("#"+q).1b("52")};t.26=$("#"+q).1b("53")||t.26;t.3C=$("#"+q).1b("67")||t.3C;t.2q=$("#"+q).1b("2q")||t.2q;t.3D=$("#"+q).1b("68")||t.3D;t.2d=$("#"+q).1b("69")||t.2d;t.3E=$("#"+q).1b("6a")||t.3E;t.3F=$("#"+q).1b("54")||t.3F;t.1u=$("#"+q).1b("6b")||t.1u;t.3G=$("#"+q).1b("6c")||t.3G;t.2e=$("#"+q).1b("2e")||t.2e;t.2f=$("#"+q).1b("2f")||t.2f;t.2g=$("#"+q).1b("6d")||t.2g;t.1F=$("#"+q).1b("6e")||t.1F;t.2r=$("#"+q).1b("6f")||t.2r;t.2g=t.2g.2j();t.1F=t.1F.2j();t.2r=t.2r.2j()};4 H=9(a){6(3M[a]===1B){3M[a]=D.6g(a)}15 3M[a]};4 I=9(a){4 b=L("1l");15 $("#"+b+" 12."+z.12).1o(a)};4 J=9(){6(t.1N.1b){4 a=["1h","1D","1r"];2M{6(!q.1H){q.1H="42"+1E.3q};t.1N.1b=55(t.1N.1b);4 b="6h"+(1E.3q++);4 c={};c.1H=b;c.3z=t.1N.3z||q.1H;6(t.1N.2c>0){c.2c=t.1N.2c};c.1Q=t.1N.1Q;4 d=O("4N",c);1Z(4 i=0;i<t.1N.1b.1c;i++){4 f=t.1N.1b[i];4 g=3N 4l(f.1p,f.1f);1Z(4 p 3O f){6(p.2p()!=\'1p\'){4 h=($.6i(p.2p(),a)!=-1)?"1b-":"";g.6j(h+p,f[p])}};d.1K[i]=g};H(q.1H).1s(d);d.1n=t.1N.1n;$(d).1m({2Z:t.1N.2Z+\'2N\'});q=d}2O(e){6k"6l 6m 6n 6o 3O 6p 1b.";}}};4 K=9(){J();6(!q.1H){q.1H="6q"+(1E.3q++)};q=q.1H;u.6r=q;G();1k=H(q).2K;4 a=t.1u;6(a.2j()==="11"){H(q).1Q=11;t.1u=11};A=(H(q).2c>1||H(q).1Q==11)?11:14;6(A){1Y=H(q).1Q};56();57();1v("58",2k());1v("59",$("#"+q+" 1S:19"));4 b=L("1l");3c=$("#"+b+" 12."+y.19);6(t.2g==="11"){$("#"+q).18("2H",9(){21(1a.1n)})};H(q).4m=9(e){$("#"+q).2o().1b("1V").4m()}};4 L=9(a){15 q+x[a]};4 M=9(a){4 s=(a.1C===1B)?"":a.1C.5a;15 s};4 N=9(a){4 b=\'\',1r=\'\',1h=\'\',1f=-1,1p=\'\',1e=\'\',1z=\'\',1o;6(a!==1B){4 c=a.1r||"";6(c!=""){4 d=/^\\{.*\\}$/;4 e=d.6s(c);6(e&&t.2d){4 f=55("["+c+"]")};1r=(e&&t.2d)?f[0].1r:1r;1h=(e&&t.2d)?f[0].1h:1h;b=(e&&t.2d)?f[0].1D:c;1z=(e&&t.2d)?f[0].1z:1z;1o=a.1o};1p=a.1p||\'\';1f=a.1f||\'\';1e=a.1e||"";1r=$(a).1M("1b-1r")||$(a).1b("1r")||(1r||"");1h=$(a).1M("1b-1h")||$(a).1b("1h")||(1h||"");b=$(a).1M("1b-1D")||$(a).1b("1D")||(b||"");1z=$(a).1M("1b-1z")||$(a).1b("1z")||(1z||"");1o=$(a).1o()};4 o={1D:b,1r:1r,1h:1h,1f:1f,1p:1p,1e:1e,1z:1z,1o:1o};15 o};4 O=9(a,b,c){4 d=D.6t(a);6(b){1Z(4 i 3O b){25(i){1i"1C":d.1C.5a=b[i];1j;2P:d[i]=b[i];1j}}};6(c){d.6u=c};15 d};4 P=9(){4 a=L("49");6($("#"+a).1c==0){4 b={1C:\'1w: 4M;4n: 2x;2b: 3s;\',1e:y.2X};b.1H=a;4 c=O("2Q",b);$("#"+q).5b(c);$("#"+q).6v($("#"+a))}1d{$("#"+a).1m({1w:0,4n:\'2x\',2b:\'3s\'})};H(q).3f=-1};4 Q=9(){4 a=(t.1F=="11")?" 2R":"";4 b={1e:y.1V+" 5c"+a};4 c=M(H(q));4 w=$("#"+q).6w();b.1C="2Z: "+w+"2N;";6(c.1c>0){b.1C=b.1C+""+c};b.1H=L("1R");b.3f=H(q).3f;4 d=O("2Q",b);15 d};4 R=9(){4 a;6(H(q).1n>=0){a=H(q).1K[H(q).1n]}1d{a={1f:\'\',1p:\'\'}}4 b="",4o="";4 c=$("#"+q).1b("53");6(c){t.26=c};6(t.26!=14){b=" "+t.26;4o=" "+a.1e};4 d=(t.1F=="11")?" "+z.2v:"";4 e=O("2Q",{1e:y.32+b+d});4 f=O("2l",{1e:y.4c});4 g=O("2l",{1e:y.4P});4 h=L("4a");4 i=O("2l",{1e:y.3I+4o,1H:h});4 j=N(a);4 k=j.1D;4 l=j.1p||"";6(k!=""&&t.30){4 m=O("3P");m.4p=k;6(j.1z!=""){m.1e=j.1z+" "}};4 n=O("2l",{1e:y.33},l);e.1s(f);e.1s(g);6(m){i.1s(m)};i.1s(n);e.1s(i);4 o=O("2l",{1e:y.1h},j.1h);i.1s(o);15 e};4 S=9(){4 a=L("2h");4 b=(t.1F=="11")?"2R":"";4 c=O("2y",{1H:a,5d:\'1p\',1f:\'\',6x:\'1x\',1e:\'1p 4T \'+b,1C:\'22: 2z\'});15 c};4 T=9(a){4 b={};4 c=M(a);6(c.1c>0){b.1C=c};4 d=(a.2K)?y.2K:y.1q;d=(a.19)?(d+" "+y.19):d;d=d+" "+z.12;b.1e=d;6(t.26!=14){b.1e=d+" "+a.1e};4 e=O("12",b);4 f=N(a);6(f.1r!=""){e.1r=f.1r};4 g=f.1D;6(g!=""&&t.30){4 h=O("3P");h.4p=g;6(f.1z!=""){h.1e=f.1z+" "}};6(f.1h!=""){4 i=O("2l",{1e:y.1h},f.1h)};4 j=a.1p||"";4 k=O("2l",{1e:y.33},j);6(t.1u===11){4 l=O("2y",{5d:\'3g\',3z:q+t.3G+\'[]\',1f:a.1f||"",1e:"3g"});e.1s(l);6(t.1u===11){l.29=(a.19)?11:14}};6(h){e.1s(h)};e.1s(k);6(i){e.1s(i)}1d{6(h){h.1e=h.1e+z.3L}};4 m=O("2Q",{1e:\'6y\'});e.1s(m);15 e};4 U=9(){4 a=L("1l");4 b={1e:y.4b+" 6z "+z.4S,1H:a};6(A==14){b.1C="z-1o: "+t.1J}1d{b.1C="z-1o:1"};4 c=$("#"+q).1b("54")||t.3F;6(c){b.1C=(b.1C||"")+";2Z:"+c};4 d=O("2Q",b);4 e=O("4q");6(t.26!=14){e.1e=t.26};4 f=H(q).23;1Z(4 i=0;i<f.1c;i++){4 g=f[i];4 h;6(g.4r.2p()=="3J"){h=O("12",{1e:y.3J});4 k=O("2l",{1e:y.4d},g.33);h.1s(k);4 l=g.23;4 m=O("4q");1Z(4 j=0;j<l.1c;j++){4 n=T(l[j]);m.1s(n)};h.1s(m)}1d{h=T(g)};e.1s(h)};d.1s(e);15 d};4 V=9(a){4 b=L("1l");6(a){6(a==-1){$("#"+b).1m({1w:"3r",4n:"3r"})}1d{$("#"+b).1m("1w",a+"2N")};15 14};4 c;4 d=H(q).1K.1c;6(d>t.1W||t.1W){4 e=$("#"+b+" 12:6A");4 f=2w(e.1m("5e-6B"))+2w(e.1m("5e-2a"));6(t.3B===0){$("#"+b).1m({5f:\'2x\',22:\'3Q\'});t.3B=3h.6C(e.1w());$("#"+b).1m({5f:\'1T\'});6(!A||t.1u===11){$("#"+b).1m({22:\'2z\'})}};c=((t.3B+f)*3h.5g(t.1W,d))+3}1d 6(A){c=$("#"+q).1w()};15 c};4 W=9(){4 j=L("1l");$("#"+j).18("1X",9(e){6(1k===11)15 14;e.1U();e.2m();6(A){3R()}});$("#"+j+" 12."+y.1q).18("1X",9(e){6(e.5h.4r.2p()!=="2y"){2A(1a)}});$("#"+j+" 12."+y.1q).18("2t",9(e){6(1k===11)15 14;3c=$("#"+j+" 12."+y.19);3b=1a;e.1U();e.2m();6(t.1u===11){6(e.5h.4r.2p()==="2y"){2i=11}};6(A===11){6(1Y){6(C===11){$(1a).1t(y.19);4 a=$("#"+j+" 12."+y.19);4 b=I(1a);6(a.1c>1){4 c=$("#"+j+" 12."+z.12);4 d=I(a[0]);4 f=I(a[1]);6(b>f){d=(b);f=f+1};1Z(4 i=3h.5g(d,f);i<=3h.6D(d,f);i++){4 g=c[i];6($(g).3S(y.1q)){$(g).1t(y.19)}}}}1d 6(2i===11){$(1a).6E(y.19);6(t.1u===11){4 h=1a.4s[0];h.29=!h.29}}1d{$("#"+j+" 12."+y.19).1I(y.19);$("#"+j+" 2y:3g").1M("29",14);$(1a).1t(y.19);6(t.1u===11){1a.4s[0].29=11}}}1d{$("#"+j+" 12."+y.19).1I(y.19);$(1a).1t(y.19)}}1d{$("#"+j+" 12."+y.19).1I(y.19);$(1a).1t(y.19)}});$("#"+j+" 12."+y.1q).18("3i",9(e){6(1k===11)15 14;e.1U();e.2m();6(3b!=1g){6(1Y){$(1a).1t(y.19);6(t.1u===11){1a.4s[0].29=11}}}});$("#"+j+" 12."+y.1q).18("2s",9(e){6(1k===11)15 14;$(1a).1t(y.34)});$("#"+j+" 12."+y.1q).18("2J",9(e){6(1k===11)15 14;$("#"+j+" 12."+y.34).1I(y.34)});$("#"+j+" 12."+y.1q).18("2u",9(e){6(1k===11)15 14;e.1U();e.2m();6(t.1u===11){2i=14};4 a=$("#"+j+" 12."+y.19).1c;2L=(3c.1c!=a||a==0)?11:14;3j();3k();3R();3b=1g});6(t.44==14){$("#"+j+" 12."+z.12).18("1X",9(e){6(1k===11)15 14;2B(1a,"1X")});$("#"+j+" 12."+z.12).18("3i",9(e){6(1k===11)15 14;2B(1a,"3i")});$("#"+j+" 12."+z.12).18("2s",9(e){6(1k===11)15 14;2B(1a,"2s")});$("#"+j+" 12."+z.12).18("2J",9(e){6(1k===11)15 14;2B(1a,"2J")});$("#"+j+" 12."+z.12).18("2t",9(e){6(1k===11)15 14;2B(1a,"2t")});$("#"+j+" 12."+z.12).18("2u",9(e){6(1k===11)15 14;2B(1a,"2u")})}};4 X=9(){4 a=L("1l");$("#"+a).1x("1X");$("#"+a+" 12."+y.1q).1x("3i");$("#"+a+" 12."+y.1q).1x("1X");$("#"+a+" 12."+y.1q).1x("2s");$("#"+a+" 12."+y.1q).1x("2J");$("#"+a+" 12."+y.1q).1x("2t");$("#"+a+" 12."+y.1q).1x("2u")};4 Y=9(a,b,c){$("#"+a).1x(b,c);$("#"+a).4t(b);$("#"+a).18(b,c)};4 Z=9(){4 a=L("1R");4 b=L("2h");4 c=L("1l");$("#"+a).18(t.2q,9(e){6(1k===11)15 14;1O(t.2q);e.1U();e.2m();3T(e)});$("#"+a).18("2S",9(e){4 k=e.6F;6(!36&&(k==4h||k==4e||k==B||k==4f||k==4g||(k>=3a&&!A))){3T(e);6(k>=3a){4u()}1d{e.1U();e.6G()}}});$("#"+a).18("31",4v);$("#"+a).18("2I",4w);$("#"+b).18("2I",9(e){Y(a,"31",4v)});W();$("#"+a).18("45",5i);$("#"+a).18("48",5j);$("#"+a).18("3i",5k);$("#"+a).18("6H",5l);$("#"+a).18("2t",5m);$("#"+a).18("2u",5n)};4 4v=9(e){1O("31")};4 4w=9(e){1O("2I")};4 3U=9(){4 a=L("1R");4 b=L("1l");6(A===11&&t.1u===14){$("#"+a+" ."+y.32).3l();$("#"+b).1m({22:\'3Q\',2b:\'4L\'})}1d{6(t.1u===14){1Y=14};$("#"+a+" ."+y.32).2C();$("#"+b).1m({22:\'2z\',2b:\'3s\'});4 c=$("#"+b+" 12."+y.19)[0];$("#"+b+" 12."+y.19).1I(y.19);4 d=I($(c).1t(y.19));21(d)};V(V())};4 4x=9(){4 a=L("1R");4 b=(1k==11)?t.3E:1;6(1k===11){$("#"+a).1t(y.3K)}1d{$("#"+a).1I(y.3K)}};4 5o=9(){4 a=L("2h");6(t.2r=="11"){$("#"+a).18("2T",5p)};3U();4x()};4 57=9(){4 a=Q();4 b=R();a.1s(b);4 c=S();a.1s(c);4 d=U();a.1s(d);$("#"+q).5b(a);P();5o();Z();4 e=L("1l");6(t.2e!=\'\'){$("#"+e).2e(t.2e)};6(t.2f!=\'\'){$("#"+e).2f(t.2f)};6(1y t.18.3u=="9"){t.18.3u.24(u,1A)}};4 4y=9(b){4 c=L("1l");$("#"+c+" 12."+z.12).1I(y.19);6(t.1u===11){$("#"+c+" 12."+z.12+" 2y.3g").1M("29",14)};6(E(b)===11){1Z(4 i=0;i<b.1c;i++){4z(b[i])}}1d{4z(b)};9 4z(a){$($("#"+c+" 12."+z.12)[a]).1t(y.19);6(t.1u===11){$($("#"+c+" 12."+z.12)[a]).3m("2y.3g").1M("29","29")}}};4 4A=9(a,b){4 c=L("1l");4 d=a||$("#"+c+" 12."+y.19);1Z(4 i=0;i<d.1c;i++){4 e=(b===11)?d[i]:I(d[i]);H(q).1K[e].19="19"};21(d)};4 3j=9(){4 a=L("1l");4 b=$("#"+a+" 12."+y.19);6(1Y&&(C||2i)||2L){H(q).1n=-1};4 c;6(b.1c==0){c=-1}1d 6(b.1c>1){4A(b)}1d{c=I($("#"+a+" 12."+y.19))};6((H(q).1n!=c||2L)&&b.1c<=1){2L=14;4 e=3n("2H");H(q).1n=c;21(c);6(1y t.18.2H=="9"){4 d=2k();t.18.2H(d.1b,d.1L)};$("#"+q).4t("2H")}};4 21=9(a,b){6(a!==1B){4 c,1f,2D;6(a==-1){c=-1;1f="";2D="";2E(-1)}1d{6(1y a!="50"){4 d=H(q).1K[a];H(q).1n=a;c=a;1f=N(d);2D=(a>=0)?H(q).1K[a].1p:"";2E(1B,1f);1f=1f.1f}1d{c=(b&&b.1o)||H(q).1n;1f=(b&&b.1f)||H(q).1f;2D=(b&&b.1p)||H(q).1K[H(q).1n].1p||"";2E(c)}};1v("1n",c);1v("1f",1f);1v("2D",2D);1v("23",H(q).23);1v("58",2k());1v("59",$("#"+q+" 1S:19"))}};4 3n=9(a){4 b={2U:14,2V:14,2n:14};4 c=$("#"+q);2M{6(c.1M("18"+a)!==1g){b.2n=11;b.2U=11}}2O(e){}4 d;6(1y $.5q=="9"){d=$.5q(c[0],"4B")}1d{d=c.1b("4B")};6(d&&d[a]){b.2n=11;b.2V=11};15 b};4 3R=9(){3k();$("5r").18("1X",2A);$(3d).18("2S",4C);$(3d).18("2T",4D)};4 3k=9(){$("5r").1x("1X",2A);$(3d).1x("2S",4C);$(3d).1x("2T",4D)};4 5p=9(e){6(e.2W<3a&&e.2W!=4V&&e.2W!=4W){15 14};4 a=L("1l");4 b=L("2h");4 c=H(b).1f;6(c.1c==0){$("#"+a+" 12:2x").2C();V(V())}1d{$("#"+a+" 12").3l();4 d=$("#"+a+" 12:43(\'"+c+"\')").2C();6($("#"+a+" 12:1T").1c<=t.1W){V(-1)};6(d.1c>0&&!A||!1Y){$("#"+a+" ."+y.19).1I(y.19);$(d[0]).1t(y.19)}};6(!A){3o()}};4 4u=9(){6(t.2r=="11"){4 a=L("1R");4 b=L("2h");6($("#"+b+":2x").1c>0&&2i==14){$("#"+b+":2x").2C().6I("");Y(a,"2I",4w);H(b).31()}}};4 5s=9(){4 a=L("2h");6($("#"+a+":1T").1c>0){$("#"+a+":1T").3l();H(a).2I()}};4 4C=9(a){4 b=L("2h");4 c=L("1l");25(a.2W){1i B:1i 4g:a.1U();a.2m();5t();1j;1i 4e:1i 4f:a.1U();a.2m();5u();1j;1i 4U:1i 4h:a.1U();a.2m();2A();4 d=$("#"+c+" 12."+y.19).1c;2L=(3c.1c!=d||d==0)?11:14;3j();3k();3b=1g;1j;1i 4i:C=11;1j;1i 4j:2i=11;1j;2P:6(a.2W>=3a&&A===14){4u()};1j};6(1k===11)15 14;1O("2S")};4 4D=9(a){25(a.2W){1i 4i:C=14;1j;1i 4j:2i=14;1j};6(1k===11)15 14;1O("2T")};4 5i=9(a){6(1k===11)15 14;1O("45")};4 5j=9(a){6(1k===11)15 14;1O("48")};4 5k=9(a){6(1k===11)15 14;a.1U();1O("2s")};4 5l=9(a){6(1k===11)15 14;a.1U();1O("2J")};4 5m=9(a){6(1k===11)15 14;1O("2t")};4 5n=9(a){6(1k===11)15 14;1O("2u")};4 3V=9(a,b){4 c={2U:14,2V:14,2n:14};6($(a).1M("18"+b)!=1B){c.2n=11;c.2U=11};4 d=$(a).1b("4B");6(d&&d[b]){c.2n=11;c.2V=11};15 c};4 2B=9(a,b){6(t.44==14){4 c=H(q).1K[I(a)];6(3V(c,b).2n===11){6(3V(c,b).2U===11){c["18"+b]()};6(3V(c,b).2V===11){25(b){1i"2S":1i"2T":1j;2P:$(c).4t(b);1j}};15 14}}};4 1O=9(a){6(1y t.18[a]=="9"){t.18[a].24(1a,1A)};6(3n(a).2n===11){6(3n(a).2U===11){H(q)["18"+a]()}1d 6(3n(a).2V===11){25(a){1i"2S":1i"2T":1j;2P:$("#"+q).6J(a);1j}};15 14}};4 3W=9(a){4 b=L("1l");a=(a!==1B)?a:$("#"+b+" 12."+y.19);6(a.1c>0){4 c=2w(($(a).2b().2a));4 d=2w($("#"+b).1w());6(c>d){4 e=c+$("#"+b).3p()-(d/2);$("#"+b).5v({3p:e},5w)}}};4 5t=9(){4 b=L("1l");4 c=$("#"+b+" 12:1T."+z.12);4 d=$("#"+b+" 12:1T."+y.19);d=(d.1c==0)?c[0]:d;4 e=$("#"+b+" 12:1T."+z.12).1o(d);6((e<c.1c-1)){e=4E(e);6(e<c.1c){6(!C||!A||!1Y){$("#"+b+" ."+y.19).1I(y.19)};$(c[e]).1t(y.19);2E(e);6(A==11){3j()};3W($(c[e]))};6(!A){3o()}};9 4E(a){a=a+1;6(a>c.1c){15 a};6($(c[a]).3S(y.1q)===11){15 a};15 a=4E(a)}};4 5u=9(){4 b=L("1l");4 c=$("#"+b+" 12:1T."+y.19);4 d=$("#"+b+" 12:1T."+z.12);4 e=$("#"+b+" 12:1T."+z.12).1o(c[0]);6(e>=0){e=4F(e);6(e>=0){6(!C||!A||!1Y){$("#"+b+" ."+y.19).1I(y.19)};$(d[e]).1t(y.19);2E(e);6(A==11){3j()};6(2w(($(d[e]).2b().2a+$(d[e]).1w()))<=0){4 f=($("#"+b).3p()-$("#"+b).1w())-$(d[e]).1w();$("#"+b).5v({3p:f},5w)}};6(!A){3o()}};9 4F(a){a=a-1;6(a<0){15 a};6($(d[a]).3S(y.1q)===11){15 a};15 a=4F(a)}};4 3o=9(){4 a=L("1R");4 b=L("1l");4 c=$("#"+a).5x();4 d=$("#"+a).1w();4 e=$(4k).1w();4 f=$(4k).3p();4 g=$("#"+b).1w();4 h=$("#"+a).1w();4 i=t.3D.2p();6(((e+f)<3h.6K(g+d+c.2a)||i==\'6L\')&&i!=\'6M\'){h=g;$("#"+b).1m({2a:"-"+h+"2N",22:\'3Q\',1J:t.1J});6(t.1F=="11"){$("#"+a).1I("2R 2v").1t("3X")};4 h=$("#"+b).5x().2a;6(h<-10){$("#"+b).1m({2a:(2w($("#"+b).1m("2a"))-h+20+f)+"2N",1J:t.1J});6(t.1F=="11"){$("#"+a).1I("3X 2v").1t("2R")}}}1d{$("#"+b).1m({2a:h+"2N",1J:t.1J});6(t.1F=="11"){$("#"+a).1I("2R 3X").1t("2v")}};6(4X){6(F()<=7){$(\'2Q.5c\').1m("1J",t.1J-10);$("#"+a).1m("1J",t.1J+5)}}};4 3T=9(e){6(1k===11)15 14;4 a=L("1R");4 b=L("1l");6(!36){36=11;6(1E.3t!=\'\'){$("#"+1E.3t).1m({22:"2z"})};1E.3t=b;$("#"+b+" 12:2x").2C();3o();4 c=t.3C;6(c==""||c=="2z"){$("#"+b).1m({22:"3Q"});3W();6(1y t.18.2G=="9"){4 d=2k();t.18.2G(d.1b,d.1L)}}1d{$("#"+b)[c]("6N",9(){3W();6(1y t.18.2G=="9"){4 d=2k();t.18.2G(d.1b,d.1L)}})};3R()}1d{6(t.2q!==\'2s\'){2A()}}};4 2A=9(e){36=14;4 a=L("1R");4 b=L("1l");6(A===14||t.1u===11){$("#"+b).1m({22:"2z"});6(t.1F=="11"){$("#"+a).1I("2v 3X").1t("2R")}};3k();6(1y t.18.3H=="9"){4 d=2k();t.18.3H(d.1b,d.1L)};5s();V(V());$("#"+b).1m({1J:1});2E(H(q).1n)};4 56=9(){2M{35=$.2Y(11,{},H(q));1Z(4 i 3O 35){6(1y 35[i]!="9"){u[i]=35[i]}}}2O(e){};u.2D=(H(q).1n>=0)?H(q).1K[H(q).1n].1p:"";u.3Y=1E.3Y.2o;u.3Z=1E.3Z};4 4G=9(a){6(a!=1g&&1y a!="1B"){4 b=L("1l");4 c=N(a);4 d=$("#"+b+" 12."+z.12+":4H("+(a.1o)+")");15{1b:c,1L:d,1S:a,1o:a.1o}};15 1g};4 2k=9(){4 a=L("1l");4 b=H(q);4 c,1L,1S,1o;6(b.1n==-1){c=1g;1L=1g;1S=1g;1o=-1}1d{1L=$("#"+a+" 12."+y.19);6(1L.1c>1){4 d=[],4I=[],6O=[];1Z(4 i=0;i<1L.1c;i++){4 e=I(1L[i]);d.5y(e);4I.5y(b.1K[e])};c=d;1S=4I;1o=d}1d{1S=b.1K[b.1n];c=N(1S);1o=b.1n}};15{1b:c,1L:1L,1o:1o,1S:1S}};4 2E=9(a,b){4 c=L("4a");4 d={};6(a==-1){d.1p="&6P;";d.1e="";d.1h="";d.1D=""}1d 6(1y a!="1B"){4 e=H(q).1K[a];d=N(e)}1d{d=b};$("#"+c).3m("."+y.33).4J(d.1p);H(c).1e=y.3I+" "+d.1e;6(d.1h!=""){$("#"+c).3m("."+y.1h).4J(d.1h).2C()}1d{$("#"+c).3m("."+y.1h).4J("").3l()};4 f=$("#"+c).3m("3P");6(f.1c>0){$(f).1G()};6(d.1D!=""&&t.30){f=O("3P",{4p:d.1D});$("#"+c).2f(f);6(d.1z!=""){f.1e=d.1z+" "};6(d.1h==""){f.1e=f.1e+z.3L}}};4 1v=9(p,v){u[p]=v};4 4K=9(a,b,i){4 c=L("1l");4 d=14;25(a){1i"28":4 e=T(b||H(q).1K[i]);4 f;6(1A.1c==3){f=i}1d{f=$("#"+c+" 12."+z.12).1c-1};6(f<0||!f){$("#"+c+" 4q").2e(e)}1d{4 g=$("#"+c+" 12."+z.12)[f];$(g).6Q(e)};X();W();6(t.18.28!=1g){t.18.28.24(1a,1A)};1j;1i"1G":d=$($("#"+c+" 12."+z.12)[i]).3S(y.19);$("#"+c+" 12."+z.12+":4H("+i+")").1G();4 h=$("#"+c+" 12."+y.1q);6(d==11){6(h.1c>0){$(h[0]).1t(y.19);4 j=$("#"+c+" 12."+z.12).1o(h[0]);21(j)}};6(h.1c==0){21(-1)};6($("#"+c+" 12."+z.12).1c<t.1W&&!A){V(-1)};6(t.18.1G!=1g){t.18.1G.24(1a,1A)};1j}};1a.6R=9(){4 a=1A[0];51.4Y.6S.4Z(1A);25(a){1i"28":u.28.24(1a,1A);1j;1i"1G":u.1G.24(1a,1A);1j;2P:2M{H(q)[a].24(H(q),1A)}2O(e){};1j}};1a.28=9(){4 a,1f,1r,1D,1h;4 b=1A[0];6(1y b=="6T"){a=b;1f=a;2F=3N 4l(a,1f)}1d{a=b.1p||\'\';1f=b.1f||a;1r=b.1r||\'\';1D=b.1D||\'\';1h=b.1h||\'\';2F=3N 4l(a,1f);$(2F).1b("1h",1h);$(2F).1b("1D",1D);$(2F).1b("1r",1r)};1A[0]=2F;H(q).28.24(H(q),1A);1v("23",H(q)["23"]);1v("1c",H(q).1c);4K("28",2F,1A[1])};1a.1G=9(i){H(q).1G(i);1v("23",H(q)["23"]);1v("1c",H(q).1c);4K("1G",1B,i)};1a.5z=9(a,b){6(1y a=="1B"||1y b=="1B")15 14;a=a.2j();2M{1v(a,b)}2O(e){};25(a){1i"2c":H(q)[a]=b;6(b==0){H(q).1Q=14};A=(H(q).2c>1||H(q).1Q==11)?11:14;3U();1j;1i"1Q":H(q)[a]=b;A=(H(q).2c>1||H(q).1Q==11)?11:14;1Y=H(q).1Q;3U();1v(a,b);1j;1i"2K":H(q)[a]=b;1k=b;4x();1j;1i"1n":1i"1f":6(a=="1n"&&E(b)===11){$("#"+q+" 1S").1M("19",14);4A(b,11);4y(b)}1d{H(q)[a]=b;4y(H(q).1n);21(H(q).1n)};1j;1i"1c":4 c=L("1l");6(b<H(q).1c){H(q)[a]=b;6(b==0){$("#"+c+" 12."+z.12).1G();21(-1)}1d{$("#"+c+" 12."+z.12+":6U("+(b-1)+")").1G();6($("#"+c+" 12."+y.19).1c==0){$("#"+c+" 12."+y.1q+":4H(0)").1t(y.19)}};1v(a,b);1v("23",H(q)["23"])};1j;1i"1H":1j;2P:2M{H(q)[a]=b;1v(a,b)}2O(e){};1j}};1a.6V=9(a){15 u[a]||H(q)[a]};1a.1T=9(a){4 b=L("1R");6(a===11){$("#"+b).2C()}1d 6(a===14){$("#"+b).3l()}1d{15($("#"+b).1m("22")=="2z")?14:11}};1a.41=9(v){1E.41(v)};1a.3H=9(){2A()};1a.2G=9(){3T()};1a.5A=9(r){6(1y r=="1B"||r==0){15 14};t.1W=r;V(V())};1a.1W=1a.5A;1a.18=9(a,b){$("#"+q).18(a,b)};1a.1x=9(a,b){$("#"+q).1x(a,b)};1a.6W=1a.18;1a.6X=9(){15 2k()};1a.5B=9(){4 a=H(q).5B.24(H(q),1A);15 4G(a)};1a.5C=9(){4 a=H(q).5C.24(H(q),1A);15 4G(a)};1a.6Y=9(a){1a.5z("1f",a)};1a.6Z=9(){4 a=L("49");4 b=L("1R");$("#"+b+", #"+b+" *").1x();H(q).3f=H(b).3f;$("#"+b).1G();$("#"+q).70().71($("#"+q));$("#"+q).1b("1V",1g)};1a.4m=9(){21(H(q).1n)};K()};$.1P.2Y({3v:9(b){15 1a.72(9(){6(!$(1a).1b(\'1V\')){4 a=3N 1V(1a,b);$(1a).1b(\'1V\',a)}})}});$.1P.2o=$.1P.3v})(73);', 
62, 438, "    var  if   function                                                      true li  false return   on selected this data length else className value null description case break isDisabled postChildID css selectedIndex index text enabled title appendChild addClass enableCheckbox cy height off typeof imagecss arguments undefined style image msBeautify roundedCorner remove id removeClass zIndex options ui prop byJson cn fn multiple postID option visible preventDefault dd visibleRows click isMultiple for  bW display children apply switch useSprite  add checked top position size jsonTitle append prepend reverseMode postTitleTextID controlHolded toString cw span stopPropagation hasEvent msDropdown toLowerCase event enableAutoFilter mouseover mousedown mouseup borderRadiusTp parseInt hidden input none ct cm show selectedText cx opt open change blur mouseout disabled forcedTrigger try px catch default div borderRadius keydown keyup byElement byJQuery keyCode ddOutOfVision extend width showIcon focus ddTitle label hover orginial isOpen    ALPHABETS_START lastTarget oldSelected document ua tabIndex checkbox Math mouseenter bV bZ hide find bX cr scrollTop counter auto absolute oldDiv create msDropDown expr toUpperCase indexOf name mainCSS rowHeight animStyle openDirection disabledOpacity childWidth checkboxNameSuffix close ddTitleText optgroup disabledAll fnone cacheElement new in img block bY hasClass cs bP cl co borderRadiusBtm version author  debug dropdown Contains disabledOptionEvents dblclick   mousemove postElementHolder postTitleID ddChild divider optgroupTitle UP_ARROW LEFT_ARROW RIGHT_ARROW ENTER SHIFT CONTROL window Option refresh overflow selectedClass src ul nodeName childNodes trigger cb bN bO bQ bT updateNow bU events cd ce getNext getPrev cv eq op html cz relative 0px select createPseudo arrow borderTop noBorderTop ddChildMore shadow ESCAPE BACKSPACE DELETE isIE prototype call object Array showicon usesprite childwidth eval cu bS uiData selectedOptions cssText after ddcommon type padding visibility min target cf cg ch ci cj ck bR ca _data body cc cp cq animate 500 offset push set showRows namedItem item Marghoob Suleman attr bind unbind 250 120 9999 slideDown _mscheck _msddHolder _msdd _title _titleText _child ddArrow arrowoff ddlabel _msddli_ border isCreated navigator userAgent match msie Object MSIE substring maincss visiblerows animstyle opendirection jsontitle disabledopacity enablecheckbox checkboxnamesuffix reversemode roundedcorner enableautofilter getElementById msdropdown inArray setAttribute throw There is an error json msdrpdd element test createElement innerHTML appendTo outerWidth autocomplete clear ddchild_ first bottom ceil max toggleClass which stopImmediatePropagation mouseleave val triggerHandler floor alwaysup alwaysdown fast ind nbsp before act shift string gt get addMyEvent getData setIndexByValue destroy parent replaceWith each jQuery".split(" "), 
0, {}));
// Input 3
(function() {
  if (!jQuery || !jQuery.jstree) {
    var a = !1, d = !1, f = !1;
    (function(c) {
      c.vakata = {};
      c.vakata.css = {get_css:function(a, c, b) {
        a = a.toLowerCase();
        var e = b.cssRules || b.rules, d = 0;
        do {
          if (e.length && d > e.length + 5) {
            break;
          }
          if (e[d].selectorText && e[d].selectorText.toLowerCase() == a) {
            return !0 === c ? (b.removeRule && b.removeRule(d), b.deleteRule && b.deleteRule(d), !0) : e[d];
          }
        } while (e[++d]);
        return !1;
      }, add_css:function(a, b) {
        if (c.jstree.css.get_css(a, !1, b)) {
          return !1;
        }
        b.insertRule ? b.insertRule(a + " { }", 0) : b.addRule(a, null, 0);
        return c.vakata.css.get_css(a);
      }, remove_css:function(a, b) {
        return c.vakata.css.get_css(a, !0, b);
      }, add_sheet:function(a) {
        var b = !1, e = !0;
        if (a.str) {
          return a.title && (b = c("style[id='" + a.title + "-stylesheet']")[0]), b ? e = !1 : (b = document.createElement("style"), b.setAttribute("type", "text/css"), a.title && b.setAttribute("id", a.title + "-stylesheet")), b.styleSheet ? e ? (document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet.cssText = a.str) : b.styleSheet.cssText = b.styleSheet.cssText + " " + a.str : (b.appendChild(document.createTextNode(a.str)), document.getElementsByTagName("head")[0].appendChild(b)), 
          b.sheet || b.styleSheet;
        }
        if (a.url) {
          if (document.createStyleSheet) {
            try {
              document.createStyleSheet(a.url);
            } catch (d) {
            }
          } else {
            return b = document.createElement("link"), b.rel = "stylesheet", b.type = "text/css", b.media = "all", b.href = a.url, document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet;
          }
        }
      }};
      var e = [], b = -1, k = {}, h = {};
      c.fn.jstree = function(a) {
        var b = "string" == typeof a, d = Array.prototype.slice.call(arguments, 1), f = this;
        if (b) {
          if ("_" == a.substring(0, 1)) {
            return f;
          }
          this.each(function() {
            var b = e[c.data(this, "jstree_instance_id")], b = b && c.isFunction(b[a]) ? b[a].apply(b, d) : b;
            if ("undefined" !== typeof b && (0 === a.indexOf("is_") || !0 !== b && !1 !== b)) {
              return f = b, !1;
            }
          });
        } else {
          this.each(function() {
            var b = c.data(this, "jstree_instance_id"), f = [], h = a ? c.extend({}, !0, a) : {}, l = c(this), n = !1, u = [], f = f.concat(d);
            l.data("jstree") && f.push(l.data("jstree"));
            h = f.length ? c.extend.apply(null, [!0, h].concat(f)) : h;
            "undefined" !== typeof b && e[b] && e[b].destroy();
            b = parseInt(e.push({}), 10) - 1;
            c.data(this, "jstree_instance_id", b);
            h.plugins = c.isArray(h.plugins) ? h.plugins : c.jstree.defaults.plugins.slice();
            h.plugins.unshift("core");
            h.plugins = h.plugins.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",");
            n = c.extend(!0, {}, c.jstree.defaults, h);
            n.plugins = h.plugins;
            c.each(k, function(a, b) {
              -1 === c.inArray(a, n.plugins) ? (n[a] = null, delete n[a]) : u.push(a);
            });
            n.plugins = u;
            e[b] = new c.jstree._instance(b, c(this).addClass("jstree jstree-" + b), n);
            c.each(e[b]._get_settings().plugins, function(a, c) {
              e[b].data[c] = {};
            });
            c.each(e[b]._get_settings().plugins, function(a, c) {
              k[c] && k[c].__init.apply(e[b]);
            });
            setTimeout(function() {
              e[b] && e[b].init();
            }, 0);
          });
        }
        return f;
      };
      c.jstree = {defaults:{plugins:[]}, _focused:function() {
        return e[b] || null;
      }, _reference:function(a) {
        if (e[a]) {
          return e[a];
        }
        var b = c(a);
        b.length || "string" !== typeof a || (b = c("#" + a));
        return b.length ? e[b.closest(".jstree").data("jstree_instance_id")] || null : null;
      }, _instance:function(a, b, e) {
        this.data = {core:{}};
        this.get_settings = function() {
          return c.extend(!0, {}, e);
        };
        this._get_settings = function() {
          return e;
        };
        this.get_index = function() {
          return a;
        };
        this.get_container = function() {
          return b;
        };
        this.get_container_ul = function() {
          return b.children("ul:eq(0)");
        };
        this._set_settings = function(a) {
          e = c.extend(!0, {}, e, a);
        };
      }, _fn:{}, plugin:function(a, b) {
        b = c.extend({}, {__init:c.noop, __destroy:c.noop, _fn:{}, defaults:!1}, b);
        k[a] = b;
        c.jstree.defaults[a] = b.defaults;
        c.each(b._fn, function(b, e) {
          e.plugin = a;
          e.old = c.jstree._fn[b];
          c.jstree._fn[b] = function() {
            var a, d = e, f = Array.prototype.slice.call(arguments);
            a = new c.Event("before.jstree");
            var g = !1;
            if (!0 !== this.data.core.locked || "unlock" === b || "is_locked" === b) {
              do {
                if (d && d.plugin && -1 !== c.inArray(d.plugin, this._get_settings().plugins)) {
                  break;
                }
                d = d.old;
              } while (d);
              if (d) {
                if (0 === b.indexOf("_")) {
                  a = d.apply(this, f);
                } else {
                  a = this.get_container().triggerHandler(a, {func:b, inst:this, args:f, plugin:d.plugin});
                  if (!1 === a) {
                    return;
                  }
                  "undefined" !== typeof a && (f = a);
                  a = d.apply(c.extend({}, this, {__callback:function(a) {
                    this.get_container().triggerHandler(b + ".jstree", {inst:this, args:f, rslt:a, rlbk:g});
                  }, __rollback:function() {
                    return g = this.get_rollback();
                  }, __call_old:function(a) {
                    return d.old.apply(this, a ? Array.prototype.slice.call(arguments, 1) : f);
                  }}), f);
                }
                return a;
              }
            }
          };
          c.jstree._fn[b].old = e.old;
          c.jstree._fn[b].plugin = a;
        });
      }, rollback:function(a) {
        a && (c.isArray(a) || (a = [a]), c.each(a, function(a, c) {
          e[c.i].set_rollback(c.h, c.d);
        }));
      }};
      c.jstree._fn = c.jstree._instance.prototype = {};
      c(function() {
        var b = navigator.userAgent.toLowerCase(), e = (b.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1], h = ".jstree ul, .jstree li { display:block; margin:0 0 0 0; padding:0 0 0 0; list-style-type:none; } .jstree li { display:block; min-height:18px; line-height:18px; white-space:nowrap; margin-left:18px; min-width:18px; } .jstree-rtl li { margin-left:0; margin-right:18px; } .jstree > ul > li { margin-left:0px; } .jstree-rtl > ul > li { margin-right:0px; } .jstree ins { display:inline-block; text-decoration:none; width:18px; height:18px; margin:0 0 0 0; padding:0; } .jstree a { display:inline-block; line-height:16px; height:16px; color:black; white-space:nowrap; text-decoration:none; padding:1px 2px; margin:0; } .jstree a:focus { outline: none; } .jstree a > ins { height:16px; width:16px; } .jstree a > .jstree-icon { margin-right:3px; } .jstree-rtl a > .jstree-icon { margin-left:3px; margin-right:0; } li.jstree-open > ul { display:block; } li.jstree-closed > ul { display:none; } ";
        if (/msie/.test(b) && 6 == parseInt(e, 10)) {
          a = !0;
          try {
            document.execCommand("BackgroundImageCache", !1, !0);
          } catch (k) {
          }
          h += ".jstree li { height:18px; margin-left:0; margin-right:0; } .jstree li li { margin-left:18px; } .jstree-rtl li li { margin-left:0px; margin-right:18px; } li.jstree-open ul { display:block; } li.jstree-closed ul { display:none !important; } .jstree li a { display:inline; border-width:0 !important; padding:0px 2px !important; } .jstree li a ins { height:16px; width:16px; margin-right:3px; } .jstree-rtl li a ins { margin-right:0px; margin-left:3px; } ";
        }
        /msie/.test(b) && 7 == parseInt(e, 10) && (d = !0, h += ".jstree li a { border-width:0 !important; padding:0px 2px !important; } ");
        !/compatible/.test(b) && /mozilla/.test(b) && 1.9 > parseFloat(e, 10) && (f = !0, h += ".jstree ins { display:-moz-inline-box; } .jstree li { line-height:12px; } .jstree a { display:-moz-inline-box; } .jstree .jstree-no-icons .jstree-checkbox { display:-moz-inline-stack !important; } ");
        c.vakata.css.add_sheet({str:h, title:"jstree"});
      });
      c.jstree.plugin("core", {__init:function() {
        this.data.core.locked = !1;
        this.data.core.to_open = this.get_settings().core.initially_open;
        this.data.core.to_load = this.get_settings().core.initially_load;
      }, defaults:{html_titles:!1, animation:500, initially_open:[], initially_load:[], open_parents:!0, notify_plugins:!0, rtl:!1, load_open:!1, strings:{loading:"Loading ...", new_node:"New node", multiple_selection:"Multiple selection"}}, _fn:{init:function() {
        this.set_focus();
        this._get_settings().core.rtl && this.get_container().addClass("jstree-rtl").css("direction", "rtl");
        this.get_container().html("<ul><li class='jstree-last jstree-leaf'><ins>&#160;</ins><a class='jstree-loading' href='#'><ins class='jstree-icon'>&#160;</ins>" + this._get_string("loading") + "</a></li></ul>");
        this.data.core.li_height = this.get_container_ul().find("li.jstree-closed, li.jstree-leaf").eq(0).height() || 18;
        this.get_container().delegate("li > ins", "click.jstree", c.proxy(function(a) {
          a = c(a.target);
          this.toggle_node(a);
        }, this)).bind("mousedown.jstree", c.proxy(function() {
          this.set_focus();
        }, this)).bind("dblclick.jstree", function(a) {
          if (document.selection && document.selection.empty) {
            document.selection.empty();
          } else {
            if (window.getSelection) {
              a = window.getSelection();
              try {
                a.removeAllRanges(), a.collapse();
              } catch (c) {
              }
            }
          }
        });
        this._get_settings().core.notify_plugins && this.get_container().bind("load_node.jstree", c.proxy(function(a, b) {
          var e = this._get_node(b.rslt.obj), d = this;
          -1 === e && (e = this.get_container_ul());
          e.length && e.find("li").each(function() {
            var a = c(this);
            a.data("jstree") && c.each(a.data("jstree"), function(b, e) {
              d.data[b] && c.isFunction(d["_" + b + "_notify"]) && d["_" + b + "_notify"].call(d, a, e);
            });
          });
        }, this));
        this._get_settings().core.load_open && this.get_container().bind("load_node.jstree", c.proxy(function(a, b) {
          var e = this._get_node(b.rslt.obj), d = this;
          -1 === e && (e = this.get_container_ul());
          e.length && e.find("li.jstree-open:not(:has(ul))").each(function() {
            d.load_node(this, c.noop, c.noop);
          });
        }, this));
        this.__callback();
        this.load_node(-1, function() {
          this.loaded();
          this.reload_nodes();
        });
      }, destroy:function() {
        var a, d = this.get_index(), f = this._get_settings(), h = this;
        c.each(f.plugins, function(a, c) {
          try {
            k[c].__destroy.apply(h);
          } catch (b) {
          }
        });
        this.__callback();
        if (this.is_focused()) {
          for (a in e) {
            if (e.hasOwnProperty(a) && a != d) {
              e[a].set_focus();
              break;
            }
          }
        }
        d === b && (b = -1);
        this.get_container().unbind(".jstree").undelegate(".jstree").removeData("jstree_instance_id").find("[class^='jstree']").andSelf().attr("class", function() {
          return this.className.replace(/jstree[^ ]*|$/ig, "");
        });
        c(document).unbind(".jstree-" + d).undelegate(".jstree-" + d);
        e[d] = null;
        delete e[d];
      }, _core_notify:function(a, c) {
        c.opened && this.open_node(a, !1, !0);
      }, lock:function() {
        this.data.core.locked = !0;
        this.get_container().children("ul").addClass("jstree-locked").css("opacity", "0.7");
        this.__callback({});
      }, unlock:function() {
        this.data.core.locked = !1;
        this.get_container().children("ul").removeClass("jstree-locked").css("opacity", "1");
        this.__callback({});
      }, is_locked:function() {
        return this.data.core.locked;
      }, save_opened:function() {
        var a = this;
        this.data.core.to_open = [];
        this.get_container_ul().find("li.jstree-open").each(function() {
          this.id && a.data.core.to_open.push("#" + this.id.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"));
        });
        this.__callback(a.data.core.to_open);
      }, save_loaded:function() {
      }, reload_nodes:function(a) {
        var b = this, e = !0, d = [], f = [];
        a || (this.data.core.reopen = !1, this.data.core.refreshing = !0, this.data.core.to_open = c.map(c.makeArray(this.data.core.to_open), function(a) {
          return "#" + a.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
        }), this.data.core.to_load = c.map(c.makeArray(this.data.core.to_load), function(a) {
          return "#" + a.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
        }), this.data.core.to_open.length && (this.data.core.to_load = this.data.core.to_load.concat(this.data.core.to_open)));
        this.data.core.to_load.length && (c.each(this.data.core.to_load, function(a, b) {
          if ("#" == b) {
            return !0;
          }
          c(b).length ? d.push(b) : f.push(b);
        }), d.length && (this.data.core.to_load = f, c.each(d, function(a, c) {
          b._is_loaded(c) || (b.load_node(c, function() {
            b.reload_nodes(!0);
          }, function() {
            b.reload_nodes(!0);
          }), e = !1);
        })));
        this.data.core.to_open.length && c.each(this.data.core.to_open, function(a, c) {
          b.open_node(c, !1, !0);
        });
        e && (this.data.core.reopen && clearTimeout(this.data.core.reopen), this.data.core.reopen = setTimeout(function() {
          b.__callback({}, b);
        }, 50), this.data.core.refreshing = !1, this.reopen());
      }, reopen:function() {
        var a = this;
        this.data.core.to_open.length && c.each(this.data.core.to_open, function(c, b) {
          a.open_node(b, !1, !0);
        });
        this.__callback({});
      }, refresh:function(a) {
        var c = this;
        this.save_opened();
        a || (a = -1);
        (a = this._get_node(a)) || (a = -1);
        -1 !== a ? a.children("UL").remove() : this.get_container_ul().empty();
        this.load_node(a, function() {
          c.__callback({obj:a});
          c.reload_nodes();
        });
      }, loaded:function() {
        this.__callback();
      }, set_focus:function() {
        if (!this.is_focused()) {
          var a = c.jstree._focused();
          a && a.unset_focus();
          this.get_container().addClass("jstree-focused");
          b = this.get_index();
          this.__callback();
        }
      }, is_focused:function() {
        return b == this.get_index();
      }, unset_focus:function() {
        this.is_focused() && (this.get_container().removeClass("jstree-focused"), b = -1);
        this.__callback();
      }, _get_node:function(a) {
        var b = c(a, this.get_container());
        if (b.is(".jstree") || -1 == a) {
          return -1;
        }
        b = b.closest("li", this.get_container());
        return b.length ? b : !1;
      }, _get_next:function(a, c) {
        a = this._get_node(a);
        return -1 === a ? this.get_container().find("> ul > li:first-child") : a.length ? c ? 0 < a.nextAll("li").size() ? a.nextAll("li:eq(0)") : !1 : a.hasClass("jstree-open") ? a.find("li:eq(0)") : 0 < a.nextAll("li").size() ? a.nextAll("li:eq(0)") : a.parentsUntil(".jstree", "li").next("li").eq(0) : !1;
      }, _get_prev:function(a, c) {
        a = this._get_node(a);
        if (-1 === a) {
          return this.get_container().find("> ul > li:last-child");
        }
        if (!a.length) {
          return !1;
        }
        if (c) {
          return 0 < a.prevAll("li").length ? a.prevAll("li:eq(0)") : !1;
        }
        if (a.prev("li").length) {
          for (a = a.prev("li").eq(0);a.hasClass("jstree-open");) {
            a = a.children("ul:eq(0)").children("li:last");
          }
          return a;
        }
        var b = a.parentsUntil(".jstree", "li:eq(0)");
        return b.length ? b : !1;
      }, _get_parent:function(a) {
        a = this._get_node(a);
        if (-1 == a || !a.length) {
          return !1;
        }
        a = a.parentsUntil(".jstree", "li:eq(0)");
        return a.length ? a : -1;
      }, _get_children:function(a) {
        a = this._get_node(a);
        return -1 === a ? this.get_container().children("ul:eq(0)").children("li") : a.length ? a.children("ul:eq(0)").children("li") : !1;
      }, get_path:function(a, c) {
        var b = [], e = this;
        a = this._get_node(a);
        if (-1 === a || !a || !a.length) {
          return !1;
        }
        a.parentsUntil(".jstree", "li").each(function() {
          b.push(c ? this.id : e.get_text(this));
        });
        b.reverse();
        b.push(c ? a.attr("id") : this.get_text(a));
        return b;
      }, _get_string:function(a) {
        return this._get_settings().core.strings[a] || a;
      }, is_open:function(a) {
        return (a = this._get_node(a)) && -1 !== a && a.hasClass("jstree-open");
      }, is_closed:function(a) {
        return (a = this._get_node(a)) && -1 !== a && a.hasClass("jstree-closed");
      }, is_leaf:function(a) {
        return (a = this._get_node(a)) && -1 !== a && a.hasClass("jstree-leaf");
      }, correct_state:function(a) {
        a = this._get_node(a);
        if (!a || -1 === a) {
          return !1;
        }
        a.removeClass("jstree-closed jstree-open").addClass("jstree-leaf").children("ul").remove();
        this.__callback({obj:a});
      }, open_node:function(c, b, e) {
        c = this._get_node(c);
        if (!c.length) {
          return !1;
        }
        if (!c.hasClass("jstree-closed")) {
          return b && b.call(), !1;
        }
        var d = e || a ? 0 : this._get_settings().core.animation, f = this;
        this._is_loaded(c) ? (this._get_settings().core.open_parents && c.parentsUntil(".jstree", ".jstree-closed").each(function() {
          f.open_node(this, !1, !0);
        }), d && c.children("ul").css("display", "none"), c.removeClass("jstree-closed").addClass("jstree-open").children("a").removeClass("jstree-loading"), d ? c.children("ul").stop(!0, !0).slideDown(d, function() {
          this.style.display = "";
          f.after_open(c);
        }) : f.after_open(c), this.__callback({obj:c}), b && b.call()) : (c.children("a").addClass("jstree-loading"), this.load_node(c, function() {
          f.open_node(c, b, e);
        }, b));
      }, after_open:function(a) {
        this.__callback({obj:a});
      }, close_node:function(c, b) {
        c = this._get_node(c);
        var e = b || a ? 0 : this._get_settings().core.animation, d = this;
        if (!c.length || !c.hasClass("jstree-open")) {
          return !1;
        }
        e && c.children("ul").attr("style", "display:block !important");
        c.removeClass("jstree-open").addClass("jstree-closed");
        e ? c.children("ul").stop(!0, !0).slideUp(e, function() {
          this.style.display = "";
          d.after_close(c);
        }) : d.after_close(c);
        this.__callback({obj:c});
      }, after_close:function(a) {
        this.__callback({obj:a});
      }, toggle_node:function(a) {
        a = this._get_node(a);
        if (a.hasClass("jstree-closed")) {
          return this.open_node(a);
        }
        if (a.hasClass("jstree-open")) {
          return this.close_node(a);
        }
      }, open_all:function(a, c, b) {
        (a = a ? this._get_node(a) : -1) && -1 !== a || (a = this.get_container_ul());
        b ? a = a.find("li.jstree-closed") : (b = a, a = a.is(".jstree-closed") ? a.find("li.jstree-closed").andSelf() : a.find("li.jstree-closed"));
        var e = this;
        a.each(function() {
          var a = this;
          e._is_loaded(this) ? e.open_node(this, !1, !c) : e.open_node(this, function() {
            e.open_all(a, c, b);
          }, !c);
        });
        0 === b.find("li.jstree-closed").length && this.__callback({obj:b});
      }, close_all:function(a, c) {
        var b = this;
        (a = a ? this._get_node(a) : this.get_container()) && -1 !== a || (a = this.get_container_ul());
        a.find("li.jstree-open").andSelf().each(function() {
          b.close_node(this, !c);
        });
        this.__callback({obj:a});
      }, clean_node:function(a) {
        a = a && -1 != a ? c(a) : this.get_container_ul();
        a = a.is("li") ? a.find("li").andSelf() : a.find("li");
        a.removeClass("jstree-last").filter("li:last-child").addClass("jstree-last").end().filter(":has(li)").not(".jstree-open").removeClass("jstree-leaf").addClass("jstree-closed");
        a.not(".jstree-open, .jstree-closed").addClass("jstree-leaf").children("ul").remove();
        this.__callback({obj:a});
      }, get_rollback:function() {
        this.__callback();
        return {i:this.get_index(), h:this.get_container().children("ul").clone(!0), d:this.data};
      }, set_rollback:function(a, c) {
        this.get_container().empty().append(a);
        this.data = c;
        this.__callback();
      }, load_node:function(a, c, b) {
        this.__callback({obj:a});
      }, _is_loaded:function(a) {
        return !0;
      }, create_node:function(a, b, e, d, f) {
        a = this._get_node(a);
        b = "undefined" === typeof b ? "last" : b;
        var h = c("<li />"), k = this._get_settings().core, t;
        if (-1 !== a && !a.length) {
          return !1;
        }
        if (!f && !this._is_loaded(a)) {
          return this.load_node(a, function() {
            this.create_node(a, b, e, d, !0);
          }), !1;
        }
        this.__rollback();
        "string" === typeof e && (e = {data:e});
        e || (e = {});
        e.attr && h.attr(e.attr);
        e.metadata && h.data(e.metadata);
        e.state && h.addClass("jstree-" + e.state);
        e.data || (e.data = this._get_string("new_node"));
        c.isArray(e.data) || (t = e.data, e.data = [], e.data.push(t));
        c.each(e.data, function(a, b) {
          t = c("<a />");
          c.isFunction(b) && (b = b.call(this, e));
          if ("string" == typeof b) {
            t.attr("href", "#")[k.html_titles ? "html" : "text"](b);
          } else {
            b.attr || (b.attr = {}), b.attr.href || (b.attr.href = "#"), t.attr(b.attr)[k.html_titles ? "html" : "text"](b.title), b.language && t.addClass(b.language);
          }
          t.prepend("<ins class='jstree-icon'>&#160;</ins>");
          !b.icon && e.icon && (b.icon = e.icon);
          b.icon && (-1 === b.icon.indexOf("/") ? t.children("ins").addClass(b.icon) : t.children("ins").css("background", "url('" + b.icon + "') center center no-repeat"));
          h.append(t);
        });
        h.prepend("<ins class='jstree-icon'>&#160;</ins>");
        -1 === a && (a = this.get_container(), "before" === b && (b = "first"), "after" === b && (b = "last"));
        switch(b) {
          case "before":
            a.before(h);
            t = this._get_parent(a);
            break;
          case "after":
            a.after(h);
            t = this._get_parent(a);
            break;
          case "inside":
          ;
          case "first":
            a.children("ul").length || a.append("<ul />");
            a.children("ul").prepend(h);
            t = a;
            break;
          case "last":
            a.children("ul").length || a.append("<ul />");
            a.children("ul").append(h);
            t = a;
            break;
          default:
            a.children("ul").length || a.append("<ul />"), b || (b = 0), t = a.children("ul").children("li").eq(b), t.length ? t.before(h) : a.children("ul").append(h), t = a;
        }
        if (-1 === t || t.get(0) === this.get_container().get(0)) {
          t = -1;
        }
        this.clean_node(t);
        this.__callback({obj:h, parent:t});
        d && d.call(this, h);
        return h;
      }, get_text:function(a) {
        a = this._get_node(a);
        if (!a.length) {
          return !1;
        }
        var c = this._get_settings().core.html_titles;
        a = a.children("a:eq(0)");
        if (c) {
          return a = a.clone(), a.children("INS").remove(), a.html();
        }
        a = a.contents().filter(function() {
          return 3 == this.nodeType;
        })[0];
        return a.nodeValue;
      }, set_text:function(a, c) {
        a = this._get_node(a);
        if (!a.length) {
          return !1;
        }
        a = a.children("a:eq(0)");
        if (this._get_settings().core.html_titles) {
          var b = a.children("INS").clone();
          a.html(c).prepend(b);
          this.__callback({obj:a, name:c});
          return !0;
        }
        a = a.contents().filter(function() {
          return 3 == this.nodeType;
        })[0];
        this.__callback({obj:a, name:c});
        return a.nodeValue = c;
      }, rename_node:function(a, c) {
        a = this._get_node(a);
        this.__rollback();
        a && a.length && this.set_text.apply(this, Array.prototype.slice.call(arguments)) && this.__callback({obj:a, name:c});
      }, delete_node:function(a) {
        a = this._get_node(a);
        if (!a.length) {
          return !1;
        }
        this.__rollback();
        var b = this._get_parent(a), e = c([]), d = this;
        a.each(function() {
          e = e.add(d._get_prev(this));
        });
        a = a.detach();
        -1 !== b && 0 === b.find("> ul > li").length && b.removeClass("jstree-open jstree-closed").addClass("jstree-leaf");
        this.clean_node(b);
        this.__callback({obj:a, prev:e, parent:b});
        return a;
      }, prepare_move:function(a, b, e, d, f) {
        var k = {};
        k.ot = c.jstree._reference(a) || this;
        k.o = k.ot._get_node(a);
        k.r = -1 === b ? -1 : this._get_node(b);
        k.p = "undefined" === typeof e || !1 === e ? "last" : e;
        if (f || !h.o || h.o[0] !== k.o[0] || h.r[0] !== k.r[0] || h.p !== k.p) {
          k.ot = c.jstree._reference(k.o) || this;
          k.rt = c.jstree._reference(k.r) || this;
          if (-1 !== k.r && k.r) {
            if (!/^(before|after)$/.test(k.p) && !this._is_loaded(k.r)) {
              return this.load_node(k.r, function() {
                this.prepare_move(a, b, e, d, !0);
              });
            }
            switch(k.p) {
              case "before":
                k.cp = k.r.index();
                k.cr = k.rt._get_parent(k.r);
                break;
              case "after":
                k.cp = k.r.index() + 1;
                k.cr = k.rt._get_parent(k.r);
                break;
              case "inside":
              ;
              case "first":
                k.cp = 0;
                k.cr = k.r;
                break;
              case "last":
                k.cp = k.r.find(" > ul > li").length;
                k.cr = k.r;
                break;
              default:
                k.cp = k.p, k.cr = k.r;
            }
          } else {
            switch(k.cr = -1, k.p) {
              case "first":
              ;
              case "before":
              ;
              case "inside":
                k.cp = 0;
                break;
              case "after":
              ;
              case "last":
                k.cp = k.rt.get_container().find(" > ul > li").length;
                break;
              default:
                k.cp = k.p;
            }
          }
          k.np = -1 == k.cr ? k.rt.get_container() : k.cr;
          k.op = k.ot._get_parent(k.o);
          k.cop = k.o.index();
          -1 === k.op && (k.op = k.ot ? k.ot.get_container() : this.get_container());
          !/^(before|after)$/.test(k.p) && k.op && k.np && k.op[0] === k.np[0] && k.o.index() < k.cp && k.cp++;
          k.or = k.np.find(" > ul > li:nth-child(" + (k.cp + 1) + ")");
          h = k;
        }
        this.__callback(h);
        d && d.call(this, h);
      }, check_move:function() {
        var a = h, c = !0, b = -1 === a.r ? this.get_container() : a.r;
        if (!a || !a.o || a.or[0] === a.o[0] || a.op && a.np && a.op[0] === a.np[0] && a.cp - 1 === a.o.index()) {
          return !1;
        }
        a.o.each(function() {
          if (-1 !== b.parentsUntil(".jstree", "li").andSelf().index(this)) {
            return c = !1;
          }
        });
        return c;
      }, move_node:function(a, b, e, d, f, k) {
        if (!f) {
          return this.prepare_move(a, b, e, function(a) {
            this.move_node(a, !1, !1, d, !0, k);
          });
        }
        d && (h.cy = !0);
        if (!k && !this.check_move()) {
          return !1;
        }
        this.__rollback();
        b = !1;
        d ? (b = a.o.clone(!0), b.find("*[id]").andSelf().each(function() {
          this.id && (this.id = "copy_" + this.id);
        })) : b = a.o;
        a.or.length ? a.or.before(b) : (a.np.children("ul").length || c("<ul />").appendTo(a.np), a.np.children("ul:eq(0)").append(b));
        try {
          a.ot.clean_node(a.op), a.rt.clean_node(a.np), a.op.find("> ul > li").length || a.op.removeClass("jstree-open jstree-closed").addClass("jstree-leaf").children("ul").remove();
        } catch (p) {
        }
        d && (h.cy = !0, h.oc = b);
        this.__callback(h);
        return h;
      }, _get_move:function() {
        return h;
      }}});
    })(jQuery);
    (function(a) {
      var e, b, d;
      a(function() {
        /msie/.test(navigator.userAgent.toLowerCase()) ? (b = a('<textarea cols="10" rows="2"></textarea>').css({position:"absolute", top:-1E3, left:0}).appendTo("body"), d = a('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position:"absolute", top:-1E3, left:0}).appendTo("body"), e = b.width() - d.width(), b.add(d).remove()) : (b = a("<div />").css({width:100, height:100, overflow:"auto", position:"absolute", top:-1E3, left:0}).prependTo("body").append("<div />").find("div").css({width:"100%", 
        height:200}), e = 100 - b.width(), b.parent().remove());
      });
      a.jstree.plugin("ui", {__init:function() {
        this.data.ui.selected = a();
        this.data.ui.last_selected = !1;
        this.data.ui.hovered = null;
        this.data.ui.to_select = this.get_settings().ui.initially_select;
        this.get_container().delegate("a", "click.jstree", a.proxy(function(b) {
          b.preventDefault();
          b.currentTarget.blur();
          a(b.currentTarget).hasClass("jstree-loading") || this.select_node(b.currentTarget, !0, b);
        }, this)).delegate("a", "mouseenter.jstree", a.proxy(function(b) {
          a(b.currentTarget).hasClass("jstree-loading") || this.hover_node(b.target);
        }, this)).delegate("a", "mouseleave.jstree", a.proxy(function(b) {
          a(b.currentTarget).hasClass("jstree-loading") || this.dehover_node(b.target);
        }, this)).bind("reopen.jstree", a.proxy(function() {
          this.reselect();
        }, this)).bind("get_rollback.jstree", a.proxy(function() {
          this.dehover_node();
          this.save_selected();
        }, this)).bind("set_rollback.jstree", a.proxy(function() {
          this.reselect();
        }, this)).bind("close_node.jstree", a.proxy(function(b, e) {
          var d = this._get_settings().ui, f = this._get_node(e.rslt.obj), k = f && f.length ? f.children("ul").find("a.jstree-clicked") : a(), r = this;
          !1 !== d.selected_parent_close && k.length && k.each(function() {
            r.deselect_node(this);
            "select_parent" === d.selected_parent_close && r.select_node(f);
          });
        }, this)).bind("delete_node.jstree", a.proxy(function(a, c) {
          var b = this._get_settings().ui.select_prev_on_delete, e = this._get_node(c.rslt.obj), e = e && e.length ? e.find("a.jstree-clicked") : [], d = this;
          e.each(function() {
            d.deselect_node(this);
          });
          b && e.length && c.rslt.prev.each(function() {
            if (this.parentNode) {
              return d.select_node(this), !1;
            }
          });
        }, this)).bind("move_node.jstree", a.proxy(function(a, c) {
          c.rslt.cy && c.rslt.oc.find("a.jstree-clicked").removeClass("jstree-clicked");
        }, this));
      }, defaults:{select_limit:-1, select_multiple_modifier:"ctrl", select_range_modifier:"shift", selected_parent_close:"select_parent", selected_parent_open:!0, select_prev_on_delete:!0, disable_selecting_children:!1, initially_select:[]}, _fn:{_get_node:function(b, e) {
        if ("undefined" === typeof b || null === b) {
          return e ? this.data.ui.selected : this.data.ui.last_selected;
        }
        var d = a(b, this.get_container());
        if (d.is(".jstree") || -1 == b) {
          return -1;
        }
        d = d.closest("li", this.get_container());
        return d.length ? d : !1;
      }, _ui_notify:function(a, c) {
        c.selected && this.select_node(a, !1);
      }, save_selected:function() {
        var a = this;
        this.data.ui.to_select = [];
        this.data.ui.selected.each(function() {
          this.id && a.data.ui.to_select.push("#" + this.id.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"));
        });
        this.__callback(this.data.ui.to_select);
      }, reselect:function() {
        var b = this, e = this.data.ui.to_select, e = a.map(a.makeArray(e), function(a) {
          return "#" + a.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
        });
        a.each(e, function(a, c) {
          c && "#" !== c && b.select_node(c);
        });
        this.data.ui.selected = this.data.ui.selected.filter(function() {
          return this.parentNode;
        });
        this.__callback();
      }, refresh:function(a) {
        this.save_selected();
        return this.__call_old();
      }, hover_node:function(a) {
        a = this._get_node(a);
        if (!a.length) {
          return !1;
        }
        a.hasClass("jstree-hovered") || this.dehover_node();
        this.data.ui.hovered = a.children("a").addClass("jstree-hovered").parent();
        this._fix_scroll(a);
        this.__callback({obj:a});
      }, dehover_node:function() {
        var a = this.data.ui.hovered, c;
        if (!a || !a.length) {
          return !1;
        }
        c = a.children("a").removeClass("jstree-hovered").parent();
        this.data.ui.hovered[0] === c[0] && (this.data.ui.hovered = null);
        this.__callback({obj:a});
      }, select_node:function(a, c, b) {
        a = this._get_node(a);
        if (-1 == a || !a || !a.length) {
          return !1;
        }
        var e = this._get_settings().ui, d = "on" == e.select_multiple_modifier || !1 !== e.select_multiple_modifier && b && b[e.select_multiple_modifier + "Key"], f = !1 !== e.select_range_modifier && b && b[e.select_range_modifier + "Key"] && this.data.ui.last_selected && this.data.ui.last_selected[0] !== a[0] && this.data.ui.last_selected.parent()[0] === a.parent()[0], k = this.is_selected(a), p = !0, t = this;
        if (c) {
          if (e.disable_selecting_children && d && (a.parentsUntil(".jstree", "li").children("a.jstree-clicked").length || a.children("ul").find("a.jstree-clicked:eq(0)").length)) {
            return !1;
          }
          p = !1;
          switch(!0) {
            case f:
              this.data.ui.last_selected.addClass("jstree-last-selected");
              a = a[a.index() < this.data.ui.last_selected.index() ? "nextUntil" : "prevUntil"](".jstree-last-selected").andSelf();
              -1 == e.select_limit || a.length < e.select_limit ? (this.data.ui.last_selected.removeClass("jstree-last-selected"), this.data.ui.selected.each(function() {
                this !== t.data.ui.last_selected[0] && t.deselect_node(this);
              }), k = !1, p = !0) : p = !1;
              break;
            case k && !d:
              this.deselect_all();
              k = !1;
              p = !0;
              break;
            case !k && !d:
              if (-1 == e.select_limit || 0 < e.select_limit) {
                this.deselect_all(), p = !0;
              }
              break;
            case k && d:
              this.deselect_node(a);
              break;
            case !k && d:
              if (-1 == e.select_limit || this.data.ui.selected.length + 1 <= e.select_limit) {
                p = !0;
              }
            ;
          }
        }
        p && !k && (f || (this.data.ui.last_selected = a), a.children("a").addClass("jstree-clicked"), e.selected_parent_open && a.parents(".jstree-closed").each(function() {
          t.open_node(this, !1, !0);
        }), this.data.ui.selected = this.data.ui.selected.add(a), this._fix_scroll(a.eq(0)), this.__callback({obj:a, e:b}));
      }, _fix_scroll:function(a) {
        var c = this.get_container()[0];
        c.scrollHeight > c.offsetHeight && (a = this._get_node(a)) && -1 !== a && a.length && a.is(":visible") && (a = a.offset().top - this.get_container().offset().top, 0 > a && (c.scrollTop = c.scrollTop + a - 1), a + this.data.core.li_height + (c.scrollWidth > c.offsetWidth ? e : 0) > c.offsetHeight && (c.scrollTop += a - c.offsetHeight + this.data.core.li_height + 1 + (c.scrollWidth > c.offsetWidth ? e : 0)));
      }, deselect_node:function(a) {
        a = this._get_node(a);
        if (!a.length) {
          return !1;
        }
        this.is_selected(a) && (a.children("a").removeClass("jstree-clicked"), this.data.ui.selected = this.data.ui.selected.not(a), this.data.ui.last_selected.get(0) === a.get(0) && (this.data.ui.last_selected = this.data.ui.selected.eq(0)), this.__callback({obj:a}));
      }, toggle_select:function(a) {
        a = this._get_node(a);
        if (!a.length) {
          return !1;
        }
        this.is_selected(a) ? this.deselect_node(a) : this.select_node(a);
      }, is_selected:function(a) {
        return 0 <= this.data.ui.selected.index(this._get_node(a));
      }, get_selected:function(b) {
        return b ? a(b).find("a.jstree-clicked").parent() : this.data.ui.selected;
      }, deselect_all:function(b) {
        b = b ? a(b).find("a.jstree-clicked").parent() : this.get_container().find("a.jstree-clicked").parent();
        b.children("a.jstree-clicked").removeClass("jstree-clicked");
        this.data.ui.selected = a([]);
        this.data.ui.last_selected = !1;
        this.__callback({obj:b});
      }}});
      a.jstree.defaults.plugins.push("ui");
    })(jQuery);
    (function(a) {
      a.jstree.plugin("crrm", {__init:function() {
        this.get_container().bind("move_node.jstree", a.proxy(function(a, c) {
          if (this._get_settings().crrm.move.open_onmove) {
            var d = this;
            c.rslt.np.parentsUntil(".jstree").andSelf().filter(".jstree-closed").each(function() {
              d.open_node(this, !1, !0);
            });
          }
        }, this));
      }, defaults:{input_width_limit:200, move:{always_copy:!1, open_onmove:!0, default_position:"last", check_move:function(a) {
        return !0;
      }}}, _fn:{_show_input:function(e, b) {
        e = this._get_node(e);
        var d = this._get_settings().core.rtl, f = this._get_settings().crrm.input_width_limit, g = e.children("ins").width(), l = e.find("> a:visible > ins").width() * e.find("> a:visible > ins").length, m = this.get_text(e), n = a("<div />", {css:{position:"absolute", top:"-200px", left:d ? "0px" : "-1000px", visibility:"hidden"}}).appendTo("body"), r = e.css("position", "relative").append(a("<input />", {value:m, "class":"jstree-rename-input", css:{padding:"0", border:"1px solid silver", position:"absolute", 
        left:d ? "auto" : g + l + 4 + "px", right:d ? g + l + 4 + "px" : "auto", top:"0px", height:this.data.core.li_height - 2 + "px", lineHeight:this.data.core.li_height - 2 + "px", width:"150px"}, blur:a.proxy(function() {
          var a = e.children(".jstree-rename-input"), c = a.val();
          "" === c && (c = m);
          n.remove();
          a.remove();
          this.set_text(e, m);
          this.rename_node(e, c);
          b.call(this, e, c, m);
          e.css("position", "");
        }, this), keyup:function(a) {
          a = a.keyCode || a.which;
          27 == a ? (this.value = m, this.blur()) : 13 == a ? this.blur() : r.width(Math.min(n.text("pW" + this.value).width(), f));
        }, keypress:function(a) {
          if (13 == (a.keyCode || a.which)) {
            return !1;
          }
        }})).children(".jstree-rename-input");
        this.set_text(e, "");
        n.css({fontFamily:r.css("fontFamily") || "", fontSize:r.css("fontSize") || "", fontWeight:r.css("fontWeight") || "", fontStyle:r.css("fontStyle") || "", fontStretch:r.css("fontStretch") || "", fontVariant:r.css("fontVariant") || "", letterSpacing:r.css("letterSpacing") || "", wordSpacing:r.css("wordSpacing") || ""});
        r.width(Math.min(n.text("pW" + r[0].value).width(), f))[0].select();
      }, rename:function(a) {
        a = this._get_node(a);
        this.__rollback();
        var c = this.__callback;
        this._show_input(a, function(a, e, d) {
          c.call(this, {obj:a, new_name:e, old_name:d});
        });
      }, create:function(e, b, d, f, g) {
        var l = this;
        (e = this._get_node(e)) || (e = -1);
        this.__rollback();
        return this.create_node(e, b, d, function(b) {
          var e = this._get_parent(b), d = a(b).index();
          f && f.call(this, b);
          e.length && e.hasClass("jstree-closed") && this.open_node(e, !1, !0);
          g ? l.__callback({obj:b, name:this.get_text(b), parent:e, position:d}) : this._show_input(b, function(a, c, b) {
            l.__callback({obj:a, name:c, parent:e, position:d});
          });
        });
      }, remove:function(a) {
        a = this._get_node(a, !0);
        var c = this._get_parent(a), d = this._get_prev(a);
        this.__rollback();
        a = this.delete_node(a);
        !1 !== a && this.__callback({obj:a, prev:d, parent:c});
      }, check_move:function() {
        return this.__call_old() && this._get_settings().crrm.move.check_move.call(this, this._get_move()) ? !0 : !1;
      }, move_node:function(a, c, d, f, g, l) {
        var m = this._get_settings().crrm.move;
        if (!g) {
          return "undefined" === typeof d && (d = m.default_position), "inside" !== d || m.default_position.match(/^(before|after)$/) || (d = m.default_position), this.__call_old(!0, a, c, d, f, !1, l);
        }
        if (!0 === m.always_copy || "multitree" === m.always_copy && a.rt.get_index() !== a.ot.get_index()) {
          f = !0;
        }
        this.__call_old(!0, a, c, d, f, !0, l);
      }, cut:function(a) {
        a = this._get_node(a, !0);
        if (!a || !a.length) {
          return !1;
        }
        this.data.crrm.cp_nodes = !1;
        this.data.crrm.ct_nodes = a;
        this.__callback({obj:a});
      }, copy:function(a) {
        a = this._get_node(a, !0);
        if (!a || !a.length) {
          return !1;
        }
        this.data.crrm.ct_nodes = !1;
        this.data.crrm.cp_nodes = a;
        this.__callback({obj:a});
      }, paste:function(a) {
        a = this._get_node(a);
        if (!a || !a.length) {
          return !1;
        }
        var c = this.data.crrm.ct_nodes ? this.data.crrm.ct_nodes : this.data.crrm.cp_nodes;
        if (!this.data.crrm.ct_nodes && !this.data.crrm.cp_nodes) {
          return !1;
        }
        this.data.crrm.ct_nodes && (this.move_node(this.data.crrm.ct_nodes, a), this.data.crrm.ct_nodes = !1);
        this.data.crrm.cp_nodes && this.move_node(this.data.crrm.cp_nodes, a, !1, !0);
        this.__callback({obj:a, nodes:c});
      }}});
    })(jQuery);
    (function(a) {
      var e = [];
      a.jstree._themes = !1;
      a.jstree.plugin("themes", {__init:function() {
        this.get_container().bind("init.jstree", a.proxy(function() {
          var a = this._get_settings().themes;
          this.data.themes.dots = a.dots;
          this.data.themes.icons = a.icons;
          this.set_theme(a.theme, a.url);
        }, this)).bind("loaded.jstree", a.proxy(function() {
          this.data.themes.dots ? this.show_dots() : this.hide_dots();
          this.data.themes.icons ? this.show_icons() : this.hide_icons();
        }, this));
      }, defaults:{theme:"default", url:!1, dots:!0, icons:!0}, _fn:{set_theme:function(b, d) {
        if (!b) {
          return !1;
        }
        d || (d = a.jstree._themes + b + "/style.css");
        -1 == a.inArray(d, e) && (a.vakata.css.add_sheet({url:d}), e.push(d));
        this.data.themes.theme != b && (this.get_container().removeClass("jstree-" + this.data.themes.theme), this.data.themes.theme = b);
        this.get_container().addClass("jstree-" + b);
        this.data.themes.dots ? this.show_dots() : this.hide_dots();
        this.data.themes.icons ? this.show_icons() : this.hide_icons();
        this.__callback();
      }, get_theme:function() {
        return this.data.themes.theme;
      }, show_dots:function() {
        this.data.themes.dots = !0;
        this.get_container().children("ul").removeClass("jstree-no-dots");
      }, hide_dots:function() {
        this.data.themes.dots = !1;
        this.get_container().children("ul").addClass("jstree-no-dots");
      }, toggle_dots:function() {
        this.data.themes.dots ? this.hide_dots() : this.show_dots();
      }, show_icons:function() {
        this.data.themes.icons = !0;
        this.get_container().children("ul").removeClass("jstree-no-icons");
      }, hide_icons:function() {
        this.data.themes.icons = !1;
        this.get_container().children("ul").addClass("jstree-no-icons");
      }, toggle_icons:function() {
        this.data.themes.icons ? this.hide_icons() : this.show_icons();
      }}});
      a(function() {
        !1 === a.jstree._themes && a("script").each(function() {
          if (this.src.toString().match(/jquery\.jstree[^\/]*?\.js(\?.*)?$/)) {
            return a.jstree._themes = this.src.toString().replace(/jquery\.jstree[^\/]*?\.js(\?.*)?$/, "") + "themes/", !1;
          }
        });
        !1 === a.jstree._themes && (a.jstree._themes = "themes/");
      });
      a.jstree.defaults.plugins.push("themes");
    })(jQuery);
    (function(a) {
      var e = [];
      a.jstree.plugin("hotkeys", {__init:function() {
        if ("undefined" === typeof a.hotkeys) {
          throw "jsTree hotkeys: jQuery hotkeys plugin not included.";
        }
        if (!this.data.ui) {
          throw "jsTree hotkeys: jsTree UI plugin not included.";
        }
        a.each(this._get_settings().hotkeys, function(b, d) {
          !1 !== d && -1 == a.inArray(b, e) && (a(document).bind("keydown", b, function(e) {
            a: {
              var d = a.jstree._focused(), f;
              if (d && d.data && d.data.hotkeys && d.data.hotkeys.enabled && (f = d._get_settings().hotkeys[b])) {
                e = f.call(d, e);
                break a;
              }
              e = void 0;
            }
            return e;
          }), e.push(b));
        });
        this.get_container().bind("lock.jstree", a.proxy(function() {
          this.data.hotkeys.enabled && (this.data.hotkeys.enabled = !1, this.data.hotkeys.revert = !0);
        }, this)).bind("unlock.jstree", a.proxy(function() {
          this.data.hotkeys.revert && (this.data.hotkeys.enabled = !0);
        }, this));
        this.enable_hotkeys();
      }, defaults:{up:function() {
        this.hover_node(this._get_prev(this.data.ui.hovered || this.data.ui.last_selected || -1));
        return !1;
      }, "ctrl+up":function() {
        this.hover_node(this._get_prev(this.data.ui.hovered || this.data.ui.last_selected || -1));
        return !1;
      }, "shift+up":function() {
        this.hover_node(this._get_prev(this.data.ui.hovered || this.data.ui.last_selected || -1));
        return !1;
      }, down:function() {
        this.hover_node(this._get_next(this.data.ui.hovered || this.data.ui.last_selected || -1));
        return !1;
      }, "ctrl+down":function() {
        this.hover_node(this._get_next(this.data.ui.hovered || this.data.ui.last_selected || -1));
        return !1;
      }, "shift+down":function() {
        this.hover_node(this._get_next(this.data.ui.hovered || this.data.ui.last_selected || -1));
        return !1;
      }, left:function() {
        var a = this.data.ui.hovered || this.data.ui.last_selected;
        a && (a.hasClass("jstree-open") ? this.close_node(a) : this.hover_node(this._get_prev(a)));
        return !1;
      }, "ctrl+left":function() {
        var a = this.data.ui.hovered || this.data.ui.last_selected;
        a && (a.hasClass("jstree-open") ? this.close_node(a) : this.hover_node(this._get_prev(a)));
        return !1;
      }, "shift+left":function() {
        var a = this.data.ui.hovered || this.data.ui.last_selected;
        a && (a.hasClass("jstree-open") ? this.close_node(a) : this.hover_node(this._get_prev(a)));
        return !1;
      }, right:function() {
        var a = this.data.ui.hovered || this.data.ui.last_selected;
        a && a.length && (a.hasClass("jstree-closed") ? this.open_node(a) : this.hover_node(this._get_next(a)));
        return !1;
      }, "ctrl+right":function() {
        var a = this.data.ui.hovered || this.data.ui.last_selected;
        a && a.length && (a.hasClass("jstree-closed") ? this.open_node(a) : this.hover_node(this._get_next(a)));
        return !1;
      }, "shift+right":function() {
        var a = this.data.ui.hovered || this.data.ui.last_selected;
        a && a.length && (a.hasClass("jstree-closed") ? this.open_node(a) : this.hover_node(this._get_next(a)));
        return !1;
      }, space:function() {
        this.data.ui.hovered && this.data.ui.hovered.children("a:eq(0)").click();
        return !1;
      }, "ctrl+space":function(a) {
        a.type = "click";
        this.data.ui.hovered && this.data.ui.hovered.children("a:eq(0)").trigger(a);
        return !1;
      }, "shift+space":function(a) {
        a.type = "click";
        this.data.ui.hovered && this.data.ui.hovered.children("a:eq(0)").trigger(a);
        return !1;
      }, f2:function() {
        this.rename(this.data.ui.hovered || this.data.ui.last_selected);
      }, del:function() {
        this.remove(this.data.ui.hovered || this._get_node(null));
      }}, _fn:{enable_hotkeys:function() {
        this.data.hotkeys.enabled = !0;
      }, disable_hotkeys:function() {
        this.data.hotkeys.enabled = !1;
      }}});
    })(jQuery);
    (function(a) {
      a.jstree.plugin("json_data", {__init:function() {
        this._get_settings().json_data.progressive_unload && this.get_container().bind("after_close.jstree", function(a, c) {
          c.rslt.obj.children("ul").remove();
        });
      }, defaults:{data:!1, ajax:!1, correct_state:!0, progressive_render:!1, progressive_unload:!1}, _fn:{load_node:function(a, c, d) {
        var f = this;
        this.load_node_json(a, function() {
          f.__callback({obj:f._get_node(a)});
          c.call(this);
        }, d);
      }, _is_loaded:function(e) {
        var b = this._get_settings().json_data;
        e = this._get_node(e);
        return -1 == e || !e || !b.ajax && !b.progressive_render && !a.isFunction(b.data) || e.is(".jstree-open, .jstree-leaf") || 0 < e.children("ul").children("li").length;
      }, refresh:function(e) {
        e = this._get_node(e);
        var b = this._get_settings().json_data;
        e && -1 !== e && b.progressive_unload && (a.isFunction(b.data) || b.ajax) && e.removeData("jstree_children");
        return this.__call_old();
      }, load_node_json:function(e, b, d) {
        var f = this.get_settings().json_data, g, l = function() {
        };
        g = function() {
        };
        if ((e = this._get_node(e)) && -1 !== e && (f.progressive_render || f.progressive_unload) && !e.is(".jstree-open, .jstree-leaf") && 0 === e.children("ul").children("li").length && e.data("jstree_children")) {
          if (g = this._parse_json(e.data("jstree_children"), e)) {
            e.append(g), f.progressive_unload || e.removeData("jstree_children");
          }
          this.clean_node(e);
          b && b.call(this);
        } else {
          if (e && -1 !== e) {
            if (e.data("jstree_is_loading")) {
              return;
            }
            e.data("jstree_is_loading", !0);
          }
          switch(!0) {
            case !f.data && !f.ajax:
              throw "Neither data nor ajax settings supplied.";;
            case a.isFunction(f.data):
              f.data.call(this, e, a.proxy(function(a) {
                (a = this._parse_json(a, e)) ? (-1 !== e && e ? (e.append(a).children("a.jstree-loading").removeClass("jstree-loading"), e.removeData("jstree_is_loading")) : this.get_container().children("ul").empty().append(a.children()), this.clean_node(e), b && b.call(this)) : (-1 !== e && e ? (e.children("a.jstree-loading").removeClass("jstree-loading"), e.removeData("jstree_is_loading"), f.correct_state && this.correct_state(e)) : f.correct_state && this.get_container().children("ul").empty(), 
                d && d.call(this));
              }, this));
              break;
            case !!f.data && !f.ajax || !!f.data && !!f.ajax && (!e || -1 === e):
              e && -1 != e || ((g = this._parse_json(f.data, e)) ? (this.get_container().children("ul").empty().append(g.children()), this.clean_node()) : f.correct_state && this.get_container().children("ul").empty());
              b && b.call(this);
              break;
            case !f.data && !!f.ajax || !!f.data && !!f.ajax && e && -1 !== e:
              l = function(a, c, b) {
                var g = this.get_settings().json_data.ajax.error;
                g && g.call(this, a, c, b);
                -1 != e && e.length ? (e.children("a.jstree-loading").removeClass("jstree-loading"), e.removeData("jstree_is_loading"), "success" === c && f.correct_state && this.correct_state(e)) : "success" === c && f.correct_state && this.get_container().children("ul").empty();
                d && d.call(this);
              }, g = function(d, k, g) {
                var q = this.get_settings().json_data.ajax.success;
                q && (d = q.call(this, d, k, g) || d);
                if ("" === d || d && d.toString && "" === d.toString().replace(/^[\s\n]+$/, "") || !a.isArray(d) && !a.isPlainObject(d)) {
                  return l.call(this, g, k, "");
                }
                (d = this._parse_json(d, e)) ? (-1 !== e && e ? (e.append(d).children("a.jstree-loading").removeClass("jstree-loading"), e.removeData("jstree_is_loading")) : this.get_container().children("ul").empty().append(d.children()), this.clean_node(e), b && b.call(this)) : -1 !== e && e ? (e.children("a.jstree-loading").removeClass("jstree-loading"), e.removeData("jstree_is_loading"), f.correct_state && (this.correct_state(e), b && b.call(this))) : f.correct_state && (this.get_container().children("ul").empty(), 
                b && b.call(this));
              }, f.ajax.context = this, f.ajax.error = l, f.ajax.success = g, f.ajax.dataType || (f.ajax.dataType = "json"), a.isFunction(f.ajax.url) && (f.ajax.url = f.ajax.url.call(this, e)), a.isFunction(f.ajax.data) && (f.ajax.data = f.ajax.data.call(this, e)), a.ajax(f.ajax);
          }
        }
      }, _parse_json:function(e, b, d) {
        var f = !1, g = this._get_settings(), l = g.json_data, m = g.core.html_titles, n;
        if (!e) {
          return f;
        }
        l.progressive_unload && b && -1 !== b && b.data("jstree_children", f);
        if (a.isArray(e)) {
          f = a();
          if (!e.length) {
            return !1;
          }
          g = 0;
          for (l = e.length;g < l;g++) {
            n = this._parse_json(e[g], b, !0), n.length && (f = f.add(n));
          }
        } else {
          "string" == typeof e && (e = {data:e});
          if (!e.data && "" !== e.data) {
            return f;
          }
          f = a("<li />");
          e.attr && f.attr(e.attr);
          e.metadata && f.data(e.metadata);
          e.state && f.addClass("jstree-" + e.state);
          a.isArray(e.data) || (n = e.data, e.data = [], e.data.push(n));
          a.each(e.data, function(b, d) {
            n = a("<a />");
            a.isFunction(d) && (d = d.call(this, e));
            if ("string" == typeof d) {
              n.attr("href", "#")[m ? "html" : "text"](d);
            } else {
              d.attr || (d.attr = {}), d.attr.href || (d.attr.href = "#"), n.attr(d.attr)[m ? "html" : "text"](d.title), d.language && n.addClass(d.language);
            }
            n.prepend("<ins class='jstree-icon'>&#160;</ins>");
            !d.icon && e.icon && (d.icon = e.icon);
            d.icon && (-1 === d.icon.indexOf("/") ? n.children("ins").addClass(d.icon) : n.children("ins").css("background", "url('" + d.icon + "') center center no-repeat"));
            f.append(n);
          });
          f.prepend("<ins class='jstree-icon'>&#160;</ins>");
          e.children && (l.progressive_render && "open" !== e.state ? f.addClass("jstree-closed").data("jstree_children", e.children) : (l.progressive_unload && f.data("jstree_children", e.children), a.isArray(e.children) && e.children.length && (n = this._parse_json(e.children, b, !0), n.length && (b = a("<ul />"), b.append(n), f.append(b)))));
        }
        d || (d = a("<ul />"), d.append(f), f = d);
        return f;
      }, get_json:function(e, b, d, f) {
        var g = [], l = this._get_settings(), m = this, n, r, q, p, t, v;
        (e = this._get_node(e)) && -1 !== e || (e = this.get_container().find("> ul > li"));
        b = a.isArray(b) ? b : ["id", "class"];
        !f && this.data.types && b.push(l.types.type_attr);
        d = a.isArray(d) ? d : [];
        e.each(function() {
          q = a(this);
          n = {data:[]};
          b.length && (n.attr = {});
          a.each(b, function(a, c) {
            (r = q.attr(c)) && r.length && r.replace(/jstree[^ ]*/ig, "").length && (n.attr[c] = (" " + r).replace(/ jstree[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, ""));
          });
          q.hasClass("jstree-open") && (n.state = "open");
          q.hasClass("jstree-closed") && (n.state = "closed");
          q.data() && (n.metadata = q.data());
          p = q.children("a");
          p.each(function() {
            t = a(this);
            d.length || -1 !== a.inArray("languages", l.plugins) || t.children("ins").get(0).style.backgroundImage.length || t.children("ins").get(0).className && t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, "").length ? (v = !1, -1 !== a.inArray("languages", l.plugins) && a.isArray(l.languages) && l.languages.length && a.each(l.languages, function(a, c) {
              if (t.hasClass(c)) {
                return v = c, !1;
              }
            }), r = {attr:{}, title:m.get_text(t, v)}, a.each(d, function(a, c) {
              r.attr[c] = (" " + (t.attr(c) || "")).replace(/ jstree[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "");
            }), -1 !== a.inArray("languages", l.plugins) && a.isArray(l.languages) && l.languages.length && a.each(l.languages, function(a, c) {
              if (t.hasClass(c)) {
                return r.language = c, !0;
              }
            }), t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, "").replace(/^\s+$/ig, "").length && (r.icon = t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")), t.children("ins").get(0).style.backgroundImage.length && (r.icon = t.children("ins").get(0).style.backgroundImage.replace("url(", "").replace(")", ""))) : r = m.get_text(t);
            1 < p.length ? n.data.push(r) : n.data = r;
          });
          q = q.find("> ul > li");
          q.length && (n.children = m.get_json(q, b, d, !0));
          g.push(n);
        });
        return g;
      }}});
    })(jQuery);
    (function(a) {
      a.jstree.plugin("languages", {__init:function() {
        this._load_css();
      }, defaults:[], _fn:{set_lang:function(e) {
        var b = this._get_settings().languages, d = !1, f = ".jstree-" + this.get_index() + " a";
        if (!a.isArray(b) || 0 === b.length) {
          return !1;
        }
        if (-1 == a.inArray(e, b)) {
          if (b[e]) {
            e = b[e];
          } else {
            return !1;
          }
        }
        if (e == this.data.languages.current_language) {
          return !0;
        }
        d = a.vakata.css.get_css(f + "." + this.data.languages.current_language, !1, this.data.languages.language_css);
        !1 !== d && (d.style.display = "none");
        d = a.vakata.css.get_css(f + "." + e, !1, this.data.languages.language_css);
        !1 !== d && (d.style.display = "");
        this.data.languages.current_language = e;
        this.__callback(e);
        return !0;
      }, get_lang:function() {
        return this.data.languages.current_language;
      }, _get_string:function(e, b) {
        var d = this._get_settings().languages, f = this._get_settings().core.strings;
        a.isArray(d) && d.length && (b = b && -1 != a.inArray(b, d) ? b : this.data.languages.current_language);
        return f[b] && f[b][e] ? f[b][e] : f[e] ? f[e] : e;
      }, get_text:function(e, b) {
        e = this._get_node(e) || this.data.ui.last_selected;
        if (!e.size()) {
          return !1;
        }
        var d = this._get_settings().languages, f = this._get_settings().core.html_titles;
        a.isArray(d) && d.length ? (b = b && -1 != a.inArray(b, d) ? b : this.data.languages.current_language, e = e.children("a." + b)) : e = e.children("a:eq(0)");
        if (f) {
          return e = e.clone(), e.children("INS").remove(), e.html();
        }
        e = e.contents().filter(function() {
          return 3 == this.nodeType;
        })[0];
        return e.nodeValue;
      }, set_text:function(e, b, d) {
        e = this._get_node(e) || this.data.ui.last_selected;
        if (!e.size()) {
          return !1;
        }
        var f = this._get_settings().languages, g = this._get_settings().core.html_titles;
        a.isArray(f) && f.length ? (d = d && -1 != a.inArray(d, f) ? d : this.data.languages.current_language, e = e.children("a." + d)) : e = e.children("a:eq(0)");
        if (g) {
          return f = e.children("INS").clone(), e.html(b).prepend(f), this.__callback({obj:e, name:b, lang:d}), !0;
        }
        e = e.contents().filter(function() {
          return 3 == this.nodeType;
        })[0];
        this.__callback({obj:e, name:b, lang:d});
        return e.nodeValue = b;
      }, _load_css:function() {
        var e = this._get_settings().languages, b = "/* languages css */", d = ".jstree-" + this.get_index() + " a", f;
        if (a.isArray(e) && e.length) {
          this.data.languages.current_language = e[0];
          for (f = 0;f < e.length;f++) {
            b += d + "." + e[f] + " {", e[f] != this.data.languages.current_language && (b += " display:none; "), b += " } ";
          }
          this.data.languages.language_css = a.vakata.css.add_sheet({str:b, title:"jstree-languages"});
        }
      }, create_node:function(e, b, d, f) {
        return this.__call_old(!0, e, b, d, function(b) {
          var e = this._get_settings().languages, d = b.children("a"), k;
          if (a.isArray(e) && e.length) {
            for (k = 0;k < e.length;k++) {
              d.is("." + e[k]) || b.append(d.eq(0).clone().removeClass(e.join(" ")).addClass(e[k]));
            }
            d.not("." + e.join(", .")).remove();
          }
          f && f.call(this, b);
        });
      }}});
    })(jQuery);
    (function(a) {
      a.jstree.plugin("cookies", {__init:function() {
        if ("undefined" === typeof a.cookie) {
          throw "jsTree cookie: jQuery cookie plugin not included.";
        }
        var e = this._get_settings().cookies, b;
        e.save_loaded && (b = a.cookie(e.save_loaded)) && b.length && (this.data.core.to_load = b.split(","));
        e.save_opened && (b = a.cookie(e.save_opened)) && b.length && (this.data.core.to_open = b.split(","));
        e.save_selected && (b = a.cookie(e.save_selected)) && b.length && this.data.ui && (this.data.ui.to_select = b.split(","));
        this.get_container().one((this.data.ui ? "reselect" : "reopen") + ".jstree", a.proxy(function() {
          this.get_container().bind("open_node.jstree close_node.jstree select_node.jstree deselect_node.jstree", a.proxy(function(a) {
            this._get_settings().cookies.auto_save && this.save_cookie((a.handleObj.namespace + a.handleObj.type).replace("jstree", ""));
          }, this));
        }, this));
      }, defaults:{save_loaded:"jstree_load", save_opened:"jstree_open", save_selected:"jstree_select", auto_save:!0, cookie_options:{}}, _fn:{save_cookie:function(e) {
        if (!this.data.core.refreshing) {
          var b = this._get_settings().cookies;
          if (e) {
            switch(e) {
              case "open_node":
              ;
              case "close_node":
                b.save_opened && (this.save_opened(), a.cookie(b.save_opened, this.data.core.to_open.join(","), b.cookie_options));
                b.save_loaded && (this.save_loaded(), a.cookie(b.save_loaded, this.data.core.to_load.join(","), b.cookie_options));
                break;
              case "select_node":
              ;
              case "deselect_node":
                b.save_selected && this.data.ui && (this.save_selected(), a.cookie(b.save_selected, this.data.ui.to_select.join(","), b.cookie_options));
            }
          } else {
            b.save_loaded && (this.save_loaded(), a.cookie(b.save_loaded, this.data.core.to_load.join(","), b.cookie_options)), b.save_opened && (this.save_opened(), a.cookie(b.save_opened, this.data.core.to_open.join(","), b.cookie_options)), b.save_selected && this.data.ui && (this.save_selected(), a.cookie(b.save_selected, this.data.ui.to_select.join(","), b.cookie_options));
          }
        }
      }}});
    })(jQuery);
    (function(a) {
      a.jstree.plugin("sort", {__init:function() {
        this.get_container().bind("load_node.jstree", a.proxy(function(a, c) {
          var d = this._get_node(c.rslt.obj), d = -1 === d ? this.get_container().children("ul") : d.children("ul");
          this.sort(d);
        }, this)).bind("rename_node.jstree create_node.jstree create.jstree", a.proxy(function(a, c) {
          this.sort(c.rslt.obj.parent());
        }, this)).bind("move_node.jstree", a.proxy(function(a, c) {
          var d = -1 == c.rslt.np ? this.get_container() : c.rslt.np;
          this.sort(d.children("ul"));
        }, this));
      }, defaults:function(a, c) {
        return this.get_text(a) > this.get_text(c) ? 1 : -1;
      }, _fn:{sort:function(e) {
        var b = this._get_settings().sort, d = this;
        e.append(a.makeArray(e.children("li")).sort(a.proxy(b, d)));
        e.find("> li > ul").each(function() {
          d.sort(a(this));
        });
        this.clean_node(e);
      }}});
    })(jQuery);
    (function(a) {
      var e = !1, b = !1, d = !1, f = !1, g = !1, l = !1, m = !1, n = !1, r = !1;
      a.vakata.dnd = {is_down:!1, is_drag:!1, helper:!1, scroll_spd:10, init_x:0, init_y:0, threshold:5, helper_left:5, helper_top:10, user_data:{}, drag_start:function(b, e, d) {
        a.vakata.dnd.is_drag && a.vakata.drag_stop({});
        try {
          b.currentTarget.unselectable = "on", b.currentTarget.onselectstart = function() {
            return !1;
          }, b.currentTarget.style && (b.currentTarget.style.MozUserSelect = "none");
        } catch (f) {
        }
        a.vakata.dnd.init_x = b.pageX;
        a.vakata.dnd.init_y = b.pageY;
        a.vakata.dnd.user_data = e;
        a.vakata.dnd.is_down = !0;
        a.vakata.dnd.helper = a("<div id='vakata-dragged' />").html(d);
        a(document).bind("mousemove", a.vakata.dnd.drag);
        a(document).bind("mouseup", a.vakata.dnd.drag_stop);
        return !1;
      }, drag:function(b) {
        if (a.vakata.dnd.is_down) {
          if (!a.vakata.dnd.is_drag) {
            if (5 < Math.abs(b.pageX - a.vakata.dnd.init_x) || 5 < Math.abs(b.pageY - a.vakata.dnd.init_y)) {
              a.vakata.dnd.helper.appendTo("body"), a.vakata.dnd.is_drag = !0, a(document).triggerHandler("drag_start.vakata", {event:b, data:a.vakata.dnd.user_data});
            } else {
              return;
            }
          }
          if ("mousemove" === b.type) {
            var e = a(document), d = e.scrollTop(), e = e.scrollLeft();
            20 > b.pageY - d ? (l && "down" === m && (clearInterval(l), l = !1), l || (m = "up", l = setInterval(function() {
              a(document).scrollTop(a(document).scrollTop() - a.vakata.dnd.scroll_spd);
            }, 150))) : l && "up" === m && (clearInterval(l), l = !1);
            20 > a(window).height() - (b.pageY - d) ? (l && "up" === m && (clearInterval(l), l = !1), l || (m = "down", l = setInterval(function() {
              a(document).scrollTop(a(document).scrollTop() + a.vakata.dnd.scroll_spd);
            }, 150))) : l && "down" === m && (clearInterval(l), l = !1);
            20 > b.pageX - e ? (g && "right" === n && (clearInterval(g), g = !1), g || (n = "left", g = setInterval(function() {
              a(document).scrollLeft(a(document).scrollLeft() - a.vakata.dnd.scroll_spd);
            }, 150))) : g && "left" === n && (clearInterval(g), g = !1);
            20 > a(window).width() - (b.pageX - e) ? (g && "left" === n && (clearInterval(g), g = !1), g || (n = "right", g = setInterval(function() {
              a(document).scrollLeft(a(document).scrollLeft() + a.vakata.dnd.scroll_spd);
            }, 150))) : g && "right" === n && (clearInterval(g), g = !1);
          }
          a.vakata.dnd.helper.css({left:b.pageX + a.vakata.dnd.helper_left + "px", top:b.pageY + a.vakata.dnd.helper_top + "px"});
          a(document).triggerHandler("drag.vakata", {event:b, data:a.vakata.dnd.user_data});
        }
      }, drag_stop:function(b) {
        g && clearInterval(g);
        l && clearInterval(l);
        a(document).unbind("mousemove", a.vakata.dnd.drag);
        a(document).unbind("mouseup", a.vakata.dnd.drag_stop);
        a(document).triggerHandler("drag_stop.vakata", {event:b, data:a.vakata.dnd.user_data});
        a.vakata.dnd.helper.remove();
        a.vakata.dnd.init_x = 0;
        a.vakata.dnd.init_y = 0;
        a.vakata.dnd.user_data = {};
        a.vakata.dnd.is_down = !1;
        a.vakata.dnd.is_drag = !1;
      }};
      a(function() {
        a.vakata.css.add_sheet({str:"#vakata-dragged { display:block; margin:0 0 0 0; padding:4px 4px 4px 24px; position:absolute; top:-2000px; line-height:16px; z-index:10000; } ", title:"vakata"});
      });
      a.jstree.plugin("dnd", {__init:function() {
        this.data.dnd = {active:!1, after:!1, inside:!1, before:!1, off:!1, prepared:!1, w:0, to1:!1, to2:!1, cof:!1, cw:!1, ch:!1, i1:!1, i2:!1, mto:!1};
        this.get_container().bind("mouseenter.jstree", a.proxy(function(b) {
          a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && (this.data.themes && (d.attr("class", "jstree-" + this.data.themes.theme), f && f.attr("class", "jstree-" + this.data.themes.theme), a.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme)), b.currentTarget === b.target && a.vakata.dnd.user_data.obj && a(a.vakata.dnd.user_data.obj).length && a(a.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0] !== b.target && (b = a.jstree._reference(b.target), 
          b.data.dnd.foreign ? (b = b._get_settings().dnd.drag_check.call(this, {o:e, r:b.get_container(), is_root:!0}), !0 !== b && !0 !== b.inside && !0 !== b.before && !0 !== b.after || a.vakata.dnd.helper.children("ins").attr("class", "jstree-ok")) : (b.prepare_move(e, b.get_container(), "last"), b.check_move() && a.vakata.dnd.helper.children("ins").attr("class", "jstree-ok"))));
        }, this)).bind("mouseup.jstree", a.proxy(function(b) {
          if (a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && b.currentTarget === b.target && a.vakata.dnd.user_data.obj && a(a.vakata.dnd.user_data.obj).length && a(a.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0] !== b.target) {
            var d = a.jstree._reference(b.currentTarget);
            d.data.dnd.foreign ? (b = d._get_settings().dnd.drag_check.call(this, {o:e, r:d.get_container(), is_root:!0}), !0 !== b && !0 !== b.inside && !0 !== b.before && !0 !== b.after || d._get_settings().dnd.drag_finish.call(this, {o:e, r:d.get_container(), is_root:!0})) : d.move_node(e, d.get_container(), "last", b[d._get_settings().dnd.copy_modifier + "Key"]);
          }
        }, this)).bind("mouseleave.jstree", a.proxy(function(b) {
          if (b.relatedTarget && b.relatedTarget.id && "jstree-marker-line" === b.relatedTarget.id) {
            return !1;
          }
          a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && (this.data.dnd.i1 && clearInterval(this.data.dnd.i1), this.data.dnd.i2 && clearInterval(this.data.dnd.i2), this.data.dnd.to1 && clearTimeout(this.data.dnd.to1), this.data.dnd.to2 && clearTimeout(this.data.dnd.to2), a.vakata.dnd.helper.children("ins").hasClass("jstree-ok") && a.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid"));
        }, this)).bind("mousemove.jstree", a.proxy(function(b) {
          if (a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree) {
            var e = this.get_container()[0];
            b.pageX + 24 > this.data.dnd.cof.left + this.data.dnd.cw ? (this.data.dnd.i1 && clearInterval(this.data.dnd.i1), this.data.dnd.i1 = setInterval(a.proxy(function() {
              this.scrollLeft += a.vakata.dnd.scroll_spd;
            }, e), 100)) : b.pageX - 24 < this.data.dnd.cof.left ? (this.data.dnd.i1 && clearInterval(this.data.dnd.i1), this.data.dnd.i1 = setInterval(a.proxy(function() {
              this.scrollLeft -= a.vakata.dnd.scroll_spd;
            }, e), 100)) : this.data.dnd.i1 && clearInterval(this.data.dnd.i1);
            b.pageY + 24 > this.data.dnd.cof.top + this.data.dnd.ch ? (this.data.dnd.i2 && clearInterval(this.data.dnd.i2), this.data.dnd.i2 = setInterval(a.proxy(function() {
              this.scrollTop += a.vakata.dnd.scroll_spd;
            }, e), 100)) : b.pageY - 24 < this.data.dnd.cof.top ? (this.data.dnd.i2 && clearInterval(this.data.dnd.i2), this.data.dnd.i2 = setInterval(a.proxy(function() {
              this.scrollTop -= a.vakata.dnd.scroll_spd;
            }, e), 100)) : this.data.dnd.i2 && clearInterval(this.data.dnd.i2);
          }
        }, this)).bind("scroll.jstree", a.proxy(function(b) {
          a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && d && f && (d.hide(), f.hide());
        }, this)).delegate("a", "mousedown.jstree", a.proxy(function(a) {
          if (1 === a.which) {
            return this.start_drag(a.currentTarget, a), !1;
          }
        }, this)).delegate("a", "mouseenter.jstree", a.proxy(function(b) {
          a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && this.dnd_enter(b.currentTarget);
        }, this)).delegate("a", "mousemove.jstree", a.proxy(function(e) {
          a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && (b && b.length && b.children("a")[0] === e.currentTarget || this.dnd_enter(e.currentTarget), "undefined" === typeof this.data.dnd.off.top && (this.data.dnd.off = a(e.target).offset()), this.data.dnd.w = (e.pageY - (this.data.dnd.off.top || 0)) % this.data.core.li_height, 0 > this.data.dnd.w && (this.data.dnd.w += this.data.core.li_height), this.dnd_show());
        }, this)).delegate("a", "mouseleave.jstree", a.proxy(function(b) {
          if (a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree) {
            if (b.relatedTarget && b.relatedTarget.id && "jstree-marker-line" === b.relatedTarget.id) {
              return !1;
            }
            d && d.hide();
            f && f.hide();
            this.data.dnd.mto = setTimeout(function(a) {
              return function() {
                a.dnd_leave(b);
              };
            }(this), 0);
          }
        }, this)).delegate("a", "mouseup.jstree", a.proxy(function(b) {
          a.vakata.dnd.is_drag && a.vakata.dnd.user_data.jstree && this.dnd_finish(b);
        }, this));
        a(document).bind("drag_stop.vakata", a.proxy(function() {
          this.data.dnd.to1 && clearTimeout(this.data.dnd.to1);
          this.data.dnd.to2 && clearTimeout(this.data.dnd.to2);
          this.data.dnd.i1 && clearInterval(this.data.dnd.i1);
          this.data.dnd.i2 && clearInterval(this.data.dnd.i2);
          this.data.dnd.after = !1;
          this.data.dnd.before = !1;
          this.data.dnd.inside = !1;
          this.data.dnd.off = !1;
          this.data.dnd.prepared = !1;
          this.data.dnd.w = !1;
          this.data.dnd.to1 = !1;
          this.data.dnd.to2 = !1;
          this.data.dnd.i1 = !1;
          this.data.dnd.i2 = !1;
          this.data.dnd.active = !1;
          this.data.dnd.foreign = !1;
          d && d.css({top:"-2000px"});
          f && f.css({top:"-2000px"});
        }, this)).bind("drag_start.vakata", a.proxy(function(b, e) {
          if (e.data.jstree) {
            var d = a(e.event.target);
            d.closest(".jstree").hasClass("jstree-" + this.get_index()) && this.dnd_enter(d);
          }
        }, this));
        var g = this._get_settings().dnd;
        g.drag_target && a(document).delegate(g.drag_target, "mousedown.jstree-" + this.get_index(), a.proxy(function(b) {
          e = b.target;
          a.vakata.dnd.drag_start(b, {jstree:!0, obj:b.target}, "<ins class='jstree-icon'></ins>" + a(b.target).text());
          this.data.themes && (d && d.attr("class", "jstree-" + this.data.themes.theme), f && f.attr("class", "jstree-" + this.data.themes.theme), a.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme));
          a.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
          var g = this.get_container();
          this.data.dnd.cof = g.offset();
          this.data.dnd.cw = parseInt(g.width(), 10);
          this.data.dnd.ch = parseInt(g.height(), 10);
          this.data.dnd.foreign = !0;
          b.preventDefault();
        }, this));
        g.drop_target && a(document).delegate(g.drop_target, "mouseenter.jstree-" + this.get_index(), a.proxy(function(b) {
          this.data.dnd.active && this._get_settings().dnd.drop_check.call(this, {o:e, r:a(b.target), e:b}) && a.vakata.dnd.helper.children("ins").attr("class", "jstree-ok");
        }, this)).delegate(g.drop_target, "mouseleave.jstree-" + this.get_index(), a.proxy(function(b) {
          this.data.dnd.active && a.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
        }, this)).delegate(g.drop_target, "mouseup.jstree-" + this.get_index(), a.proxy(function(b) {
          this.data.dnd.active && a.vakata.dnd.helper.children("ins").hasClass("jstree-ok") && this._get_settings().dnd.drop_finish.call(this, {o:e, r:a(b.target), e:b});
        }, this));
      }, defaults:{copy_modifier:"ctrl", check_timeout:100, open_timeout:500, drop_target:".jstree-drop", drop_check:function(a) {
        return !0;
      }, drop_finish:a.noop, drag_target:".jstree-draggable", drag_finish:a.noop, drag_check:function(a) {
        return {after:!1, before:!1, inside:!0};
      }}, _fn:{dnd_prepare:function() {
        if (b && b.length) {
          this.data.dnd.off = b.offset();
          this._get_settings().core.rtl && (this.data.dnd.off.right = this.data.dnd.off.left + b.width());
          if (this.data.dnd.foreign) {
            var a = this._get_settings().dnd.drag_check.call(this, {o:e, r:b});
            this.data.dnd.after = a.after;
            this.data.dnd.before = a.before;
            this.data.dnd.inside = a.inside;
            this.data.dnd.prepared = !0;
            return this.dnd_show();
          }
          this.prepare_move(e, b, "before");
          this.data.dnd.before = this.check_move();
          this.prepare_move(e, b, "after");
          this.data.dnd.after = this.check_move();
          this._is_loaded(b) ? (this.prepare_move(e, b, "inside"), this.data.dnd.inside = this.check_move()) : this.data.dnd.inside = !1;
          this.data.dnd.prepared = !0;
          return this.dnd_show();
        }
      }, dnd_show:function() {
        if (this.data.dnd.prepared) {
          var b = ["before", "inside", "after"], e = !1, g = this._get_settings().core.rtl, b = this.data.dnd.w < this.data.core.li_height / 3 ? ["before", "inside", "after"] : this.data.dnd.w <= 2 * this.data.core.li_height / 3 ? this.data.dnd.w < this.data.core.li_height / 2 ? ["inside", "before", "after"] : ["inside", "after", "before"] : ["after", "inside", "before"];
          a.each(b, a.proxy(function(b, d) {
            if (this.data.dnd[d]) {
              return a.vakata.dnd.helper.children("ins").attr("class", "jstree-ok"), e = d, !1;
            }
          }, this));
          !1 === e && a.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
          b = g ? this.data.dnd.off.right - 18 : this.data.dnd.off.left + 10;
          switch(e) {
            case "before":
              d.css({left:b + "px", top:this.data.dnd.off.top - 6 + "px"}).show();
              f && f.css({left:b + 8 + "px", top:this.data.dnd.off.top - 1 + "px"}).show();
              break;
            case "after":
              d.css({left:b + "px", top:this.data.dnd.off.top + this.data.core.li_height - 6 + "px"}).show();
              f && f.css({left:b + 8 + "px", top:this.data.dnd.off.top + this.data.core.li_height - 1 + "px"}).show();
              break;
            case "inside":
              d.css({left:b + (g ? -4 : 4) + "px", top:this.data.dnd.off.top + this.data.core.li_height / 2 - 5 + "px"}).show();
              f && f.hide();
              break;
            default:
              d.hide(), f && f.hide();
          }
          return r = e;
        }
      }, dnd_open:function() {
        this.data.dnd.to2 = !1;
        this.open_node(b, a.proxy(this.dnd_prepare, this), !0);
      }, dnd_finish:function(a) {
        this.data.dnd.foreign ? (this.data.dnd.after || this.data.dnd.before || this.data.dnd.inside) && this._get_settings().dnd.drag_finish.call(this, {o:e, r:b, p:r}) : (this.dnd_prepare(), this.move_node(e, b, r, a[this._get_settings().dnd.copy_modifier + "Key"]));
        b = e = !1;
        d.hide();
        f && f.hide();
      }, dnd_enter:function(e) {
        this.data.dnd.mto && (clearTimeout(this.data.dnd.mto), this.data.dnd.mto = !1);
        var d = this._get_settings().dnd;
        this.data.dnd.prepared = !1;
        b = this._get_node(e);
        d.check_timeout ? (this.data.dnd.to1 && clearTimeout(this.data.dnd.to1), this.data.dnd.to1 = setTimeout(a.proxy(this.dnd_prepare, this), d.check_timeout)) : this.dnd_prepare();
        d.open_timeout ? (this.data.dnd.to2 && clearTimeout(this.data.dnd.to2), b && b.length && b.hasClass("jstree-closed") && (this.data.dnd.to2 = setTimeout(a.proxy(this.dnd_open, this), d.open_timeout))) : b && b.length && b.hasClass("jstree-closed") && this.dnd_open();
      }, dnd_leave:function(e) {
        this.data.dnd.after = !1;
        this.data.dnd.before = !1;
        this.data.dnd.inside = !1;
        a.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
        d.hide();
        f && f.hide();
        b && b[0] === e.target.parentNode && (this.data.dnd.to1 && (clearTimeout(this.data.dnd.to1), this.data.dnd.to1 = !1), this.data.dnd.to2 && (clearTimeout(this.data.dnd.to2), this.data.dnd.to2 = !1));
      }, start_drag:function(b, g) {
        e = this._get_node(b);
        this.data.ui && this.is_selected(e) && (e = this._get_node(null, !0));
        var l = 1 < e.length ? this._get_string("multiple_selection") : this.get_text(e), m = this.get_container();
        this._get_settings().core.html_titles || (l = l.replace(/</ig, "&lt;").replace(/>/ig, "&gt;"));
        a.vakata.dnd.drag_start(g, {jstree:!0, obj:e}, "<ins class='jstree-icon'></ins>" + l);
        this.data.themes && (d && d.attr("class", "jstree-" + this.data.themes.theme), f && f.attr("class", "jstree-" + this.data.themes.theme), a.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme));
        this.data.dnd.cof = m.offset();
        this.data.dnd.cw = parseInt(m.width(), 10);
        this.data.dnd.ch = parseInt(m.height(), 10);
        this.data.dnd.active = !0;
      }}});
      a(function() {
        a.vakata.css.add_sheet({str:"#vakata-dragged ins { display:block; text-decoration:none; width:16px; height:16px; margin:0 0 0 0; padding:0; position:absolute; top:4px; left:4px;  -moz-border-radius:4px; border-radius:4px; -webkit-border-radius:4px; } #vakata-dragged .jstree-ok { background:green; } #vakata-dragged .jstree-invalid { background:red; } #jstree-marker { padding:0; margin:0; font-size:12px; overflow:hidden; height:12px; width:8px; position:absolute; top:-30px; z-index:10001; background-repeat:no-repeat; display:none; background-color:transparent; text-shadow:1px 1px 1px white; color:black; line-height:10px; } #jstree-marker-line { padding:0; margin:0; line-height:0%; font-size:1px; overflow:hidden; height:1px; width:100px; position:absolute; top:-30px; z-index:10000; background-repeat:no-repeat; display:none; background-color:#456c43;  cursor:pointer; border:1px solid #eeeeee; border-left:0; -moz-box-shadow: 0px 0px 2px #666; -webkit-box-shadow: 0px 0px 2px #666; box-shadow: 0px 0px 2px #666;  -moz-border-radius:1px; border-radius:1px; -webkit-border-radius:1px; }", 
        title:"jstree"});
        d = a("<div />").attr({id:"jstree-marker"}).hide().html("&raquo;").bind("mouseleave mouseenter", function(a) {
          d.hide();
          f.hide();
          a.preventDefault();
          a.stopImmediatePropagation();
          return !1;
        }).appendTo("body");
        f = a("<div />").attr({id:"jstree-marker-line"}).hide().bind("mouseup", function(a) {
          if (b && b.length) {
            return b.children("a").trigger(a), a.preventDefault(), a.stopImmediatePropagation(), !1;
          }
        }).bind("mouseleave", function(e) {
          var g = a(e.relatedTarget);
          if ((g.is(".jstree") || 0 === g.closest(".jstree").length) && b && b.length) {
            return b.children("a").trigger(e), d.hide(), f.hide(), e.preventDefault(), e.stopImmediatePropagation(), !1;
          }
        }).appendTo("body");
        a(document).bind("drag_start.vakata", function(a, b) {
          b.data.jstree && (d.show(), f && f.show());
        });
        a(document).bind("drag_stop.vakata", function(a, b) {
          b.data.jstree && (d.hide(), f && f.hide());
        });
      });
    })(jQuery);
    (function(a) {
      a.jstree.plugin("checkbox", {__init:function() {
        this.data.checkbox.noui = this._get_settings().checkbox.override_ui;
        this.data.ui && this.data.checkbox.noui && (this.select_node = this.deselect_node = this.deselect_all = a.noop, this.get_selected = this.get_checked);
        this.get_container().bind("open_node.jstree create_node.jstree clean_node.jstree refresh.jstree", a.proxy(function(a, b) {
          this._prepare_checkboxes(b.rslt.obj);
        }, this)).bind("loaded.jstree", a.proxy(function(a) {
          this._prepare_checkboxes();
        }, this)).delegate(this.data.ui && this.data.checkbox.noui ? "a" : "ins.jstree-checkbox", "click.jstree", a.proxy(function(a) {
          a.preventDefault();
          this._get_node(a.target).hasClass("jstree-checked") ? this.uncheck_node(a.target) : this.check_node(a.target);
          if (this.data.ui && this.data.checkbox.noui) {
            this.save_selected(), this.data.cookies && this.save_cookie("select_node");
          } else {
            return a.stopImmediatePropagation(), !1;
          }
        }, this));
      }, defaults:{override_ui:!1, two_state:!1, real_checkboxes:!1, checked_parent_open:!1, real_checkboxes_names:function(a) {
        return ["check_" + (a[0].id || Math.ceil(1E4 * Math.random())), 1];
      }}, __destroy:function() {
        this.get_container().find("input.jstree-real-checkbox").removeClass("jstree-real-checkbox").end().find("ins.jstree-checkbox").remove();
      }, _fn:{_checkbox_notify:function(a, b) {
        b.checked && this.check_node(a, !1);
      }, _prepare_checkboxes:function(e) {
        e = e && -1 != e ? this._get_node(e) : this.get_container().find("> ul > li");
        if (!1 !== e) {
          var b, d = this, f, g = this._get_settings().checkbox.two_state, l = this._get_settings().checkbox.real_checkboxes, m = this._get_settings().checkbox.real_checkboxes_names;
          e.each(function() {
            f = a(this);
            b = f.is("li") && (f.hasClass("jstree-checked") || l && f.children(":checked").length) ? "jstree-checked" : "jstree-unchecked";
            f.find("li").andSelf().each(function() {
              var e = a(this), f;
              e.children("a" + (d.data.languages ? "" : ":eq(0)")).not(":has(.jstree-checkbox)").prepend("<ins class='jstree-checkbox'>&#160;</ins>").parent().not(".jstree-checked, .jstree-unchecked").addClass(g ? "jstree-unchecked" : b);
              l && (e.children(":checkbox").length ? e.children(":checkbox").addClass("jstree-real-checkbox") : (f = m.call(d, e), e.prepend("<input type='checkbox' class='jstree-real-checkbox' id='" + f[0] + "' name='" + f[0] + "' value='" + f[1] + "' />")));
              g ? (e.hasClass("jstree-checked") || e.children(":checked").length) && e.addClass("jstree-checked").children(":checkbox").prop("checked", !0) : ("jstree-checked" === b || e.hasClass("jstree-checked") || e.children(":checked").length) && e.find("li").andSelf().addClass("jstree-checked").children(":checkbox").prop("checked", !0);
            });
          });
          g || e.find(".jstree-checked").parent().parent().each(function() {
            d._repair_state(this);
          });
        }
      }, change_state:function(e, b) {
        e = this._get_node(e);
        var d = !1, f = this._get_settings().checkbox.real_checkboxes;
        if (!e || -1 === e) {
          return !1;
        }
        b = !1 === b || !0 === b ? b : e.hasClass("jstree-checked");
        if (this._get_settings().checkbox.two_state) {
          b ? (e.removeClass("jstree-checked").addClass("jstree-unchecked"), f && e.children(":checkbox").prop("checked", !1)) : (e.removeClass("jstree-unchecked").addClass("jstree-checked"), f && e.children(":checkbox").prop("checked", !0));
        } else {
          if (b) {
            d = e.find("li").andSelf();
            if (!d.filter(".jstree-checked, .jstree-undetermined").length) {
              return !1;
            }
            d.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
            f && d.children(":checkbox").prop("checked", !1);
          } else {
            d = e.find("li").andSelf();
            if (!d.filter(".jstree-unchecked, .jstree-undetermined").length) {
              return !1;
            }
            d.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
            f && d.children(":checkbox").prop("checked", !0);
            this.data.ui && (this.data.ui.last_selected = e);
            this.data.checkbox.last_selected = e;
          }
          e.parentsUntil(".jstree", "li").each(function() {
            var e = a(this);
            if (b) {
              if (e.children("ul").children("li.jstree-checked, li.jstree-undetermined").length) {
                return e.parentsUntil(".jstree", "li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined"), f && e.parentsUntil(".jstree", "li").andSelf().children(":checkbox").prop("checked", !1), !1;
              }
              e.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
              f && e.children(":checkbox").prop("checked", !1);
            } else {
              if (e.children("ul").children("li.jstree-unchecked, li.jstree-undetermined").length) {
                return e.parentsUntil(".jstree", "li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined"), f && e.parentsUntil(".jstree", "li").andSelf().children(":checkbox").prop("checked", !1), !1;
              }
              e.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
              f && e.children(":checkbox").prop("checked", !0);
            }
          });
        }
        this.data.ui && this.data.checkbox.noui && (this.data.ui.selected = this.get_checked());
        this.__callback(e);
        return !0;
      }, check_node:function(a) {
        if (this.change_state(a, !1)) {
          a = this._get_node(a);
          if (this._get_settings().checkbox.checked_parent_open) {
            var b = this;
            a.parents(".jstree-closed").each(function() {
              b.open_node(this, !1, !0);
            });
          }
          this.__callback({obj:a});
        }
      }, uncheck_node:function(a) {
        this.change_state(a, !0) && this.__callback({obj:this._get_node(a)});
      }, check_all:function() {
        var a = this;
        (this._get_settings().checkbox.two_state ? this.get_container_ul().find("li") : this.get_container_ul().children("li")).each(function() {
          a.change_state(this, !1);
        });
        this.__callback();
      }, uncheck_all:function() {
        var a = this;
        (this._get_settings().checkbox.two_state ? this.get_container_ul().find("li") : this.get_container_ul().children("li")).each(function() {
          a.change_state(this, !0);
        });
        this.__callback();
      }, is_checked:function(a) {
        a = this._get_node(a);
        return a.length ? a.is(".jstree-checked") : !1;
      }, get_checked:function(a, b) {
        a = a && -1 !== a ? this._get_node(a) : this.get_container();
        return b || this._get_settings().checkbox.two_state ? a.find(".jstree-checked") : a.find("> ul > .jstree-checked, .jstree-undetermined > ul > .jstree-checked");
      }, get_unchecked:function(a, b) {
        a = a && -1 !== a ? this._get_node(a) : this.get_container();
        return b || this._get_settings().checkbox.two_state ? a.find(".jstree-unchecked") : a.find("> ul > .jstree-unchecked, .jstree-undetermined > ul > .jstree-unchecked");
      }, show_checkboxes:function() {
        this.get_container().children("ul").removeClass("jstree-no-checkboxes");
      }, hide_checkboxes:function() {
        this.get_container().children("ul").addClass("jstree-no-checkboxes");
      }, _repair_state:function(a) {
        a = this._get_node(a);
        if (a.length) {
          if (this._get_settings().checkbox.two_state) {
            a.find("li").andSelf().not(".jstree-checked").removeClass("jstree-undetermined").addClass("jstree-unchecked").children(":checkbox").prop("checked", !0);
          } else {
            var b = this._get_settings().checkbox.real_checkboxes, c = a.find("> ul > .jstree-checked").length, d = a.find("> ul > .jstree-undetermined").length, f = a.find("> ul > li").length;
            0 === f ? a.hasClass("jstree-undetermined") && this.change_state(a, !1) : 0 === c && 0 === d ? this.change_state(a, !0) : c === f ? this.change_state(a, !1) : (a.parentsUntil(".jstree", "li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined"), b && a.parentsUntil(".jstree", "li").andSelf().children(":checkbox").prop("checked", !1));
          }
        }
      }, reselect:function() {
        if (this.data.ui && this.data.checkbox.noui) {
          var d = this, b = this.data.ui.to_select, b = a.map(a.makeArray(b), function(a) {
            return "#" + a.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
          });
          this.deselect_all();
          a.each(b, function(a, b) {
            d.check_node(b);
          });
          this.__callback();
        } else {
          this.__call_old();
        }
      }, save_loaded:function() {
        var a = this;
        this.data.core.to_load = [];
        this.get_container_ul().find("li.jstree-closed.jstree-undetermined").each(function() {
          this.id && a.data.core.to_load.push("#" + this.id);
        });
      }}});
      a(function() {
        a.vakata.css.add_sheet({str:".jstree .jstree-real-checkbox { display:none; } ", title:"jstree"});
      });
    })(jQuery);
    (function(a) {
      a.vakata.xslt = function(b, d, e) {
        var f = "", m;
        if (document.recalc) {
          return m = document.createElement("xml"), f = document.createElement("xml"), m.innerHTML = b, f.innerHTML = d, a("body").append(m).append(f), setTimeout(function(b, d, e) {
            return function() {
              e.call(null, b.transformNode(d.XMLDocument));
              setTimeout(function(b, d) {
                return function() {
                  a(b).remove();
                  a(d).remove();
                };
              }(b, d), 200);
            };
          }(m, f, e), 100), !0;
        }
        "undefined" !== typeof window.DOMParser && "undefined" !== typeof window.XMLHttpRequest && "undefined" === typeof window.XSLTProcessor && (b = (new DOMParser).parseFromString(b, "text/xml"), d = (new DOMParser).parseFromString(d, "text/xml"));
        if ("undefined" !== typeof window.DOMParser && "undefined" !== typeof window.XMLHttpRequest && "undefined" !== typeof window.XSLTProcessor) {
          m = new XSLTProcessor;
          f = a.isFunction(m.transformDocument) ? "undefined" !== typeof window.XMLSerializer : !0;
          if (!f) {
            return !1;
          }
          b = (new DOMParser).parseFromString(b, "text/xml");
          d = (new DOMParser).parseFromString(d, "text/xml");
          a.isFunction(m.transformDocument) ? (f = document.implementation.createDocument("", "", null), m.transformDocument(b, d, f, null), e.call(null, (new XMLSerializer).serializeToString(f))) : (m.importStylesheet(d), f = m.transformToFragment(b, document), e.call(null, a("<div />").append(f).html()));
          return !0;
        }
        return !1;
      };
      var d = {nest:'<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ><xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/html" /><xsl:template match="/">\t<xsl:call-template name="nodes">\t\t<xsl:with-param name="node" select="/root" />\t</xsl:call-template></xsl:template><xsl:template name="nodes">\t<xsl:param name="node" />\t<ul>\t<xsl:for-each select="$node/item">\t\t<xsl:variable name="children" select="count(./item) &gt; 0" />\t\t<li>\t\t\t<xsl:attribute name="class">\t\t\t\t<xsl:if test="position() = last()">jstree-last </xsl:if>\t\t\t\t<xsl:choose>\t\t\t\t\t<xsl:when test="@state = \'open\'">jstree-open </xsl:when>\t\t\t\t\t<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>\t\t\t\t\t<xsl:otherwise>jstree-leaf </xsl:otherwise>\t\t\t\t</xsl:choose>\t\t\t\t<xsl:value-of select="@class" />\t\t\t</xsl:attribute>\t\t\t<xsl:for-each select="@*">\t\t\t\t<xsl:if test="name() != \'class\' and name() != \'state\' and name() != \'hasChildren\'">\t\t\t\t\t<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>\t\t\t\t</xsl:if>\t\t\t</xsl:for-each>\t<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>\t\t\t<xsl:for-each select="content/name">\t\t\t\t<a>\t\t\t\t<xsl:attribute name="href">\t\t\t\t\t<xsl:choose>\t\t\t\t\t<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>\t\t\t\t\t<xsl:otherwise>#</xsl:otherwise>\t\t\t\t\t</xsl:choose>\t\t\t\t</xsl:attribute>\t\t\t\t<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>\t\t\t\t<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>\t\t\t\t<xsl:for-each select="@*">\t\t\t\t\t<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">\t\t\t\t\t\t<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>\t\t\t\t\t</xsl:if>\t\t\t\t</xsl:for-each>\t\t\t\t\t<ins>\t\t\t\t\t\t<xsl:attribute name="class">jstree-icon \t\t\t\t\t\t\t<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>\t\t\t\t\t\t</xsl:attribute>\t\t\t\t\t\t<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>\t\t\t\t\t\t<xsl:text>&#xa0;</xsl:text>\t\t\t\t\t</ins>\t\t\t\t\t<xsl:copy-of select="./child::node()" />\t\t\t\t</a>\t\t\t</xsl:for-each>\t\t\t<xsl:if test="$children or @hasChildren"><xsl:call-template name="nodes"><xsl:with-param name="node" select="current()" /></xsl:call-template></xsl:if>\t\t</li>\t</xsl:for-each>\t</ul></xsl:template></xsl:stylesheet>', 
      flat:'<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ><xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/xml" /><xsl:template match="/">\t<ul>\t<xsl:for-each select="//item[not(@parent_id) or @parent_id=0 or not(@parent_id = //item/@id)]">\t\t<xsl:call-template name="nodes">\t\t\t<xsl:with-param name="node" select="." />\t\t\t<xsl:with-param name="is_last" select="number(position() = last())" />\t\t</xsl:call-template>\t</xsl:for-each>\t</ul></xsl:template><xsl:template name="nodes">\t<xsl:param name="node" />\t<xsl:param name="is_last" />\t<xsl:variable name="children" select="count(//item[@parent_id=$node/attribute::id]) &gt; 0" />\t<li>\t<xsl:attribute name="class">\t\t<xsl:if test="$is_last = true()">jstree-last </xsl:if>\t\t<xsl:choose>\t\t\t<xsl:when test="@state = \'open\'">jstree-open </xsl:when>\t\t\t<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>\t\t\t<xsl:otherwise>jstree-leaf </xsl:otherwise>\t\t</xsl:choose>\t\t<xsl:value-of select="@class" />\t</xsl:attribute>\t<xsl:for-each select="@*">\t\t<xsl:if test="name() != \'parent_id\' and name() != \'hasChildren\' and name() != \'class\' and name() != \'state\'">\t\t<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>\t\t</xsl:if>\t</xsl:for-each>\t<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>\t<xsl:for-each select="content/name">\t\t<a>\t\t<xsl:attribute name="href">\t\t\t<xsl:choose>\t\t\t<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>\t\t\t<xsl:otherwise>#</xsl:otherwise>\t\t\t</xsl:choose>\t\t</xsl:attribute>\t\t<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>\t\t<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>\t\t<xsl:for-each select="@*">\t\t\t<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">\t\t\t\t<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>\t\t\t</xsl:if>\t\t</xsl:for-each>\t\t\t<ins>\t\t\t\t<xsl:attribute name="class">jstree-icon \t\t\t\t\t<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>\t\t\t\t</xsl:attribute>\t\t\t\t<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>\t\t\t\t<xsl:text>&#xa0;</xsl:text>\t\t\t</ins>\t\t\t<xsl:copy-of select="./child::node()" />\t\t</a>\t</xsl:for-each>\t<xsl:if test="$children">\t\t<ul>\t\t<xsl:for-each select="//item[@parent_id=$node/attribute::id]">\t\t\t<xsl:call-template name="nodes">\t\t\t\t<xsl:with-param name="node" select="." />\t\t\t\t<xsl:with-param name="is_last" select="number(position() = last())" />\t\t\t</xsl:call-template>\t\t</xsl:for-each>\t\t</ul>\t</xsl:if>\t</li></xsl:template></xsl:stylesheet>'}, 
      b = function(a) {
        return a.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      };
      a.jstree.plugin("xml_data", {defaults:{data:!1, ajax:!1, xsl:"flat", clean_node:!1, correct_state:!0, get_skip_empty:!1, get_include_preamble:!0}, _fn:{load_node:function(a, b, c) {
        var d = this;
        this.load_node_xml(a, function() {
          d.__callback({obj:d._get_node(a)});
          b.call(this);
        }, c);
      }, _is_loaded:function(b) {
        var d = this._get_settings().xml_data;
        b = this._get_node(b);
        return -1 == b || !b || !d.ajax && !a.isFunction(d.data) || b.is(".jstree-open, .jstree-leaf") || 0 < b.children("ul").children("li").size();
      }, load_node_xml:function(b, d, e) {
        var f = this.get_settings().xml_data, m = function() {
        }, n = function() {
        };
        if ((b = this._get_node(b)) && -1 !== b) {
          if (b.data("jstree_is_loading")) {
            return;
          }
          b.data("jstree_is_loading", !0);
        }
        switch(!0) {
          case !f.data && !f.ajax:
            throw "Neither data nor ajax settings supplied.";;
          case a.isFunction(f.data):
            f.data.call(this, b, a.proxy(function(e) {
              this.parse_xml(e, a.proxy(function(e) {
                e && (e = e.replace(/ ?xmlns="[^"]*"/ig, ""), 10 < e.length ? (e = a(e), -1 !== b && b ? (b.children("a.jstree-loading").removeClass("jstree-loading"), b.append(e), b.removeData("jstree_is_loading")) : this.get_container().children("ul").empty().append(e.children()), f.clean_node && this.clean_node(b), d && d.call(this)) : b && -1 !== b ? (b.children("a.jstree-loading").removeClass("jstree-loading"), b.removeData("jstree_is_loading"), f.correct_state && (this.correct_state(b), d && 
                d.call(this))) : f.correct_state && (this.get_container().children("ul").empty(), d && d.call(this)));
              }, this));
            }, this));
            break;
          case !!f.data && !f.ajax || !!f.data && !!f.ajax && (!b || -1 === b):
            b && -1 != b || this.parse_xml(f.data, a.proxy(function(e) {
              e ? (e = e.replace(/ ?xmlns="[^"]*"/ig, ""), 10 < e.length && (e = a(e), this.get_container().children("ul").empty().append(e.children()), f.clean_node && this.clean_node(b), d && d.call(this))) : f.correct_state && (this.get_container().children("ul").empty(), d && d.call(this));
            }, this));
            break;
          case !f.data && !!f.ajax || !!f.data && !!f.ajax && b && -1 !== b:
            m = function(a, c, d) {
              var h = this.get_settings().xml_data.ajax.error;
              h && h.call(this, a, c, d);
              -1 !== b && b.length ? (b.children("a.jstree-loading").removeClass("jstree-loading"), b.removeData("jstree_is_loading"), "success" === c && f.correct_state && this.correct_state(b)) : "success" === c && f.correct_state && this.get_container().children("ul").empty();
              e && e.call(this);
            }, n = function(e, g, n) {
              e = n.responseText;
              var t = this.get_settings().xml_data.ajax.success;
              t && (e = t.call(this, e, g, n) || e);
              if ("" === e || e && e.toString && "" === e.toString().replace(/^[\s\n]+$/, "")) {
                return m.call(this, n, g, "");
              }
              this.parse_xml(e, a.proxy(function(e) {
                e && (e = e.replace(/ ?xmlns="[^"]*"/ig, ""), 10 < e.length ? (e = a(e), -1 !== b && b ? (b.children("a.jstree-loading").removeClass("jstree-loading"), b.append(e), b.removeData("jstree_is_loading")) : this.get_container().children("ul").empty().append(e.children()), f.clean_node && this.clean_node(b), d && d.call(this)) : b && -1 !== b ? (b.children("a.jstree-loading").removeClass("jstree-loading"), b.removeData("jstree_is_loading"), f.correct_state && (this.correct_state(b), d && 
                d.call(this))) : f.correct_state && (this.get_container().children("ul").empty(), d && d.call(this)));
              }, this));
            }, f.ajax.context = this, f.ajax.error = m, f.ajax.success = n, f.ajax.dataType || (f.ajax.dataType = "xml"), a.isFunction(f.ajax.url) && (f.ajax.url = f.ajax.url.call(this, b)), a.isFunction(f.ajax.data) && (f.ajax.data = f.ajax.data.call(this, b)), a.ajax(f.ajax);
        }
      }, parse_xml:function(b, f) {
        var g = this._get_settings().xml_data;
        a.vakata.xslt(b, d[g.xsl], f);
      }, get_xml:function(d, e, f, l, m) {
        var n = "", r = this._get_settings(), q = this, p, t, v, u, w;
        d || (d = "flat");
        m || (m = 0);
        (e = this._get_node(e)) && -1 !== e || (e = this.get_container().find("> ul > li"));
        f = a.isArray(f) ? f : ["id", "class"];
        !m && this.data.types && -1 === a.inArray(r.types.type_attr, f) && f.push(r.types.type_attr);
        l = a.isArray(l) ? l : [];
        m || (r.xml_data.get_include_preamble && (n += '<?xml version="1.0" encoding="UTF-8"?>'), n += "<root>");
        e.each(function() {
          n += "<item";
          v = a(this);
          a.each(f, function(a, c) {
            var d = v.attr(c);
            r.xml_data.get_skip_empty && "undefined" === typeof d || (n += " " + c + '="' + b((" " + (d || "")).replace(/ jstree[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")) + '"');
          });
          v.hasClass("jstree-open") && (n += ' state="open"');
          v.hasClass("jstree-closed") && (n += ' state="closed"');
          "flat" === d && (n += ' parent_id="' + b(m) + '"');
          n += ">";
          n += "<content>";
          u = v.children("a");
          u.each(function() {
            p = a(this);
            w = !1;
            n += "<name";
            -1 !== a.inArray("languages", r.plugins) && a.each(r.languages, function(a, c) {
              if (p.hasClass(c)) {
                return n += ' lang="' + b(c) + '"', w = c, !1;
              }
            });
            l.length && a.each(l, function(a, c) {
              var d = p.attr(c);
              r.xml_data.get_skip_empty && "undefined" === typeof d || (n += " " + c + '="' + b((" " + d || "").replace(/ jstree[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")) + '"');
            });
            p.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, "").replace(/^\s+$/ig, "").length && (n += ' icon="' + b(p.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")) + '"');
            p.children("ins").get(0).style.backgroundImage.length && (n += ' icon="' + b(p.children("ins").get(0).style.backgroundImage.replace("url(", "").replace(")", "").replace(/'/ig, "").replace(/"/ig, "")) + '"');
            n += ">";
            n += "<![CDATA[" + q.get_text(p, w) + "]]\x3e";
            n += "</name>";
          });
          n += "</content>";
          t = v[0].id || !0;
          v = v.find("> ul > li");
          t = v.length ? q.get_xml(d, v, f, l, t) : "";
          "nest" == d && (n += t);
          n += "</item>";
          "flat" == d && (n += t);
        });
        m || (n += "</root>");
        return n;
      }}});
    })(jQuery);
    (function(a) {
      a.expr[":"].jstree_contains = function(a, b, c) {
        return 0 <= (a.textContent || a.innerText || "").toLowerCase().indexOf(c[3].toLowerCase());
      };
      a.expr[":"].jstree_title_contains = function(a, b, c) {
        return 0 <= (a.getAttribute("title") || "").toLowerCase().indexOf(c[3].toLowerCase());
      };
      a.jstree.plugin("search", {__init:function() {
        this.data.search.str = "";
        this.data.search.result = a();
        this._get_settings().search.show_only_matches && this.get_container().bind("search.jstree", function(d, b) {
          a(this).children("ul").find("li").hide().removeClass("jstree-last");
          b.rslt.nodes.parentsUntil(".jstree").andSelf().show().filter("ul").each(function() {
            a(this).children("li:visible").eq(-1).addClass("jstree-last");
          });
        }).bind("clear_search.jstree", function() {
          a(this).children("ul").find("li").css("display", "").end().end().jstree("clean_node", -1);
        });
      }, defaults:{ajax:!1, search_method:"jstree_contains", show_only_matches:!1}, _fn:{search:function(d, b) {
        if ("" === a.trim(d)) {
          this.clear_search();
        } else {
          var f = this.get_settings().search, h = this, g = function() {
          };
          this.data.search.str = d;
          if (!b && !1 !== f.ajax && 0 < this.get_container_ul().find("li.jstree-closed:not(:has(ul)):eq(0)").length) {
            this.search.supress_callback = !0;
            g = function(a, b, c) {
              var d = this.get_settings().search.ajax.success;
              d && (a = d.call(this, a, b, c) || a);
              this.data.search.to_open = a;
              this._search_open();
            };
            f.ajax.context = this;
            f.ajax.error = function() {
            };
            f.ajax.success = g;
            a.isFunction(f.ajax.url) && (f.ajax.url = f.ajax.url.call(this, d));
            a.isFunction(f.ajax.data) && (f.ajax.data = f.ajax.data.call(this, d));
            f.ajax.data || (f.ajax.data = {search_string:d});
            if (!f.ajax.dataType || /^json/.exec(f.ajax.dataType)) {
              f.ajax.dataType = "json";
            }
            a.ajax(f.ajax);
          } else {
            this.data.search.result.length && this.clear_search(), this.data.search.result = this.get_container().find("a" + (this.data.languages ? "." + this.get_lang() : "") + ":" + f.search_method + "(" + this.data.search.str + ")"), this.data.search.result.addClass("jstree-search").parent().parents(".jstree-closed").each(function() {
              h.open_node(this, !1, !0);
            }), this.__callback({nodes:this.data.search.result, str:d});
          }
        }
      }, clear_search:function(d) {
        this.data.search.result.removeClass("jstree-search");
        this.__callback(this.data.search.result);
        this.data.search.result = a();
      }, _search_open:function(d) {
        var b = this;
        d = !0;
        var f = [], h = [];
        this.data.search.to_open.length && (a.each(this.data.search.to_open, function(b, d) {
          if ("#" == d) {
            return !0;
          }
          a(d).length && a(d).is(".jstree-closed") ? f.push(d) : h.push(d);
        }), f.length && (this.data.search.to_open = h, a.each(f, function(a, c) {
          b.open_node(c, function() {
            b._search_open(!0);
          });
        }), d = !1));
        d && this.search(this.data.search.str, !0);
      }}});
    })(jQuery);
    (function(a) {
      a.vakata.context = {hide_on_mouseleave:!1, cnt:a("<div id='vakata-contextmenu' />"), vis:!1, tgt:!1, par:!1, func:!1, data:!1, rtl:!1, show:function(d, b, f, h, g, l, m) {
        a.vakata.context.rtl = !!m;
        if (d = a.vakata.context.parse(d)) {
          a.vakata.context.vis = !0;
          a.vakata.context.tgt = b;
          a.vakata.context.par = l || b || null;
          a.vakata.context.data = g || null;
          a.vakata.context.cnt.html(d).css({visibility:"hidden", display:"block", left:0, top:0});
          if (a.vakata.context.hide_on_mouseleave) {
            a.vakata.context.cnt.one("mouseleave", function(b) {
              a.vakata.context.hide();
            });
          }
          g = a.vakata.context.cnt.height();
          l = a.vakata.context.cnt.width();
          f + l > a(document).width() && (f = a(document).width() - (l + 5), a.vakata.context.cnt.find("li > ul").addClass("right"));
          h + g > a(document).height() && (h -= g + b[0].offsetHeight, a.vakata.context.cnt.find("li > ul").addClass("bottom"));
          a.vakata.context.cnt.css({left:f, top:h}).find("li:has(ul)").bind("mouseenter", function(b) {
            b = a(document).width();
            var d = a(document).height(), e = a(this).children("ul").show();
            b !== a(document).width() && e.toggleClass("right");
            d !== a(document).height() && e.toggleClass("bottom");
          }).bind("mouseleave", function(b) {
            a(this).children("ul").hide();
          }).end().css({visibility:"visible"}).show();
          a(document).triggerHandler("context_show.vakata");
        }
      }, hide:function() {
        a.vakata.context.vis = !1;
        a.vakata.context.cnt.attr("class", "").css({visibility:"hidden"});
        a(document).triggerHandler("context_hide.vakata");
      }, parse:function(d, b) {
        if (!d) {
          return !1;
        }
        var f = "", h = !1, g = !0;
        b || (a.vakata.context.func = {});
        f += "<ul>";
        a.each(d, function(b, d) {
          if (!d) {
            return !0;
          }
          a.vakata.context.func[b] = d.action;
          !g && d.separator_before && (f += "<li class='vakata-separator vakata-separator-before'></li>");
          g = !1;
          f += "<li class='" + (d._class || "") + (d._disabled ? " jstree-contextmenu-disabled " : "") + "'><ins ";
          d.icon && -1 === d.icon.indexOf("/") && (f += " class='" + d.icon + "' ");
          d.icon && -1 !== d.icon.indexOf("/") && (f += " style='background:url(" + d.icon + ") center center no-repeat;' ");
          f += ">&#160;</ins><a href='#' rel='" + b + "'>";
          d.submenu && (f += "<span style='float:" + (a.vakata.context.rtl ? "left" : "right") + ";'>&raquo;</span>");
          f += d.label + "</a>";
          d.submenu && (h = a.vakata.context.parse(d.submenu, !0)) && (f += h);
          f += "</li>";
          d.separator_after && (f += "<li class='vakata-separator vakata-separator-after'></li>", g = !0);
        });
        f = f.replace(/<li class\='vakata-separator vakata-separator-after'\><\/li\>$/, "");
        f += "</ul>";
        a(document).triggerHandler("context_parse.vakata");
        return 10 < f.length ? f : !1;
      }, exec:function(d) {
        return a.isFunction(a.vakata.context.func[d]) ? (a.vakata.context.func[d].call(a.vakata.context.data, a.vakata.context.par), !0) : !1;
      }};
      a(function() {
        a.vakata.css.add_sheet({str:"#vakata-contextmenu { display:block; visibility:hidden; left:0; top:-200px; position:absolute; margin:0; padding:0; min-width:180px; background:#ebebeb; border:1px solid silver; z-index:10000; *width:180px; } #vakata-contextmenu ul { min-width:180px; *width:180px; } #vakata-contextmenu ul, #vakata-contextmenu li { margin:0; padding:0; list-style-type:none; display:block; } #vakata-contextmenu li { line-height:20px; min-height:20px; position:relative; padding:0px; } #vakata-contextmenu li a { padding:1px 6px; line-height:17px; display:block; text-decoration:none; margin:1px 1px 0 1px; } #vakata-contextmenu li ins { float:left; width:16px; height:16px; text-decoration:none; margin-right:2px; } #vakata-contextmenu li a:hover, #vakata-contextmenu li.vakata-hover > a { background:gray; color:white; } #vakata-contextmenu li ul { display:none; position:absolute; top:-2px; left:100%; background:#ebebeb; border:1px solid gray; } #vakata-contextmenu .right { right:100%; left:auto; } #vakata-contextmenu .bottom { bottom:-1px; top:auto; } #vakata-contextmenu li.vakata-separator { min-height:0; height:1px; line-height:1px; font-size:1px; overflow:hidden; margin:0 2px; background:silver; /* border-top:1px solid #fefefe; */ padding:0; } ", 
        title:"vakata"});
        a.vakata.context.cnt.delegate("a", "click", function(a) {
          a.preventDefault();
        }).delegate("a", "mouseup", function(d) {
          !a(this).parent().hasClass("jstree-contextmenu-disabled") && a.vakata.context.exec(a(this).attr("rel")) ? a.vakata.context.hide() : a(this).blur();
        }).delegate("a", "mouseover", function() {
          a.vakata.context.cnt.find(".vakata-hover").removeClass("vakata-hover");
        }).appendTo("body");
        a(document).bind("mousedown", function(d) {
          a.vakata.context.vis && !a.contains(a.vakata.context.cnt[0], d.target) && a.vakata.context.hide();
        });
        "undefined" !== typeof a.hotkeys && a(document).bind("keydown", "up", function(d) {
          if (a.vakata.context.vis) {
            var b = a.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").prevAll("li:not(.vakata-separator)").first();
            b.length || (b = a.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").last());
            b.addClass("vakata-hover");
            d.stopImmediatePropagation();
            d.preventDefault();
          }
        }).bind("keydown", "down", function(d) {
          if (a.vakata.context.vis) {
            var b = a.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").nextAll("li:not(.vakata-separator)").first();
            b.length || (b = a.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").first());
            b.addClass("vakata-hover");
            d.stopImmediatePropagation();
            d.preventDefault();
          }
        }).bind("keydown", "right", function(d) {
          a.vakata.context.vis && (a.vakata.context.cnt.find(".vakata-hover").children("ul").show().children("li:not(.vakata-separator)").removeClass("vakata-hover").first().addClass("vakata-hover"), d.stopImmediatePropagation(), d.preventDefault());
        }).bind("keydown", "left", function(d) {
          a.vakata.context.vis && (a.vakata.context.cnt.find(".vakata-hover").children("ul").hide().children(".vakata-separator").removeClass("vakata-hover"), d.stopImmediatePropagation(), d.preventDefault());
        }).bind("keydown", "esc", function(d) {
          a.vakata.context.hide();
          d.preventDefault();
        }).bind("keydown", "space", function(d) {
          a.vakata.context.cnt.find(".vakata-hover").last().children("a").click();
          d.preventDefault();
        });
      });
      a.jstree.plugin("contextmenu", {__init:function() {
        this.get_container().delegate("a", "contextmenu.jstree", a.proxy(function(d) {
          d.preventDefault();
          a(d.currentTarget).hasClass("jstree-loading") || this.show_contextmenu(d.currentTarget, d.pageX, d.pageY);
        }, this)).delegate("a", "click.jstree", a.proxy(function(d) {
          this.data.contextmenu && a.vakata.context.hide();
        }, this)).bind("destroy.jstree", a.proxy(function() {
          this.data.contextmenu && a.vakata.context.hide();
        }, this));
        a(document).bind("context_hide.vakata", a.proxy(function() {
          this.data.contextmenu = !1;
        }, this));
      }, defaults:{select_node:!1, show_at_node:!0, items:{create:{separator_before:!1, separator_after:!0, label:"Create", action:function(a) {
        this.create(a);
      }}, rename:{separator_before:!1, separator_after:!1, label:"Rename", action:function(a) {
        this.rename(a);
      }}, remove:{separator_before:!1, icon:!1, separator_after:!1, label:"Delete", action:function(a) {
        this.is_selected(a) ? this.remove() : this.remove(a);
      }}, ccp:{separator_before:!0, icon:!1, separator_after:!1, label:"Edit", action:!1, submenu:{cut:{separator_before:!1, separator_after:!1, label:"Cut", action:function(a) {
        this.cut(a);
      }}, copy:{separator_before:!1, icon:!1, separator_after:!1, label:"Copy", action:function(a) {
        this.copy(a);
      }}, paste:{separator_before:!1, icon:!1, separator_after:!1, label:"Paste", action:function(a) {
        this.paste(a);
      }}}}}}, _fn:{show_contextmenu:function(d, b, f) {
        d = this._get_node(d);
        var h = this.get_settings().contextmenu, g = d.children("a:visible:eq(0)"), l = !1, l = !1;
        h.select_node && this.data.ui && !this.is_selected(d) && (this.deselect_all(), this.select_node(d, !0));
        if (h.show_at_node || "undefined" === typeof b || "undefined" === typeof f) {
          l = g.offset(), b = l.left, f = l.top + this.data.core.li_height;
        }
        l = d.data("jstree") && d.data("jstree").contextmenu ? d.data("jstree").contextmenu : h.items;
        a.isFunction(l) && (l = l.call(this, d));
        this.data.contextmenu = !0;
        a.vakata.context.show(l, g, b, f, this, d, this._get_settings().core.rtl);
        this.data.themes && a.vakata.context.cnt.attr("class", "jstree-" + this.data.themes.theme + "-context");
      }}});
    })(jQuery);
    (function(c) {
      c.jstree.plugin("types", {__init:function() {
        var d = this._get_settings().types;
        this.data.types.attach_to = [];
        this.get_container().bind("init.jstree", c.proxy(function() {
          var a = d.type_attr, f = "", h = this;
          c.each(d.types, function(d, e) {
            c.each(e, function(a, b) {
              /^(max_depth|max_children|icon|valid_children)$/.test(a) || h.data.types.attach_to.push(a);
            });
            if (!e.icon) {
              return !0;
            }
            if (e.icon.image || e.icon.position) {
              f = "default" == d ? f + (".jstree-" + h.get_index() + " a > .jstree-icon { ") : f + (".jstree-" + h.get_index() + " li[" + a + '="' + d + '"] > a > .jstree-icon { '), e.icon.image && (f += " background-image:url(" + e.icon.image + "); "), f = e.icon.position ? f + (" background-position:" + e.icon.position + "; ") : f + " background-position:0 0; ", f += "} ";
            }
          });
          "" !== f && c.vakata.css.add_sheet({str:f, title:"jstree-types"});
        }, this)).bind("before.jstree", c.proxy(function(a, d) {
          var e, f;
          if ((e = (e = this._get_settings().types.use_data ? this._get_node(d.args[0]) : !1) && -1 !== e && e.length ? e.data("jstree") : !1) && e.types && !1 === e.types[d.func] || -1 !== c.inArray(d.func, this.data.types.attach_to) && d.args[0] && (d.args[0].tagName || d.args[0].jquery) && (e = this._get_settings().types.types, f = this._get_type(d.args[0]), (e[f] && "undefined" !== typeof e[f][d.func] || e["default"] && "undefined" !== typeof e["default"][d.func]) && !1 === this._check(d.func, 
          d.args[0]))) {
            return a.stopImmediatePropagation(), !1;
          }
        }, this));
        a && this.get_container().bind("load_node.jstree set_type.jstree", c.proxy(function(a, d) {
          var e = d && d.rslt && d.rslt.obj && -1 !== d.rslt.obj ? this._get_node(d.rslt.obj).parent() : this.get_container_ul(), f = !1, l = this._get_settings().types;
          c.each(l.types, function(a, b) {
            b.icon && (b.icon.image || b.icon.position) && (f = "default" === a ? e.find("li > a > .jstree-icon") : e.find("li[" + l.type_attr + "='" + a + "'] > a > .jstree-icon"), b.icon.image && f.css("backgroundImage", "url(" + b.icon.image + ")"), f.css("backgroundPosition", b.icon.position || "0 0"));
          });
        }, this));
      }, defaults:{max_children:-1, max_depth:-1, valid_children:"all", use_data:!1, type_attr:"rel", types:{"default":{max_children:-1, max_depth:-1, valid_children:"all"}}}, _fn:{_types_notify:function(a, b) {
        b.type && this._get_settings().types.use_data && this.set_type(b.type, a);
      }, _get_type:function(a) {
        return (a = this._get_node(a)) && a.length ? a.attr(this._get_settings().types.type_attr) || "default" : !1;
      }, set_type:function(a, b) {
        b = this._get_node(b);
        var c = b.length && a ? b.attr(this._get_settings().types.type_attr, a) : !1;
        c && this.__callback({obj:b, type:a});
        return c;
      }, _check:function(a, b, d) {
        b = this._get_node(b);
        var f = !1, g = this._get_type(b), l = 0, m = this, n = this._get_settings().types, r = !1;
        if (-1 === b) {
          if (n[a]) {
            f = n[a];
          } else {
            return;
          }
        } else {
          if (!1 === g) {
            return;
          }
          (r = n.use_data ? b.data("jstree") : !1) && r.types && "undefined" !== typeof r.types[a] ? f = r.types[a] : n.types[g] && "undefined" !== typeof n.types[g][a] ? f = n.types[g][a] : n.types["default"] && "undefined" !== typeof n.types["default"][a] && (f = n.types["default"][a]);
        }
        c.isFunction(f) && (f = f.call(this, b));
        "max_depth" === a && -1 !== b && !1 !== d && -2 !== n.max_depth && 0 !== f && b.children("a:eq(0)").parentsUntil(".jstree", "li").each(function(b) {
          if (-1 !== n.max_depth && 0 >= n.max_depth - (b + 1)) {
            return f = 0, !1;
          }
          l = 0 === b ? f : m._check(a, this, !1);
          if (-1 !== l && 0 >= l - (b + 1)) {
            return f = 0, !1;
          }
          0 <= l && (l - (b + 1) < f || 0 > f) && (f = l - (b + 1));
          0 <= n.max_depth && (n.max_depth - (b + 1) < f || 0 > f) && (f = n.max_depth - (b + 1));
        });
        return f;
      }, check_move:function() {
        if (!this.__call_old()) {
          return !1;
        }
        var a = this._get_move(), b = a.rt._get_settings().types, d = a.rt._check("max_children", a.cr), f = a.rt._check("max_depth", a.cr), g = a.rt._check("valid_children", a.cr), l = 0, m = 1;
        if ("none" === g || c.isArray(g) && a.ot && a.ot._get_type && (a.o.each(function() {
          if (-1 === c.inArray(a.ot._get_type(this), g)) {
            return m = !1;
          }
        }), !1 === m) || -2 !== b.max_children && -1 !== d && (l = -1 === a.cr ? this.get_container().find("> ul > li").not(a.o).length : a.cr.find("> ul > li").not(a.o).length, l + a.o.length > d)) {
          return !1;
        }
        if (-2 !== b.max_depth && -1 !== f) {
          m = 0;
          if (0 === f) {
            return !1;
          }
          if ("undefined" === typeof a.o.d) {
            for (b = a.o;0 < b.length;) {
              b = b.find("> ul > li"), m++;
            }
            a.o.d = m;
          }
          if (0 > f - a.o.d) {
            return !1;
          }
        }
        return !0;
      }, create_node:function(a, b, d, f, g, l) {
        if (!l && (g || this._is_loaded(a))) {
          var m = "string" == typeof b && b.match(/^before|after$/i) && -1 !== a ? this._get_parent(a) : this._get_node(a), n = this._get_settings().types, r = this._check("max_children", m), q = this._check("max_depth", m), p = this._check("valid_children", m);
          "string" === typeof d && (d = {data:d});
          d || (d = {});
          if ("none" === p) {
            return !1;
          }
          if (c.isArray(p)) {
            if (!d.attr || !d.attr[n.type_attr]) {
              d.attr || (d.attr = {}), d.attr[n.type_attr] = p[0];
            } else {
              if (-1 === c.inArray(d.attr[n.type_attr], p)) {
                return !1;
              }
            }
          }
          if (-2 !== n.max_children && -1 !== r && (m = -1 === m ? this.get_container().find("> ul > li").length : m.find("> ul > li").length, m + 1 > r) || -2 !== n.max_depth && -1 !== q && 0 > q - 1) {
            return !1;
          }
        }
        return this.__call_old(!0, a, b, d, f, g, l);
      }}});
    })(jQuery);
    (function(a) {
      a.jstree.plugin("html_data", {__init:function() {
        this.data.html_data.original_container_html = this.get_container().find(" > ul > li").clone(!0);
        this.data.html_data.original_container_html.find("li").andSelf().contents().filter(function() {
          return 3 == this.nodeType;
        }).remove();
      }, defaults:{data:!1, ajax:!1, correct_state:!0}, _fn:{load_node:function(a, b, c) {
        var d = this;
        this.load_node_html(a, function() {
          d.__callback({obj:d._get_node(a)});
          b.call(this);
        }, c);
      }, _is_loaded:function(d) {
        d = this._get_node(d);
        return -1 == d || !d || !this._get_settings().html_data.ajax && !a.isFunction(this._get_settings().html_data.data) || d.is(".jstree-open, .jstree-leaf") || 0 < d.children("ul").children("li").size();
      }, load_node_html:function(d, b, f) {
        var h, g = this.get_settings().html_data, l = function() {
        };
        h = function() {
        };
        if ((d = this._get_node(d)) && -1 !== d) {
          if (d.data("jstree_is_loading")) {
            return;
          }
          d.data("jstree_is_loading", !0);
        }
        switch(!0) {
          case a.isFunction(g.data):
            g.data.call(this, d, a.proxy(function(f) {
              f && "" !== f && f.toString && "" !== f.toString().replace(/^[\s\n]+$/, "") ? (f = a(f), f.is("ul") || (f = a("<ul />").append(f)), -1 != d && d ? (d.children("a.jstree-loading").removeClass("jstree-loading"), d.append(f).children("ul").find("li, a").filter(function() {
                return !this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
              }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"), d.removeData("jstree_is_loading")) : this.get_container().children("ul").empty().append(f.children()).find("li, a").filter(function() {
                return !this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
              }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"), this.clean_node(d), b && b.call(this)) : d && -1 !== d ? (d.children("a.jstree-loading").removeClass("jstree-loading"), d.removeData("jstree_is_loading"), g.correct_state && (this.correct_state(d), b && b.call(this))) : g.correct_state && (this.get_container().children("ul").empty(), b && b.call(this));
            }, this));
            break;
          case !g.data && !g.ajax:
            d && -1 != d || (this.get_container().children("ul").empty().append(this.data.html_data.original_container_html).find("li, a").filter(function() {
              return !this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
            }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"), this.clean_node());
            b && b.call(this);
            break;
          case !!g.data && !g.ajax || !!g.data && !!g.ajax && (!d || -1 === d):
            d && -1 != d || (h = a(g.data), h.is("ul") || (h = a("<ul />").append(h)), this.get_container().children("ul").empty().append(h.children()).find("li, a").filter(function() {
              return !this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
            }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"), this.clean_node());
            b && b.call(this);
            break;
          case !g.data && !!g.ajax || !!g.data && !!g.ajax && d && -1 !== d:
            d = this._get_node(d), l = function(a, b, c) {
              var h = this.get_settings().html_data.ajax.error;
              h && h.call(this, a, b, c);
              -1 != d && d.length ? (d.children("a.jstree-loading").removeClass("jstree-loading"), d.removeData("jstree_is_loading"), "success" === b && g.correct_state && this.correct_state(d)) : "success" === b && g.correct_state && this.get_container().children("ul").empty();
              f && f.call(this);
            }, h = function(f, h, k) {
              var q = this.get_settings().html_data.ajax.success;
              q && (f = q.call(this, f, h, k) || f);
              if ("" === f || f && f.toString && "" === f.toString().replace(/^[\s\n]+$/, "")) {
                return l.call(this, k, h, "");
              }
              f ? (f = a(f), f.is("ul") || (f = a("<ul />").append(f)), -1 != d && d ? (d.children("a.jstree-loading").removeClass("jstree-loading"), d.append(f).children("ul").find("li, a").filter(function() {
                return !this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
              }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"), d.removeData("jstree_is_loading")) : this.get_container().children("ul").empty().append(f.children()).find("li, a").filter(function() {
                return !this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
              }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"), this.clean_node(d), b && b.call(this)) : d && -1 !== d ? (d.children("a.jstree-loading").removeClass("jstree-loading"), d.removeData("jstree_is_loading"), g.correct_state && (this.correct_state(d), b && b.call(this))) : g.correct_state && (this.get_container().children("ul").empty(), b && b.call(this));
            }, g.ajax.context = this, g.ajax.error = l, g.ajax.success = h, g.ajax.dataType || (g.ajax.dataType = "html"), a.isFunction(g.ajax.url) && (g.ajax.url = g.ajax.url.call(this, d)), a.isFunction(g.ajax.data) && (g.ajax.data = g.ajax.data.call(this, d)), a.ajax(g.ajax);
        }
      }}});
      a.jstree.defaults.plugins.push("html_data");
    })(jQuery);
    (function(a) {
      a.jstree.plugin("themeroller", {__init:function() {
        var d = this._get_settings().themeroller;
        this.get_container().addClass("ui-widget-content").addClass("jstree-themeroller").delegate("a", "mouseenter.jstree", function(b) {
          a(b.currentTarget).hasClass("jstree-loading") || a(this).addClass(d.item_h);
        }).delegate("a", "mouseleave.jstree", function() {
          a(this).removeClass(d.item_h);
        }).bind("init.jstree", a.proxy(function(a, c) {
          c.inst.get_container().find("> ul > li > .jstree-loading > ins").addClass("ui-icon-refresh");
          this._themeroller(c.inst.get_container().find("> ul > li"));
        }, this)).bind("open_node.jstree create_node.jstree", a.proxy(function(a, c) {
          this._themeroller(c.rslt.obj);
        }, this)).bind("loaded.jstree refresh.jstree", a.proxy(function(a) {
          this._themeroller();
        }, this)).bind("close_node.jstree", a.proxy(function(a, c) {
          this._themeroller(c.rslt.obj);
        }, this)).bind("delete_node.jstree", a.proxy(function(a, c) {
          this._themeroller(c.rslt.parent);
        }, this)).bind("correct_state.jstree", a.proxy(function(a, c) {
          c.rslt.obj.children("ins.jstree-icon").removeClass(d.opened + " " + d.closed + " ui-icon").end().find("> a > ins.ui-icon").filter(function() {
            return -1 === this.className.toString().replace(d.item_clsd, "").replace(d.item_open, "").replace(d.item_leaf, "").indexOf("ui-icon-");
          }).removeClass(d.item_open + " " + d.item_clsd).addClass(d.item_leaf || "jstree-no-icon");
        }, this)).bind("select_node.jstree", a.proxy(function(a, c) {
          c.rslt.obj.children("a").addClass(d.item_a);
        }, this)).bind("deselect_node.jstree deselect_all.jstree", a.proxy(function(a, c) {
          this.get_container().find("a." + d.item_a).removeClass(d.item_a).end().find("a.jstree-clicked").addClass(d.item_a);
        }, this)).bind("dehover_node.jstree", a.proxy(function(a, c) {
          c.rslt.obj.children("a").removeClass(d.item_h);
        }, this)).bind("hover_node.jstree", a.proxy(function(a, c) {
          this.get_container().find("a." + d.item_h).not(c.rslt.obj).removeClass(d.item_h);
          c.rslt.obj.children("a").addClass(d.item_h);
        }, this)).bind("move_node.jstree", a.proxy(function(a, c) {
          this._themeroller(c.rslt.o);
          this._themeroller(c.rslt.op);
        }, this));
      }, __destroy:function() {
        var d = this._get_settings().themeroller, b = ["ui-icon"];
        a.each(d, function(a, c) {
          c = c.split(" ");
          c.length && (b = b.concat(c));
        });
        this.get_container().removeClass("ui-widget-content").find("." + b.join(", .")).removeClass(b.join(" "));
      }, _fn:{_themeroller:function(a) {
        var b = this._get_settings().themeroller;
        a = a && -1 != a ? this._get_node(a).parent() : this.get_container_ul();
        a.find("li.jstree-closed").children("ins.jstree-icon").removeClass(b.opened).addClass("ui-icon " + b.closed).end().children("a").addClass(b.item).children("ins.jstree-icon").addClass("ui-icon").filter(function() {
          return -1 === this.className.toString().replace(b.item_clsd, "").replace(b.item_open, "").replace(b.item_leaf, "").indexOf("ui-icon-");
        }).removeClass(b.item_leaf + " " + b.item_open).addClass(b.item_clsd || "jstree-no-icon").end().end().end().end().find("li.jstree-open").children("ins.jstree-icon").removeClass(b.closed).addClass("ui-icon " + b.opened).end().children("a").addClass(b.item).children("ins.jstree-icon").addClass("ui-icon").filter(function() {
          return -1 === this.className.toString().replace(b.item_clsd, "").replace(b.item_open, "").replace(b.item_leaf, "").indexOf("ui-icon-");
        }).removeClass(b.item_leaf + " " + b.item_clsd).addClass(b.item_open || "jstree-no-icon").end().end().end().end().find("li.jstree-leaf").children("ins.jstree-icon").removeClass(b.closed + " ui-icon " + b.opened).end().children("a").addClass(b.item).children("ins.jstree-icon").addClass("ui-icon").filter(function() {
          return -1 === this.className.toString().replace(b.item_clsd, "").replace(b.item_open, "").replace(b.item_leaf, "").indexOf("ui-icon-");
        }).removeClass(b.item_clsd + " " + b.item_open).addClass(b.item_leaf || "jstree-no-icon");
      }}, defaults:{opened:"ui-icon-triangle-1-se", closed:"ui-icon-triangle-1-e", item:"ui-state-default", item_h:"ui-state-hover", item_a:"ui-state-active", item_open:"ui-icon-folder-open", item_clsd:"ui-icon-folder-collapsed", item_leaf:"ui-icon-document"}});
      a(function() {
        a.vakata.css.add_sheet({str:".jstree-themeroller .ui-icon { overflow:visible; } .jstree-themeroller a { padding:0 2px; } .jstree-themeroller .jstree-no-icon { display:none; }", title:"jstree"});
      });
    })(jQuery);
    (function(a) {
      a.jstree.plugin("unique", {__init:function() {
        this.get_container().bind("before.jstree", a.proxy(function(d, b) {
          var f = [], h = !0, g;
          "move_node" == b.func && !0 === b.args[4] && b.args[0].o && b.args[0].o.length && (b.args[0].o.children("a").each(function() {
            f.push(a(this).text().replace(/^\s+/g, ""));
          }), h = this._check_unique(f, b.args[0].np.find("> ul > li").not(b.args[0].o), "move_node"));
          "create_node" == b.func && (b.args[4] || this._is_loaded(b.args[0])) && (h = this._get_node(b.args[0]), !b.args[1] || "before" !== b.args[1] && "after" !== b.args[1] || (h = this._get_parent(b.args[0])) && -1 !== h || (h = this.get_container()), "string" === typeof b.args[2] ? f.push(b.args[2]) : b.args[2] && b.args[2].data ? f.push(b.args[2].data) : f.push(this._get_string("new_node")), h = this._check_unique(f, h.find("> ul > li"), "create_node"));
          "rename_node" == b.func && (f.push(b.args[1]), g = this._get_node(b.args[0]), (h = this._get_parent(g)) && -1 !== h || (h = this.get_container()), h = this._check_unique(f, h.find("> ul > li").not(g), "rename_node"));
          if (!h) {
            return d.stopPropagation(), !1;
          }
        }, this));
      }, defaults:{error_callback:a.noop}, _fn:{_check_unique:function(d, b, f) {
        var h = [];
        b.children("a").each(function() {
          h.push(a(this).text().replace(/^\s+/g, ""));
        });
        if (!h.length || !d.length) {
          return !0;
        }
        h = h.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",");
        return h.length + d.length != h.concat(d).sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",").length ? (this._get_settings().unique.error_callback.call(null, d, b, f), !1) : !0;
      }, check_move:function() {
        if (!this.__call_old()) {
          return !1;
        }
        var d = this._get_move(), b = [];
        return d.o && d.o.length ? (d.o.children("a").each(function() {
          b.push(a(this).text().replace(/^\s+/g, ""));
        }), this._check_unique(b, d.np.find("> ul > li").not(d.o), "check_move")) : !0;
      }}});
    })(jQuery);
    (function(c) {
      c.jstree.plugin("wholerow", {__init:function() {
        if (!this.data.ui) {
          throw "jsTree wholerow: jsTree UI plugin not included.";
        }
        this.data.wholerow.html = !1;
        this.data.wholerow.to = !1;
        this.get_container().bind("init.jstree", c.proxy(function(a, b) {
          this._get_settings().core.animation = 0;
        }, this)).bind("open_node.jstree create_node.jstree clean_node.jstree loaded.jstree", c.proxy(function(a, b) {
          this._prepare_wholerow_span(b && b.rslt && b.rslt.obj ? b.rslt.obj : -1);
        }, this)).bind("search.jstree clear_search.jstree reopen.jstree after_open.jstree after_close.jstree create_node.jstree delete_node.jstree clean_node.jstree", c.proxy(function(a, b) {
          this.data.to && clearTimeout(this.data.to);
          this.data.to = setTimeout(function(a, b) {
            return function() {
              a._prepare_wholerow_ul(b);
            };
          }(this, b && b.rslt && b.rslt.obj ? b.rslt.obj : -1), 0);
        }, this)).bind("deselect_all.jstree", c.proxy(function(a, b) {
          this.get_container().find(" > .jstree-wholerow .jstree-clicked").removeClass("jstree-clicked " + (this.data.themeroller ? this._get_settings().themeroller.item_a : ""));
        }, this)).bind("select_node.jstree deselect_node.jstree ", c.proxy(function(a, b) {
          b.rslt.obj.each(function() {
            b.inst.get_container().find(" > .jstree-wholerow li:visible:eq(" + parseInt((c(this).offset().top - b.inst.get_container().offset().top + b.inst.get_container()[0].scrollTop) / b.inst.data.core.li_height, 10) + ")").children("a").attr("class", b.rslt.obj.children("a").attr("class"));
          });
        }, this)).bind("hover_node.jstree dehover_node.jstree", c.proxy(function(a, b) {
          this.get_container().find(" > .jstree-wholerow .jstree-hovered").removeClass("jstree-hovered " + (this.data.themeroller ? this._get_settings().themeroller.item_h : ""));
          "hover_node" === a.type && this.get_container().find(" > .jstree-wholerow li:visible:eq(" + parseInt((b.rslt.obj.offset().top - this.get_container().offset().top + this.get_container()[0].scrollTop) / this.data.core.li_height, 10) + ")").children("a").attr("class", b.rslt.obj.children(".jstree-hovered").attr("class"));
        }, this)).delegate(".jstree-wholerow-span, ins.jstree-icon, li", "click.jstree", function(a) {
          var b = c(a.currentTarget);
          "A" === a.target.tagName || "INS" === a.target.tagName && b.closest("li").is(".jstree-open, .jstree-closed") || (b.closest("li").children("a:visible:eq(0)").click(), a.stopImmediatePropagation());
        }).delegate("li", "mouseover.jstree", c.proxy(function(a) {
          a.stopImmediatePropagation();
          if (c(a.currentTarget).children(".jstree-hovered, .jstree-clicked").length) {
            return !1;
          }
          this.hover_node(a.currentTarget);
          return !1;
        }, this)).delegate("li", "mouseleave.jstree", c.proxy(function(a) {
          c(a.currentTarget).children("a").hasClass("jstree-hovered").length || this.dehover_node(a.currentTarget);
        }, this));
        (d || a) && c.vakata.css.add_sheet({str:".jstree-" + this.get_index() + " { position:relative; } ", title:"jstree"});
      }, defaults:{}, __destroy:function() {
        this.get_container().children(".jstree-wholerow").remove();
        this.get_container().find(".jstree-wholerow-span").remove();
      }, _fn:{_prepare_wholerow_span:function(a) {
        a = a && -1 != a ? this._get_node(a) : this.get_container().find("> ul > li");
        !1 !== a && a.each(function() {
          c(this).find("li").andSelf().each(function() {
            var a = c(this);
            if (a.children(".jstree-wholerow-span").length) {
              return !0;
            }
            a.prepend("<span class='jstree-wholerow-span' style='width:" + 18 * a.parentsUntil(".jstree", "li").length + "px;'>&#160;</span>");
          });
        });
      }, _prepare_wholerow_ul:function() {
        var a = this.get_container().children("ul").eq(0), b = a.html();
        a.addClass("jstree-wholerow-real");
        this.data.wholerow.last_html !== b && (this.data.wholerow.last_html = b, this.get_container().children(".jstree-wholerow").remove(), this.get_container().append(a.clone().removeClass("jstree-wholerow-real").wrapAll("<div class='jstree-wholerow' />").parent().width(a.parent()[0].scrollWidth).css("top", -1 * (a.height() + (d ? 5 : 0))).find("li[id]").each(function() {
          this.removeAttribute("id");
        }).end()));
      }}});
      c(function() {
        var e = ".jstree .jstree-wholerow-real { position:relative; z-index:1; } .jstree .jstree-wholerow-real li { cursor:pointer; } .jstree .jstree-wholerow-real a { border-left-color:transparent !important; border-right-color:transparent !important; } .jstree .jstree-wholerow { position:relative; z-index:0; height:0; } .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { width:100%; } .jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li, .jstree .jstree-wholerow a { margin:0 !important; padding:0 !important; } .jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { background:transparent !important; }.jstree .jstree-wholerow ins, .jstree .jstree-wholerow span, .jstree .jstree-wholerow input { display:none !important; }.jstree .jstree-wholerow a, .jstree .jstree-wholerow a:hover { text-indent:-9999px; !important; width:100%; padding:0 !important; border-right-width:0px !important; border-left-width:0px !important; } .jstree .jstree-wholerow-span { position:absolute; left:0; margin:0px; padding:0; height:18px; border-width:0; padding:0; z-index:0; }";
        f && (e += ".jstree .jstree-wholerow a { display:block; height:18px; margin:0; padding:0; border:0; } .jstree .jstree-wholerow-real a { border-color:transparent !important; } ");
        if (d || a) {
          e += ".jstree .jstree-wholerow, .jstree .jstree-wholerow li, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow a { margin:0; padding:0; line-height:18px; } .jstree .jstree-wholerow a { display:block; height:18px; line-height:18px; overflow:hidden; } ";
        }
        c.vakata.css.add_sheet({str:e, title:"jstree"});
      });
    })(jQuery);
    (function(a) {
      var d = ["getChildren", "getChildrenCount", "getAttr", "getName", "getProps"], b = function(b, d) {
        var e = !0;
        b = b || {};
        d = [].concat(d);
        a.each(d, function(d, f) {
          if (!a.isFunction(b[f])) {
            return e = !1;
          }
        });
        return e;
      };
      a.jstree.plugin("model", {__init:function() {
        if (!this.data.json_data) {
          throw "jsTree model: jsTree json_data plugin not included.";
        }
        this._get_settings().json_data.data = function(f, h) {
          var g = -1 == f ? this._get_settings().model.object : f.data("jstree_model");
          if (!b(g, d)) {
            return h.call(null, !1);
          }
          this._get_settings().model.async ? g.getChildren(a.proxy(function(a) {
            this.model_done(a, h);
          }, this)) : this.model_done(g.getChildren(), h);
        };
      }, defaults:{object:!1, id_prefix:!1, async:!1}, _fn:{model_done:function(b, d) {
        var e = [], f = this._get_settings(), m = this;
        a.isArray(b) || (b = [b]);
        a.each(b, function(b, d) {
          var h = d.getProps() || {};
          h.attr = d.getAttr() || {};
          d.getChildrenCount() && (h.state = "closed");
          h.data = d.getName();
          a.isArray(h.data) || (h.data = [h.data]);
          m.data.types && a.isFunction(d.getType) && (h.attr[f.types.type_attr] = d.getType());
          h.attr.id && f.model.id_prefix && (h.attr.id = f.model.id_prefix + h.attr.id);
          h.metadata || (h.metadata = {});
          h.metadata.jstree_model = d;
          e.push(h);
        });
        d.call(null, e);
      }}});
    })(jQuery);
  }
})();
// Input 4
jQuery.cookie = function(a, d, f) {
  if ("undefined" != typeof d) {
    f = f || {};
    null === d && (d = "", f.expires = -1);
    var c = "";
    f.expires && ("number" == typeof f.expires || f.expires.toUTCString) && ("number" == typeof f.expires ? (c = new Date, c.setTime(c.getTime() + 864E5 * f.expires)) : c = f.expires, c = "; expires=" + c.toUTCString());
    var e = f.path ? "; path=" + f.path : "", b = f.domain ? "; domain=" + f.domain : "";
    f = f.secure ? "; secure" : "";
    document.cookie = [a, "=", encodeURIComponent(d), c, e, b, f].join("");
  } else {
    d = null;
    if (document.cookie && "" != document.cookie) {
      for (f = document.cookie.split(";"), c = 0;c < f.length;c++) {
        if (e = jQuery.trim(f[c]), e.substring(0, a.length + 1) == a + "=") {
          d = decodeURIComponent(e.substring(a.length + 1));
          break;
        }
      }
    }
    return d;
  }
};
// Input 5
(function(a) {
  function d(d) {
    if ("string" === typeof d.data) {
      var c = d.handler, e = d.data.toLowerCase().split(" ");
      d.handler = function(b) {
        if (this === b.target || !/textarea|select/i.test(b.target.nodeName) && "text" !== b.target.type) {
          var d = "keypress" !== b.type && a.hotkeys.specialKeys[b.which], f = String.fromCharCode(b.which).toLowerCase(), g = "", l = {};
          b.altKey && "alt" !== d && (g += "alt+");
          b.ctrlKey && "ctrl" !== d && (g += "ctrl+");
          b.metaKey && !b.ctrlKey && "meta" !== d && (g += "meta+");
          b.shiftKey && "shift" !== d && (g += "shift+");
          d ? l[g + d] = !0 : (l[g + f] = !0, l[g + a.hotkeys.shiftNums[f]] = !0, "shift+" === g && (l[a.hotkeys.shiftNums[f]] = !0));
          d = 0;
          for (f = e.length;d < f;d++) {
            if (l[e[d]]) {
              return c.apply(this, arguments);
            }
          }
        }
      };
    }
  }
  a.hotkeys = {version:"0.8", specialKeys:{8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"capslock", 27:"esc", 32:"space", 33:"pageup", 34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"del", 96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9", 106:"*", 107:"+", 109:"-", 110:".", 111:"/", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 
  122:"f11", 123:"f12", 144:"numlock", 145:"scroll", 191:"/", 224:"meta"}, shiftNums:{"`":"~", 1:"!", 2:"@", 3:"#", 4:"$", 5:"%", 6:"^", 7:"&", 8:"*", 9:"(", 0:")", "-":"_", "=":"+", ";":": ", "'":'"', ",":"<", ".":">", "/":"?", "\\":"|"}};
  a.each(["keydown", "keyup", "keypress"], function() {
    a.event.special[this] = {add:d};
  });
})(jQuery);
// Input 6
(function(a) {
  "function" === typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports && "object" == typeof module ? module.exports = a : a(jQuery);
})(function(a, d) {
  function f(b, c, d, e) {
    for (var f = [], g = 0;g < b.length;g++) {
      var h = b[g];
      if (h) {
        var k = tinycolor(h), l = .5 > k.toHsl().l ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light", l = l + (tinycolor.equals(c, h) ? " sp-thumb-active" : ""), h = k.toString(e.preferredFormat || "rgb"), m = p ? "background-color:" + k.toRgbString() : "filter:" + k.toFilter();
        f.push('<span title="' + h + '" data-color="' + k.toRgbString() + '" class="' + l + '"><span class="sp-thumb-inner" style="' + m + ';" /></span>');
      } else {
        f.push(a("<div />").append(a('<span data-color="" style="background-color:transparent;" class="sp-clear-display"></span>').attr("title", e.noColorSelectedText)).html());
      }
    }
    return "<div class='sp-cf " + d + "'>" + f.join("") + "</div>";
  }
  function c(b, c) {
    var d = a.extend({}, n, b);
    d.callbacks = {move:g(d.move, c), change:g(d.change, c), show:g(d.show, c), hide:g(d.hide, c), beforeShow:g(d.beforeShow, c)};
    return d;
  }
  function e(e, g) {
    function k() {
      A.showPaletteOnly && (A.showPalette = !0);
      Na.text(A.showPaletteOnly ? A.togglePaletteMoreText : A.togglePaletteLessText);
      if (A.palette) {
        wa = A.palette.slice(0);
        xa = a.isArray(wa[0]) ? wa : [wa];
        Da = {};
        for (var b = 0;b < xa.length;b++) {
          for (var c = 0;c < xa[b].length;c++) {
            var d = tinycolor(xa[b][c]).toRgbString();
            Da[d] = !0;
          }
        }
      }
      Q.toggleClass("sp-flat", aa);
      Q.toggleClass("sp-input-disabled", !A.showInput);
      Q.toggleClass("sp-alpha-enabled", A.showAlpha);
      Q.toggleClass("sp-clear-enabled", ta);
      Q.toggleClass("sp-buttons-disabled", !A.showButtons);
      Q.toggleClass("sp-palette-buttons-disabled", !A.togglePaletteOnly);
      Q.toggleClass("sp-palette-disabled", !A.showPalette);
      Q.toggleClass("sp-palette-only", A.showPaletteOnly);
      Q.toggleClass("sp-initial-disabled", !A.showInitial);
      Q.addClass(A.className).addClass(A.containerClassName);
      M();
    }
    function n() {
      if (F && window.localStorage) {
        try {
          var b = window.localStorage[F].split(",#");
          1 < b.length && (delete window.localStorage[F], a.each(b, function(a, b) {
            x(b);
          }));
        } catch (c) {
        }
        try {
          na = window.localStorage[F].split(";");
        } catch (c) {
        }
      }
    }
    function x(b) {
      if (ka) {
        b = tinycolor(b).toRgbString();
        if (!Da[b] && -1 === a.inArray(b, na)) {
          for (na.push(b);na.length > Wa;) {
            na.shift();
          }
        }
        if (F && window.localStorage) {
          try {
            window.localStorage[F] = na.join(";");
          } catch (c) {
          }
        }
      }
    }
    function B() {
      var a = [];
      if (A.showPalette) {
        for (var b = 0;b < na.length;b++) {
          var c = tinycolor(na[b]).toRgbString();
          Da[c] || a.push(na[b]);
        }
      }
      return a.reverse().slice(0, A.maxSelectionSize);
    }
    function C() {
      var b = S(), c = a.map(xa, function(a, c) {
        return f(a, b, "sp-palette-row sp-palette-row-" + c, A);
      });
      n();
      na && c.push(f(B(), b, "sp-palette-row sp-palette-row-selection", A));
      Ra.html(c.join(""));
    }
    function O() {
      if (A.showInitial) {
        var a = sa, b = S();
        Sa.html(f([a, b], b, "sp-palette-row-initial", A));
      }
    }
    function D() {
      (0 >= Y || 0 >= ma || 0 >= U) && M();
      ia = !0;
      Q.addClass("sp-dragging");
      qa = null;
      ba.trigger("dragstart.spectrum", [S()]);
    }
    function K() {
      ia = !1;
      Q.removeClass("sp-dragging");
      ba.trigger("dragstop.spectrum", [S()]);
    }
    function H() {
      var a = oa.val();
      null !== a && "" !== a || !ta ? (a = tinycolor(a), a.isValid() ? (da(a), ea(!0)) : oa.addClass("sp-validation-error")) : (da(null), ea(!0));
    }
    function z() {
      E ? ca() : P();
    }
    function P() {
      var b = a.Event("beforeShow.spectrum");
      if (E) {
        M();
      } else {
        if (ba.trigger(b, [S()]), !1 !== J.beforeShow(S()) && !b.isDefaultPrevented()) {
          for (b = 0;b < r.length;b++) {
            r[b] && r[b].hide();
          }
          E = !0;
          a(ya).bind("keydown.spectrum", L);
          a(ya).bind("click.spectrum", ha);
          a(window).bind("resize.spectrum", ga);
          ua.addClass("sp-active");
          Q.removeClass("sp-hidden");
          M();
          fa();
          sa = S();
          O();
          J.show(sa);
          ba.trigger("show.spectrum", [sa]);
        }
      }
    }
    function L(a) {
      27 === a.keyCode && ca();
    }
    function ha(a) {
      2 == a.button || ia || (Za ? ea(!0) : da(sa, !0), ca());
    }
    function ca() {
      E && !aa && (E = !1, a(ya).unbind("keydown.spectrum", L), a(ya).unbind("click.spectrum", ha), a(window).unbind("resize.spectrum", ga), ua.removeClass("sp-active"), Q.addClass("sp-hidden"), J.hide(S()), ba.trigger("hide.spectrum", [S()]));
    }
    function da(a, b) {
      if (tinycolor.equals(a, S())) {
        fa();
      } else {
        var c, d;
        !a && ta ? ra = !0 : (ra = !1, c = tinycolor(a), d = c.toHsv(), G = d.h % 360 / 360, Z = d.s, pa = d.v, la = d.a);
        fa();
        c && c.isValid() && !b && (Ca = Pa || c.getFormat());
      }
    }
    function S(a) {
      a = a || {};
      return ta && ra ? null : tinycolor.fromRatio({h:G, s:Z, v:pa, a:Math.round(100 * la) / 100}, {format:a.format || Ca});
    }
    function ja() {
      fa();
      J.move(S());
      ba.trigger("move.spectrum", [S()]);
    }
    function fa() {
      oa.removeClass("sp-validation-error");
      V();
      var a = tinycolor.fromRatio({h:G, s:1, v:1});
      Ea.css("background-color", a.toHexString());
      a = Ca;
      !(1 > la) || 0 === la && "name" === a || "hex" !== a && "hex3" !== a && "hex6" !== a && "name" !== a || (a = "rgb");
      var b = S({format:a}), c = "";
      va.removeClass("sp-clear-display");
      va.css("background-color", "transparent");
      if (!b && ta) {
        va.addClass("sp-clear-display");
      } else {
        var c = b.toHexString(), d = b.toRgbString();
        p || 1 === b.alpha ? va.css("background-color", d) : (va.css("background-color", "transparent"), va.css("filter", b.toFilter()));
        if (A.showAlpha) {
          d = b.toRgb();
          d.a = 0;
          var d = tinycolor(d).toRgbString(), e = "linear-gradient(left, " + d + ", " + c + ")";
          q ? za.css("filter", tinycolor(d).toFilter({gradientType:1}, c)) : (za.css("background", "-webkit-" + e), za.css("background", "-moz-" + e), za.css("background", "-ms-" + e), za.css("background", "linear-gradient(to right, " + d + ", " + c + ")"));
        }
        c = b.toString(a);
      }
      A.showInput && oa.val(c);
      A.showPalette && C();
      O();
    }
    function V() {
      var a = Z, b = pa;
      ta && ra ? (Ha.hide(), Ga.hide(), Fa.hide()) : (Ha.show(), Ga.show(), Fa.show(), a *= ma, b = Y - b * Y, a = Math.max(-R, Math.min(ma - R, a - R)), b = Math.max(-R, Math.min(Y - R, b - R)), Fa.css({top:b + "px", left:a + "px"}), Ha.css({left:la * T - W / 2 + "px"}), Ga.css({top:G * U - X + "px"}));
    }
    function ea(a) {
      var b = S(), c = "", d = !tinycolor.equals(b, sa);
      b && (c = b.toString(Ca), x(b));
      Ia && ba.val(c);
      a && d && (J.change(b), ba.trigger("change", [b]));
    }
    function M() {
      ma = Ea.width();
      Y = Ea.height();
      R = Fa.height();
      La.width();
      U = La.height();
      X = Ga.height();
      T = Qa.width();
      W = Ha.width();
      aa || (Q.css("position", "absolute"), A.offset ? Q.offset(A.offset) : Q.offset(b(Q, Aa)));
      V();
      A.showPalette && C();
      ba.trigger("reflow.spectrum");
    }
    function I() {
      ca();
      Ka = !0;
      ba.attr("disabled", !0);
      Aa.addClass("sp-disabled");
    }
    var A = c(g, e), aa = A.flat, ka = A.showSelectionPalette, F = A.localStorageKey, N = A.theme, J = A.callbacks, ga = m(M, 10), E = !1, ia = !1, ma = 0, Y = 0, R = 0, U = 0, T = 0, W = 0, X = 0, G = 0, Z = 0, pa = 0, la = 1, wa = [], xa = [], Da = {}, na = A.selectionPalette.slice(0), Wa = A.maxSelectionSize, qa = null, ya = e.ownerDocument, ba = a(e), Ka = !1, Q = a(t, ya).addClass(N), Xa = Q.find(".sp-picker-container"), Ea = Q.find(".sp-color"), Fa = Q.find(".sp-dragger"), La = Q.find(".sp-hue"), 
    Ga = Q.find(".sp-slider"), za = Q.find(".sp-alpha-inner"), Qa = Q.find(".sp-alpha"), Ha = Q.find(".sp-alpha-handle"), oa = Q.find(".sp-input"), Ra = Q.find(".sp-palette"), Sa = Q.find(".sp-initial"), Ta = Q.find(".sp-cancel"), Ma = Q.find(".sp-clear"), Ua = Q.find(".sp-choose"), Na = Q.find(".sp-palette-toggle"), Ia = ba.is("input"), Ya = Ia && "color" === ba.attr("type") && a.fn.spectrum.inputTypeColorSupport(), Oa = Ia && !aa, ua = Oa ? a("<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'></div></div><div class='sp-dd'>&#9660;</div></div>").addClass(N).addClass(A.className).addClass(A.replacerClassName) : 
    a([]), Aa = Oa ? ua : ba, va = ua.find(".sp-preview-inner"), Ba = A.color || Ia && ba.val(), sa = !1, Pa = A.preferredFormat, Ca = Pa, Za = !A.showButtons || A.clickoutFiresChange, ra = !Ba, ta = A.allowEmpty && !Ya;
    (function() {
      function b(c) {
        c.data && c.data.ignore ? (da(a(c.target).closest(".sp-thumb-el").data("color")), ja()) : (da(a(c.target).closest(".sp-thumb-el").data("color")), ja(), ea(!0), A.hideAfterPaletteSelect && ca());
        return !1;
      }
      q && Q.find("*:not(input)").attr("unselectable", "on");
      k();
      Oa && ba.after(ua).hide();
      ta || Ma.hide();
      if (aa) {
        ba.after(Q).hide();
      } else {
        var c = "parent" === A.appendTo ? ba.parent() : a(A.appendTo);
        1 !== c.length && (c = a("body"));
        c.append(Q);
      }
      n();
      Aa.bind("click.spectrum touchstart.spectrum", function(b) {
        Ka || z();
        b.stopPropagation();
        a(b.target).is("input") || b.preventDefault();
      });
      (ba.is(":disabled") || !0 === A.disabled) && I();
      Q.click(h);
      oa.change(H);
      oa.bind("paste", function() {
        setTimeout(H, 1);
      });
      oa.keydown(function(a) {
        13 == a.keyCode && H();
      });
      Ta.text(A.cancelText);
      Ta.bind("click.spectrum", function(a) {
        a.stopPropagation();
        a.preventDefault();
        da(sa, !0);
        ca();
      });
      Ma.attr("title", A.clearText);
      Ma.bind("click.spectrum", function(a) {
        a.stopPropagation();
        a.preventDefault();
        ra = !0;
        ja();
        aa && ea(!0);
      });
      Ua.text(A.chooseText);
      Ua.bind("click.spectrum", function(a) {
        a.stopPropagation();
        a.preventDefault();
        q && oa.is(":focus") && oa.trigger("change");
        oa.hasClass("sp-validation-error") || (ea(!0), ca());
      });
      Na.text(A.showPaletteOnly ? A.togglePaletteMoreText : A.togglePaletteLessText);
      Na.bind("click.spectrum", function(a) {
        a.stopPropagation();
        a.preventDefault();
        A.showPaletteOnly = !A.showPaletteOnly;
        A.showPaletteOnly || aa || Q.css("left", "-=" + (Xa.outerWidth(!0) + 5));
        k();
      });
      l(Qa, function(a, b, c) {
        la = a / T;
        ra = !1;
        c.shiftKey && (la = Math.round(10 * la) / 10);
        ja();
      }, D, K);
      l(La, function(a, b) {
        G = parseFloat(b / U);
        ra = !1;
        A.showAlpha || (la = 1);
        ja();
      }, D, K);
      l(Ea, function(a, b, c) {
        c.shiftKey ? qa || (c = Y - pa * Y, qa = Math.abs(a - Z * ma) > Math.abs(b - c) ? "x" : "y") : qa = null;
        c = !qa || "y" === qa;
        qa && "x" !== qa || (Z = parseFloat(a / ma));
        c && (pa = parseFloat((Y - b) / Y));
        ra = !1;
        A.showAlpha || (la = 1);
        ja();
      }, D, K);
      Ba ? (da(Ba), fa(), Ca = Pa || tinycolor(Ba).format, x(Ba)) : fa();
      aa && P();
      c = q ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
      Ra.delegate(".sp-thumb-el", c, b);
      Sa.delegate(".sp-thumb-el:nth-child(1)", c, {ignore:!0}, b);
    })();
    var Ja = {show:P, hide:ca, toggle:z, reflow:M, option:function(b, c) {
      if (b === d) {
        return a.extend({}, A);
      }
      if (c === d) {
        return A[b];
      }
      A[b] = c;
      k();
    }, enable:function() {
      Ka = !1;
      ba.attr("disabled", !1);
      Aa.removeClass("sp-disabled");
    }, disable:I, offset:function(a) {
      A.offset = a;
      M();
    }, set:function(a) {
      da(a);
      ea();
    }, get:S, destroy:function() {
      ba.show();
      Aa.unbind("click.spectrum touchstart.spectrum");
      Q.remove();
      ua.remove();
      r[Ja.id] = null;
    }, container:Q};
    Ja.id = r.push(Ja) - 1;
    return Ja;
  }
  function b(b, c) {
    var d = b.outerWidth(), e = b.outerHeight(), f = c.outerHeight(), g = b[0].ownerDocument, h = g.documentElement, k = h.clientWidth + a(g).scrollLeft(), g = h.clientHeight + a(g).scrollTop(), h = c.offset();
    h.top += f;
    h.left -= Math.min(h.left, h.left + d > k && k > d ? Math.abs(h.left + d - k) : 0);
    h.top -= Math.min(h.top, h.top + e > g && g > e ? Math.abs(e + f - 0) : 0);
    return h;
  }
  function k() {
  }
  function h(a) {
    a.stopPropagation();
  }
  function g(a, b) {
    var c = Array.prototype.slice, d = c.call(arguments, 2);
    return function() {
      return a.apply(b, d.concat(c.call(arguments)));
    };
  }
  function l(b, c, d, e) {
    function f(a) {
      a.stopPropagation && a.stopPropagation();
      a.preventDefault && a.preventDefault();
      a.returnValue = !1;
    }
    function g(a) {
      if (l) {
        if (q && 9 > k.documentMode && !a.button) {
          return h();
        }
        var d = a.originalEvent && a.originalEvent.touches && a.originalEvent.touches[0], e = d && d.pageY || a.pageY, d = Math.max(0, Math.min((d && d.pageX || a.pageX) - m.left, p)), e = Math.max(0, Math.min(e - m.top, n));
        r && f(a);
        c.apply(b, [d, e, a]);
      }
    }
    function h() {
      l && (a(k).unbind(t), a(k.body).removeClass("sp-dragging"), setTimeout(function() {
        e.apply(b, arguments);
      }, 0));
      l = !1;
    }
    c = c || function() {
    };
    d = d || function() {
    };
    e = e || function() {
    };
    var k = document, l = !1, m = {}, n = 0, p = 0, r = "ontouchstart" in window, t = {};
    t.selectstart = f;
    t.dragstart = f;
    t["touchmove mousemove"] = g;
    t["touchend mouseup"] = h;
    a(b).bind("touchstart mousedown", function(c) {
      (c.which ? 3 == c.which : 2 == c.button) || l || !1 === d.apply(b, arguments) || (l = !0, n = a(b).height(), p = a(b).width(), m = a(b).offset(), a(k).bind(t), a(k.body).addClass("sp-dragging"), g(c), f(c));
    });
  }
  function m(a, b, c) {
    var d;
    return function() {
      var e = this, f = arguments, g = function() {
        d = null;
        a.apply(e, f);
      };
      c && clearTimeout(d);
      if (c || !d) {
        d = setTimeout(g, b);
      }
    };
  }
  var n = {beforeShow:k, move:k, change:k, show:k, hide:k, color:!1, flat:!1, showInput:!1, allowEmpty:!1, showButtons:!0, clickoutFiresChange:!0, showInitial:!1, showPalette:!1, showPaletteOnly:!1, hideAfterPaletteSelect:!1, togglePaletteOnly:!1, showSelectionPalette:!0, localStorageKey:!1, appendTo:"body", maxSelectionSize:7, cancelText:"cancel", chooseText:"choose", togglePaletteMoreText:"more", togglePaletteLessText:"less", clearText:"Clear Color Selection", noColorSelectedText:"No Color Selected", 
  preferredFormat:!1, className:"", containerClassName:"", replacerClassName:"", showAlpha:!1, theme:"sp-light", palette:["#ffffff #000000 #ff0000 #ff8000 #ffff00 #008000 #0000ff #4b0082 #9400d3".split(" ")], selectionPalette:[], disabled:!1, offset:null}, r = [], q = !!/msie/i.exec(window.navigator.userAgent), p = function() {
    var a = document.createElement("div").style;
    a.cssText = "background-color:rgba(0,0,0,.5)";
    return !!~("" + a.backgroundColor).indexOf("rgba") || !!~("" + a.backgroundColor).indexOf("hsla");
  }(), t = function() {
    var a = "";
    if (q) {
      for (var b = 1;6 >= b;b++) {
        a += "<div class='sp-" + b + "'></div>";
      }
    }
    return ["<div class='sp-container sp-hidden'><div class='sp-palette-container'><div class='sp-palette sp-thumb sp-cf'></div><div class='sp-palette-button-container sp-cf'><button type='button' class='sp-palette-toggle'></button></div></div><div class='sp-picker-container'><div class='sp-top sp-cf'><div class='sp-fill'></div><div class='sp-top-inner'><div class='sp-color'><div class='sp-sat'><div class='sp-val'><div class='sp-dragger'></div></div></div></div><div class='sp-clear sp-clear-display'></div><div class='sp-hue'><div class='sp-slider'></div>", 
    a, "</div></div><div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div></div><div class='sp-input-container sp-cf'><input class='sp-input' type='text' spellcheck='false'  /></div><div class='sp-initial sp-thumb sp-cf'></div><div class='sp-button-container sp-cf'><a class='sp-cancel' href='#'></a><button type='button' class='sp-choose'></button></div></div></div>"].join("");
  }();
  a.fn.spectrum = function(b, c) {
    if ("string" == typeof b) {
      var d = this, f = Array.prototype.slice.call(arguments, 1);
      this.each(function() {
        var c = r[a(this).data("spectrum.id")];
        if (c) {
          var e = c[b];
          if (!e) {
            throw Error("Spectrum: no such method: '" + b + "'");
          }
          "get" == b ? d = c.get() : "container" == b ? d = c.container : "option" == b ? d = c.option.apply(c, f) : "destroy" == b ? (c.destroy(), a(this).removeData("spectrum.id")) : e.apply(c, f);
        }
      });
      return d;
    }
    return this.spectrum("destroy").each(function() {
      var c = a.extend({}, b, a(this).data()), c = e(this, c);
      a(this).data("spectrum.id", c.id);
    });
  };
  a.fn.spectrum.load = !0;
  a.fn.spectrum.loadOpts = {};
  a.fn.spectrum.draggable = l;
  a.fn.spectrum.defaults = n;
  a.fn.spectrum.inputTypeColorSupport = function u() {
    if ("undefined" === typeof u._cachedResult) {
      var b = a("<input type='color'/>")[0];
      u._cachedResult = "color" === b.type && "" !== b.value;
    }
    return u._cachedResult;
  };
  a.spectrum = {};
  a.spectrum.localization = {};
  a.spectrum.palettes = {};
  a.fn.spectrum.processNativeColorInputs = function() {
    var b = a("input[type=color]");
    b.length && !a.fn.spectrum.inputTypeColorSupport() && b.spectrum({preferredFormat:"hex6"});
  };
  (function() {
    function a(b, c, d) {
      b = V(b, 255);
      c = V(c, 255);
      d = V(d, 255);
      var e = J(b, c, d), f = N(b, c, d), g, h = (e + f) / 2;
      if (e == f) {
        g = f = 0;
      } else {
        var k = e - f, f = .5 < h ? k / (2 - e - f) : k / (e + f);
        switch(e) {
          case b:
            g = (c - d) / k + (c < d ? 6 : 0);
            break;
          case c:
            g = (d - b) / k + 2;
            break;
          case d:
            g = (b - c) / k + 4;
        }
        g /= 6;
      }
      return {h:g, s:f, l:h};
    }
    function b(a, c, d) {
      function e(a, b, c) {
        0 > c && (c += 1);
        1 < c && --c;
        return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a;
      }
      a = V(a, 360);
      c = V(c, 100);
      d = V(d, 100);
      if (0 === c) {
        d = c = a = d;
      } else {
        var f = .5 > d ? d * (1 + c) : d + c - d * c, g = 2 * d - f;
        d = e(g, f, a + 1 / 3);
        c = e(g, f, a);
        a = e(g, f, a - 1 / 3);
      }
      return {r:255 * d, g:255 * c, b:255 * a};
    }
    function c(a, b, d) {
      a = V(a, 255);
      b = V(b, 255);
      d = V(d, 255);
      var e = J(a, b, d), f = N(a, b, d), g, h = e - f;
      if (e == f) {
        g = 0;
      } else {
        switch(e) {
          case a:
            g = (b - d) / h + (b < d ? 6 : 0);
            break;
          case b:
            g = (d - a) / h + 2;
            break;
          case d:
            g = (a - b) / h + 4;
        }
        g /= 6;
      }
      return {h:g, s:0 === e ? 0 : h / e, v:e};
    }
    function d(a, b, c, e) {
      a = [ea(F(a).toString(16)), ea(F(b).toString(16)), ea(F(c).toString(16))];
      return e && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("");
    }
    function e(a, b, c, d) {
      return [ea(Math.round(255 * parseFloat(d)).toString(16)), ea(F(a).toString(16)), ea(F(b).toString(16)), ea(F(c).toString(16))].join("");
    }
    function f(a, b) {
      b = 0 === b ? 0 : b || 10;
      var c = E(a).toHsl();
      c.s -= b / 100;
      c.s = N(1, J(0, c.s));
      return E(c);
    }
    function g(a, b) {
      b = 0 === b ? 0 : b || 10;
      var c = E(a).toHsl();
      c.s += b / 100;
      c.s = N(1, J(0, c.s));
      return E(c);
    }
    function h(a) {
      return E(a).desaturate(100);
    }
    function k(a, b) {
      b = 0 === b ? 0 : b || 10;
      var c = E(a).toHsl();
      c.l += b / 100;
      c.l = N(1, J(0, c.l));
      return E(c);
    }
    function l(a, b) {
      b = 0 === b ? 0 : b || 10;
      var c = E(a).toRgb();
      c.r = J(0, N(255, c.r - F(255 * -(b / 100))));
      c.g = J(0, N(255, c.g - F(255 * -(b / 100))));
      c.b = J(0, N(255, c.b - F(255 * -(b / 100))));
      return E(c);
    }
    function m(a, b) {
      b = 0 === b ? 0 : b || 10;
      var c = E(a).toHsl();
      c.l -= b / 100;
      c.l = N(1, J(0, c.l));
      return E(c);
    }
    function n(a, b) {
      var c = E(a).toHsl(), d = (F(c.h) + b) % 360;
      c.h = 0 > d ? 360 + d : d;
      return E(c);
    }
    function p(a) {
      a = E(a).toHsl();
      a.h = (a.h + 180) % 360;
      return E(a);
    }
    function q(a) {
      var b = E(a).toHsl(), c = b.h;
      return [E(a), E({h:(c + 120) % 360, s:b.s, l:b.l}), E({h:(c + 240) % 360, s:b.s, l:b.l})];
    }
    function r(a) {
      var b = E(a).toHsl(), c = b.h;
      return [E(a), E({h:(c + 90) % 360, s:b.s, l:b.l}), E({h:(c + 180) % 360, s:b.s, l:b.l}), E({h:(c + 270) % 360, s:b.s, l:b.l})];
    }
    function t(a) {
      var b = E(a).toHsl(), c = b.h;
      return [E(a), E({h:(c + 72) % 360, s:b.s, l:b.l}), E({h:(c + 216) % 360, s:b.s, l:b.l})];
    }
    function S(a, b, c) {
      b = b || 6;
      c = c || 30;
      var d = E(a).toHsl();
      c = 360 / c;
      a = [E(a)];
      for (d.h = (d.h - (c * b >> 1) + 720) % 360;--b;) {
        d.h = (d.h + c) % 360, a.push(E(d));
      }
      return a;
    }
    function ja(a, b) {
      b = b || 6;
      for (var c = E(a).toHsv(), d = c.h, e = c.s, c = c.v, f = [], g = 1 / b;b--;) {
        f.push(E({h:d, s:e, v:c})), c = (c + g) % 1;
      }
      return f;
    }
    function fa(a) {
      a = parseFloat(a);
      if (isNaN(a) || 0 > a || 1 < a) {
        a = 1;
      }
      return a;
    }
    function V(a, b) {
      var c = a;
      "string" == typeof c && -1 != c.indexOf(".") && 1 === parseFloat(c) && (a = "100%");
      c = "string" === typeof a && -1 != a.indexOf("%");
      a = N(b, J(0, parseFloat(a)));
      c && (a = parseInt(a * b, 10) / 100);
      return 1E-6 > ka.abs(a - b) ? 1 : a % b / parseFloat(b);
    }
    function ea(a) {
      return 1 == a.length ? "0" + a : "" + a;
    }
    function M(a) {
      1 >= a && (a = 100 * a + "%");
      return a;
    }
    var I = /^[\s,#]+/, A = /\s+$/, aa = 0, ka = Math, F = ka.round, N = ka.min, J = ka.max, ga = ka.random, E = function(a, c) {
      var d, e, f, g, h;
      a = a ? a : "";
      c = c || {};
      if (a instanceof E) {
        return a;
      }
      if (!(this instanceof E)) {
        return new E(a, c);
      }
      e = a;
      h = {r:0, g:0, b:0};
      var k = 1;
      f = d = !1;
      if ("string" == typeof e) {
        a: {
          e = e.replace(I, "").replace(A, "").toLowerCase();
          var l = !1;
          if (ia[e]) {
            e = ia[e], l = !0;
          } else {
            if ("transparent" == e) {
              e = {r:0, g:0, b:0, a:0, format:"name"};
              break a;
            }
          }
          e = (g = Y.rgb.exec(e)) ? {r:g[1], g:g[2], b:g[3]} : (g = Y.rgba.exec(e)) ? {r:g[1], g:g[2], b:g[3], a:g[4]} : (g = Y.hsl.exec(e)) ? {h:g[1], s:g[2], l:g[3]} : (g = Y.hsla.exec(e)) ? {h:g[1], s:g[2], l:g[3], a:g[4]} : (g = Y.hsv.exec(e)) ? {h:g[1], s:g[2], v:g[3]} : (g = Y.hsva.exec(e)) ? {h:g[1], s:g[2], v:g[3], a:g[4]} : (g = Y.hex8.exec(e)) ? {a:parseInt(g[1], 16) / 255, r:parseInt(g[2], 16), g:parseInt(g[3], 16), b:parseInt(g[4], 16), format:l ? "name" : "hex8"} : (g = Y.hex6.exec(e)) ? 
          {r:parseInt(g[1], 16), g:parseInt(g[2], 16), b:parseInt(g[3], 16), format:l ? "name" : "hex"} : (g = Y.hex3.exec(e)) ? {r:parseInt(g[1] + "" + g[1], 16), g:parseInt(g[2] + "" + g[2], 16), b:parseInt(g[3] + "" + g[3], 16), format:l ? "name" : "hex"} : !1;
        }
      }
      if ("object" == typeof e) {
        if (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b")) {
          h = e.g, d = e.b, h = {r:255 * V(e.r, 255), g:255 * V(h, 255), b:255 * V(d, 255)}, d = !0, f = "%" === String(e.r).substr(-1) ? "prgb" : "rgb";
        } else {
          if (e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v")) {
            e.s = M(e.s);
            e.v = M(e.v);
            f = e.h;
            l = e.s;
            h = e.v;
            f = 6 * V(f, 360);
            l = V(l, 100);
            h = V(h, 100);
            d = ka.floor(f);
            var m = f - d;
            f = h * (1 - l);
            g = h * (1 - m * l);
            l = h * (1 - (1 - m) * l);
            d %= 6;
            h = {r:255 * [h, g, f, f, l, h][d], g:255 * [l, h, h, g, f, f][d], b:255 * [f, f, l, h, h, g][d]};
            d = !0;
            f = "hsv";
          } else {
            e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("l") && (e.s = M(e.s), e.l = M(e.l), h = b(e.h, e.s, e.l), d = !0, f = "hsl");
          }
        }
        e.hasOwnProperty("a") && (k = e.a);
      }
      k = fa(k);
      e = e.format || f;
      f = N(255, J(h.r, 0));
      g = N(255, J(h.g, 0));
      h = N(255, J(h.b, 0));
      this._originalInput = a;
      this._r = f;
      this._g = g;
      this._b = h;
      this._a = k;
      this._roundA = F(100 * this._a) / 100;
      this._format = c.format || e;
      this._gradientType = c.gradientType;
      1 > this._r && (this._r = F(this._r));
      1 > this._g && (this._g = F(this._g));
      1 > this._b && (this._b = F(this._b));
      this._ok = d;
      this._tc_id = aa++;
    };
    E.prototype = {isDark:function() {
      return 128 > this.getBrightness();
    }, isLight:function() {
      return !this.isDark();
    }, isValid:function() {
      return this._ok;
    }, getOriginalInput:function() {
      return this._originalInput;
    }, getFormat:function() {
      return this._format;
    }, getAlpha:function() {
      return this._a;
    }, getBrightness:function() {
      var a = this.toRgb();
      return (299 * a.r + 587 * a.g + 114 * a.b) / 1E3;
    }, setAlpha:function(a) {
      this._a = fa(a);
      this._roundA = F(100 * this._a) / 100;
      return this;
    }, toHsv:function() {
      var a = c(this._r, this._g, this._b);
      return {h:360 * a.h, s:a.s, v:a.v, a:this._a};
    }, toHsvString:function() {
      var a = c(this._r, this._g, this._b), b = F(360 * a.h), d = F(100 * a.s), a = F(100 * a.v);
      return 1 == this._a ? "hsv(" + b + ", " + d + "%, " + a + "%)" : "hsva(" + b + ", " + d + "%, " + a + "%, " + this._roundA + ")";
    }, toHsl:function() {
      var b = a(this._r, this._g, this._b);
      return {h:360 * b.h, s:b.s, l:b.l, a:this._a};
    }, toHslString:function() {
      var b = a(this._r, this._g, this._b), c = F(360 * b.h), d = F(100 * b.s), b = F(100 * b.l);
      return 1 == this._a ? "hsl(" + c + ", " + d + "%, " + b + "%)" : "hsla(" + c + ", " + d + "%, " + b + "%, " + this._roundA + ")";
    }, toHex:function(a) {
      return d(this._r, this._g, this._b, a);
    }, toHexString:function(a) {
      return "#" + this.toHex(a);
    }, toHex8:function() {
      return e(this._r, this._g, this._b, this._a);
    }, toHex8String:function() {
      return "#" + this.toHex8();
    }, toRgb:function() {
      return {r:F(this._r), g:F(this._g), b:F(this._b), a:this._a};
    }, toRgbString:function() {
      return 1 == this._a ? "rgb(" + F(this._r) + ", " + F(this._g) + ", " + F(this._b) + ")" : "rgba(" + F(this._r) + ", " + F(this._g) + ", " + F(this._b) + ", " + this._roundA + ")";
    }, toPercentageRgb:function() {
      return {r:F(100 * V(this._r, 255)) + "%", g:F(100 * V(this._g, 255)) + "%", b:F(100 * V(this._b, 255)) + "%", a:this._a};
    }, toPercentageRgbString:function() {
      return 1 == this._a ? "rgb(" + F(100 * V(this._r, 255)) + "%, " + F(100 * V(this._g, 255)) + "%, " + F(100 * V(this._b, 255)) + "%)" : "rgba(" + F(100 * V(this._r, 255)) + "%, " + F(100 * V(this._g, 255)) + "%, " + F(100 * V(this._b, 255)) + "%, " + this._roundA + ")";
    }, toName:function() {
      return 0 === this._a ? "transparent" : 1 > this._a ? !1 : ma[d(this._r, this._g, this._b, !0)] || !1;
    }, toFilter:function(a) {
      var b = "#" + e(this._r, this._g, this._b, this._a), c = b, d = this._gradientType ? "GradientType = 1, " : "";
      a && (c = E(a).toHex8String());
      return "progid:DXImageTransform.Microsoft.gradient(" + d + "startColorstr=" + b + ",endColorstr=" + c + ")";
    }, toString:function(a) {
      var b = !!a;
      a = a || this._format;
      var c = !1, d = 1 > this._a && 0 <= this._a;
      if (!b && d && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a)) {
        return "name" === a && 0 === this._a ? this.toName() : this.toRgbString();
      }
      "rgb" === a && (c = this.toRgbString());
      "prgb" === a && (c = this.toPercentageRgbString());
      if ("hex" === a || "hex6" === a) {
        c = this.toHexString();
      }
      "hex3" === a && (c = this.toHexString(!0));
      "hex8" === a && (c = this.toHex8String());
      "name" === a && (c = this.toName());
      "hsl" === a && (c = this.toHslString());
      "hsv" === a && (c = this.toHsvString());
      return c || this.toHexString();
    }, _applyModification:function(a, b) {
      var c = a.apply(null, [this].concat([].slice.call(b)));
      this._r = c._r;
      this._g = c._g;
      this._b = c._b;
      this.setAlpha(c._a);
      return this;
    }, lighten:function() {
      return this._applyModification(k, arguments);
    }, brighten:function() {
      return this._applyModification(l, arguments);
    }, darken:function() {
      return this._applyModification(m, arguments);
    }, desaturate:function() {
      return this._applyModification(f, arguments);
    }, saturate:function() {
      return this._applyModification(g, arguments);
    }, greyscale:function() {
      return this._applyModification(h, arguments);
    }, spin:function() {
      return this._applyModification(n, arguments);
    }, _applyCombination:function(a, b) {
      return a.apply(null, [this].concat([].slice.call(b)));
    }, analogous:function() {
      return this._applyCombination(S, arguments);
    }, complement:function() {
      return this._applyCombination(p, arguments);
    }, monochromatic:function() {
      return this._applyCombination(ja, arguments);
    }, splitcomplement:function() {
      return this._applyCombination(t, arguments);
    }, triad:function() {
      return this._applyCombination(q, arguments);
    }, tetrad:function() {
      return this._applyCombination(r, arguments);
    }};
    E.fromRatio = function(a, b) {
      if ("object" == typeof a) {
        var c = {}, d;
        for (d in a) {
          a.hasOwnProperty(d) && (c[d] = "a" === d ? a[d] : M(a[d]));
        }
        a = c;
      }
      return E(a, b);
    };
    E.equals = function(a, b) {
      return a && b ? E(a).toRgbString() == E(b).toRgbString() : !1;
    };
    E.random = function() {
      return E.fromRatio({r:ga(), g:ga(), b:ga()});
    };
    E.mix = function(a, b, c) {
      c = 0 === c ? 0 : c || 50;
      a = E(a).toRgb();
      b = E(b).toRgb();
      c /= 100;
      var d = 2 * c - 1, e = b.a - a.a, d = ((-1 == d * e ? d : (d + e) / (1 + d * e)) + 1) / 2, e = 1 - d;
      return E({r:b.r * d + a.r * e, g:b.g * d + a.g * e, b:b.b * d + a.b * e, a:b.a * c + a.a * (1 - c)});
    };
    E.readability = function(a, b) {
      var c = E(a), d = E(b), e = c.toRgb(), f = d.toRgb(), c = c.getBrightness(), d = d.getBrightness(), e = Math.max(e.r, f.r) - Math.min(e.r, f.r) + Math.max(e.g, f.g) - Math.min(e.g, f.g) + Math.max(e.b, f.b) - Math.min(e.b, f.b);
      return {brightness:Math.abs(c - d), color:e};
    };
    E.isReadable = function(a, b) {
      var c = E.readability(a, b);
      return 125 < c.brightness && 500 < c.color;
    };
    E.mostReadable = function(a, b) {
      for (var c = null, d = 0, e = !1, f = 0;f < b.length;f++) {
        var g = E.readability(a, b[f]), h = 125 < g.brightness && 500 < g.color, g = g.brightness / 125 * 3 + g.color / 500;
        if (h && !e || h && e && g > d || !h && !e && g > d) {
          e = h, d = g, c = E(b[f]);
        }
      }
      return c;
    };
    var ia = E.names = {aliceblue:"f0f8ff", antiquewhite:"faebd7", aqua:"0ff", aquamarine:"7fffd4", azure:"f0ffff", beige:"f5f5dc", bisque:"ffe4c4", black:"000", blanchedalmond:"ffebcd", blue:"00f", blueviolet:"8a2be2", brown:"a52a2a", burlywood:"deb887", burntsienna:"ea7e5d", cadetblue:"5f9ea0", chartreuse:"7fff00", chocolate:"d2691e", coral:"ff7f50", cornflowerblue:"6495ed", cornsilk:"fff8dc", crimson:"dc143c", cyan:"0ff", darkblue:"00008b", darkcyan:"008b8b", darkgoldenrod:"b8860b", darkgray:"a9a9a9", 
    darkgreen:"006400", darkgrey:"a9a9a9", darkkhaki:"bdb76b", darkmagenta:"8b008b", darkolivegreen:"556b2f", darkorange:"ff8c00", darkorchid:"9932cc", darkred:"8b0000", darksalmon:"e9967a", darkseagreen:"8fbc8f", darkslateblue:"483d8b", darkslategray:"2f4f4f", darkslategrey:"2f4f4f", darkturquoise:"00ced1", darkviolet:"9400d3", deeppink:"ff1493", deepskyblue:"00bfff", dimgray:"696969", dimgrey:"696969", dodgerblue:"1e90ff", firebrick:"b22222", floralwhite:"fffaf0", forestgreen:"228b22", fuchsia:"f0f", 
    gainsboro:"dcdcdc", ghostwhite:"f8f8ff", gold:"ffd700", goldenrod:"daa520", gray:"808080", green:"008000", greenyellow:"adff2f", grey:"808080", honeydew:"f0fff0", hotpink:"ff69b4", indianred:"cd5c5c", indigo:"4b0082", ivory:"fffff0", khaki:"f0e68c", lavender:"e6e6fa", lavenderblush:"fff0f5", lawngreen:"7cfc00", lemonchiffon:"fffacd", lightblue:"add8e6", lightcoral:"f08080", lightcyan:"e0ffff", lightgoldenrodyellow:"fafad2", lightgray:"d3d3d3", lightgreen:"90ee90", lightgrey:"d3d3d3", lightpink:"ffb6c1", 
    lightsalmon:"ffa07a", lightseagreen:"20b2aa", lightskyblue:"87cefa", lightslategray:"789", lightslategrey:"789", lightsteelblue:"b0c4de", lightyellow:"ffffe0", lime:"0f0", limegreen:"32cd32", linen:"faf0e6", magenta:"f0f", maroon:"800000", mediumaquamarine:"66cdaa", mediumblue:"0000cd", mediumorchid:"ba55d3", mediumpurple:"9370db", mediumseagreen:"3cb371", mediumslateblue:"7b68ee", mediumspringgreen:"00fa9a", mediumturquoise:"48d1cc", mediumvioletred:"c71585", midnightblue:"191970", mintcream:"f5fffa", 
    mistyrose:"ffe4e1", moccasin:"ffe4b5", navajowhite:"ffdead", navy:"000080", oldlace:"fdf5e6", olive:"808000", olivedrab:"6b8e23", orange:"ffa500", orangered:"ff4500", orchid:"da70d6", palegoldenrod:"eee8aa", palegreen:"98fb98", paleturquoise:"afeeee", palevioletred:"db7093", papayawhip:"ffefd5", peachpuff:"ffdab9", peru:"cd853f", pink:"ffc0cb", plum:"dda0dd", powderblue:"b0e0e6", purple:"800080", rebeccapurple:"663399", red:"f00", rosybrown:"bc8f8f", royalblue:"4169e1", saddlebrown:"8b4513", 
    salmon:"fa8072", sandybrown:"f4a460", seagreen:"2e8b57", seashell:"fff5ee", sienna:"a0522d", silver:"c0c0c0", skyblue:"87ceeb", slateblue:"6a5acd", slategray:"708090", slategrey:"708090", snow:"fffafa", springgreen:"00ff7f", steelblue:"4682b4", tan:"d2b48c", teal:"008080", thistle:"d8bfd8", tomato:"ff6347", turquoise:"40e0d0", violet:"ee82ee", wheat:"f5deb3", white:"fff", whitesmoke:"f5f5f5", yellow:"ff0", yellowgreen:"9acd32"}, ma = E.hexNames = function(a) {
      var b = {}, c;
      for (c in a) {
        a.hasOwnProperty(c) && (b[a[c]] = c);
      }
      return b;
    }(ia), Y = {rgb:/rgb[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/, rgba:/rgba[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/, hsl:/hsl[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/, 
    hsla:/hsla[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/, hsv:/hsv[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/, hsva:/hsva[\s|\(]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))[,|\s]+((?:[-\+]?\d*\.\d+%?)|(?:[-\+]?\d+%?))\s*\)?/, 
    hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};
    window.tinycolor = E;
  })();
  a(function() {
    a.fn.spectrum.load && a.fn.spectrum.processNativeColorInputs();
  });
});