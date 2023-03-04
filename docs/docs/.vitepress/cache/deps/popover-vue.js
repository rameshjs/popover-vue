import {
  computed,
  createBaseVNode,
  createElementBlock,
  getCurrentScope,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  ref,
  renderSlot,
  unref,
  vShow,
  watch,
  withDirectives
} from "./chunk-R647EDCJ.js";

// node_modules/popover-vue/dist/popover-vue.mjs
import "/home/ramesh/Desktop/popper-docs/node_modules/popover-vue/dist/index.css";
function U(t) {
  return t.split("-")[1];
}
function ft(t) {
  return t === "y" ? "height" : "width";
}
function B(t) {
  return t.split("-")[0];
}
function X(t) {
  return ["top", "bottom"].includes(B(t)) ? "x" : "y";
}
function wt(t, e, n) {
  let { reference: o, floating: s } = t;
  const l = o.x + o.width / 2 - s.width / 2, r = o.y + o.height / 2 - s.height / 2, i = X(e), p = ft(i), u = o[p] / 2 - s[p] / 2, m = i === "x";
  let a;
  switch (B(e)) {
    case "top":
      a = { x: l, y: o.y - s.height };
      break;
    case "bottom":
      a = { x: l, y: o.y + o.height };
      break;
    case "right":
      a = { x: o.x + o.width, y: r };
      break;
    case "left":
      a = { x: o.x - s.width, y: r };
      break;
    default:
      a = { x: o.x, y: o.y };
  }
  switch (U(e)) {
    case "start":
      a[i] -= u * (n && m ? -1 : 1);
      break;
    case "end":
      a[i] += u * (n && m ? -1 : 1);
  }
  return a;
}
var ee = async (t, e, n) => {
  const { placement: o = "bottom", strategy: s = "absolute", middleware: l = [], platform: r } = n, i = l.filter(Boolean), p = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let u = await r.getElementRects({ reference: t, floating: e, strategy: s }), { x: m, y: a } = wt(u, o, p), c = o, f = {}, d = 0;
  for (let g = 0; g < i.length; g++) {
    const { name: h, fn: v } = i[g], { x: y, y: w, data: b, reset: x } = await v({ x: m, y: a, initialPlacement: o, placement: c, strategy: s, middlewareData: f, rects: u, platform: r, elements: { reference: t, floating: e } });
    m = y ?? m, a = w ?? a, f = { ...f, [h]: { ...f[h], ...b } }, x && d <= 50 && (d++, typeof x == "object" && (x.placement && (c = x.placement), x.rects && (u = x.rects === true ? await r.getElementRects({ reference: t, floating: e, strategy: s }) : x.rects), { x: m, y: a } = wt(u, c, p)), g = -1);
  }
  return { x: m, y: a, placement: c, strategy: s, middlewareData: f };
};
function kt(t) {
  return typeof t != "number" ? function(e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e };
  }(t) : { top: t, right: t, bottom: t, left: t };
}
function it(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height };
}
async function $t(t, e) {
  var n;
  e === void 0 && (e = {});
  const { x: o, y: s, platform: l, rects: r, elements: i, strategy: p } = t, { boundary: u = "clippingAncestors", rootBoundary: m = "viewport", elementContext: a = "floating", altBoundary: c = false, padding: f = 0 } = e, d = kt(f), g = i[c ? a === "floating" ? "reference" : "floating" : a], h = it(await l.getClippingRect({ element: (n = await (l.isElement == null ? void 0 : l.isElement(g))) == null || n ? g : g.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(i.floating)), boundary: u, rootBoundary: m, strategy: p })), v = a === "floating" ? { ...r.floating, x: o, y: s } : r.reference, y = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(i.floating)), w = await (l.isElement == null ? void 0 : l.isElement(y)) && await (l.getScale == null ? void 0 : l.getScale(y)) || { x: 1, y: 1 }, b = it(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: v, offsetParent: y, strategy: p }) : v);
  return { top: (h.top - b.top + d.top) / w.y, bottom: (b.bottom - h.bottom + d.bottom) / w.y, left: (h.left - b.left + d.left) / w.x, right: (b.right - h.right + d.right) / w.x };
}
var ne = Math.min;
var oe = Math.max;
function lt(t, e, n) {
  return oe(t, ne(e, n));
}
var re = (t) => ({ name: "arrow", options: t, async fn(e) {
  const { element: n, padding: o = 0 } = t || {}, { x: s, y: l, placement: r, rects: i, platform: p } = e;
  if (n == null)
    return {};
  const u = kt(o), m = { x: s, y: l }, a = X(r), c = ft(a), f = await p.getDimensions(n), d = a === "y" ? "top" : "left", g = a === "y" ? "bottom" : "right", h = i.reference[c] + i.reference[a] - m[a] - i.floating[c], v = m[a] - i.reference[a], y = await (p.getOffsetParent == null ? void 0 : p.getOffsetParent(n));
  let w = y ? a === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0;
  w === 0 && (w = i.floating[c]);
  const b = h / 2 - v / 2, x = u[d], I = w - f[c] - u[g], O = w / 2 - f[c] / 2 + b, W = lt(x, O, I), Y = U(r) != null && O != W && i.reference[c] / 2 - (O < x ? u[d] : u[g]) - f[c] / 2 < 0;
  return { [a]: m[a] - (Y ? O < x ? x - O : I - O : 0), data: { [a]: W, centerOffset: O - W } };
} });
var ie = ["top", "right", "bottom", "left"];
ie.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);
var le = { left: "right", right: "left", bottom: "top", top: "bottom" };
function q(t) {
  return t.replace(/left|right|bottom|top/g, (e) => le[e]);
}
function se(t, e, n) {
  n === void 0 && (n = false);
  const o = U(t), s = X(t), l = ft(s);
  let r = s === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[l] > e.floating[l] && (r = q(r)), { main: r, cross: q(r) };
}
var ae = { start: "end", end: "start" };
function et(t) {
  return t.replace(/start|end/g, (e) => ae[e]);
}
var ce = function(t) {
  return t === void 0 && (t = {}), { name: "flip", options: t, async fn(e) {
    var n;
    const { placement: o, middlewareData: s, rects: l, initialPlacement: r, platform: i, elements: p } = e, { mainAxis: u = true, crossAxis: m = true, fallbackPlacements: a, fallbackStrategy: c = "bestFit", fallbackAxisSideDirection: f = "none", flipAlignment: d = true, ...g } = t, h = B(o), v = B(r) === r, y = await (i.isRTL == null ? void 0 : i.isRTL(p.floating)), w = a || (v || !d ? [q(r)] : function(_) {
      const T = q(_);
      return [et(_), T, et(T)];
    }(r));
    a || f === "none" || w.push(...function(_, T, D, k) {
      const L = U(_);
      let P = function(N, Z, jt) {
        const mt = ["left", "right"], gt = ["right", "left"], Ut = ["top", "bottom"], Xt = ["bottom", "top"];
        switch (N) {
          case "top":
          case "bottom":
            return jt ? Z ? gt : mt : Z ? mt : gt;
          case "left":
          case "right":
            return Z ? Ut : Xt;
          default:
            return [];
        }
      }(B(_), D === "start", k);
      return L && (P = P.map((N) => N + "-" + L), T && (P = P.concat(P.map(et)))), P;
    }(r, d, f, y));
    const b = [r, ...w], x = await $t(e, g), I = [];
    let O = ((n = s.flip) == null ? void 0 : n.overflows) || [];
    if (u && I.push(x[h]), m) {
      const { main: _, cross: T } = se(o, l, y);
      I.push(x[_], x[T]);
    }
    if (O = [...O, { placement: o, overflows: I }], !I.every((_) => _ <= 0)) {
      var W, Y;
      const _ = (((W = s.flip) == null ? void 0 : W.index) || 0) + 1, T = b[_];
      if (T)
        return { data: { index: _, overflows: O }, reset: { placement: T } };
      let D = (Y = O.filter((k) => k.overflows[0] <= 0).sort((k, L) => k.overflows[1] - L.overflows[1])[0]) == null ? void 0 : Y.placement;
      if (!D)
        switch (c) {
          case "bestFit": {
            var dt;
            const k = (dt = O.map((L) => [L.placement, L.overflows.filter((P) => P > 0).reduce((P, N) => P + N, 0)]).sort((L, P) => L[1] - P[1])[0]) == null ? void 0 : dt[0];
            k && (D = k);
            break;
          }
          case "initialPlacement":
            D = r;
        }
      if (o !== D)
        return { reset: { placement: D } };
    }
    return {};
  } };
};
var ue = function(t) {
  return t === void 0 && (t = 0), { name: "offset", options: t, async fn(e) {
    const { x: n, y: o } = e, s = await async function(l, r) {
      const { placement: i, platform: p, elements: u } = l, m = await (p.isRTL == null ? void 0 : p.isRTL(u.floating)), a = B(i), c = U(i), f = X(i) === "x", d = ["left", "top"].includes(a) ? -1 : 1, g = m && f ? -1 : 1, h = typeof r == "function" ? r(l) : r;
      let { mainAxis: v, crossAxis: y, alignmentAxis: w } = typeof h == "number" ? { mainAxis: h, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...h };
      return c && typeof w == "number" && (y = c === "end" ? -1 * w : w), f ? { x: y * g, y: v * d } : { x: v * d, y: y * g };
    }(e, t);
    return { x: n + s.x, y: o + s.y, data: s };
  } };
};
function fe(t) {
  return t === "x" ? "y" : "x";
}
var pe = function(t) {
  return t === void 0 && (t = {}), { name: "shift", options: t, async fn(e) {
    const { x: n, y: o, placement: s } = e, { mainAxis: l = true, crossAxis: r = false, limiter: i = { fn: (h) => {
      let { x: v, y } = h;
      return { x: v, y };
    } }, ...p } = t, u = { x: n, y: o }, m = await $t(e, p), a = X(B(s)), c = fe(a);
    let f = u[a], d = u[c];
    if (l) {
      const h = a === "y" ? "bottom" : "right";
      f = lt(f + m[a === "y" ? "top" : "left"], f, f - m[h]);
    }
    if (r) {
      const h = c === "y" ? "bottom" : "right";
      d = lt(d + m[c === "y" ? "top" : "left"], d, d - m[h]);
    }
    const g = i.fn({ ...e, [a]: f, [c]: d });
    return { ...g, data: { x: g.x - n, y: g.y - o } };
  } };
};
function E(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function R(t) {
  return E(t).getComputedStyle(t);
}
var xt = Math.min;
var M = Math.max;
var z = Math.round;
function Ct(t) {
  const e = R(t);
  let n = parseFloat(e.width), o = parseFloat(e.height);
  const s = t.offsetWidth, l = t.offsetHeight, r = z(n) !== s || z(o) !== l;
  return r && (n = s, o = l), { width: n, height: o, fallback: r };
}
function S(t) {
  return It(t) ? (t.nodeName || "").toLowerCase() : "";
}
var G;
function St() {
  if (G)
    return G;
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? (G = t.brands.map((e) => e.brand + "/" + e.version).join(" "), G) : navigator.userAgent;
}
function A(t) {
  return t instanceof E(t).HTMLElement;
}
function $(t) {
  return t instanceof E(t).Element;
}
function It(t) {
  return t instanceof E(t).Node;
}
function bt(t) {
  return typeof ShadowRoot > "u" ? false : t instanceof E(t).ShadowRoot || t instanceof ShadowRoot;
}
function K(t) {
  const { overflow: e, overflowX: n, overflowY: o, display: s } = R(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(s);
}
function de(t) {
  return ["table", "td", "th"].includes(S(t));
}
function st(t) {
  const e = /firefox/i.test(St()), n = R(t), o = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!o && o !== "none" || e && n.willChange === "filter" || e && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((s) => n.willChange.includes(s)) || ["paint", "layout", "strict", "content"].some((s) => {
    const l = n.contain;
    return l != null && l.includes(s);
  });
}
function at() {
  return /^((?!chrome|android).)*safari/i.test(St());
}
function pt(t) {
  return ["html", "body", "#document"].includes(S(t));
}
function Dt(t) {
  return $(t) ? t : t.contextElement;
}
var Bt = { x: 1, y: 1 };
function F(t) {
  const e = Dt(t);
  if (!A(e))
    return Bt;
  const n = e.getBoundingClientRect(), { width: o, height: s, fallback: l } = Ct(e);
  let r = (l ? z(n.width) : n.width) / o, i = (l ? z(n.height) : n.height) / s;
  return r && Number.isFinite(r) || (r = 1), i && Number.isFinite(i) || (i = 1), { x: r, y: i };
}
function Q(t, e, n, o) {
  var s, l;
  e === void 0 && (e = false), n === void 0 && (n = false);
  const r = t.getBoundingClientRect(), i = Dt(t);
  let p = Bt;
  e && (o ? $(o) && (p = F(o)) : p = F(t));
  const u = i ? E(i) : window, m = at() && n;
  let a = (r.left + (m && ((s = u.visualViewport) == null ? void 0 : s.offsetLeft) || 0)) / p.x, c = (r.top + (m && ((l = u.visualViewport) == null ? void 0 : l.offsetTop) || 0)) / p.y, f = r.width / p.x, d = r.height / p.y;
  if (i) {
    const g = E(i), h = o && $(o) ? E(o) : o;
    let v = g.frameElement;
    for (; v && o && h !== g; ) {
      const y = F(v), w = v.getBoundingClientRect(), b = getComputedStyle(v);
      w.x += (v.clientLeft + parseFloat(b.paddingLeft)) * y.x, w.y += (v.clientTop + parseFloat(b.paddingTop)) * y.y, a *= y.x, c *= y.y, f *= y.x, d *= y.y, a += w.x, c += w.y, v = E(v).frameElement;
    }
  }
  return { width: f, height: d, top: c, right: a + f, bottom: c + d, left: a, x: a, y: c };
}
function C(t) {
  return ((It(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function J(t) {
  return $(t) ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop } : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function Wt(t) {
  return Q(C(t)).left + J(t).scrollLeft;
}
function j(t) {
  if (S(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || bt(t) && t.host || C(t);
  return bt(e) ? e.host : e;
}
function Ft(t) {
  const e = j(t);
  return pt(e) ? e.ownerDocument.body : A(e) && K(e) ? e : Ft(e);
}
function Nt(t, e) {
  var n;
  e === void 0 && (e = []);
  const o = Ft(t), s = o === ((n = t.ownerDocument) == null ? void 0 : n.body), l = E(o);
  return s ? e.concat(l, l.visualViewport || [], K(o) ? o : []) : e.concat(o, Nt(o));
}
function Ot(t, e, n) {
  let o;
  if (e === "viewport")
    o = function(r, i) {
      const p = E(r), u = C(r), m = p.visualViewport;
      let a = u.clientWidth, c = u.clientHeight, f = 0, d = 0;
      if (m) {
        a = m.width, c = m.height;
        const g = at();
        (!g || g && i === "fixed") && (f = m.offsetLeft, d = m.offsetTop);
      }
      return { width: a, height: c, x: f, y: d };
    }(t, n);
  else if (e === "document")
    o = function(r) {
      const i = C(r), p = J(r), u = r.ownerDocument.body, m = M(i.scrollWidth, i.clientWidth, u.scrollWidth, u.clientWidth), a = M(i.scrollHeight, i.clientHeight, u.scrollHeight, u.clientHeight);
      let c = -p.scrollLeft + Wt(r);
      const f = -p.scrollTop;
      return R(u).direction === "rtl" && (c += M(i.clientWidth, u.clientWidth) - m), { width: m, height: a, x: c, y: f };
    }(C(t));
  else if ($(e))
    o = function(r, i) {
      const p = Q(r, true, i === "fixed"), u = p.top + r.clientTop, m = p.left + r.clientLeft, a = A(r) ? F(r) : { x: 1, y: 1 };
      return { width: r.clientWidth * a.x, height: r.clientHeight * a.y, x: m * a.x, y: u * a.y };
    }(e, n);
  else {
    const r = { ...e };
    if (at()) {
      var s, l;
      const i = E(t);
      r.x -= ((s = i.visualViewport) == null ? void 0 : s.offsetLeft) || 0, r.y -= ((l = i.visualViewport) == null ? void 0 : l.offsetTop) || 0;
    }
    o = r;
  }
  return it(o);
}
function Et(t, e) {
  return A(t) && R(t).position !== "fixed" ? e ? e(t) : t.offsetParent : null;
}
function _t(t, e) {
  const n = E(t);
  let o = Et(t, e);
  for (; o && de(o) && R(o).position === "static"; )
    o = Et(o, e);
  return o && (S(o) === "html" || S(o) === "body" && R(o).position === "static" && !st(o)) ? n : o || function(s) {
    let l = j(s);
    for (; A(l) && !pt(l); ) {
      if (st(l))
        return l;
      l = j(l);
    }
    return null;
  }(t) || n;
}
function me(t, e, n) {
  const o = A(e), s = C(e), l = Q(t, true, n === "fixed", e);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const i = { x: 0, y: 0 };
  if (o || !o && n !== "fixed")
    if ((S(e) !== "body" || K(s)) && (r = J(e)), A(e)) {
      const p = Q(e, true);
      i.x = p.x + e.clientLeft, i.y = p.y + e.clientTop;
    } else
      s && (i.x = Wt(s));
  return { x: l.left + r.scrollLeft - i.x, y: l.top + r.scrollTop - i.y, width: l.width, height: l.height };
}
var ge = { getClippingRect: function(t) {
  let { element: e, boundary: n, rootBoundary: o, strategy: s } = t;
  const l = n === "clippingAncestors" ? function(u, m) {
    const a = m.get(u);
    if (a)
      return a;
    let c = Nt(u).filter((h) => $(h) && S(h) !== "body"), f = null;
    const d = R(u).position === "fixed";
    let g = d ? j(u) : u;
    for (; $(g) && !pt(g); ) {
      const h = R(g), v = st(g);
      h.position === "fixed" ? f = null : (d ? v || f : v || h.position !== "static" || !f || !["absolute", "fixed"].includes(f.position)) ? f = h : c = c.filter((y) => y !== g), g = j(g);
    }
    return m.set(u, c), c;
  }(e, this._c) : [].concat(n), r = [...l, o], i = r[0], p = r.reduce((u, m) => {
    const a = Ot(e, m, s);
    return u.top = M(a.top, u.top), u.right = xt(a.right, u.right), u.bottom = xt(a.bottom, u.bottom), u.left = M(a.left, u.left), u;
  }, Ot(e, i, s));
  return { width: p.right - p.left, height: p.bottom - p.top, x: p.left, y: p.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
  let { rect: e, offsetParent: n, strategy: o } = t;
  const s = A(n), l = C(n);
  if (n === l)
    return e;
  let r = { scrollLeft: 0, scrollTop: 0 }, i = { x: 1, y: 1 };
  const p = { x: 0, y: 0 };
  if ((s || !s && o !== "fixed") && ((S(n) !== "body" || K(l)) && (r = J(n)), A(n))) {
    const u = Q(n);
    i = F(n), p.x = u.x + n.clientLeft, p.y = u.y + n.clientTop;
  }
  return { width: e.width * i.x, height: e.height * i.y, x: e.x * i.x - r.scrollLeft * i.x + p.x, y: e.y * i.y - r.scrollTop * i.y + p.y };
}, isElement: $, getDimensions: function(t) {
  return A(t) ? Ct(t) : t.getBoundingClientRect();
}, getOffsetParent: _t, getDocumentElement: C, getScale: F, async getElementRects(t) {
  let { reference: e, floating: n, strategy: o } = t;
  const s = this.getOffsetParent || _t, l = this.getDimensions;
  return { reference: me(e, await s(n), o), floating: { x: 0, y: 0, ...await l(n) } };
}, getClientRects: (t) => Array.from(t.getClientRects()), isRTL: (t) => R(t).direction === "rtl" };
var he = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), s = { platform: ge, ...n }, l = { ...s.platform, _c: o };
  return ee(t, e, { ...s, platform: l });
};
var nt = (t, e, n, o) => {
  he(t, e, {
    placement: o,
    middleware: [
      ue(6),
      ce(),
      pe({ padding: 5 }),
      re({ element: n })
    ]
  }).then(({ x: s, y: l, placement: r, middlewareData: i }) => {
    Object.assign(e.style, {
      left: `${s}px`,
      top: `${l}px`
    });
    const { x: p, y: u } = i.arrow, m = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[r.split("-")[0]];
    Object.assign(n.style, {
      left: p != null ? `${p}px` : "",
      top: u != null ? `${u}px` : "",
      right: "",
      bottom: "",
      [m]: "-4px"
    });
  });
};
var Pt;
var Vt = typeof window < "u";
var ye = (t) => typeof t == "string";
var Ht = () => {
};
var ve = Vt && ((Pt = window == null ? void 0 : window.navigator) == null ? void 0 : Pt.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Mt(t) {
  return typeof t == "function" ? t() : unref(t);
}
function we(t) {
  return t;
}
function xe(t) {
  return getCurrentScope() ? (onScopeDispose(t), true) : false;
}
function H(t) {
  var e;
  const n = Mt(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
var Qt = Vt ? window : void 0;
function ot(...t) {
  let e, n, o, s;
  if (ye(t[0]) || Array.isArray(t[0]) ? ([n, o, s] = t, e = Qt) : [e, n, o, s] = t, !e)
    return Ht;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const l = [], r = () => {
    l.forEach((m) => m()), l.length = 0;
  }, i = (m, a, c, f) => (m.addEventListener(a, c, f), () => m.removeEventListener(a, c, f)), p = watch(() => [H(e), Mt(s)], ([m, a]) => {
    r(), m && l.push(...n.flatMap((c) => o.map((f) => i(m, c, f, a))));
  }, { immediate: true, flush: "post" }), u = () => {
    p(), r();
  };
  return xe(u), u;
}
var Rt = false;
function be(t, e, n = {}) {
  const { window: o = Qt, ignore: s = [], capture: l = true, detectIframe: r = false } = n;
  if (!o)
    return;
  ve && !Rt && (Rt = true, Array.from(o.document.body.children).forEach((c) => c.addEventListener("click", Ht)));
  let i = true;
  const p = (c) => s.some((f) => {
    if (typeof f == "string")
      return Array.from(o.document.querySelectorAll(f)).some((d) => d === c.target || c.composedPath().includes(d));
    {
      const d = H(f);
      return d && (c.target === d || c.composedPath().includes(d));
    }
  }), m = [
    ot(o, "click", (c) => {
      const f = H(t);
      if (!(!f || f === c.target || c.composedPath().includes(f))) {
        if (c.detail === 0 && (i = !p(c)), !i) {
          i = true;
          return;
        }
        e(c);
      }
    }, { passive: true, capture: l }),
    ot(o, "pointerdown", (c) => {
      const f = H(t);
      f && (i = !c.composedPath().includes(f) && !p(c));
    }, { passive: true }),
    r && ot(o, "blur", (c) => {
      var f;
      const d = H(t);
      ((f = o.document.activeElement) == null ? void 0 : f.tagName) === "IFRAME" && !(d != null && d.contains(o.document.activeElement)) && e(c);
    })
  ].filter(Boolean);
  return () => m.forEach((c) => c());
}
var ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var ut = "__vueuse_ssr_handlers__";
ct[ut] = ct[ut] || {};
ct[ut];
var At;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})(At || (At = {}));
var Oe = Object.defineProperty;
var Tt = Object.getOwnPropertySymbols;
var Ee = Object.prototype.hasOwnProperty;
var _e = Object.prototype.propertyIsEnumerable;
var Lt = (t, e, n) => e in t ? Oe(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n;
var Pe = (t, e) => {
  for (var n in e || (e = {}))
    Ee.call(e, n) && Lt(t, n, e[n]);
  if (Tt)
    for (var n of Tt(e))
      _e.call(e, n) && Lt(t, n, e[n]);
  return t;
};
var Re = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Pe({
  linear: we
}, Re);
var Ae = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
};
var Te = {
  name: "BasePopover"
};
var Le = Object.assign(Te, {
  props: {
    hover: {
      type: Boolean,
      default: false
    },
    clickOutside: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: null
    }
  },
  emits: ["open:popover", "close:popover"],
  setup(t, { emit: e }) {
    const n = t, o = ref(null), s = ref(null), l = ref(null), r = ref(null), i = ref(false), p = computed(() => n.show);
    watch(i, (d) => {
      e(d ? "open:popover" : "close:popover");
    }), watch(p, (d) => {
      nt(
        o.value,
        s.value,
        l.value,
        n.placement
      ), i.value = d;
    });
    const u = (d) => {
      nt(
        d.target,
        s.value,
        l.value,
        n.placement
      ), i.value = !i.value;
    }, m = (d) => {
      nt(
        d.target,
        s.value,
        l.value,
        n.placement
      ), i.value = true;
    }, a = () => {
      n.show === null && (i.value = false);
    }, c = (d) => {
      n.hover && m(d);
    }, f = () => {
      n.hover && a();
    };
    return be(r, () => {
      n.clickOutside && a();
    }), onMounted(() => {
      [
        ["click", u],
        ["mouseenter", c],
        ["mouseleave", f],
        ["focus", m],
        ["blur", a]
      ].forEach(([d, g]) => {
        o.value.addEventListener(d, g);
      });
    }), onUnmounted(() => {
      [
        ["click", u],
        ["mouseenter", c],
        ["mouseleave", f],
        ["focus", m],
        ["blur", a]
      ].forEach(([d, g]) => {
        o.value.removeEventListener(d, g);
      });
    }), (d, g) => (openBlock(), createElementBlock("div", {
      ref_key: "popoverWrapper",
      ref: r,
      class: "popover-wrapper"
    }, [
      createBaseVNode("div", {
        class: "popover-trigger",
        ref_key: "popoverTrigger",
        ref: o
      }, [
        renderSlot(d.$slots, "default", {}, void 0, true)
      ], 512),
      withDirectives(createBaseVNode("div", {
        ref_key: "popoverContent",
        ref: s,
        class: "popover-content"
      }, [
        renderSlot(d.$slots, "content", {
          close: a,
          isOpen: i.value
        }, void 0, true),
        withDirectives(createBaseVNode("div", {
          ref_key: "popoverArrow",
          ref: l,
          class: "arrow"
        }, null, 512), [
          [vShow, t.arrow]
        ])
      ], 512), [
        [vShow, i.value && !t.disabled]
      ])
    ], 512));
  }
});
var $e = Ae(Le, [["__scopeId", "data-v-a3903e3e"]]);
export {
  $e as default
};
//# sourceMappingURL=popover-vue.js.map
