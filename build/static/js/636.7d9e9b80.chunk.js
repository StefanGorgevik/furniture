"use strict";(self.webpackChunkfurnlab=self.webpackChunkfurnlab||[]).push([[636],{9636:function(e,t,n){n.r(t),n.d(t,{default:function(){return N}});var r=n(4942),i=n(1413),a=n(885),o=n(2791),s=n(364),l=n(7781),d=n(3578),c=n(1208),u=n(8596),m=n(6168),p=n(5471),f=n(6828),g=n(9403),h=n(184),v=(0,u.Z)((function(e){return{formControl:{width:"100%"}}})),b=function(e){var t=e.options,n=e.value,r=e.handleChange,i=e.error,a=e.setError,o=v();return(0,h.jsxs)(f.Z,{variant:"outlined",className:o.formControl,children:[(0,h.jsx)(m.Z,{id:"demo-simple-select-outlined-label",children:"Category"}),(0,h.jsx)(g.Z,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:n,onChange:function(e){i&&a(""),r(e)},label:"Category",align:"left",error:i,children:t.map((function(e,t){return(0,h.jsx)(p.Z,{value:e,children:e},t)}))})]})},y=n(6871),x=n(8610),Z=n(1288),C=n(8302),j=n(52),w=n(8679),E=n(5083),I=(0,n(3401).Z)((function(e){return{create:{padding:"1em",paddingTop:"1em",marginTop:"1em"}}})),P=["Chair","Table","Desk","Dresser","Cupboard","Bed","Couch","Uncategorized"],N=(0,s.$j)((function(e){return{furniture:e.furnitureReducer,editingFurniture:e.furnitureReducer.editingFurniture,furnitureToEdit:e.furnitureReducer.furnitureToEdit}}),(function(e){return(0,l.DE)({saveNewFurnitureAction:d.WC,editFurnitureAction:d.zN,saveEditedFurnitureAction:d.$4,openFurnitureAction:d.zc},e)}))((function(e){var t=e.saveNewFurnitureAction,n=e.editingFurniture,s=e.furnitureToEdit,l=e.editFurnitureAction,d=e.saveEditedFurnitureAction,u=e.openFurnitureAction,m=I(),p=(0,y.UO)(),f=(0,y.TH)().pathname,g=(0,j.e)().matchesMD,v=null===p||void 0===p?void 0:p.id,N=(0,o.useState)(""),k=(0,a.Z)(N,2),F=k[0],A=k[1],T=(0,y.s0)(),D=(0,o.useState)({name:"",category:"",year:"",description:"",price:"",image:"",material:""}),R=(0,a.Z)(D,2),L=R[0],S=R[1];(0,o.useEffect)((function(){return function(){l({furniture:{name:"",category:"",year:"",description:"",price:"",image:"",material:""},editing:!1})}}),[l]),(0,o.useEffect)((function(){n&&f.startsWith("/furniture/edit/")&&S(s),!n&&f.startsWith("/furniture/edit/")&&u({id:v,shouldRedirect:!1,navigate:T}),f.startsWith("/furniture/create")&&S({name:"",category:"",year:"",description:"",price:"",image:"",material:""})}),[n,s,f,v,u,T]);var B=function(e,t){S((function(n){return(0,i.Z)((0,i.Z)({},n),{},(0,r.Z)({},t,e.target.value))}))};return(0,h.jsxs)(Z.Z,{container:!0,className:m.create,direction:"column",alignItems:"center",justifyContent:"center",children:[(0,h.jsx)(Z.Z,{item:!0,children:(0,h.jsx)(C.Z,{variant:"h3",style:{textTransform:"uppercase"},children:n?"Edit furniture":"Add furniture"})}),(0,h.jsxs)(Z.Z,{item:!0,container:!0,direction:"row",justifyContent:"space-evenly",style:{padding:"1%",margin:"0 auto",width:"90%"},children:[(0,h.jsxs)(Z.Z,{item:!0,container:!0,md:5,style:{display:"flex",flexDirection:"column"},children:[(0,h.jsx)(Z.Z,{item:!0,children:(0,h.jsx)(c.I,{label:"Name",type:"text",id:"name",value:L.name,onChange:function(e){return B(e,"name")},error:F.includes("name"),setError:A,inputProps:{maxLength:30}})}),(0,h.jsx)(Z.Z,{item:!0,children:(0,h.jsx)(c.I,{label:"Material",type:"text",id:"material",value:L.material,onChange:function(e){return B(e,"material")},error:F.includes("material"),setError:A})}),(0,h.jsx)(Z.Z,{item:!0,children:(0,h.jsx)(c.I,{label:"Image URL",type:"text",id:"image",value:L.image,onChange:function(e){return B(e,"image")},style:{marginBottom:"10px"},error:F.includes("image"),setError:A})}),(0,h.jsx)(Z.Z,{item:!0,style:{marginBottom:g?"15px":"0"},children:(0,h.jsx)(b,{options:P,value:L.category,handleChange:function(e){S((function(t){return(0,i.Z)((0,i.Z)({},t),{},{category:e.target.value})}))},error:F.includes("category"),setError:A})})]}),(0,h.jsxs)(Z.Z,{item:!0,md:5,sm:12,children:[(0,h.jsxs)(Z.Z,{item:!0,container:!0,style:{display:"flex",flexDirection:"row",justifyContent:"space-between",gap:1},children:[(0,h.jsx)(Z.Z,{item:!0,md:5,sm:12,style:{width:"100%"},children:(0,h.jsx)(c.I,{label:"Year",type:"number",id:"year",value:L.year,onChange:function(e){return B(e,"year")},error:F.includes("year"),setError:A})}),(0,h.jsx)(Z.Z,{item:!0,md:5,sm:12,style:{width:"100%"},children:(0,h.jsx)(c.I,{label:"Price (\u20ac)",type:"number",id:"price",value:L.price,onChange:function(e){return B(e,"price")},error:F.includes("price"),setError:A})})]}),(0,h.jsx)(c.I,{label:"Description",type:"text",id:"description",value:L.description,onChange:function(e){return B(e,"description")},rows:10,error:F.includes("description"),setError:A})]})]}),(0,h.jsx)(w.j,{error:F}),(0,h.jsx)(Z.Z,{item:!0,container:!0,justifyContent:"center",children:(0,h.jsxs)(E.Mm,{onClick:function(e){return function(e,n){if("Enter"===e.key||!n){e.preventDefault(),A("");var r=(0,x.E3)(L);if(A(r),""!==r)return;f.startsWith("/furniture/edit")?d({data:L,id:v,navigate:T}):t(L)}}(e,!1)},children:[" ","Save"]})})]})}))},8610:function(e,t,n){n.d(t,{E3:function(){return a},To:function(){return r},m7:function(){return i}});var r=function(e){var t=e.username,n=e.email,r=e.password,i=e.repeatPassword;return 0===t.length||""===t||t.length<4?"Please enter your username":0!==n.length&&""!==n&&n.trim().includes("@")?0===r.length||""===r||r.length<4?"Please enter a password":r.length<6?"Password should be at least 6 characters!":0===i.length||""===i||i!==r?"Passwords don't match":"":"Please enter a correct email!"},i=function(e){var t=e.email,n=e.password;return 0!==t.length&&""!==t&&t.trim().includes("@")?0===n.length?"Please enter your password!":n.length>1&&n.length<6?"Password should be at least 6 characters!":"":"Please enter your email!"},a=function(e){var t=e.name,n=e.category,r=e.year,i=e.description,a=e.price,o=e.image,s=e.material;return""===t||0===t.length?"Please enter the name.":""===s||0===s.length?"Please enter the material.":""===o||0===o.length?"Please enter an image URL.":""===n||0===n.length?"Please enter the category.":""===r||0===r.length||r<1950||r>2050?"Please enter the year.":""===a||0===a.length||a<=0?"Please enter the price.":""===i||0===i.length||i<10?"Please enter a description.":""}},5471:function(e,t,n){n.d(t,{Z:function(){return b}});var r=n(5987),i=n(4942),a=n(7462),o=n(2791),s=n(8182),l=n(8317),d=n(6706),c=n(3375),u=n(9806),m=n(4496),p=n(4164),f="undefined"===typeof window?o.useEffect:o.useLayoutEffect,g=o.forwardRef((function(e,t){var n=e.alignItems,i=void 0===n?"center":n,l=e.autoFocus,g=void 0!==l&&l,h=e.button,v=void 0!==h&&h,b=e.children,y=e.classes,x=e.className,Z=e.component,C=e.ContainerComponent,j=void 0===C?"li":C,w=e.ContainerProps,E=(w=void 0===w?{}:w).className,I=(0,r.Z)(w,["className"]),P=e.dense,N=void 0!==P&&P,k=e.disabled,F=void 0!==k&&k,A=e.disableGutters,T=void 0!==A&&A,D=e.divider,R=void 0!==D&&D,L=e.focusVisibleClassName,S=e.selected,B=void 0!==S&&S,M=(0,r.Z)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),V=o.useContext(m.Z),$={dense:N||V.dense||!1,alignItems:i},z=o.useRef(null);f((function(){g&&z.current&&z.current.focus()}),[g]);var G=o.Children.toArray(b),W=G.length&&(0,c.Z)(G[G.length-1],["ListItemSecondaryAction"]),H=o.useCallback((function(e){z.current=p.findDOMNode(e)}),[]),U=(0,u.Z)(H,t),O=(0,a.Z)({className:(0,s.Z)(y.root,x,$.dense&&y.dense,!T&&y.gutters,R&&y.divider,F&&y.disabled,v&&y.button,"center"!==i&&y.alignItemsFlexStart,W&&y.secondaryAction,B&&y.selected),disabled:F},M),Y=Z||"li";return v&&(O.component=Z||"div",O.focusVisibleClassName=(0,s.Z)(y.focusVisible,L),Y=d.Z),W?(Y=O.component||Z?Y:"div","li"===j&&("li"===Y?Y="div":"li"===O.component&&(O.component="div")),o.createElement(m.Z.Provider,{value:$},o.createElement(j,(0,a.Z)({className:(0,s.Z)(y.container,E),ref:U},I),o.createElement(Y,O,G),G.pop()))):o.createElement(m.Z.Provider,{value:$},o.createElement(Y,(0,a.Z)({ref:U},O),G))})),h=(0,l.Z)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(g),v=o.forwardRef((function(e,t){var n,i=e.classes,l=e.className,d=e.component,c=void 0===d?"li":d,u=e.disableGutters,m=void 0!==u&&u,p=e.ListItemClasses,f=e.role,g=void 0===f?"menuitem":f,v=e.selected,b=e.tabIndex,y=(0,r.Z)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(n=void 0!==b?b:-1),o.createElement(h,(0,a.Z)({button:!0,role:g,tabIndex:n,component:c,selected:v,disableGutters:m,classes:(0,a.Z)({dense:i.dense},p),className:(0,s.Z)(i.root,l,v&&i.selected,!m&&i.gutters),ref:t},y))})),b=(0,l.Z)((function(e){return{root:(0,a.Z)({},e.typography.body1,(0,i.Z)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:(0,a.Z)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(v)}}]);
//# sourceMappingURL=636.7d9e9b80.chunk.js.map