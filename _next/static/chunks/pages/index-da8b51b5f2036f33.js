(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(r,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(78)}])},5443:function(r,n,e){"use strict";e.r(n),e.d(n,{default:function(){return o}});var t=e(5893);e(7294);var i=e(9937),a=e(4740);function o(){return(0,t.jsx)(i.Z,{sx:{width:600,margin:"auto"},children:(0,t.jsx)(a.D,{children:"# くるるぎすくりぷと\nVTuberの枢木みるはさん([Twitter](https://twitter.com/krrgmrh))([YouTube](https://www.youtube.com/c/KururugiMiruha))の1周年を祝うために作成したものです。\n## 例\n```\n// 引数未満の、正の偶数をすべて出力します。\n// デビューから１年経っていないと正しく動作しません。\nkrrg_mrh(krrg_sub) {\n  krg_sub = krrgmrh;\n  krrrg_sub = krrgmrh - krrgmrh;\n  krrrrg_sub = krg_sub;\n  while (krrrrg_sub < krrg_sub) {\n    if (krrrrg_sub % (krg_sub + krg_sub) == krrrg_sub) {\n      #くるるぎはっぴょうかい(krrrrg_sub);\n    }\n    krrrrg_sub = krrrrg_sub + krg_sub;\n  }\n}\n```\n\n# 文法\n## 整数\n数字をプログラム中に書くことはできません。  \n`krrgmrh`で枢木みるはのデビューから経過した年数が切り捨てで得られます。\n\n## 変数\n関数ごとにスコープを持ち、グローバルスコープは存在しません。  \n変数名は`kr+g_sub`のみ許容されます。（例：krrg_sub、krrrg_sub）  \n変数には整数値のみを入れることができます。\n\n## 関数\n関数名は`kr+g_mrh`のみ許容されます。（例：krrg_mrh、krg_mrh）  \nプログラム実行時には`krrg_mrh`が引数を1つ取って実行されます。  \n```\nkrrg_mrh (krrg_sub) {\n  // ここにプログラムを書きます。\n  freeze krrgmrh - krrgmrh;\n}\n```\n\n## フロー制御\n### if文\n括弧`()`の中が0ではない場合に波括弧`{}`内のプログラムが実行されます。  \n波括弧を省略することはできません。\n\n### while文\n括弧`()`の中が0ではない場合に波括弧`{}`内のプログラムが繰り返し実行されます。  \n波括弧を省略することはできません。\n\n### freeze\n関数を終了します。\n`freeze krrgmrh;`のようにすることで関数の戻り値を返すことができます。\nfreezeが呼ばれずに終了した場合、戻り値は`krrgmrh`になります。\n\n## 組み込み関数\n### #くるるぎはっぴょうかい\n引数を数字として出力します。\n\n### #みるは〜と\n引数を文字として出力します。\n\n\n"})})}},78:function(r,n,e){"use strict";e.r(n),e.d(n,{default:function(){return D}});var t=e(5893),i=e(7294),a=e(7357),o=e(3366),s=e(7462),u=e(6010),l=e(5408),p=e(9707),g=e(4780),c=e(1496),h=e(4502),m=e(9718),f=e(247),d=e(606);let b=i.createContext();var k=e(1588),x=e(4867);function w(r){return(0,x.Z)("MuiGrid",r)}let v=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],y=(0,k.Z)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map(r=>`spacing-xs-${r}`),...["column-reverse","column","row-reverse","row"].map(r=>`direction-xs-${r}`),...["nowrap","wrap-reverse","wrap"].map(r=>`wrap-xs-${r}`),...v.map(r=>`grid-xs-${r}`),...v.map(r=>`grid-sm-${r}`),...v.map(r=>`grid-md-${r}`),...v.map(r=>`grid-lg-${r}`),...v.map(r=>`grid-xl-${r}`)]);var $=y;let _=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function Z(r){let n=parseFloat(r);return`${n}${String(r).replace(String(n),"")||"px"}`}function S({breakpoints:r,values:n}){let e="";Object.keys(n).forEach(r=>{""===e&&0!==n[r]&&(e=r)});let t=Object.keys(r).sort((n,e)=>r[n]-r[e]);return t.slice(0,t.indexOf(e))}let j=(0,c.ZP)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(r,n)=>{let{ownerState:e}=r,{container:t,direction:i,item:a,spacing:o,wrap:s,zeroMinWidth:u,breakpoints:l}=e,p=[];t&&(p=function(r,n,e={}){if(!r||r<=0)return[];if("string"==typeof r&&!Number.isNaN(Number(r))||"number"==typeof r)return[e[`spacing-xs-${String(r)}`]];let t=[];return n.forEach(n=>{let i=r[n];Number(i)>0&&t.push(e[`spacing-${n}-${String(i)}`])}),t}(o,l,n));let g=[];return l.forEach(r=>{let t=e[r];t&&g.push(n[`grid-${r}-${String(t)}`])}),[n.root,t&&n.container,a&&n.item,u&&n.zeroMinWidth,...p,"row"!==i&&n[`direction-xs-${String(i)}`],"wrap"!==s&&n[`wrap-xs-${String(s)}`],...g]}})(({ownerState:r})=>(0,s.Z)({boxSizing:"border-box"},r.container&&{display:"flex",flexWrap:"wrap",width:"100%"},r.item&&{margin:0},r.zeroMinWidth&&{minWidth:0},"wrap"!==r.wrap&&{flexWrap:r.wrap}),function({theme:r,ownerState:n}){let e=(0,l.P$)({values:n.direction,breakpoints:r.breakpoints.values});return(0,l.k9)({theme:r},e,r=>{let n={flexDirection:r};return 0===r.indexOf("column")&&(n[`& > .${$.item}`]={maxWidth:"none"}),n})},function({theme:r,ownerState:n}){let{container:e,rowSpacing:t}=n,i={};if(e&&0!==t){let n;let e=(0,l.P$)({values:t,breakpoints:r.breakpoints.values});"object"==typeof e&&(n=S({breakpoints:r.breakpoints.values,values:e})),i=(0,l.k9)({theme:r},e,(e,t)=>{var i;let a=r.spacing(e);return"0px"!==a?{marginTop:`-${Z(a)}`,[`& > .${$.item}`]:{paddingTop:Z(a)}}:null!=(i=n)&&i.includes(t)?{}:{marginTop:0,[`& > .${$.item}`]:{paddingTop:0}}})}return i},function({theme:r,ownerState:n}){let{container:e,columnSpacing:t}=n,i={};if(e&&0!==t){let n;let e=(0,l.P$)({values:t,breakpoints:r.breakpoints.values});"object"==typeof e&&(n=S({breakpoints:r.breakpoints.values,values:e})),i=(0,l.k9)({theme:r},e,(e,t)=>{var i;let a=r.spacing(e);return"0px"!==a?{width:`calc(100% + ${Z(a)})`,marginLeft:`-${Z(a)}`,[`& > .${$.item}`]:{paddingLeft:Z(a)}}:null!=(i=n)&&i.includes(t)?{}:{width:"100%",marginLeft:0,[`& > .${$.item}`]:{paddingLeft:0}}})}return i},function({theme:r,ownerState:n}){let e;return r.breakpoints.keys.reduce((t,i)=>{let a={};if(n[i]&&(e=n[i]),!e)return t;if(!0===e)a={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===e)a={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{let o=(0,l.P$)({values:n.columns,breakpoints:r.breakpoints.values}),u="object"==typeof o?o[i]:o;if(null==u)return t;let p=`${Math.round(e/u*1e8)/1e6}%`,g={};if(n.container&&n.item&&0!==n.columnSpacing){let e=r.spacing(n.columnSpacing);if("0px"!==e){let r=`calc(${p} + ${Z(e)})`;g={flexBasis:r,maxWidth:r}}}a=(0,s.Z)({flexBasis:p,flexGrow:0,maxWidth:p},g)}return 0===r.breakpoints.values[i]?Object.assign(t,a):t[r.breakpoints.up(i)]=a,t},{})}),N=r=>{let{classes:n,container:e,direction:t,item:i,spacing:a,wrap:o,zeroMinWidth:s,breakpoints:u}=r,l=[];e&&(l=function(r,n){if(!r||r<=0)return[];if("string"==typeof r&&!Number.isNaN(Number(r))||"number"==typeof r)return[`spacing-xs-${String(r)}`];let e=[];return n.forEach(n=>{let t=r[n];if(Number(t)>0){let r=`spacing-${n}-${String(t)}`;e.push(r)}}),e}(a,u));let p=[];u.forEach(n=>{let e=r[n];e&&p.push(`grid-${n}-${String(e)}`)});let c={root:["root",e&&"container",i&&"item",s&&"zeroMinWidth",...l,"row"!==t&&`direction-xs-${String(t)}`,"wrap"!==o&&`wrap-xs-${String(o)}`,...p]};return(0,g.Z)(c,w,n)},W=i.forwardRef(function(r,n){let e=(0,h.Z)({props:r,name:"MuiGrid"}),{breakpoints:a}=function(){let r=(0,m.Z)(f.Z);return r[d.Z]||r}(),l=(0,p.Z)(e),{className:g,columns:c,columnSpacing:k,component:x="div",container:w=!1,direction:v="row",item:y=!1,rowSpacing:$,spacing:Z=0,wrap:S="wrap",zeroMinWidth:W=!1}=l,M=(0,o.Z)(l,_),T=i.useContext(b),B=w?c||12:T,E={},z=(0,s.Z)({},M);a.keys.forEach(r=>{null!=M[r]&&(E[r]=M[r],delete z[r])});let P=(0,s.Z)({},l,{columns:B,container:w,direction:v,item:y,rowSpacing:$||Z,columnSpacing:k||Z,wrap:S,zeroMinWidth:W,spacing:Z},E,{breakpoints:a.keys}),O=N(P);return(0,t.jsx)(b.Provider,{value:B,children:(0,t.jsx)(j,(0,s.Z)({ownerState:P,className:(0,u.Z)(O.root,g),as:x,ref:n},z))})});var M=e(8320).Z;function T(r){return(0,x.Z)("MuiTypography",r)}(0,k.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);let B=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],E=r=>{let{align:n,gutterBottom:e,noWrap:t,paragraph:i,variant:a,classes:o}=r,s={root:["root",a,"inherit"!==r.align&&`align${M(n)}`,e&&"gutterBottom",t&&"noWrap",i&&"paragraph"]};return(0,g.Z)(s,T,o)},z=(0,c.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(r,n)=>{let{ownerState:e}=r;return[n.root,e.variant&&n[e.variant],"inherit"!==e.align&&n[`align${M(e.align)}`],e.noWrap&&n.noWrap,e.gutterBottom&&n.gutterBottom,e.paragraph&&n.paragraph]}})(({theme:r,ownerState:n})=>(0,s.Z)({margin:0},n.variant&&r.typography[n.variant],"inherit"!==n.align&&{textAlign:n.align},n.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},n.gutterBottom&&{marginBottom:"0.35em"},n.paragraph&&{marginBottom:16})),P={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},O={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},C=r=>O[r]||r,G=i.forwardRef(function(r,n){let e=(0,h.Z)({props:r,name:"MuiTypography"}),i=C(e.color),a=(0,p.Z)((0,s.Z)({},e,{color:i})),{align:l="inherit",className:g,component:c,gutterBottom:m=!1,noWrap:f=!1,paragraph:d=!1,variant:b="body1",variantMapping:k=P}=a,x=(0,o.Z)(a,B),w=(0,s.Z)({},a,{align:l,color:i,className:g,component:c,gutterBottom:m,noWrap:f,paragraph:d,variant:b,variantMapping:k}),v=c||(d?"p":k[b]||P[b])||"span",y=E(w);return(0,t.jsx)(z,(0,s.Z)({as:v,ref:n,ownerState:w,className:(0,u.Z)(y.root,g)},x))});var R=e(4531),L=e(5443);function D(){return(0,t.jsxs)("main",{children:[(0,t.jsx)(a.Z,{display:"flex",justifyContent:"center",p:1,children:(0,t.jsx)(G,{variant:"h3",children:"くるるぎすくりぷと"})}),(0,t.jsxs)(W,{container:!0,justifyContent:"center",alignItems:"flex-start",children:[(0,t.jsx)(W,{item:!0,xs:!0,children:(0,t.jsx)(R.default,{})}),(0,t.jsx)(W,{item:!0,xs:!0,children:(0,t.jsx)(L.default,{})})]})]})}}},function(r){r.O(0,[943,937,740,531,774,888,179],function(){return r(r.s=8312)}),_N_E=r.O()}]);