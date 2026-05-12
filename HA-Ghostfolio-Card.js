/**
 * HA-Ghostfolio-Card - Home Assistant Custom Card
 * 
 * A comprehensive Ghostfolio portfolio tracker card for Home Assistant.
 * Displays real-time portfolio performance, account breakdowns, holdings analysis,
 * and visual charts for asset allocation.
 *
 * @version 1.0.0
 * @author Chris Denny (christopherdenny)
 * @license MIT
 * @repository https://github.com/christopherdenny/HA-Ghostfolio-Card
 * 
 * FEATURES:
 * - Real-time portfolio value and performance tracking
 * - Account-based breakdown with visual allocation bars
 * - Detailed holdings list with expandable metrics
 * - Sector and account allocation donut charts
 * - Performance summary with CAGR and returns
 * - Responsive design with dark/light theme support
 * - US Market status indicator (green/gray dot)
 * - Investable cash and liabilities tracking
 * 
 * REQUIREMENTS:
 * - Home Assistant 2024.5+
 * - Ghostfolio instance with API access
 * - Ghostfolio Access Token
 * 
 * CONFIGURATION:
 * type: custom:ghostfolio-card
 * title: My Portfolio
 * ghostfolio_url: https://your-ghostfolio-instance.com
 * access_token: YOUR_GHOSTFOLIO_TOKEN
 * show_performance: true
 * show_investment: true
 * show_accounts: true
 * show_holdings: true
 * currency_format: USD
 * decimal_places: 2
 */

var N = globalThis,
    D = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    L = Symbol(),
    tt = new WeakMap,
    E = class {
        constructor(t, e, s) {
            if (this._$cssResult$ = !0, s !== L) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = t, this.t = e
        }
        get styleSheet() {
            let t = this.o,
                e = this.t;
            if (D && t === void 0) {
                let s = e !== void 0 && e.length === 1;
                s && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), s && tt.set(e, t))
            }
            return t
        }
        toString() {
            return this.cssText
        }
    },
    et = r => new E(typeof r == "string" ? r : r + "", void 0, L),
    z = (r, ...t) => {
        let e = r.length === 1 ? r[0] : t.reduce((s, o, i) => s + (n => {
            if (n._$cssResult$ === !0) return n.cssText;
            if (typeof n == "number") return n;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
        })(o) + r[i + 1], r[0]);
        return new E(e, r, L)
    },
    st = (r, t) => {
        if (D) r.adoptedStyleSheets = t.map(e => e instanceof CSSStyleSheet ? e : e.styleSheet);
        else
            for (let e of t) {
                let s = document.createElement("style"),
                    o = N.litNonce;
                o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, r.appendChild(s)
            }
    },
    R = D ? r => r : r => r instanceof CSSStyleSheet ? (t => {
        let e = "";
        for (let s of t.cssRules) e += s.cssText;
        return et(e)
    })(r) : r;
var {
    is: $t,
    defineProperty: xt,
    getOwnPropertyDescriptor: yt,
    getOwnPropertyNames: bt,
    getOwnPropertySymbols: wt,
    getPrototypeOf: At
} = Object, O = globalThis, ot = O.trustedTypes, St = ot ? ot.emptyScript : "", Et = O.reactiveElementPolyfillSupport, C = (r, t) => r, F = {
    toAttribute(r, t) {
        switch (t) {
            case Boolean:
                r = r ? St : null;
                break;
            case Object:
            case Array:
                r = r == null ? r : JSON.stringify(r)
        }
        return r
    },
    fromAttribute(r, t) {
        let e = r;
        switch (t) {
            case Boolean:
                e = r !== null;
                break;
            case Number:
                e = r === null ? null : Number(r);
                break;
            case Object:
            case Array:
                try {
                    e = JSON.parse(r)
                } catch {
                    e = null
                }
        }
        return e
    }
}, rt = (r, t) => !$t(r, t), it = {
    attribute: !0,
    type: String,
    converter: F,
    reflect: !1,
    useDefault: !1,
    hasChanged: rt
};
Symbol.metadata ??= Symbol("metadata"), O.litPropertyMetadata ??= new WeakMap;
var m = class extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t)
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()]
    }
    static createProperty(t, e = it) {
        if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
            let s = Symbol(),
                o = this.getPropertyDescriptor(t, s, e);
            o !== void 0 && xt(this.prototype, t, o)
        }
    }
    static getPropertyDescriptor(t, e, s) {
        let {
            get: o,
            set: i
        } = yt(this.prototype, t) ?? {
            get() {
                return this[e]
            },
            set(n) {
                this[e] = n
            }
        };
        return {
            get: o,
            set(n) {
                let l = o?.call(this);
                i?.call(this, n), this.requestUpdate(t, l, s)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? it
    }
    static _$Ei() {
        if (this.hasOwnProperty(C("elementProperties"))) return;
        let t = At(this);
        t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties)
    }
    static finalize() {
        if (this.hasOwnProperty(C("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
            let e = this.properties,
                s = [...bt(e), ...wt(e)];
            for (let o of s) this.createProperty(o, e[o])
        }
        let t = this[Symbol.metadata];
        if (t !== null) {
            let e = litPropertyMetadata.get(t);
            if (e !== void 0)
                for (let [s, o] of e) this.elementProperties.set(s, o)
        }
        this._$Eh = new Map;
        for (let [e, s] of this.elementProperties) {
            let o = this._$Eu(e, s);
            o !== void 0 && this._$Eh.set(o, e)
        }
        this.elementStyles = this.finalizeStyles(this.styles)
    }
    static finalizeStyles(t) {
        let e = [];
        if (Array.isArray(t)) {
            let s = new Set(t.flat(1 / 0).reverse());
            for (let o of s) e.unshift(R(o))
        } else t !== void 0 && e.push(R(t));
        return e
    }
    static _$Eu(t, e) {
        let s = e.attribute;
        return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0
    }
    constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev()
    }
    _$Ev() {
        this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(t => t(this))
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.()
    }
    removeController(t) {
        this._$EO?.delete(t)
    }
    _$E_() {
        let t = new Map,
            e = this.constructor.elementProperties;
        for (let s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
        t.size > 0 && (this._$Ep = t)
    }
    createRenderRoot() {
        let t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return st(t, this.constructor.elementStyles), t
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(t => t.hostConnected?.())
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach(t => t.hostDisconnected?.())
    }
    attributeChangedCallback(t, e, s) {
        this._$AK(t, s)
    }
    _$ET(t, e) {
        let s = this.constructor.elementProperties.get(t),
            o = this.constructor._$Eu(t, s);
        if (o !== void 0 && s.reflect === !0) {
            let i = (s.converter?.toAttribute !== void 0 ? s.converter : F).toAttribute(e, s.type);
            this._$Em = t, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null
        }
    }
    _$AK(t, e) {
        let s = this.constructor,
            o = s._$Eh.get(t);
        if (o !== void 0 && this._$Em !== o) {
            let i = s.getPropertyOptions(o),
                n = typeof i.converter == "function" ? {
                    fromAttribute: i.converter
                } : i.converter?.fromAttribute !== void 0 ? i.converter : F;
            this._$Em = o;
            let l = n.fromAttribute(e, i.type);
            this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null
        }
    }
    requestUpdate(t, e, s, o = !1, i) {
        if (t !== void 0) {
            let n = this.constructor;
            if (o === !1 && (i = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? rt)(i, e) || s.useDefault && s.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
            this.C(t, e, s)
        }
        this.isUpdatePending === !1 && (this._$ES = this._$EP())
    }
    C(t, e, {
        useDefault: s,
        reflect: o,
        wrapped: i
    }, n) {
        s && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), i !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= new Set).add(t))
    }
    async _$EP() {
        this.isUpdatePending = !0;
        try {
            await this._$ES
        } catch (e) {
            Promise.reject(e)
        }
        let t = this.scheduleUpdate();
        return t != null && await t, !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (let [o, i] of this._$Ep) this[o] = i;
                this._$Ep = void 0
            }
            let s = this.constructor.elementProperties;
            if (s.size > 0)
                for (let [o, i] of s) {
                    let {
                        wrapped: n
                    } = i, l = this[o];
                    n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, i, l)
                }
        }
        let t = !1,
            e = this._$AL;
        try {
            t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(s => s.hostUpdate?.()), this.update(e)) : this._$EM()
        } catch (s) {
            throw t = !1, this._$EM(), s
        }
        t && this._$AE(e)
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach(e => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t)
    }
    _$EM() {
        this._$AL = new Map, this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$ES
    }
    shouldUpdate(t) {
        return !0
    }
    update(t) {
        this._$Eq &&= this._$Eq.forEach(e => this._$ET(e, this[e])), this._$EM()
    }
    updated(t) {}
    firstUpdated(t) {}
};
m.elementStyles = [], m.shadowRootOptions = {
    mode: "open"
}, m[C("elementProperties")] = new Map, m[C("finalized")] = new Map, Et?.({
    ReactiveElement: m
}), (O.reactiveElementVersions ??= []).push("2.1.2");
var G = globalThis,
    nt = r => r,
    M = G.trustedTypes,
    at = M ? M.createPolicy("lit-html", {
        createHTML: r => r
    }) : void 0,
    ut = "$lit$",
    $ = `lit$${Math.random().toFixed(9).slice(2)}$`,
    gt = "?" + $,
    Ct = `<${gt}>`,
    b = document,
    P = () => b.createComment(""),
    T = r => r === null || typeof r != "object" && typeof r != "function",
    K = Array.isArray,
    kt = r => K(r) || typeof r?.[Symbol.iterator] == "function",
    I = `[ \t\n\f\r]`,
    k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    lt = /-->/g,
    ct = />/g,
    x = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
    ht = /'/g,
    dt = /"/g,
    ft = /^(?:script|style|textarea|title)$/i,
    J = r => (t, ...e) => ({
        _$litType$: r,
        strings: t,
        values: e
    }),
    h = J(1),
    Z = J(2),
    Mt = J(3),
    w = Symbol.for("lit-noChange"),
    u = Symbol.for("lit-nothing"),
    pt = new WeakMap,
    y = b.createTreeWalker(b, 129);

function vt(r, t) {
    if (!K(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return at !== void 0 ? at.createHTML(t) : t
}
var Pt = (r, t) => {
        let e = r.length - 1,
            s = [],
            o, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "",
            n = k;
        for (let l = 0; l < e; l++) {
            let a = r[l],
                d, p, c = -1,
                g = 0;
            for (; g < a.length && (n.lastIndex = g, p = n.exec(a), p !== null);) g = n.lastIndex, n === k ? p[1] === "!--" ? n = lt : p[1] !== void 0 ? n = ct : p[2] !== void 0 ? (ft.test(p[2]) && (o = RegExp("</" + p[2], "g")), n = x) : p[3] !== void 0 && (n = x) : n === x ? p[0] === ">" ? (n = o ?? k, c = -1) : p[1] === void 0 ? c = -2 : (c = n.lastIndex - p[2].length, d = p[1], n = p[3] === void 0 ? x : p[3] === '"' ? dt : ht) : n === dt || n === ht ? n = x : n === lt || n === ct ? n = k : (n = x, o = void 0);
            let f = n === x && r[l + 1].startsWith("/>") ? " " : "";
            i += n === k ? a + Ct : c >= 0 ? (s.push(d), a.slice(0, c) + ut + a.slice(c) + $ + f) : a + $ + (c === -2 ? l : f)
        }
        return [vt(r, i + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s]
    },
    U = class r {
        constructor({
            strings: t,
            _$litType$: e
        }, s) {
            let o;
            this.parts = [];
            let i = 0,
                n = 0,
                l = t.length - 1,
                a = this.parts,
                [d, p] = Pt(t, e);
            if (this.el = r.createElement(d, s), y.currentNode = this.el.content, e === 2 || e === 3) {
                let c = this.el.content.firstChild;
                c.replaceWith(...c.childNodes)
            }
            for (;
                (o = y.nextNode()) !== null && a.length < l;) {
                if (o.nodeType === 1) {
                    if (o.hasAttributes())
                        for (let c of o.getAttributeNames())
                            if (c.endsWith(ut)) {
                                let g = p[n++],
                                    f = o.getAttribute(c).split($),
                                    v = /([.?@])?(.*)/.exec(g);
                                a.push({
                                    type: 1,
                                    index: i,
                                    name: v[2],
                                    strings: f,
                                    ctor: v[1] === "." ? j : v[1] === "?" ? W : v[1] === "@" ? q : S
                                }), o.removeAttribute(c)
                            } else c.startsWith($) && (a.push({
                                type: 6,
                                index: i
                            }), o.removeAttribute(c));
                    if (ft.test(o.tagName)) {
                        let c = o.textContent.split($),
                            g = c.length - 1;
                        if (g > 0) {
                            o.textContent = M ? M.emptyScript : "";
                            for (let f = 0; f < g; f++) o.append(c[f], P()), y.nextNode(), a.push({
                                type: 2,
                                index: ++i
                            });
                            o.append(c[g], P())
                        }
                    }
                } else if (o.nodeType === 8)
                    if (o.data === gt) a.push({
                        type: 2,
                        index: i
                    });
                    else {
                        let c = -1;
                        for (;
                            (c = o.data.indexOf($, c + 1)) !== -1;) a.push({
                            type: 7,
                            index: i
                        }), c += $.length - 1
                    } i++
            }
        }
        static createElement(t, e) {
            let s = b.createElement("template");
            return s.innerHTML = t, s
        }
    };

function A(r, t, e = r, s) {
    if (t === w) return t;
    let o = s !== void 0 ? e._$Co?.[s] : e._$Cl,
        i = T(t) ? void 0 : t._$litDirective$;
    return o?.constructor !== i && (o?._$AO?.(!1), i === void 0 ? o = void 0 : (o = new i(r), o._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = o : e._$Cl = o), o !== void 0 && (t = A(r, o._$AS(r, t.values), o, s)), t
}
var B = class {
        constructor(t, e) {
            this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e
        }
        get parentNode() {
            return this._$AM.parentNode
        }
        get _$AU() {
            return this._$AM._$AU
        }
        u(t) {
            let {
                el: {
                    content: e
                },
                parts: s
            } = this._$AD, o = (t?.creationScope ?? b).importNode(e, !0);
            y.currentNode = o;
            let i = y.nextNode(),
                n = 0,
                l = 0,
                a = s[0];
            for (; a !== void 0;) {
                if (n === a.index) {
                    let d;
                    a.type === 2 ? d = new H(i, i.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(i, a.name, a.strings, this, t) : a.type === 6 && (d = new V(i, this, t)), this._$AV.push(d), a = s[++l]
                }
                n !== a?.index && (i = y.nextNode(), n++)
            }
            return y.currentNode = b, o
        }
        p(t) {
            let e = 0;
            for (let s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++
        }
    },
    H = class r {
        get _$AU() {
            return this._$AM?._$AU ?? this._$Cv
        }
        constructor(t, e, s, o) {
            this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0
        }
        get parentNode() {
            let t = this._$AA.parentNode,
                e = this._$AM;
            return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t
        }
        get startNode() {
            return this._$AA
        }
        get endNode() {
            return this._$AB
        }
        _$AI(t, e = this) {
            t = A(this, t, e), T(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : kt(t) ? this.k(t) : this._(t)
        }
        O(t) {
            return this._$AA.parentNode.insertBefore(t, this._$AB)
        }
        T(t) {
            this._$AH !== t && (this._$AR(), this._$AH = this.O(t))
        }
        _(t) {
            this._$AH !== u && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t
        }
        $(t) {
            let {
                values: e,
                _$litType$: s
            } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(vt(s.h, s.h[0]), this.options)), s);
            if (this._$AH?._$AD === o) this._$AH.p(e);
            else {
                let i = new B(o, this),
                    n = i.u(this.options);
                i.p(e), this.T(n), this._$AH = i
            }
        }
        _$AC(t) {
            let e = pt.get(t.strings);
            return e === void 0 && pt.set(t.strings, e = new U(t)), e
        }
        k(t) {
            K(this._$AH) || (this._$AH = [], this._$AR());
            let e = this._$AH,
                s, o = 0;
            for (let i of t) o === e.length ? e.push(s = new r(this.O(P()), this.O(P()), this, this.options)) : s = e[o], s._$AI(i), o++;
            o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o)
        }
        _$AR(t = this._$AA.nextSibling, e) {
            for (this._$AP?.(!1, !0, e); t !== this._$AB;) {
                let s = nt(t).nextSibling;
                nt(t).remove(), t = s
            }
        }
        setConnected(t) {
            this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t))
        }
    },
    S = class {
        get tagName() {
            return this.element.tagName
        }
        get _$AU() {
            return this._$AM._$AU
        }
        constructor(t, e, s, o, i) {
            this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = u
        }
        _$AI(t, e = this, s, o) {
            let i = this.strings,
                n = !1;
            if (i === void 0) t = A(this, t, e, 0), n = !T(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
            else {
                let l = t,
                    a, d;
                for (t = i[0], a = 0; a < i.length - 1; a++) d = A(this, l[s + a], e, a), d === w && (d = this._$AH[a]), n ||= !T(d) || d !== this._$AH[a], d === u ? t = u : t !== u && (t += (d ?? "") + i[a + 1]), this._$AH[a] = d
            }
            n && !o && this.j(t)
        }
        j(t) {
            t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "")
        }
    },
    j = class extends S {
        constructor() {
            super(...arguments), this.type = 3
        }
        j(t) {
            this.element[this.name] = t === u ? void 0 : t
        }
    },
    W = class extends S {
        constructor() {
            super(...arguments), this.type = 4
        }
        j(t) {
            this.element.toggleAttribute(this.name, !!t && t !== u)
        }
    },
    q = class extends S {
        constructor(t, e, s, o, i) {
            super(t, e, s, o, i), this.type = 5
        }
        _$AI(t, e = this) {
            if ((t = A(this, t, e, 0) ?? u) === w) return;
            let s = this._$AH,
                o = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
                i = t !== u && (s === u || o);
            o && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t
        }
        handleEvent(t) {
            typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t)
        }
    },
    V = class {
        constructor(t, e, s) {
            this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s
        }
        get _$AU() {
            return this._$AM._$AU
        }
        _$AI(t) {
            A(this, t)
        }
    };
var Tt = G.litHtmlPolyfillSupport;
Tt?.(U, H), (G.litHtmlVersions ??= []).push("3.3.2");
var mt = (r, t, e) => {
    let s = e?.renderBefore ?? t,
        o = s._$litPart$;
    if (o === void 0) {
        let i = e?.renderBefore ?? null;
        s._$litPart$ = o = new H(t.insertBefore(P(), i), i, void 0, e ?? {})
    }
    return o._$AI(r), o
};
var Q = globalThis,
    _ = class extends m {
        constructor() {
            super(...arguments), this.renderOptions = {
                host: this
            }, this._$Do = void 0
        }
        createRenderRoot() {
            let t = super.createRenderRoot();
            return this.renderOptions.renderBefore ??= t.firstChild, t
        }
        update(t) {
    /**
     * Main Lit render function - generates the entire card template.
     * Called whenever component state changes (via Lit reactivity).
     * 
     * STRUCTURE:
     * 1. Card wrapper with header (title + market status dot)
     * 2. Tab navigation (Overview, Holdings, Charts, Summary)
     * 3. Tab content based on this._activeTab
     * 4. Each tab calls dedicated _render* method
     * 
     * TABS:
     * - Overview: Portfolio value, accounts with allocation bars
     * - Holdings: Ranked list of positions, expandable details
     * - Charts: Sector and Account allocation donut charts
     * - Summary: Detailed metrics, performance, cash, liabilities
     * 
     * @returns {TemplateResult} Lit template for entire card
     */
            let e = this.render();
            this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = mt(e, this.renderRoot, this.renderOptions)
        }
        connectedCallback() {
            super.connectedCallback(), this._$Do?.setConnected(!0)
        }
        disconnectedCallback() {
            super.disconnectedCallback(), this._$Do?.setConnected(!1)
        }
        render() {
            return w
        }
    };
_._$litElement$ = !0, _.finalized = !0, Q.litElementHydrateSupport?.({
    LitElement: _
});
var Ut = Q.litElementPolyfillSupport;
Ut?.({
    LitElement: _
});
(Q.litElementVersions ??= []).push("4.2.2");
/**
 * HA-GHOSTFOLIO-CARD: Main Custom Element Class
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CRITICAL: SECURITY TOKEN vs AUTHORIZATION TOKEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * HOME ASSISTANT CONFIG (what user provides):
 * ────────────────────────────────────────────
 * type: custom:ghostfolio-card
 * access_token: <GHOSTFOLIO SECURITY TOKEN>  ← This is a SECURITY TOKEN
 * 
 * HOW IT WORKS:
 * ─────────────
 * 1. User provides their Ghostfolio SECURITY TOKEN in "access_token" field
 * 2. This card sends it to: POST /api/v1/auth/anonymous
 *    Body: {accessToken: <security_token>}
 * 3. Ghostfolio responds with: {authToken: <authorization_token>}
 * 4. Card uses <authorization_token> for all subsequent API calls
 * 5. Authorization token cached to avoid repeated exchanges
 * 
 * SECURITY NOTES:
 * ───────────────
 * - Security Token → Authorization Token is ONE-WAY conversion
 * - Authorization tokens are short-lived (typically)
 * - Never store or log the Security Token
 * - Authorization token only used in Authorization header (Bearer token)
 * 
 * API REQUESTS (after token exchange):
 * Header: Authorization: Bearer <authToken>
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COMPONENT LIFECYCLE:
 * ────────────────────
 * 1. setConfig() - Called by HA, validates config and stores it
 * 2. connectedCallback() - Called when element added to DOM, triggers first load
 * 3. _fetchAll() - Orchestrates all API fetches (called on load + every 5 min)
 * 4. render() - Lit re-renders when state changes (data fetched, tabs clicked)
 * 
 * STATE PROPERTIES (this._*):
 * ──────────────────────────
 * Data State:
 *   - this._accounts[] - List of accounts
 *   - this._holdings[] - List of holdings
 *   - this._summary - Portfolio summary metrics
 * 
 * UI State:
 *   - this._activeTab - Current selected tab ("overview", "holdings", etc.)
 *   - this._expandedHolding - Symbol of expanded holding (or null)
 *   - this._expandedAccount - ID of expanded account (or null)
 * 
 * Loading State:
 *   - this._*Loading - Boolean flags for in-flight requests
 *   - this._*Error - Error messages if requests fail
 * 
 * Cache State:
 *   - this._authToken - Cached authorization token
 *   - this._lastFetch - Timestamp of last API fetch
 * 
 */
var X = class extends _ {
    static properties = {
        hass: {
            attribute: !1
        },
        config: {
            attribute: !1
        },
        _accounts: {
            state: !0
        },
        _accountsLoading: {
            state: !0
        },
        _accountsError: {
            state: !0
        },
        _holdings: {
            state: !0
        },
        _holdingsLoading: {
            state: !0
        },
        _holdingsError: {
            state: !0
        },
        _holdingsExpanded: {
            state: !0
        },
        _expandedHolding: {
            state: !0
        },
        _activeTab: {
            state: !0
        },
        _summary: {
            state: !0
        },
        _summaryLoading: {
            state: !0
        },
        _summaryError: {
            state: !0
        },
        _expandedAccount: {
            state: !0
        },
        _accountHoldings: {
            state: !0
        },
        _accountHoldingsLoading: {
            state: !0
        }
    };
    constructor() {
        super(), this._accounts = [], this._accountsLoading = !1, this._accountsError = null, this._holdings = [], this._holdingsLoading = !1, this._holdingsError = null, this._holdingsExpanded = !1, this._expandedHolding = null, this._activeTab = "overview", this._lastFetch = null, this._authToken = null, this._summary = null, this._summaryLoading = !1, this._summaryError = null, this._expandedAccount = null, this._accountHoldings = {}, this._accountHoldingsLoading = {}
    }
    static get styles() {
        return z`
      :host {
        --ghostfolio-accent-color: var(--primary-color, #3b82f6);
        --ghostfolio-positive-color: #10b981;
        --ghostfolio-negative-color: #ef4444;
        --ghostfolio-bg-primary: var(--card-background-color, #ffffff);
        --ghostfolio-bg-secondary: var(--secondary-background-color, #f3f4f6);
        --ghostfolio-text-primary: var(--primary-text-color, #1f2937);
        --ghostfolio-text-secondary: var(--secondary-text-color, #6b7280);
        --ghostfolio-border-color: var(--divider-color, #e5e7eb);
      }
      .card { background-color:var(--ghostfolio-bg-primary); border-radius:12px; padding:16px; box-shadow:0 1px 3px 0 rgba(0,0,0,0.1); }
      .header { display:flex; align-items:center; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid var(--ghostfolio-border-color); }
      .header-title { font-size:18px; font-weight:600; color:var(--ghostfolio-text-primary); margin:0; flex:1; }
      .header-icon { width:28px; height:28px; color:var(--ghostfolio-accent-color); }
      .tabs { display:flex; gap:4px; margin-bottom:16px; background:var(--ghostfolio-bg-secondary); border-radius:8px; padding:3px; }
      .tab { flex:1; padding:7px 0; text-align:center; font-size:13px; font-weight:500; color:var(--ghostfolio-text-secondary); border-radius:6px; cursor:pointer; transition:background 0.15s,color 0.15s; user-select:none; }
      .tab.active { background:var(--ghostfolio-bg-primary); color:var(--ghostfolio-text-primary); box-shadow:0 1px 3px rgba(0,0,0,0.08); }
      .metrics { display:flex; flex-direction:column; gap:8px; margin-bottom:20px; }
      .metric { display:flex; align-items:center; gap:12px; padding:12px; background-color:var(--ghostfolio-bg-secondary); border-radius:8px; border-left:3px solid var(--ghostfolio-accent-color); }
      .metric-label { font-size:12px; color:var(--ghostfolio-text-secondary); margin-bottom:6px; font-weight:500; text-transform:uppercase; letter-spacing:0.5px; }
      .metric-value { font-size:22px; font-weight:700; color:var(--ghostfolio-text-primary); }
      .metric-subtext { font-size:12px; color:var(--ghostfolio-text-secondary); margin-top:4px; }
      .metric-body { flex:1; min-width:0; }
      .metric-right { text-align:right; flex-shrink:0; }
      .metric-right-value { font-size:14px; font-weight:600; color:var(--ghostfolio-text-secondary); }
      .metric-right-label { font-size:11px; color:var(--ghostfolio-text-secondary); margin-top:2px; }
      .performance-positive { color:var(--ghostfolio-positive-color); }
      .performance-negative { color:var(--ghostfolio-negative-color); }
      .section-header { display:flex; align-items:center; border-top:1px solid var(--ghostfolio-border-color); padding-top:16px; margin-bottom:10px; }
      .section-header.clickable { cursor:pointer; user-select:none; }
      .section-header.clickable:hover .section-title { color:var(--ghostfolio-text-primary); }
      .section-title { font-size:13px; font-weight:600; color:var(--ghostfolio-text-secondary); text-transform:uppercase; letter-spacing:0.5px; flex:1; }
      .section-chevron { font-size:12px; color:var(--ghostfolio-text-secondary); transition:transform 0.2s ease; }
      .section-chevron.open { transform:rotate(180deg); }
      .accounts { display:flex; flex-direction:column; gap:8px; margin-bottom:4px; }
      .account-row { display:flex; align-items:center; padding:10px 12px; background-color:var(--ghostfolio-bg-secondary); border-radius:8px; gap:12px; }
      .account-color { width:4px; height:36px; border-radius:2px; flex-shrink:0; }
      .account-info { flex:1; min-width:0; }
      .account-name { font-size:13px; font-weight:600; color:var(--ghostfolio-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .account-platform { font-size:11px; color:var(--ghostfolio-text-secondary); margin-top:1px; }
      .account-bar-wrap { margin-top:6px; height:4px; background:var(--ghostfolio-border-color); border-radius:2px; overflow:hidden; }
      .account-bar { height:100%; border-radius:2px; transition:width 0.4s ease; }
      .account-value { font-size:15px; font-weight:700; color:var(--ghostfolio-text-primary); text-align:right; flex-shrink:0; }
      .holdings { display:flex; flex-direction:column; gap:6px; margin-bottom:4px; }
      .holding-row { padding:8px 12px; background-color:var(--ghostfolio-bg-secondary); border-radius:8px; cursor:pointer; transition:opacity 0.15s; }
      .holding-row:hover { opacity:.85; }
      .holding-top { display:flex; align-items:center; gap:10px; }
      .holding-rank { font-size:11px; color:var(--ghostfolio-text-secondary); width:20px; text-align:right; flex-shrink:0; }
      .holding-info { flex:1; min-width:0; }
      .holding-name { font-size:13px; font-weight:600; color:var(--ghostfolio-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .holding-symbol { font-size:11px; color:var(--ghostfolio-text-secondary); margin-top:1px; }
      .holding-right { text-align:right; flex-shrink:0; }
      .holding-value { font-size:13px; font-weight:700; color:var(--ghostfolio-text-primary); }
      .holding-alloc { font-size:11px; color:var(--ghostfolio-text-secondary); margin-top:1px; }
      .holding-detail { margin-top:10px; padding-top:10px; border-top:1px solid var(--ghostfolio-border-color); display:grid; grid-template-columns:auto 1fr auto; gap:5px 14px; align-items:baseline; }
      .detail-label { font-size:11px; color:var(--ghostfolio-text-secondary); font-weight:500; text-transform:uppercase; letter-spacing:0.4px; white-space:nowrap; }
      .detail-value { font-size:12px; color:var(--ghostfolio-text-primary); font-weight:600; }
      .detail-sub { font-size:11px; color:var(--ghostfolio-text-secondary); text-align:right; white-space:nowrap; }
      .detail-gain-positive { color:var(--ghostfolio-positive-color); font-weight:600; font-size:12px; }
      .detail-gain-negative { color:var(--ghostfolio-negative-color); font-weight:600; font-size:12px; }
      .charts-grid { display:flex; flex-direction:column; gap:24px; }
      .chart-block { display:flex; flex-direction:column; gap:12px; }
      .chart-title { font-size:13px; font-weight:600; color:var(--ghostfolio-text-secondary); text-transform:uppercase; letter-spacing:0.5px; }
      .donut-wrap { display:flex; gap:16px; align-items:center; }
      .donut-svg { flex-shrink:0; }
      .donut-legend { flex:1; display:flex; flex-direction:column; gap:6px; min-width:0; }
      .legend-row { display:flex; align-items:center; gap:8px; min-width:0; }
      .legend-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
      .legend-label { font-size:12px; color:var(--ghostfolio-text-primary); flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .legend-pct { font-size:12px; font-weight:600; color:var(--ghostfolio-text-secondary); flex-shrink:0; }
      .loading { color:var(--ghostfolio-text-secondary); font-size:14px; padding:20px; text-align:center; }
      .error { color:var(--ghostfolio-negative-color); font-size:13px; padding:10px 12px; background:var(--ghostfolio-bg-secondary); border-radius:8px; border-left:3px solid var(--ghostfolio-negative-color); }
      .section-loading { font-size:12px; color:var(--ghostfolio-text-secondary); text-align:center; padding:12px 0 4px; }
      .summary-table { display:flex; flex-direction:column; gap:0; }
      .summary-group { margin-bottom:14px; }
      .summary-group-title { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--ghostfolio-text-secondary); padding:0 0 6px 0; border-bottom:1px solid var(--ghostfolio-border-color); margin-bottom:4px; }
      .summary-row { display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-radius:6px; transition:background 0.1s; }
      .summary-row:hover { background:var(--ghostfolio-bg-secondary); }
      .summary-row.total-row { background:var(--ghostfolio-bg-secondary); border-left:3px solid var(--ghostfolio-accent-color); font-weight:600; margin-top:4px; }
      .summary-row-label { font-size:13px; color:var(--ghostfolio-text-secondary); }
      .summary-row.total-row .summary-row-label { color:var(--ghostfolio-text-primary); font-weight:600; }
      .summary-row-value { font-size:13px; font-weight:600; color:var(--ghostfolio-text-primary); text-align:right; }
      .summary-row.total-row .summary-row-value { font-size:15px; }
      .account-holdings { display:flex; flex-direction:column; gap:4px; margin-top:8px; padding-top:8px; border-top:1px solid var(--ghostfolio-border-color); }
      .account-holding-row { display:flex; align-items:center; justify-content:space-between; padding:4px 8px; border-radius:4px; }
      .account-holding-row:hover { background:var(--ghostfolio-bg-primary); }
      .account-holding-symbol { font-size:12px; font-weight:600; color:var(--ghostfolio-text-primary); width:60px; flex-shrink:0; }
      .account-holding-name { font-size:11px; color:var(--ghostfolio-text-secondary); flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:0 8px; }
      .account-holding-value { font-size:12px; font-weight:600; color:var(--ghostfolio-text-primary); text-align:right; flex-shrink:0; }
      .account-row { cursor:pointer; }
      .account-chevron { font-size:11px; color:var(--ghostfolio-text-secondary); transition:transform 0.2s; margin-left:6px; }
      .account-chevron.open { transform:rotate(180deg); }
    `
    }
    /**
     * Sets the card configuration from Home Assistant dashboard YAML.
     * Validates required fields: ghostfolio_url and access_token.
     * Merges user config with defaults.
     * 
     * NOTE: The "access_token" field in configuration is actually a
     * Ghostfolio SECURITY TOKEN. This method will exchange it for an
     * Authorization Token via _getAuthToken().
     * 
     * @param {Object} t - Configuration object from Home Assistant
     * @param {string} t.ghostfolio_url - Base URL of Ghostfolio instance (REQUIRED)
     * @param {string} t.access_token - Ghostfolio Security Token (REQUIRED)
     * @param {string} [t.title="Portfolio"] - Card title
     * @param {boolean} [t.show_performance=true] - Show performance section
     * @param {boolean} [t.show_investment=true] - Show investment details
     * @param {boolean} [t.show_accounts=true] - Show accounts breakdown
     * @param {boolean} [t.show_holdings=true] - Show holdings list (REQUIRED)
     * @param {string} [t.currency_format="USD"] - Currency code (USD, EUR, etc.)
     * @param {number} [t.decimal_places=2] - Decimal places for display
     * @throws {Error} If access_token or ghostfolio_url missing
     */
    setConfig(t) {
        if (!t) throw new Error("Invalid configuration");
        if (!t.access_token) throw new Error("ghostfolio_card: access_token is required");
        if (!t.ghostfolio_url) throw new Error("ghostfolio_card: ghostfolio_url is required");
        this.config = {
            show_performance: !0,
            show_investment: !0,
            show_accounts: !0,
            show_holdings: !0,
            currency_format: "USD",
            decimal_places: 2,
            ...t,
            ghostfolio_url: t.ghostfolio_url.replace(/\/$/, "")
        }
    }
    connectedCallback() {
        super.connectedCallback(), this._fetchAll()
    }
    updated(t) {
        t.has("config") && this.config && (this._lastFetch = null, this._authToken = null, this._fetchAll())
    }
    /**
     * Exchanges Ghostfolio Security Token for Authorization Bearer Token.
     * 
     * CRITICAL FLOW:
     * 1. Takes the Security Token from config.access_token
     * 2. POSTs to /api/v1/auth/anonymous with {accessToken: securityToken}
     * 3. Ghostfolio responds with {authToken: "..."}
     * 4. Cache token in this._authToken to avoid repeated calls
     * 5. Return token for use in all subsequent API requests
     * 
     * The Authorization token is added to all API requests as:
     * Headers: Authorization: Bearer <authToken>
     * 
     * @async
     * @returns {Promise<string>} Authorization Bearer token for API requests
     * @throws {Error} If authentication fails or token generation fails
     * @see https://ghostfolio.io/docs/api
     */
    async _getAuthToken() {
        if (this._authToken) return this._authToken;
        // STEP 1: Exchange Security Token for Authorization Token
        // Send Security Token to Ghostfolio's anonymous auth endpoint
        // It returns authToken that we use for all subsequent API calls
        let t = await fetch(`${this.config.ghostfolio_url}/api/v1/auth/anonymous`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accessToken: this.config.access_token
            })
        });
        if (!t.ok) throw new Error(`Auth failed: ${t.status} ${t.statusText}`);
        let e = await t.json();
        if (!e.authToken) throw new Error("Auth response missing authToken");
        return this._authToken = e.authToken, this._authToken
    }
    /**
     * Main data refresh orchestrator called on first load and every 5 minutes.
     * 
     * CACHING LOGIC:
     * - If last fetch was < 300 seconds (5 min) ago, skip API calls
     * - Otherwise, get fresh auth token and fetch all data in parallel
     * - On auth failure, set error messages for all sections
     * 
     * PARALLEL FETCHES (via Promise.all):
     * - _fetchAccounts(): Account list with values
     * - _fetchHoldings(): All holdings/positions
     * - _fetchSummary(): Portfolio metrics
     * 
     * @async
     * @returns {Promise<void>}
     * @fires Promise.all - Executes all three fetches concurrently
     * @sets {number} this._lastFetch - Timestamp of fetch
     * @throws Errors caught and stored in this._*Error properties
     */
    async _fetchAll() {
        if (!this.config?.access_token || !this.config?.ghostfolio_url) return;
        let t = Date.now();
        // Cache check: Skip API calls if last fetch was < 300 seconds (5 minutes) ago
        // This reduces API load and improves performance
        if (this._lastFetch && t - this._lastFetch < 300 * 1e3) return;
        let e;
        try {
            e = await this._getAuthToken()
        } catch (s) {
            this._accountsError = s.message, this._holdingsError = s.message, this._summaryError = s.message;
            return
        }
        this._lastFetch = t, // Fetch all three data types in PARALLEL (not sequential)
        // Promise.all waits for all to complete, improving load time
        await Promise.all([this._fetchAccounts(e), this._fetchHoldings(e), this._fetchSummary(e)])
    }
    /**
     * Fetches portfolio performance metrics and summary details.
     * Called by _fetchAll in parallel with accounts/holdings.
     * 
     * API CALLS (parallel):
     * 1. /api/v2/portfolio/performance?range=max
     *    - Returns: currentNetWorth, netPerformance, netPerformancePercentage
     * 2. /api/v1/portfolio/details
     *    - Returns: summary object with portfolio stats
     * 
     * MERGING LOGIC:
     * Tries both response formats (v1 and v2), falls back gracefully.
     * Extracts key metrics needed for Summary tab display.
     * 
     * @async
     * @param {string} t - Authorization Bearer token
     * @returns {Promise<void>}
     * @sets {Object} this._summary - Merged summary data
     * @sets {boolean} this._summaryLoading - Loading state
     * @sets {string|null} this._summaryError - Error message if failed
     */
    async _fetchSummary(t) {
        this._summaryLoading = !0, this._summaryError = null;
        try {
            const [perfRes, detailsRes] = await Promise.all([fetch(`${this.config.ghostfolio_url}/api/v2/portfolio/performance?range=max`, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            }), fetch(`${this.config.ghostfolio_url}/api/v1/portfolio/details`, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            })]);
            if (!perfRes.ok) throw new Error(`performance API returned ${perfRes.status} ${perfRes.statusText}`);
            if (!detailsRes.ok) throw new Error(`details API returned ${detailsRes.status} ${detailsRes.statusText}`);
            const perfJson = await perfRes.json();
            const detailsJson = await detailsRes.json();
            const perf = perfJson.performance ?? perfJson;
            const sum = detailsJson.summary ?? {};
            this._summary = {
                ...sum,
                currentNetWorth: perf.currentNetWorth ?? null,
                netPerformance: sum.netPerformance ?? perf.netPerformance ?? null,
                netPerformancePercentage: sum.netPerformancePercentage ?? perf.netPerformancePercentage ?? null
            }
        } catch (e) {
            console.error("HA-Ghostfolio-Card: summary fetch failed", e), this._summaryError = e.message
        } finally {
            this._summaryLoading = !1
        }
    }
    /**
     * Fetches list of all investment accounts from Ghostfolio.
     * Called by _fetchAll as part of parallel fetch chain.
     * 
     * API ENDPOINT: /api/v1/account
     * Returns: Array of accounts with names, values, platforms, currencies
     * 
     * FILTERING & SORTING:
     * - Filters out accounts with value <= 0 (empty/closed)
     * - Sorts by value (highest first) for display priority
     * 
     * Used by:
     * - Overview tab: Shows account breakdown with colored allocation bars
     * - Account detail expansion: Click account to see holdings in it
     * 
     * @async
     * @param {string} t - Authorization Bearer token
     * @returns {Promise<void>}
     * @sets {Array<Object>} this._accounts - Sorted account list
     * @sets {boolean} this._accountsLoading - Loading state
     * @sets {string|null} this._accountsError - Error message if failed
     */
    async _fetchAccounts(t) {
        this._accountsLoading = !0, this._accountsError = null;
        try {
            let e = await fetch(`${this.config.ghostfolio_url}/api/v1/account`, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            });
            if (!e.ok) throw new Error(`API returned ${e.status} ${e.statusText}`);
            let s = await e.json(),
                o = s.accounts ?? s ?? [];
            // Filter: Only include accounts with positive values
        // Excludes empty or closed accounts
        this._accounts = o.filter(i => i.value != null && i.value > 0).sort((i, n) => (n.value ?? 0) - (i.value ?? 0))
        } catch (e) {
            console.error("HA-Ghostfolio-Card: accounts fetch failed", e), this._accountsError = e.message
        } finally {
            this._accountsLoading = !1
        }
    }
    /**
     * Fetches all portfolio holdings (individual positions/securities).
     * Called by _fetchAll as part of parallel fetch chain.
     * 
     * API ENDPOINT: /api/v1/portfolio/holdings
     * Returns: Object with holdings keyed by symbol/ID
     *   Each holding includes: name, symbol, value, cost, gain, sector, etc.
     * 
     * FILTERING & SORTING:
     * - Filters out holdings with value <= 0 (sold positions)
     * - Sorts by value (highest first) for ranking display
     * - Rank used in Holdings tab (#1, #2, etc.)
     * 
     * Used by:
     * - Holdings tab: Clickable list of all positions
     * - Charts tab: Sector and asset allocation calculations
     * - Overview tab: Account holdings when expanded
     * 
     * @async
     * @param {string} t - Authorization Bearer token
     * @returns {Promise<void>}
     * @sets {Array<Object>} this._holdings - Sorted holdings array
     * @sets {boolean} this._holdingsLoading - Loading state
     * @sets {string|null} this._holdingsError - Error message if failed
     */
    async _fetchHoldings(t) {
        this._holdingsLoading = !0, this._holdingsError = null;
        try {
            let e = await fetch(`${this.config.ghostfolio_url}/api/v1/portfolio/holdings`, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            });
            if (!e.ok) throw new Error(`API returned ${e.status} ${e.statusText}`);
            let s = await e.json(),
                o = s.holdings ?? s ?? {};
            this._holdings = Object.values(o).filter(i => i.valueInBaseCurrency != null && i.valueInBaseCurrency > 0).sort((i, n) => (n.valueInBaseCurrency ?? 0) - (i.valueInBaseCurrency ?? 0))
        } catch (e) {
            console.error("HA-Ghostfolio-Card: holdings fetch failed", e), this._holdingsError = e.message
        } finally {
            this._holdingsLoading = !1
        }
    }
    /**
     * Toggles expansion state of a holding detail panel.
     * Called when user clicks a holding row in Holdings tab.
     * 
     * EXPANSION BEHAVIOR:
     * - First click: Expand (show details panel below holding)
     * - Second click: Collapse
     * - Details include: price, gain/loss, cost basis, sector, dividends
     * 
     * @param {string} t - Security symbol (e.g., "AAPL", "VTI")
     * @sets {string|null} this._expandedHolding - Current expanded symbol or null
     */
    _toggleHolding(t) {
        // Toggle: If same holding clicked again, collapse it. Otherwise expand clicked holding.
        this._expandedHolding = this._expandedHolding === t ? null : t
    }
    /**
     * Toggles expansion state of an account row in Overview tab.
     * Called when user clicks an account.
     * 
     * EXPANSION BEHAVIOR:
     * - First click: Expand and fetch account-specific holdings
     * - Fetched holdings shown as sub-list under account
     * - Second click: Collapse
     * 
     * LAZY LOADING:
     * Account holdings are only fetched when account is expanded.
     * Results cached in this._accountHoldings to avoid repeat API calls.
     * 
     * @param {string} t - Account ID to toggle
     * @sets {string|null} this._expandedAccount - Current expanded account ID or null
     * @calls {_fetchAccountHoldings} If account is expanded and data not cached
     */
    _toggleAccount(t) {
        this._expandedAccount = this._expandedAccount === t ? null : t;
        // Only fetch holdings if:
        // 1. This account was just expanded
        // 2. We haven't already fetched them (not in cache)
        // 3. We're not already loading them (prevent duplicate requests)
        if (this._expandedAccount === t && !(t in this._accountHoldings) && !this._accountHoldingsLoading[t]) {
            this._fetchAccountHoldings(t)
        }
    }
    /**
     * Fetches holdings for a specific account (filtered by account ID).
     * Called when user expands an account in Overview tab.
     * Results cached to avoid repeat fetches.
     * 
     * API ENDPOINT: /api/v1/portfolio/holdings?accounts=<accountId>
     * Filters Ghostfolio holdings to only those in specified account.
     * 
     * CACHING:
     * Once fetched, holdings stored in this._accountHoldings[accountId]
     * Subsequent expansions of same account use cached data.
     * 
     * LOADING STATE:
     * Uses this._accountHoldingsLoading to track in-flight requests
     * UI shows spinner while loading, then displays holdings.
     * 
     * @async
     * @param {string} t - Account ID to fetch holdings for
     * @returns {Promise<void>}
     * @sets {Object} this._accountHoldings[accountId] - Array of holdings
     * @sets {Object} this._accountHoldingsLoading[accountId] - Boolean state
     */
    async _fetchAccountHoldings(t) {
        this._accountHoldingsLoading = {
            ...this._accountHoldingsLoading,
            [t]: !0
        };
        try {
            const e = await this._getAuthToken();
            const r = await fetch(`${this.config.ghostfolio_url}/api/v1/portfolio/holdings?accounts=${t}`, {
                headers: {
                    Authorization: `Bearer ${e}`
                }
            });
            if (!r.ok) throw new Error(`API returned ${r.status}`);
            const d = await r.json();
            const holdings = Object.values(d.holdings ?? d ?? {}).filter(h => h.valueInBaseCurrency != null && h.valueInBaseCurrency > 0).sort((a, b) => (b.valueInBaseCurrency ?? 0) - (a.valueInBaseCurrency ?? 0));
            this._accountHoldings = {
                ...this._accountHoldings,
                [t]: holdings
            }
        } catch (e) {
            console.error("HA-Ghostfolio-Card: account holdings fetch failed", e);
            this._accountHoldings = {
                ...this._accountHoldings,
                [t]: []
            };
        } finally {
            const l = {
                ...this._accountHoldingsLoading
            };
            delete l[t];
            this._accountHoldingsLoading = l
        }
    }
    /**
     * Processes holdings to create sector allocation breakdown for charting.
     * Called by render to generate data for Sector Allocation donut chart.
     * 
     * CLASSIFICATION LOGIC:
     * 1. ETFs and Mutual Funds → Grouped as "Diversified"
     *    (Reason: can't meaningfully show sector for diversified funds)
     * 2. Individual stocks → Use primary sector from Ghostfolio data
     * 3. Unknown → "Other" category
     * 
     * CALCULATION:
     * 1. Sum holdings value by sector classification
     * 2. Calculate total portfolio value
     * 3. Compute percentage for each sector
     * 4. Sort by value (highest first)
     * 
     * @returns {Array<Object>} Array of {name, value, pct, color}
     *          Ready for _renderDonut() chart function
     */
    _getSectorData() {
        let t = ["ETF", "MUTUALFUND"],
            e = {};
        for (let o of this._holdings) {
            let n = t.includes(o.assetSubClass?.toUpperCase()) ? "Diversified" : o.sectors?.[0]?.name ?? "Other";
            e[n] = (e[n] ?? 0) + (o.valueInBaseCurrency ?? 0)
        }
        let s = Object.values(e).reduce((o, i) => o + i, 0);
        return Object.entries(e).map(([o, i]) => ({
            name: o,
            value: i,
            pct: s > 0 ? i / s : 0
        })).sort((o, i) => i.value - o.value)
    }
    /**
     * Processes accounts to create account allocation breakdown for charting.
     * Called by render to generate data for Account Allocation donut chart.
     * 
     * CALCULATION:
     * 1. Sum total portfolio value from all accounts
     * 2. Calculate each account as % of total
     * 3. Sort by value (already sorted in this._accounts)
     * 
     * @returns {Array<Object>} Array of {name, value, pct, color}
     *          Ready for _renderDonut() chart function
     */
    _getAccountData() {
        let t = this._accounts.reduce((e, s) => e + (s.value ?? 0), 0);
        return this._accounts.map(e => ({
            name: e.name,
            value: e.value ?? 0,
            pct: t > 0 ? (e.value ?? 0) / t : 0
        }))
    }
    /**
     * Renders a donut/ring chart as SVG with color segments.
     * Used for Sector and Account allocation charts.
     * 
     * SVG RING CHART TECHNIQUE:
     * - Full circle circumference = 2π × radius
     * - Each segment created with stroke-dasharray:
     *   stroke-dasharray="<colored length> <gap length>"
     * - stroke-dashoffset rotates where each arc starts
     * - Renders as circular ring of colored segments
     * 
     * PARAMETERS:
     * - t: Data array with {name, value, pct, color}
     * - e: SVG viewBox size (120×120 px by default)
     * - s: Ring stroke-width (22 px creates thick donut)
     * 
     * RENDERING:
     * Multiple <circle> elements stacked on each other
     * Each draws its segment offset to create full ring
     * 
     * @param {Array<Object>} t - Chart data with pct and color
     * @param {number} [e=120] - SVG size
     * @param {number} [s=22] - Ring thickness
     * @returns {TemplateResult} Lit template with SVG element
     */
    _renderDonut(t, e = 120, s = 22) {
        let o = (e - s) / 2,
            i = e / 2,
            n = e / 2,
            l = 2 * Math.PI * o,
            a = .012,
            d = [],
            p = 0;
        for (let c of t) {
            let f = Math.max(0, c.pct - a) * l,
                v = l - f,
                _t = l * .25 - p * l;
            d.push({
                seg: c,
                dash: f,
                space: v,
                dashOffset: _t
            }), p += c.pct
        }
        return h`
      <svg width="${e}" height="${e}" viewBox="0 0 ${e} ${e}" style="flex-shrink:0" xmlns="http://www.w3.org/2000/svg">
        ${Z`
          <circle cx="${i}" cy="${n}" r="${o}" fill="none" stroke="#888" stroke-opacity="0.2" stroke-width="${s}"/>
          ${d.map(({seg:c,dash:g,space:f,dashOffset:v})=>Z`
            <circle cx="${i}" cy="${n}" r="${o}" fill="none" stroke="${c.color}" stroke-width="${s}" stroke-dasharray="${g} ${f}" stroke-dashoffset="${v}"/>
          `)
}
`}
      </svg>
    `
}
/**
     * Renders expanded detail panel for a single holding.
     * Shown when user clicks a holding in Holdings tab.
     * 
     * DISPLAYED METRICS:
     * - Current Price: Market price per unit
     * - Gain/Loss: Dollar amount and percentage
     * - Cost Basis: Total investment and cost per unit
     * - Sector: Security's sector classification
     * - Dividends: Total dividends received (if > 0)
     * 
     * COLOR CODING:
     * - Positive gain: Green (--ghostfolio-positive-color)
     * - Negative loss: Red (--ghostfolio-negative-color)
     * 
     * @param {Object} t - Holding object from Ghostfolio API
     * @param {number} t.marketPrice - Current price per unit
     * @param {number} t.netPerformance - Dollar gain/loss
     * @param {number} t.netPerformancePercent - Percentage gain/loss
     * @param {number} t.investment - Total cost basis
     * @param {number} t.quantity - Number of units owned
     * @param {string} t.symbol - Security symbol
     * @param {Object} t.sectors - Sector info array
     * @param {number} [t.dividend] - Total dividends received
     * @returns {TemplateResult} Lit template with detail grid
     */_renderHoldingDetail(t) {
    let e = t.netPerformance ?? 0,
        s = (t.netPerformancePercent ?? 0) * 100,
        o = e >= 0 ? "detail-gain-positive" : "detail-gain-negative",
        i = e >= 0 ? "+" : "",
        n = t.quantity > 0 ? (t.investment ?? 0) / t.quantity : 0,
        a = ["ETF", "MUTUALFUND"].includes(t.assetSubClass?.toUpperCase()) ? "Diversified" : t.sectors?.[0]?.name ?? "—";
    const div = t.dividend ?? null;
    return h`
      <div class="holding-detail">
        <span class="detail-label">Price</span><span class="detail-value">${this._formatCurrency(String(t.marketPrice??0))}</span><span class="detail-sub"></span>
        <span class="detail-label">Gain</span><span class="${o}">${i}${this._formatCurrency(String(e))}</span><span class="detail-sub ${o}">${i}${s.toFixed(2)}%</span>
        <span class="detail-label">Cost</span><span class="detail-value">${this._formatCurrency(String(t.investment??0))}</span><span class="detail-sub">${t.quantity?.toFixed(3)} @ ${this._formatCurrency(String(n))}</span>
        <span class="detail-label">Sector</span><span class="detail-value">${a}</span><span class="detail-sub"></span>
        ${div!=null&&div>0?h`<span class="detail-label">Dividends</span><span class="detail-value" style="color:var(--ghostfolio-positive-color)">${this._formatCurrency(String(div))}</span><span class="detail-sub">received</span>`:""}
      </div>
    `
}
_renderOverview(t, e, s, o, i, n, l) {
    let a = this._accounts.length ? Math.max(...this._accounts.map(d => d.value ?? 0)) : 1;
    let gainVsCostPct = (e != null && o != null && parseFloat(o) > 0) ? ((parseFloat(e) / parseFloat(o)) * 100).toFixed(1) + "%" : null;
    let totalReturnPct = (t != null && o != null && parseFloat(o) > 0) ? (((parseFloat(t) - parseFloat(o)) / parseFloat(o)) * 100).toFixed(1) + "%" : null;
    return h`
      ${i?h`
        <div class="metrics">
          <div class="metric">
            <div class="metric-body">
              <div class="metric-label">💰 Current Value</div>
              <div class="metric-value">${this._formatCurrencyWhole(t)}</div>
            </div>
          </div>
          ${this.config.show_performance&&e?h`
            <div class="metric">
              <div class="metric-body">
                <div class="metric-label">📈 Net Performance</div>
                <div class="metric-value ${n}">${this._formatPerformanceWhole(e)}</div>
                <div class="metric-subtext ${n}">${this._formatPercentage(s)}</div>
              </div>
              ${gainVsCostPct?h`<div class="metric-right"><div class="metric-right-value">${gainVsCostPct}</div><div class="metric-right-label">vs cost</div></div>`:""}
            </div>
          `:""}
          ${this.config.show_investment&&o?h`
            <div class="metric">
              <div class="metric-body">
                <div class="metric-label">📊 Total Invested</div>
                <div class="metric-value">${this._formatCurrencyWhole(o)}</div>
              </div>
              ${totalReturnPct?h`<div class="metric-right"><div class="metric-right-value">${totalReturnPct}</div><div class="metric-right-label">total return</div></div>`:""}
            </div>
          `:""}
        </div>
      `:h`<div class="loading">Waiting for sensor data...</div>`}
      ${this.config.show_accounts!==!1?h`
        <div class="section-header"><span class="section-title">Accounts</span></div>
        ${this._accountsLoading?h`<div class="section-loading">Loading accounts…</div>`:this._accountsError?h`<div class="error">⚠️ ${this._accountsError}</div>`:this._accounts.length===0?h`<div class="section-loading">No accounts found</div>`:h`
          <div class="accounts">
            ${this._accounts.map((d,p)=>{let c=l[p%l.length],g=a>0?(d.value??0)/a*100:0;const isExpanded=this._expandedAccount===d.id;const acctHoldings=this._accountHoldings[d.id];const acctLoading=!!this._accountHoldingsLoading[d.id];return h`
              <div class="account-row" @click=${()=>this._toggleAccount(d.id)}>
                <div class="account-color" style="background:${c}"></div>
                <div class="account-info">
                  <div class="account-name">${d.name}</div>
                  <div class="account-platform">${d.platform?.name??d.currency??""}</div>
                  <div class="account-bar-wrap"><div class="account-bar" style="width:${g}%;background:${c}"></div></div>
                  ${isExpanded?h`
                    <div class="account-holdings">
                      ${acctLoading?h`<div class="section-loading" style="padding:8px 0">Loading…</div>`:acctHoldings&&acctHoldings.length>0?acctHoldings.map(h2=>h`
                        <div class="account-holding-row">
                          <span class="account-holding-symbol">${h2.symbol}</span>
                          <span class="account-holding-name">${h2.name??""}</span>
                          <span class="account-holding-value">${this._formatCurrency(String(h2.valueInBaseCurrency??0))}</span>
                        </div>
                      `):h`<div class="section-loading" style="padding:8px 0">No holdings</div>`}
                    </div>
                  `:""}
                </div>
                <div style="display:flex;align-items:flex-start;gap:4px;flex-shrink:0">
                  <div class="account-value">${this._formatCurrency(String(d.value??0))}</div>
                  <span class="account-chevron ${isExpanded?"open":""}">▾</span>
                </div>
              </div>
            `})}
          </div>
        `}
      `:""}
    `
}
_renderHoldings() {
    return this._holdingsLoading ? h`<div class="section-loading">Loading holdings…</div>` : this._holdingsError ? h`<div class="error">⚠️ ${this._holdingsError}</div>` : this._holdings.length === 0 ? h`<div class="section-loading">No holdings found</div>` : h`
      <div class="holdings">
        ${this._holdings.map((t,e)=>{let s=this._expandedHolding===t.symbol,i=["ETF","MUTUALFUND"].includes(t.assetSubClass?.toUpperCase())?"Diversified":t.sectors?.[0]?.name??"",n=[t.symbol,t.assetSubClass,i].filter(Boolean).join(" · ");return h`
          <div class="holding-row" @click=${()=>this._toggleHolding(t.symbol)}>
            <div class="holding-top">
              <div class="holding-rank">${e+1}</div>
              <div class="holding-info">
                <div class="holding-name">${t.name??t.symbol}</div>
                <div class="holding-symbol">${n}</div>
              </div>
              <div class="holding-right">
                <div class="holding-value">${this._formatCurrency(String(t.valueInBaseCurrency??0))}</div>
                <div class="holding-alloc">${t.allocationInPercentage!=null?(t.allocationInPercentage*100).toFixed(1)+"%":""}</div>
              </div>
            </div>
            ${s?this._renderHoldingDetail(t):""}
          </div>
        `})}
      </div>
    `
}
_renderCharts(t) {
    let e = this._getSectorData(),
        s = this._getAccountData(),
        o = e.map((l, a) => ({
            ...l,
            color: t[a % t.length]
        })),
        i = s.map((l, a) => ({
            ...l,
            color: t[a % t.length]
        }));
    return this._holdingsLoading || this._accountsLoading ? h`<div class="section-loading">Loading chart data…</div>` : h`
      <div class="charts-grid">
        <div class="chart-block">
          <div class="chart-title">Sector Allocation</div>
          ${e.length===0?h`<div class="section-loading">No sector data</div>`:h`
            <div class="donut-wrap">
              ${this._renderDonut(o)}
              <div class="donut-legend">
                ${o.map(l=>h`<div class="legend-row"><div class="legend-dot" style="background:${l.color}"></div><span class="legend-label">${l.name}</span><span class="legend-pct">${(l.pct*100).toFixed(1)}%</span></div>`)}
              </div>
            </div>
          `}
        </div>
        <div class="chart-block">
          <div class="chart-title">Account Allocation</div>
          ${s.length===0?h`<div class="section-loading">No account data</div>`:h`
            <div class="donut-wrap">
              ${this._renderDonut(i)}
              <div class="donut-legend">
                ${i.map(l=>h`<div class="legend-row"><div class="legend-dot" style="background:${l.color}"></div><span class="legend-label">${l.name}</span><span class="legend-pct">${(l.pct*100).toFixed(1)}%</span></div>`)}
              </div>
            </div>
          `}
        </div>
      </div>
    `
}
_renderSummary() {
    if (this._summaryLoading) return h`<div class="section-loading">Loading summary…</div>`;
    if (this._summaryError) return h`<div class="error">⚠️ ${this._summaryError}</div>`;
    if (!this._summary) return h`<div class="section-loading">No summary data</div>`;
    const s = this._summary;
    const totalValue = s.currentValueInBaseCurrency ?? null;
    const netWorth = s.totalValueInBaseCurrency ?? s.currentNetWorth ?? null;
    const cash = s.emergencyFund?.cash ?? s.emergencyFund?.total ?? null;
    const netPerf = s.netPerformance ?? null;
    const netPerfPct = s.netPerformancePercentage != null ? s.netPerformancePercentage * 100 : null;
    const cagr = s.annualizedPerformancePercent != null ? s.annualizedPerformancePercent * 100 : null;
    const investment = s.totalInvestment ?? null;
    const dividend = s.dividendInBaseCurrency ?? null;
    const perfClass = netPerf != null && netPerf >= 0 ? "performance-positive" : "performance-negative";
    return h`
      <div class="summary-table">
        <div class="summary-group">
          <div class="summary-group-title">Performance</div>
          <div class="summary-row total-row">
            <span class="summary-row-label">Net Performance</span>
            <span class="summary-row-value ${perfClass}">${netPerf!=null?(netPerf>=0?"+":"")+this._formatCurrencyWhole(String(netPerf)):"—"}</span>
          </div>
          <div class="summary-row">
            <span class="summary-row-label">Return (ROAi)</span>
            <span class="summary-row-value ${perfClass}">${netPerfPct!=null?(netPerfPct>=0?"+":"")+netPerfPct.toFixed(2)+"%":"—"}</span>
          </div>
          <div class="summary-row">
            <span class="summary-row-label">CAGR ℹ️</span>
            <span class="summary-row-value ${cagr!=null&&cagr>=0?"performance-positive":"performance-negative"}">${cagr!=null?(cagr>=0?"+":"")+cagr.toFixed(2)+"%":"—"}</span>
          </div>
        </div>
        <div class="summary-group">
          <div class="summary-group-title">Portfolio</div>
          <div class="summary-row total-row">
            <span class="summary-row-label">Total Value</span>
            <span class="summary-row-value">${totalValue!=null?this._formatCurrencyWhole(String(totalValue)):"—"}</span>
          </div>
          <div class="summary-row">
            <span class="summary-row-label">Total Invested</span>
            <span class="summary-row-value">${investment!=null?this._formatCurrencyWhole(String(investment)):"—"}</span>
          </div>
          <div class="summary-row">
            <span class="summary-row-label">Cash / Emergency Fund</span>
            <span class="summary-row-value">${cash!=null?this._formatCurrencyWhole(String(cash)):"—"}</span>
          </div>
          <div class="summary-row">
            <span class="summary-row-label">Dividends Received</span>
            <span class="summary-row-value">${dividend!=null?this._formatCurrencyWhole(String(dividend)):"—"}</span>
          </div>
          <div class="summary-row total-row">
            <span class="summary-row-label">Net Worth</span>
            <span class="summary-row-value">${netWorth!=null?this._formatCurrencyWhole(String(netWorth)):"—"}</span>
          </div>
        </div>
      </div>
    `
}
render() {
    if (!this.config) return h`<div class="error">Card not configured</div>`;
    if (!this.hass) return h`<div class="loading">Waiting for Home Assistant...</div>`;
    let t = this.config.title || "Portfolio",
        marketStatus = this.hass.states["binary_sensor.ghostfolio_portfolio_us_market"],
        marketOpen = marketStatus ? marketStatus.state === "on" : null,
        e = this.hass.states["sensor.ghostfolio_portfolio_portfolio_value"],
        s = this.hass.states["sensor.ghostfolio_portfolio_portfolio_gain"],
        o = this.hass.states["sensor.ghostfolio_portfolio_simple_gain_2"],
        i = this.hass.states["sensor.ghostfolio_portfolio_portfolio_cost"],
        n = e ? String(e.state) : null,
        l = s ? String(s.state) : null,
        a = o ? String(o.state) : null,
        d = i ? String(i.state) : null,
        p = n && n !== "unknown" && n !== "unavailable",
        c = l ? parseFloat(l) : null,
        f = c !== null && c >= 0 ? "performance-positive" : "performance-negative",
        v = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#f97316", "#ec4899", "#14b8a6", "#a855f7", "#84cc16", "#fb7185"];
    return h`
      <div class="card">
        <div class="header">
          <h2 class="header-title">${t}</h2>
          <div style="display:flex;gap:8px;align-items:center">
            ${marketOpen!==null?h`<div style="width:12px;height:12px;border-radius:50%;background:${marketOpen?"#10b981":"#888780"};cursor:help" title="${marketOpen?"US Market is Open":"US Market is Closed"}"></div>`:h``}
            <svg class="header-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 17.01l1.5 1.48z"/></svg>
          </div>
        </div>
        <div class="tabs">
          <div class="tab ${this._activeTab==="overview"?"active":""}" @click=${()=>{this._activeTab="overview"}}>Overview</div>
          <div class="tab ${this._activeTab==="holdings"?"active":""}" @click=${()=>{this._activeTab="holdings"}}>Holdings</div>
          <div class="tab ${this._activeTab==="charts"?"active":""}" @click=${()=>{this._activeTab="charts"}}>Charts</div>
          <div class="tab ${this._activeTab==="summary"?"active":""}" @click=${()=>{this._activeTab="summary"}}>Summary</div>
        </div>
        ${this._activeTab==="overview"?this._renderOverview(n,l,a,d,p,f,v):this._activeTab==="holdings"?this._renderHoldings():this._activeTab==="charts"?this._renderCharts(v):this._renderSummary()}
      </div>
    `
}
_formatCurrency(t) {
    if (!t) return "—";
    try {
        let e = parseFloat(t);
        return isNaN(e) ? t : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: this.config.currency_format || "USD",
            minimumFractionDigits: this.config.decimal_places ?? 2,
            maximumFractionDigits: this.config.decimal_places ?? 2
        }).format(e)
    } catch {
        return t
    }
}
_formatCurrencyWhole(t) {
    if (!t) return "—";
    try {
        let e = parseFloat(t);
        return isNaN(e) ? t : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: this.config.currency_format || "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(e)
    } catch {
        return t
    }
}
_formatPerformance(t) {
    if (!t) return "—";
    try {
        let e = parseFloat(t);
        return isNaN(e) ? t : (e >= 0 ? "+" : "") + this._formatCurrency(String(e))
    } catch {
        return t
    }
}
_formatPerformanceWhole(t) {
    if (!t) return "—";
    try {
        let e = parseFloat(t);
        return isNaN(e) ? t : (e >= 0 ? "+" : "") + this._formatCurrencyWhole(String(e))
    } catch {
        return t
    }
}
_formatPercentage(t) {
    if (!t) return "—";
    try {
        let e = parseFloat(t);
        return isNaN(e) ? t : (e >= 0 ? "+" : "") + e.toFixed(this.config.decimal_places ?? 2) + "%"
    } catch {
        return t
    }
}
static getConfigElement() {
    return document.createElement("ghostfolio-card-editor")
}
static getStubConfig() {
    return {
        type: "custom:ghostfolio-card",
        title: "Portfolio",
        ghostfolio_url: "http://192.168.5.51:3333",
        access_token: "",
        show_performance: !0,
        show_investment: !0,
        show_accounts: !0,
        show_holdings: !0,
        currency_format: "USD",
        decimal_places: 2
    }
}
}, Y = class extends _ {
    static properties = {
        hass: {
            attribute: !1
        },
        config: {
            attribute: !1
        }
    };
    setConfig(t) {
        this.config = {
            ...t
        }
    }
    render() {
        return this.hass ? h`<div style="padding: 20px;"><h3>HA-Ghostfolio-Card Configuration</h3></div>` : h`<div>Loading...</div>`
    }
};
customElements.define("ghostfolio-card", X);
customElements.define("ghostfolio-card-editor", Y);
window.customCards = window.customCards || [];
window.customCards.push({
    type: "ghostfolio-card",
    name: "HA-Ghostfolio-Card",
    description: "Display your Ghostfolio portfolio performance with account breakdown, holdings, and charts",
    preview: !0
});