function Fs(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let o = 0; o < s.length; o++) n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
function Hs(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        o = xe(s) ? Hi(s) : Hs(s);
      if (o) for (const r in o) t[r] = o[r];
    }
    return t;
  } else {
    if (xe(e)) return e;
    if (me(e)) return e;
  }
}
const Oi = /;(?![^(]*\))/g,
  Bi = /:([^]+)/,
  Fi = /\/\*.*?\*\//gs;
function Hi(e) {
  const t = {};
  return (
    e
      .replace(Fi, "")
      .split(Oi)
      .forEach((n) => {
        if (n) {
          const s = n.split(Bi);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function ve(e) {
  let t = "";
  if (xe(e)) t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const s = ve(e[n]);
      s && (t += s + " ");
    }
  else if (me(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Ri =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Di = Fs(Ri);
function dr(e) {
  return !!e || e === "";
}
const ce = (e) =>
    xe(e)
      ? e
      : e == null
      ? ""
      : W(e) || (me(e) && (e.toString === vr || !Z(e.toString)))
      ? JSON.stringify(e, hr, 2)
      : String(e),
  hr = (e, t) =>
    t && t.__v_isRef
      ? hr(e, t.value)
      : Ft(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, o]) => ((n[`${s} =>`] = o), n),
            {}
          ),
        }
      : _r(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : me(t) && !W(t) && !mr(t)
      ? String(t)
      : t,
  ge = {},
  Bt = [],
  Ke = () => {},
  Ui = () => !1,
  zi = /^on[^a-z]/,
  mn = (e) => zi.test(e),
  Rs = (e) => e.startsWith("onUpdate:"),
  $e = Object.assign,
  Ds = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ji = Object.prototype.hasOwnProperty,
  re = (e, t) => ji.call(e, t),
  W = Array.isArray,
  Ft = (e) => zn(e) === "[object Map]",
  _r = (e) => zn(e) === "[object Set]",
  Z = (e) => typeof e == "function",
  xe = (e) => typeof e == "string",
  Us = (e) => typeof e == "symbol",
  me = (e) => e !== null && typeof e == "object",
  pr = (e) => me(e) && Z(e.then) && Z(e.catch),
  vr = Object.prototype.toString,
  zn = (e) => vr.call(e),
  Ki = (e) => zn(e).slice(8, -1),
  mr = (e) => zn(e) === "[object Object]",
  zs = (e) =>
    xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  tn = Fs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  jn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  qi = /-(\w)/g,
  Je = jn((e) => e.replace(qi, (t, n) => (n ? n.toUpperCase() : ""))),
  Wi = /\B([A-Z])/g,
  Yt = jn((e) => e.replace(Wi, "-$1").toLowerCase()),
  Kn = jn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  cs = jn((e) => (e ? `on${Kn(e)}` : "")),
  cn = (e, t) => !Object.is(e, t),
  as = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  An = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Gi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Yi = (e) => {
    const t = xe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let xo;
const Qi = () =>
  xo ||
  (xo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Ne;
class Xi {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ne),
      !t && Ne && (this.index = (Ne.scopes || (Ne.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ne;
      try {
        return (Ne = this), t();
      } finally {
        Ne = n;
      }
    }
  }
  on() {
    Ne = this;
  }
  off() {
    Ne = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Ji(e, t = Ne) {
  t && t.active && t.effects.push(e);
}
function gr() {
  return Ne;
}
function Zi(e) {
  Ne && Ne.cleanups.push(e);
}
const js = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  br = (e) => (e.w & _t) > 0,
  yr = (e) => (e.n & _t) > 0,
  el = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= _t;
  },
  tl = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const o = t[s];
        br(o) && !yr(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~_t),
          (o.n &= ~_t);
      }
      t.length = n;
    }
  },
  bs = new WeakMap();
let en = 0,
  _t = 1;
const ys = 30;
let ze;
const Lt = Symbol(""),
  xs = Symbol("");
class Ks {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Ji(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ze,
      n = dt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ze),
        (ze = this),
        (dt = !0),
        (_t = 1 << ++en),
        en <= ys ? el(this) : wo(this),
        this.fn()
      );
    } finally {
      en <= ys && tl(this),
        (_t = 1 << --en),
        (ze = this.parent),
        (dt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ze === this
      ? (this.deferStop = !0)
      : this.active &&
        (wo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function wo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let dt = !0;
const xr = [];
function Qt() {
  xr.push(dt), (dt = !1);
}
function Xt() {
  const e = xr.pop();
  dt = e === void 0 ? !0 : e;
}
function Ae(e, t, n) {
  if (dt && ze) {
    let s = bs.get(e);
    s || bs.set(e, (s = new Map()));
    let o = s.get(n);
    o || s.set(n, (o = js())), wr(o);
  }
}
function wr(e, t) {
  let n = !1;
  en <= ys ? yr(e) || ((e.n |= _t), (n = !br(e))) : (n = !e.has(ze)),
    n && (e.add(ze), ze.deps.push(e));
}
function st(e, t, n, s, o, r) {
  const i = bs.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && W(e)) {
    const c = Number(s);
    i.forEach((u, d) => {
      (d === "length" || d >= c) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        W(e)
          ? zs(n) && l.push(i.get("length"))
          : (l.push(i.get(Lt)), Ft(e) && l.push(i.get(xs)));
        break;
      case "delete":
        W(e) || (l.push(i.get(Lt)), Ft(e) && l.push(i.get(xs)));
        break;
      case "set":
        Ft(e) && l.push(i.get(Lt));
        break;
    }
  if (l.length === 1) l[0] && ws(l[0]);
  else {
    const c = [];
    for (const u of l) u && c.push(...u);
    ws(js(c));
  }
}
function ws(e, t) {
  const n = W(e) ? e : [...e];
  for (const s of n) s.computed && $o(s);
  for (const s of n) s.computed || $o(s);
}
function $o(e, t) {
  (e !== ze || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const nl = Fs("__proto__,__v_isRef,__isVue"),
  $r = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Us)
  ),
  sl = qs(),
  ol = qs(!1, !0),
  rl = qs(!0),
  ko = il();
function il() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = le(this);
        for (let r = 0, i = this.length; r < i; r++) Ae(s, "get", r + "");
        const o = s[t](...n);
        return o === -1 || o === !1 ? s[t](...n.map(le)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Qt();
        const s = le(this)[t].apply(this, n);
        return Xt(), s;
      };
    }),
    e
  );
}
function ll(e) {
  const t = le(this);
  return Ae(t, "has", e), t.hasOwnProperty(e);
}
function qs(e = !1, t = !1) {
  return function (s, o, r) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && r === (e ? (t ? $l : Tr) : t ? Sr : Cr).get(s))
      return s;
    const i = W(s);
    if (!e) {
      if (i && re(ko, o)) return Reflect.get(ko, o, r);
      if (o === "hasOwnProperty") return ll;
    }
    const l = Reflect.get(s, o, r);
    return (Us(o) ? $r.has(o) : nl(o)) || (e || Ae(s, "get", o), t)
      ? l
      : Ce(l)
      ? i && zs(o)
        ? l
        : l.value
      : me(l)
      ? e
        ? Ys(l)
        : Wn(l)
      : l;
  };
}
const cl = kr(),
  al = kr(!0);
function kr(e = !1) {
  return function (n, s, o, r) {
    let i = n[s];
    if (qt(i) && Ce(i) && !Ce(o)) return !1;
    if (
      !e &&
      (!Mn(o) && !qt(o) && ((i = le(i)), (o = le(o))), !W(n) && Ce(i) && !Ce(o))
    )
      return (i.value = o), !0;
    const l = W(n) && zs(s) ? Number(s) < n.length : re(n, s),
      c = Reflect.set(n, s, o, r);
    return (
      n === le(r) && (l ? cn(o, i) && st(n, "set", s, o) : st(n, "add", s, o)),
      c
    );
  };
}
function ul(e, t) {
  const n = re(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && st(e, "delete", t, void 0), s;
}
function fl(e, t) {
  const n = Reflect.has(e, t);
  return (!Us(t) || !$r.has(t)) && Ae(e, "has", t), n;
}
function dl(e) {
  return Ae(e, "iterate", W(e) ? "length" : Lt), Reflect.ownKeys(e);
}
const Pr = { get: sl, set: cl, deleteProperty: ul, has: fl, ownKeys: dl },
  hl = {
    get: rl,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  _l = $e({}, Pr, { get: ol, set: al }),
  Ws = (e) => e,
  qn = (e) => Reflect.getPrototypeOf(e);
function xn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = le(e),
    r = le(t);
  n || (t !== r && Ae(o, "get", t), Ae(o, "get", r));
  const { has: i } = qn(o),
    l = s ? Ws : n ? Xs : an;
  if (i.call(o, t)) return l(e.get(t));
  if (i.call(o, r)) return l(e.get(r));
  e !== o && e.get(t);
}
function wn(e, t = !1) {
  const n = this.__v_raw,
    s = le(n),
    o = le(e);
  return (
    t || (e !== o && Ae(s, "has", e), Ae(s, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function $n(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ae(le(e), "iterate", Lt), Reflect.get(e, "size", e)
  );
}
function Po(e) {
  e = le(e);
  const t = le(this);
  return qn(t).has.call(t, e) || (t.add(e), st(t, "add", e, e)), this;
}
function Co(e, t) {
  t = le(t);
  const n = le(this),
    { has: s, get: o } = qn(n);
  let r = s.call(n, e);
  r || ((e = le(e)), (r = s.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), r ? cn(t, i) && st(n, "set", e, t) : st(n, "add", e, t), this
  );
}
function So(e) {
  const t = le(this),
    { has: n, get: s } = qn(t);
  let o = n.call(t, e);
  o || ((e = le(e)), (o = n.call(t, e))), s && s.call(t, e);
  const r = t.delete(e);
  return o && st(t, "delete", e, void 0), r;
}
function To() {
  const e = le(this),
    t = e.size !== 0,
    n = e.clear();
  return t && st(e, "clear", void 0, void 0), n;
}
function kn(e, t) {
  return function (s, o) {
    const r = this,
      i = r.__v_raw,
      l = le(i),
      c = t ? Ws : e ? Xs : an;
    return (
      !e && Ae(l, "iterate", Lt), i.forEach((u, d) => s.call(o, c(u), c(d), r))
    );
  };
}
function Pn(e, t, n) {
  return function (...s) {
    const o = this.__v_raw,
      r = le(o),
      i = Ft(r),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      u = o[e](...s),
      d = n ? Ws : t ? Xs : an;
    return (
      !t && Ae(r, "iterate", c ? xs : Lt),
      {
        next() {
          const { value: p, done: v } = u.next();
          return v
            ? { value: p, done: v }
            : { value: l ? [d(p[0]), d(p[1])] : d(p), done: v };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function it(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function pl() {
  const e = {
      get(r) {
        return xn(this, r);
      },
      get size() {
        return $n(this);
      },
      has: wn,
      add: Po,
      set: Co,
      delete: So,
      clear: To,
      forEach: kn(!1, !1),
    },
    t = {
      get(r) {
        return xn(this, r, !1, !0);
      },
      get size() {
        return $n(this);
      },
      has: wn,
      add: Po,
      set: Co,
      delete: So,
      clear: To,
      forEach: kn(!1, !0),
    },
    n = {
      get(r) {
        return xn(this, r, !0);
      },
      get size() {
        return $n(this, !0);
      },
      has(r) {
        return wn.call(this, r, !0);
      },
      add: it("add"),
      set: it("set"),
      delete: it("delete"),
      clear: it("clear"),
      forEach: kn(!0, !1),
    },
    s = {
      get(r) {
        return xn(this, r, !0, !0);
      },
      get size() {
        return $n(this, !0);
      },
      has(r) {
        return wn.call(this, r, !0);
      },
      add: it("add"),
      set: it("set"),
      delete: it("delete"),
      clear: it("clear"),
      forEach: kn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      (e[r] = Pn(r, !1, !1)),
        (n[r] = Pn(r, !0, !1)),
        (t[r] = Pn(r, !1, !0)),
        (s[r] = Pn(r, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [vl, ml, gl, bl] = pl();
function Gs(e, t) {
  const n = t ? (e ? bl : gl) : e ? ml : vl;
  return (s, o, r) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? s
      : Reflect.get(re(n, o) && o in s ? n : s, o, r);
}
const yl = { get: Gs(!1, !1) },
  xl = { get: Gs(!1, !0) },
  wl = { get: Gs(!0, !1) },
  Cr = new WeakMap(),
  Sr = new WeakMap(),
  Tr = new WeakMap(),
  $l = new WeakMap();
function kl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Pl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : kl(Ki(e));
}
function Wn(e) {
  return qt(e) ? e : Qs(e, !1, Pr, yl, Cr);
}
function Cl(e) {
  return Qs(e, !1, _l, xl, Sr);
}
function Ys(e) {
  return Qs(e, !0, hl, wl, Tr);
}
function Qs(e, t, n, s, o) {
  if (!me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = o.get(e);
  if (r) return r;
  const i = Pl(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return o.set(e, l), l;
}
function Ht(e) {
  return qt(e) ? Ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function qt(e) {
  return !!(e && e.__v_isReadonly);
}
function Mn(e) {
  return !!(e && e.__v_isShallow);
}
function Lr(e) {
  return Ht(e) || qt(e);
}
function le(e) {
  const t = e && e.__v_raw;
  return t ? le(t) : e;
}
function nn(e) {
  return An(e, "__v_skip", !0), e;
}
const an = (e) => (me(e) ? Wn(e) : e),
  Xs = (e) => (me(e) ? Ys(e) : e);
function Vr(e) {
  dt && ze && ((e = le(e)), wr(e.dep || (e.dep = js())));
}
function Er(e, t) {
  e = le(e);
  const n = e.dep;
  n && ws(n);
}
function Ce(e) {
  return !!(e && e.__v_isRef === !0);
}
function ae(e) {
  return Ar(e, !1);
}
function Sl(e) {
  return Ar(e, !0);
}
function Ar(e, t) {
  return Ce(e) ? e : new Tl(e, t);
}
class Tl {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : le(t)),
      (this._value = n ? t : an(t));
  }
  get value() {
    return Vr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Mn(t) || qt(t);
    (t = n ? t : le(t)),
      cn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : an(t)), Er(this));
  }
}
function _(e) {
  return Ce(e) ? e.value : e;
}
const Ll = {
  get: (e, t, n) => _(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return Ce(o) && !Ce(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Mr(e) {
  return Ht(e) ? e : new Proxy(e, Ll);
}
var Ir;
class Vl {
  constructor(t, n, s, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Ir] = !1),
      (this._dirty = !0),
      (this.effect = new Ks(t, () => {
        this._dirty || ((this._dirty = !0), Er(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = le(this);
    return (
      Vr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
Ir = "__v_isReadonly";
function El(e, t, n = !1) {
  let s, o;
  const r = Z(e);
  return (
    r ? ((s = e), (o = Ke)) : ((s = e.get), (o = e.set)),
    new Vl(s, o, r || !o, n)
  );
}
function ht(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    Gn(r, t, n);
  }
  return o;
}
function Re(e, t, n, s) {
  if (Z(e)) {
    const r = ht(e, t, n, s);
    return (
      r &&
        pr(r) &&
        r.catch((i) => {
          Gn(i, t, n);
        }),
      r
    );
  }
  const o = [];
  for (let r = 0; r < e.length; r++) o.push(Re(e[r], t, n, s));
  return o;
}
function Gn(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy,
      l = n;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, i, l) === !1) return;
      }
      r = r.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      ht(c, null, 10, [e, i, l]);
      return;
    }
  }
  Al(e, n, o, s);
}
function Al(e, t, n, s = !0) {
  console.error(e);
}
let un = !1,
  $s = !1;
const Pe = [];
let Qe = 0;
const Rt = [];
let nt = null,
  Pt = 0;
const Nr = Promise.resolve();
let Js = null;
function Zs(e) {
  const t = Js || Nr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ml(e) {
  let t = Qe + 1,
    n = Pe.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    fn(Pe[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function eo(e) {
  (!Pe.length || !Pe.includes(e, un && e.allowRecurse ? Qe + 1 : Qe)) &&
    (e.id == null ? Pe.push(e) : Pe.splice(Ml(e.id), 0, e), Or());
}
function Or() {
  !un && !$s && (($s = !0), (Js = Nr.then(Br)));
}
function Il(e) {
  const t = Pe.indexOf(e);
  t > Qe && Pe.splice(t, 1);
}
function Nl(e) {
  W(e)
    ? Rt.push(...e)
    : (!nt || !nt.includes(e, e.allowRecurse ? Pt + 1 : Pt)) && Rt.push(e),
    Or();
}
function Lo(e, t = un ? Qe + 1 : 0) {
  for (; t < Pe.length; t++) {
    const n = Pe[t];
    n && n.pre && (Pe.splice(t, 1), t--, n());
  }
}
function In(e) {
  if (Rt.length) {
    const t = [...new Set(Rt)];
    if (((Rt.length = 0), nt)) {
      nt.push(...t);
      return;
    }
    for (nt = t, nt.sort((n, s) => fn(n) - fn(s)), Pt = 0; Pt < nt.length; Pt++)
      nt[Pt]();
    (nt = null), (Pt = 0);
  }
}
const fn = (e) => (e.id == null ? 1 / 0 : e.id),
  Ol = (e, t) => {
    const n = fn(e) - fn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Br(e) {
  ($s = !1), (un = !0), Pe.sort(Ol);
  const t = Ke;
  try {
    for (Qe = 0; Qe < Pe.length; Qe++) {
      const n = Pe[Qe];
      n && n.active !== !1 && ht(n, null, 14);
    }
  } finally {
    (Qe = 0),
      (Pe.length = 0),
      In(),
      (un = !1),
      (Js = null),
      (Pe.length || Rt.length) && Br();
  }
}
function Bl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ge;
  let o = n;
  const r = t.startsWith("update:"),
    i = r && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: p, trim: v } = s[d] || ge;
    v && (o = n.map((k) => (xe(k) ? k.trim() : k))), p && (o = n.map(Gi));
  }
  let l,
    c = s[(l = cs(t))] || s[(l = cs(Je(t)))];
  !c && r && (c = s[(l = cs(Yt(t)))]), c && Re(c, e, 6, o);
  const u = s[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Re(u, e, 6, o);
  }
}
function Fr(e, t, n = !1) {
  const s = t.emitsCache,
    o = s.get(e);
  if (o !== void 0) return o;
  const r = e.emits;
  let i = {},
    l = !1;
  if (!Z(e)) {
    const c = (u) => {
      const d = Fr(u, t, !0);
      d && ((l = !0), $e(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !r && !l
    ? (me(e) && s.set(e, null), null)
    : (W(r) ? r.forEach((c) => (i[c] = null)) : $e(i, r),
      me(e) && s.set(e, i),
      i);
}
function Yn(e, t) {
  return !e || !mn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      re(e, t[0].toLowerCase() + t.slice(1)) || re(e, Yt(t)) || re(e, t));
}
let Se = null,
  Qn = null;
function Nn(e) {
  const t = Se;
  return (Se = e), (Qn = (e && e.type.__scopeId) || null), t;
}
function Ze(e) {
  Qn = e;
}
function et() {
  Qn = null;
}
function A(e, t = Se, n) {
  if (!t || e._n) return e;
  const s = (...o) => {
    s._d && Ho(-1);
    const r = Nn(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Nn(r), s._d && Ho(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function us(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: r,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: u,
    render: d,
    renderCache: p,
    data: v,
    setupState: k,
    ctx: H,
    inheritAttrs: N,
  } = e;
  let X, b;
  const L = Nn(e);
  try {
    if (n.shapeFlag & 4) {
      const Y = o || s;
      (X = Ue(d.call(Y, Y, p, r, k, v, H))), (b = c);
    } else {
      const Y = t;
      (X = Ue(
        Y.length > 1 ? Y(r, { attrs: c, slots: l, emit: u }) : Y(r, null)
      )),
        (b = t.props ? c : Fl(c));
    }
  } catch (Y) {
    (on.length = 0), Gn(Y, e, 1), (X = V(Oe));
  }
  let I = X;
  if (b && N !== !1) {
    const Y = Object.keys(b),
      { shapeFlag: te } = I;
    Y.length && te & 7 && (i && Y.some(Rs) && (b = Hl(b, i)), (I = pt(I, b)));
  }
  return (
    n.dirs && ((I = pt(I)), (I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (I.transition = n.transition),
    (X = I),
    Nn(L),
    X
  );
}
const Fl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || mn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Hl = (e, t) => {
    const n = {};
    for (const s in e) (!Rs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Rl(e, t, n) {
  const { props: s, children: o, component: r } = e,
    { props: i, children: l, patchFlag: c } = t,
    u = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Vo(s, i, u) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const v = d[p];
        if (i[v] !== s[v] && !Yn(u, v)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Vo(s, i, u)
        : !0
      : !!i;
  return !1;
}
function Vo(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !Yn(n, r)) return !0;
  }
  return !1;
}
function Dl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ul = (e) => e.__isSuspense;
function Hr(e, t) {
  t && t.pendingBranch
    ? W(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Nl(e);
}
function Dt(e, t) {
  if (ye) {
    let n = ye.provides;
    const s = ye.parent && ye.parent.provides;
    s === n && (n = ye.provides = Object.create(s)), (n[e] = t);
  }
}
function qe(e, t, n = !1) {
  const s = ye || Se;
  if (s) {
    const o =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && Z(t) ? t.call(s.proxy) : t;
  }
}
function Et(e, t) {
  return Xn(e, null, t);
}
function Rr(e, t) {
  return Xn(e, null, { flush: "post" });
}
const Cn = {};
function Xe(e, t, n) {
  return Xn(e, t, n);
}
function Xn(
  e,
  t,
  { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = ge
) {
  const l = gr() === (ye == null ? void 0 : ye.scope) ? ye : null;
  let c,
    u = !1,
    d = !1;
  if (
    (Ce(e)
      ? ((c = () => e.value), (u = Mn(e)))
      : Ht(e)
      ? ((c = () => e), (s = !0))
      : W(e)
      ? ((d = !0),
        (u = e.some((I) => Ht(I) || Mn(I))),
        (c = () =>
          e.map((I) => {
            if (Ce(I)) return I.value;
            if (Ht(I)) return Ot(I);
            if (Z(I)) return ht(I, l, 2);
          })))
      : Z(e)
      ? t
        ? (c = () => ht(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return p && p(), Re(e, l, 3, [v]);
          })
      : (c = Ke),
    t && s)
  ) {
    const I = c;
    c = () => Ot(I());
  }
  let p,
    v = (I) => {
      p = b.onStop = () => {
        ht(I, l, 4);
      };
    },
    k;
  if (_n)
    if (
      ((v = Ke),
      t ? n && Re(t, l, 3, [c(), d ? [] : void 0, v]) : c(),
      o === "sync")
    ) {
      const I = Ic();
      k = I.__watcherHandles || (I.__watcherHandles = []);
    } else return Ke;
  let H = d ? new Array(e.length).fill(Cn) : Cn;
  const N = () => {
    if (b.active)
      if (t) {
        const I = b.run();
        (s || u || (d ? I.some((Y, te) => cn(Y, H[te])) : cn(I, H))) &&
          (p && p(),
          Re(t, l, 3, [I, H === Cn ? void 0 : d && H[0] === Cn ? [] : H, v]),
          (H = I));
      } else b.run();
  };
  N.allowRecurse = !!t;
  let X;
  o === "sync"
    ? (X = N)
    : o === "post"
    ? (X = () => Ee(N, l && l.suspense))
    : ((N.pre = !0), l && (N.id = l.uid), (X = () => eo(N)));
  const b = new Ks(c, X);
  t
    ? n
      ? N()
      : (H = b.run())
    : o === "post"
    ? Ee(b.run.bind(b), l && l.suspense)
    : b.run();
  const L = () => {
    b.stop(), l && l.scope && Ds(l.scope.effects, b);
  };
  return k && k.push(L), L;
}
function zl(e, t, n) {
  const s = this.proxy,
    o = xe(e) ? (e.includes(".") ? Dr(s, e) : () => s[e]) : e.bind(s, s);
  let r;
  Z(t) ? (r = t) : ((r = t.handler), (n = t));
  const i = ye;
  Gt(this);
  const l = Xn(o, r.bind(s), n);
  return i ? Gt(i) : Vt(), l;
}
function Dr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++) s = s[n[o]];
    return s;
  };
}
function Ot(e, t) {
  if (!me(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Ce(e))) Ot(e.value, t);
  else if (W(e)) for (let n = 0; n < e.length; n++) Ot(e[n], t);
  else if (_r(e) || Ft(e))
    e.forEach((n) => {
      Ot(n, t);
    });
  else if (mr(e)) for (const n in e) Ot(e[n], t);
  return e;
}
function jl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Be(() => {
      e.isMounted = !0;
    }),
    qr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Fe = [Function, Array],
  Kl = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Fe,
      onEnter: Fe,
      onAfterEnter: Fe,
      onEnterCancelled: Fe,
      onBeforeLeave: Fe,
      onLeave: Fe,
      onAfterLeave: Fe,
      onLeaveCancelled: Fe,
      onBeforeAppear: Fe,
      onAppear: Fe,
      onAfterAppear: Fe,
      onAppearCancelled: Fe,
    },
    setup(e, { slots: t }) {
      const n = ts(),
        s = jl();
      let o;
      return () => {
        const r = t.default && jr(t.default(), !0);
        if (!r || !r.length) return;
        let i = r[0];
        if (r.length > 1) {
          for (const N of r)
            if (N.type !== Oe) {
              i = N;
              break;
            }
        }
        const l = le(e),
          { mode: c } = l;
        if (s.isLeaving) return fs(i);
        const u = Eo(i);
        if (!u) return fs(i);
        const d = ks(u, l, s, n);
        Ps(u, d);
        const p = n.subTree,
          v = p && Eo(p);
        let k = !1;
        const { getTransitionKey: H } = u.type;
        if (H) {
          const N = H();
          o === void 0 ? (o = N) : N !== o && ((o = N), (k = !0));
        }
        if (v && v.type !== Oe && (!Ct(u, v) || k)) {
          const N = ks(v, l, s, n);
          if ((Ps(v, N), c === "out-in"))
            return (
              (s.isLeaving = !0),
              (N.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              fs(i)
            );
          c === "in-out" &&
            u.type !== Oe &&
            (N.delayLeave = (X, b, L) => {
              const I = zr(s, v);
              (I[String(v.key)] = v),
                (X._leaveCb = () => {
                  b(), (X._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = L);
            });
        }
        return i;
      };
    },
  },
  Ur = Kl;
function zr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function ks(e, t, n, s) {
  const {
      appear: o,
      mode: r,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: p,
      onLeave: v,
      onAfterLeave: k,
      onLeaveCancelled: H,
      onBeforeAppear: N,
      onAppear: X,
      onAfterAppear: b,
      onAppearCancelled: L,
    } = t,
    I = String(e.key),
    Y = zr(n, e),
    te = (M, ee) => {
      M && Re(M, s, 9, ee);
    },
    he = (M, ee) => {
      const Q = ee[1];
      te(M, ee),
        W(M) ? M.every((ie) => ie.length <= 1) && Q() : M.length <= 1 && Q();
    },
    oe = {
      mode: r,
      persisted: i,
      beforeEnter(M) {
        let ee = l;
        if (!n.isMounted)
          if (o) ee = N || l;
          else return;
        M._leaveCb && M._leaveCb(!0);
        const Q = Y[I];
        Q && Ct(e, Q) && Q.el._leaveCb && Q.el._leaveCb(), te(ee, [M]);
      },
      enter(M) {
        let ee = c,
          Q = u,
          ie = d;
        if (!n.isMounted)
          if (o) (ee = X || c), (Q = b || u), (ie = L || d);
          else return;
        let O = !1;
        const ne = (M._enterCb = (D) => {
          O ||
            ((O = !0),
            D ? te(ie, [M]) : te(Q, [M]),
            oe.delayedLeave && oe.delayedLeave(),
            (M._enterCb = void 0));
        });
        ee ? he(ee, [M, ne]) : ne();
      },
      leave(M, ee) {
        const Q = String(e.key);
        if ((M._enterCb && M._enterCb(!0), n.isUnmounting)) return ee();
        te(p, [M]);
        let ie = !1;
        const O = (M._leaveCb = (ne) => {
          ie ||
            ((ie = !0),
            ee(),
            ne ? te(H, [M]) : te(k, [M]),
            (M._leaveCb = void 0),
            Y[Q] === e && delete Y[Q]);
        });
        (Y[Q] = e), v ? he(v, [M, O]) : O();
      },
      clone(M) {
        return ks(M, t, n, s);
      },
    };
  return oe;
}
function fs(e) {
  if (Jn(e)) return (e = pt(e)), (e.children = null), e;
}
function Eo(e) {
  return Jn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Ps(e, t) {
  e.shapeFlag & 6 && e.component
    ? Ps(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function jr(e, t = !1, n) {
  let s = [],
    o = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === J
      ? (i.patchFlag & 128 && o++, (s = s.concat(jr(i.children, t, l))))
      : (t || i.type !== Oe) && s.push(l != null ? pt(i, { key: l }) : i);
  }
  if (o > 1) for (let r = 0; r < s.length; r++) s[r].patchFlag = -2;
  return s;
}
function R(e) {
  return Z(e) ? { setup: e, name: e.name } : e;
}
const Ut = (e) => !!e.type.__asyncLoader,
  Jn = (e) => e.type.__isKeepAlive;
function ql(e, t) {
  Kr(e, "a", t);
}
function Wl(e, t) {
  Kr(e, "da", t);
}
function Kr(e, t, n = ye) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Zn(t, s, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      Jn(o.parent.vnode) && Gl(s, t, n, o), (o = o.parent);
  }
}
function Gl(e, t, n, s) {
  const o = Zn(t, e, s, !0);
  vt(() => {
    Ds(s[t], o);
  }, n);
}
function Zn(e, t, n = ye, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Qt(), Gt(n);
          const l = Re(t, n, e, i);
          return Vt(), Xt(), l;
        });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const ot =
    (e) =>
    (t, n = ye) =>
      (!_n || e === "sp") && Zn(e, (...s) => t(...s), n),
  Yl = ot("bm"),
  Be = ot("m"),
  Ql = ot("bu"),
  to = ot("u"),
  qr = ot("bum"),
  vt = ot("um"),
  Xl = ot("sp"),
  Jl = ot("rtg"),
  Zl = ot("rtc");
function ec(e, t = ye) {
  Zn("ec", e, t);
}
function Ye(e, t, n, s) {
  const o = e.dirs,
    r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[s];
    c && (Qt(), Re(c, n, 8, [e.el, l, e, t]), Xt());
  }
}
const no = "components";
function At(e, t) {
  return Gr(no, e, !0, t) || e;
}
const Wr = Symbol();
function dn(e) {
  return xe(e) ? Gr(no, e, !1) || e : e || Wr;
}
function Gr(e, t, n = !0, s = !1) {
  const o = Se || ye;
  if (o) {
    const r = o.type;
    if (e === no) {
      const l = Lc(r, !1);
      if (l && (l === t || l === Je(t) || l === Kn(Je(t)))) return r;
    }
    const i = Ao(o[e] || r[e], t) || Ao(o.appContext[e], t);
    return !i && s ? r : i;
  }
}
function Ao(e, t) {
  return e && (e[t] || e[Je(t)] || e[Kn(Je(t))]);
}
function Ve(e, t, n, s) {
  let o;
  const r = n && n[s];
  if (W(e) || xe(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (me(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const u = i[l];
        o[l] = t(e[u], u, l, r && r[l]);
      }
    }
  else o = [];
  return n && (n[s] = o), o;
}
function S(e, t, n = {}, s, o) {
  if (Se.isCE || (Se.parent && Ut(Se.parent) && Se.parent.isCE))
    return t !== "default" && (n.name = t), V("slot", n, s && s());
  let r = e[t];
  r && r._c && (r._d = !1), h();
  const i = r && Yr(r(n)),
    l = q(
      J,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    r && r._c && (r._d = !0),
    l
  );
}
function Yr(e) {
  return e.some((t) =>
    Fn(t) ? !(t.type === Oe || (t.type === J && !Yr(t.children))) : !0
  )
    ? e
    : null;
}
const Cs = (e) => (e ? (ii(e) ? io(e) || e.proxy : Cs(e.parent)) : null),
  sn = $e(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Cs(e.parent),
    $root: (e) => Cs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => so(e),
    $forceUpdate: (e) => e.f || (e.f = () => eo(e.update)),
    $nextTick: (e) => e.n || (e.n = Zs.bind(e.proxy)),
    $watch: (e) => zl.bind(e),
  }),
  ds = (e, t) => e !== ge && !e.__isScriptSetup && re(e, t),
  tc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: o,
        props: r,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const k = i[t];
        if (k !== void 0)
          switch (k) {
            case 1:
              return s[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return r[t];
          }
        else {
          if (ds(s, t)) return (i[t] = 1), s[t];
          if (o !== ge && re(o, t)) return (i[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && re(u, t)) return (i[t] = 3), r[t];
          if (n !== ge && re(n, t)) return (i[t] = 4), n[t];
          Ss && (i[t] = 0);
        }
      }
      const d = sn[t];
      let p, v;
      if (d) return t === "$attrs" && Ae(e, "get", t), d(e);
      if ((p = l.__cssModules) && (p = p[t])) return p;
      if (n !== ge && re(n, t)) return (i[t] = 4), n[t];
      if (((v = c.config.globalProperties), re(v, t))) return v[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: o, ctx: r } = e;
      return ds(o, t)
        ? ((o[t] = n), !0)
        : s !== ge && re(s, t)
        ? ((s[t] = n), !0)
        : re(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: o,
          propsOptions: r,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== ge && re(e, i)) ||
        ds(t, i) ||
        ((l = r[0]) && re(l, i)) ||
        re(s, i) ||
        re(sn, i) ||
        re(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : re(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Ss = !0;
function nc(e) {
  const t = so(e),
    n = e.proxy,
    s = e.ctx;
  (Ss = !1), t.beforeCreate && Mo(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    created: d,
    beforeMount: p,
    mounted: v,
    beforeUpdate: k,
    updated: H,
    activated: N,
    deactivated: X,
    beforeDestroy: b,
    beforeUnmount: L,
    destroyed: I,
    unmounted: Y,
    render: te,
    renderTracked: he,
    renderTriggered: oe,
    errorCaptured: M,
    serverPrefetch: ee,
    expose: Q,
    inheritAttrs: ie,
    components: O,
    directives: ne,
    filters: D,
  } = t;
  if ((u && sc(u, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const be in i) {
      const _e = i[be];
      Z(_e) && (s[be] = _e.bind(n));
    }
  if (o) {
    const be = o.call(n, n);
    me(be) && (e.data = Wn(be));
  }
  if (((Ss = !0), r))
    for (const be in r) {
      const _e = r[be],
        bt = Z(_e) ? _e.bind(n, n) : Z(_e.get) ? _e.get.bind(n, n) : Ke,
        bn = !Z(_e) && Z(_e.set) ? _e.set.bind(n) : Ke,
        yt = K({ get: bt, set: bn });
      Object.defineProperty(s, be, {
        enumerable: !0,
        configurable: !0,
        get: () => yt.value,
        set: (We) => (yt.value = We),
      });
    }
  if (l) for (const be in l) Qr(l[be], s, n, be);
  if (c) {
    const be = Z(c) ? c.call(n) : c;
    Reflect.ownKeys(be).forEach((_e) => {
      Dt(_e, be[_e]);
    });
  }
  d && Mo(d, e, "c");
  function fe(be, _e) {
    W(_e) ? _e.forEach((bt) => be(bt.bind(n))) : _e && be(_e.bind(n));
  }
  if (
    (fe(Yl, p),
    fe(Be, v),
    fe(Ql, k),
    fe(to, H),
    fe(ql, N),
    fe(Wl, X),
    fe(ec, M),
    fe(Zl, he),
    fe(Jl, oe),
    fe(qr, L),
    fe(vt, Y),
    fe(Xl, ee),
    W(Q))
  )
    if (Q.length) {
      const be = e.exposed || (e.exposed = {});
      Q.forEach((_e) => {
        Object.defineProperty(be, _e, {
          get: () => n[_e],
          set: (bt) => (n[_e] = bt),
        });
      });
    } else e.exposed || (e.exposed = {});
  te && e.render === Ke && (e.render = te),
    ie != null && (e.inheritAttrs = ie),
    O && (e.components = O),
    ne && (e.directives = ne);
}
function sc(e, t, n = Ke, s = !1) {
  W(e) && (e = Ts(e));
  for (const o in e) {
    const r = e[o];
    let i;
    me(r)
      ? "default" in r
        ? (i = qe(r.from || o, r.default, !0))
        : (i = qe(r.from || o))
      : (i = qe(r)),
      Ce(i) && s
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[o] = i);
  }
}
function Mo(e, t, n) {
  Re(W(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Qr(e, t, n, s) {
  const o = s.includes(".") ? Dr(n, s) : () => n[s];
  if (xe(e)) {
    const r = t[e];
    Z(r) && Xe(o, r);
  } else if (Z(e)) Xe(o, e.bind(n));
  else if (me(e))
    if (W(e)) e.forEach((r) => Qr(r, t, n, s));
    else {
      const r = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(r) && Xe(o, r, e);
    }
}
function so(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: o,
      optionsCache: r,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = r.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !o.length && !n && !s
      ? (c = t)
      : ((c = {}), o.length && o.forEach((u) => On(c, u, i, !0)), On(c, t, i)),
    me(t) && r.set(t, c),
    c
  );
}
function On(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && On(e, r, n, !0), o && o.forEach((i) => On(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = oc[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const oc = {
  data: Io,
  props: kt,
  emits: kt,
  methods: kt,
  computed: kt,
  beforeCreate: Le,
  created: Le,
  beforeMount: Le,
  mounted: Le,
  beforeUpdate: Le,
  updated: Le,
  beforeDestroy: Le,
  beforeUnmount: Le,
  destroyed: Le,
  unmounted: Le,
  activated: Le,
  deactivated: Le,
  errorCaptured: Le,
  serverPrefetch: Le,
  components: kt,
  directives: kt,
  watch: ic,
  provide: Io,
  inject: rc,
};
function Io(e, t) {
  return t
    ? e
      ? function () {
          return $e(
            Z(e) ? e.call(this, this) : e,
            Z(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function rc(e, t) {
  return kt(Ts(e), Ts(t));
}
function Ts(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function kt(e, t) {
  return e ? $e($e(Object.create(null), e), t) : t;
}
function ic(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = $e(Object.create(null), e);
  for (const s in t) n[s] = Le(e[s], t[s]);
  return n;
}
function lc(e, t, n, s = !1) {
  const o = {},
    r = {};
  An(r, es, 1), (e.propsDefaults = Object.create(null)), Xr(e, t, o, r);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = s ? o : Cl(o)) : e.type.props ? (e.props = o) : (e.props = r),
    (e.attrs = r);
}
function cc(e, t, n, s) {
  const {
      props: o,
      attrs: r,
      vnode: { patchFlag: i },
    } = e,
    l = le(o),
    [c] = e.propsOptions;
  let u = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        let v = d[p];
        if (Yn(e.emitsOptions, v)) continue;
        const k = t[v];
        if (c)
          if (re(r, v)) k !== r[v] && ((r[v] = k), (u = !0));
          else {
            const H = Je(v);
            o[H] = Ls(c, l, H, k, e, !1);
          }
        else k !== r[v] && ((r[v] = k), (u = !0));
      }
    }
  } else {
    Xr(e, t, o, r) && (u = !0);
    let d;
    for (const p in l)
      (!t || (!re(t, p) && ((d = Yt(p)) === p || !re(t, d)))) &&
        (c
          ? n &&
            (n[p] !== void 0 || n[d] !== void 0) &&
            (o[p] = Ls(c, l, p, void 0, e, !0))
          : delete o[p]);
    if (r !== l)
      for (const p in r) (!t || !re(t, p)) && (delete r[p], (u = !0));
  }
  u && st(e, "set", "$attrs");
}
function Xr(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (tn(c)) continue;
      const u = t[c];
      let d;
      o && re(o, (d = Je(c)))
        ? !r || !r.includes(d)
          ? (n[d] = u)
          : ((l || (l = {}))[d] = u)
        : Yn(e.emitsOptions, c) ||
          ((!(c in s) || u !== s[c]) && ((s[c] = u), (i = !0)));
    }
  if (r) {
    const c = le(n),
      u = l || ge;
    for (let d = 0; d < r.length; d++) {
      const p = r[d];
      n[p] = Ls(o, c, p, u[p], e, !re(u, p));
    }
  }
  return i;
}
function Ls(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = re(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && Z(c)) {
        const { propsDefaults: u } = o;
        n in u ? (s = u[n]) : (Gt(o), (s = u[n] = c.call(null, t)), Vt());
      } else s = c;
    }
    i[0] &&
      (r && !l ? (s = !1) : i[1] && (s === "" || s === Yt(n)) && (s = !0));
  }
  return s;
}
function Jr(e, t, n = !1) {
  const s = t.propsCache,
    o = s.get(e);
  if (o) return o;
  const r = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!Z(e)) {
    const d = (p) => {
      c = !0;
      const [v, k] = Jr(p, t, !0);
      $e(i, v), k && l.push(...k);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!r && !c) return me(e) && s.set(e, Bt), Bt;
  if (W(r))
    for (let d = 0; d < r.length; d++) {
      const p = Je(r[d]);
      No(p) && (i[p] = ge);
    }
  else if (r)
    for (const d in r) {
      const p = Je(d);
      if (No(p)) {
        const v = r[d],
          k = (i[p] = W(v) || Z(v) ? { type: v } : Object.assign({}, v));
        if (k) {
          const H = Fo(Boolean, k.type),
            N = Fo(String, k.type);
          (k[0] = H > -1),
            (k[1] = N < 0 || H < N),
            (H > -1 || re(k, "default")) && l.push(p);
        }
      }
    }
  const u = [i, l];
  return me(e) && s.set(e, u), u;
}
function No(e) {
  return e[0] !== "$";
}
function Oo(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Bo(e, t) {
  return Oo(e) === Oo(t);
}
function Fo(e, t) {
  return W(t) ? t.findIndex((n) => Bo(n, e)) : Z(t) && Bo(t, e) ? 0 : -1;
}
const Zr = (e) => e[0] === "_" || e === "$stable",
  oo = (e) => (W(e) ? e.map(Ue) : [Ue(e)]),
  ac = (e, t, n) => {
    if (t._n) return t;
    const s = A((...o) => oo(t(...o)), n);
    return (s._c = !1), s;
  },
  ei = (e, t, n) => {
    const s = e._ctx;
    for (const o in e) {
      if (Zr(o)) continue;
      const r = e[o];
      if (Z(r)) t[o] = ac(o, r, s);
      else if (r != null) {
        const i = oo(r);
        t[o] = () => i;
      }
    }
  },
  ti = (e, t) => {
    const n = oo(t);
    e.slots.default = () => n;
  },
  uc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = le(t)), An(t, "_", n)) : ei(t, (e.slots = {}));
    } else (e.slots = {}), t && ti(e, t);
    An(e.slots, es, 1);
  },
  fc = (e, t, n) => {
    const { vnode: s, slots: o } = e;
    let r = !0,
      i = ge;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (r = !1)
          : ($e(o, t), !n && l === 1 && delete o._)
        : ((r = !t.$stable), ei(t, o)),
        (i = t);
    } else t && (ti(e, t), (i = { default: 1 }));
    if (r) for (const l in o) !Zr(l) && !(l in i) && delete o[l];
  };
function ni() {
  return {
    app: null,
    config: {
      isNativeTag: Ui,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let dc = 0;
function hc(e, t) {
  return function (s, o = null) {
    Z(s) || (s = Object.assign({}, s)), o != null && !me(o) && (o = null);
    const r = ni(),
      i = new Set();
    let l = !1;
    const c = (r.app = {
      _uid: dc++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Nc,
      get config() {
        return r.config;
      },
      set config(u) {},
      use(u, ...d) {
        return (
          i.has(u) ||
            (u && Z(u.install)
              ? (i.add(u), u.install(c, ...d))
              : Z(u) && (i.add(u), u(c, ...d))),
          c
        );
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), c;
      },
      component(u, d) {
        return d ? ((r.components[u] = d), c) : r.components[u];
      },
      directive(u, d) {
        return d ? ((r.directives[u] = d), c) : r.directives[u];
      },
      mount(u, d, p) {
        if (!l) {
          const v = V(s, o);
          return (
            (v.appContext = r),
            d && t ? t(v, u) : e(v, u, p),
            (l = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            io(v.component) || v.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, d) {
        return (r.provides[u] = d), c;
      },
    });
    return c;
  };
}
function Bn(e, t, n, s, o = !1) {
  if (W(e)) {
    e.forEach((v, k) => Bn(v, t && (W(t) ? t[k] : t), n, s, o));
    return;
  }
  if (Ut(s) && !o) return;
  const r = s.shapeFlag & 4 ? io(s.component) || s.component.proxy : s.el,
    i = o ? null : r,
    { i: l, r: c } = e,
    u = t && t.r,
    d = l.refs === ge ? (l.refs = {}) : l.refs,
    p = l.setupState;
  if (
    (u != null &&
      u !== c &&
      (xe(u)
        ? ((d[u] = null), re(p, u) && (p[u] = null))
        : Ce(u) && (u.value = null)),
    Z(c))
  )
    ht(c, l, 12, [i, d]);
  else {
    const v = xe(c),
      k = Ce(c);
    if (v || k) {
      const H = () => {
        if (e.f) {
          const N = v ? (re(p, c) ? p[c] : d[c]) : c.value;
          o
            ? W(N) && Ds(N, r)
            : W(N)
            ? N.includes(r) || N.push(r)
            : v
            ? ((d[c] = [r]), re(p, c) && (p[c] = d[c]))
            : ((c.value = [r]), e.k && (d[e.k] = c.value));
        } else
          v
            ? ((d[c] = i), re(p, c) && (p[c] = i))
            : k && ((c.value = i), e.k && (d[e.k] = i));
      };
      i ? ((H.id = -1), Ee(H, n)) : H();
    }
  }
}
let lt = !1;
const Sn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  Tn = (e) => e.nodeType === 8;
function _c(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        createText: o,
        nextSibling: r,
        parentNode: i,
        remove: l,
        insert: c,
        createComment: u,
      },
    } = e,
    d = (b, L) => {
      if (!L.hasChildNodes()) {
        n(null, b, L), In(), (L._vnode = b);
        return;
      }
      (lt = !1),
        p(L.firstChild, b, null, null, null),
        In(),
        (L._vnode = b),
        lt && console.error("Hydration completed but contains mismatches.");
    },
    p = (b, L, I, Y, te, he = !1) => {
      const oe = Tn(b) && b.data === "[",
        M = () => N(b, L, I, Y, te, oe),
        { type: ee, ref: Q, shapeFlag: ie, patchFlag: O } = L;
      let ne = b.nodeType;
      (L.el = b), O === -2 && ((he = !1), (L.dynamicChildren = null));
      let D = null;
      switch (ee) {
        case Wt:
          ne !== 3
            ? L.children === ""
              ? (c((L.el = o("")), i(b), b), (D = b))
              : (D = M())
            : (b.data !== L.children && ((lt = !0), (b.data = L.children)),
              (D = r(b)));
          break;
        case Oe:
          ne !== 8 || oe ? (D = M()) : (D = r(b));
          break;
        case zt:
          if ((oe && ((b = r(b)), (ne = b.nodeType)), ne === 1 || ne === 3)) {
            D = b;
            const Me = !L.children.length;
            for (let fe = 0; fe < L.staticCount; fe++)
              Me && (L.children += D.nodeType === 1 ? D.outerHTML : D.data),
                fe === L.staticCount - 1 && (L.anchor = D),
                (D = r(D));
            return oe ? r(D) : D;
          } else M();
          break;
        case J:
          oe ? (D = H(b, L, I, Y, te, he)) : (D = M());
          break;
        default:
          if (ie & 1)
            ne !== 1 || L.type.toLowerCase() !== b.tagName.toLowerCase()
              ? (D = M())
              : (D = v(b, L, I, Y, te, he));
          else if (ie & 6) {
            L.slotScopeIds = te;
            const Me = i(b);
            if (
              (t(L, Me, null, I, Y, Sn(Me), he),
              (D = oe ? X(b) : r(b)),
              D && Tn(D) && D.data === "teleport end" && (D = r(D)),
              Ut(L))
            ) {
              let fe;
              oe
                ? ((fe = V(J)),
                  (fe.anchor = D ? D.previousSibling : Me.lastChild))
                : (fe = b.nodeType === 3 ? Te("") : V("div")),
                (fe.el = b),
                (L.component.subTree = fe);
            }
          } else
            ie & 64
              ? ne !== 8
                ? (D = M())
                : (D = L.type.hydrate(b, L, I, Y, te, he, e, k))
              : ie & 128 &&
                (D = L.type.hydrate(b, L, I, Y, Sn(i(b)), te, he, e, p));
      }
      return Q != null && Bn(Q, null, Y, L), D;
    },
    v = (b, L, I, Y, te, he) => {
      he = he || !!L.dynamicChildren;
      const { type: oe, props: M, patchFlag: ee, shapeFlag: Q, dirs: ie } = L,
        O = (oe === "input" && ie) || oe === "option";
      if (O || ee !== -1) {
        if ((ie && Ye(L, null, I, "created"), M))
          if (O || !he || ee & 48)
            for (const D in M)
              ((O && D.endsWith("value")) || (mn(D) && !tn(D))) &&
                s(b, D, null, M[D], !1, void 0, I);
          else M.onClick && s(b, "onClick", null, M.onClick, !1, void 0, I);
        let ne;
        if (
          ((ne = M && M.onVnodeBeforeMount) && He(ne, I, L),
          ie && Ye(L, null, I, "beforeMount"),
          ((ne = M && M.onVnodeMounted) || ie) &&
            Hr(() => {
              ne && He(ne, I, L), ie && Ye(L, null, I, "mounted");
            }, Y),
          Q & 16 && !(M && (M.innerHTML || M.textContent)))
        ) {
          let D = k(b.firstChild, L, b, I, Y, te, he);
          for (; D; ) {
            lt = !0;
            const Me = D;
            (D = D.nextSibling), l(Me);
          }
        } else
          Q & 8 &&
            b.textContent !== L.children &&
            ((lt = !0), (b.textContent = L.children));
      }
      return b.nextSibling;
    },
    k = (b, L, I, Y, te, he, oe) => {
      oe = oe || !!L.dynamicChildren;
      const M = L.children,
        ee = M.length;
      for (let Q = 0; Q < ee; Q++) {
        const ie = oe ? M[Q] : (M[Q] = Ue(M[Q]));
        if (b) b = p(b, ie, Y, te, he, oe);
        else {
          if (ie.type === Wt && !ie.children) continue;
          (lt = !0), n(null, ie, I, null, Y, te, Sn(I), he);
        }
      }
      return b;
    },
    H = (b, L, I, Y, te, he) => {
      const { slotScopeIds: oe } = L;
      oe && (te = te ? te.concat(oe) : oe);
      const M = i(b),
        ee = k(r(b), L, M, I, Y, te, he);
      return ee && Tn(ee) && ee.data === "]"
        ? r((L.anchor = ee))
        : ((lt = !0), c((L.anchor = u("]")), M, ee), ee);
    },
    N = (b, L, I, Y, te, he) => {
      if (((lt = !0), (L.el = null), he)) {
        const ee = X(b);
        for (;;) {
          const Q = r(b);
          if (Q && Q !== ee) l(Q);
          else break;
        }
      }
      const oe = r(b),
        M = i(b);
      return l(b), n(null, L, M, oe, I, Y, Sn(M), te), oe;
    },
    X = (b) => {
      let L = 0;
      for (; b; )
        if (
          ((b = r(b)), b && Tn(b) && (b.data === "[" && L++, b.data === "]"))
        ) {
          if (L === 0) return r(b);
          L--;
        }
      return b;
    };
  return [d, p];
}
const Ee = Hr;
function pc(e) {
  return vc(e, _c);
}
function vc(e, t) {
  const n = Qi();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: o,
      patchProp: r,
      createElement: i,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: d,
      parentNode: p,
      nextSibling: v,
      setScopeId: k = Ke,
      insertStaticContent: H,
    } = e,
    N = (
      a,
      f,
      m,
      w = null,
      x = null,
      C = null,
      E = !1,
      P = null,
      T = !!f.dynamicChildren
    ) => {
      if (a === f) return;
      a && !Ct(a, f) && ((w = yn(a)), We(a, x, C, !0), (a = null)),
        f.patchFlag === -2 && ((T = !1), (f.dynamicChildren = null));
      const { type: $, ref: z, shapeFlag: B } = f;
      switch ($) {
        case Wt:
          X(a, f, m, w);
          break;
        case Oe:
          b(a, f, m, w);
          break;
        case zt:
          a == null && L(f, m, w, E);
          break;
        case J:
          O(a, f, m, w, x, C, E, P, T);
          break;
        default:
          B & 1
            ? te(a, f, m, w, x, C, E, P, T)
            : B & 6
            ? ne(a, f, m, w, x, C, E, P, T)
            : (B & 64 || B & 128) && $.process(a, f, m, w, x, C, E, P, T, It);
      }
      z != null && x && Bn(z, a && a.ref, C, f || a, !f);
    },
    X = (a, f, m, w) => {
      if (a == null) s((f.el = l(f.children)), m, w);
      else {
        const x = (f.el = a.el);
        f.children !== a.children && u(x, f.children);
      }
    },
    b = (a, f, m, w) => {
      a == null ? s((f.el = c(f.children || "")), m, w) : (f.el = a.el);
    },
    L = (a, f, m, w) => {
      [a.el, a.anchor] = H(a.children, f, m, w, a.el, a.anchor);
    },
    I = ({ el: a, anchor: f }, m, w) => {
      let x;
      for (; a && a !== f; ) (x = v(a)), s(a, m, w), (a = x);
      s(f, m, w);
    },
    Y = ({ el: a, anchor: f }) => {
      let m;
      for (; a && a !== f; ) (m = v(a)), o(a), (a = m);
      o(f);
    },
    te = (a, f, m, w, x, C, E, P, T) => {
      (E = E || f.type === "svg"),
        a == null ? he(f, m, w, x, C, E, P, T) : ee(a, f, x, C, E, P, T);
    },
    he = (a, f, m, w, x, C, E, P) => {
      let T, $;
      const { type: z, props: B, shapeFlag: j, transition: G, dirs: se } = a;
      if (
        ((T = a.el = i(a.type, C, B && B.is, B)),
        j & 8
          ? d(T, a.children)
          : j & 16 &&
            M(a.children, T, null, w, x, C && z !== "foreignObject", E, P),
        se && Ye(a, null, w, "created"),
        oe(T, a, a.scopeId, E, w),
        B)
      ) {
        for (const de in B)
          de !== "value" &&
            !tn(de) &&
            r(T, de, null, B[de], C, a.children, w, x, tt);
        "value" in B && r(T, "value", null, B.value),
          ($ = B.onVnodeBeforeMount) && He($, w, a);
      }
      se && Ye(a, null, w, "beforeMount");
      const pe = (!x || (x && !x.pendingBranch)) && G && !G.persisted;
      pe && G.beforeEnter(T),
        s(T, f, m),
        (($ = B && B.onVnodeMounted) || pe || se) &&
          Ee(() => {
            $ && He($, w, a), pe && G.enter(T), se && Ye(a, null, w, "mounted");
          }, x);
    },
    oe = (a, f, m, w, x) => {
      if ((m && k(a, m), w)) for (let C = 0; C < w.length; C++) k(a, w[C]);
      if (x) {
        let C = x.subTree;
        if (f === C) {
          const E = x.vnode;
          oe(a, E, E.scopeId, E.slotScopeIds, x.parent);
        }
      }
    },
    M = (a, f, m, w, x, C, E, P, T = 0) => {
      for (let $ = T; $ < a.length; $++) {
        const z = (a[$] = P ? ut(a[$]) : Ue(a[$]));
        N(null, z, f, m, w, x, C, E, P);
      }
    },
    ee = (a, f, m, w, x, C, E) => {
      const P = (f.el = a.el);
      let { patchFlag: T, dynamicChildren: $, dirs: z } = f;
      T |= a.patchFlag & 16;
      const B = a.props || ge,
        j = f.props || ge;
      let G;
      m && xt(m, !1),
        (G = j.onVnodeBeforeUpdate) && He(G, m, f, a),
        z && Ye(f, a, m, "beforeUpdate"),
        m && xt(m, !0);
      const se = x && f.type !== "foreignObject";
      if (
        ($
          ? Q(a.dynamicChildren, $, P, m, w, se, C)
          : E || _e(a, f, P, null, m, w, se, C, !1),
        T > 0)
      ) {
        if (T & 16) ie(P, f, B, j, m, w, x);
        else if (
          (T & 2 && B.class !== j.class && r(P, "class", null, j.class, x),
          T & 4 && r(P, "style", B.style, j.style, x),
          T & 8)
        ) {
          const pe = f.dynamicProps;
          for (let de = 0; de < pe.length; de++) {
            const we = pe[de],
              De = B[we],
              Nt = j[we];
            (Nt !== De || we === "value") &&
              r(P, we, De, Nt, x, a.children, m, w, tt);
          }
        }
        T & 1 && a.children !== f.children && d(P, f.children);
      } else !E && $ == null && ie(P, f, B, j, m, w, x);
      ((G = j.onVnodeUpdated) || z) &&
        Ee(() => {
          G && He(G, m, f, a), z && Ye(f, a, m, "updated");
        }, w);
    },
    Q = (a, f, m, w, x, C, E) => {
      for (let P = 0; P < f.length; P++) {
        const T = a[P],
          $ = f[P],
          z =
            T.el && (T.type === J || !Ct(T, $) || T.shapeFlag & 70)
              ? p(T.el)
              : m;
        N(T, $, z, null, w, x, C, E, !0);
      }
    },
    ie = (a, f, m, w, x, C, E) => {
      if (m !== w) {
        if (m !== ge)
          for (const P in m)
            !tn(P) && !(P in w) && r(a, P, m[P], null, E, f.children, x, C, tt);
        for (const P in w) {
          if (tn(P)) continue;
          const T = w[P],
            $ = m[P];
          T !== $ && P !== "value" && r(a, P, $, T, E, f.children, x, C, tt);
        }
        "value" in w && r(a, "value", m.value, w.value);
      }
    },
    O = (a, f, m, w, x, C, E, P, T) => {
      const $ = (f.el = a ? a.el : l("")),
        z = (f.anchor = a ? a.anchor : l(""));
      let { patchFlag: B, dynamicChildren: j, slotScopeIds: G } = f;
      G && (P = P ? P.concat(G) : G),
        a == null
          ? (s($, m, w), s(z, m, w), M(f.children, m, z, x, C, E, P, T))
          : B > 0 && B & 64 && j && a.dynamicChildren
          ? (Q(a.dynamicChildren, j, m, x, C, E, P),
            (f.key != null || (x && f === x.subTree)) && si(a, f, !0))
          : _e(a, f, m, z, x, C, E, P, T);
    },
    ne = (a, f, m, w, x, C, E, P, T) => {
      (f.slotScopeIds = P),
        a == null
          ? f.shapeFlag & 512
            ? x.ctx.activate(f, m, w, E, T)
            : D(f, m, w, x, C, E, T)
          : Me(a, f, T);
    },
    D = (a, f, m, w, x, C, E) => {
      const P = (a.component = Pc(a, w, x));
      if ((Jn(a) && (P.ctx.renderer = It), Cc(P), P.asyncDep)) {
        if ((x && x.registerDep(P, fe), !a.el)) {
          const T = (P.subTree = V(Oe));
          b(null, T, f, m);
        }
        return;
      }
      fe(P, a, f, m, x, C, E);
    },
    Me = (a, f, m) => {
      const w = (f.component = a.component);
      if (Rl(a, f, m))
        if (w.asyncDep && !w.asyncResolved) {
          be(w, f, m);
          return;
        } else (w.next = f), Il(w.update), w.update();
      else (f.el = a.el), (w.vnode = f);
    },
    fe = (a, f, m, w, x, C, E) => {
      const P = () => {
          if (a.isMounted) {
            let { next: z, bu: B, u: j, parent: G, vnode: se } = a,
              pe = z,
              de;
            xt(a, !1),
              z ? ((z.el = se.el), be(a, z, E)) : (z = se),
              B && as(B),
              (de = z.props && z.props.onVnodeBeforeUpdate) && He(de, G, z, se),
              xt(a, !0);
            const we = us(a),
              De = a.subTree;
            (a.subTree = we),
              N(De, we, p(De.el), yn(De), a, x, C),
              (z.el = we.el),
              pe === null && Dl(a, we.el),
              j && Ee(j, x),
              (de = z.props && z.props.onVnodeUpdated) &&
                Ee(() => He(de, G, z, se), x);
          } else {
            let z;
            const { el: B, props: j } = f,
              { bm: G, m: se, parent: pe } = a,
              de = Ut(f);
            if (
              (xt(a, !1),
              G && as(G),
              !de && (z = j && j.onVnodeBeforeMount) && He(z, pe, f),
              xt(a, !0),
              B && ls)
            ) {
              const we = () => {
                (a.subTree = us(a)), ls(B, a.subTree, a, x, null);
              };
              de
                ? f.type.__asyncLoader().then(() => !a.isUnmounted && we())
                : we();
            } else {
              const we = (a.subTree = us(a));
              N(null, we, m, w, a, x, C), (f.el = we.el);
            }
            if ((se && Ee(se, x), !de && (z = j && j.onVnodeMounted))) {
              const we = f;
              Ee(() => He(z, pe, we), x);
            }
            (f.shapeFlag & 256 ||
              (pe && Ut(pe.vnode) && pe.vnode.shapeFlag & 256)) &&
              a.a &&
              Ee(a.a, x),
              (a.isMounted = !0),
              (f = m = w = null);
          }
        },
        T = (a.effect = new Ks(P, () => eo($), a.scope)),
        $ = (a.update = () => T.run());
      ($.id = a.uid), xt(a, !0), $();
    },
    be = (a, f, m) => {
      f.component = a;
      const w = a.vnode.props;
      (a.vnode = f),
        (a.next = null),
        cc(a, f.props, w, m),
        fc(a, f.children, m),
        Qt(),
        Lo(),
        Xt();
    },
    _e = (a, f, m, w, x, C, E, P, T = !1) => {
      const $ = a && a.children,
        z = a ? a.shapeFlag : 0,
        B = f.children,
        { patchFlag: j, shapeFlag: G } = f;
      if (j > 0) {
        if (j & 128) {
          bn($, B, m, w, x, C, E, P, T);
          return;
        } else if (j & 256) {
          bt($, B, m, w, x, C, E, P, T);
          return;
        }
      }
      G & 8
        ? (z & 16 && tt($, x, C), B !== $ && d(m, B))
        : z & 16
        ? G & 16
          ? bn($, B, m, w, x, C, E, P, T)
          : tt($, x, C, !0)
        : (z & 8 && d(m, ""), G & 16 && M(B, m, w, x, C, E, P, T));
    },
    bt = (a, f, m, w, x, C, E, P, T) => {
      (a = a || Bt), (f = f || Bt);
      const $ = a.length,
        z = f.length,
        B = Math.min($, z);
      let j;
      for (j = 0; j < B; j++) {
        const G = (f[j] = T ? ut(f[j]) : Ue(f[j]));
        N(a[j], G, m, null, x, C, E, P, T);
      }
      $ > z ? tt(a, x, C, !0, !1, B) : M(f, m, w, x, C, E, P, T, B);
    },
    bn = (a, f, m, w, x, C, E, P, T) => {
      let $ = 0;
      const z = f.length;
      let B = a.length - 1,
        j = z - 1;
      for (; $ <= B && $ <= j; ) {
        const G = a[$],
          se = (f[$] = T ? ut(f[$]) : Ue(f[$]));
        if (Ct(G, se)) N(G, se, m, null, x, C, E, P, T);
        else break;
        $++;
      }
      for (; $ <= B && $ <= j; ) {
        const G = a[B],
          se = (f[j] = T ? ut(f[j]) : Ue(f[j]));
        if (Ct(G, se)) N(G, se, m, null, x, C, E, P, T);
        else break;
        B--, j--;
      }
      if ($ > B) {
        if ($ <= j) {
          const G = j + 1,
            se = G < z ? f[G].el : w;
          for (; $ <= j; )
            N(null, (f[$] = T ? ut(f[$]) : Ue(f[$])), m, se, x, C, E, P, T),
              $++;
        }
      } else if ($ > j) for (; $ <= B; ) We(a[$], x, C, !0), $++;
      else {
        const G = $,
          se = $,
          pe = new Map();
        for ($ = se; $ <= j; $++) {
          const Ie = (f[$] = T ? ut(f[$]) : Ue(f[$]));
          Ie.key != null && pe.set(Ie.key, $);
        }
        let de,
          we = 0;
        const De = j - se + 1;
        let Nt = !1,
          go = 0;
        const Jt = new Array(De);
        for ($ = 0; $ < De; $++) Jt[$] = 0;
        for ($ = G; $ <= B; $++) {
          const Ie = a[$];
          if (we >= De) {
            We(Ie, x, C, !0);
            continue;
          }
          let Ge;
          if (Ie.key != null) Ge = pe.get(Ie.key);
          else
            for (de = se; de <= j; de++)
              if (Jt[de - se] === 0 && Ct(Ie, f[de])) {
                Ge = de;
                break;
              }
          Ge === void 0
            ? We(Ie, x, C, !0)
            : ((Jt[Ge - se] = $ + 1),
              Ge >= go ? (go = Ge) : (Nt = !0),
              N(Ie, f[Ge], m, null, x, C, E, P, T),
              we++);
        }
        const bo = Nt ? mc(Jt) : Bt;
        for (de = bo.length - 1, $ = De - 1; $ >= 0; $--) {
          const Ie = se + $,
            Ge = f[Ie],
            yo = Ie + 1 < z ? f[Ie + 1].el : w;
          Jt[$] === 0
            ? N(null, Ge, m, yo, x, C, E, P, T)
            : Nt && (de < 0 || $ !== bo[de] ? yt(Ge, m, yo, 2) : de--);
        }
      }
    },
    yt = (a, f, m, w, x = null) => {
      const { el: C, type: E, transition: P, children: T, shapeFlag: $ } = a;
      if ($ & 6) {
        yt(a.component.subTree, f, m, w);
        return;
      }
      if ($ & 128) {
        a.suspense.move(f, m, w);
        return;
      }
      if ($ & 64) {
        E.move(a, f, m, It);
        return;
      }
      if (E === J) {
        s(C, f, m);
        for (let B = 0; B < T.length; B++) yt(T[B], f, m, w);
        s(a.anchor, f, m);
        return;
      }
      if (E === zt) {
        I(a, f, m);
        return;
      }
      if (w !== 2 && $ & 1 && P)
        if (w === 0) P.beforeEnter(C), s(C, f, m), Ee(() => P.enter(C), x);
        else {
          const { leave: B, delayLeave: j, afterLeave: G } = P,
            se = () => s(C, f, m),
            pe = () => {
              B(C, () => {
                se(), G && G();
              });
            };
          j ? j(C, se, pe) : pe();
        }
      else s(C, f, m);
    },
    We = (a, f, m, w = !1, x = !1) => {
      const {
        type: C,
        props: E,
        ref: P,
        children: T,
        dynamicChildren: $,
        shapeFlag: z,
        patchFlag: B,
        dirs: j,
      } = a;
      if ((P != null && Bn(P, null, m, a, !0), z & 256)) {
        f.ctx.deactivate(a);
        return;
      }
      const G = z & 1 && j,
        se = !Ut(a);
      let pe;
      if ((se && (pe = E && E.onVnodeBeforeUnmount) && He(pe, f, a), z & 6))
        Ni(a.component, m, w);
      else {
        if (z & 128) {
          a.suspense.unmount(m, w);
          return;
        }
        G && Ye(a, null, f, "beforeUnmount"),
          z & 64
            ? a.type.remove(a, f, m, x, It, w)
            : $ && (C !== J || (B > 0 && B & 64))
            ? tt($, f, m, !1, !0)
            : ((C === J && B & 384) || (!x && z & 16)) && tt(T, f, m),
          w && vo(a);
      }
      ((se && (pe = E && E.onVnodeUnmounted)) || G) &&
        Ee(() => {
          pe && He(pe, f, a), G && Ye(a, null, f, "unmounted");
        }, m);
    },
    vo = (a) => {
      const { type: f, el: m, anchor: w, transition: x } = a;
      if (f === J) {
        Ii(m, w);
        return;
      }
      if (f === zt) {
        Y(a);
        return;
      }
      const C = () => {
        o(m), x && !x.persisted && x.afterLeave && x.afterLeave();
      };
      if (a.shapeFlag & 1 && x && !x.persisted) {
        const { leave: E, delayLeave: P } = x,
          T = () => E(m, C);
        P ? P(a.el, C, T) : T();
      } else C();
    },
    Ii = (a, f) => {
      let m;
      for (; a !== f; ) (m = v(a)), o(a), (a = m);
      o(f);
    },
    Ni = (a, f, m) => {
      const { bum: w, scope: x, update: C, subTree: E, um: P } = a;
      w && as(w),
        x.stop(),
        C && ((C.active = !1), We(E, a, f, m)),
        P && Ee(P, f),
        Ee(() => {
          a.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    tt = (a, f, m, w = !1, x = !1, C = 0) => {
      for (let E = C; E < a.length; E++) We(a[E], f, m, w, x);
    },
    yn = (a) =>
      a.shapeFlag & 6
        ? yn(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : v(a.anchor || a.el),
    mo = (a, f, m) => {
      a == null
        ? f._vnode && We(f._vnode, null, null, !0)
        : N(f._vnode || null, a, f, null, null, null, m),
        Lo(),
        In(),
        (f._vnode = a);
    },
    It = {
      p: N,
      um: We,
      m: yt,
      r: vo,
      mt: D,
      mc: M,
      pc: _e,
      pbc: Q,
      n: yn,
      o: e,
    };
  let is, ls;
  return (
    t && ([is, ls] = t(It)), { render: mo, hydrate: is, createApp: hc(mo, is) }
  );
}
function xt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function si(e, t, n = !1) {
  const s = e.children,
    o = t.children;
  if (W(s) && W(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[r] = ut(o[r])), (l.el = i.el)),
        n || si(i, l)),
        l.type === Wt && (l.el = i.el);
    }
}
function mc(e) {
  const t = e.slice(),
    n = [0];
  let s, o, r, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const u = e[s];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[s] = o), n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        (l = (r + i) >> 1), e[n[l]] < u ? (r = l + 1) : (i = l);
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s));
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; ) (n[r] = i), (i = t[i]);
  return n;
}
const gc = (e) => e.__isTeleport,
  J = Symbol(void 0),
  Wt = Symbol(void 0),
  Oe = Symbol(void 0),
  zt = Symbol(void 0),
  on = [];
let je = null;
function h(e = !1) {
  on.push((je = e ? null : []));
}
function bc() {
  on.pop(), (je = on[on.length - 1] || null);
}
let hn = 1;
function Ho(e) {
  hn += e;
}
function oi(e) {
  return (
    (e.dynamicChildren = hn > 0 ? je || Bt : null),
    bc(),
    hn > 0 && je && je.push(e),
    e
  );
}
function g(e, t, n, s, o, r) {
  return oi(y(e, t, n, s, o, r, !0));
}
function q(e, t, n, s, o) {
  return oi(V(e, t, n, s, o, !0));
}
function Fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const es = "__vInternal",
  ri = ({ key: e }) => e ?? null,
  Vn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? xe(e) || Ce(e) || Z(e)
        ? { i: Se, r: e, k: t, f: !!n }
        : e
      : null;
function y(
  e,
  t = null,
  n = null,
  s = 0,
  o = null,
  r = e === J ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ri(t),
    ref: t && Vn(t),
    scopeId: Qn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Se,
  };
  return (
    l
      ? (ro(c, n), r & 128 && e.normalize(c))
      : n && (c.shapeFlag |= xe(n) ? 8 : 16),
    hn > 0 &&
      !i &&
      je &&
      (c.patchFlag > 0 || r & 6) &&
      c.patchFlag !== 32 &&
      je.push(c),
    c
  );
}
const V = yc;
function yc(e, t = null, n = null, s = 0, o = null, r = !1) {
  if (((!e || e === Wr) && (e = Oe), Fn(e))) {
    const l = pt(e, t, !0);
    return (
      n && ro(l, n),
      hn > 0 &&
        !r &&
        je &&
        (l.shapeFlag & 6 ? (je[je.indexOf(e)] = l) : je.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Vc(e) && (e = e.__vccOpts), t)) {
    t = xc(t);
    let { class: l, style: c } = t;
    l && !xe(l) && (t.class = ve(l)),
      me(c) && (Lr(c) && !W(c) && (c = $e({}, c)), (t.style = Hs(c)));
  }
  const i = xe(e) ? 1 : Ul(e) ? 128 : gc(e) ? 64 : me(e) ? 4 : Z(e) ? 2 : 0;
  return y(e, t, n, s, o, i, r, !0);
}
function xc(e) {
  return e ? (Lr(e) || es in e ? $e({}, e) : e) : null;
}
function pt(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: i } = e,
    l = t ? En(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ri(l),
    ref:
      t && t.ref ? (n && o ? (W(o) ? o.concat(Vn(t)) : [o, Vn(t)]) : Vn(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== J ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && pt(e.ssContent),
    ssFallback: e.ssFallback && pt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Te(e = " ", t = 0) {
  return V(Wt, null, e, t);
}
function wc(e, t) {
  const n = V(zt, null, e);
  return (n.staticCount = t), n;
}
function U(e = "", t = !1) {
  return t ? (h(), q(Oe, null, e)) : V(Oe, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean"
    ? V(Oe)
    : W(e)
    ? V(J, null, e.slice())
    : typeof e == "object"
    ? ut(e)
    : V(Wt, null, String(e));
}
function ut(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : pt(e);
}
function ro(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (W(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), ro(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(es in t)
        ? (t._ctx = Se)
        : o === 3 &&
          Se &&
          (Se.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Z(t)
      ? ((t = { default: t, _ctx: Se }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Te(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function En(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = ve([t.class, s.class]));
      else if (o === "style") t.style = Hs([t.style, s.style]);
      else if (mn(o)) {
        const r = t[o],
          i = s[o];
        i &&
          r !== i &&
          !(W(r) && r.includes(i)) &&
          (t[o] = r ? [].concat(r, i) : i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function He(e, t, n, s = null) {
  Re(e, t, 7, [n, s]);
}
const $c = ni();
let kc = 0;
function Pc(e, t, n) {
  const s = e.type,
    o = (t ? t.appContext : e.appContext) || $c,
    r = {
      uid: kc++,
      vnode: e,
      type: s,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Xi(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Jr(s, o),
      emitsOptions: Fr(s, o),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: s.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = Bl.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let ye = null;
const ts = () => ye || Se,
  Gt = (e) => {
    (ye = e), e.scope.on();
  },
  Vt = () => {
    ye && ye.scope.off(), (ye = null);
  };
function ii(e) {
  return e.vnode.shapeFlag & 4;
}
let _n = !1;
function Cc(e, t = !1) {
  _n = t;
  const { props: n, children: s } = e.vnode,
    o = ii(e);
  lc(e, n, o, t), uc(e, s);
  const r = o ? Sc(e, t) : void 0;
  return (_n = !1), r;
}
function Sc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = nn(new Proxy(e.ctx, tc)));
  const { setup: s } = n;
  if (s) {
    const o = (e.setupContext = s.length > 1 ? ci(e) : null);
    Gt(e), Qt();
    const r = ht(s, e, 0, [e.props, o]);
    if ((Xt(), Vt(), pr(r))) {
      if ((r.then(Vt, Vt), t))
        return r
          .then((i) => {
            Ro(e, i, t);
          })
          .catch((i) => {
            Gn(i, e, 0);
          });
      e.asyncDep = r;
    } else Ro(e, r, t);
  } else li(e, t);
}
function Ro(e, t, n) {
  Z(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : me(t) && (e.setupState = Mr(t)),
    li(e, n);
}
let Do;
function li(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Do && !s.render) {
      const o = s.template || so(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          u = $e($e({ isCustomElement: r, delimiters: l }, i), c);
        s.render = Do(o, u);
      }
    }
    e.render = s.render || Ke;
  }
  Gt(e), Qt(), nc(e), Xt(), Vt();
}
function Tc(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Ae(e, "get", "$attrs"), t[n];
    },
  });
}
function ci(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Tc(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function io(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Mr(nn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in sn) return sn[n](e);
        },
        has(t, n) {
          return n in t || n in sn;
        },
      }))
    );
}
function Lc(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Vc(e) {
  return Z(e) && "__vccOpts" in e;
}
const K = (e, t) => El(e, t, _n);
function Ec() {
  return Ac().slots;
}
function Ac() {
  const e = ts();
  return e.setupContext || (e.setupContext = ci(e));
}
function Hn(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? me(t) && !W(t)
      ? Fn(t)
        ? V(e, null, [t])
        : V(e, t)
      : V(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Fn(n) && (n = [n]),
      V(e, t, n));
}
const Mc = Symbol(""),
  Ic = () => qe(Mc),
  Nc = "3.2.47",
  Oc = "http://www.w3.org/2000/svg",
  St = typeof document < "u" ? document : null,
  Uo = St && St.createElement("template"),
  Bc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const o = t
        ? St.createElementNS(Oc, e)
        : St.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          o.setAttribute("multiple", s.multiple),
        o
      );
    },
    createText: (e) => St.createTextNode(e),
    createComment: (e) => St.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => St.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, o, r) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === r || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === r || !(o = o.nextSibling));

        );
      else {
        Uo.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Uo.content;
        if (s) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Fc(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Hc(e, t, n) {
  const s = e.style,
    o = xe(n);
  if (n && !o) {
    if (t && !xe(t)) for (const r in t) n[r] == null && Vs(s, r, "");
    for (const r in n) Vs(s, r, n[r]);
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = r);
  }
}
const zo = /\s*!important$/;
function Vs(e, t, n) {
  if (W(n)) n.forEach((s) => Vs(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Rc(e, t);
    zo.test(n)
      ? e.setProperty(Yt(s), n.replace(zo, ""), "important")
      : (e[s] = n);
  }
}
const jo = ["Webkit", "Moz", "ms"],
  hs = {};
function Rc(e, t) {
  const n = hs[t];
  if (n) return n;
  let s = Je(t);
  if (s !== "filter" && s in e) return (hs[t] = s);
  s = Kn(s);
  for (let o = 0; o < jo.length; o++) {
    const r = jo[o] + s;
    if (r in e) return (hs[t] = r);
  }
  return t;
}
const Ko = "http://www.w3.org/1999/xlink";
function Dc(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ko, t.slice(6, t.length))
      : e.setAttributeNS(Ko, t, n);
  else {
    const r = Di(t);
    n == null || (r && !dr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? "" : n);
  }
}
function Uc(e, t, n, s, o, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, o, r), (e[t] = n ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n ?? "";
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = dr(n))
      : n == null && c === "string"
      ? ((n = ""), (l = !0))
      : c === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function zc(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function jc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Kc(e, t, n, s, o = null) {
  const r = e._vei || (e._vei = {}),
    i = r[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = qc(t);
    if (s) {
      const u = (r[t] = Yc(s, o));
      zc(e, l, u, c);
    } else i && (jc(e, l, i, c), (r[t] = void 0));
  }
}
const qo = /(?:Once|Passive|Capture)$/;
function qc(e) {
  let t;
  if (qo.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(qo)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Yt(e.slice(2)), t];
}
let _s = 0;
const Wc = Promise.resolve(),
  Gc = () => _s || (Wc.then(() => (_s = 0)), (_s = Date.now()));
function Yc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Re(Qc(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Gc()), n;
}
function Qc(e, t) {
  if (W(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (o) => !o._stopped && s && s(o))
    );
  } else return t;
}
const Wo = /^on[a-z]/,
  Xc = (e, t, n, s, o = !1, r, i, l, c) => {
    t === "class"
      ? Fc(e, s, o)
      : t === "style"
      ? Hc(e, n, s)
      : mn(t)
      ? Rs(t) || Kc(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Jc(e, t, s, o)
        )
      ? Uc(e, t, s, r, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Dc(e, t, s, o));
  };
function Jc(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Wo.test(t) && Z(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Wo.test(t) && xe(n))
    ? !1
    : t in e;
}
function Zc(e) {
  const t = ts();
  if (!t) return;
  const n = (t.ut = (o = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((r) => As(r, o));
    }),
    s = () => {
      const o = e(t.proxy);
      Es(t.subTree, o), n(o);
    };
  Rr(s),
    Be(() => {
      const o = new MutationObserver(s);
      o.observe(t.subTree.el.parentNode, { childList: !0 }),
        vt(() => o.disconnect());
    });
}
function Es(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Es(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) As(e.el, t);
  else if (e.type === J) e.children.forEach((n) => Es(n, t));
  else if (e.type === zt) {
    let { el: n, anchor: s } = e;
    for (; n && (As(n, t), n !== s); ) n = n.nextSibling;
  }
}
function As(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t) n.setProperty(`--${s}`, t[s]);
  }
}
const ct = "transition",
  Zt = "animation",
  ns = (e, { slots: t }) => Hn(Ur, ea(e), t);
ns.displayName = "Transition";
const ai = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
ns.props = $e({}, Ur.props, ai);
const wt = (e, t = []) => {
    W(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Go = (e) => (e ? (W(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ea(e) {
  const t = {};
  for (const O in e) O in ai || (t[O] = e[O]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: s,
      duration: o,
      enterFromClass: r = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = r,
      appearActiveClass: u = i,
      appearToClass: d = l,
      leaveFromClass: p = `${n}-leave-from`,
      leaveActiveClass: v = `${n}-leave-active`,
      leaveToClass: k = `${n}-leave-to`,
    } = e,
    H = ta(o),
    N = H && H[0],
    X = H && H[1],
    {
      onBeforeEnter: b,
      onEnter: L,
      onEnterCancelled: I,
      onLeave: Y,
      onLeaveCancelled: te,
      onBeforeAppear: he = b,
      onAppear: oe = L,
      onAppearCancelled: M = I,
    } = t,
    ee = (O, ne, D) => {
      $t(O, ne ? d : l), $t(O, ne ? u : i), D && D();
    },
    Q = (O, ne) => {
      (O._isLeaving = !1), $t(O, p), $t(O, k), $t(O, v), ne && ne();
    },
    ie = (O) => (ne, D) => {
      const Me = O ? oe : L,
        fe = () => ee(ne, O, D);
      wt(Me, [ne, fe]),
        Yo(() => {
          $t(ne, O ? c : r), at(ne, O ? d : l), Go(Me) || Qo(ne, s, N, fe);
        });
    };
  return $e(t, {
    onBeforeEnter(O) {
      wt(b, [O]), at(O, r), at(O, i);
    },
    onBeforeAppear(O) {
      wt(he, [O]), at(O, c), at(O, u);
    },
    onEnter: ie(!1),
    onAppear: ie(!0),
    onLeave(O, ne) {
      O._isLeaving = !0;
      const D = () => Q(O, ne);
      at(O, p),
        oa(),
        at(O, v),
        Yo(() => {
          O._isLeaving && ($t(O, p), at(O, k), Go(Y) || Qo(O, s, X, D));
        }),
        wt(Y, [O, D]);
    },
    onEnterCancelled(O) {
      ee(O, !1), wt(I, [O]);
    },
    onAppearCancelled(O) {
      ee(O, !0), wt(M, [O]);
    },
    onLeaveCancelled(O) {
      Q(O), wt(te, [O]);
    },
  });
}
function ta(e) {
  if (e == null) return null;
  if (me(e)) return [ps(e.enter), ps(e.leave)];
  {
    const t = ps(e);
    return [t, t];
  }
}
function ps(e) {
  return Yi(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function $t(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Yo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let na = 0;
function Qo(e, t, n, s) {
  const o = (e._endId = ++na),
    r = () => {
      o === e._endId && s();
    };
  if (n) return setTimeout(r, n);
  const { type: i, timeout: l, propCount: c } = sa(e, t);
  if (!i) return s();
  const u = i + "end";
  let d = 0;
  const p = () => {
      e.removeEventListener(u, v), r();
    },
    v = (k) => {
      k.target === e && ++d >= c && p();
    };
  setTimeout(() => {
    d < c && p();
  }, l + 1),
    e.addEventListener(u, v);
}
function sa(e, t) {
  const n = window.getComputedStyle(e),
    s = (H) => (n[H] || "").split(", "),
    o = s(`${ct}Delay`),
    r = s(`${ct}Duration`),
    i = Xo(o, r),
    l = s(`${Zt}Delay`),
    c = s(`${Zt}Duration`),
    u = Xo(l, c);
  let d = null,
    p = 0,
    v = 0;
  t === ct
    ? i > 0 && ((d = ct), (p = i), (v = r.length))
    : t === Zt
    ? u > 0 && ((d = Zt), (p = u), (v = c.length))
    : ((p = Math.max(i, u)),
      (d = p > 0 ? (i > u ? ct : Zt) : null),
      (v = d ? (d === ct ? r.length : c.length) : 0));
  const k =
    d === ct && /\b(transform|all)(,|$)/.test(s(`${ct}Property`).toString());
  return { type: d, timeout: p, propCount: v, hasTransform: k };
}
function Xo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => Jo(n) + Jo(e[s])));
}
function Jo(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function oa() {
  return document.body.offsetHeight;
}
const ra = ["ctrl", "shift", "alt", "meta"],
  ia = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => ra.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  la =
    (e, t) =>
    (n, ...s) => {
      for (let o = 0; o < t.length; o++) {
        const r = ia[t[o]];
        if (r && r(n, t)) return;
      }
      return e(n, ...s);
    },
  ca = $e({ patchProp: Xc }, Bc);
let vs,
  Zo = !1;
function aa() {
  return (vs = Zo ? vs : pc(ca)), (Zo = !0), vs;
}
const ua = (...e) => {
  const t = aa().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const o = fa(s);
      if (o) return n(o, !0, o instanceof SVGElement);
    }),
    t
  );
};
function fa(e) {
  return xe(e) ? document.querySelector(e) : e;
}
const F = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, o] of t) n[s] = o;
    return n;
  },
  da = "modulepreload",
  ha = function (e) {
    return "/popover-vue/" + e;
  },
  er = {},
  _a = function (t, n, s) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      n.map((r) => {
        if (((r = ha(r)), r in er)) return;
        er[r] = !0;
        const i = r.endsWith(".css"),
          l = i ? '[rel="stylesheet"]' : "";
        if (s)
          for (let d = o.length - 1; d >= 0; d--) {
            const p = o[d];
            if (p.href === r && (!i || p.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${r}"]${l}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = i ? "stylesheet" : da),
          i || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = r),
          document.head.appendChild(u),
          i)
        )
          return new Promise((d, p) => {
            u.addEventListener("load", d),
              u.addEventListener("error", () =>
                p(new Error(`Unable to preload CSS for ${r}`))
              );
          });
      })
    ).then(() => t());
  };
const pa = R({
  __name: "VPBadge",
  props: { text: null, type: null },
  setup(e) {
    return (t, n) => (
      h(),
      g(
        "span",
        { class: ve(["VPBadge", e.type ?? "tip"]) },
        [S(t.$slots, "default", {}, () => [Te(ce(e.text), 1)], !0)],
        2
      )
    );
  },
});
const va = F(pa, [["__scopeId", "data-v-350d3852"]]),
  ma = JSON.parse(
    '{"lang":"en-US","dir":"ltr","title":"Popover vue","description":"Vue.js popover component","base":"/popover-vue/","head":[],"appearance":true,"themeConfig":{"repo":"rameshjs/popover-vue","docsRepo":"rameshjs/popover-vue","docsDir":"docs","docsBranch":"main","editLinks":true,"socialLinks":[{"icon":"github","link":"https://github.com/rameshjs/popover-vue"}],"nav":[{"text":"Home","link":"/"}],"sidebar":[{"text":"Getting Started","items":[{"text":"Installation","link":"/installation"}]},{"text":"Usage","items":[{"text":"Passing content","link":"/usage"}]},{"text":"Props","items":[{"text":"General configuration","link":"/general-configuration"}]},{"text":"Slots","items":[{"text":"Content","link":"/content"},{"text":"Slot props","link":"/slot-props"}]},{"text":"Events","items":[{"text":"Popover events","link":"/events"}]},{"text":"Customization","items":[{"text":"css","link":"/css"}]}]},"locales":{},"scrollOffset":90,"cleanUrls":false}'
  ),
  ss = /^[a-z]+:/i,
  ga = /^pathname:\/\//,
  tr = "vitepress-theme-appearance",
  ui = /#.*$/,
  ba = /(index)?\.(md|html)$/,
  ke = typeof document < "u",
  fi = {
    relativePath: "",
    title: "404",
    description: "Not Found",
    headers: [],
    frontmatter: { sidebar: !1, layout: "page" },
    lastUpdated: 0,
  };
function Mt(e, t, n = !1) {
  if (t === void 0) return !1;
  if (((e = nr(`/${e}`)), n)) return new RegExp(t).test(e);
  if (nr(t) !== e) return !1;
  const s = t.match(ui);
  return s ? (ke ? location.hash : "") === s[0] : !0;
}
function nr(e) {
  return decodeURI(e).replace(ui, "").replace(ba, "");
}
function di(e) {
  return ss.test(e);
}
function ya(e, t) {
  var s, o, r, i, l, c, u;
  const n =
    Object.keys(e.locales).find(
      (d) => d !== "root" && !di(d) && Mt(t, `/${d}/`, !0)
    ) || "root";
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((o = e.locales[n]) == null ? void 0 : o.dir) ?? e.dir,
    title: ((r = e.locales[n]) == null ? void 0 : r.title) ?? e.title,
    titleTemplate:
      ((i = e.locales[n]) == null ? void 0 : i.titleTemplate) ??
      e.titleTemplate,
    description:
      ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: _i(e.head, ((c = e.locales[n]) == null ? void 0 : c.head) ?? []),
    themeConfig: {
      ...e.themeConfig,
      ...((u = e.locales[n]) == null ? void 0 : u.themeConfig),
    },
  });
}
function hi(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate;
  if (typeof s == "string" && s.includes(":title"))
    return s.replace(/:title/g, n);
  const o = xa(e.title, s);
  return `${n}${o}`;
}
function xa(e, t) {
  return t === !1
    ? ""
    : t === !0 || t === void 0
    ? ` | ${e}`
    : e === t
    ? ""
    : ` | ${t}`;
}
function wa(e, t) {
  const [n, s] = t;
  if (n !== "meta") return !1;
  const o = Object.entries(s)[0];
  return o == null ? !1 : e.some(([r, i]) => r === n && i[o[0]] === o[1]);
}
function _i(e, t) {
  return [...e.filter((n) => !wa(t, n)), ...t];
}
const $a = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  ka = /^[a-z]:/i;
function sr(e) {
  const t = ka.exec(e),
    n = t ? t[0] : "";
  return (
    n +
    e
      .slice(n.length)
      .replace($a, "_")
      .replace(/(^|\/)_+(?=[^/]*$)/, "$1")
  );
}
const pi = Symbol(),
  ft = Sl(ma);
function Pa(e) {
  const t = K(() => ya(ft.value, e.data.relativePath));
  return {
    site: t,
    theme: K(() => t.value.themeConfig),
    page: K(() => e.data),
    frontmatter: K(() => e.data.frontmatter),
    lang: K(() => t.value.lang),
    dir: K(() => t.value.dir),
    localeIndex: K(() => t.value.localeIndex || "root"),
    title: K(() => hi(t.value, e.data)),
    description: K(() => e.data.description || t.value.description),
    isDark: ae(!1),
  };
}
function vi() {
  const e = qe(pi);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
function Ca(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function pn(e) {
  return ss.test(e) || e.startsWith(".") ? e : Ca(ft.value.base, e);
}
function mi(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, "/index")), ke)) {
    const n = "/popover-vue/";
    t = sr(t.slice(n.length).replace(/\//g, "_") || "index") + ".md";
    let s = __VP_HASH_MAP__[t.toLowerCase()];
    s ||
      ((t = t.endsWith("_index.md")
        ? t.slice(0, -9) + ".md"
        : t.slice(0, -3) + "_index.md"),
      (s = __VP_HASH_MAP__[t.toLowerCase()])),
      (t = `${n}assets/${t}.${s}.js`);
  } else t = `./${sr(t.slice(1).replace(/\//g, "_"))}.md.js`;
  return t;
}
const gi = Symbol(),
  or = "http://a.com",
  Sa = () => ({ path: "/", component: null, data: fi });
function Ta(e, t) {
  const n = Wn(Sa()),
    s = { route: n, go: o };
  async function o(l = ke ? location.href : "/") {
    var u, d;
    await ((u = s.onBeforeRouteChange) == null ? void 0 : u.call(s, l));
    const c = new URL(l, or);
    ft.value.cleanUrls ||
      (!c.pathname.endsWith("/") &&
        !c.pathname.endsWith(".html") &&
        ((c.pathname += ".html"), (l = c.pathname + c.search + c.hash))),
      ke &&
        l !== location.href &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title
        ),
        history.pushState(null, "", l)),
      await i(l),
      await ((d = s.onAfterRouteChanged) == null ? void 0 : d.call(s, l));
  }
  let r = null;
  async function i(l, c = 0, u = !1) {
    const d = new URL(l, or),
      p = (r = d.pathname);
    try {
      let v = await e(p);
      if (r === p) {
        r = null;
        const { default: k, __pageData: H } = v;
        if (!k) throw new Error(`Invalid route component: ${k}`);
        (n.path = ke ? p : pn(p)),
          (n.component = nn(k)),
          (n.data = nn(H)),
          ke &&
            Zs(() => {
              let N =
                ft.value.base +
                H.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
              if (
                (!ft.value.cleanUrls && !N.endsWith("/") && (N += ".html"),
                N !== d.pathname &&
                  ((d.pathname = N),
                  (l = N + d.search + d.hash),
                  history.replaceState(null, "", l)),
                d.hash && !c)
              ) {
                let X = null;
                try {
                  X = document.querySelector(decodeURIComponent(d.hash));
                } catch (b) {
                  console.warn(b);
                }
                if (X) {
                  rr(X, d.hash);
                  return;
                }
              }
              window.scrollTo(0, c);
            });
      }
    } catch (v) {
      if (
        (!/fetch/.test(v.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(v),
        !u)
      )
        try {
          const k = await fetch(ft.value.base + "hashmap.json");
          (window.__VP_HASH_MAP__ = await k.json()), await i(l, c, !0);
          return;
        } catch {}
      r === p &&
        ((r = null),
        (n.path = ke ? p : pn(p)),
        (n.component = t ? nn(t) : null),
        (n.data = fi));
    }
  }
  return (
    ke &&
      (window.addEventListener(
        "click",
        (l) => {
          if (l.target.closest("button")) return;
          const u = l.target.closest("a");
          if (
            u &&
            !u.closest(".vp-raw") &&
            (u instanceof SVGElement || !u.download)
          ) {
            const { target: d } = u,
              {
                href: p,
                origin: v,
                pathname: k,
                hash: H,
                search: N,
              } = new URL(
                u.href instanceof SVGAnimatedString ? u.href.animVal : u.href,
                u.baseURI
              ),
              X = window.location,
              b = k.match(/\.\w+$/);
            !l.ctrlKey &&
              !l.shiftKey &&
              !l.altKey &&
              !l.metaKey &&
              d !== "_blank" &&
              v === X.origin &&
              !(b && b[0] !== ".html") &&
              (l.preventDefault(),
              k === X.pathname && N === X.search
                ? H &&
                  H !== X.hash &&
                  (history.pushState(null, "", H),
                  window.dispatchEvent(new Event("hashchange")),
                  rr(u, H, u.classList.contains("header-anchor")))
                : o(p));
          }
        },
        { capture: !0 }
      ),
      window.addEventListener("popstate", (l) => {
        i(location.href, (l.state && l.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (l) => {
        l.preventDefault();
      })),
    s
  );
}
function La() {
  const e = qe(gi);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function mt() {
  return La().route;
}
function rr(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains("header-anchor")
      ? e
      : document.querySelector(decodeURIComponent(t));
  } catch (o) {
    console.warn(o);
  }
  if (s) {
    let o = ft.value.scrollOffset;
    typeof o == "string" &&
      (o = document.querySelector(o).getBoundingClientRect().bottom + 24);
    const r = parseInt(window.getComputedStyle(s).paddingTop, 10),
      i = window.scrollY + s.getBoundingClientRect().top - o + r;
    !n || Math.abs(i - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, i)
      : window.scrollTo({ left: 0, top: i, behavior: "smooth" });
  }
}
const Va = R({
    name: "VitePressContent",
    props: { onContentUpdated: Function },
    setup(e) {
      const t = mt();
      return (
        to(() => {
          var n;
          (n = e.onContentUpdated) == null || n.call(e);
        }),
        () =>
          Hn("div", { style: { position: "relative" } }, [
            t.component ? Hn(t.component) : null,
          ])
      );
    },
  }),
  ue = vi;
var ir;
const bi = typeof window < "u",
  Ea = (e) => typeof e == "string",
  Aa = () => {};
bi &&
  (ir = window == null ? void 0 : window.navigator) != null &&
  ir.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);
function yi(e) {
  return typeof e == "function" ? e() : _(e);
}
function Ma(e) {
  return e;
}
function xi(e) {
  return gr() ? (Zi(e), !0) : !1;
}
function Ia(e) {
  return typeof e == "function" ? K(e) : ae(e);
}
function Na(e, t = !0) {
  ts() ? Be(e) : t ? e() : Zs(e);
}
function Oa(e) {
  var t;
  const n = yi(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const lo = bi ? window : void 0;
function Ba(...e) {
  let t, n, s, o;
  if (
    (Ea(e[0]) || Array.isArray(e[0])
      ? (([n, s, o] = e), (t = lo))
      : ([t, n, s, o] = e),
    !t)
  )
    return Aa;
  Array.isArray(n) || (n = [n]), Array.isArray(s) || (s = [s]);
  const r = [],
    i = () => {
      r.forEach((d) => d()), (r.length = 0);
    },
    l = (d, p, v, k) => (
      d.addEventListener(p, v, k), () => d.removeEventListener(p, v, k)
    ),
    c = Xe(
      () => [Oa(t), yi(o)],
      ([d, p]) => {
        i(), d && r.push(...n.flatMap((v) => s.map((k) => l(d, v, k, p))));
      },
      { immediate: !0, flush: "post" }
    ),
    u = () => {
      c(), i();
    };
  return xi(u), u;
}
function Fa(e, t = !1) {
  const n = ae(),
    s = () => (n.value = Boolean(e()));
  return s(), Na(s, t), n;
}
function Ms(e, t = {}) {
  const { window: n = lo } = t,
    s = Fa(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
  let o;
  const r = ae(!1),
    i = () => {
      o &&
        ("removeEventListener" in o
          ? o.removeEventListener("change", l)
          : o.removeListener(l));
    },
    l = () => {
      s.value &&
        (i(),
        (o = n.matchMedia(Ia(e).value)),
        (r.value = o.matches),
        "addEventListener" in o
          ? o.addEventListener("change", l)
          : o.addListener(l));
    };
  return Et(l), xi(() => i()), r;
}
const Is =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  Ns = "__vueuse_ssr_handlers__";
Is[Ns] = Is[Ns] || {};
Is[Ns];
var lr;
(function (e) {
  (e.UP = "UP"),
    (e.RIGHT = "RIGHT"),
    (e.DOWN = "DOWN"),
    (e.LEFT = "LEFT"),
    (e.NONE = "NONE");
})(lr || (lr = {}));
var Ha = Object.defineProperty,
  cr = Object.getOwnPropertySymbols,
  Ra = Object.prototype.hasOwnProperty,
  Da = Object.prototype.propertyIsEnumerable,
  ar = (e, t, n) =>
    t in e
      ? Ha(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Ua = (e, t) => {
    for (var n in t || (t = {})) Ra.call(t, n) && ar(e, n, t[n]);
    if (cr) for (var n of cr(t)) Da.call(t, n) && ar(e, n, t[n]);
    return e;
  };
const za = {
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
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
Ua({ linear: Ma }, za);
function ja({ window: e = lo } = {}) {
  if (!e) return { x: ae(0), y: ae(0) };
  const t = ae(e.scrollX),
    n = ae(e.scrollY);
  return (
    Ba(
      e,
      "scroll",
      () => {
        (t.value = e.scrollX), (n.value = e.scrollY);
      },
      { capture: !1, passive: !0 }
    ),
    { x: t, y: n }
  );
}
function Ka(e, t) {
  let n,
    s = !1;
  return () => {
    n && clearTimeout(n),
      s
        ? (n = setTimeout(e, t))
        : (e(),
          (s = !0),
          setTimeout(() => {
            s = !1;
          }, t));
  };
}
function Os(e) {
  return /^\//.test(e) ? e : `/${e}`;
}
function vn(e) {
  if (di(e)) return e.replace(ga, "");
  const { site: t } = ue(),
    { pathname: n, search: s, hash: o } = new URL(e, "http://example.com"),
    r =
      n.endsWith("/") || n.endsWith(".html")
        ? e
        : e.replace(
            /(?:(^\.+)\/)?.*$/,
            `$1${n.replace(
              /(\.md)?$/,
              t.value.cleanUrls ? "" : ".html"
            )}${s}${o}`
          );
  return pn(r);
}
function wi(e, t) {
  if (Array.isArray(e)) return e;
  if (e == null) return [];
  t = Os(t);
  const n = Object.keys(e)
    .sort((s, o) => o.split("/").length - s.split("/").length)
    .find((s) => t.startsWith(Os(s)));
  return n ? e[n] : [];
}
function qa(e) {
  const t = [];
  let n = 0;
  for (const s in e) {
    const o = e[s];
    if (o.items) {
      n = t.push(o);
      continue;
    }
    t[n] || t.push({ items: [] }), t[n].items.push(o);
  }
  return t;
}
function Wa(e) {
  const t = [];
  function n(s) {
    for (const o of s)
      o.text && o.link && t.push({ text: o.text, link: o.link }),
        o.items && n(o.items);
  }
  return n(e), t;
}
function Bs(e, t) {
  return Array.isArray(t)
    ? t.some((n) => Bs(e, n))
    : Mt(e, t.link)
    ? !0
    : t.items
    ? Bs(e, t.items)
    : !1;
}
function rt() {
  const e = mt(),
    { theme: t, frontmatter: n } = ue(),
    s = Ms("(min-width: 960px)"),
    o = ae(!1),
    r = K(() => {
      const k = t.value.sidebar,
        H = e.data.relativePath;
      return k ? wi(k, H) : [];
    }),
    i = K(
      () =>
        n.value.sidebar !== !1 &&
        r.value.length > 0 &&
        n.value.layout !== "home"
    ),
    l = K(() =>
      n.value.layout === "home"
        ? !1
        : n.value.aside != null
        ? !!n.value.aside
        : t.value.aside !== !1
    ),
    c = K(() => i.value && s.value),
    u = K(() => (i.value ? qa(r.value) : []));
  function d() {
    o.value = !0;
  }
  function p() {
    o.value = !1;
  }
  function v() {
    o.value ? p() : d();
  }
  return {
    isOpen: o,
    sidebar: r,
    sidebarGroups: u,
    hasSidebar: i,
    hasAside: l,
    isSidebarEnabled: c,
    open: d,
    close: p,
    toggle: v,
  };
}
function Ga(e, t) {
  let n;
  Et(() => {
    n = e.value ? document.activeElement : void 0;
  }),
    Be(() => {
      window.addEventListener("keyup", s);
    }),
    vt(() => {
      window.removeEventListener("keyup", s);
    });
  function s(o) {
    o.key === "Escape" && e.value && (t(), n == null || n.focus());
  }
}
function Ya(e) {
  const { page: t } = ue(),
    n = ae(!1),
    s = K(() => e.value.collapsed != null),
    o = K(() => !!e.value.link),
    r = K(() => Mt(t.value.relativePath, e.value.link)),
    i = K(() =>
      r.value
        ? !0
        : e.value.items
        ? Bs(t.value.relativePath, e.value.items)
        : !1
    ),
    l = K(() => !!(e.value.items && e.value.items.length));
  Et(() => {
    n.value = !!(s.value && e.value.collapsed);
  }),
    Et(() => {
      (r.value || i.value) && (n.value = !1);
    });
  function c() {
    s.value && (n.value = !n.value);
  }
  return {
    collapsed: n,
    collapsible: s,
    isLink: o,
    isActiveLink: r,
    hasActiveLink: i,
    hasChildren: l,
    toggle: c,
  };
}
const Qa = R({
  __name: "VPSkipLink",
  setup(e) {
    const t = mt(),
      n = ae();
    Xe(
      () => t.path,
      () => n.value.focus()
    );
    function s({ target: o }) {
      const r = document.querySelector(o.hash);
      if (r) {
        const i = () => {
          r.removeAttribute("tabindex"), r.removeEventListener("blur", i);
        };
        r.setAttribute("tabindex", "-1"),
          r.addEventListener("blur", i),
          r.focus(),
          window.scrollTo(0, 0);
      }
    }
    return (o, r) => (
      h(),
      g(
        J,
        null,
        [
          y(
            "span",
            { ref_key: "backToTop", ref: n, tabindex: "-1" },
            null,
            512
          ),
          y(
            "a",
            {
              href: "#VPContent",
              class: "VPSkipLink visually-hidden",
              onClick: s,
            },
            " Skip to content "
          ),
        ],
        64
      )
    );
  },
});
const Xa = F(Qa, [["__scopeId", "data-v-151f2593"]]),
  Ja = { key: 0, class: "VPBackdrop" },
  Za = R({
    __name: "VPBackdrop",
    props: { show: { type: Boolean } },
    setup(e) {
      return (t, n) => (
        h(),
        q(
          ns,
          { name: "fade" },
          { default: A(() => [e.show ? (h(), g("div", Ja)) : U("", !0)]), _: 1 }
        )
      );
    },
  });
const eu = F(Za, [["__scopeId", "data-v-c79a1216"]]);
function tu() {
  const e = ae(!1);
  function t() {
    (e.value = !0), window.addEventListener("resize", o);
  }
  function n() {
    (e.value = !1), window.removeEventListener("resize", o);
  }
  function s() {
    e.value ? n() : t();
  }
  function o() {
    window.outerWidth >= 768 && n();
  }
  const r = mt();
  return (
    Xe(() => r.path, n),
    { isScreenOpen: e, openScreen: t, closeScreen: n, toggleScreen: s }
  );
}
function gn({ removeCurrent: e = !0, correspondingLink: t = !1 } = {}) {
  const { site: n, localeIndex: s, page: o, theme: r } = ue(),
    i = K(() => {
      var c, u;
      return {
        label: (c = n.value.locales[s.value]) == null ? void 0 : c.label,
        link:
          ((u = n.value.locales[s.value]) == null ? void 0 : u.link) ||
          (s.value === "root" ? "/" : `/${s.value}/`),
      };
    });
  return {
    localeLinks: K(() =>
      Object.entries(n.value.locales).flatMap(([c, u]) =>
        e && i.value.label === u.label
          ? []
          : {
              text: u.label,
              link: nu(
                u.link || (c === "root" ? "/" : `/${c}/`),
                r.value.i18nRouting !== !1 && t,
                o.value.relativePath.slice(i.value.link.length - 1),
                !n.value.cleanUrls
              ),
            }
      )
    ),
    currentLang: i,
  };
}
function nu(e, t, n, s) {
  return t
    ? e.replace(/\/$/, "") +
        Os(
          n.replace(/(^|\/)?index.md$/, "$1").replace(/\.md$/, s ? ".html" : "")
        )
    : e;
}
const su = ["src", "alt"],
  ou = { inheritAttrs: !1 },
  ru = R({
    ...ou,
    __name: "VPImage",
    props: { image: null, alt: null },
    setup(e) {
      return (t, n) => {
        const s = At("VPImage", !0);
        return e.image
          ? (h(),
            g(
              J,
              { key: 0 },
              [
                typeof e.image == "string" || "src" in e.image
                  ? (h(),
                    g(
                      "img",
                      En(
                        { key: 0, class: "VPImage" },
                        typeof e.image == "string"
                          ? t.$attrs
                          : { ...e.image, ...t.$attrs },
                        {
                          src: _(pn)(
                            typeof e.image == "string" ? e.image : e.image.src
                          ),
                          alt:
                            e.alt ??
                            (typeof e.image == "string"
                              ? ""
                              : e.image.alt || ""),
                        }
                      ),
                      null,
                      16,
                      su
                    ))
                  : (h(),
                    g(
                      J,
                      { key: 1 },
                      [
                        V(
                          s,
                          En(
                            {
                              class: "dark",
                              image: e.image.dark,
                              alt: e.image.alt,
                            },
                            t.$attrs
                          ),
                          null,
                          16,
                          ["image", "alt"]
                        ),
                        V(
                          s,
                          En(
                            {
                              class: "light",
                              image: e.image.light,
                              alt: e.image.alt,
                            },
                            t.$attrs
                          ),
                          null,
                          16,
                          ["image", "alt"]
                        ),
                      ],
                      64
                    )),
              ],
              64
            ))
          : U("", !0);
      };
    },
  });
const co = F(ru, [["__scopeId", "data-v-6db2186b"]]),
  iu = ["href"],
  lu = R({
    __name: "VPNavBarTitle",
    setup(e) {
      const { site: t, theme: n } = ue(),
        { hasSidebar: s } = rt(),
        { currentLang: o } = gn();
      return (r, i) => (
        h(),
        g(
          "div",
          { class: ve(["VPNavBarTitle", { "has-sidebar": _(s) }]) },
          [
            y(
              "a",
              { class: "title", href: _(vn)(_(o).link) },
              [
                S(r.$slots, "nav-bar-title-before", {}, void 0, !0),
                _(n).logo
                  ? (h(),
                    q(
                      co,
                      { key: 0, class: "logo", image: _(n).logo },
                      null,
                      8,
                      ["image"]
                    ))
                  : U("", !0),
                _(n).siteTitle
                  ? (h(), g(J, { key: 1 }, [Te(ce(_(n).siteTitle), 1)], 64))
                  : _(n).siteTitle === void 0
                  ? (h(), g(J, { key: 2 }, [Te(ce(_(t).title), 1)], 64))
                  : U("", !0),
                S(r.$slots, "nav-bar-title-after", {}, void 0, !0),
              ],
              8,
              iu
            ),
          ],
          2
        )
      );
    },
  });
const cu = F(lu, [["__scopeId", "data-v-6d2fb2d9"]]);
const au = { key: 0, class: "VPNavBarSearch" },
  uu = {
    type: "button",
    class: "DocSearch DocSearch-Button",
    "aria-label": "Search",
  },
  fu = { class: "DocSearch-Button-Container" },
  du = y(
    "svg",
    {
      class: "DocSearch-Search-Icon",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
    },
    [
      y("path", {
        d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
        stroke: "currentColor",
        fill: "none",
        "fill-rule": "evenodd",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }),
    ],
    -1
  ),
  hu = { class: "DocSearch-Button-Placeholder" },
  _u = y(
    "span",
    { class: "DocSearch-Button-Keys" },
    [
      y("kbd", { class: "DocSearch-Button-Key" }),
      y("kbd", { class: "DocSearch-Button-Key" }, "K"),
    ],
    -1
  ),
  pu = R({
    __name: "VPNavBarSearch",
    setup(e) {
      Zc((d) => ({ "636b0e38": r.value }));
      const t = () => null,
        { theme: n, localeIndex: s } = ue(),
        o = ae(!1),
        r = ae("'Meta'"),
        i = K(() => {
          var d, p, v, k, H, N, X, b;
          return (
            ((H =
              (k =
                (v =
                  (p = (d = n.value.algolia) == null ? void 0 : d.locales) ==
                  null
                    ? void 0
                    : p[s.value]) == null
                  ? void 0
                  : v.translations) == null
                ? void 0
                : k.button) == null
              ? void 0
              : H.buttonText) ||
            ((b =
              (X = (N = n.value.algolia) == null ? void 0 : N.translations) ==
              null
                ? void 0
                : X.button) == null
              ? void 0
              : b.buttonText) ||
            "Search"
          );
        }),
        l = () => {
          const d = "VPAlgoliaPreconnect";
          (window.requestIdleCallback || setTimeout)(() => {
            const v = document.createElement("link");
            (v.id = d),
              (v.rel = "preconnect"),
              (v.href = `https://${n.value.algolia.appId}-dsn.algolia.net`),
              (v.crossOrigin = ""),
              document.head.appendChild(v);
          });
        };
      Be(() => {
        if (!n.value.algolia) return;
        l(),
          (r.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
            ? "'⌘'"
            : "'Ctrl'");
        const d = (v) => {
            v.key === "k" &&
              (v.ctrlKey || v.metaKey) &&
              (v.preventDefault(), c(), p());
          },
          p = () => {
            window.removeEventListener("keydown", d);
          };
        window.addEventListener("keydown", d), vt(p);
      });
      function c() {
        o.value || ((o.value = !0), setTimeout(u, 16));
      }
      function u() {
        const d = new Event("keydown");
        (d.key = "k"),
          (d.metaKey = !0),
          window.dispatchEvent(d),
          setTimeout(() => {
            document.querySelector(".DocSearch-Modal") || u();
          }, 16);
      }
      return (d, p) =>
        _(n).algolia
          ? (h(),
            g("div", au, [
              o.value
                ? (h(),
                  q(_(t), { key: 0, algolia: _(n).algolia }, null, 8, [
                    "algolia",
                  ]))
                : (h(),
                  g("div", { key: 1, id: "docsearch", onClick: c }, [
                    y("button", uu, [
                      y("span", fu, [du, y("span", hu, ce(_(i)), 1)]),
                      _u,
                    ]),
                  ])),
            ]))
          : U("", !0);
    },
  });
const vu = {},
  mu = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
  },
  gu = y("path", { d: "M0 0h24v24H0V0z", fill: "none" }, null, -1),
  bu = y(
    "path",
    { d: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" },
    null,
    -1
  ),
  yu = [gu, bu];
function xu(e, t) {
  return h(), g("svg", mu, yu);
}
const wu = F(vu, [["render", xu]]),
  $u = R({
    __name: "VPLink",
    props: { tag: null, href: null, noIcon: { type: Boolean } },
    setup(e) {
      const t = e,
        n = K(() => (t.tag ?? t.href ? "a" : "span")),
        s = K(() => t.href && ss.test(t.href));
      return (o, r) => (
        h(),
        q(
          dn(_(n)),
          {
            class: ve(["VPLink", { link: e.href }]),
            href: e.href ? _(vn)(e.href) : void 0,
            target: _(s) ? "_blank" : void 0,
            rel: _(s) ? "noreferrer" : void 0,
          },
          {
            default: A(() => [
              S(o.$slots, "default", {}, void 0, !0),
              _(s) && !e.noIcon
                ? (h(), q(wu, { key: 0, class: "icon" }))
                : U("", !0),
            ]),
            _: 3,
          },
          8,
          ["class", "href", "target", "rel"]
        )
      );
    },
  });
const gt = F($u, [["__scopeId", "data-v-30c06bd3"]]),
  ku = R({
    __name: "VPNavBarMenuLink",
    props: { item: null },
    setup(e) {
      const { page: t } = ue();
      return (n, s) => (
        h(),
        q(
          gt,
          {
            class: ve({
              VPNavBarMenuLink: !0,
              active: _(Mt)(
                _(t).relativePath,
                e.item.activeMatch || e.item.link,
                !!e.item.activeMatch
              ),
            }),
            href: e.item.link,
            noIcon: !0,
          },
          { default: A(() => [Te(ce(e.item.text), 1)]), _: 1 },
          8,
          ["class", "href"]
        )
      );
    },
  });
const Pu = F(ku, [["__scopeId", "data-v-95f5d58b"]]),
  ao = ae();
let $i = !1,
  ms = 0;
function Cu(e) {
  const t = ae(!1);
  if (ke) {
    !$i && Su(), ms++;
    const n = Xe(ao, (s) => {
      var o, r, i;
      s === e.el.value || ((o = e.el.value) != null && o.contains(s))
        ? ((t.value = !0), (r = e.onFocus) == null || r.call(e))
        : ((t.value = !1), (i = e.onBlur) == null || i.call(e));
    });
    vt(() => {
      n(), ms--, ms || Tu();
    });
  }
  return Ys(t);
}
function Su() {
  document.addEventListener("focusin", ki),
    ($i = !0),
    (ao.value = document.activeElement);
}
function Tu() {
  document.removeEventListener("focusin", ki);
}
function ki() {
  ao.value = document.activeElement;
}
const Lu = {},
  Vu = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Eu = y(
    "path",
    {
      d: "M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z",
    },
    null,
    -1
  ),
  Au = [Eu];
function Mu(e, t) {
  return h(), g("svg", Vu, Au);
}
const Pi = F(Lu, [["render", Mu]]),
  Iu = {},
  Nu = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Ou = y("circle", { cx: "12", cy: "12", r: "2" }, null, -1),
  Bu = y("circle", { cx: "19", cy: "12", r: "2" }, null, -1),
  Fu = y("circle", { cx: "5", cy: "12", r: "2" }, null, -1),
  Hu = [Ou, Bu, Fu];
function Ru(e, t) {
  return h(), g("svg", Nu, Hu);
}
const Du = F(Iu, [["render", Ru]]),
  Uu = { class: "VPMenuLink" },
  zu = R({
    __name: "VPMenuLink",
    props: { item: null },
    setup(e) {
      const { page: t } = ue();
      return (n, s) => (
        h(),
        g("div", Uu, [
          V(
            gt,
            {
              class: ve({
                active: _(Mt)(
                  _(t).relativePath,
                  e.item.activeMatch || e.item.link,
                  !!e.item.activeMatch
                ),
              }),
              href: e.item.link,
            },
            { default: A(() => [Te(ce(e.item.text), 1)]), _: 1 },
            8,
            ["class", "href"]
          ),
        ])
      );
    },
  });
const os = F(zu, [["__scopeId", "data-v-a5bbb52c"]]),
  ju = { class: "VPMenuGroup" },
  Ku = { key: 0, class: "title" },
  qu = R({
    __name: "VPMenuGroup",
    props: { text: null, items: null },
    setup(e) {
      return (t, n) => (
        h(),
        g("div", ju, [
          e.text ? (h(), g("p", Ku, ce(e.text), 1)) : U("", !0),
          (h(!0),
          g(
            J,
            null,
            Ve(
              e.items,
              (s) => (
                h(),
                g(
                  J,
                  null,
                  [
                    "link" in s
                      ? (h(), q(os, { key: 0, item: s }, null, 8, ["item"]))
                      : U("", !0),
                  ],
                  64
                )
              )
            ),
            256
          )),
        ])
      );
    },
  });
const Wu = F(qu, [["__scopeId", "data-v-b66affaf"]]),
  Gu = { class: "VPMenu" },
  Yu = { key: 0, class: "items" },
  Qu = R({
    __name: "VPMenu",
    props: { items: null },
    setup(e) {
      return (t, n) => (
        h(),
        g("div", Gu, [
          e.items
            ? (h(),
              g("div", Yu, [
                (h(!0),
                g(
                  J,
                  null,
                  Ve(
                    e.items,
                    (s) => (
                      h(),
                      g(
                        J,
                        { key: s.text },
                        [
                          "link" in s
                            ? (h(),
                              q(os, { key: 0, item: s }, null, 8, ["item"]))
                            : (h(),
                              q(
                                Wu,
                                { key: 1, text: s.text, items: s.items },
                                null,
                                8,
                                ["text", "items"]
                              )),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]))
            : U("", !0),
          S(t.$slots, "default", {}, void 0, !0),
        ])
      );
    },
  });
const Xu = F(Qu, [["__scopeId", "data-v-e7ea1737"]]),
  Ju = ["aria-expanded", "aria-label"],
  Zu = { key: 0, class: "text" },
  ef = { class: "menu" },
  tf = R({
    __name: "VPFlyout",
    props: { icon: null, button: null, label: null, items: null },
    setup(e) {
      const t = ae(!1),
        n = ae();
      Cu({ el: n, onBlur: s });
      function s() {
        t.value = !1;
      }
      return (o, r) => (
        h(),
        g(
          "div",
          {
            class: "VPFlyout",
            ref_key: "el",
            ref: n,
            onMouseenter: r[1] || (r[1] = (i) => (t.value = !0)),
            onMouseleave: r[2] || (r[2] = (i) => (t.value = !1)),
          },
          [
            y(
              "button",
              {
                type: "button",
                class: "button",
                "aria-haspopup": "true",
                "aria-expanded": t.value,
                "aria-label": e.label,
                onClick: r[0] || (r[0] = (i) => (t.value = !t.value)),
              },
              [
                e.button || e.icon
                  ? (h(),
                    g("span", Zu, [
                      e.icon
                        ? (h(), q(dn(e.icon), { key: 0, class: "option-icon" }))
                        : U("", !0),
                      Te(" " + ce(e.button) + " ", 1),
                      V(Pi, { class: "text-icon" }),
                    ]))
                  : (h(), q(Du, { key: 1, class: "icon" })),
              ],
              8,
              Ju
            ),
            y("div", ef, [
              V(
                Xu,
                { items: e.items },
                {
                  default: A(() => [S(o.$slots, "default", {}, void 0, !0)]),
                  _: 3,
                },
                8,
                ["items"]
              ),
            ]),
          ],
          544
        )
      );
    },
  });
const uo = F(tf, [["__scopeId", "data-v-96001b6b"]]),
  nf = R({
    __name: "VPNavBarMenuGroup",
    props: { item: null },
    setup(e) {
      const { page: t } = ue();
      return (n, s) => (
        h(),
        q(
          uo,
          {
            class: ve({
              VPNavBarMenuGroup: !0,
              active: _(Mt)(
                _(t).relativePath,
                e.item.activeMatch,
                !!e.item.activeMatch
              ),
            }),
            button: e.item.text,
            items: e.item.items,
          },
          null,
          8,
          ["class", "button", "items"]
        )
      );
    },
  }),
  sf = (e) => (Ze("data-v-bdedfc22"), (e = e()), et(), e),
  of = {
    key: 0,
    "aria-labelledby": "main-nav-aria-label",
    class: "VPNavBarMenu",
  },
  rf = sf(() =>
    y(
      "span",
      { id: "main-nav-aria-label", class: "visually-hidden" },
      "Main Navigation",
      -1
    )
  ),
  lf = R({
    __name: "VPNavBarMenu",
    setup(e) {
      const { theme: t } = ue();
      return (n, s) =>
        _(t).nav
          ? (h(),
            g("nav", of, [
              rf,
              (h(!0),
              g(
                J,
                null,
                Ve(
                  _(t).nav,
                  (o) => (
                    h(),
                    g(
                      J,
                      { key: o.text },
                      [
                        "link" in o
                          ? (h(), q(Pu, { key: 0, item: o }, null, 8, ["item"]))
                          : (h(),
                            q(nf, { key: 1, item: o }, null, 8, ["item"])),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
            ]))
          : U("", !0);
    },
  });
const cf = F(lf, [["__scopeId", "data-v-bdedfc22"]]),
  af = {},
  uf = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  ff = y("path", { d: "M0 0h24v24H0z", fill: "none" }, null, -1),
  df = y(
    "path",
    {
      d: " M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
      class: "css-c4d79v",
    },
    null,
    -1
  ),
  hf = [ff, df];
function _f(e, t) {
  return h(), g("svg", uf, hf);
}
const Ci = F(af, [["render", _f]]),
  pf = { class: "items" },
  vf = { class: "title" },
  mf = R({
    __name: "VPNavBarTranslations",
    setup(e) {
      const { localeLinks: t, currentLang: n } = gn({ correspondingLink: !0 });
      return (s, o) =>
        _(t).length && _(n).label
          ? (h(),
            q(
              uo,
              { key: 0, class: "VPNavBarTranslations", icon: Ci },
              {
                default: A(() => [
                  y("div", pf, [
                    y("p", vf, ce(_(n).label), 1),
                    (h(!0),
                    g(
                      J,
                      null,
                      Ve(
                        _(t),
                        (r) => (
                          h(),
                          q(os, { key: r.link, item: r }, null, 8, ["item"])
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
                _: 1,
              }
            ))
          : U("", !0);
    },
  });
const gf = F(mf, [["__scopeId", "data-v-fdaf79b7"]]);
const bf = {},
  yf = { class: "VPSwitch", type: "button", role: "switch" },
  xf = { class: "check" },
  wf = { key: 0, class: "icon" };
function $f(e, t) {
  return (
    h(),
    g("button", yf, [
      y("span", xf, [
        e.$slots.default
          ? (h(), g("span", wf, [S(e.$slots, "default", {}, void 0, !0)]))
          : U("", !0),
      ]),
    ])
  );
}
const kf = F(bf, [
    ["render", $f],
    ["__scopeId", "data-v-f3c41672"],
  ]),
  Pf = {},
  Cf = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Sf = wc(
    '<path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>',
    9
  ),
  Tf = [Sf];
function Lf(e, t) {
  return h(), g("svg", Cf, Tf);
}
const Vf = F(Pf, [["render", Lf]]),
  Ef = {},
  Af = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Mf = y(
    "path",
    {
      d: "M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z",
    },
    null,
    -1
  ),
  If = [Mf];
function Nf(e, t) {
  return h(), g("svg", Af, If);
}
const Of = F(Ef, [["render", Nf]]),
  Bf = R({
    __name: "VPSwitchAppearance",
    setup(e) {
      const { site: t, isDark: n } = ue(),
        s = ae(!1),
        o = typeof localStorage < "u" ? r() : () => {};
      Be(() => {
        s.value = document.documentElement.classList.contains("dark");
      });
      function r() {
        const i = window.matchMedia("(prefers-color-scheme: dark)"),
          l = document.documentElement.classList;
        let c = localStorage.getItem(tr),
          u =
            (t.value.appearance === "dark" && c == null) ||
            (c === "auto" || c == null ? i.matches : c === "dark");
        i.onchange = (v) => {
          c === "auto" && p((u = v.matches));
        };
        function d() {
          p((u = !u)),
            (c = u
              ? i.matches
                ? "auto"
                : "dark"
              : i.matches
              ? "light"
              : "auto"),
            localStorage.setItem(tr, c);
        }
        function p(v) {
          const k = document.createElement("style");
          (k.type = "text/css"),
            k.appendChild(
              document.createTextNode(`:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`)
            ),
            document.head.appendChild(k),
            (s.value = v),
            l[v ? "add" : "remove"]("dark"),
            window.getComputedStyle(k).opacity,
            document.head.removeChild(k);
        }
        return d;
      }
      return (
        Xe(s, (i) => {
          n.value = i;
        }),
        (i, l) => (
          h(),
          q(
            kf,
            {
              class: "VPSwitchAppearance",
              "aria-label": "toggle dark mode",
              "aria-checked": s.value,
              onClick: _(o),
            },
            {
              default: A(() => [
                V(Vf, { class: "sun" }),
                V(Of, { class: "moon" }),
              ]),
              _: 1,
            },
            8,
            ["aria-checked", "onClick"]
          )
        )
      );
    },
  });
const fo = F(Bf, [["__scopeId", "data-v-0d529b6d"]]),
  Ff = { key: 0, class: "VPNavBarAppearance" },
  Hf = R({
    __name: "VPNavBarAppearance",
    setup(e) {
      const { site: t } = ue();
      return (n, s) =>
        _(t).appearance ? (h(), g("div", Ff, [V(fo)])) : U("", !0);
    },
  });
const Rf = F(Hf, [["__scopeId", "data-v-da3f667a"]]),
  Df = {
    discord:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
    facebook:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    github:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    instagram:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
    linkedin:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    mastodon:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Mastodon</title><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>',
    slack:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
    twitter:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
    youtube:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  },
  Uf = ["href", "innerHTML"],
  zf = R({
    __name: "VPSocialLink",
    props: { icon: null, link: null },
    setup(e) {
      const t = e,
        n = K(() => (typeof t.icon == "object" ? t.icon.svg : Df[t.icon]));
      return (s, o) => (
        h(),
        g(
          "a",
          {
            class: "VPSocialLink",
            href: e.link,
            target: "_blank",
            rel: "noopener",
            innerHTML: _(n),
          },
          null,
          8,
          Uf
        )
      );
    },
  });
const jf = F(zf, [["__scopeId", "data-v-e57698f6"]]),
  Kf = { class: "VPSocialLinks" },
  qf = R({
    __name: "VPSocialLinks",
    props: { links: null },
    setup(e) {
      return (t, n) => (
        h(),
        g("div", Kf, [
          (h(!0),
          g(
            J,
            null,
            Ve(
              e.links,
              ({ link: s, icon: o }) => (
                h(),
                q(jf, { key: s, icon: o, link: s }, null, 8, ["icon", "link"])
              )
            ),
            128
          )),
        ])
      );
    },
  });
const ho = F(qf, [["__scopeId", "data-v-f6988cfb"]]),
  Wf = R({
    __name: "VPNavBarSocialLinks",
    setup(e) {
      const { theme: t } = ue();
      return (n, s) =>
        _(t).socialLinks
          ? (h(),
            q(
              ho,
              { key: 0, class: "VPNavBarSocialLinks", links: _(t).socialLinks },
              null,
              8,
              ["links"]
            ))
          : U("", !0);
    },
  });
const Gf = F(Wf, [["__scopeId", "data-v-2ab2a029"]]),
  Yf = { key: 0, class: "group translations" },
  Qf = { class: "trans-title" },
  Xf = { key: 1, class: "group" },
  Jf = { class: "item appearance" },
  Zf = { class: "label" },
  ed = { class: "appearance-action" },
  td = { key: 2, class: "group" },
  nd = { class: "item social-links" },
  sd = R({
    __name: "VPNavBarExtra",
    setup(e) {
      const { site: t, theme: n } = ue(),
        { localeLinks: s, currentLang: o } = gn({ correspondingLink: !0 }),
        r = K(
          () =>
            (s.value.length && o.value.label) ||
            t.value.appearance ||
            n.value.socialLinks
        );
      return (i, l) =>
        _(r)
          ? (h(),
            q(
              uo,
              { key: 0, class: "VPNavBarExtra", label: "extra navigation" },
              {
                default: A(() => [
                  _(s).length && _(o).label
                    ? (h(),
                      g("div", Yf, [
                        y("p", Qf, ce(_(o).label), 1),
                        (h(!0),
                        g(
                          J,
                          null,
                          Ve(
                            _(s),
                            (c) => (
                              h(),
                              q(os, { key: c.link, item: c }, null, 8, ["item"])
                            )
                          ),
                          128
                        )),
                      ]))
                    : U("", !0),
                  _(t).appearance
                    ? (h(),
                      g("div", Xf, [
                        y("div", Jf, [
                          y(
                            "p",
                            Zf,
                            ce(_(n).darkModeSwitchLabel || "Appearance"),
                            1
                          ),
                          y("div", ed, [V(fo)]),
                        ]),
                      ]))
                    : U("", !0),
                  _(n).socialLinks
                    ? (h(),
                      g("div", td, [
                        y("div", nd, [
                          V(
                            ho,
                            {
                              class: "social-links-list",
                              links: _(n).socialLinks,
                            },
                            null,
                            8,
                            ["links"]
                          ),
                        ]),
                      ]))
                    : U("", !0),
                ]),
                _: 1,
              }
            ))
          : U("", !0);
    },
  });
const od = F(sd, [["__scopeId", "data-v-66bb1f24"]]),
  rd = (e) => (Ze("data-v-e5dd9c1c"), (e = e()), et(), e),
  id = ["aria-expanded"],
  ld = rd(() =>
    y(
      "span",
      { class: "container" },
      [
        y("span", { class: "top" }),
        y("span", { class: "middle" }),
        y("span", { class: "bottom" }),
      ],
      -1
    )
  ),
  cd = [ld],
  ad = R({
    __name: "VPNavBarHamburger",
    props: { active: { type: Boolean } },
    emits: ["click"],
    setup(e) {
      return (t, n) => (
        h(),
        g(
          "button",
          {
            type: "button",
            class: ve(["VPNavBarHamburger", { active: e.active }]),
            "aria-label": "mobile navigation",
            "aria-expanded": e.active,
            "aria-controls": "VPNavScreen",
            onClick: n[0] || (n[0] = (s) => t.$emit("click")),
          },
          cd,
          10,
          id
        )
      );
    },
  });
const ud = F(ad, [["__scopeId", "data-v-e5dd9c1c"]]),
  fd = (e) => (Ze("data-v-be450ad9"), (e = e()), et(), e),
  dd = { class: "container" },
  hd = { class: "title" },
  _d = { class: "content" },
  pd = fd(() => y("div", { class: "curtain" }, null, -1)),
  vd = { class: "content-body" },
  md = R({
    __name: "VPNavBar",
    props: { isScreenOpen: { type: Boolean } },
    emits: ["toggle-screen"],
    setup(e) {
      const { y: t } = ja(),
        { hasSidebar: n } = rt(),
        s = K(() => ({ "has-sidebar": n.value, fill: t.value > 0 }));
      return (o, r) => (
        h(),
        g(
          "div",
          { class: ve(["VPNavBar", _(s)]) },
          [
            y("div", dd, [
              y("div", hd, [
                V(cu, null, {
                  "nav-bar-title-before": A(() => [
                    S(o.$slots, "nav-bar-title-before", {}, void 0, !0),
                  ]),
                  "nav-bar-title-after": A(() => [
                    S(o.$slots, "nav-bar-title-after", {}, void 0, !0),
                  ]),
                  _: 3,
                }),
              ]),
              y("div", _d, [
                pd,
                y("div", vd, [
                  S(o.$slots, "nav-bar-content-before", {}, void 0, !0),
                  V(pu, { class: "search" }),
                  V(cf, { class: "menu" }),
                  V(gf, { class: "translations" }),
                  V(Rf, { class: "appearance" }),
                  V(Gf, { class: "social-links" }),
                  V(od, { class: "extra" }),
                  S(o.$slots, "nav-bar-content-after", {}, void 0, !0),
                  V(
                    ud,
                    {
                      class: "hamburger",
                      active: e.isScreenOpen,
                      onClick: r[0] || (r[0] = (i) => o.$emit("toggle-screen")),
                    },
                    null,
                    8,
                    ["active"]
                  ),
                ]),
              ]),
            ]),
          ],
          2
        )
      );
    },
  });
const gd = F(md, [["__scopeId", "data-v-be450ad9"]]);
function bd(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  } else return Array.from(e);
}
var _o = !1;
if (typeof window < "u") {
  var ur = {
    get passive() {
      _o = !0;
    },
  };
  window.addEventListener("testPassive", null, ur),
    window.removeEventListener("testPassive", null, ur);
}
var Rn =
    typeof window < "u" &&
    window.navigator &&
    window.navigator.platform &&
    (/iP(ad|hone|od)/.test(window.navigator.platform) ||
      (window.navigator.platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1)),
  jt = [],
  Dn = !1,
  po = -1,
  rn = void 0,
  Tt = void 0,
  ln = void 0,
  Si = function (t) {
    return jt.some(function (n) {
      return !!(n.options.allowTouchMove && n.options.allowTouchMove(t));
    });
  },
  Un = function (t) {
    var n = t || window.event;
    return Si(n.target) || n.touches.length > 1
      ? !0
      : (n.preventDefault && n.preventDefault(), !1);
  },
  yd = function (t) {
    if (ln === void 0) {
      var n = !!t && t.reserveScrollBarGap === !0,
        s = window.innerWidth - document.documentElement.clientWidth;
      if (n && s > 0) {
        var o = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right"),
          10
        );
        (ln = document.body.style.paddingRight),
          (document.body.style.paddingRight = o + s + "px");
      }
    }
    rn === void 0 &&
      ((rn = document.body.style.overflow),
      (document.body.style.overflow = "hidden"));
  },
  xd = function () {
    ln !== void 0 && ((document.body.style.paddingRight = ln), (ln = void 0)),
      rn !== void 0 && ((document.body.style.overflow = rn), (rn = void 0));
  },
  wd = function () {
    return window.requestAnimationFrame(function () {
      if (Tt === void 0) {
        Tt = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
        };
        var t = window,
          n = t.scrollY,
          s = t.scrollX,
          o = t.innerHeight;
        (document.body.style.position = "fixed"),
          (document.body.style.top = -n),
          (document.body.style.left = -s),
          setTimeout(function () {
            return window.requestAnimationFrame(function () {
              var r = o - window.innerHeight;
              r && n >= o && (document.body.style.top = -(n + r));
            });
          }, 300);
      }
    });
  },
  $d = function () {
    if (Tt !== void 0) {
      var t = -parseInt(document.body.style.top, 10),
        n = -parseInt(document.body.style.left, 10);
      (document.body.style.position = Tt.position),
        (document.body.style.top = Tt.top),
        (document.body.style.left = Tt.left),
        window.scrollTo(n, t),
        (Tt = void 0);
    }
  },
  kd = function (t) {
    return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1;
  },
  Pd = function (t, n) {
    var s = t.targetTouches[0].clientY - po;
    return Si(t.target)
      ? !1
      : (n && n.scrollTop === 0 && s > 0) || (kd(n) && s < 0)
      ? Un(t)
      : (t.stopPropagation(), !0);
  },
  Ti = function (t, n) {
    if (!t) {
      console.error(
        "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
      );
      return;
    }
    if (
      !jt.some(function (o) {
        return o.targetElement === t;
      })
    ) {
      var s = { targetElement: t, options: n || {} };
      (jt = [].concat(bd(jt), [s])),
        Rn ? wd() : yd(n),
        Rn &&
          ((t.ontouchstart = function (o) {
            o.targetTouches.length === 1 && (po = o.targetTouches[0].clientY);
          }),
          (t.ontouchmove = function (o) {
            o.targetTouches.length === 1 && Pd(o, t);
          }),
          Dn ||
            (document.addEventListener(
              "touchmove",
              Un,
              _o ? { passive: !1 } : void 0
            ),
            (Dn = !0)));
    }
  },
  Li = function () {
    Rn &&
      (jt.forEach(function (t) {
        (t.targetElement.ontouchstart = null),
          (t.targetElement.ontouchmove = null);
      }),
      Dn &&
        (document.removeEventListener(
          "touchmove",
          Un,
          _o ? { passive: !1 } : void 0
        ),
        (Dn = !1)),
      (po = -1)),
      Rn ? $d() : xd(),
      (jt = []);
  };
const Cd = R({
  __name: "VPNavScreenMenuLink",
  props: { text: null, link: null },
  setup(e) {
    const t = qe("close-screen");
    return (n, s) => (
      h(),
      q(
        gt,
        { class: "VPNavScreenMenuLink", href: e.link, onClick: _(t) },
        { default: A(() => [Te(ce(e.text), 1)]), _: 1 },
        8,
        ["href", "onClick"]
      )
    );
  },
});
const Sd = F(Cd, [["__scopeId", "data-v-c328f34f"]]),
  Td = {},
  Ld = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Vd = y(
    "path",
    {
      d: "M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z",
    },
    null,
    -1
  ),
  Ed = [Vd];
function Ad(e, t) {
  return h(), g("svg", Ld, Ed);
}
const Md = F(Td, [["render", Ad]]),
  Id = R({
    __name: "VPNavScreenMenuGroupLink",
    props: { text: null, link: null },
    setup(e) {
      const t = qe("close-screen");
      return (n, s) => (
        h(),
        q(
          gt,
          { class: "VPNavScreenMenuGroupLink", href: e.link, onClick: _(t) },
          { default: A(() => [Te(ce(e.text), 1)]), _: 1 },
          8,
          ["href", "onClick"]
        )
      );
    },
  });
const Vi = F(Id, [["__scopeId", "data-v-3d20956d"]]),
  Nd = { class: "VPNavScreenMenuGroupSection" },
  Od = { key: 0, class: "title" },
  Bd = R({
    __name: "VPNavScreenMenuGroupSection",
    props: { text: null, items: null },
    setup(e) {
      return (t, n) => (
        h(),
        g("div", Nd, [
          e.text ? (h(), g("p", Od, ce(e.text), 1)) : U("", !0),
          (h(!0),
          g(
            J,
            null,
            Ve(
              e.items,
              (s) => (
                h(),
                q(Vi, { key: s.text, text: s.text, link: s.link }, null, 8, [
                  "text",
                  "link",
                ])
              )
            ),
            128
          )),
        ])
      );
    },
  });
const Fd = F(Bd, [["__scopeId", "data-v-7478538b"]]),
  Hd = ["aria-controls", "aria-expanded"],
  Rd = { class: "button-text" },
  Dd = ["id"],
  Ud = { key: 1, class: "group" },
  zd = R({
    __name: "VPNavScreenMenuGroup",
    props: { text: null, items: null },
    setup(e) {
      const t = e,
        n = ae(!1),
        s = K(() => `NavScreenGroup-${t.text.replace(" ", "-").toLowerCase()}`);
      function o() {
        n.value = !n.value;
      }
      return (r, i) => (
        h(),
        g(
          "div",
          { class: ve(["VPNavScreenMenuGroup", { open: n.value }]) },
          [
            y(
              "button",
              {
                class: "button",
                "aria-controls": _(s),
                "aria-expanded": n.value,
                onClick: o,
              },
              [y("span", Rd, ce(e.text), 1), V(Md, { class: "button-icon" })],
              8,
              Hd
            ),
            y(
              "div",
              { id: _(s), class: "items" },
              [
                (h(!0),
                g(
                  J,
                  null,
                  Ve(
                    e.items,
                    (l) => (
                      h(),
                      g(
                        J,
                        { key: l.text },
                        [
                          "link" in l
                            ? (h(),
                              g("div", { key: l.text, class: "item" }, [
                                V(Vi, { text: l.text, link: l.link }, null, 8, [
                                  "text",
                                  "link",
                                ]),
                              ]))
                            : (h(),
                              g("div", Ud, [
                                V(
                                  Fd,
                                  { text: l.text, items: l.items },
                                  null,
                                  8,
                                  ["text", "items"]
                                ),
                              ])),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ],
              8,
              Dd
            ),
          ],
          2
        )
      );
    },
  });
const jd = F(zd, [["__scopeId", "data-v-a9a19324"]]),
  Kd = { key: 0, class: "VPNavScreenMenu" },
  qd = R({
    __name: "VPNavScreenMenu",
    setup(e) {
      const { theme: t } = ue();
      return (n, s) =>
        _(t).nav
          ? (h(),
            g("nav", Kd, [
              (h(!0),
              g(
                J,
                null,
                Ve(
                  _(t).nav,
                  (o) => (
                    h(),
                    g(
                      J,
                      { key: o.text },
                      [
                        "link" in o
                          ? (h(),
                            q(
                              Sd,
                              { key: 0, text: o.text, link: o.link },
                              null,
                              8,
                              ["text", "link"]
                            ))
                          : (h(),
                            q(
                              jd,
                              { key: 1, text: o.text || "", items: o.items },
                              null,
                              8,
                              ["text", "items"]
                            )),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
            ]))
          : U("", !0);
    },
  }),
  Wd = { key: 0, class: "VPNavScreenAppearance" },
  Gd = { class: "text" },
  Yd = R({
    __name: "VPNavScreenAppearance",
    setup(e) {
      const { site: t, theme: n } = ue();
      return (s, o) =>
        _(t).appearance
          ? (h(),
            g("div", Wd, [
              y("p", Gd, ce(_(n).darkModeSwitchLabel || "Appearance"), 1),
              V(fo),
            ]))
          : U("", !0);
    },
  });
const Qd = F(Yd, [["__scopeId", "data-v-7e6603c2"]]),
  Xd = { class: "list" },
  Jd = R({
    __name: "VPNavScreenTranslations",
    setup(e) {
      const { localeLinks: t, currentLang: n } = gn({ correspondingLink: !0 }),
        s = ae(!1);
      function o() {
        s.value = !s.value;
      }
      return (r, i) =>
        _(t).length && _(n).label
          ? (h(),
            g(
              "div",
              {
                key: 0,
                class: ve(["VPNavScreenTranslations", { open: s.value }]),
              },
              [
                y("button", { class: "title", onClick: o }, [
                  V(Ci, { class: "icon lang" }),
                  Te(" " + ce(_(n).label) + " ", 1),
                  V(Pi, { class: "icon chevron" }),
                ]),
                y("ul", Xd, [
                  (h(!0),
                  g(
                    J,
                    null,
                    Ve(
                      _(t),
                      (l) => (
                        h(),
                        g("li", { key: l.link, class: "item" }, [
                          V(
                            gt,
                            { class: "link", href: l.link },
                            { default: A(() => [Te(ce(l.text), 1)]), _: 2 },
                            1032,
                            ["href"]
                          ),
                        ])
                      )
                    ),
                    128
                  )),
                ]),
              ],
              2
            ))
          : U("", !0);
    },
  });
const Zd = F(Jd, [["__scopeId", "data-v-8982effe"]]),
  eh = R({
    __name: "VPNavScreenSocialLinks",
    setup(e) {
      const { theme: t } = ue();
      return (n, s) =>
        _(t).socialLinks
          ? (h(),
            q(
              ho,
              {
                key: 0,
                class: "VPNavScreenSocialLinks",
                links: _(t).socialLinks,
              },
              null,
              8,
              ["links"]
            ))
          : U("", !0);
    },
  }),
  th = { class: "container" },
  nh = R({
    __name: "VPNavScreen",
    props: { open: { type: Boolean } },
    setup(e) {
      const t = ae(null);
      function n() {
        Ti(t.value, { reserveScrollBarGap: !0 });
      }
      function s() {
        Li();
      }
      return (o, r) => (
        h(),
        q(
          ns,
          { name: "fade", onEnter: n, onAfterLeave: s },
          {
            default: A(() => [
              e.open
                ? (h(),
                  g(
                    "div",
                    { key: 0, class: "VPNavScreen", ref_key: "screen", ref: t },
                    [
                      y("div", th, [
                        S(
                          o.$slots,
                          "nav-screen-content-before",
                          {},
                          void 0,
                          !0
                        ),
                        V(qd, { class: "menu" }),
                        V(Zd, { class: "translations" }),
                        V(Qd, { class: "appearance" }),
                        V(eh, { class: "social-links" }),
                        S(o.$slots, "nav-screen-content-after", {}, void 0, !0),
                      ]),
                    ],
                    512
                  ))
                : U("", !0),
            ]),
            _: 3,
          }
        )
      );
    },
  });
const sh = F(nh, [["__scopeId", "data-v-724636ae"]]),
  oh = { class: "VPNav" },
  rh = R({
    __name: "VPNav",
    setup(e) {
      const { isScreenOpen: t, closeScreen: n, toggleScreen: s } = tu();
      return (
        Dt("close-screen", n),
        (o, r) => (
          h(),
          g("header", oh, [
            V(
              gd,
              { "is-screen-open": _(t), onToggleScreen: _(s) },
              {
                "nav-bar-title-before": A(() => [
                  S(o.$slots, "nav-bar-title-before", {}, void 0, !0),
                ]),
                "nav-bar-title-after": A(() => [
                  S(o.$slots, "nav-bar-title-after", {}, void 0, !0),
                ]),
                "nav-bar-content-before": A(() => [
                  S(o.$slots, "nav-bar-content-before", {}, void 0, !0),
                ]),
                "nav-bar-content-after": A(() => [
                  S(o.$slots, "nav-bar-content-after", {}, void 0, !0),
                ]),
                _: 3,
              },
              8,
              ["is-screen-open", "onToggleScreen"]
            ),
            V(
              sh,
              { open: _(t) },
              {
                "nav-screen-content-before": A(() => [
                  S(o.$slots, "nav-screen-content-before", {}, void 0, !0),
                ]),
                "nav-screen-content-after": A(() => [
                  S(o.$slots, "nav-screen-content-after", {}, void 0, !0),
                ]),
                _: 3,
              },
              8,
              ["open"]
            ),
          ])
        )
      );
    },
  });
const ih = F(rh, [["__scopeId", "data-v-0fa0e57d"]]),
  lh = {},
  ch = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  ah = y(
    "path",
    {
      d: "M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z",
    },
    null,
    -1
  ),
  uh = y(
    "path",
    { d: "M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z" },
    null,
    -1
  ),
  fh = y(
    "path",
    {
      d: "M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z",
    },
    null,
    -1
  ),
  dh = y(
    "path",
    {
      d: "M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z",
    },
    null,
    -1
  ),
  hh = [ah, uh, fh, dh];
function _h(e, t) {
  return h(), g("svg", ch, hh);
}
const ph = F(lh, [["render", _h]]),
  vh = { key: 0, class: "VPLocalNav" },
  mh = ["aria-expanded"],
  gh = { class: "menu-text" },
  bh = R({
    __name: "VPLocalNav",
    props: { open: { type: Boolean } },
    emits: ["open-menu"],
    setup(e) {
      const { theme: t } = ue(),
        { hasSidebar: n } = rt();
      function s() {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      return (o, r) =>
        _(n)
          ? (h(),
            g("div", vh, [
              y(
                "button",
                {
                  class: "menu",
                  "aria-expanded": e.open,
                  "aria-controls": "VPSidebarNav",
                  onClick: r[0] || (r[0] = (i) => o.$emit("open-menu")),
                },
                [
                  V(ph, { class: "menu-icon" }),
                  y("span", gh, ce(_(t).sidebarMenuLabel || "Menu"), 1),
                ],
                8,
                mh
              ),
              y(
                "a",
                { class: "top-link", href: "#", onClick: s },
                ce(_(t).returnToTopLabel || "Return to top"),
                1
              ),
            ]))
          : U("", !0);
    },
  });
const yh = F(bh, [["__scopeId", "data-v-2817d72e"]]),
  xh = {},
  wh = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  $h = y(
    "path",
    {
      d: "M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z",
    },
    null,
    -1
  ),
  kh = [$h];
function Ph(e, t) {
  return h(), g("svg", wh, kh);
}
const Ch = F(xh, [["render", Ph]]),
  Sh = (e) => (Ze("data-v-b05232f3"), (e = e()), et(), e),
  Th = ["role"],
  Lh = Sh(() => y("div", { class: "indicator" }, null, -1)),
  Vh = { key: 1, class: "items" },
  Eh = R({
    __name: "VPSidebarItem",
    props: { item: null, depth: null },
    setup(e) {
      const t = e,
        {
          collapsed: n,
          collapsible: s,
          isLink: o,
          isActiveLink: r,
          hasActiveLink: i,
          hasChildren: l,
          toggle: c,
        } = Ya(K(() => t.item)),
        u = K(() => (l.value ? "section" : "div")),
        d = K(() => (o.value ? "a" : "div")),
        p = K(() =>
          l.value ? (t.depth + 2 === 7 ? "p" : `h${t.depth + 2}`) : "p"
        ),
        v = K(() => (o.value ? void 0 : "button")),
        k = K(() => [
          [`level-${t.depth}`],
          { collapsible: s.value },
          { collapsed: n.value },
          { "is-link": o.value },
          { "is-active": r.value },
          { "has-active": i.value },
        ]);
      function H() {
        !t.item.link && c();
      }
      function N() {
        t.item.link && c();
      }
      return (X, b) => {
        const L = At("VPSidebarItem", !0);
        return (
          h(),
          q(
            dn(_(u)),
            { class: ve(["VPSidebarItem", _(k)]) },
            {
              default: A(() => [
                e.item.text
                  ? (h(),
                    g(
                      "div",
                      { key: 0, class: "item", role: _(v), onClick: H },
                      [
                        Lh,
                        V(
                          gt,
                          { tag: _(d), class: "link", href: e.item.link },
                          {
                            default: A(() => [
                              (h(),
                              q(
                                dn(_(p)),
                                { class: "text", innerHTML: e.item.text },
                                null,
                                8,
                                ["innerHTML"]
                              )),
                            ]),
                            _: 1,
                          },
                          8,
                          ["tag", "href"]
                        ),
                        e.item.collapsed != null
                          ? (h(),
                            g(
                              "div",
                              {
                                key: 0,
                                class: "caret",
                                role: "button",
                                onClick: N,
                              },
                              [V(Ch, { class: "caret-icon" })]
                            ))
                          : U("", !0),
                      ],
                      8,
                      Th
                    ))
                  : U("", !0),
                e.item.items && e.item.items.length
                  ? (h(),
                    g("div", Vh, [
                      e.depth < 5
                        ? (h(!0),
                          g(
                            J,
                            { key: 0 },
                            Ve(
                              e.item.items,
                              (I) => (
                                h(),
                                q(
                                  L,
                                  { key: I.text, item: I, depth: e.depth + 1 },
                                  null,
                                  8,
                                  ["item", "depth"]
                                )
                              )
                            ),
                            128
                          ))
                        : U("", !0),
                    ]))
                  : U("", !0),
              ]),
              _: 1,
            },
            8,
            ["class"]
          )
        );
      };
    },
  });
const Ah = F(Eh, [["__scopeId", "data-v-b05232f3"]]),
  Ei = (e) => (Ze("data-v-c79ccefa"), (e = e()), et(), e),
  Mh = Ei(() => y("div", { class: "curtain" }, null, -1)),
  Ih = {
    class: "nav",
    id: "VPSidebarNav",
    "aria-labelledby": "sidebar-aria-label",
    tabindex: "-1",
  },
  Nh = Ei(() =>
    y(
      "span",
      { class: "visually-hidden", id: "sidebar-aria-label" },
      " Sidebar Navigation ",
      -1
    )
  ),
  Oh = R({
    __name: "VPSidebar",
    props: { open: { type: Boolean } },
    setup(e) {
      const t = e,
        { sidebarGroups: n, hasSidebar: s } = rt();
      let o = ae(null);
      function r() {
        Ti(o.value, { reserveScrollBarGap: !0 });
      }
      function i() {
        Li();
      }
      return (
        Rr(async () => {
          var l;
          t.open ? (r(), (l = o.value) == null || l.focus()) : i();
        }),
        (l, c) =>
          _(s)
            ? (h(),
              g(
                "aside",
                {
                  key: 0,
                  class: ve(["VPSidebar", { open: e.open }]),
                  ref_key: "navEl",
                  ref: o,
                  onClick: c[0] || (c[0] = la(() => {}, ["stop"])),
                },
                [
                  Mh,
                  y("nav", Ih, [
                    Nh,
                    S(l.$slots, "sidebar-nav-before", {}, void 0, !0),
                    (h(!0),
                    g(
                      J,
                      null,
                      Ve(
                        _(n),
                        (u) => (
                          h(),
                          g("div", { key: u.text, class: "group" }, [
                            V(Ah, { item: u, depth: 0 }, null, 8, ["item"]),
                          ])
                        )
                      ),
                      128
                    )),
                    S(l.$slots, "sidebar-nav-after", {}, void 0, !0),
                  ]),
                ],
                2
              ))
            : U("", !0)
      );
    },
  });
const Bh = F(Oh, [["__scopeId", "data-v-c79ccefa"]]),
  Fh = {},
  Hh = { class: "VPPage" };
function Rh(e, t) {
  const n = At("Content");
  return h(), g("div", Hh, [V(n)]);
}
const Dh = F(Fh, [["render", Rh]]),
  Uh = R({
    __name: "VPButton",
    props: { tag: null, size: null, theme: null, text: null, href: null },
    setup(e) {
      const t = e,
        n = K(() => [t.size ?? "medium", t.theme ?? "brand"]),
        s = K(() => t.href && ss.test(t.href)),
        o = K(() => (t.tag ? t.tag : t.href ? "a" : "button"));
      return (r, i) => (
        h(),
        q(
          dn(_(o)),
          {
            class: ve(["VPButton", _(n)]),
            href: e.href ? _(vn)(e.href) : void 0,
            target: _(s) ? "_blank" : void 0,
            rel: _(s) ? "noreferrer" : void 0,
          },
          { default: A(() => [Te(ce(e.text), 1)]), _: 1 },
          8,
          ["class", "href", "target", "rel"]
        )
      );
    },
  });
const zh = F(Uh, [["__scopeId", "data-v-a7c4128c"]]),
  jh = (e) => (Ze("data-v-45916f1d"), (e = e()), et(), e),
  Kh = { class: "container" },
  qh = { class: "main" },
  Wh = { key: 0, class: "name" },
  Gh = { class: "clip" },
  Yh = { key: 1, class: "text" },
  Qh = { key: 2, class: "tagline" },
  Xh = { key: 3, class: "actions" },
  Jh = { key: 0, class: "image" },
  Zh = { class: "image-container" },
  e0 = jh(() => y("div", { class: "image-bg" }, null, -1)),
  t0 = R({
    __name: "VPHero",
    props: {
      name: null,
      text: null,
      tagline: null,
      image: null,
      actions: null,
    },
    setup(e) {
      const t = qe("hero-image-slot-exists");
      return (n, s) => (
        h(),
        g(
          "div",
          { class: ve(["VPHero", { "has-image": e.image || _(t) }]) },
          [
            y("div", Kh, [
              y("div", qh, [
                e.name
                  ? (h(), g("h1", Wh, [y("span", Gh, ce(e.name), 1)]))
                  : U("", !0),
                e.text ? (h(), g("p", Yh, ce(e.text), 1)) : U("", !0),
                e.tagline ? (h(), g("p", Qh, ce(e.tagline), 1)) : U("", !0),
                e.actions
                  ? (h(),
                    g("div", Xh, [
                      (h(!0),
                      g(
                        J,
                        null,
                        Ve(
                          e.actions,
                          (o) => (
                            h(),
                            g("div", { key: o.link, class: "action" }, [
                              V(
                                zh,
                                {
                                  tag: "a",
                                  size: "medium",
                                  theme: o.theme,
                                  text: o.text,
                                  href: o.link,
                                },
                                null,
                                8,
                                ["theme", "text", "href"]
                              ),
                            ])
                          )
                        ),
                        128
                      )),
                    ]))
                  : U("", !0),
              ]),
              e.image || _(t)
                ? (h(),
                  g("div", Jh, [
                    y("div", Zh, [
                      e0,
                      S(
                        n.$slots,
                        "home-hero-image",
                        {},
                        () => [
                          e.image
                            ? (h(),
                              q(
                                co,
                                { key: 0, class: "image-src", image: e.image },
                                null,
                                8,
                                ["image"]
                              ))
                            : U("", !0),
                        ],
                        !0
                      ),
                    ]),
                  ]))
                : U("", !0),
            ]),
          ],
          2
        )
      );
    },
  });
const n0 = F(t0, [["__scopeId", "data-v-45916f1d"]]),
  s0 = R({
    __name: "VPHomeHero",
    setup(e) {
      const { frontmatter: t } = ue();
      return (n, s) =>
        _(t).hero
          ? (h(),
            q(
              n0,
              {
                key: 0,
                class: "VPHomeHero",
                name: _(t).hero.name,
                text: _(t).hero.text,
                tagline: _(t).hero.tagline,
                image: _(t).hero.image,
                actions: _(t).hero.actions,
              },
              {
                "home-hero-image": A(() => [S(n.$slots, "home-hero-image")]),
                _: 3,
              },
              8,
              ["name", "text", "tagline", "image", "actions"]
            ))
          : U("", !0);
    },
  }),
  o0 = {},
  r0 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  i0 = y(
    "path",
    {
      d: "M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z",
    },
    null,
    -1
  ),
  l0 = [i0];
function c0(e, t) {
  return h(), g("svg", r0, l0);
}
const a0 = F(o0, [["render", c0]]),
  u0 = { class: "box" },
  f0 = { key: 1, class: "icon" },
  d0 = ["innerHTML"],
  h0 = ["innerHTML"],
  _0 = { key: 2, class: "link-text" },
  p0 = { class: "link-text-value" },
  v0 = R({
    __name: "VPFeature",
    props: {
      icon: null,
      title: null,
      details: null,
      link: null,
      linkText: null,
    },
    setup(e) {
      return (t, n) => (
        h(),
        q(
          gt,
          { class: "VPFeature", href: e.link, "no-icon": !0 },
          {
            default: A(() => [
              y("article", u0, [
                typeof e.icon == "object"
                  ? (h(),
                    q(
                      co,
                      {
                        key: 0,
                        image: e.icon,
                        alt: e.icon.alt,
                        height: e.icon.height,
                        width: e.icon.width,
                      },
                      null,
                      8,
                      ["image", "alt", "height", "width"]
                    ))
                  : e.icon
                  ? (h(), g("div", f0, ce(e.icon), 1))
                  : U("", !0),
                y("h2", { class: "title", innerHTML: e.title }, null, 8, d0),
                y("p", { class: "details", innerHTML: e.details }, null, 8, h0),
                e.linkText
                  ? (h(),
                    g("div", _0, [
                      y("p", p0, [
                        Te(ce(e.linkText) + " ", 1),
                        V(a0, { class: "link-text-icon" }),
                      ]),
                    ]))
                  : U("", !0),
              ]),
            ]),
            _: 1,
          },
          8,
          ["href"]
        )
      );
    },
  });
const m0 = F(v0, [["__scopeId", "data-v-1ef28411"]]),
  g0 = { key: 0, class: "VPFeatures" },
  b0 = { class: "container" },
  y0 = { class: "items" },
  x0 = R({
    __name: "VPFeatures",
    props: { features: null },
    setup(e) {
      const t = e,
        n = K(() => {
          const s = t.features.length;
          if (s) {
            if (s === 2) return "grid-2";
            if (s === 3) return "grid-3";
            if (s % 3 === 0) return "grid-6";
            if (s % 2 === 0) return "grid-4";
          } else return;
        });
      return (s, o) =>
        e.features
          ? (h(),
            g("div", g0, [
              y("div", b0, [
                y("div", y0, [
                  (h(!0),
                  g(
                    J,
                    null,
                    Ve(
                      e.features,
                      (r) => (
                        h(),
                        g(
                          "div",
                          { key: r.title, class: ve(["item", [_(n)]]) },
                          [
                            V(
                              m0,
                              {
                                icon: r.icon,
                                title: r.title,
                                details: r.details,
                                link: r.link,
                                "link-text": r.linkText,
                              },
                              null,
                              8,
                              ["icon", "title", "details", "link", "link-text"]
                            ),
                          ],
                          2
                        )
                      )
                    ),
                    128
                  )),
                ]),
              ]),
            ]))
          : U("", !0);
    },
  });
const w0 = F(x0, [["__scopeId", "data-v-6816157f"]]),
  $0 = R({
    __name: "VPHomeFeatures",
    setup(e) {
      const { frontmatter: t } = ue();
      return (n, s) =>
        _(t).features
          ? (h(),
            q(
              w0,
              { key: 0, class: "VPHomeFeatures", features: _(t).features },
              null,
              8,
              ["features"]
            ))
          : U("", !0);
    },
  }),
  k0 = { class: "VPHome" },
  P0 = R({
    __name: "VPHome",
    setup(e) {
      return (t, n) => {
        const s = At("Content");
        return (
          h(),
          g("div", k0, [
            S(t.$slots, "home-hero-before", {}, void 0, !0),
            V(s0, null, {
              "home-hero-image": A(() => [
                S(t.$slots, "home-hero-image", {}, void 0, !0),
              ]),
              _: 3,
            }),
            S(t.$slots, "home-hero-after", {}, void 0, !0),
            S(t.$slots, "home-features-before", {}, void 0, !0),
            V($0),
            S(t.$slots, "home-features-after", {}, void 0, !0),
            V(s),
          ])
        );
      };
    },
  });
const C0 = F(P0, [["__scopeId", "data-v-b07783ac"]]);
function S0() {
  const { hasSidebar: e } = rt(),
    t = Ms("(min-width: 960px)"),
    n = Ms("(min-width: 1280px)");
  return {
    isAsideEnabled: K(() =>
      !n.value && !t.value ? !1 : e.value ? n.value : t.value
    ),
  };
}
const T0 = 71;
function L0(e, t) {
  if (e === !1) return [];
  let n = [];
  return (
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((s) => {
      if (s.textContent && s.id) {
        let o = s.textContent;
        if (t === !1) {
          const r = s.cloneNode(!0);
          for (const i of r.querySelectorAll(".VPBadge")) i.remove();
          o = r.textContent || "";
        }
        n.push({
          level: Number(s.tagName[1]),
          title: o.replace(/\s+#\s*$/, ""),
          link: `#${s.id}`,
        });
      }
    }),
    V0(n, e)
  );
}
function V0(e, t) {
  const n = (typeof t == "object" && !Array.isArray(t) ? t.level : t) || 2;
  return E0(e, typeof n == "number" ? [n, n] : n === "deep" ? [2, 6] : n);
}
function E0(e, t) {
  const n = [];
  return (
    (e = e.map((s) => ({ ...s }))),
    e.forEach((s, o) => {
      s.level >= t[0] && s.level <= t[1] && A0(o, e, t) && n.push(s);
    }),
    n
  );
}
function A0(e, t, n) {
  if (e === 0) return !0;
  const s = t[e];
  for (let o = e - 1; o >= 0; o--) {
    const r = t[o];
    if (r.level < s.level && r.level >= n[0] && r.level <= n[1])
      return r.children == null && (r.children = []), r.children.push(s), !1;
  }
  return !0;
}
function M0(e, t) {
  const { isAsideEnabled: n } = S0(),
    s = Ka(r, 100);
  let o = null;
  Be(() => {
    requestAnimationFrame(r), window.addEventListener("scroll", s);
  }),
    to(() => {
      i(location.hash);
    }),
    vt(() => {
      window.removeEventListener("scroll", s);
    });
  function r() {
    if (!n.value) return;
    const l = [].slice.call(e.value.querySelectorAll(".outline-link")),
      c = [].slice
        .call(document.querySelectorAll(".content .header-anchor"))
        .filter((k) =>
          l.some((H) => H.hash === k.hash && k.offsetParent !== null)
        ),
      u = window.scrollY,
      d = window.innerHeight,
      p = document.body.offsetHeight,
      v = Math.abs(u + d - p) < 1;
    if (c.length && v) {
      i(c[c.length - 1].hash);
      return;
    }
    for (let k = 0; k < c.length; k++) {
      const H = c[k],
        N = c[k + 1],
        [X, b] = I0(k, H, N);
      if (X) {
        i(b);
        return;
      }
    }
  }
  function i(l) {
    o && o.classList.remove("active"),
      l !== null &&
        (o = e.value.querySelector(`a[href="${decodeURIComponent(l)}"]`));
    const c = o;
    c
      ? (c.classList.add("active"),
        (t.value.style.top = c.offsetTop + 33 + "px"),
        (t.value.style.opacity = "1"))
      : ((t.value.style.top = "33px"), (t.value.style.opacity = "0"));
  }
}
function fr(e) {
  return e.parentElement.offsetTop - T0;
}
function I0(e, t, n) {
  const s = window.scrollY;
  return e === 0 && s === 0
    ? [!0, null]
    : s < fr(t)
    ? [!1, null]
    : !n || s < fr(n)
    ? [!0, t.hash]
    : [!1, null];
}
const N0 = ["href"],
  O0 = R({
    __name: "VPDocAsideOutlineItem",
    props: {
      headers: null,
      onClick: { type: Function },
      root: { type: Boolean },
    },
    setup(e) {
      return (t, n) => {
        const s = At("VPDocAsideOutlineItem", !0);
        return (
          h(),
          g(
            "ul",
            { class: ve(e.root ? "root" : "nested") },
            [
              (h(!0),
              g(
                J,
                null,
                Ve(
                  e.headers,
                  ({ children: o, link: r, title: i }) => (
                    h(),
                    g("li", null, [
                      y(
                        "a",
                        {
                          class: "outline-link",
                          href: r,
                          onClick:
                            n[0] ||
                            (n[0] = (...l) => e.onClick && e.onClick(...l)),
                        },
                        ce(i),
                        9,
                        N0
                      ),
                      o != null && o.length
                        ? (h(),
                          q(
                            s,
                            { key: 0, headers: o, onClick: e.onClick },
                            null,
                            8,
                            ["headers", "onClick"]
                          ))
                        : U("", !0),
                    ])
                  )
                ),
                256
              )),
            ],
            2
          )
        );
      };
    },
  });
const B0 = F(O0, [["__scopeId", "data-v-1188541a"]]),
  F0 = (e) => (Ze("data-v-5dd9d5f6"), (e = e()), et(), e),
  H0 = { class: "content" },
  R0 = { class: "outline-title" },
  D0 = { "aria-labelledby": "doc-outline-aria-label" },
  U0 = F0(() =>
    y(
      "span",
      { class: "visually-hidden", id: "doc-outline-aria-label" },
      " Table of Contents for current page ",
      -1
    )
  ),
  z0 = R({
    __name: "VPDocAsideOutline",
    setup(e) {
      const { frontmatter: t, theme: n } = ue(),
        s = K(() => t.value.outline ?? n.value.outline),
        o = qe("onContentUpdated");
      o.value = () => {
        r.value = L0(s.value, n.value.outlineBadges);
      };
      const r = ae([]),
        i = K(() => r.value.length > 0),
        l = ae(),
        c = ae();
      M0(l, c);
      function u({ target: d }) {
        const p = "#" + d.href.split("#")[1],
          v = document.querySelector(decodeURIComponent(p));
        v == null || v.focus();
      }
      return (d, p) => (
        h(),
        g(
          "div",
          {
            class: ve(["VPDocAsideOutline", { "has-outline": _(i) }]),
            ref_key: "container",
            ref: l,
          },
          [
            y("div", H0, [
              y(
                "div",
                { class: "outline-marker", ref_key: "marker", ref: c },
                null,
                512
              ),
              y(
                "div",
                R0,
                ce(
                  (typeof _(n).outline == "object" &&
                    !Array.isArray(_(n).outline) &&
                    _(n).outline.label) ||
                    _(n).outlineTitle ||
                    "On this page"
                ),
                1
              ),
              y("nav", D0, [
                U0,
                V(B0, { headers: r.value, root: !0, onClick: u }, null, 8, [
                  "headers",
                ]),
              ]),
            ]),
          ],
          2
        )
      );
    },
  });
const j0 = F(z0, [["__scopeId", "data-v-5dd9d5f6"]]),
  K0 = { class: "VPDocAsideCarbonAds" },
  q0 = R({
    __name: "VPDocAsideCarbonAds",
    props: { carbonAds: null },
    setup(e) {
      const t = () => null;
      return (n, s) => (
        h(),
        g("div", K0, [
          V(_(t), { "carbon-ads": e.carbonAds }, null, 8, ["carbon-ads"]),
        ])
      );
    },
  }),
  W0 = (e) => (Ze("data-v-cdc66372"), (e = e()), et(), e),
  G0 = { class: "VPDocAside" },
  Y0 = W0(() => y("div", { class: "spacer" }, null, -1)),
  Q0 = R({
    __name: "VPDocAside",
    setup(e) {
      const { theme: t } = ue();
      return (n, s) => (
        h(),
        g("div", G0, [
          S(n.$slots, "aside-top", {}, void 0, !0),
          S(n.$slots, "aside-outline-before", {}, void 0, !0),
          V(j0),
          S(n.$slots, "aside-outline-after", {}, void 0, !0),
          Y0,
          S(n.$slots, "aside-ads-before", {}, void 0, !0),
          _(t).carbonAds
            ? (h(),
              q(q0, { key: 0, "carbon-ads": _(t).carbonAds }, null, 8, [
                "carbon-ads",
              ]))
            : U("", !0),
          S(n.$slots, "aside-ads-after", {}, void 0, !0),
          S(n.$slots, "aside-bottom", {}, void 0, !0),
        ])
      );
    },
  });
const X0 = F(Q0, [["__scopeId", "data-v-cdc66372"]]);
function J0() {
  const { theme: e, page: t } = ue();
  return K(() => {
    const { text: n = "Edit this page", pattern: s = "" } =
        e.value.editLink || {},
      { relativePath: o } = t.value;
    return { url: s.replace(/:path/g, o), text: n };
  });
}
function Z0() {
  const { page: e, theme: t, frontmatter: n } = ue();
  return K(() => {
    const s = wi(t.value.sidebar, e.value.relativePath),
      o = Wa(s),
      r = o.findIndex((i) => Mt(e.value.relativePath, i.link));
    return {
      prev: n.value.prev ? { ...o[r - 1], text: n.value.prev } : o[r - 1],
      next: n.value.next ? { ...o[r + 1], text: n.value.next } : o[r + 1],
    };
  });
}
const e1 = {},
  t1 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  n1 = y(
    "path",
    {
      d: "M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z",
    },
    null,
    -1
  ),
  s1 = y(
    "path",
    {
      d: "M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z",
    },
    null,
    -1
  ),
  o1 = [n1, s1];
function r1(e, t) {
  return h(), g("svg", t1, o1);
}
const i1 = F(e1, [["render", r1]]),
  l1 = { class: "VPLastUpdated" },
  c1 = ["datetime"],
  a1 = R({
    __name: "VPDocFooterLastUpdated",
    setup(e) {
      const { theme: t, page: n } = ue(),
        s = K(() => new Date(n.value.lastUpdated)),
        o = K(() => s.value.toISOString()),
        r = ae("");
      return (
        Be(() => {
          Et(() => {
            r.value = s.value.toLocaleString(window.navigator.language);
          });
        }),
        (i, l) => (
          h(),
          g("p", l1, [
            Te(ce(_(t).lastUpdatedText || "Last updated") + ": ", 1),
            y("time", { datetime: _(o) }, ce(r.value), 9, c1),
          ])
        )
      );
    },
  });
const u1 = F(a1, [["__scopeId", "data-v-355aa5ef"]]),
  f1 = { key: 0, class: "VPDocFooter" },
  d1 = { key: 0, class: "edit-info" },
  h1 = { key: 0, class: "edit-link" },
  _1 = { key: 1, class: "last-updated" },
  p1 = { key: 1, class: "prev-next" },
  v1 = { class: "pager" },
  m1 = ["href"],
  g1 = ["innerHTML"],
  b1 = ["innerHTML"],
  y1 = ["href"],
  x1 = ["innerHTML"],
  w1 = ["innerHTML"],
  $1 = R({
    __name: "VPDocFooter",
    setup(e) {
      const { theme: t, page: n, frontmatter: s } = ue(),
        o = J0(),
        r = Z0(),
        i = K(() => t.value.editLink && s.value.editLink !== !1),
        l = K(() => n.value.lastUpdated && s.value.lastUpdated !== !1),
        c = K(() => i.value || l.value || r.value.prev || r.value.next);
      return (u, d) => {
        var p, v;
        return _(c)
          ? (h(),
            g("footer", f1, [
              _(i) || _(l)
                ? (h(),
                  g("div", d1, [
                    _(i)
                      ? (h(),
                        g("div", h1, [
                          V(
                            gt,
                            {
                              class: "edit-link-button",
                              href: _(o).url,
                              "no-icon": !0,
                            },
                            {
                              default: A(() => [
                                V(i1, { class: "edit-link-icon" }),
                                Te(" " + ce(_(o).text), 1),
                              ]),
                              _: 1,
                            },
                            8,
                            ["href"]
                          ),
                        ]))
                      : U("", !0),
                    _(l) ? (h(), g("div", _1, [V(u1)])) : U("", !0),
                  ]))
                : U("", !0),
              _(r).prev || _(r).next
                ? (h(),
                  g("div", p1, [
                    y("div", v1, [
                      _(r).prev
                        ? (h(),
                          g(
                            "a",
                            {
                              key: 0,
                              class: "pager-link prev",
                              href: _(vn)(_(r).prev.link),
                            },
                            [
                              y(
                                "span",
                                {
                                  class: "desc",
                                  innerHTML:
                                    ((p = _(t).docFooter) == null
                                      ? void 0
                                      : p.prev) || "Previous page",
                                },
                                null,
                                8,
                                g1
                              ),
                              y(
                                "span",
                                { class: "title", innerHTML: _(r).prev.text },
                                null,
                                8,
                                b1
                              ),
                            ],
                            8,
                            m1
                          ))
                        : U("", !0),
                    ]),
                    y(
                      "div",
                      { class: ve(["pager", { "has-prev": _(r).prev }]) },
                      [
                        _(r).next
                          ? (h(),
                            g(
                              "a",
                              {
                                key: 0,
                                class: "pager-link next",
                                href: _(vn)(_(r).next.link),
                              },
                              [
                                y(
                                  "span",
                                  {
                                    class: "desc",
                                    innerHTML:
                                      ((v = _(t).docFooter) == null
                                        ? void 0
                                        : v.next) || "Next page",
                                  },
                                  null,
                                  8,
                                  x1
                                ),
                                y(
                                  "span",
                                  { class: "title", innerHTML: _(r).next.text },
                                  null,
                                  8,
                                  w1
                                ),
                              ],
                              8,
                              y1
                            ))
                          : U("", !0),
                      ],
                      2
                    ),
                  ]))
                : U("", !0),
            ]))
          : U("", !0);
      };
    },
  });
const k1 = F($1, [["__scopeId", "data-v-e033cd21"]]),
  P1 = (e) => (Ze("data-v-c5936a1e"), (e = e()), et(), e),
  C1 = { class: "container" },
  S1 = { key: 0, class: "aside" },
  T1 = P1(() => y("div", { class: "aside-curtain" }, null, -1)),
  L1 = { class: "aside-container" },
  V1 = { class: "aside-content" },
  E1 = { class: "content" },
  A1 = { class: "content-container" },
  M1 = { class: "main" },
  I1 = R({
    __name: "VPDoc",
    setup(e) {
      const t = mt(),
        { hasSidebar: n, hasAside: s } = rt(),
        o = K(() => t.path.replace(/[./]+/g, "_").replace(/_html$/, "")),
        r = ae();
      return (
        Dt("onContentUpdated", r),
        (i, l) => {
          const c = At("Content");
          return (
            h(),
            g(
              "div",
              {
                class: ve([
                  "VPDoc",
                  { "has-sidebar": _(n), "has-aside": _(s) },
                ]),
              },
              [
                y("div", C1, [
                  _(s)
                    ? (h(),
                      g("div", S1, [
                        T1,
                        y("div", L1, [
                          y("div", V1, [
                            V(X0, null, {
                              "aside-top": A(() => [
                                S(i.$slots, "aside-top", {}, void 0, !0),
                              ]),
                              "aside-bottom": A(() => [
                                S(i.$slots, "aside-bottom", {}, void 0, !0),
                              ]),
                              "aside-outline-before": A(() => [
                                S(
                                  i.$slots,
                                  "aside-outline-before",
                                  {},
                                  void 0,
                                  !0
                                ),
                              ]),
                              "aside-outline-after": A(() => [
                                S(
                                  i.$slots,
                                  "aside-outline-after",
                                  {},
                                  void 0,
                                  !0
                                ),
                              ]),
                              "aside-ads-before": A(() => [
                                S(i.$slots, "aside-ads-before", {}, void 0, !0),
                              ]),
                              "aside-ads-after": A(() => [
                                S(i.$slots, "aside-ads-after", {}, void 0, !0),
                              ]),
                              _: 3,
                            }),
                          ]),
                        ]),
                      ]))
                    : U("", !0),
                  y("div", E1, [
                    y("div", A1, [
                      S(i.$slots, "doc-before", {}, void 0, !0),
                      y("main", M1, [
                        V(
                          c,
                          {
                            class: ve(["vp-doc", _(o)]),
                            onContentUpdated: r.value,
                          },
                          null,
                          8,
                          ["class", "onContentUpdated"]
                        ),
                      ]),
                      S(i.$slots, "doc-footer-before", {}, void 0, !0),
                      V(k1),
                      S(i.$slots, "doc-after", {}, void 0, !0),
                    ]),
                  ]),
                ]),
              ],
              2
            )
          );
        }
      );
    },
  });
const N1 = F(I1, [["__scopeId", "data-v-c5936a1e"]]),
  O1 = R({
    __name: "VPContent",
    setup(e) {
      const t = mt(),
        { frontmatter: n } = ue(),
        { hasSidebar: s } = rt(),
        o = qe("NotFound");
      return (r, i) => (
        h(),
        g(
          "div",
          {
            class: ve([
              "VPContent",
              { "has-sidebar": _(s), "is-home": _(n).layout === "home" },
            ]),
            id: "VPContent",
          },
          [
            _(t).component === _(o)
              ? (h(), q(_(o), { key: 0 }))
              : _(n).layout === "page"
              ? (h(), q(Dh, { key: 1 }))
              : _(n).layout === "home"
              ? (h(),
                q(
                  C0,
                  { key: 2 },
                  {
                    "home-hero-before": A(() => [
                      S(r.$slots, "home-hero-before", {}, void 0, !0),
                    ]),
                    "home-hero-image": A(() => [
                      S(r.$slots, "home-hero-image", {}, void 0, !0),
                    ]),
                    "home-hero-after": A(() => [
                      S(r.$slots, "home-hero-after", {}, void 0, !0),
                    ]),
                    "home-features-before": A(() => [
                      S(r.$slots, "home-features-before", {}, void 0, !0),
                    ]),
                    "home-features-after": A(() => [
                      S(r.$slots, "home-features-after", {}, void 0, !0),
                    ]),
                    _: 3,
                  }
                ))
              : (h(),
                q(
                  N1,
                  { key: 3 },
                  {
                    "doc-footer-before": A(() => [
                      S(r.$slots, "doc-footer-before", {}, void 0, !0),
                    ]),
                    "doc-before": A(() => [
                      S(r.$slots, "doc-before", {}, void 0, !0),
                    ]),
                    "doc-after": A(() => [
                      S(r.$slots, "doc-after", {}, void 0, !0),
                    ]),
                    "aside-top": A(() => [
                      S(r.$slots, "aside-top", {}, void 0, !0),
                    ]),
                    "aside-outline-before": A(() => [
                      S(r.$slots, "aside-outline-before", {}, void 0, !0),
                    ]),
                    "aside-outline-after": A(() => [
                      S(r.$slots, "aside-outline-after", {}, void 0, !0),
                    ]),
                    "aside-ads-before": A(() => [
                      S(r.$slots, "aside-ads-before", {}, void 0, !0),
                    ]),
                    "aside-ads-after": A(() => [
                      S(r.$slots, "aside-ads-after", {}, void 0, !0),
                    ]),
                    "aside-bottom": A(() => [
                      S(r.$slots, "aside-bottom", {}, void 0, !0),
                    ]),
                    _: 3,
                  }
                )),
          ],
          2
        )
      );
    },
  });
const B1 = F(O1, [["__scopeId", "data-v-0bd490fb"]]),
  F1 = { class: "container" },
  H1 = ["innerHTML"],
  R1 = ["innerHTML"],
  D1 = R({
    __name: "VPFooter",
    setup(e) {
      const { theme: t } = ue(),
        { hasSidebar: n } = rt();
      return (s, o) =>
        _(t).footer
          ? (h(),
            g(
              "footer",
              { key: 0, class: ve(["VPFooter", { "has-sidebar": _(n) }]) },
              [
                y("div", F1, [
                  _(t).footer.message
                    ? (h(),
                      g(
                        "p",
                        {
                          key: 0,
                          class: "message",
                          innerHTML: _(t).footer.message,
                        },
                        null,
                        8,
                        H1
                      ))
                    : U("", !0),
                  _(t).footer.copyright
                    ? (h(),
                      g(
                        "p",
                        {
                          key: 1,
                          class: "copyright",
                          innerHTML: _(t).footer.copyright,
                        },
                        null,
                        8,
                        R1
                      ))
                    : U("", !0),
                ]),
              ],
              2
            ))
          : U("", !0);
    },
  });
const U1 = F(D1, [["__scopeId", "data-v-d24360a6"]]),
  z1 = { key: 0, class: "Layout" },
  j1 = R({
    __name: "Layout",
    setup(e) {
      const { isOpen: t, open: n, close: s } = rt(),
        o = mt();
      Xe(() => o.path, s),
        Ga(t, s),
        Dt("close-sidebar", s),
        Dt("is-sidebar-open", t);
      const { frontmatter: r } = ue(),
        i = Ec(),
        l = K(() => !!i["home-hero-image"]);
      return (
        Dt("hero-image-slot-exists", l),
        (c, u) => {
          const d = At("Content");
          return _(r).layout !== !1
            ? (h(),
              g("div", z1, [
                S(c.$slots, "layout-top", {}, void 0, !0),
                V(Xa),
                V(
                  eu,
                  { class: "backdrop", show: _(t), onClick: _(s) },
                  null,
                  8,
                  ["show", "onClick"]
                ),
                V(ih, null, {
                  "nav-bar-title-before": A(() => [
                    S(c.$slots, "nav-bar-title-before", {}, void 0, !0),
                  ]),
                  "nav-bar-title-after": A(() => [
                    S(c.$slots, "nav-bar-title-after", {}, void 0, !0),
                  ]),
                  "nav-bar-content-before": A(() => [
                    S(c.$slots, "nav-bar-content-before", {}, void 0, !0),
                  ]),
                  "nav-bar-content-after": A(() => [
                    S(c.$slots, "nav-bar-content-after", {}, void 0, !0),
                  ]),
                  "nav-screen-content-before": A(() => [
                    S(c.$slots, "nav-screen-content-before", {}, void 0, !0),
                  ]),
                  "nav-screen-content-after": A(() => [
                    S(c.$slots, "nav-screen-content-after", {}, void 0, !0),
                  ]),
                  _: 3,
                }),
                V(yh, { open: _(t), onOpenMenu: _(n) }, null, 8, [
                  "open",
                  "onOpenMenu",
                ]),
                V(
                  Bh,
                  { open: _(t) },
                  {
                    "sidebar-nav-before": A(() => [
                      S(c.$slots, "sidebar-nav-before", {}, void 0, !0),
                    ]),
                    "sidebar-nav-after": A(() => [
                      S(c.$slots, "sidebar-nav-after", {}, void 0, !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ["open"]
                ),
                V(B1, null, {
                  "home-hero-before": A(() => [
                    S(c.$slots, "home-hero-before", {}, void 0, !0),
                  ]),
                  "home-hero-image": A(() => [
                    S(c.$slots, "home-hero-image", {}, void 0, !0),
                  ]),
                  "home-hero-after": A(() => [
                    S(c.$slots, "home-hero-after", {}, void 0, !0),
                  ]),
                  "home-features-before": A(() => [
                    S(c.$slots, "home-features-before", {}, void 0, !0),
                  ]),
                  "home-features-after": A(() => [
                    S(c.$slots, "home-features-after", {}, void 0, !0),
                  ]),
                  "doc-footer-before": A(() => [
                    S(c.$slots, "doc-footer-before", {}, void 0, !0),
                  ]),
                  "doc-before": A(() => [
                    S(c.$slots, "doc-before", {}, void 0, !0),
                  ]),
                  "doc-after": A(() => [
                    S(c.$slots, "doc-after", {}, void 0, !0),
                  ]),
                  "aside-top": A(() => [
                    S(c.$slots, "aside-top", {}, void 0, !0),
                  ]),
                  "aside-bottom": A(() => [
                    S(c.$slots, "aside-bottom", {}, void 0, !0),
                  ]),
                  "aside-outline-before": A(() => [
                    S(c.$slots, "aside-outline-before", {}, void 0, !0),
                  ]),
                  "aside-outline-after": A(() => [
                    S(c.$slots, "aside-outline-after", {}, void 0, !0),
                  ]),
                  "aside-ads-before": A(() => [
                    S(c.$slots, "aside-ads-before", {}, void 0, !0),
                  ]),
                  "aside-ads-after": A(() => [
                    S(c.$slots, "aside-ads-after", {}, void 0, !0),
                  ]),
                  _: 3,
                }),
                V(U1),
                S(c.$slots, "layout-bottom", {}, void 0, !0),
              ]))
            : (h(), q(d, { key: 1 }));
        }
      );
    },
  });
const K1 = F(j1, [["__scopeId", "data-v-93a960b4"]]),
  rs = (e) => (Ze("data-v-63c9cdeb"), (e = e()), et(), e),
  q1 = { class: "NotFound" },
  W1 = rs(() => y("p", { class: "code" }, "404", -1)),
  G1 = rs(() => y("h1", { class: "title" }, "PAGE NOT FOUND", -1)),
  Y1 = rs(() => y("div", { class: "divider" }, null, -1)),
  Q1 = rs(() =>
    y(
      "blockquote",
      { class: "quote" },
      " But if you don't change your direction, and if you keep looking, you may end up where you are heading. ",
      -1
    )
  ),
  X1 = { class: "action" },
  J1 = ["href"],
  Z1 = R({
    __name: "NotFound",
    setup(e) {
      const { site: t } = ue(),
        { localeLinks: n } = gn({ removeCurrent: !1 }),
        s = ae("/");
      return (
        Be(() => {
          var r;
          const o = window.location.pathname
            .replace(t.value.base, "")
            .replace(/(^.*?\/).*$/, "/$1");
          n.value.length &&
            (s.value =
              ((r = n.value.find(({ link: i }) => i.startsWith(o))) == null
                ? void 0
                : r.link) || n.value[0].link);
        }),
        (o, r) => (
          h(),
          g("div", q1, [
            W1,
            G1,
            Y1,
            Q1,
            y("div", X1, [
              y(
                "a",
                {
                  class: "link",
                  href: _(pn)(s.value),
                  "aria-label": "go to home",
                },
                " Take me home ",
                8,
                J1
              ),
            ]),
          ])
        )
      );
    },
  });
const e_ = F(Z1, [["__scopeId", "data-v-63c9cdeb"]]);
const Kt = {
  Layout: K1,
  NotFound: e_,
  enhanceApp: ({ app: e }) => {
    e.component("Badge", va);
  },
};
function t_(e, t) {
  let n = [],
    s = !0;
  const o = (r) => {
    if (s) {
      s = !1;
      return;
    }
    n.forEach((i) => document.head.removeChild(i)),
      (n = []),
      r.forEach((i) => {
        const l = n_(i);
        document.head.appendChild(l), n.push(l);
      });
  };
  Et(() => {
    const r = e.data,
      i = t.value,
      l = r && r.description,
      c = (r && r.frontmatter.head) || [];
    (document.title = hi(i, r)),
      document
        .querySelector("meta[name=description]")
        .setAttribute("content", l || i.description),
      o(_i(i.head, o_(c)));
  });
}
function n_([e, t, n]) {
  const s = document.createElement(e);
  for (const o in t) s.setAttribute(o, t[o]);
  return n && (s.innerHTML = n), s;
}
function s_(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function o_(e) {
  return e.filter((t) => !s_(t));
}
const gs = new Set(),
  Ai = () => document.createElement("link"),
  r_ = (e) => {
    const t = Ai();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  i_ = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let Ln;
const l_ =
  ke &&
  (Ln = Ai()) &&
  Ln.relList &&
  Ln.relList.supports &&
  Ln.relList.supports("prefetch")
    ? r_
    : i_;
function c_() {
  if (!ke || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((r) => {
        r.forEach((i) => {
          if (i.isIntersecting) {
            const l = i.target;
            n.unobserve(l);
            const { pathname: c } = l;
            if (!gs.has(c)) {
              gs.add(c);
              const u = mi(c);
              l_(u);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((r) => {
          const { target: i } = r,
            { hostname: l, pathname: c } = new URL(
              r.href instanceof SVGAnimatedString ? r.href.animVal : r.href,
              r.baseURI
            ),
            u = c.match(/\.\w+$/);
          (u && u[0] !== ".html") ||
            (i !== "_blank" &&
              l === location.hostname &&
              (c !== location.pathname ? n.observe(r) : gs.add(c)));
        });
      });
  };
  Be(s);
  const o = mt();
  Xe(() => o.path, s),
    vt(() => {
      n && n.disconnect();
    });
}
const a_ = R({
  setup(e, { slots: t }) {
    const n = ae(!1);
    return (
      Be(() => {
        n.value = !0;
      }),
      () => (n.value && t.default ? t.default() : null)
    );
  },
});
function u_() {
  if (ke) {
    const e = new Map();
    window.addEventListener("click", (t) => {
      var s;
      const n = t.target;
      if (n.matches('div[class*="language-"] > button.copy')) {
        const o = n.parentElement,
          r =
            (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling;
        if (!o || !r) return;
        const i = /language-(shellscript|shell|bash|sh|zsh)/.test(o.className);
        let l = "";
        r.querySelectorAll("span.line:not(.diff.remove)").forEach(
          (c) =>
            (l +=
              (c.textContent || "") +
              `
`)
        ),
          (l = l.slice(0, -1)),
          i && (l = l.replace(/^ *(\$|>) /gm, "").trim()),
          f_(l).then(() => {
            n.classList.add("copied"), clearTimeout(e.get(n));
            const c = setTimeout(() => {
              n.classList.remove("copied"), n.blur(), e.delete(n);
            }, 2e3);
            e.set(n, c);
          });
      }
    });
  }
}
async function f_(e) {
  try {
    return navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea"),
      n = document.activeElement;
    (t.value = e),
      t.setAttribute("readonly", ""),
      (t.style.contain = "strict"),
      (t.style.position = "absolute"),
      (t.style.left = "-9999px"),
      (t.style.fontSize = "12pt");
    const s = document.getSelection(),
      o = s ? s.rangeCount > 0 && s.getRangeAt(0) : null;
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand("copy"),
      document.body.removeChild(t),
      o && (s.removeAllRanges(), s.addRange(o)),
      n && n.focus();
  }
}
function d_() {
  ke &&
    window.addEventListener("click", (e) => {
      var n, s;
      const t = e.target;
      if (t.matches(".vp-code-group input")) {
        const o = (n = t.parentElement) == null ? void 0 : n.parentElement,
          r = Array.from(
            (o == null ? void 0 : o.querySelectorAll("input")) || []
          ).indexOf(t),
          i =
            o == null
              ? void 0
              : o.querySelector('div[class*="language-"].active'),
          l =
            (s =
              o == null
                ? void 0
                : o.querySelectorAll('div[class*="language-"]')) == null
              ? void 0
              : s[r];
        i &&
          l &&
          i !== l &&
          (i.classList.remove("active"), l.classList.add("active"));
      }
    });
}
const Mi = Kt.NotFound || (() => "404 Not Found"),
  h_ = R({
    name: "VitePressApp",
    setup() {
      const { site: e } = vi();
      return (
        Be(() => {
          Et(() => {
            (document.documentElement.lang = e.value.lang),
              (document.documentElement.dir = e.value.dir);
          });
        }),
        c_(),
        u_(),
        d_(),
        Kt.setup && Kt.setup(),
        () => Hn(Kt.Layout)
      );
    },
  });
async function __() {
  const e = v_(),
    t = p_();
  t.provide(gi, e);
  const n = Pa(e.route);
  return (
    t.provide(pi, n),
    t.provide("NotFound", Mi),
    t.component("Content", Va),
    t.component("ClientOnly", a_),
    Object.defineProperty(t.config.globalProperties, "$frontmatter", {
      get() {
        return n.frontmatter.value;
      },
    }),
    Kt.enhanceApp && (await Kt.enhanceApp({ app: t, router: e, siteData: ft })),
    { app: t, router: e, data: n }
  );
}
function p_() {
  return ua(h_);
}
function v_() {
  let e = ke,
    t;
  return Ta((n) => {
    let s = mi(n);
    return (
      e && (t = s),
      (e || t === s) && (s = s.replace(/\.js$/, ".lean.js")),
      ke && (e = !1),
      _a(() => import(s), [])
    );
  }, Mi);
}
ke &&
  __().then(({ app: e, router: t, data: n }) => {
    t.go().then(() => {
      t_(t.route, n.site), e.mount("#app");
    });
  });
export { F as _, wc as a, g as c, __ as createApp, h as o };
