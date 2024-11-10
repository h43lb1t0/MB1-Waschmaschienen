(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const In=!1;var Rt=Array.isArray,nt=Array.from,$n=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,Rn=Object.getOwnPropertyDescriptors,qn=Object.getPrototypeOf;const oe=()=>{};function Pn(e){return e()}function Ke(e){for(var t=0;t<e.length;t++)e[t]()}const R=2,qt=4,be=8,rt=16,F=32,$e=64,X=128,Me=256,D=512,U=1024,ye=2048,C=4096,we=8192,Bn=16384,it=32768,Vn=65536,Un=1<<18,Pt=1<<19,Ce=Symbol("$state");function Bt(e){return e===this.v}function Vt(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function jn(e){return!Vt(e,this.v)}function Hn(e){throw new Error("effect_in_teardown")}function Wn(){throw new Error("effect_in_unowned_derived")}function Yn(e){throw new Error("effect_orphan")}function zn(){throw new Error("effect_update_depth_exceeded")}function Gn(){throw new Error("state_unsafe_local_read")}function Kn(){throw new Error("state_unsafe_mutation")}let Ee=!1;function Jn(){Ee=!0}function Fe(e){return{f:0,v:e,reactions:null,equals:Bt,version:0}}function Ut(e,t=!1){var r;const n=Fe(e);return t||(n.equals=jn),Ee&&w!==null&&w.l!==null&&((r=w.l).s??(r.s=[])).push(n),n}function yt(e,t){return jt(e,ke(()=>b(e))),t}function jt(e,t){return g!==null&&Pe()&&g.f&(R|rt)&&(J===null||!J.includes(e))&&Kn(),Ht(e,t)}function Ht(e,t){return e.equals(t)||(e.v=t,e.version=an(),Wt(e,U),Pe()&&h!==null&&h.f&D&&!(h.f&F)&&(T!==null&&T.includes(e)?(N(h,U),Ve(h)):V===null?dr([e]):V.push(e))),t}function Wt(e,t){var n=e.reactions;if(n!==null)for(var r=Pe(),i=n.length,l=0;l<i;l++){var o=n[l],s=o.f;s&U||!r&&o===h||(N(o,t),s&(D|X)&&(s&R?Wt(o,ye):Ve(o)))}}const Xn=1,Zn=2,Qn=16,er=1,tr=2;let nr=!1;function wt(e){return e!==null&&typeof e=="object"&&Ce in e?e[Ce]:e}function rr(e,t){return Object.is(wt(e),wt(t))}var Et,Yt,zt;function ir(){if(Et===void 0){Et=window;var e=Element.prototype,t=Node.prototype;Yt=bt(t,"firstChild").get,zt=bt(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function Gt(e=""){return document.createTextNode(e)}function Ne(e){return Yt.call(e)}function Re(e){return zt.call(e)}function m(e,t){return Ne(e)}function Ge(e,t){{var n=Ne(e);return n instanceof Comment&&n.data===""?Re(n):n}}function x(e,t=1,n=!1){let r=e;for(;t--;)r=Re(r);return r}function lr(e){e.textContent=""}function or(e){var t=R|U;h===null?t|=X:h.f|=Pt;const n={children:null,ctx:w,deps:null,equals:Bt,f:t,fn:e,reactions:null,v:null,version:0,parent:h};if(g!==null&&g.f&R){var r=g;(r.children??(r.children=[])).push(n)}return n}function Kt(e){var t=e.children;if(t!==null){e.children=null;for(var n=0;n<t.length;n+=1){var r=t[n];r.f&R?lt(r):Z(r)}}}function Jt(e){var t,n=h;H(e.parent);try{Kt(e),t=fn(e)}finally{H(n)}return t}function Xt(e){var t=Jt(e),n=(le||e.f&X)&&e.deps!==null?ye:D;N(e,n),e.equals(t)||(e.v=t,e.version=an())}function lt(e){Kt(e),me(e,0),N(e,we),e.v=e.children=e.deps=e.ctx=e.reactions=null}function Zt(e){h===null&&g===null&&Yn(),g!==null&&g.f&X&&Wn(),st&&Hn()}function ur(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function se(e,t,n,r=!0){var i=(e&$e)!==0,l=h,o={ctx:w,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|U,first:null,fn:t,last:null,next:null,parent:i?null:l,prev:null,teardown:null,transitions:null,version:0};if(n){var s=ue;try{xt(!0),Be(o),o.f|=Bn}catch(u){throw Z(o),u}finally{xt(s)}}else t!==null&&Ve(o);var f=n&&o.deps===null&&o.first===null&&o.nodes_start===null&&o.teardown===null&&(o.f&Pt)===0;if(!f&&!i&&r&&(l!==null&&ur(o,l),g!==null&&g.f&R)){var a=g;(a.children??(a.children=[])).push(o)}return o}function Qt(e){const t=se(be,null,!1);return N(t,D),t.teardown=e,t}function Je(e){Zt();var t=h!==null&&(h.f&F)!==0&&w!==null&&!w.m;if(t){var n=w;(n.e??(n.e=[])).push({fn:e,effect:h,reaction:g})}else{var r=qe(e);return r}}function sr(e){return Zt(),en(e)}function ar(e){const t=se($e,e,!0);return()=>{Z(t)}}function qe(e){return se(qt,e,!1)}function en(e){return se(be,e,!0)}function P(e){return ot(e)}function ot(e,t=0){return se(be|rt|t,e,!0)}function ge(e,t=!0){return se(be|F,e,!0,t)}function tn(e){var t=e.teardown;if(t!==null){const n=st,r=g;kt(!0),j(null);try{t.call(null)}finally{kt(n),j(r)}}}function nn(e){var t=e.deriveds;if(t!==null){e.deriveds=null;for(var n=0;n<t.length;n+=1)lt(t[n])}}function rn(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){var r=n.next;Z(n,t),n=r}}function fr(e){for(var t=e.first;t!==null;){var n=t.next;t.f&F||Z(t),t=n}}function Z(e,t=!0){var n=!1;if((t||e.f&Un)&&e.nodes_start!==null){for(var r=e.nodes_start,i=e.nodes_end;r!==null;){var l=r===i?null:Re(r);r.remove(),r=l}n=!0}rn(e,t&&!n),nn(e),me(e,0),N(e,we);var o=e.transitions;if(o!==null)for(const f of o)f.stop();tn(e);var s=e.parent;s!==null&&s.first!==null&&ln(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.parent=e.fn=e.nodes_start=e.nodes_end=null}function ln(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Xe(e,t){var n=[];ut(e,n,!0),on(n,()=>{Z(e),t&&t()})}function on(e,t){var n=e.length;if(n>0){var r=()=>--n||t();for(var i of e)i.out(r)}else t()}function ut(e,t,n){if(!(e.f&C)){if(e.f^=C,e.transitions!==null)for(const o of e.transitions)(o.is_global||n)&&t.push(o);for(var r=e.first;r!==null;){var i=r.next,l=(r.f&it)!==0||(r.f&F)!==0;ut(r,t,l?n:!1),r=i}}}function Le(e){un(e,!0)}function un(e,t){if(e.f&C){xe(e)&&Be(e),e.f^=C;for(var n=e.first;n!==null;){var r=n.next,i=(n.f&it)!==0||(n.f&F)!==0;un(n,i?t:!1),n=r}if(e.transitions!==null)for(const l of e.transitions)(l.is_global||t)&&l.in()}}let Ze=!1,Qe=[];function cr(){Ze=!1;const e=Qe.slice();Qe=[],Ke(e)}function _r(e){Ze||(Ze=!0,queueMicrotask(cr)),Qe.push(e)}function vr(e){throw new Error("lifecycle_outside_component")}let Ie=!1,ue=!1,st=!1;function xt(e){ue=e}function kt(e){st=e}let et=[],pe=0;let g=null;function j(e){g=e}let h=null;function H(e){h=e}let J=null,T=null,A=0,V=null;function dr(e){V=e}let sn=0,le=!1,ve=!1,ie=new Set,w=null;function an(){return++sn}function Pe(){return!Ee||w!==null&&w.l===null}function xe(e){var o,s;var t=e.f;if(t&U)return!0;if(t&ye){var n=e.deps,r=(t&X)!==0;if(n!==null){var i;if(t&Me){for(i=0;i<n.length;i++)((o=n[i]).reactions??(o.reactions=[])).push(e);e.f^=Me}for(i=0;i<n.length;i++){var l=n[i];if(xe(l)&&Xt(l),r&&h!==null&&!le&&!((s=l==null?void 0:l.reactions)!=null&&s.includes(e))&&(l.reactions??(l.reactions=[])).push(e),l.version>e.version)return!0}}r||N(e,D)}return!1}function pr(e,t,n){throw e}function fn(e){var c;var t=T,n=A,r=V,i=g,l=le,o=J,s=w,f=e.f;T=null,A=0,V=null,g=f&(F|$e)?null:e,le=!ue&&(f&X)!==0,J=null,w=e.ctx;try{var a=(0,e.fn)(),u=e.deps;if(T!==null){var _;if(me(e,A),u!==null&&A>0)for(u.length=A+T.length,_=0;_<T.length;_++)u[A+_]=T[_];else e.deps=u=T;if(!le)for(_=A;_<u.length;_++)((c=u[_]).reactions??(c.reactions=[])).push(e)}else u!==null&&A<u.length&&(me(e,A),u.length=A);return a}finally{T=t,A=n,V=r,g=i,le=l,J=o,w=s}}function hr(e,t){let n=t.reactions;if(n!==null){var r=n.indexOf(e);if(r!==-1){var i=n.length-1;i===0?n=t.reactions=null:(n[r]=n[i],n.pop())}}n===null&&t.f&R&&(T===null||!T.includes(t))&&(N(t,ye),t.f&(X|Me)||(t.f^=Me),me(t,0))}function me(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)hr(e,n[r])}function Be(e){var t=e.f;if(!(t&we)){N(e,D);var n=h;h=e;try{t&rt?fr(e):rn(e),nn(e),tn(e);var r=fn(e);e.teardown=typeof r=="function"?r:null,e.version=sn}catch(i){pr(i)}finally{h=n}}}function gr(){pe>1e3&&(pe=0,zn()),pe++}function mr(e){var t=e.length;if(t!==0){gr();var n=ue;ue=!0;try{for(var r=0;r<t;r++){var i=e[r];i.f&D||(i.f^=D);var l=[];cn(i,l),br(l)}}finally{ue=n}}}function br(e){var t=e.length;if(t!==0)for(var n=0;n<t;n++){var r=e[n];!(r.f&(we|C))&&xe(r)&&(Be(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?ln(r):r.fn=null))}}function yr(){if(Ie=!1,pe>1001)return;const e=et;et=[],mr(e),Ie||(pe=0)}function Ve(e){Ie||(Ie=!0,queueMicrotask(yr));for(var t=e;t.parent!==null;){t=t.parent;var n=t.f;if(n&($e|F)){if(!(n&D))return;t.f^=D}}et.push(t)}function cn(e,t){var n=e.first,r=[];e:for(;n!==null;){var i=n.f,l=(i&F)!==0,o=l&&(i&D)!==0;if(!o&&!(i&C))if(i&be){l?n.f^=D:xe(n)&&Be(n);var s=n.first;if(s!==null){n=s;continue}}else i&qt&&r.push(n);var f=n.next;if(f===null){let _=n.parent;for(;_!==null;){if(e===_)break e;var a=_.next;if(a!==null){n=a;continue e}_=_.parent}}n=f}for(var u=0;u<r.length;u++)s=r[u],t.push(s),cn(s,t)}function b(e){var s;var t=e.f,n=(t&R)!==0;if(n&&t&we){var r=Jt(e);return lt(e),r}if(ve&&ie.add(e),g!==null){J!==null&&J.includes(e)&&Gn();var i=g.deps;T===null&&i!==null&&i[A]===e?A++:T===null?T=[e]:T.push(e),V!==null&&h!==null&&h.f&D&&!(h.f&F)&&V.includes(e)&&(N(h,U),Ve(h))}else if(n&&e.deps===null){var l=e,o=l.parent;o!==null&&!((s=o.deriveds)!=null&&s.includes(l))&&(o.deriveds??(o.deriveds=[])).push(l)}return n&&(l=e,xe(l)&&Xt(l)),e.v}function G(e){var t=ve,n=ie;ve=!0,ie=new Set;var r=ie,i;try{ke(e)}finally{if(ve=t,ve)for(i of ie)n.add(i);ie=n}for(i of r)if(i.f&Vn)for(const l of i.deps||[])l.f&R||yt(l,null);else yt(i,null)}function ke(e){const t=g;try{return g=null,e()}finally{g=t}}const wr=~(U|ye|D);function N(e,t){e.f=e.f&wr|t}function _n(e,t=!1,n){w={p:w,c:null,e:null,m:!1,s:e,x:null,l:null},Ee&&!t&&(w.l={s:null,u:null,r1:[],r2:Fe(!1)})}function vn(e){const t=w;if(t!==null){const o=t.e;if(o!==null){var n=h,r=g;t.e=null;try{for(var i=0;i<o.length;i++){var l=o[i];H(l.effect),j(l.reaction),qe(l.fn)}}finally{H(n),j(r)}}w=t.p,t.m=!0}return{}}function Er(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(Ce in e)tt(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&Ce in n&&tt(n)}}}function tt(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let r in e)try{tt(e[r],t)}catch{}const n=qn(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=Rn(n);for(let i in r){const l=r[i].get;if(l)try{l.call(e)}catch{}}}}}let Tt=!1;function xr(){Tt||(Tt=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function dn(e){var t=g,n=h;j(null),H(null);try{return e()}finally{j(t),H(n)}}function pn(e,t,n,r=n){e.addEventListener(t,()=>dn(n));const i=e.__on_r;i?e.__on_r=()=>{i(),r()}:e.__on_r=r,xr()}const kr=new Set,St=new Set;function Tr(e,t,n,r){function i(l){if(r.capture||de.call(t,l),!l.cancelBubble)return dn(()=>n.call(this,l))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?_r(()=>{t.addEventListener(e,i,r)}):t.addEventListener(e,i,r),i}function ce(e,t,n,r,i){var l={capture:r,passive:i},o=Tr(e,t,n,l);(t===document.body||t===window||t===document)&&Qt(()=>{t.removeEventListener(e,o,l)})}function de(e){var S;var t=this,n=t.ownerDocument,r=e.type,i=((S=e.composedPath)==null?void 0:S.call(e))||[],l=i[0]||e.target,o=0,s=e.__root;if(s){var f=i.indexOf(s);if(f!==-1&&(t===document||t===window)){e.__root=t;return}var a=i.indexOf(t);if(a===-1)return;f<=a&&(o=f)}if(l=i[o]||e.target,l!==t){$n(e,"currentTarget",{configurable:!0,get(){return l||n}});var u=g,_=h;j(null),H(null);try{for(var c,d=[];l!==null;){var E=l.assignedSlot||l.parentNode||l.host||null;try{var k=l["__"+r];if(k!==void 0&&!l.disabled)if(Rt(k)){var[L,...y]=k;L.apply(l,[e,...y])}else k.call(l,e)}catch(q){c?d.push(q):c=q}if(e.cancelBubble||E===t||E===null)break;l=E}if(c){for(let q of d)queueMicrotask(()=>{throw q});throw c}}finally{e.__root=t,delete e.currentTarget,j(u),H(_)}}}function Sr(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function Dt(e,t){var n=h;n.nodes_start===null&&(n.nodes_start=e,n.nodes_end=t)}function Q(e,t){var n=(t&er)!==0,r=(t&tr)!==0,i,l=!e.startsWith("<!>");return()=>{i===void 0&&(i=Sr(l?e:"<!>"+e),n||(i=Ne(i)));var o=r?document.importNode(i,!0):i.cloneNode(!0);if(n){var s=Ne(o),f=o.lastChild;Dt(s,f)}else Dt(o,o);return o}}function K(e,t){e!==null&&e.before(t)}const Dr=["touchstart","touchmove"];function Ar(e){return Dr.includes(e)}function O(e,t){var n=t==null?"":typeof t=="object"?t+"":t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=n==null?"":n+"")}function Or(e,t){return Mr(e,t)}const ne=new Map;function Mr(e,{target:t,anchor:n,props:r={},events:i,context:l,intro:o=!0}){ir();var s=new Set,f=_=>{for(var c=0;c<_.length;c++){var d=_[c];if(!s.has(d)){s.add(d);var E=Ar(d);t.addEventListener(d,de,{passive:E});var k=ne.get(d);k===void 0?(document.addEventListener(d,de,{passive:E}),ne.set(d,1)):ne.set(d,k+1)}}};f(nt(kr)),St.add(f);var a=void 0,u=ar(()=>{var _=n??t.appendChild(Gt());return ge(()=>{if(l){_n({});var c=w;c.c=l}i&&(r.$$events=i),a=e(_,r)||{},l&&vn()}),()=>{var E;for(var c of s){t.removeEventListener(c,de);var d=ne.get(c);--d===0?(document.removeEventListener(c,de),ne.delete(c)):ne.set(c,d)}St.delete(f),At.delete(a),_!==n&&((E=_.parentNode)==null||E.removeChild(_))}});return At.set(a,u),a}let At=new WeakMap;function Oe(e,t,n,r=null,i=!1){var l=e,o=null,s=null,f=null,a=i?it:0;ot(()=>{f!==(f=!!t())&&(f?(o?Le(o):o=ge(()=>n(l)),s&&Xe(s,()=>{s=null})):(s?Le(s):r&&(s=ge(()=>r(l))),o&&Xe(o,()=>{o=null})))},a)}function Cr(e,t,n,r){for(var i=[],l=t.length,o=0;o<l;o++)ut(t[o].e,i,!0);var s=l>0&&i.length===0&&n!==null;if(s){var f=n.parentNode;lr(f),f.append(n),r.clear(),B(e,t[0].prev,t[l-1].next)}on(i,()=>{for(var a=0;a<l;a++){var u=t[a];s||(r.delete(u.k),B(e,u.prev,u.next)),Z(u.e,!s)}})}function Fr(e,t,n,r,i,l=null){var o=e,s={flags:t,items:new Map,first:null};{var f=e;o=f.appendChild(Gt())}var a=null,u=!1;ot(()=>{var _=n(),c=Rt(_)?_:_==null?[]:nt(_),d=c.length;if(!(u&&d===0)){u=d===0;{var E=g;Nr(c,s,o,i,t,(E.f&C)!==0,r)}l!==null&&(d===0?a?Le(a):a=ge(()=>l(o)):a!==null&&Xe(a,()=>{a=null})),n()}})}function Nr(e,t,n,r,i,l,o){var s=e.length,f=t.items,a=t.first,u=a,_,c=null,d=[],E=[],k,L,y,S;for(S=0;S<s;S+=1){if(k=e[S],L=o(k,S),y=f.get(L),y===void 0){var q=u?u.e.nodes_start:n;c=Ir(q,t,c,c===null?t.first:c.next,k,L,S,r,i),f.set(L,c),d=[],E=[],u=c.next;continue}if(Lr(y,k,S),y.e.f&C&&Le(y.e),y!==u){if(_!==void 0&&_.has(y)){if(d.length<E.length){var W=E[0],M;c=W.prev;var ee=d[0],Y=d[d.length-1];for(M=0;M<d.length;M+=1)Ot(d[M],W,n);for(M=0;M<E.length;M+=1)_.delete(E[M]);B(t,ee.prev,Y.next),B(t,c,ee),B(t,Y,W),u=W,c=Y,S-=1,d=[],E=[]}else _.delete(y),Ot(y,u,n),B(t,y.prev,y.next),B(t,y,c===null?t.first:c.next),B(t,c,y),c=y;continue}for(d=[],E=[];u!==null&&u.k!==L;)(l||!(u.e.f&C))&&(_??(_=new Set)).add(u),E.push(u),u=u.next;if(u===null)continue;y=u}d.push(y),c=y,u=y.next}if(u!==null||_!==void 0){for(var te=_===void 0?[]:nt(_);u!==null;)(l||!(u.e.f&C))&&te.push(u),u=u.next;var Te=te.length;if(Te>0){var Ue=s===0?n:null;Cr(t,te,Ue,f)}}h.first=t.first&&t.first.e,h.last=c&&c.e}function Lr(e,t,n,r){Ht(e.v,t),e.i=n}function Ir(e,t,n,r,i,l,o,s,f){var a=(f&Xn)!==0,u=(f&Qn)===0,_=a?u?Ut(i):Fe(i):i,c=f&Zn?Fe(o):o,d={i:c,v:_,k:l,a:null,e:null,prev:n,next:r};try{return d.e=ge(()=>s(e,_,c),nr),d.e.prev=n&&n.e,d.e.next=r&&r.e,n===null?t.first=d:(n.next=d,n.e.next=d.e),r!==null&&(r.prev=d,r.e.prev=d.e),d}finally{}}function Ot(e,t,n){for(var r=e.next?e.next.e.nodes_start:n,i=t?t.e.nodes_start:n,l=e.e.nodes_start;l!==r;){var o=Re(l);i.before(l),l=o}}function B(e,t,n){t===null?e.first=n:(t.next=n,t.e.next=n&&n.e),n!==null&&(n.prev=t,n.e.prev=t&&t.e)}function Mt(e,t,n=t){var r=Pe();pn(e,"input",()=>{var i=Ct(e)?Ft(e.value):e.value;n(i),r&&i!==(i=t())&&(e.value=i??"")}),en(()=>{var i=t();Ct(e)&&i===Ft(e.value)||e.type==="date"&&!i&&!e.value||i!==e.value&&(e.value=i??"")})}function Ct(e){var t=e.type;return t==="number"||t==="range"}function Ft(e){return e===""?null:+e}function hn(e,t,n){if(e.multiple)return Rr(e,t);for(var r of e.options){var i=he(r);if(rr(i,t)){r.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function $r(e,t){qe(()=>{var n=new MutationObserver(()=>{var r=e.__value;hn(e,r)});return n.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),()=>{n.disconnect()}})}function Nt(e,t,n=t){var r=!0;pn(e,"change",()=>{var i;if(e.multiple)i=[].map.call(e.querySelectorAll(":checked"),he);else{var l=e.querySelector(":checked");i=l&&he(l)}n(i)}),qe(()=>{var i=t();if(hn(e,i,r),r&&i===void 0){var l=e.querySelector(":checked");l!==null&&(i=he(l),n(i))}e.__value=i,r=!1}),$r(e)}function Rr(e,t){for(var n of e.options)n.selected=~t.indexOf(he(n))}function he(e){return"__value"in e?e.__value:e.value}function qr(e=!1){const t=w,n=t.l.u;if(!n)return;let r=()=>Er(t.s);if(e){let i=0,l={};const o=or(()=>{let s=!1;const f=t.s;for(const a in f)f[a]!==l[a]&&(l[a]=f[a],s=!0);return s&&i++,i});r=()=>b(o)}n.b.length&&sr(()=>{Lt(t,r),Ke(n.b)}),Je(()=>{const i=ke(()=>n.m.map(Pn));return()=>{for(const l of i)typeof l=="function"&&l()}}),n.a.length&&Je(()=>{Lt(t,r),Ke(n.a)})}function Lt(e,t){if(e.l.s)for(const n of e.l.s)b(n);t()}function Pr(e,t,n){if(e==null)return t(void 0),oe;const r=ke(()=>e.subscribe(t,n));return r.unsubscribe?()=>r.unsubscribe():r}function It(e,t,n){const r=n[t]??(n[t]={store:null,source:Ut(void 0),unsubscribe:oe});if(r.store!==e)if(r.unsubscribe(),r.store=e??null,e==null)r.source.v=void 0,r.unsubscribe=oe;else{var i=!0;r.unsubscribe=Pr(e,l=>{i?r.source.v=l:jt(r.source,l)}),i=!1}return b(r.source)}function gn(e,t){return e.set(t),t}function _e(e,t){var n=e[t];n.store!==null&&gn(n.store,n.source.v)}function Br(){const e={};return Qt(()=>{for(var t in e)e[t].unsubscribe()}),e}function Vr(e){w===null&&vr(),Ee&&w.l!==null?Ur(w).m.push(e):Je(()=>{const t=ke(e);if(typeof t=="function")return t})}function Ur(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const jr="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(jr);Jn();const re=[];function $t(e,t=oe){let n=null;const r=new Set;function i(s){if(Vt(e,s)&&(e=s,n)){const f=!re.length;for(const a of r)a[1](),re.push(a,e);if(f){for(let a=0;a<re.length;a+=2)re[a][0](re[a+1]);re.length=0}}}function l(s){i(s(e))}function o(s,f=oe){const a=[s,f];return r.add(a),r.size===1&&(n=t(i,l)||oe),s(e),()=>{r.delete(a),r.size===0&&n&&(n(),n=null)}}return{set:i,update:l,subscribe:o}}var Hr=Q('<p class="text-sm text-red-500"></p> <p class="text-sm text-red-500 mb-6">DEV MODE</p>',1),Wr=Q('<p class="text-gray-500">No machines available at the moment.</p>'),Yr=Q('<p class="text-sm text-green-400"> </p> <p class="text-sm text-green-400"> </p>',1),zr=Q('<p class="text-sm text-red-400"> </p>'),Gr=Q('<div class="mt-4"><!></div> <button class="bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600"> </button>',1),Kr=Q('<div class="bg-gray-700 p-4 rounded-md shadow border border-gray-600"><h2 class="text-xl font-semibold mb-2"> </h2> <label class="block mb-2"><span class="text-sm font-medium"> </span> <select class="border p-2 rounded-md w-full bg-gray-600 text-white"><option> </option><option> </option></select></label> <div class="mt-4"><label class="block mb-4"><span class="text-sm font-medium"> </span> <div class="flex items-center space-x-2 mt-2"><input type="number" min="0" max="4" placeholder="Hours (optional)" id="hours" class="no-arrows border p-2 rounded-md w-24 bg-gray-600 text-white svelte-1fdjqsk"> <input type="number" min="0" max="59" placeholder="Minutes" id="minutes" class="no-arrows border p-2 rounded-md w-24 bg-gray-600 text-white svelte-1fdjqsk"> <button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Set Duration</button></div></label></div> <!></div>'),Jr=Q('<div class="min-h-screen bg-gray-900 text-white py-6"><div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-md shadow-md"><div class="language-toggle mb-6 flex items-center"><label for="language" class="mr-3">Select Language:</label> <select id="language" class="border rounded-md p-2 bg-gray-700 text-white"><option>English</option><option>Deutsch</option><option>Русский</option></select></div> <h1 class="text-2xl font-bold mb-4"> </h1> <p class="text-sm text-gray-400 mb-6"> </p> <!> <!> <div class="container grid grid-cols-1 md:grid-cols-2 gap-6"></div> <div class="mt-12"><p class="text-sm text-gray-500"> </p> <hr class="my-6"> <p class="text-gray-400 mb-4">Here you can enter which washing machines work and which do not. You can also specify until when your washing machine is running, so that nobody has to run to the cellar just to find no free washing machine. Everything is completely anonymous. The more of us who use this, the better.</p> <p class="text-blue-400"><a href="https://github.com/h43lb1t0/MB1-Waschmaschienen" target="_blank" class="hover:underline">Source code: Github</a></p> <hr class="my-6"> <div><h4 class="text-lg font-semibold mb-2">Impressum:</h4> <p class="text-sm">Tom Haelbich</p> <p class="text-sm">Marksburgstr. 1</p> <p class="text-sm">10318 Berlin</p></div></div></div></div>');function Xr(e,t){_n(t,!1);const n=Br(),r=()=>It(a,"$language",n),i=()=>It(l,"$machines",n),l=$t([]),o="https://mb1-api.haelbich.org/machines",s="true",f=localStorage.getItem("preferredLanguage")||"en",a=$t(f),u={en:{title:"Washing Machine Status",status:"Status",info:"The information here is of course not 100% reliable.",usageFor:"Usage Duration (hours and minutes)",working:"Working",broken:"Broken",finished:"Finished",alert:"The duration must be greater than zero.",createdBy:"Created by Tom (E05)",timeRemaining:"Time Remaining",timeElapsed:"Done since",doneAt:"Will be done at"},de:{title:"Status der Waschmaschinenen",status:"Status",info:"Die Informationen hier sind natürlich nicht 100%ig zuverlässig.",usageFor:"Nutzungsdauer (Stunden und Minuten)",working:"Funktioniert",broken:"Defekt",finished:"Fertig",alert:"Die Dauer muss größer als null sein.",createdBy:"Erstellt von Tom (E05)",timeRemaining:"Verbleibende Zeit",timeElapsed:"Fertig seit",doneAt:"Fertig um"},ru:{title:"Статус стиральной машины",status:"Статус",info:"Разумеется, информация здесь не является на 100% достоверной.",usageFor:"Длительность использования (часы и минуты)",working:"Работает",broken:"Неисправна",finished:"Завершено",alert:"Длительность должна быть больше нуля.",createdBy:"Создано Томом (E05)",timeRemaining:"Осталось времени",timeElapsed:"Выполнено с тех пор",doneAt:"Будет готово в"}};Vr(()=>{_()}),a.subscribe(p=>{localStorage.setItem("preferredLanguage",p)});async function _(){try{const p=await fetch(o);if(!p.ok)throw new Error("Network response was not ok");const v=await p.json();l.set(v)}catch(p){console.error("Failed to fetch machines:",p),l.set([])}}async function c(p){try{if(!(await fetch(`${o}/${p.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:p.status,usage_until:p.usage_until,start_time:p.start_time})})).ok)throw new Error("Failed to update machine");await _()}catch(v){console.error("Failed to update machine:",v)}}function d(p,v){p.status=v.target.value,c(p)}function E(p,v,I){const z=(v||0)*60+(I||0);if(v===0&&I===0||I>=60){alert(u[r()].alert);return}if(z>0){const ae=new Date,Se=new Date(ae.getTime()+z*6e4);p.start_time=ae.toISOString(),p.usage_until=Se.toISOString(),c(p)}else alert(u[r()].alert)}function k(p){const v=new Date,z=new Date(p)-v;return Math.floor(z/6e4)}function L(p){return new Date(p).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}function y(p){const v=p.key;!/^[0-9]$/.test(v)&&v!=="Backspace"&&v!=="Delete"&&v!=="ArrowLeft"&&v!=="ArrowRight"&&p.preventDefault()}qr();var S=Jr(),q=m(S),W=m(q),M=x(m(W),2);P(()=>{r(),G(()=>{})});var ee=m(M);ee.value=(ee.__value="en")==null?"":"en";var Y=x(ee);Y.value=(Y.__value="de")==null?"":"de";var te=x(Y);te.value=(te.__value="ru")==null?"":"ru";var Te=x(W,2),Ue=m(Te),at=x(Te,2),mn=m(at),ft=x(at,2);Oe(ft,()=>s,p=>{var v=Hr(),I=Ge(v);I.textContent=`API URL: ${o}`,K(p,v)});var ct=x(ft,2);Oe(ct,()=>i().length===0,p=>{var v=Wr();K(p,v)});var _t=x(ct,2);Fr(_t,5,i,p=>p.id,(p,v)=>{var I=Kr(),z=m(I),ae=m(z),Se=x(z,2),vt=m(Se),En=m(vt),je=x(vt,2);P(()=>{b(v).status,G(()=>{r()})});var De=m(je);De.value=(De.__value="working")==null?"":"working";var xn=m(De),He=x(De);He.value=(He.__value="broken")==null?"":"broken";var kn=m(He),dt=x(Se,2),Tn=m(dt),pt=m(Tn),Sn=m(pt),Dn=x(pt,2),We=m(Dn),Ye=x(We,2),An=x(Ye,2),On=x(dt,2);Oe(On,()=>b(v).usage_until,$=>{var ht=Gr(),gt=Ge(ht),Mn=m(gt);Oe(Mn,()=>k(b(v).usage_until)>0,ze=>{var fe=Yr(),Ae=Ge(fe),Fn=m(Ae);P(()=>O(Fn,`${u[r()].timeRemaining??""}: ${k(b(v).usage_until)??""} minutes`));var Nn=x(Ae,2),Ln=m(Nn);P(()=>O(Ln,`${u[r()].doneAt??""}: ${L(b(v).usage_until)??""}`)),K(ze,fe)},ze=>{var fe=zr(),Ae=m(fe);P(()=>O(Ae,`${u[r()].timeElapsed??""}: ${k(b(v).usage_until)??""} minutes`)),K(ze,fe)});var mt=x(gt,2),Cn=m(mt);P(()=>O(Cn,u[r()].finished)),ce("click",mt,()=>{b(v).usage_until=null,G(()=>i()),_e(n,"$machines"),b(v).start_time=null,G(()=>i()),_e(n,"$machines"),c(b(v))}),K($,ht)}),P(()=>{O(ae,b(v).name),O(En,`${u[r()].status??""}:`),O(xn,u[r()].working),O(kn,u[r()].broken),O(Sn,`${u[r()].usageFor??""}:`)}),Nt(je,()=>b(v).status,$=>(b(v).status=$,G(()=>i()),_e(n,"$machines"))),ce("change",je,$=>d(b(v),$)),Mt(We,()=>b(v).hours,$=>(b(v).hours=$,G(()=>i()),_e(n,"$machines"))),ce("keydown",We,y),Mt(Ye,()=>b(v).minutes,$=>(b(v).minutes=$,G(()=>i()),_e(n,"$machines"))),ce("keydown",Ye,y),ce("click",An,()=>E(b(v),parseInt(b(v).hours),parseInt(b(v).minutes))),K(p,I)});var bn=x(_t,2),yn=m(bn),wn=m(yn);P(()=>{O(Ue,u[r()].title),O(mn,u[r()].info),O(wn,u[r()].createdBy)}),Nt(M,r,p=>gn(a,p)),K(e,S),vn()}Or(Xr,{target:document.getElementById("app")});
