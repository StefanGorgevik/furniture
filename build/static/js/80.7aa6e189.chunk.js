"use strict";(self.webpackChunkfurnlab=self.webpackChunkfurnlab||[]).push([[80],{9080:function(e,t,n){n.r(t),n.d(t,{default:function(){return ue}});var i=n(885),r=n(2791),a=n(9271),o=n(7818),s=n(7781),l=n(3578),c=n(1715),d=n(2982),u=n(1413),m=n(4942),f=n(3959),p=n(1288),g=n(8302),h=n(6513),x=n(283),Z=n(3037),v=n(3036),j=n(3401),y=n(8800),w=n(184),k=(0,j.Z)((function(e){var t;return{reviews:(0,m.Z)({padding:"1%",marginTop:"2em",width:"100%",background:e.palette.common.darkerWhite},e.breakpoints.down("md"),{marginBottom:"1em"}),allReviews:(t={},(0,m.Z)(t,e.breakpoints.down("md"),{display:"flex"}),(0,m.Z)(t,e.breakpoints.up("md"),{display:"grid",gridTemplateColumns:"1fr 1fr"}),(0,m.Z)(t,"gap","10px"),t),comment:{width:"85%",margin:"1em auto"},button:(0,u.Z)((0,u.Z)({},e.typography.acceptButton),{},{width:"20em",margin:"0 10px",marginTop:"1em"})}})),b=(0,o.$j)((function(e){return{reviews:e.furnitureReducer.currentFurnitureReviews}}),(function(e){return(0,s.DE)({openModal:y.h7,getAllReviewsAction:l.TQ},e)}))((function(e){var t=e.id,n=e.getAllReviewsAction,i=e.reviews,a=e.openModal,o=k(),s=i.length;(0,r.useEffect)((function(){n(t)}),[s,t,n]);return(0,w.jsxs)(p.Z,{container:!0,className:o.reviews,children:[(0,w.jsx)(p.Z,{item:!0,style:{marginTop:"1em",width:"100%"},children:(0,w.jsx)(g.Z,{variant:"h4",align:"center",children:"Reviews"})}),(0,w.jsxs)(p.Z,{item:!0,container:!0,className:o.reviews,children:[0===s&&(0,w.jsxs)(p.Z,{item:!0,style:{width:"100%",margin:"0 auto"},children:[(0,w.jsx)(g.Z,{variant:"h6",align:"center",children:"No reviews were found for this item!"}),(0,w.jsx)(h.Z,{onClick:function(){a("review")},className:o.button,children:"Add a review"})]}),(0,w.jsx)(p.Z,{item:!0,container:!0,className:o.allReviews,children:s>0&&i.map((function(e){return(0,w.jsxs)(x.Z,{raised:!0,style:{margin:"10px auto",paddingBottom:"0.5em",width:"90%"},children:[(0,w.jsxs)(p.Z,{item:!0,container:!0,direction:"row",justify:"space-between",style:{paddingTop:"1em",paddingBottom:"0.5em"},children:[(0,w.jsxs)(p.Z,{item:!0,lg:!0,container:!0,direction:"row",justify:"center",alignItems:"center",children:[(0,w.jsx)(v.Z,{style:{marginRight:"0.2em"}}),(0,w.jsx)(g.Z,{variant:"subtitle2",children:e.user})," "]}),(0,w.jsxs)(p.Z,{item:!0,lg:!0,container:!0,direction:"row",alignItems:"center",justify:"center",children:[(0,w.jsx)(Z.Z,{style:{marginRight:"0.3em"}}),(0,w.jsxs)(g.Z,{variant:"subtitle2",children:[e.createdOn.substr(0,10),e.createdOn.substr(11,5)]})]}),(0,w.jsx)(p.Z,{item:!0,lg:!0,container:!0,direction:"row",alignItems:"center",justify:"center",children:(0,d.Z)(Array(e.rating).keys()).map((function(e){return(0,w.jsx)(f.Z,{},e)}))})]}),(0,w.jsx)(p.Z,{item:!0,container:!0,className:o.comment,direction:"row",alignItems:"center",children:(0,w.jsx)(g.Z,{variant:"subtitle2",align:"center",children:e.comment})})]},e.id)}))})]})]})})),C=(0,j.Z)((function(e){return{actionButton:{fontWeight:500,fontFamily:"Heebo",width:"33.3%",margin:"0 1em",border:"0.5px double ".concat(e.palette.common.grey)}}})),E=n(4082),T=n(1079),R=n(7407),F=n(3509),B=n(2124),I=n(6314),N=function(e){var t=e.children,n=e.onClick,i=e.tooltip,r=C();return(0,w.jsx)(F.ZP,{title:i,children:(0,w.jsx)(p.Z,{item:!0,children:(0,w.jsx)(h.Z,{className:r.actionButton,onClick:n,size:"small",color:"primary",children:t})})})},A=(0,o.$j)(null,(function(e){return(0,s.DE)({openModal:y.h7,likeFurnitureAction:l.FX},e)}))((function(e){var t=e.createdBy,n=e.openModal,i=e.id,r=e.likeFurnitureAction,a=e.liked,o=e.setLiked,s=e.onEdit,l=(e.onAddToCart,t===localStorage.getItem("user_email")),c=function(e){o(!0),"remove-like"===e&&o(!1),r({id:i,type:e})};return(0,w.jsxs)(p.Z,{item:!0,container:!0,direction:"row",justify:"flex-end",alignItems:"flex-end",style:{marginBottom:"1em",position:"relative",width:"50%"},children:[!l&&(a?(0,w.jsx)(N,{tooltip:"Dislike",onClick:function(){return c("remove-like")},children:(0,w.jsx)(B.Z,{})}):(0,w.jsx)(N,{tooltip:"Like",onClick:function(){return c("like")},children:(0,w.jsx)(I.Z,{})})),!l&&(0,w.jsx)(N,{tooltip:"Add a review",onClick:function(){n("review")},children:(0,w.jsx)(E.Z,{})}),l&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(N,{tooltip:"Edit furniture",onClick:s,children:(0,w.jsx)(T.Z,{})}),(0,w.jsx)(N,{tooltip:"Delete furniture",onClick:function(){return function(e){n("delete",{id:e,shouldRedirect:!0})}(i)},children:(0,w.jsx)(R.Z,{})})]})]})})),L=n(52),M=(0,j.Z)((function(e){return{detailsContainer:{width:"42em",paddong:"%",height:"100%"},gridItem:{paddingLeft:"2%",paddingRight:"2%",margin:"1%",borderBottom:"1px solid black"}}})),z=function(e){var t=e.currentFurniture,n=e.setLiked,i=e.liked,r=e.onAddToCart,a=e.onEdit,o=M(),s=(0,L.e)().matchesSM,l=[{label:"category",text:t.category},{label:"year",text:t.year},{label:"material",text:t.material},{label:"price",text:"\u20ac ".concat(t.price)}];return(0,w.jsxs)(p.Z,{item:!0,container:!0,className:o.detailsContainer,direction:"column",children:[(0,w.jsxs)(p.Z,{item:!0,container:!0,style:{padding:"0.5em"},children:[(0,w.jsxs)(p.Z,{item:!0,style:{padding:"0.5em",width:"50%"},children:[(0,w.jsx)(g.Z,{align:"left",variant:"h2",style:{textTransform:"uppercase"},children:t.name}),(0,w.jsx)(g.Z,{align:"left",variant:"subtitle1",children:t.createdBy}),(0,w.jsxs)(g.Z,{align:"left",variant:"subtitle1",children:[t.createdOn.substr(0,10)," -",t.createdOn.substr(11,5)]})]}),(0,w.jsx)(A,{id:t.id,liked:i,setLiked:n,createdBy:t.createdBy,onEdit:a,onAddToCart:r})]}),(0,w.jsx)(p.Z,{item:!0,style:{padding:"0.5em",margin:"0 auto",marginTop:"1em",marginBottom:"1em",width:s?"80%":"100%"},children:(0,w.jsx)(g.Z,{align:s?"center":"left",variant:"subtitle2",children:t.description})}),(0,w.jsx)(p.Z,{item:!0,container:!0,direction:"column",alignItems:"center",justify:"center",style:{width:s?"90%":"100%",marginTop:"1em",margin:"0 auto"},children:l.map((function(e,t){return(0,w.jsxs)(p.Z,{item:!0,container:!0,direction:"row",className:o.gridItem,alignItems:"flex-start",justify:"space-between",children:[(0,w.jsx)(p.Z,{item:!0,children:(0,w.jsx)(g.Z,{variant:"h6",children:e.label})}),(0,w.jsx)(p.Z,{item:!0,children:(0,w.jsx)(g.Z,{variant:"caption",align:"center",children:e.text})})]},"".concat(e.label).concat(t))}))})]})},D=n(8596),O=n(9147),S=(0,D.Z)({detailsImageContainer:{width:"40em",padding:"1%",flexDirection:"column",justifyContent:"space-between"},image:{maxHeight:"50em",width:"90%",margin:"0 auto",borderRadius:10},likesWrapper:{padding:"1%",width:"90%",margin:"0 auto",display:"flex",gap:"10px",flexDirection:"row",justifyContent:"space-between",alignItems:"center",cursor:"pointer"},likes:{display:"flex",flexDirection:"row"}}),W=function(e){var t=e.imageURL,n=e.likesCount,i=e.handleLikesOpen,r=S();return(0,w.jsxs)(p.Z,{item:!0,container:!0,className:r.detailsImageContainer,alignItems:"center",justify:"center",children:[(0,w.jsx)(p.Z,{item:!0,children:(0,w.jsx)("img",{src:t,alt:"furniture",className:r.image})}),(0,w.jsxs)(p.Z,{item:!0,container:!0,className:r.likesWrapper,onClick:i,children:[(0,w.jsxs)(p.Z,{item:!0,style:{display:" flex",flexDirection:"row",alignItems:"center",height:"100%",pointerEvents:0===n?"none":void 0},children:[(0,w.jsx)(O.Z,{color:"primary",variant:"body1"}),(0,w.jsxs)(g.Z,{variant:"overline",style:{padding:"0 5px"},children:["Likes(",n,")"]})]}),n>0&&(0,w.jsx)(p.Z,{item:!0,children:(0,w.jsx)(g.Z,{onClick:i,style:{textDecoration:"underline"},children:"see all"})})]})]})},H=(0,j.Z)((function(e){return{appBar:{position:"fixed",left:"0px",width:"90%",margin:"0 auto"},closeButton:{position:"relative",left:"350px",color:"white"}}})),P=n(7462),X=n(5987),Y=n(4164),U=n(503),V=n(8875),$=n(9806),Q=n(3364),_=n(812),q=n(6043);function G(e,t){var n=function(e,t){var n,i=t.getBoundingClientRect();if(t.fakeTransform)n=t.fakeTransform;else{var r=window.getComputedStyle(t);n=r.getPropertyValue("-webkit-transform")||r.getPropertyValue("transform")}var a=0,o=0;if(n&&"none"!==n&&"string"===typeof n){var s=n.split("(")[1].split(")")[0].split(",");a=parseInt(s[4],10),o=parseInt(s[5],10)}return"left"===e?"translateX(".concat(window.innerWidth,"px) translateX(").concat(a-i.left,"px)"):"right"===e?"translateX(-".concat(i.left+i.width-a,"px)"):"up"===e?"translateY(".concat(window.innerHeight,"px) translateY(").concat(o-i.top,"px)"):"translateY(-".concat(i.top+i.height-o,"px)")}(e,t);n&&(t.style.webkitTransform=n,t.style.transform=n)}var J={enter:_.x9.enteringScreen,exit:_.x9.leavingScreen},K=r.forwardRef((function(e,t){var n=e.children,i=e.direction,a=void 0===i?"down":i,o=e.in,s=e.onEnter,l=e.onEntered,c=e.onEntering,d=e.onExit,u=e.onExited,m=e.onExiting,f=e.style,p=e.timeout,g=void 0===p?J:p,h=e.TransitionComponent,x=void 0===h?V.ZP:h,Z=(0,X.Z)(e,["children","direction","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),v=(0,Q.Z)(),j=r.useRef(null),y=r.useCallback((function(e){j.current=Y.findDOMNode(e)}),[]),w=(0,$.Z)(n.ref,y),k=(0,$.Z)(w,t),b=function(e){return function(t){e&&(void 0===t?e(j.current):e(j.current,t))}},C=b((function(e,t){G(a,e),(0,q.n)(e),s&&s(e,t)})),E=b((function(e,t){var n=(0,q.C)({timeout:g,style:f},{mode:"enter"});e.style.webkitTransition=v.transitions.create("-webkit-transform",(0,P.Z)({},n,{easing:v.transitions.easing.easeOut})),e.style.transition=v.transitions.create("transform",(0,P.Z)({},n,{easing:v.transitions.easing.easeOut})),e.style.webkitTransform="none",e.style.transform="none",c&&c(e,t)})),T=b(l),R=b(m),F=b((function(e){var t=(0,q.C)({timeout:g,style:f},{mode:"exit"});e.style.webkitTransition=v.transitions.create("-webkit-transform",(0,P.Z)({},t,{easing:v.transitions.easing.sharp})),e.style.transition=v.transitions.create("transform",(0,P.Z)({},t,{easing:v.transitions.easing.sharp})),G(a,e),d&&d(e)})),B=b((function(e){e.style.webkitTransition="",e.style.transition="",u&&u(e)})),I=r.useCallback((function(){j.current&&G(a,j.current)}),[a]);return r.useEffect((function(){if(!o&&"down"!==a&&"right"!==a){var e=(0,U.Z)((function(){j.current&&G(a,j.current)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}}),[a,o]),r.useEffect((function(){o||I()}),[o,I]),r.createElement(x,(0,P.Z)({nodeRef:j,onEnter:C,onEntered:T,onEntering:E,onExit:F,onExited:B,onExiting:R,appear:!0,in:o,timeout:g},Z),(function(e,t){return r.cloneElement(n,(0,P.Z)({ref:k,style:(0,P.Z)({visibility:"exited"!==e||o?void 0:"hidden"},f,n.props.style)},t))}))})),ee=n(3594),te=n(8182),ne=n(8317),ie=r.forwardRef((function(e,t){var n=e.children,i=e.classes,a=e.className,o=e.disableTypography,s=void 0!==o&&o,l=(0,X.Z)(e,["children","classes","className","disableTypography"]);return r.createElement("div",(0,P.Z)({className:(0,te.Z)(i.root,a),ref:t},l),s?n:r.createElement(g.Z,{component:"h2",variant:"h6"},n))})),re=(0,ne.Z)({root:{margin:0,padding:"16px 24px",flex:"0 0 auto"}},{name:"MuiDialogTitle"})(ie),ae=n(7025),oe=r.forwardRef((function(e,t){var n=e.classes,i=e.className,a=e.dividers,o=void 0!==a&&a,s=(0,X.Z)(e,["classes","className","dividers"]);return r.createElement("div",(0,P.Z)({className:(0,te.Z)(n.root,i,o&&n.dividers),ref:t},s))})),se=(0,ne.Z)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(oe),le=n(14),ce=r.forwardRef((function(e,t){return(0,w.jsx)(K,(0,u.Z)({direction:"up",ref:t},e))})),de=function(e){var t=e.likes,n=e.handleClose,i=e.open,r=H();return(0,w.jsxs)(ee.Z,{open:i,onClose:n,TransitionComponent:ce,scroll:"paper",children:[(0,w.jsxs)(re,{style:{background:"#535559",color:"white"},id:"scroll-dialog-title",align:"left",children:["Likes",(0,w.jsx)(ae.Z,{edge:"start",color:"inherit",onClick:n,"aria-label":"close",className:r.closeButton,children:(0,w.jsx)(le.Z,{})})]}),(0,w.jsx)(se,{dividers:!0,children:(0,w.jsx)(p.Z,{item:!0,container:!0,direction:"column",alignItems:"center",justify:"center",style:{minWidth:"50%"},children:t&&t.length>0&&t.map((function(e,t){return(0,w.jsxs)(p.Z,{item:!0,container:!0,direction:"row",alignItems:"center",style:{padding:"0.5em 2em"},children:[(0,w.jsx)(v.Z,{style:{marginRight:"0.3em"}}),(0,w.jsx)(g.Z,{variant:"subtitle2",style:{minWidth:"200px"},children:e.user})]},t)}))})})]})},ue=(0,o.$j)((function(e){return{currentFurniture:e.furnitureReducer.currentFurniture,currentFurnitureLoaded:e.furnitureReducer.currentFurnitureLoaded}}),(function(e){return(0,s.DE)({openFurnitureAction:l.zc,editFurnitureAction:l.zN,addToCartAction:c.Vn},e)}))((function(e){var t=e.currentFurniture,n=e.openFurnitureAction,o=e.currentFurnitureLoaded,s=e.editFurnitureAction,l=e.addToCartAction,c=(0,a.k6)(),d=(0,r.useState)(!1),u=(0,i.Z)(d,2),m=u[0],f=u[1],g=(0,a.UO)().id,h=(0,L.e)().matchesSM,x=r.useState(!1),Z=(0,i.Z)(x,2),v=Z[0],j=Z[1];(0,r.useEffect)((function(){g&&!o&&n({id:g,shouldRedirect:!0})}),[g,n,o]),(0,r.useEffect)((function(){if(t.likes){var e=localStorage.getItem("username");t.likes.find((function(t){return t.user===e}))&&f(!0)}}),[t.likes]);return o?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(p.Z,{item:!0,container:!0,direction:"row",justify:"space-evenly",alignItems:"center",style:{marginTop:"2em",minHeight:"100%",marginBottom:h?"2em":0},children:[(0,w.jsx)(W,{imageURL:t.image,likes:t.likes?t.likes:[],likesCount:t.likes?t.likes.length:0,handleLikesOpen:function(){return j(!0)}}),(0,w.jsx)(z,{currentFurniture:t,liked:m,setLiked:f,onEdit:function(){var e={name:t.name,category:t.category,year:t.year,description:t.description,price:t.price,image:t.image,material:t.material};s({furniture:e,editing:!0}),c.push("/furniture/edit/".concat(g))},onAddToCart:function(){l(t)}})]}),(0,w.jsx)(b,{id:t.id}),(0,w.jsx)(de,{likes:t.likes?t.likes:[],likesCount:t.likes?t.likes.length:0,id:t.id,handleClose:function(){return j(!v)},open:v})]}):null}))},2124:function(e,t,n){var i=n(5318),r=n(862);t.Z=void 0;var a=r(n(2791)),o=(0,i(n(4894)).default)(a.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite");t.Z=o},6314:function(e,t,n){var i=n(5318),r=n(862);t.Z=void 0;var a=r(n(2791)),o=(0,i(n(4894)).default)(a.createElement("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}),"FavoriteBorder");t.Z=o},3036:function(e,t,n){var i=n(5318),r=n(862);t.Z=void 0;var a=r(n(2791)),o=(0,i(n(4894)).default)(a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");t.Z=o},3037:function(e,t,n){var i=n(5318),r=n(862);t.Z=void 0;var a=r(n(2791)),o=(0,i(n(4894)).default)(a.createElement(a.Fragment,null,a.createElement("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),a.createElement("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"})),"QueryBuilder");t.Z=o}}]);
//# sourceMappingURL=80.7aa6e189.chunk.js.map