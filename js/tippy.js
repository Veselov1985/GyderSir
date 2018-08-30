(function(t, e) { 'object' == typeof exports && 'undefined' != typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define(e) : t.tippy = e() })(this, function() { 'use strict';

    function t(t) { return '[object Object]' === {}.toString.call(t) }

    function a(t) { return [].slice.call(t) }

    function o(e) { if (e instanceof Element || t(e)) return [e]; if (e instanceof NodeList) return a(e); if (Array.isArray(e)) return e; try { return a(document.querySelectorAll(e)) } catch (t) { return [] } }

    function r(t) { t.refObj = !0, t.attributes = t.attributes || {}, t.setAttribute = function(e, a) { t.attributes[e] = a }, t.getAttribute = function(e) { return t.attributes[e] }, t.removeAttribute = function(e) { delete t.attributes[e] }, t.hasAttribute = function(e) { return e in t.attributes }, t.addEventListener = function() {}, t.removeEventListener = function() {}, t.classList = { classNames: {}, add: function(e) { return t.classList.classNames[e] = !0 }, remove: function(e) { return delete t.classList.classNames[e], !0 }, contains: function(e) { return e in t.classList.classNames } } }

    function p(t) { for (var e = ['', 'webkit'], a = t.charAt(0).toUpperCase() + t.slice(1), o = 0; o < e.length; o++) { var i = e[o],
                r = i ? i + a : t; if ('undefined' != typeof document.body.style[r]) return r } return null }

    function n() { return document.createElement('div') }

    function s(t, e, a) { var i = n();
        i.setAttribute('class', 'tippy-popper'), i.setAttribute('role', 'tooltip'), i.setAttribute('id', 'tippy-' + t), i.style.zIndex = a.zIndex, i.style.maxWidth = a.maxWidth; var o = n();
        o.setAttribute('class', 'tippy-tooltip'), o.setAttribute('data-size', a.size), o.setAttribute('data-animation', a.animation), o.setAttribute('data-state', 'hidden'), a.theme.split(' ').forEach(function(e) { o.classList.add(e + '-theme') }); var r = n(); if (r.setAttribute('class', 'tippy-content'), a.arrow) { var s = n();
            s.style[p('transform')] = a.arrowTransform, 'round' === a.arrowType ? (s.classList.add('tippy-roundarrow'), s.innerHTML = '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>') : s.classList.add('tippy-arrow'), o.appendChild(s) } if (a.animateFill) { o.setAttribute('data-animatefill', ''); var l = n();
            l.classList.add('tippy-backdrop'), l.setAttribute('data-state', 'hidden'), o.appendChild(l) }
        a.inertia && o.setAttribute('data-inertia', ''), a.interactive && o.setAttribute('data-interactive', ''); var d = a.html; if (d) { var c;
            d instanceof Element ? (r.appendChild(d), c = '#' + (d.id || 'tippy-html-template')) : (r.innerHTML = document.querySelector(d).innerHTML, c = d), i.setAttribute('data-html', ''), o.setAttribute('data-template-id', c), a.interactive && i.setAttribute('tabindex', '-1') } else r[a.allowTitleHTML ? 'innerHTML' : 'textContent'] = e; return o.appendChild(r), i.appendChild(o), i }

    function l(t, e, a, i) { var o = a.onTrigger,
            r = a.onMouseLeave,
            p = a.onBlur,
            n = a.onDelegateShow,
            s = a.onDelegateHide,
            l = []; if ('manual' === t) return l; var d = function(t, a) { e.addEventListener(t, a), l.push({ event: t, handler: a }) }; return i.target ? (qt.supportsTouch && i.touchHold && (d('touchstart', n), d('touchend', s)), 'mouseenter' === t && (d('mouseover', n), d('mouseout', s)), 'focus' === t && (d('focusin', n), d('focusout', s)), 'click' === t && d('click', n)) : (d(t, o), qt.supportsTouch && i.touchHold && (d('touchstart', o), d('touchend', r)), 'mouseenter' === t && d('mouseleave', r), 'focus' === t && d(Ft ? 'focusout' : 'blur', p)), l }

    function d(t, e) { var a = Gt.reduce(function(a, i) { var o = t.getAttribute('data-tippy-' + i.toLowerCase()) || e[i]; return 'false' === o && (o = !1), 'true' === o && (o = !0), isFinite(o) && !isNaN(parseFloat(o)) && (o = parseFloat(o)), 'target' !== i && 'string' == typeof o && '[' === o.trim().charAt(0) && (o = JSON.parse(o)), a[i] = o, a }, {}); return Jt({}, e, a) }

    function c(t, e) { return e.arrow && (e.animateFill = !1), e.appendTo && 'function' == typeof e.appendTo && (e.appendTo = e.appendTo()), 'function' == typeof e.html && (e.html = e.html(t)), e }

    function m(t) { var e = function(e) { return t.querySelector(e) }; return { tooltip: e(jt.TOOLTIP), backdrop: e(jt.BACKDROP), content: e(jt.CONTENT), arrow: e(jt.ARROW) || e(jt.ROUND_ARROW) } }

    function f(t) { var e = t.getAttribute('title');
        e && t.setAttribute('data-original-title', e), t.removeAttribute('title') }

    function h(t) { return t && '[object Function]' === {}.toString.call(t) }

    function b(t, e) { if (1 !== t.nodeType) return []; var a = getComputedStyle(t, null); return e ? a[e] : a }

    function u(t) { return 'HTML' === t.nodeName ? t : t.parentNode || t.host }

    function y(t) { if (!t) return document.body; switch (t.nodeName) {
            case 'HTML':
            case 'BODY':
                return t.ownerDocument.body;
            case '#document':
                return t.body; } var e = b(t),
            a = e.overflow,
            i = e.overflowX,
            o = e.overflowY; return /(auto|scroll|overlay)/.test(a + o + i) ? t : y(u(t)) }

    function g(t) { return 11 === t ? ie : 10 === t ? oe : ie || oe }

    function w(t) { if (!t) return document.documentElement; for (var e = g(10) ? document.body : null, a = t.offsetParent; a === e && t.nextElementSibling;) a = (t = t.nextElementSibling).offsetParent; var i = a && a.nodeName; return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(a.nodeName) && 'static' === b(a, 'position') ? w(a) : a : t ? t.ownerDocument.documentElement : document.documentElement }

    function x(t) { var e = t.nodeName; return 'BODY' !== e && ('HTML' === e || w(t.firstElementChild) === t) }

    function v(t) { return null === t.parentNode ? t : v(t.parentNode) }

    function k(t, e) { if (!t || !t.nodeType || !e || !e.nodeType) return document.documentElement; var a = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = a ? t : e,
            o = a ? e : t,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(o, 0); var p = r.commonAncestorContainer; if (t !== p && e !== p || i.contains(o)) return x(p) ? p : w(p); var n = v(t); return n.host ? k(n.host, e) : k(t, v(e).host) }

    function E(t) { var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            a = 'top' === e ? 'scrollTop' : 'scrollLeft',
            i = t.nodeName; if ('BODY' === i || 'HTML' === i) { var o = t.ownerDocument.documentElement,
                r = t.ownerDocument.scrollingElement || o; return r[a] } return t[a] }

    function T(t, e) { var a = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
            i = E(e, 'top'),
            o = E(e, 'left'),
            r = a ? -1 : 1; return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t }

    function L(t, e) { var a = 'x' === e ? 'Left' : 'Top',
            i = 'Left' === a ? 'Right' : 'Bottom'; return parseFloat(t['border' + a + 'Width'], 10) + parseFloat(t['border' + i + 'Width'], 10) }

    function O(t, e, a, i) { return Ut(e['offset' + t], e['scroll' + t], a['client' + t], a['offset' + t], a['scroll' + t], g(10) ? a['offset' + t] + i['margin' + ('Height' === t ? 'Top' : 'Left')] + i['margin' + ('Height' === t ? 'Bottom' : 'Right')] : 0) }

    function A() { var t = document.body,
            e = document.documentElement,
            a = g(10) && getComputedStyle(e); return { height: O('Height', t, e, a), width: O('Width', t, e, a) } }

    function C(t) { return se({}, t, { right: t.left + t.width, bottom: t.top + t.height }) }

    function S(t) { var e = {}; try { if (g(10)) { e = t.getBoundingClientRect(); var a = E(t, 'top'),
                    i = E(t, 'left');
                e.top += a, e.left += i, e.bottom += a, e.right += i } else e = t.getBoundingClientRect() } catch (t) {} var o = { left: e.left, top: e.top, width: e.right - e.left, height: e.bottom - e.top },
            r = 'HTML' === t.nodeName ? A() : {},
            p = r.width || t.clientWidth || o.right - o.left,
            n = r.height || t.clientHeight || o.bottom - o.top,
            s = t.offsetWidth - p,
            l = t.offsetHeight - n; if (s || l) { var d = b(t);
            s -= L(d, 'x'), l -= L(d, 'y'), o.width -= s, o.height -= l } return C(o) }

    function Y(t, e) { var a = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
            i = g(10),
            o = 'HTML' === e.nodeName,
            r = S(t),
            p = S(e),
            n = y(t),
            s = b(e),
            l = parseFloat(s.borderTopWidth, 10),
            d = parseFloat(s.borderLeftWidth, 10);
        a && 'HTML' === e.nodeName && (p.top = Ut(p.top, 0), p.left = Ut(p.left, 0)); var c = C({ top: r.top - p.top - l, left: r.left - p.left - d, width: r.width, height: r.height }); if (c.marginTop = 0, c.marginLeft = 0, !i && o) { var m = parseFloat(s.marginTop, 10),
                f = parseFloat(s.marginLeft, 10);
            c.top -= l - m, c.bottom -= l - m, c.left -= d - f, c.right -= d - f, c.marginTop = m, c.marginLeft = f } return (i && !a ? e.contains(n) : e === n && 'BODY' !== n.nodeName) && (c = T(c, e)), c }

    function P(t) { var e = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
            a = t.ownerDocument.documentElement,
            i = Y(t, a),
            o = Ut(a.clientWidth, window.innerWidth || 0),
            r = Ut(a.clientHeight, window.innerHeight || 0),
            p = e ? 0 : E(a),
            n = e ? 0 : E(a, 'left'),
            s = { top: p - i.top + i.marginTop, left: n - i.left + i.marginLeft, width: o, height: r }; return C(s) }

    function X(t) { var e = t.nodeName; return 'BODY' !== e && 'HTML' !== e && ('fixed' === b(t, 'position') || X(u(t))) }

    function I(t) { if (!t || !t.parentElement || g()) return document.documentElement; for (var e = t.parentElement; e && 'none' === b(e, 'transform');) e = e.parentElement; return e || document.documentElement }

    function D(t, e, a, i) { var o = !!(4 < arguments.length && void 0 !== arguments[4]) && arguments[4],
            r = { top: 0, left: 0 },
            p = o ? I(t) : k(t, e); if ('viewport' === i) r = P(p, o);
        else { var n; 'scrollParent' === i ? (n = y(u(e)), 'BODY' === n.nodeName && (n = t.ownerDocument.documentElement)) : 'window' === i ? n = t.ownerDocument.documentElement : n = i; var s = Y(n, p, o); if ('HTML' === n.nodeName && !X(p)) { var l = A(),
                    d = l.height,
                    c = l.width;
                r.top += s.top - s.marginTop, r.bottom = d + s.top, r.left += s.left - s.marginLeft, r.right = c + s.left } else r = s } return r.left += a, r.top += a, r.right -= a, r.bottom -= a, r }

    function _(t) { var e = t.width,
            a = t.height; return e * a }

    function R(t, e, a, i, o) { var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0; if (-1 === t.indexOf('auto')) return t; var p = D(a, i, r, o),
            n = { top: { width: p.width, height: e.top - p.top }, right: { width: p.right - e.right, height: p.height }, bottom: { width: p.width, height: p.bottom - e.bottom }, left: { width: e.left - p.left, height: p.height } },
            s = Object.keys(n).map(function(t) { return se({ key: t }, n[t], { area: _(n[t]) }) }).sort(function(t, e) { return e.area - t.area }),
            l = s.filter(function(t) { var e = t.width,
                    i = t.height; return e >= a.clientWidth && i >= a.clientHeight }),
            d = 0 < l.length ? l[0].key : s[0].key,
            c = t.split('-')[1]; return d + (c ? '-' + c : '') }

    function N(t, e, a) { var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            o = i ? I(e) : k(e, a); return Y(a, o, i) }

    function H(t) { var e = getComputedStyle(t),
            a = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
            i = parseFloat(e.marginLeft) + parseFloat(e.marginRight),
            o = { width: t.offsetWidth + i, height: t.offsetHeight + a }; return o }

    function M(t) { var e = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }; return t.replace(/left|right|bottom|top/g, function(t) { return e[t] }) }

    function B(t, e, a) { a = a.split('-')[0]; var i = H(t),
            o = { width: i.width, height: i.height },
            r = -1 !== ['right', 'left'].indexOf(a),
            p = r ? 'top' : 'left',
            n = r ? 'left' : 'top',
            s = r ? 'height' : 'width',
            l = r ? 'width' : 'height'; return o[p] = e[p] + e[s] / 2 - i[s] / 2, o[n] = a === n ? e[n] - i[l] : e[M(n)], o }

    function W(t, e) { return Array.prototype.find ? t.find(e) : t.filter(e)[0] }

    function U(t, e, a) { if (Array.prototype.findIndex) return t.findIndex(function(t) { return t[e] === a }); var i = W(t, function(t) { return t[e] === a }); return t.indexOf(i) }

    function z(t, e, a) { var i = void 0 === a ? t : t.slice(0, U(t, 'name', a)); return i.forEach(function(t) { t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!'); var a = t['function'] || t.fn;
            t.enabled && h(a) && (e.offsets.popper = C(e.offsets.popper), e.offsets.reference = C(e.offsets.reference), e = a(e, t)) }), e }

    function F() { if (!this.state.isDestroyed) { var t = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
            t.offsets.reference = N(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = R(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = B(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', t = z(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t)) } }

    function q(t, e) { return t.some(function(t) { var a = t.name,
                i = t.enabled; return i && a === e }) }

    function j(t) { for (var e = [!1, 'ms', 'Webkit', 'Moz', 'O'], a = t.charAt(0).toUpperCase() + t.slice(1), o = 0; o < e.length; o++) { var i = e[o],
                r = i ? '' + i + a : t; if ('undefined' != typeof document.body.style[r]) return r } return null }

    function K() { return this.state.isDestroyed = !0, q(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[j('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this }

    function G(t) { var e = t.ownerDocument; return e ? e.defaultView : window }

    function V(t, e, a, i) { var o = 'BODY' === t.nodeName,
            r = o ? t.ownerDocument.defaultView : t;
        r.addEventListener(e, a, { passive: !0 }), o || V(y(r.parentNode), e, a, i), i.push(r) }

    function Q(t, e, a, i) { a.updateBound = i, G(t).addEventListener('resize', a.updateBound, { passive: !0 }); var o = y(t); return V(o, 'scroll', a.updateBound, a.scrollParents), a.scrollElement = o, a.eventsEnabled = !0, a }

    function J() { this.state.eventsEnabled || (this.state = Q(this.reference, this.options, this.state, this.scheduleUpdate)) }

    function Z(t, e) { return G(t).removeEventListener('resize', e.updateBound), e.scrollParents.forEach(function(t) { t.removeEventListener('scroll', e.updateBound) }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e }

    function $() { this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Z(this.reference, this.state)) }

    function tt(t) { return '' !== t && !isNaN(parseFloat(t)) && isFinite(t) }

    function et(t, e) { Object.keys(e).forEach(function(a) { var i = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(a) && tt(e[a]) && (i = 'px'), t.style[a] = e[a] + i }) }

    function at(t, e) { Object.keys(e).forEach(function(a) { var i = e[a];!1 === i ? t.removeAttribute(a) : t.setAttribute(a, e[a]) }) }

    function it(t, e, a) { var i = W(t, function(t) { var a = t.name; return a === e }),
            o = !!i && t.some(function(t) { return t.name === a && t.enabled && t.order < i.order }); if (!o) { var r = '`' + e + '`';
            console.warn('`' + a + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!') } return o }

    function ot(t) { return 'end' === t ? 'start' : 'start' === t ? 'end' : t }

    function rt(t) { var e = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
            a = de.indexOf(t),
            i = de.slice(a + 1).concat(de.slice(0, a)); return e ? i.reverse() : i }

    function pt(t, e, a, i) { var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +o[1],
            p = o[2]; if (!r) return t; if (0 === p.indexOf('%')) { var n; switch (p) {
                case '%p':
                    n = a; break;
                case '%':
                case '%r':
                default:
                    n = i; } var s = C(n); return s[e] / 100 * r } if ('vh' === p || 'vw' === p) { var l; return l = 'vh' === p ? Ut(document.documentElement.clientHeight, window.innerHeight || 0) : Ut(document.documentElement.clientWidth, window.innerWidth || 0), l / 100 * r } return r }

    function nt(t, e, a, i) { var o = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(i),
            p = t.split(/(\+|\-)/).map(function(t) { return t.trim() }),
            n = p.indexOf(W(p, function(t) { return -1 !== t.search(/,|\s/) }));
        p[n] && -1 === p[n].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.'); var s = /\s*,\s*|\s+/,
            l = -1 === n ? [p] : [p.slice(0, n).concat([p[n].split(s)[0]]), [p[n].split(s)[1]].concat(p.slice(n + 1))]; return l = l.map(function(t, i) { var o = (1 === i ? !r : r) ? 'height' : 'width',
                p = !1; return t.reduce(function(t, e) { return '' === t[t.length - 1] && -1 !== ['+', '-'].indexOf(e) ? (t[t.length - 1] = e, p = !0, t) : p ? (t[t.length - 1] += e, p = !1, t) : t.concat(e) }, []).map(function(t) { return pt(t, o, e, a) }) }), l.forEach(function(t, e) { t.forEach(function(a, i) { tt(a) && (o[e] += a * ('-' === t[i - 1] ? -1 : 1)) }) }), o }

    function st(t, e) { var a = e.offset,
            i = t.placement,
            o = t.offsets,
            r = o.popper,
            p = o.reference,
            n = i.split('-')[0],
            s = void 0; return s = tt(+a) ? [+a, 0] : nt(a, r, p, n), 'left' === n ? (r.top += s[0], r.left -= s[1]) : 'right' === n ? (r.top += s[0], r.left += s[1]) : 'top' === n ? (r.left += s[0], r.top -= s[1]) : 'bottom' === n && (r.left += s[0], r.top += s[1]), t.popper = r, t }

    function lt(t) { void t.offsetHeight }

    function dt(t, e, a) { var i = t.popper,
            o = t.options,
            r = o.onCreate,
            p = o.onUpdate;
        o.onCreate = o.onUpdate = function() { lt(i), e && e(), p(), o.onCreate = r, o.onUpdate = p }, a || t.scheduleUpdate() }

    function ct(t) { return t.getAttribute('x-placement').replace(/-.+/, '') }

    function mt(t, e, a) { if (!e.getAttribute('x-placement')) return !0; var i = t.clientX,
            o = t.clientY,
            r = a.interactiveBorder,
            p = a.distance,
            n = e.getBoundingClientRect(),
            s = ct(e),
            l = r + p,
            d = { top: n.top - o > r, bottom: o - n.bottom > r, left: n.left - i > r, right: i - n.right > r }; return 'top' === s ? d.top = n.top - o > l : 'bottom' === s ? d.bottom = o - n.bottom > l : 'left' === s ? d.left = n.left - i > l : 'right' === s ? d.right = i - n.right > l : void 0, d.top || d.bottom || d.left || d.right }

    function ft(t, e, a, i) { if (!e.length) return ''; var o = { scale: function() { return 1 === e.length ? '' + e[0] : a ? e[0] + ', ' + e[1] : e[1] + ', ' + e[0] }(), translate: function() { return 1 === e.length ? i ? -e[0] + 'px' : e[0] + 'px' : a ? i ? e[0] + 'px, ' + -e[1] + 'px' : e[0] + 'px, ' + e[1] + 'px' : i ? -e[1] + 'px, ' + e[0] + 'px' : e[1] + 'px, ' + e[0] + 'px' }() }; return o[t] }

    function ht(t, e) { if (!t) return ''; return e ? t : { X: 'Y', Y: 'X' }[t] }

    function bt(t, e, a) { var i = ct(t),
            o = 'top' === i || 'bottom' === i,
            r = 'right' === i || 'bottom' === i,
            n = function(t) { var e = a.match(t); return e ? e[1] : '' },
            s = function(t) { var e = a.match(t); return e ? e[1].split(',').map(parseFloat) : [] },
            l = { translate: /translateX?Y?\(([^)]+)\)/, scale: /scaleX?Y?\(([^)]+)\)/ },
            d = { translate: { axis: n(/translate([XY])/), numbers: s(l.translate) }, scale: { axis: n(/scale([XY])/), numbers: s(l.scale) } },
            c = a.replace(l.translate, 'translate' + ht(d.translate.axis, o) + '(' + ft('translate', d.translate.numbers, o, r) + ')').replace(l.scale, 'scale' + ht(d.scale.axis, o) + '(' + ft('scale', d.scale.numbers, o, r) + ')');
        e.style[p('transform')] = c }

    function ut(t) { return -(t - Kt.distance) + 'px' }

    function yt(t) { requestAnimationFrame(function() { setTimeout(t, 1) }) }

    function gt(t, a) { var i = Element.prototype.closest || function(t) { for (var a = this; a;) { if (e.call(a, t)) return a;
                a = a.parentElement } }; return i.call(t, a) }

    function wt(t, e) { return Array.isArray(t) ? t[e] : t }

    function xt(t, e) { t.forEach(function(t) { t && t.setAttribute('data-state', e) }) }

    function vt(t, e) { t.filter(Boolean).forEach(function(t) { t.style[p('transitionDuration')] = e + 'ms' }) }

    function kt(t) { var e = window.scrollX || window.pageXOffset,
            a = window.scrollY || window.pageYOffset;
        t.focus(), scroll(e, a) }

    function Et() { var t = this._(be).lastTriggerEvent; return this.options.followCursor && !qt.usingTouch && t && 'focus' !== t.type }

    function Tt(t) { var e = gt(t.target, this.options.target); if (e && !e._tippy) { var a = e.getAttribute('title') || this.title;
            a && (e.setAttribute('title', a), Ht(e, Jt({}, this.options, { target: null })), Lt.call(e._tippy, t)) } }

    function Lt(t) { var e = this,
            a = this.options; if (Yt.call(this), !this.state.visible) { if (a.target) return void Tt.call(this, t); if (this._(be).isPreparingToShow = !0, a.wait) return void a.wait.call(this.popper, this.show.bind(this), t); if (Et.call(this)) { this._(be).followCursorListener || Pt.call(this); var i = m(this.popper),
                    o = i.arrow;
                o && (o.style.margin = '0'), document.addEventListener('mousemove', this._(be).followCursorListener) } var r = wt(a.delay, 0);
            r ? this._(be).showTimeout = setTimeout(function() { e.show() }, r) : this.show() } }

    function Ot() { var t = this; if (Yt.call(this), !!this.state.visible) { this._(be).isPreparingToShow = !1; var e = wt(this.options.delay, 1);
            e ? this._(be).hideTimeout = setTimeout(function() { t.state.visible && t.hide() }, e) : this.hide() } }

    function At() { var t = this; return { onTrigger: function(e) { if (t.state.enabled) { var a = qt.supportsTouch && qt.usingTouch && -1 < ['mouseenter', 'mouseover', 'focus'].indexOf(e.type);
                    a && t.options.touchHold || (t._(be).lastTriggerEvent = e, 'click' === e.type && 'persistent' !== t.options.hideOnClick && t.state.visible ? Ot.call(t) : Lt.call(t, e)) } }, onMouseLeave: function(e) { if (!(-1 < ['mouseleave', 'mouseout'].indexOf(e.type) && qt.supportsTouch && qt.usingTouch && t.options.touchHold)) { if (t.options.interactive) { var a = Ot.bind(t),
                            i = function e(i) { var o = gt(i.target, jt.REFERENCE),
                                    r = gt(i.target, jt.POPPER) === t.popper,
                                    p = o === t.reference;
                                r || p || mt(i, t.popper, t.options) && (document.body.removeEventListener('mouseleave', a), document.removeEventListener('mousemove', e), Ot.call(t, e)) }; return document.body.addEventListener('mouseleave', a), void document.addEventListener('mousemove', i) }
                    Ot.call(t) } }, onBlur: function(e) { if (!(e.target !== t.reference || qt.usingTouch)) { if (t.options.interactive) { if (!e.relatedTarget) return; if (gt(e.relatedTarget, jt.POPPER)) return }
                    Ot.call(t) } }, onDelegateShow: function(e) { gt(e.target, t.options.target) && Lt.call(t, e) }, onDelegateHide: function(e) { gt(e.target, t.options.target) && Ot.call(t) } } }

    function Ct() { var t = this,
            e = this.popper,
            a = this.reference,
            i = this.options,
            o = m(e),
            r = o.tooltip,
            p = i.popperOptions,
            n = 'round' === i.arrowType ? jt.ROUND_ARROW : jt.ARROW,
            s = r.querySelector(n),
            l = Jt({ placement: i.placement }, p || {}, { modifiers: Jt({}, p ? p.modifiers : {}, { arrow: Jt({ element: n }, p && p.modifiers ? p.modifiers.arrow : {}), flip: Jt({ enabled: i.flip, padding: i.distance + 5, behavior: i.flipBehavior }, p && p.modifiers ? p.modifiers.flip : {}), offset: Jt({ offset: i.offset }, p && p.modifiers ? p.modifiers.offset : {}) }), onCreate: function() { r.style[ct(e)] = ut(i.distance), s && i.arrowTransform && bt(e, s, i.arrowTransform) }, onUpdate: function() { var t = r.style;
                    t.top = '', t.bottom = '', t.left = '', t.right = '', t[ct(e)] = ut(i.distance), s && i.arrowTransform && bt(e, s, i.arrowTransform) } }); return It.call(this, { target: e, callback: function() { t.popperInstance.update() }, options: { childList: !0, subtree: !0, characterData: !0 } }), new me(a, e, l) }

    function St(t) { var e = this.options; if (this.popperInstance ? (this.popperInstance.scheduleUpdate(), e.livePlacement && !Et.call(this) && this.popperInstance.enableEventListeners()) : (this.popperInstance = Ct.call(this), !e.livePlacement && this.popperInstance.disableEventListeners()), !Et.call(this)) { var a = m(this.popper),
                i = a.arrow;
            i && (i.style.margin = ''), this.popperInstance.reference = this.reference }
        dt(this.popperInstance, t, !0), e.appendTo.contains(this.popper) || e.appendTo.appendChild(this.popper) }

    function Yt() { var t = this._(be),
            e = t.showTimeout,
            a = t.hideTimeout;
        clearTimeout(e), clearTimeout(a) }

    function Pt() { var t = this;
        this._(be).followCursorListener = function(e) { var a = t._(be).lastMouseMoveEvent = e,
                i = a.clientX,
                o = a.clientY;
            t.popperInstance && (t.popperInstance.reference = { getBoundingClientRect: function() { return { width: 0, height: 0, top: o, left: i, right: i, bottom: o } }, clientWidth: 0, clientHeight: 0 }, t.popperInstance.scheduleUpdate()) } }

    function Xt() { var t = this,
            e = function() { t.popper.style[p('transitionDuration')] = t.options.updateDuration + 'ms' },
            a = function() { t.popper.style[p('transitionDuration')] = '' };
        (function i() { t.popperInstance && t.popperInstance.update(), e(), t.state.visible ? requestAnimationFrame(i) : a() })() }

    function It(t) { var e = t.target,
            a = t.callback,
            i = t.options; if (window.MutationObserver) { var o = new MutationObserver(a);
            o.observe(e, i), this._(be).mutationObservers.push(o) } }

    function Dt(t, a) { if (!t) return a(); var e = m(this.popper),
            i = e.tooltip,
            o = function(t, e) { e && i[t + 'EventListener']('transition' in document.body.style ? 'transitionend' : 'webkitTransitionEnd', e) },
            r = function t(r) { r.target === i && (o('remove', t), a()) };
        o('remove', this._(be).transitionendListener), o('add', r), this._(be).transitionendListener = r }

    function _t(t, e) { return t.reduce(function(t, a) { var i = ge,
                o = c(a, e.performance ? e : d(a, e)),
                r = a.getAttribute('title'); if (!r && !o.target && !o.html && !o.dynamicTitle) return t;
            a.setAttribute(o.target ? 'data-tippy-delegate' : 'data-tippy', ''), f(a); var p = s(i, r, o),
                n = new ye({ id: i, reference: a, popper: p, options: o, title: r, popperInstance: null });
            o.createPopperInstanceOnInit && (n.popperInstance = Ct.call(n), n.popperInstance.disableEventListeners()); var h = At.call(n); return n.listeners = o.trigger.trim().split(' ').reduce(function(t, e) { return t.concat(l(e, a, h, o)) }, []), o.dynamicTitle && It.call(n, { target: a, callback: function() { var t = m(p),
                        e = t.content,
                        i = a.getAttribute('title');
                    i && (e[o.allowTitleHTML ? 'innerHTML' : 'textContent'] = n.title = i, f(a)) }, options: { attributes: !0 } }), a._tippy = n, p._tippy = n, p._reference = a, t.push(n), ge++, t }, []) }

    function Rt(t) { var e = a(document.querySelectorAll(jt.POPPER));
        e.forEach(function(e) { var a = e._tippy; if (a) { var i = a.options;
                (!0 === i.hideOnClick || -1 < i.trigger.indexOf('focus')) && (!t || e !== t.popper) && a.hide() } }) }

    function Nt() { var t = function() { qt.usingTouch || (qt.usingTouch = !0, qt.iOS && document.body.classList.add('tippy-touch'), qt.dynamicInputDetection && window.performance && document.addEventListener('mousemove', i), qt.onUserInputChange('touch')) },
            i = function() { var t; return function() { var e = performance.now();
                    20 > e - t && (qt.usingTouch = !1, document.removeEventListener('mousemove', i), !qt.iOS && document.body.classList.remove('tippy-touch'), qt.onUserInputChange('mouse')), t = e } }();
        document.addEventListener('click', function(t) { if (!(t.target instanceof Element)) return Rt(); var e = gt(t.target, jt.REFERENCE),
                a = gt(t.target, jt.POPPER); if (!(a && a._tippy && a._tippy.options.interactive)) { if (e && e._tippy) { var i = e._tippy.options,
                        o = -1 < i.trigger.indexOf('click'),
                        r = i.multiple; if (!r && qt.usingTouch || !r && o) return Rt(e._tippy); if (!0 !== i.hideOnClick || o) return }
                Rt() } }), document.addEventListener('touchstart', t), window.addEventListener('blur', function() { var t = document,
                a = t.activeElement;
            a && a.blur && e.call(a, jt.REFERENCE) && a.blur() }), window.addEventListener('resize', function() { a(document.querySelectorAll(jt.POPPER)).forEach(function(t) { var e = t._tippy;
                e && !e.options.livePlacement && e.popperInstance.scheduleUpdate() }) }), !qt.supportsTouch && (navigator.maxTouchPoints || navigator.msMaxTouchPoints) && document.addEventListener('pointerdown', t) }

    function Ht(e, a, i) { qt.supported && !we && (Nt(), we = !0), t(e) && r(e), a = Jt({}, Kt, a); var p = o(e),
            n = p[0]; return { selector: e, options: a, tooltips: qt.supported ? _t(i && n ? [n] : p, a) : [], destroyAll: function() { this.tooltips.forEach(function(t) { return t.destroy() }), this.tooltips = [] } } } var Mt = Math.min,
        Bt = Math.round,
        Wt = Math.floor,
        Ut = Math.max,
        zt = 'undefined' != typeof window,
        Ft = zt && /MSIE |Trident\//.test(navigator.userAgent),
        qt = {};
    zt && (qt.supported = 'requestAnimationFrame' in window, qt.supportsTouch = 'ontouchstart' in window, qt.usingTouch = !1, qt.dynamicInputDetection = !0, qt.iOS = /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream, qt.onUserInputChange = function() {}); for (var jt = { POPPER: '.tippy-popper', TOOLTIP: '.tippy-tooltip', CONTENT: '.tippy-content', BACKDROP: '.tippy-backdrop', ARROW: '.tippy-arrow', ROUND_ARROW: '.tippy-roundarrow', REFERENCE: '[data-tippy]' }, Kt = { placement: 'top', livePlacement: !0, trigger: 'mouseenter focus', animation: 'shift-away', html: !1, animateFill: !0, arrow: !1, delay: 0, duration: [350, 300], interactive: !1, interactiveBorder: 2, theme: 'dark', size: 'regular', distance: 10, offset: 0, hideOnClick: !0, multiple: !1, followCursor: !1, inertia: !1, updateDuration: 350, sticky: !1, appendTo: function() { return document.body }, zIndex: 9999, touchHold: !1, performance: !1, dynamicTitle: !1, flip: !0, flipBehavior: 'flip', arrowType: 'sharp', arrowTransform: '', maxWidth: '', target: null, allowTitleHTML: !0, popperOptions: {}, createPopperInstanceOnInit: !1, onShow: function() {}, onShown: function() {}, onHide: function() {}, onHidden: function() {} }, Gt = qt.supported && Object.keys(Kt), Vt = function(t, e) { if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function') }, Qt = function() {
            function t(t, e) { for (var a, o = 0; o < e.length; o++) a = e[o], a.enumerable = a.enumerable || !1, a.configurable = !0, ('value' in a) && (a.writable = !0), Object.defineProperty(t, a.key, a) } return function(e, a, i) { return a && t(e.prototype, a), i && t(e, i), e } }(), Jt = Object.assign || function(t) { for (var e, a = 1; a < arguments.length; a++)
                for (var i in e = arguments[a], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]); return t }, Zt = 'undefined' != typeof window && 'undefined' != typeof document, $t = ['Edge', 'Trident', 'Firefox'], te = 0, ee = 0; ee < $t.length; ee += 1)
        if (Zt && 0 <= navigator.userAgent.indexOf($t[ee])) { te = 1; break }
    var i = Zt && window.Promise,
        ae = i ? function(t) { var e = !1; return function() { e || (e = !0, window.Promise.resolve().then(function() { e = !1, t() })) } } : function(t) { var e = !1; return function() { e || (e = !0, setTimeout(function() { e = !1, t() }, te)) } },
        ie = Zt && !!(window.MSInputMethodContext && document.documentMode),
        oe = Zt && /MSIE 10/.test(navigator.userAgent),
        re = function(t, e) { if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function') },
        pe = function() {
            function t(t, e) { for (var a, o = 0; o < e.length; o++) a = e[o], a.enumerable = a.enumerable || !1, a.configurable = !0, 'value' in a && (a.writable = !0), Object.defineProperty(t, a.key, a) } return function(e, a, i) { return a && t(e.prototype, a), i && t(e, i), e } }(),
        ne = function(t, e, a) { return e in t ? Object.defineProperty(t, e, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = a, t },
        se = Object.assign || function(t) { for (var e, a = 1; a < arguments.length; a++)
                for (var i in e = arguments[a], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]); return t },
        le = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        de = le.slice(3),
        ce = { FLIP: 'flip', CLOCKWISE: 'clockwise', COUNTERCLOCKWISE: 'counterclockwise' },
        me = function() {
            function t(e, a) { var i = this,
                    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                re(this, t), this.scheduleUpdate = function() { return requestAnimationFrame(i.update) }, this.update = ae(this.update.bind(this)), this.options = se({}, t.Defaults, o), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = e && e.jquery ? e[0] : e, this.popper = a && a.jquery ? a[0] : a, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, o.modifiers)).forEach(function(e) { i.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {}) }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) { return se({ name: t }, i.options.modifiers[t]) }).sort(function(t, e) { return t.order - e.order }), this.modifiers.forEach(function(t) { t.enabled && h(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state) }), this.update(); var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r } return pe(t, [{ key: 'update', value: function() { return F.call(this) } }, { key: 'destroy', value: function() { return K.call(this) } }, { key: 'enableEventListeners', value: function() { return J.call(this) } }, { key: 'disableEventListeners', value: function() { return $.call(this) } }]), t }();
    me.Utils = ('undefined' == typeof window ? global : window).PopperUtils, me.placements = le, me.Defaults = { placement: 'bottom', positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function() {}, onUpdate: function() {}, modifiers: { shift: { order: 100, enabled: !0, fn: function(t) { var e = t.placement,
                        a = e.split('-')[0],
                        i = e.split('-')[1]; if (i) { var o = t.offsets,
                            r = o.reference,
                            p = o.popper,
                            n = -1 !== ['bottom', 'top'].indexOf(a),
                            s = n ? 'left' : 'top',
                            l = n ? 'width' : 'height',
                            d = { start: ne({}, s, r[s]), end: ne({}, s, r[s] + r[l] - p[l]) };
                        t.offsets.popper = se({}, p, d[i]) } return t } }, offset: { order: 200, enabled: !0, fn: st, offset: 0 }, preventOverflow: { order: 300, enabled: !0, fn: function(t, e) { var a = e.boundariesElement || w(t.instance.popper);
                    t.instance.reference === a && (a = w(a)); var i = j('transform'),
                        o = t.instance.popper.style,
                        r = o.top,
                        p = o.left,
                        n = o[i];
                    o.top = '', o.left = '', o[i] = ''; var s = D(t.instance.popper, t.instance.reference, e.padding, a, t.positionFixed);
                    o.top = r, o.left = p, o[i] = n, e.boundaries = s; var l = e.priority,
                        d = t.offsets.popper,
                        c = { primary: function(t) { var a = d[t]; return d[t] < s[t] && !e.escapeWithReference && (a = Ut(d[t], s[t])), ne({}, t, a) }, secondary: function(t) { var a = 'right' === t ? 'left' : 'top',
                                    i = d[a]; return d[t] > s[t] && !e.escapeWithReference && (i = Mt(d[a], s[t] - ('right' === t ? d.width : d.height))), ne({}, a, i) } }; return l.forEach(function(t) { var e = -1 === ['left', 'top'].indexOf(t) ? 'secondary' : 'primary';
                        d = se({}, d, c[e](t)) }), t.offsets.popper = d, t }, priority: ['left', 'right', 'top', 'bottom'], padding: 5, boundariesElement: 'scrollParent' }, keepTogether: { order: 400, enabled: !0, fn: function(t) { var e = t.offsets,
                        a = e.popper,
                        i = e.reference,
                        o = t.placement.split('-')[0],
                        r = Wt,
                        p = -1 !== ['top', 'bottom'].indexOf(o),
                        n = p ? 'right' : 'bottom',
                        s = p ? 'left' : 'top',
                        l = p ? 'width' : 'height'; return a[n] < r(i[s]) && (t.offsets.popper[s] = r(i[s]) - a[l]), a[s] > r(i[n]) && (t.offsets.popper[s] = r(i[n])), t } }, arrow: { order: 500, enabled: !0, fn: function(t, e) { var a; if (!it(t.instance.modifiers, 'arrow', 'keepTogether')) return t; var i = e.element; if ('string' == typeof i) { if (i = t.instance.popper.querySelector(i), !i) return t; } else if (!t.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), t; var o = t.placement.split('-')[0],
                        r = t.offsets,
                        p = r.popper,
                        n = r.reference,
                        s = -1 !== ['left', 'right'].indexOf(o),
                        l = s ? 'height' : 'width',
                        d = s ? 'Top' : 'Left',
                        c = d.toLowerCase(),
                        m = s ? 'left' : 'top',
                        f = s ? 'bottom' : 'right',
                        h = H(i)[l];
                    n[f] - h < p[c] && (t.offsets.popper[c] -= p[c] - (n[f] - h)), n[c] + h > p[f] && (t.offsets.popper[c] += n[c] + h - p[f]), t.offsets.popper = C(t.offsets.popper); var u = n[c] + n[l] / 2 - h / 2,
                        y = b(t.instance.popper),
                        g = parseFloat(y['margin' + d], 10),
                        w = parseFloat(y['border' + d + 'Width'], 10),
                        x = u - t.offsets.popper[c] - g - w; return x = Ut(Mt(p[l] - h, x), 0), t.arrowElement = i, t.offsets.arrow = (a = {}, ne(a, c, Bt(x)), ne(a, m, ''), a), t }, element: '[x-arrow]' }, flip: { order: 600, enabled: !0, fn: function(t, e) { if (q(t.instance.modifiers, 'inner')) return t; if (t.flipped && t.placement === t.originalPlacement) return t; var a = D(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                        i = t.placement.split('-')[0],
                        o = M(i),
                        r = t.placement.split('-')[1] || '',
                        p = []; switch (e.behavior) {
                        case ce.FLIP:
                            p = [i, o]; break;
                        case ce.CLOCKWISE:
                            p = rt(i); break;
                        case ce.COUNTERCLOCKWISE:
                            p = rt(i, !0); break;
                        default:
                            p = e.behavior; } return p.forEach(function(n, s) { if (i !== n || p.length === s + 1) return t;
                        i = t.placement.split('-')[0], o = M(i); var l = t.offsets.popper,
                            d = t.offsets.reference,
                            c = Wt,
                            m = 'left' === i && c(l.right) > c(d.left) || 'right' === i && c(l.left) < c(d.right) || 'top' === i && c(l.bottom) > c(d.top) || 'bottom' === i && c(l.top) < c(d.bottom),
                            f = c(l.left) < c(a.left),
                            h = c(l.right) > c(a.right),
                            b = c(l.top) < c(a.top),
                            u = c(l.bottom) > c(a.bottom),
                            y = 'left' === i && f || 'right' === i && h || 'top' === i && b || 'bottom' === i && u,
                            g = -1 !== ['top', 'bottom'].indexOf(i),
                            w = !!e.flipVariations && (g && 'start' === r && f || g && 'end' === r && h || !g && 'start' === r && b || !g && 'end' === r && u);
                        (m || y || w) && (t.flipped = !0, (m || y) && (i = p[s + 1]), w && (r = ot(r)), t.placement = i + (r ? '-' + r : ''), t.offsets.popper = se({}, t.offsets.popper, B(t.instance.popper, t.offsets.reference, t.placement)), t = z(t.instance.modifiers, t, 'flip')) }), t }, behavior: 'flip', padding: 5, boundariesElement: 'viewport' }, inner: { order: 700, enabled: !1, fn: function(t) { var e = t.placement,
                        a = e.split('-')[0],
                        i = t.offsets,
                        o = i.popper,
                        r = i.reference,
                        p = -1 !== ['left', 'right'].indexOf(a),
                        n = -1 === ['top', 'left'].indexOf(a); return o[p ? 'left' : 'top'] = r[a] - (n ? o[p ? 'width' : 'height'] : 0), t.placement = M(e), t.offsets.popper = C(o), t } }, hide: { order: 800, enabled: !0, fn: function(t) { if (!it(t.instance.modifiers, 'hide', 'preventOverflow')) return t; var e = t.offsets.reference,
                        a = W(t.instance.modifiers, function(t) { return 'preventOverflow' === t.name }).boundaries; if (e.bottom < a.top || e.left > a.right || e.top > a.bottom || e.right < a.left) { if (!0 === t.hide) return t;
                        t.hide = !0, t.attributes['x-out-of-boundaries'] = '' } else { if (!1 === t.hide) return t;
                        t.hide = !1, t.attributes['x-out-of-boundaries'] = !1 } return t } }, computeStyle: { order: 850, enabled: !0, fn: function(t, e) { var a = e.x,
                        i = e.y,
                        o = t.offsets.popper,
                        r = W(t.instance.modifiers, function(t) { return 'applyStyle' === t.name }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'); var p = void 0 === r ? e.gpuAcceleration : r,
                        n = w(t.instance.popper),
                        s = S(n),
                        l = { position: o.position },
                        d = { left: Wt(o.left), top: Bt(o.top), bottom: Bt(o.bottom), right: Wt(o.right) },
                        c = 'bottom' === a ? 'top' : 'bottom',
                        m = 'right' === i ? 'left' : 'right',
                        f = j('transform'),
                        h = void 0,
                        b = void 0; if (b = 'bottom' == c ? -s.height + d.bottom : d.top, h = 'right' == m ? -s.width + d.right : d.left, p && f) l[f] = 'translate3d(' + h + 'px, ' + b + 'px, 0)', l[c] = 0, l[m] = 0, l.willChange = 'transform';
                    else { var u = 'bottom' == c ? -1 : 1,
                            y = 'right' == m ? -1 : 1;
                        l[c] = b * u, l[m] = h * y, l.willChange = c + ', ' + m } var g = { "x-placement": t.placement }; return t.attributes = se({}, g, t.attributes), t.styles = se({}, l, t.styles), t.arrowStyles = se({}, t.offsets.arrow, t.arrowStyles), t }, gpuAcceleration: !0, x: 'bottom', y: 'right' }, applyStyle: { order: 900, enabled: !0, fn: function(t) { return et(t.instance.popper, t.styles), at(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && et(t.arrowElement, t.arrowStyles), t }, onLoad: function(t, e, a, i, o) { var r = N(o, e, t, a.positionFixed),
                        p = R(a.placement, r, e, t, a.modifiers.flip.boundariesElement, a.modifiers.flip.padding); return e.setAttribute('x-placement', p), et(e, { position: a.positionFixed ? 'fixed' : 'absolute' }), a }, gpuAcceleration: void 0 } } }; var fe = {}; if (zt) { var he = Element.prototype;
        fe = he.matches || he.matchesSelector || he.webkitMatchesSelector || he.mozMatchesSelector || he.msMatchesSelector || function(t) { for (var e = (this.document || this.ownerDocument).querySelectorAll(t), a = e.length; 0 <= --a && e.item(a) !== this;); return -1 < a } } var e = fe,
        be = {},
        ue = function(t) { return function(e) { return e === be && t } },
        ye = function() {
            function t(e) { for (var a in Vt(this, t), e) this[a] = e[a];
                this.state = { destroyed: !1, visible: !1, enabled: !0 }, this._ = ue({ mutationObservers: [] }) } return Qt(t, [{ key: 'enable', value: function() { this.state.enabled = !0 } }, { key: 'disable', value: function() { this.state.enabled = !1 } }, { key: 'show', value: function(t) { var e = this; if (!this.state.destroyed && this.state.enabled) { var a = this.popper,
                            i = this.reference,
                            o = this.options,
                            r = m(a),
                            n = r.tooltip,
                            s = r.backdrop,
                            l = r.content; return o.dynamicTitle && !i.getAttribute('data-original-title') || i.hasAttribute('disabled') ? void 0 : i.refObj || document.documentElement.contains(i) ? void(o.onShow.call(a, this), t = wt(void 0 === t ? o.duration : t, 0), vt([a, n, s], 0), a.style.visibility = 'visible', this.state.visible = !0, St.call(this, function() { if (e.state.visible) { if (Et.call(e) || e.popperInstance.scheduleUpdate(), Et.call(e)) { e.popperInstance.disableEventListeners(); var r = wt(o.delay, 0),
                                        d = e._(be).lastTriggerEvent;
                                    d && e._(be).followCursorListener(r && e._(be).lastMouseMoveEvent ? e._(be).lastMouseMoveEvent : d) }
                                vt([n, s, s ? l : null], t), s && getComputedStyle(s)[p('transform')], o.interactive && i.classList.add('tippy-active'), o.sticky && Xt.call(e), xt([n, s], 'visible'), Dt.call(e, t, function() { o.updateDuration || n.classList.add('tippy-notransition'), o.interactive && kt(a), i.setAttribute('aria-describedby', 'tippy-' + e.id), o.onShown.call(a, e) }) } })) : void this.destroy() } } }, { key: 'hide', value: function(t) { var e = this; if (!this.state.destroyed && this.state.enabled) { var a = this.popper,
                            i = this.reference,
                            o = this.options,
                            r = m(a),
                            p = r.tooltip,
                            n = r.backdrop,
                            s = r.content;
                        o.onHide.call(a, this), t = wt(void 0 === t ? o.duration : t, 1), o.updateDuration || p.classList.remove('tippy-notransition'), o.interactive && i.classList.remove('tippy-active'), a.style.visibility = 'hidden', this.state.visible = !1, vt([p, n, n ? s : null], t), xt([p, n], 'hidden'), o.interactive && -1 < o.trigger.indexOf('click') && kt(i), yt(function() { Dt.call(e, t, function() { e.state.visible || !o.appendTo.contains(a) || (!e._(be).isPreparingToShow && (document.removeEventListener('mousemove', e._(be).followCursorListener), e._(be).lastMouseMoveEvent = null), e.popperInstance && e.popperInstance.disableEventListeners(), i.removeAttribute('aria-describedby'), o.appendTo.removeChild(a), o.onHidden.call(a, e)) }) }) } } }, { key: 'destroy', value: function() { var t = this,
                        e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0]; if (!this.state.destroyed) { this.state.visible && this.hide(0), this.listeners.forEach(function(e) { t.reference.removeEventListener(e.event, e.handler) }), this.title && this.reference.setAttribute('title', this.title), delete this.reference._tippy;
                        ['data-original-title', 'data-tippy', 'data-tippy-delegate'].forEach(function(e) { t.reference.removeAttribute(e) }), this.options.target && e && a(this.reference.querySelectorAll(this.options.target)).forEach(function(t) { return t._tippy && t._tippy.destroy() }), this.popperInstance && this.popperInstance.destroy(), this._(be).mutationObservers.forEach(function(t) { t.disconnect() }), this.state.destroyed = !0 } } }]), t }(),
        ge = 1,
        we = !1; return Ht.version = '2.5.4', Ht.browser = qt, Ht.defaults = Kt, Ht.one = function(t, e) { return Ht(t, e, !0).tooltips[0] }, Ht.disableAnimations = function() { Kt.updateDuration = Kt.duration = 0, Kt.animateFill = !1 },
        function() { var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ''; if (zt && qt.supported) { var e = document.head || document.querySelector('head'),
                    a = document.createElement('style');
                a.type = 'text/css', e.insertBefore(a, e.firstChild), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t)) } }('.tippy-touch{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{max-width:350px;-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[data-html]{max-width:96%;max-width:calc(100% - 20px)}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 90%;transform-origin:0 90%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-50%,25%);transform:scale(6) translate(-50%,25%);opacity:1}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1) translate(-50%,25%);transform:scale(1) translate(-50%,25%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(90deg);transform:translateY(0) rotateX(90deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -90%;transform-origin:0 -90%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-50%,-125%);transform:scale(6) translate(-50%,-125%);opacity:1}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1) translate(-50%,-125%);transform:scale(1) translate(-50%,-125%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-90deg);transform:translateY(0) rotateX(-90deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:100% 0;transform-origin:100% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(40%,-50%);transform:scale(6) translate(40%,-50%);opacity:1}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1.5) translate(40%,-50%);transform:scale(1.5) translate(40%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-90deg);transform:translateX(0) rotateY(-90deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-100% 0;transform-origin:-100% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-140%,-50%);transform:scale(6) translate(-140%,-50%);opacity:1}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1.5) translate(-140%,-50%);transform:scale(1.5) translate(-140%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(90deg);transform:translateX(0) rotateY(90deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-animatefill] .tippy-content{transition:-webkit-clip-path cubic-bezier(.46,.1,.52,.98);transition:clip-path cubic-bezier(.46,.1,.52,.98);transition:clip-path cubic-bezier(.46,.1,.52,.98),-webkit-clip-path cubic-bezier(.46,.1,.52,.98)}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:26%;left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}body:not(.tippy-touch) .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(100% 100% at 50% 50%);clip-path:ellipse(100% 100% at 50% 50%)}body:not(.tippy-touch) .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(5% 50% at 50% 50%);clip-path:ellipse(5% 50% at 50% 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=right] .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(135% 100% at 0 50%);clip-path:ellipse(135% 100% at 0 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=right] .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(40% 100% at 0 50%);clip-path:ellipse(40% 100% at 0 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=left] .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(135% 100% at 100% 50%);clip-path:ellipse(135% 100% at 100% 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=left] .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(40% 100% at 100% 50%);clip-path:ellipse(40% 100% at 100% 50%)}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}'), Ht });