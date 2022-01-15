(this["webpackJsonphl-react"]=this["webpackJsonphl-react"]||[]).push([[0],{398:function(e,t,n){},404:function(e,t,n){},425:function(e,t,n){},433:function(e,t){},625:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(30),o=n.n(c),i=(n(398),n(46)),s=(n(404),n(82)),u=n(27),l=n(734),d=n(709),j=n(726),b=n(743),g=n(733),f=n(741),h=n(643),O=n(350),x=n(732),p=n(728),m=n(752),v="AUTH_START",S="AUTH_SUCCESS",k="AUTH_FAIL",w="AUTH_LOGOUT",y="REFRESH_TOKEN",C=n(111),_=n.n(C),A=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""));return JSON.parse(n)},I=function(e){var t=parseInt(e),n=new Date(0);return n.setUTCSeconds(t),n},T=function(){return{type:v}},q=function(e,t,n){return{type:S,token:e,refresh:t,user_id:n}},D=function(e){return{type:k,error:e}},E=function(){return localStorage.removeItem("token"),localStorage.removeItem("refresh"),localStorage.removeItem("expirationDate"),{type:w,token:null,refresh:null}},L=function(e){return function(t){setTimeout((function(){t(E())}),1e3*e)}},F=function(){return function(e){e(E())}},P=function(){return function(e){var t=localStorage.getItem("token"),n=localStorage.getItem("refresh"),r=localStorage.getItem("user_id");if(void 0===t)e(E());else if(new Date(localStorage.getItem("expirationDate"))<=new Date)e(E());else{e(q(t,n,r));var a=A(n),c=I(a.exp);e(L((c.getTime()-(new Date).getTime())/1e3))}}},U=function(e,t,n){return function(r){r(q(e,t,n))}},R=n(1),M=Object(O.a)();var W=Object(i.b)((function(e){return{error:e.error,isAuthenticated:null!==e.token,user_id:e.user_id}}),(function(e){return{onAuth:function(t,n){return e(function(e,t){return function(n){n(T()),_.a.post("/auth/login/",{username:e,password:t}).then((function(e){var t=e.data.access,r=e.data.refresh,a=A(r),c=a.user_id,o=I(a.exp);localStorage.setItem("token",t),localStorage.setItem("refresh",r),localStorage.setItem("expirationDate",o),localStorage.setItem("user_id",c),n(q(t,r,c)),n(L(3600))})).catch((function(e){n(D(e))}))}}(t,n))},onParseJwt:function(e){return A(e)}}}))((function(e){var t=Object(u.g)();return Object(r.useEffect)((function(){e.isAuthenticated&&t("/")}),[e.isAuthenticated]),Object(r.useEffect)((function(){e.error&&console.log("error",e.error)}),[e.error]),Object(R.jsx)(x.a,{theme:M,children:Object(R.jsxs)(g.a,{container:!0,component:"main",maxWidth:"xs",sx:{height:"100vh"},children:[Object(R.jsx)(d.a,{}),Object(R.jsx)(g.a,{item:!0,xs:!1,sm:6,md:6,sx:{backgroundImage:"url(https://source.unsplash.com/random/?nature)",backgroundRepeat:"no-repeat",backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[50]:e.palette.grey[900]},backgroundSize:"cover",backgroundPosition:"center"}}),Object(R.jsx)(g.a,{item:!0,xs:12,sm:6,md:6,style:{padding:"2em"},children:Object(R.jsxs)(f.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(R.jsx)(h.a,{component:"h1",variant:"h5",children:"Sign in"}),e.error?Object(R.jsxs)(p.a,{severity:"error",children:[Object(R.jsx)(m.a,{children:"Error"}),"Invalid username or password"]}):Object(R.jsx)(R.Fragment,{}),Object(R.jsxs)(f.a,{component:"form",onSubmit:function(t){t.preventDefault();var n=new FormData(t.currentTarget);e.onAuth(n.get("username"),n.get("password"))},noValidate:!0,sx:{mt:1},children:[Object(R.jsx)(j.a,{margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",autoFocus:!0}),Object(R.jsx)(j.a,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),Object(R.jsx)(l.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),Object(R.jsx)(g.a,{container:!0,children:Object(R.jsx)(g.a,{item:!0,xs:!0,children:Object(R.jsx)(b.a,{href:"/signup/",variant:"body2",children:"Don't have an account?"})})})]})]})})]})})})),N=n(8),H=Object(O.a)();var z=Object(i.b)((function(e){return{error:e.error,isAuthenticated:null!==e.token,user_id:e.user_id}}),(function(e){return{onSignup:function(t,n,r,a){return e(function(e,t,n,r){return function(a){a(T()),_.a.post("/auth/register/",{username:e,email:t,password:n,password2:r,first_name:"",last_name:""}).then((function(e){var t=e.data.tokens.access,n=e.data.tokens.refresh,r=A(n),c=r.user_id,o=I(r.exp);localStorage.setItem("token",t),localStorage.setItem("refresh",n),localStorage.setItem("expirationDate",o),localStorage.setItem("user_id",c),a(q(t,n,c)),a(L(3600))})).catch((function(e){a(D(e))}))}}(t,n,r,a))},onParseJwt:function(e){return A(e)}}}))((function(e){var t=Object(u.g)(),n=Object(r.useState)({}),a=Object(N.a)(n,2),c=a[0],o=a[1];return Object(r.useEffect)((function(){e.isAuthenticated&&t("/")}),[e.isAuthenticated]),Object(r.useEffect)((function(){e.error&&o(e.error.response.data)}),[e.error]),Object(R.jsx)(x.a,{theme:H,children:Object(R.jsxs)(g.a,{container:!0,component:"main",maxWidth:"xs",sx:{height:"100vh"},children:[Object(R.jsx)(d.a,{}),Object(R.jsx)(g.a,{item:!0,xs:!1,sm:6,md:6,sx:{backgroundImage:"url(https://source.unsplash.com/random/?nature)",backgroundRepeat:"no-repeat",backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[50]:e.palette.grey[900]},backgroundSize:"cover",backgroundPosition:"center"}}),Object(R.jsx)(g.a,{item:!0,xs:12,sm:6,md:6,style:{padding:"2em"},children:Object(R.jsxs)(f.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(R.jsx)(h.a,{component:"h1",variant:"h5",children:"Sign Up"}),e.error?Object(R.jsxs)(p.a,{severity:"error",children:[Object(R.jsx)(m.a,{children:"Error"}),Object.keys(c).map((function(e){return Object(R.jsx)("div",{children:e+":"+c[e]+"\n"})}))]}):Object(R.jsx)(R.Fragment,{}),Object(R.jsxs)(f.a,{component:"form",onSubmit:function(t){t.preventDefault();var n=new FormData(t.currentTarget);e.onSignup(n.get("username"),n.get("email"),n.get("password"),n.get("password2"))},noValidate:!0,sx:{mt:1},children:[Object(R.jsx)(j.a,{margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",autoFocus:!0}),Object(R.jsx)(j.a,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email",name:"email",autoComplete:"email",autoFocus:!0}),Object(R.jsx)(j.a,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),Object(R.jsx)(j.a,{margin:"normal",required:!0,fullWidth:!0,name:"password2",label:"Retype Password",type:"password",id:"password2",autoComplete:"current-password"}),Object(R.jsx)(l.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign Up"}),Object(R.jsx)(g.a,{container:!0,children:Object(R.jsx)(g.a,{item:!0,xs:!0,children:Object(R.jsx)(b.a,{href:"/login/",variant:"body2",children:"Already have an account? Sign in here."})})})]})]})})]})})})),J=n(29),B=n(22),V=(n(425),_.a.create({baseURL:"/modules",headers:{"Content-Type":"application/json"}})),X=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""));return JSON.parse(n)},G=function(){return V.get("/quotes/")},K=function(){return V.get("/quotesConfig/")},Q=function(e,t){return V.patch("/quotesConfig/".concat(e,"/"),t)},$=function(){return V.get("/quotesTags/")},Y=n(742),Z=n(735),ee=n(747),te=n(744),ne=n(315),re=n.n(ne),ae=n(724),ce=n(637),oe=n(715),ie=n(736),se=n(737),ue=n(730),le=n(129),de=n(717),je=n(127),be=n(130),ge=n(128),fe=n(216),he=n(740),Oe=n(753),xe=n(714),pe=n(354),me=n(731);var ve=Object(i.b)((function(e){return{isAuthenticated:null!==e.token,token:e.token,user_id:e.user_id}}),(function(e){return{onTryAutoSignup:function(){return e(P())},onLogOut:function(){return e(F())}}}))((function(e){var t=Object(r.useState)([]),n=Object(N.a)(t,2),c=n[0],o=n[1],i=Object(r.useState)(["red","yellow","blue","green","purple"]),s=Object(N.a)(i,2),d=s[0],b=s[1],O=a.a.useState([null,null]),x=Object(N.a)(O,2),p=x[0],m=x[1],v=Object(r.useState)(""),S=Object(N.a)(v,2),k=(S[0],S[1]),w=Object(r.useState)([]),y=Object(N.a)(w,2),C=y[0],_=y[1],A=Object(r.useState)(""),I=Object(N.a)(A,2),T=I[0],q=I[1],D=Object(r.useState)(0),E=Object(N.a)(D,2),L=E[0],F=E[1],P=Object(r.useState)([]),U=Object(N.a)(P,2),M=U[0],W=U[1],H=Object(r.useState)([]),z=Object(N.a)(H,2),ne=z[0],ve=z[1],Se=window.localStorage.getItem("token"),ke=Object(r.useState)([C]),we=Object(N.a)(ke,2),ye=we[0],Ce=we[1],_e=Object(u.g)();Object(r.useEffect)((function(){e.onTryAutoSignup()}),[]),Object(r.useEffect)((function(){if(0!==c.length&&0!==ye.length){var e=[];c.forEach((function(t){ye.forEach((function(n){n.id===t&&e.push(n)}))})),Ce(e)}}),[c]),Object(r.useEffect)((function(){if(e.isAuthenticated){if(e.isAuthenticated){console.log("try to get quotes");var t=X(Se);k(t.username),G().then((function(t){var n=[];K().then((function(t){if(1===t.data.length)F(t.data[0].id),n=t.data[0].quote_order.split(",").map((function(e){return parseInt(e)})),o(n);else if(t.data.length>1){var r=t.data.filter((function(t){return t.user===parseInt(e.user_id)}));F(r[0].id),n=r[0].quote_order.split(",").map((function(e){return parseInt(e)})),o(n)}})).catch((function(e){console.log(e)})),_([].concat(Object(B.a)(C),Object(B.a)(t.data))),Ce(Object(B.a)(t.data)),$().then((function(t){if(console.log("res",t.data.length),1===t.data.length)console.log("all tags",t.data),W(t.data[0].quote_tags.split(","));else if(t.data.length>1){var n=t.data.filter((function(t){return t.user===e.user_id}));console.log("admin all tags",e.user_id,n),W(n[0].quote_tags.split(","))}})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}}else _e("/login/")}),[e.isAuthenticated]),Object(r.useEffect)((function(){var e,t=[];c.forEach((function(e){C.forEach((function(n){n.id===e&&t.push(n)}))})),e=t.filter((function(e){var t=Date.parse(e.date),n=!0,r=!0,a=p[0],c=new Date(p[1]);return c.setHours(23,59,59,999),null!==a&&null!==c&&(n=t>=Date.parse(a)&&t<=Date.parse(c)),ne.length>0&&(r=e.user_tags.split(",").some((function(e){return ne.includes(e)}))),e.quote.toLowerCase().includes(T)&&d.includes(e.tag)&&n&&r})),Ce(e)}),[d,T,p,ne]);var Ae,Ie=function(e,t){if(e.target.checked)b([].concat(Object(B.a)(d),[t]));else if(!1===e.target.checked){var n=Object(B.a)(d),r=n.indexOf(t);-1!==r&&(n.splice(r,1),b(n))}},Te=function(t){console.log("save quotes config",c.length,L),0===c.length||0===L?K().then((function(n){if(0===n.data.length)a={quote_order:t.toString()},V.post("/quotesConfig/",a);else if(1===n.data.length)Q(n.data[0].id,{quote_order:t.toString()}),F(n.data[0].id);else if(n.data.length>1){console.log("admin quote config"),console.log(n.data.filter((function(t){return t.user===e.user_id})));var r=n.data.filter((function(t){return t.user===parseInt(e.user_id)}));F(r[0].id),Q(r[0].id,{quote_order:t.toString()})}var a})):(console.log("quotelist",c),Q(L,{quote_order:t.toString()}))},qe=function(e){if(e.destination){var t=function(e,t,n){var r=Array.from(e),a=r.splice(t,1),c=Object(N.a)(a,1)[0];return r.splice(n,0,c),r}(ye,e.source.index,e.destination.index);Ce(t);var n=t.map((function(e){return e.id}));o(n),Te(n)}};return Object(R.jsxs)(Y.a,{sx:{width:"100%",bgcolor:"background.paper"},children:[Object(R.jsxs)(g.a,{container:!0,sx:{justifyContent:"space-between",padding:"1em"},children:[Object(R.jsxs)(g.a,{container:!0,sx:{justifyContent:"space-around"},children:[Object(R.jsx)(g.a,{item:!0,xs:12,sm:12,lg:4,sx:{m:"1em"},children:Object(R.jsx)(j.a,{placeholder:"Search",onChange:function(e){return function(e){var t=e.target.value.toLowerCase();q(t)}(e)}})}),M.length>0?Object(R.jsx)(g.a,{item:!0,xs:12,sm:12,lg:4,sx:{m:"1em"},children:Object(R.jsx)(me.a,{multiple:!0,limitTags:2,id:"multiple-limit-tags",options:M,onChange:function(e,t){console.log("tag change",t),ve(t)},renderInput:function(e){return Object(R.jsx)(j.a,Object(J.a)(Object(J.a)({},e),{},{label:"",placeholder:"Select Tags"}))}})}):Object(R.jsx)(R.Fragment,{})]}),Object(R.jsxs)(g.a,{container:!0,sx:{justifyContent:"space-around",padding:"1em"},children:[Object(R.jsx)(g.a,{item:!0,children:Object(R.jsx)(ce.b,{dateAdapter:ae.a,children:Object(R.jsxs)(oe.a,{spacing:3,children:[Object(R.jsx)("div",{id:"mobile-date-container",children:Object(R.jsx)(ie.a,{startText:"Start Date",endText:"End Date",value:p,onChange:function(e){m(e)},renderInput:function(e,t){return Object(R.jsxs)(a.a.Fragment,{children:[Object(R.jsx)(j.a,Object(J.a)({},e)),Object(R.jsx)(f.a,{sx:{mx:2},children:" to "}),Object(R.jsx)(j.a,Object(J.a)({},t))]})}})}),Object(R.jsx)("div",{id:"desktop-date-container",children:Object(R.jsx)(se.a,{startText:"Start Date",endText:"End Date",value:p,onChange:function(e){m(e)},renderInput:function(e,t){return Object(R.jsxs)(a.a.Fragment,{children:[Object(R.jsx)(j.a,Object(J.a)({},e)),Object(R.jsx)(f.a,{sx:{mx:2},children:" to "}),Object(R.jsx)(j.a,Object(J.a)({},t))]})}})})]})})}),Object(R.jsxs)(g.a,{item:!0,children:[Object(R.jsx)(ue.a,{defaultChecked:!0,sx:{color:le.a[800],"&.Mui-checked":{color:le.a[600]}},onChange:function(e){return Ie(e,"red")}}),Object(R.jsx)(ue.a,{defaultChecked:!0,sx:{color:de.a[800],"&.Mui-checked":{color:de.a[600]}},onChange:function(e){return Ie(e,"yellow")}}),Object(R.jsx)(ue.a,{defaultChecked:!0,sx:{color:je.a[800],"&.Mui-checked":{color:je.a[600]}},onChange:function(e){return Ie(e,"blue")}}),Object(R.jsx)(ue.a,{defaultChecked:!0,sx:{color:be.a[800],"&.Mui-checked":{color:be.a[600]}},onChange:function(e){return Ie(e,"green")}}),Object(R.jsx)(ue.a,{defaultChecked:!0,sx:{color:ge.a[800],"&.Mui-checked":{color:ge.a[600]}},onChange:function(e){return Ie(e,"purple")}})]})]})]}),Object(R.jsxs)(g.a,{container:!0,children:[Object(R.jsx)(g.a,{item:!0,children:Object(R.jsx)(l.a,{onClick:function(){var e=Object(B.a)(ye);e.sort((function(e,t){return e.tag>t.tag?1:t.tag>e.tag?-1:0})),Ce(e);var t=e.map((function(e){return e.id}));o(t),Te(t)},children:"Sort by tag color"})}),Object(R.jsx)(g.a,{item:!0,children:Object(R.jsx)(l.a,{onClick:function(){console.log("sort date");var e=Object(B.a)(ye);e.sort((function(e,t){return e.date>t.date?1:t.date>e.date?-1:0})),Ce(e);var t=e.map((function(e){return e.id}));o(t),Te(t)},children:"Sort by date"})})]}),Object(R.jsx)(ee.a,{}),(Ae=ye,Object(R.jsx)(fe.a,{onDragEnd:qe,children:Object(R.jsx)(fe.c,{droppableId:"droppable",children:function(e,t){return Object(R.jsx)(xe.a,{rootRef:e.innerRef,children:Object(R.jsxs)(Y.a,{style:(t.isDraggingOver,{}),children:[Ae.map((function(e,t){return Object(R.jsx)(pe.a,{sx:{m:1},children:Object(R.jsx)(fe.b,{draggableId:void 0!==e.id?e.id.toString():e.id,index:t,isDragDisabled:ye.length!==C.length,children:function(t,n){return Object(R.jsxs)(Z.a,Object(J.a)(Object(J.a)(Object(J.a)({ContainerComponent:"li",ContainerProps:{ref:t.innerRef}},t.draggableProps),t.dragHandleProps),{},{style:(r=n.isDragging,c=t.draggableProps.style,Object(J.a)(Object(J.a)({},c),r&&{background:"rgb(235,235,235)"})),sx:{background:"linear-gradient(to bottom right, ".concat(e.tag,", white, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)")},children:[Object(R.jsx)(te.a,{primary:e.quote,secondary:Object(R.jsxs)(a.a.Fragment,{children:[Object(R.jsx)(h.a,{sx:{display:"inline"},component:"span",variant:"body2",color:"text.primary",children:e.date}),Object(R.jsx)(h.a,{component:"span",sx:{ml:"1em"},children:Object(R.jsx)("a",{href:e.url,children:"Source"})})]}),sx:{m:2}}),Object(R.jsx)(Oe.a,{children:Object(R.jsx)(he.a,{onClick:function(){return t=e.id,void _e("/".concat(t));var t},children:Object(R.jsx)(re.a,{})})})]}));var r,c}},e.id)},t)})),e.placeholder]})})}})}))]})})),Se=n(727),ke=n(716),we=n(746),ye=n(745),Ce=n(748),_e=n(718),Ae=n(739);var Ie=Object(i.b)((function(e){return{isAuthenticated:null!==e.token,token:e.token,user_id:e.user_id}}),(function(e){return{onTryAutoSignup:function(){return e(P())},onLogOut:function(){return e(F())}}}))((function(e){var t=Object(u.h)().qid,n=window.localStorage.getItem("token"),c=Object(r.useState)({}),o=Object(N.a)(c,2),i=o[0],s=o[1],d=Object(r.useState)(""),b=Object(N.a)(d,2),O=(b[0],b[1]),x=Object(r.useState)(!1),m=Object(N.a)(x,2),v=m[0],S=m[1],k=a.a.useState(!1),w=Object(N.a)(k,2),y=w[0],C=w[1],_=Object(u.g)(),A=a.a.useState(""),I=Object(N.a)(A,2),T=I[0],q=I[1],D=a.a.useState(""),E=Object(N.a)(D,2),L=(E[0],E[1]),F=Object(r.useState)(i.user_tags),P=Object(N.a)(F,2),U=P[0],M=P[1],W=Object(r.useState)(""),H=Object(N.a)(W,2),z=H[0],B=H[1],G=Object(r.useState)(""),K=Object(N.a)(G,2),Q=K[0],Y=K[1],Z=Object(r.useState)(0),ee=Object(N.a)(Z,2),te=ee[0],ne=ee[1],re=function(e){q(e.target.value);var t=i;t.tag=e.target.value,s(t)},ae=function(e){var n,r;console.log(i),function(e,t){return V.put("/quotes/".concat(e,"/"),t)}(t,i).then((function(e){200===e.status&&(console.log("save!"),S(!0))})).catch((function(e){console.log("error saving",e)})),0!==te?(n=te,r={quote_tags:Q},V.patch("/quotesTags/".concat(n,"/"),r)):function(e){V.post("/quotesTags/",e)}({quote_tags:Q})},ce=function(e){C(!1)},ie=function(e){(function(e){return V.delete("/quotes/".concat(e,"/"))})(t).then((function(e){_("/")})).catch((function(e){console.log(e)}))},se=function(e){if(console.log(e),void 0!==U){var t=U.split(",").filter((function(t){return t!==e})).toString();M(t);var n=i;n.user_tags=t,s(n),console.log(n)}},ue=function(e){return{checked:T===e,onChange:re,value:e,name:"color-radio-button-demo",inputProps:{"aria-label":e}}};return Object(r.useEffect)((function(){console.log("try to sign up"),e.onTryAutoSignup()}),[]),Object(r.useEffect)((function(){if(e.isAuthenticated){if(e.isAuthenticated){console.log("try to get quotes");var r=X(n);O(r.username),function(e){return V.get("/quotes/".concat(e,"/"))}(t).then((function(e){s(e.data),q(e.data.tag),M(e.data.user_tags)})).catch((function(e){console.log(e)})),$().then((function(e){console.log("res",e.data),1===e.data.length?(console.log("all tags",e.data[0].quote_tags),Y(e.data[0].quote_tags),ne(e.data[0].id)):e.data.length>1&&console.log("admin quote tags",e.data)}))}}else _("/login/")}),[e.isAuthenticated]),Object(R.jsxs)(f.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center",width:"100%"},children:[Object(R.jsx)(h.a,{variant:"h6",children:"Quote Details"}),v?Object(R.jsx)(p.a,{severity:"success",children:"Modification save!"}):Object(R.jsx)(R.Fragment,{}),Object(R.jsxs)(f.a,{component:"form",noValidate:!0,sx:{mt:3,width:"100%"},xs:12,sm:12,lg:12,children:[Object(R.jsxs)(g.a,{container:!0,spacing:2,children:[Object(R.jsx)(g.a,{item:!0,xs:12,sm:12,lg:12,children:Object(R.jsx)(h.a,{children:i.quote})}),Object(R.jsx)(g.a,{item:!0,xs:12,sm:12,lg:12,children:Object(R.jsx)(oe.a,{direction:"row",spacing:1,children:void 0!==i.user_tags?i.user_tags.split(",").map((function(e,t){if(e.length>0)return Object(R.jsx)(Ae.a,{label:e,variant:"outlined",onDelete:function(){return se(e)}},t)})):Object(R.jsx)(R.Fragment,{})})}),Object(R.jsxs)(g.a,{item:!0,children:[Object(R.jsx)(j.a,{onChange:function(e){B(e.target.value)}}),Object(R.jsx)(l.a,{variant:"contained",sx:{alignItems:"center",m:1},onClick:function(){var e="";if(void 0!==U){var t=U.split(",");!1===t.includes(z)?(t.push(z),e=t.toString(),M(e)):(e=t.toString(),console.log("already have"))}else e=z,M(z);var n=i;if(n.user_tags=e,s(n),console.log("tmpData",n),e="",void 0!==Q){var r=Q.split(",");!1===r.includes(z)&&(r.push(z),e=r.toString(),Y(e))}else e=z,Y(z)},children:"Add User Tag"})]}),Object(R.jsxs)(g.a,{item:!0,children:[Object(R.jsx)(h.a,{style:{textAlign:"left"},children:i.date}),Object(R.jsx)(h.a,{children:Object(R.jsx)("a",{href:i.url,children:i.url})})]}),Object(R.jsxs)(g.a,{item:!0,xs:12,sm:12,lg:12,children:[Object(R.jsx)(h.a,{style:{textAlign:"left",marginTop:"1em"},children:"Notes:"}),Object(R.jsx)(j.a,{value:i.notes,multiline:!0,xs:12,sm:12,lg:12,style:{width:"100%",marginTop:"1em"},onChange:function(e){L(e.target.value);var t=i;t.notes=e.target.value,s(t)}})]}),Object(R.jsxs)(g.a,{item:!0,xs:12,sm:12,lg:12,children:["Color tag",Object(R.jsxs)("div",{children:[Object(R.jsx)(Se.a,Object(J.a)(Object(J.a)({},ue("red")),{},{sx:{color:le.a[800],"&.Mui-checked":{color:le.a[600]}}})),Object(R.jsx)(Se.a,Object(J.a)(Object(J.a)({},ue("yellow")),{},{sx:{color:de.a[800],"&.Mui-checked":{color:de.a[600]}}})),Object(R.jsx)(Se.a,Object(J.a)(Object(J.a)({},ue("blue")),{},{sx:{color:je.a[800],"&.Mui-checked":{color:je.a[600]}}})),Object(R.jsx)(Se.a,Object(J.a)(Object(J.a)({},ue("green")),{},{sx:{color:be.a[800],"&.Mui-checked":{color:be.a[600]}}})),Object(R.jsx)(Se.a,Object(J.a)(Object(J.a)({},ue("purple")),{},{sx:{color:ge.a[800],"&.Mui-checked":{color:ge.a[600]}}}))]})]})]}),Object(R.jsx)(l.a,{type:"submit",onClick:function(){_("/")},variant:"contained",sx:{mt:3,mb:2,mr:3},children:"Back"}),Object(R.jsx)(l.a,{onClick:function(){return ae()},variant:"contained",sx:{mt:3,mb:2,mr:3},children:"Save"}),Object(R.jsx)(l.a,{variant:"contained",color:"error",sx:{mt:3,mb:2},onClick:function(){C(!0)},children:"Delete"})]}),Object(R.jsxs)(ke.a,{open:y,onClose:ce,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(R.jsx)(_e.a,{id:"alert-dialog-title",children:"Are you sure you want to delete?"}),Object(R.jsx)(ye.a,{children:Object(R.jsx)(Ce.a,{id:"alert-dialog-description",children:"Deleted item will be gone from the database forever."})}),Object(R.jsxs)(we.a,{children:[Object(R.jsx)(l.a,{variant:"contained",color:"error",onClick:function(){ie()},children:"Delete"}),Object(R.jsx)(l.a,{onClick:ce,autoFocus:!0,children:"Back"})]})]})]})})),Te=n(3),qe=n(7),De=n(738),Ee=n(749),Le=n(750),Fe=n(751),Pe=n(322),Ue=n.n(Pe),Re=n(323),Me=n.n(Re),We=n(755),Ne=n(319),He=n.n(Ne),ze=n(320),Je=n.n(ze),Be=n(321),Ve=n.n(Be);var Xe=Object(i.b)(null,(function(e){return{logout:function(){return e(F())}}}))((function(e){var t=Object(u.g)();return Object(R.jsxs)("div",{children:[Object(R.jsxs)(Z.a,{button:!0,onClick:function(){t("/")},children:[Object(R.jsx)(We.a,{children:Object(R.jsx)(He.a,{})}),Object(R.jsx)(te.a,{primary:"Dashboard"})]}),Object(R.jsxs)(Z.a,{button:!0,onClick:function(){t("/stats")},children:[Object(R.jsx)(We.a,{children:Object(R.jsx)(Je.a,{})}),Object(R.jsx)(te.a,{primary:"Statistics"})]}),Object(R.jsxs)(Z.a,{button:!0,onClick:e.logout,children:[Object(R.jsx)(We.a,{children:Object(R.jsx)(Ve.a,{})}),Object(R.jsx)(te.a,{primary:"Logout"})]})]})}));var Ge=Object(qe.a)(Ee.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(J.a)({zIndex:t.zIndex.drawer+1,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},n&&{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})})})),Ke=Object(qe.a)(De.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return{"& .MuiDrawer-paper":Object(J.a)({position:"relative",whiteSpace:"nowrap",width:240,transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen}),boxSizing:"border-box"},!n&&Object(Te.a)({overflowX:"hidden",transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),width:t.spacing(7)},t.breakpoints.up("sm"),{width:t.spacing(9)}))}})),Qe=Object(O.a)();function $e(){var e=r.useState(!0),t=Object(N.a)(e,2),n=t[0],a=t[1],c=function(){a(!n)};return Object(R.jsx)(x.a,{theme:Qe,children:Object(R.jsxs)(f.a,{sx:{display:"flex"},children:[Object(R.jsx)(d.a,{}),Object(R.jsx)(Ge,{position:"absolute",open:n,children:Object(R.jsxs)(Le.a,{sx:{pr:"24px"},children:[Object(R.jsx)(he.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:c,sx:Object(J.a)({marginRight:"36px"},n&&{display:"none"}),children:Object(R.jsx)(Ue.a,{})}),Object(R.jsx)(h.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,sx:{flexGrow:1},children:"Dashboard"}),Object(R.jsx)(he.a,{color:"inherit"})]})}),Object(R.jsxs)(Ke,{variant:"permanent",open:n,children:[Object(R.jsx)(Le.a,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-end",px:[1]},children:Object(R.jsx)(he.a,{onClick:c,children:Object(R.jsx)(Me.a,{})})}),Object(R.jsx)(ee.a,{}),Object(R.jsx)(Y.a,{children:Object(R.jsx)(Xe,{})}),Object(R.jsx)(ee.a,{})]}),Object(R.jsxs)(f.a,{component:"main",sx:{backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[Object(R.jsx)(Le.a,{}),Object(R.jsx)(Fe.a,{maxWidth:"lg",sx:{mt:4,mb:4},children:Object(R.jsx)(g.a,{container:!0,spacing:3,children:Object(R.jsx)(g.a,{item:!0,xs:12,md:12,lg:12,children:Object(R.jsx)(u.a,{})})})})]})]})})}function Ye(){return Object(R.jsx)($e,{})}var Ze=n(348),et=(n(624),n(722)),tt=n(723),nt=n(344),rt=n(345),at=n(351),ct=n(343),ot=function(e){var t=n(435),r=e.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toLowerCase();return t.removeStopwords(r.split(" "))};var it=Object(i.b)((function(e){return{isAuthenticated:null!==e.token,token:e.token,user_id:e.user_id}}),(function(e){return{onTryAutoSignup:function(){return e(P())},onLogOut:function(){return e(F())}}}))((function(e){var t=Object(r.useState)([]),n=Object(N.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)([a]),i=Object(N.a)(o,2),s=(i[0],i[1]),l=Object(r.useState)({}),d=Object(N.a)(l,2),j=d[0],b=d[1],g=Object(r.useState)({}),f=Object(N.a)(g,2),O=f[0],x=f[1],p=Object(r.useState)({}),m=Object(N.a)(p,2),v=m[0],S=m[1],k=Object(r.useState)([]),w=Object(N.a)(k,2),y=w[0],C=w[1],_=Object(r.useState)([]),A=Object(N.a)(_,2),I=(A[0],A[1]),T=Object(r.useState)([]),q=Object(N.a)(T,2),D=q[0],E=q[1],L=Object(r.useState)(["red","yellow","blue","green","purple"]),F=Object(N.a)(L,2),P=F[0],U=F[1],M=Object(u.g)();Object(r.useEffect)((function(){console.log("try to sign up"),e.onTryAutoSignup()}),[]),Object(r.useEffect)((function(){e.isAuthenticated?e.isAuthenticated&&G().then((function(e){c(e.data),e.data.map(W)})).catch((function(e){console.log(e)})):M("/login/")}),[e.isAuthenticated]),Object(r.useEffect)((function(){console.log(D)}),[D]);var W=function(e,t){console.log("calculate for",e);var n=j;void 0!==n[e.tag]?n[e.tag]+=1:n[e.tag]=1,b(n),console.log(j);var r=Object.keys(n),a=Object.values(n),c=r.map((function(e,t){return{argument:e.toUpperCase(),value:a[t]}}));C(c),console.log(c);var o=O;e.user_tags.split(",").map((function(e){void 0!==o[e]?o[e]+=1:o[e]=1})),x(o);var i=Object.keys(o),s=Object.values(o),u=i.map((function(e,t){return{text:e,value:s[t]}}));I(u),console.log(u);var l=v,d=ot(e.quote);for(t in d){var g=d[t];void 0!==l[g]?l[g]+=1:l[g]=1}S(l);var f=Object.keys(l),h=Object.values(l),p=f.map((function(e,t){return{text:e,value:h[t]}}));E(p)},H=function(e,t){var n=e.argument.toLowerCase(),r=Object(B.a)(P);if(console.log(n,P),!1===P.includes(n))r=r.concat(n),console.log("current selected tag",r),U([].concat(Object(B.a)(P),[n]));else if(P.includes(n)){var c=r.indexOf(n);-1!==c&&(r.splice(c,1),U(r))}var o;o=a.filter((function(e){return r.includes(e.tag)})),s(o),function(e){console.log("calculate word freq",e);var t={};e.map((function(e,n){var r=ot(e.quote);for(n in r){var a=r[n];void 0!==t[a]?t[a]+=1:t[a]=1}})),S(t);var n=Object.keys(t),r=Object.values(t),a=n.map((function(e,t){return{text:e,value:r[t]}}));E(a)}(o)};return Object(R.jsxs)("div",{children:[Object(R.jsx)(pe.a,{sx:{mb:"2em"},children:Object(R.jsx)(Ze.a,{words:D})}),Object(R.jsx)(pe.a,{children:Object(R.jsxs)("div",{style:{width:"100%"},children:[Object(R.jsx)(h.a,{children:"Number of entries per tag. "}),Object(R.jsx)(h.a,{children:"Click on the bars to filter word cloud   "}),Object(R.jsx)(et.a,{width:"100%",height:300,children:Object(R.jsxs)(tt.a,{width:150,height:40,data:y,children:[Object(R.jsx)(nt.a,{dataKey:"argument"}),Object(R.jsx)(rt.a,{}),Object(R.jsx)(at.a,{dataKey:"value",onClick:H,children:y.map((function(e,t){return Object(R.jsx)(ct.a,{cursor:"pointer",fill:P.includes(e.argument.toLowerCase())?e.argument.toLowerCase():"grey"},"cell-".concat(t))}))})]})})]})})]})}));var st=function(){return Object(R.jsxs)(u.d,{children:[Object(R.jsx)(u.b,{path:"/login/",element:Object(R.jsx)(W,{})}),Object(R.jsx)(u.b,{path:"/signup/",element:Object(R.jsx)(z,{})}),Object(R.jsxs)(u.b,{path:"/",element:Object(R.jsx)(Ye,{}),children:[Object(R.jsx)(u.b,{path:"/",element:Object(R.jsx)(ve,{})}),Object(R.jsx)(u.b,{path:"/:qid",element:Object(R.jsx)(Ie,{})}),Object(R.jsx)(u.b,{path:"/stats",element:Object(R.jsx)(it,{})})]})]})};_.a.defaults.xsrfCookieName="csrftoken",_.a.defaults.xsrfHeaderName="X-CSRFToken";var ut=Object(i.b)((function(e){return{isAuthenticated:null!==e.token}}),(function(e){return{onTryAutoSignup:function(){return e(P())}}}))((function(e){return Object(r.useEffect)((function(){e.onTryAutoSignup()}),[]),Object(R.jsx)("div",{className:"App",children:Object(R.jsx)(s.a,{children:Object(R.jsx)(st,{})})})})),lt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,757)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))},dt=n(92),jt=n(347),bt=function(e,t){return Object(J.a)(Object(J.a)({},e),t)},gt={token:null,refresh:null,error:null,loading:!1,user_id:null},ft=function(e,t){return bt(e,{error:null,loading:!0})},ht=function(e,t){return bt(e,{token:t.token,refresh:t.refresh,error:null,loading:!1,user_id:t.user_id})},Ot=function(e,t){return bt(e,{error:t.error,loading:!1})},xt=function(e,t){return bt(e,{token:null,refresh:null,user_id:null})},pt=function(e,t){return bt(e,{token:t.token,refresh:t.refresh,error:null,loading:!1,user_id:t.user_id})},mt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return ft(e);case S:return ht(e,t);case k:return Ot(e,t);case w:return xt(e);case y:return pt(e,t);default:return e}},vt=n(153),St=n.n(vt),kt=n(346),wt=n(109),yt=n(72),Ct=new(function(){function e(){Object(wt.a)(this,e)}return Object(yt.a)(e,[{key:"getLocalRefreshToken",value:function(){return window.localStorage.getItem("refresh")}},{key:"getLocalAccessToken",value:function(){return window.localStorage.getItem("token")}},{key:"getLocalUserId",value:function(){return window.localStorage.getItem("user_id")}},{key:"updateLocalAccessToken",value:function(e){window.localStorage.setItem("token",e)}}]),e}()),_t=function(e){V.interceptors.request.use((function(e){console.log("intercept request");var t=Ct.getLocalAccessToken();return t&&(e.headers.Authorization="Bearer "+t),e}),(function(e){return console.log("request error",e),Promise.reject(e)}));var t=e.dispatch;V.interceptors.response.use((function(e){return e}),function(){var e=Object(kt.a)(St.a.mark((function e(n){var r,a,c,o,i;return St.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("/auth/login/"===(r=n.config).url||!n.response){e.next=19;break}if(401!==n.response.status||r._retry){e.next=19;break}return r._retry=!0,e.prev=4,e.next=7,V.post("/auth/login/refresh/",{refresh:Ct.getLocalRefreshToken()});case 7:return a=e.sent,c=a.data.access,o=Ct.getLocalRefreshToken(),i=Ct.getLocalUserId(),t(U(c,o,i)),Ct.updateLocalAccessToken(c),e.abrupt("return",V(r));case 16:return e.prev=16,e.t0=e.catch(4),e.abrupt("return",Promise.reject(e.t0));case 19:return e.abrupt("return",Promise.reject(n));case 20:case"end":return e.stop()}}),e,null,[[4,16]])})));return function(t){return e.apply(this,arguments)}}())},At=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||dt.c,It=Object(dt.d)(mt,At(Object(dt.a)(jt.a))),Tt=Object(R.jsx)(i.a,{store:It,children:Object(R.jsx)(ut,{})});o.a.render(Tt,document.getElementById("root")),_t(It),lt()}},[[625,1,2]]]);
//# sourceMappingURL=main.24ca5a0d.chunk.js.map