(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[107],{7357:function(e,t,r){"use strict";r.d(t,{Z:function(){return y}});var n=r(7462),l=r(3366),o=r(7294),u=r(6010),a=r(2030),s=r(6523),i=r(9707),d=r(9718),c=r(5893);let f=["className","component"];var _=r(7078),h=r(1265),p=r(606);let m=(0,h.Z)(),b=function(e={}){let{themeId:t,defaultTheme:r,defaultClassName:_="MuiBox-root",generateClassName:h}=e,p=(0,a.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(s.Z),m=o.forwardRef(function(e,o){let a=(0,d.Z)(r),s=(0,i.Z)(e),{className:m,component:b="div"}=s,y=(0,l.Z)(s,f);return(0,c.jsx)(p,(0,n.Z)({as:b,ref:o,className:(0,u.Z)(m,h?h(_):_),theme:t&&a[t]||a},y))});return m}({themeId:p.Z,defaultTheme:m,defaultClassName:"MuiBox-root",generateClassName:_.Z.generate});var y=b},9707:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(7462),l=r(3366),o=r(9766),u=r(4920);let a=["sx"],s=e=>{var t,r;let n={systemProps:{},otherProps:{}},l=null!=(t=null==e?void 0:null==(r=e.theme)?void 0:r.unstable_sxConfig)?t:u.Z;return Object.keys(e).forEach(t=>{l[t]?n.systemProps[t]=e[t]:n.otherProps[t]=e[t]}),n};function i(e){let t;let{sx:r}=e,u=(0,l.Z)(e,a),{systemProps:i,otherProps:d}=s(u);return t=Array.isArray(r)?[i,...r]:"function"==typeof r?(...e)=>{let t=r(...e);return(0,o.P)(t)?(0,n.Z)({},i,t):i}:(0,n.Z)({},i,r),(0,n.Z)({},d,{sx:t})}},1394:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/Editor",function(){return r(8373)}])},5677:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{noSSR:function(){return a},default:function(){return s}});let n=r(4788),l=r(8754),o=(r(7294),l._(r(8976)));function u(e){return{default:(null==e?void 0:e.default)||e}}function a(e,t){return delete t.webpack,delete t.modules,e(t)}function s(e,t){let r=o.default,l={loading:e=>{let{error:t,isLoading:r,pastDelay:n}=e;return null}};e instanceof Promise?l.loader=()=>e:"function"==typeof e?l.loader=e:"object"==typeof e&&(l=n._({},l,e)),l=n._({},l,t);let s=l.loader,i=()=>null!=s?s().then(u):Promise.resolve(u(()=>null));return(l.loadableGenerated&&(l=n._({},l,l.loadableGenerated),delete l.loadableGenerated),"boolean"!=typeof l.ssr||l.ssr)?r(n._({},l,{loader:i})):(delete l.webpack,delete l.modules,a(r,l))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2254:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return o}});let n=r(8754),l=n._(r(7294)),o=l.default.createContext(null)},8976:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return h}});let n=r(4788),l=r(8754),o=l._(r(7294)),u=r(2254),a=[],s=[],i=!1;function d(e){let t=e(),r={loading:!0,loaded:null,error:null};return r.promise=t.then(e=>(r.loading=!1,r.loaded=e,e)).catch(e=>{throw r.loading=!1,r.error=e,e}),r}class c{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state=n._({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function f(e){return function(e,t){let r=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),n=null;function l(){if(!n){let t=new c(e,r);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!i){let e=r.webpack?r.webpack():r.modules;e&&s.push(t=>{for(let r of e)if(-1!==t.indexOf(r))return l()})}function a(e,t){!function(){l();let e=o.default.useContext(u.LoadableContext);e&&Array.isArray(r.modules)&&r.modules.forEach(t=>{e(t)})}();let a=o.default.useSyncExternalStore(n.subscribe,n.getCurrentValue,n.getCurrentValue);return o.default.useImperativeHandle(t,()=>({retry:n.retry}),[]),o.default.useMemo(()=>{var t;return a.loading||a.error?o.default.createElement(r.loading,{isLoading:a.loading,pastDelay:a.pastDelay,timedOut:a.timedOut,error:a.error,retry:n.retry}):a.loaded?o.default.createElement((t=a.loaded)&&t.default?t.default:t,e):null},[e,a])}return a.preload=()=>l(),a.displayName="LoadableComponent",o.default.forwardRef(a)}(d,e)}function _(e,t){let r=[];for(;e.length;){let n=e.pop();r.push(n(t))}return Promise.all(r).then(()=>{if(e.length)return _(e,t)})}f.preloadAll=()=>new Promise((e,t)=>{_(a).then(e,t)}),f.preloadReady=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise(t=>{let r=()=>(i=!0,t());_(s,e).then(r,r)})},window.__NEXT_PRELOADREADY=f.preloadReady;let h=f},8373:function(e,t,r){"use strict";r.r(t),r.d(t,{Editor:function(){return s}});var n=r(5893);r(7294);var l=r(5152),o=r.n(l),u=r(7357);let a=o()(async()=>Promise.all([r.e(281),r.e(981)]).then(r.bind(r,4981)),{loadableGenerated:{webpack:()=>[4981]},ssr:!1});function s(e){return(0,n.jsx)(u.Z,{children:(0,n.jsx)(a,{onChange:e.onChange,width:"100%"})})}t.default=s},5152:function(e,t,r){e.exports=r(5677)}},function(e){e.O(0,[943,774,888,179],function(){return e(e.s=1394)}),_N_E=e.O()}]);