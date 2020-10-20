(this["webpackJsonpcourse-info"]=this["webpackJsonpcourse-info"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),l=function(e){var n=e.setQuery;return r.a.createElement("input",{onChange:function(e){return n(e.target.value)},type:"text",placeholder:"Search phonebook..."})},i=function(e){var n=e.handleSubmit,t=e.newName,a=e.newNumber,u=e.setNewName,c=e.setNewNumber;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:function(e){return u(e.target.value)}})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{onClick:n,type:"submit"},"add")))},s=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement(r.a.Fragment,null,n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n.id,n.name)}},"Delete"))},m=function(e){var n=e.persons,t=e.query,a=e.handleDelete,u=new RegExp(t,"gi");return r.a.createElement(r.a.Fragment,null,n.filter((function(e){return e.name.match(u)})).map((function(e){return r.a.createElement("p",{key:e.id},r.a.createElement(s,{handleDelete:a,person:e}))})))},f=function(e){var n=e.message,t=e.type;if(null===n)return null;var a="success"===t?"success":"error";return r.a.createElement("div",{className:a},n)},d=t(3),h=t.n(d),p="/api/persons",b=function(){return h.a.get(p).then((function(e){return e.data}))},E=function(e){return h.a.post(p,e).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},y=function(e,n){return h.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},g=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),d=s[0],h=s[1],p=Object(a.useState)(""),g=Object(o.a)(p,2),w=g[0],N=g[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),k=O[0],S=O[1],D=Object(a.useState)({message:null,type:""}),C=Object(o.a)(D,2),x=C[0],q=C[1];Object(a.useEffect)((function(){b().then((function(e){return u(e)}))}),[]);var A=function(e,n){q({message:e,type:n}),setTimeout((function(){q({message:null,type:""})}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(f,{message:x.message,type:x.type}),r.a.createElement(l,{setQuery:S}),r.a.createElement("h3",null,"Add a new:"),r.a.createElement(i,{newName:d,setNewName:h,newNumber:w,setNewNumber:N,handleSubmit:function(e){if(e.preventDefault(),""!==d&&""!==w){var n=t.find((function(e){return e.name===d}));if(n){if(window.confirm("".concat(d," is already added to the phonebook, replace the old number with a new one?"))){var a={name:n.name,number:w},r=n.id;y(r,a).then((function(e){u(t.map((function(n){return n.id!==r?n:e}))),h(""),N("")})).catch((function(e){A("Entry for ".concat(d," had already been deleted from server"),"error"),u(t.filter((function(e){return e.id!==r})))})),A("Updated ".concat(d),"success")}}else E({name:d,number:w}).then((function(e){u(t.concat(e)),A("Added ".concat(d," to the phonebook"),"success"),h(""),N("")}))}}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(m,{handleDelete:function(e,n){window.confirm("Delete ".concat(n,"?"))&&v(e).then((function(n){u(t.filter((function(n){return n.id!==e}))),A("Deleted Successfully!","success")})).catch((function(a){u(t.filter((function(n){return n.id!==e}))),A("".concat(n," had already been deleted from server"),"error")}))},persons:t,query:k}))};t(36);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.dd31f4c8.chunk.js.map