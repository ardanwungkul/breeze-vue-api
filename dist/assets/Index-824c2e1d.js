import{r as c,o as B,c as u,d as n,e as p,w as l,H as C,f as s,m as T,h as e,E as j,G as V,y,q as g}from"./index-c1909b7c.js";import{u as U}from"./subcategory-8381e1e5.js";import{u as A}from"./stock-cea63cd5.js";import{_ as N}from"./LoadingAdmin-5d743fa9.js";import{_ as F,a as L,b as M,c as E}from"./UntrackedProduct-ff83219b.js";import"./jszip.min-65679adc.js";import"./_commonjs-dynamic-modules-302442b1.js";const P={key:0,class:"w-full space-y-4"},W={class:"flex items-center justify-between gap-4"},q={class:"flex gap-4 items-center w-full"},G={class:"w-full"},H=e("p",{class:"text-typography-2"},"-",-1),I={class:"w-full"},Y=e("i",{class:"fa-solid fa-barcode-scan"},null,-1),z=e("div",{class:"grid grid-cols-4 gap-3"},[e("div",{class:"h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer"},[e("div",{class:"dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center"},[e("i",{class:"fa-solid fa-box text-3xl"})]),e("div",{class:"flex flex-col justify-center items-center w-full"},[e("p",{class:"text-xl font-medium"},"0"),e("p",{class:"text-sm text-center"},"Total Product")])]),e("div",{class:"h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer"},[e("div",{class:"dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center"},[e("i",{class:"fa-solid fa-warehouse text-3xl"})]),e("div",{class:"flex flex-col justify-center items-center w-full"},[e("p",{class:"text-xl font-medium"},"0"),e("p",{class:"text-sm text-center"},"Stock in Warehouse")])]),e("div",{class:"h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer"},[e("div",{class:"dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center"},[e("i",{class:"fa-solid fa-shop text-3xl"})]),e("div",{class:"flex flex-col justify-center items-center w-full"},[e("p",{class:"text-xl font-medium"},"0"),e("p",{class:"text-sm text-center"},"Stock in Shop")])]),e("div",{class:"h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer"},[e("div",{class:"dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center"},[e("i",{class:"fa-solid fa-user text-3xl"})]),e("div",{class:"flex flex-col justify-center items-center w-full"},[e("p",{class:"text-xl font-medium"},"0"),e("p",{class:"text-sm text-center"},"Stock in Agent")])])],-1),J={class:"space-y-4"},ae={__name:"Index",setup(K){const x=A(),d=c(!0),b=c("2024-01-01"),_=c(D());function D(){const h=new Date,a=new Date(h);a.setDate(h.getDate()+1);const k=a.getFullYear(),i=String(a.getMonth()+1).padStart(2,"0"),v=String(a.getDate()).padStart(2,"0");return`${k}-${i}-${v}`}const r=c({categories:[],stock:[],products:[]});B(async()=>{await w.subCategoryAll(),await x.stockAll(),r.value.stock=x.stocks,r.value.products=x.products,r.value.categories=w.subcategories,d.value=!1});const w=U(),m=c(null);return(h,a)=>{const k=u("router-link"),i=u("v-tab"),v=u("v-tabs"),f=u("v-tabs-window-item"),$=u("v-tabs-window");return n(),p(C,null,{default:l(()=>[s(N,{isLoading:d.value},null,8,["isLoading"]),d.value?g("",!0):(n(),T("div",P,[e("div",W,[e("div",q,[e("div",G,[j(e("input",{type:"date","onUpdate:modelValue":a[0]||(a[0]=t=>b.value=t),class:"p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm w-full"},null,512),[[V,b.value]])]),H,e("div",I,[j(e("input",{type:"date","onUpdate:modelValue":a[1]||(a[1]=t=>_.value=t),class:"p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm w-full"},null,512),[[V,_.value]])])]),s(k,{to:{name:"admin.stock.scan"},class:"py-2 px-3 border rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 border-gray-600 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm h-full"},{default:l(()=>[Y]),_:1})]),z,e("div",J,[s(v,{modelValue:m.value,"onUpdate:modelValue":a[2]||(a[2]=t=>m.value=t),class:"dark:bg-dark-primary-2 bg-light-primary-1 dark:text-light-primary-1 dark:!border-typography-2 border rounded-lg shadow-lg"},{default:l(()=>[s(i,{value:"one"},{default:l(()=>[y("Total Stock")]),_:1}),s(i,{value:"two"},{default:l(()=>[y("Stock in Warehouse")]),_:1}),s(i,{value:"three"},{default:l(()=>[y("Stock in Agents")]),_:1}),s(i,{value:"four"},{default:l(()=>[y("Untracked Product")]),_:1})]),_:1},8,["modelValue"]),s($,{modelValue:m.value,"onUpdate:modelValue":a[3]||(a[3]=t=>m.value=t),class:"dark:bg-dark-primary-2 bg-light-primary-1 dark:text-light-primary-1 p-3 dark:!border-typography-2 border rounded-lg shadow-lg"},{default:l(()=>[s(f,{value:"one"},{default:l(()=>{var t,o;return[d.value?g("",!0):(n(),p(F,{key:0,data:(t=r.value)==null?void 0:t.stock,categories:(o=r.value)==null?void 0:o.categories},null,8,["data","categories"]))]}),_:1}),s(f,{value:"two"},{default:l(()=>{var t;return[d.value?g("",!0):(n(),p(L,{key:0,data:r.value,categories:(t=r.value)==null?void 0:t.categories},null,8,["data","categories"]))]}),_:1}),s(f,{value:"three"},{default:l(()=>{var t,o;return[d.value?g("",!0):(n(),p(M,{key:0,data:(t=r.value)==null?void 0:t.stock,categories:(o=r.value)==null?void 0:o.categories},null,8,["data","categories"]))]}),_:1}),s(f,{value:"four"},{default:l(()=>{var t,o,S;return[d.value?g("",!0):(n(),p(E,{key:0,data:(t=r.value)==null?void 0:t.stock,products:(o=r.value)==null?void 0:o.products,categories:(S=r.value)==null?void 0:S.categories},null,8,["data","products","categories"]))]}),_:1})]),_:1},8,["modelValue"])])]))]),_:1})}}};export{ae as default};
