import{k as J,l as G,r as m,d as t,m as r,F as M,p as V,n as L,q as g,h as e,f as i,w as p,i as k,R as D,c as y,e as $,S as I,s as W,v as O,N,A as E,D as B,x as R,t as _,y as Z,z as X,B as U,C as K,_ as Q,g as Y,E as F,G as H}from"./index-c1909b7c.js";import{u as ee}from"./category-f4696131.js";import{s as T}from"./vue-multiselect-fefa59c1.js";const te="/assets/skincare6-acd66200.png",se=J({id:"shop",state:()=>({data:[],loading:!1,error:null}),actions:{async getData(x){x.value=!0;try{const l=await G.get("/api/shop-page");this.data=l.data}catch(l){console.error("Error fetching data:",l),this.error=l}finally{x.value=!1}}}}),oe={class:"w-full min-h-52 md:min-h-96 relative overflow-hidden bg-black"},le=["src","alt"],ae=["src","alt"],re=e("div",{class:"w-full min-h-96 bg-black/50 absolute top-0 left-0 z-20"},null,-1),ne={class:"absolute top-0 right-8 md:right-14 flex flex-col min-h-full gap-5 justify-center z-30"},ce=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 1227",fill:"none"},[e("g",{"clip-path":"url(#a)"},[e("path",{d:"M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z",fill:"#ffffff",class:"fill-000000"})]),e("defs",null,[e("clipPath",{id:"a"},[e("path",{fill:"#ffffff",d:"M0 0h1200v1227H0z",class:"fill-ffffff"})])])],-1),ie=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 56.7 56.7","xml:space":"preserve"},[e("path",{d:"M28.2 16.7c-7 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8S41 36.5 41 29.5s-5.8-12.8-12.8-12.8zm0 21c-4.5 0-8.2-3.7-8.2-8.2s3.7-8.2 8.2-8.2 8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z",fill:"#ffffff",class:"fill-000000"}),e("circle",{cx:"41.5",cy:"16.4",r:"2.9",fill:"#ffffff",class:"fill-000000"}),e("path",{d:"M49 8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7 0-14.5 5.8-14.5 14.5v20.5c0 4.3 1.4 8 4.2 10.7 2.7 2.6 6.3 3.9 10.4 3.9h20.4c4.3 0 7.9-1.4 10.5-3.9 2.7-2.6 4.1-6.3 4.1-10.6V19.3c0-4.2-1.4-7.8-4-10.4zm-.4 31c0 3.1-1.1 5.6-2.9 7.3s-4.3 2.6-7.3 2.6H18c-3 0-5.5-.9-7.3-2.6C8.9 45.4 8 42.9 8 39.8V19.3c0-3 .9-5.5 2.7-7.3 1.7-1.7 4.3-2.6 7.3-2.6h20.6c3 0 5.5.9 7.3 2.7 1.7 1.8 2.7 4.3 2.7 7.2v20.6z",fill:"#ffffff",class:"fill-000000"})],-1),de=e("svg",{viewBox:"0 0 56.693 56.693","xml:space":"preserve",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M40.43 21.739h-7.645v-5.014c0-1.883 1.248-2.322 2.127-2.322h5.395V6.125l-7.43-.029c-8.248 0-10.125 6.174-10.125 10.125v5.518h-4.77v8.53h4.77v24.137h10.033V30.269h6.77l.875-8.53z",fill:"#ffffff",class:"fill-000000"})],-1),ue={class:"absolute bottom-4 md:bottom-9 flex flow-row w-full gap-5 justify-center z-30"},pe=["onClick"],_e={__name:"MainBanner",props:{main_banner:Object},setup(x){const l=m("https://api.ezzora.sites.id/"),n=m(0),f=async o=>{n.value=o};return(o,d)=>(t(),r("div",oe,[(t(!0),r(M,null,V(x.main_banner,(c,s)=>(t(),r("div",{key:s,class:L([{active:n.value===s,"z-0":n.value!==s},"absolute top-0 left-0 curved-c w-full min-h-full overflow-hidden flex justify-center items-center"])},[c.main_banner_type=="video"?(t(),r("video",{key:0,class:"mt-0 md:mt-auto object-cover w-full h-full",src:l.value+"/storage/media/shop/main-banner/"+c.main_banner_media,alt:c.main_banner_alt,autoplay:"",muted:"",loop:""},null,8,le)):g("",!0),c.main_banner_type=="image"?(t(),r("img",{key:1,src:l.value+"/storage/media/shop/main-banner/"+c.main_banner_media,class:"mt-0 md:mt-auto object-cover w-full h-full",alt:c.main_banner_alt},null,8,ae)):g("",!0)],2))),128)),re,e("div",ne,[i(k(D),{to:"#",class:"ml-0.5 w-5 min-h-5 duration-200 hover:scale-125"},{default:p(()=>[ce]),_:1}),i(k(D),{to:"#",class:"w-6 min-h-6 duration-200 hover:scale-125"},{default:p(()=>[ie]),_:1}),i(k(D),{to:"#",class:"w-6 min-h-6 duration-200 hover:scale-125"},{default:p(()=>[de]),_:1})]),e("div",ue,[(t(!0),r(M,null,V(x.main_banner,(c,s)=>(t(),r("button",{key:s,onClick:h=>f(s),class:L([{"w-8":n.value===s,"w-4":n.value!==s},"min-h-4 rounded-[8px] duration-300 bg-white"])},null,10,pe))),128))])]))}};const fe={class:"w-full max-h-32 md:min-h-52 md:max-h-52 bg-black flex items-center relative"},he={class:"w-full h-full flex justify-center items-center"},me=e("div",{class:"absolute w-full h-full bg-black/50"},null,-1),ve=e("div",{class:"absolute z-30 flex flex-row w-full min-h-full top-0 justify-between"},[e("div",{class:"swiper-button-prev opacity-50 duration-200 hover:opacity-100 min-h-full flex justify-center items-center cursor-pointer pl-10 md:pl-20"},[e("div",{class:"w-12 h-12 bg-black"},[e("svg",{height:"48",viewBox:"0 0 48 48",width:"48",xmlns:"http://www.w3.org/2000/svg"},[e("path",{fill:"white",d:"M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z"}),e("path",{d:"M0-.5h48v48h-48z",fill:"none"})])])]),e("div",{class:"swiper-button-next opacity-50 duration-200 hover:opacity-100 min-h-full flex justify-center items-center cursor-pointer pr-10 md:pr-20"},[e("div",{class:"w-12 h-12 bg-black"},[e("svg",{height:"48",viewBox:"0 0 48 48",width:"48",xmlns:"http://www.w3.org/2000/svg"},[e("path",{fill:"white",d:"M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"}),e("path",{d:"M0-.25h48v48h-48z",fill:"none"})])])])],-1),ge={__name:"SecondaryBanner",props:{secondary_banner:Object},setup(x){const l=[N,E],n=d=>{},f={slidePerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},loop:!1,speed:1300,allowTouchMove:!1,autoplay:{delay:3e3}},o=m("https://api.ezzora.sites.id/");return(d,c)=>{const s=y("v-progress-circular"),h=y("v-img");return t(),$(k(O),W({class:"w-full max-w-full min-h-full mb-2",navigation:f.navigation,modules:l},f,{onSwiper:n}),{default:p(()=>[(t(!0),r(M,null,V(x.secondary_banner,(z,w)=>(t(),$(k(I),{key:w},{default:p(()=>[e("div",fe,[i(h,{src:o.value+"/storage/media/shop/secondary-banner/"+z.second_banner_media,"aspect-ratio":"1",class:"min-w-full max-w-full min-h-full"},{placeholder:p(()=>[e("div",he,[i(s,{color:"",indeterminate:""})])]),_:2},1032,["src"]),me])]),_:2},1024))),128)),ve]),_:1},16,["navigation"])}}},xe={class:"w-full h-full flex justify-center items-center"},we={__name:"SideBanner",props:{side_banner:Object},setup(x){const l=[N,E],n=d=>{},f={navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}},o=m("https://api.ezzora.sites.id/");return(d,c)=>{const s=y("v-progress-circular"),h=y("v-img");return t(),$(k(O),{navigation:f.navigation,modules:l,loop:!1,speed:100,allowTouchMove:!0,autoplay:{delay:3e3},onSwiper:n,class:"w-full h-full"},{default:p(()=>[(t(!0),r(M,null,V(x.side_banner,(z,w)=>(t(),$(k(I),{key:w},{default:p(()=>[i(h,{src:o.value+"/storage/media/shop/side-banner/"+z.side_banner_media,"aspect-ratio":"1",class:"min-h-full lazyload",cover:""},{placeholder:p(()=>[e("div",xe,[i(s,{color:"",indeterminate:""})])]),_:2},1032,["src"])]),_:2},1024))),128))]),_:1},8,["navigation"])}}},be={key:0,class:"w-full"},ye={class:"w-full pt-4 pb-10 md:max-w-[1320px] mx-auto relative space-y-4"},$e={class:"space-y-3 z-20 relative"},ke={class:"flex justify-start ml-4 text-2xl font-semibold text-orange-600 uppercase items-center pt-3"},ze={class:"bg-orange-600 w-min py-2 px-4 rounded-r-xl text-white shadow-lg"},Se={class:"flex gap-3"},je=e("p",{class:"whitespace-nowrap"},"Ends in",-1),Ce={class:"flex gap-1"},Pe={class:"bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center"},Me={class:"text-xs font-semibold"},Ve={class:"bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center"},Be={class:"text-xs font-semibold"},Le={class:"bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center"},De={class:"text-xs font-semibold"},Ie={class:"bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center"},Oe={class:"text-xs font-semibold"},Ne={class:"w-full relative z-10 px-5"},Ee={key:0,class:"flex flex-col justify-center items-center bg-ezzora-100 border shadow-lg mb-10 rounded-md overflow-hidden"},Re={class:"h-[144px] w-full"},Ae={class:"w-full h-full flex justify-center items-center"},Ue={class:"p-4 w-full bg-light-primary-1"},Fe={class:"w-full"},He={class:"font-medium line-clamp-1"},Te={class:"flex items-end"},qe={class:"w-full"},Je={class:"flex items-center gap-2 mt-3"},Ge={class:"text-xs whitespace-nowrap text-gray-500 line-through"},We={class:"bg-orange-100"},Ze={class:"text-xs text-orange-600 px-1"},Xe={class:"text-xl text-orange-600 font-semibold whitespace-nowrap"},Ke=e("span",{class:"text-sm font-light"}," Rp.",-1),Qe=e("p",{class:"font-medium whitespace-nowrap bg-orange-600 text-white rounded-lg px-3 py-1 text-sm"}," Buy Now ",-1),Ye={key:0,class:"text-white"},et={key:1,class:"text-white"},tt=e("div",{class:"absolute bg-gradient-to-b from-ezzora-100 to-ezzora-50 top-0 h-40 w-full z-0 rounded"},null,-1),st={__name:"FlashSale",props:{flash_sale:Object},setup(x){const l=[N,E],n=u=>{};function f(u){return u.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}const o=m("https://api.ezzora.sites.id/"),d=m([]),c=m(null),s=m({days:null,hours:null,minutes:null,seconds:null}),h=m([]),z=B.now(),w=x;return R(async()=>{var P;d.value=w.flash_sale;const u=w.flash_sale.filter(b=>{const S=B.fromISO(b.flash_sale_from),C=B.fromISO(b.flash_sale_until);return S<=z&&C>=z}).sort((b,S)=>B.fromISO(b.flash_sale_from).toMillis()-B.fromISO(S.flash_sale_from).toMillis());if(c.value=u.length>0?u[0]:null,c.value){const b=B.fromISO(c.value.flash_sale_until),S=()=>{const a=B.now(),j=b.diff(a,["days","hours","minutes","seconds"]);s.value={days:j.days,hours:j.hours,minutes:j.minutes,seconds:String(Math.floor(j.seconds)).padStart(2,"0")},j<=X.fromObject({seconds:1})&&(clearInterval(C),c.value="")};S();const C=setInterval(S,1e3)}h.value=(P=c.value)==null?void 0:P.flash_sale_product.filter(b=>b.flash_sale_status==!0)}),(u,P)=>{var j,A;const b=y("v-progress-circular"),S=y("v-img"),C=y("router-link"),a=y("v-progress-linear");return c.value&&((j=h.value)==null?void 0:j.length)>0?(t(),r("div",be,[e("div",ye,[e("div",$e,[e("div",ke,[e("p",null,"FLASH SALE "+_((A=c.value)==null?void 0:A.flash_sale_title),1)]),e("div",ze,[e("div",Se,[je,e("div",Ce,[e("div",Pe,[e("p",Me,_(s.value.days),1)]),e("div",Ve,[e("p",Be,_(s.value.hours),1)]),e("div",Le,[e("p",De,_(s.value.minutes),1)]),e("div",Ie,[e("p",Oe,_(s.value.seconds),1)])])])])]),e("div",Ne,[i(k(O),{class:"max-w-full mb-2",breakpoints:{640:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:4,spaceBetween:20}},loop:!1,modules:l,onSwiper:n},{default:p(()=>[(t(!0),r(M,null,V(h.value,(v,q)=>(t(),$(k(I),{key:q},{default:p(()=>[v.flash_sale_status?(t(),r("div",Ee,[e("div",Re,[i(S,{src:o.value+"/storage/images/product/"+v.product.product_image,class:"min-h-full w-full object-contain lazyload"},{placeholder:p(()=>[e("div",Ae,[i(b,{color:"",indeterminate:""})])]),_:2},1032,["src"])]),e("div",Ue,[e("div",Fe,[i(C,{to:{name:"product.detail",params:{slug:v.product.product_slug,id:v.product.id}}},{default:p(()=>[e("p",He,_(v.product.product_name),1)]),_:2},1032,["to"])]),e("div",Te,[e("div",qe,[e("div",Je,[e("p",Ge," Rp"+_(f(v.product.product_price)),1),e("div",We,[e("p",Ze," -"+_(v.flash_sale_percentage)+"% ",1)])]),e("p",Xe,[Ke,Z(" "+_(f(v.flash_sale_price)),1)])]),i(C,{to:{name:"product.detail",params:{slug:v.product.product_slug,id:v.product.id}}},{default:p(()=>[Qe]),_:2},1032,["to"])]),i(a,{"model-value":v.flash_sale_sold/v.flash_sale_stock*100,class:"mt-3 rounded-lg text-xs text-orange-600 !bg-orange-100",height:25},{default:p(({value:Us})=>[v.flash_sale_stock-v.flash_sale_sold!==0?(t(),r("span",Ye,_(v.flash_sale_stock-v.flash_sale_sold)+" Stock Available",1)):g("",!0),v.flash_sale_stock-v.flash_sale_sold==0?(t(),r("span",et," Out Of Stock")):g("",!0)]),_:2},1032,["model-value"])])])):g("",!0)]),_:2},1024))),128))]),_:1})]),tt])])):g("",!0)}}},ot={class:"border border-t-transparent py-4 mb-5"},lt=e("div",{class:"font-medium mb-4 px-4"},"Categories",-1),at=["onClick"],rt={class:""},nt=e("svg",{class:"feather feather-chevron-down",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},[e("polyline",{points:"6 9 12 15 18 9"})],-1),ct=[nt],it={__name:"FilterCategories",props:{type:{type:String}},setup(x){const l=ee();m([]);const n=m([]);R(async()=>{await f()});async function f(){await l.categoryWithSubCategory(),n.value=l.allCategories.map(d=>({name:d.category_name,id:d.id,subcategories:d.sub_category}))}const o=m();return(d,c)=>(t(),r("div",ot,[lt,(t(!0),r(M,null,V(n.value,s=>(t(),r("div",{key:s.id,class:"w-full"},[e("div",{onClick:h=>o.value=o.value===s.id?0:s.id,class:"w-full flex flex-row px-4 py-2 justify-between border-b hover:text-darkbrownshop"},[e("div",rt,_(s.name),1),e("div",{class:L([{"rotate-180":o.value===s.id,"":o.value!==s.id},"duration-300"])},ct,2)],8,at),e("div",{class:L([{block:o.value===s.id,hidden:o.value!==s.id},"bg-brownshop py-4"])},[(t(!0),r(M,null,V(s.subcategories,h=>(t(),r("button",{key:h.id,class:"w-full py-1 px-4 text-left hover:bg-white"},_(h.sub_category_name),1))),128))],2)]))),128))]))}};const dt={class:"flex flex-col justify-center mx-auto w-full px-4 lg:px-5 md:max-w-[1320px] relative"},ut={class:"w-full flex flex-row gap-5"},pt={class:"w-full"},_t={class:"w-full"},ft={class:"border-t"},ht=e("td",{class:"font-bold text-lg w-1/3 text-gray-500"}," Select Product ",-1),mt={class:"w-1/3 p-1 md:p-4"},vt={class:"w-1/3 p-1 md:p-4"},gt={class:"border-t"},xt=e("td",{class:"font-bold text-lg w-full py-4 flex text-gray-500"}," Product Image ",-1),wt={class:"w-1/3 p-1 md:p-4"},bt={class:"w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center border shadow-lg overflow-hidden"},yt={class:"w-full h-full flex justify-center items-center"},$t={class:"w-1/3 p-1 md:p-4"},kt={class:"w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center border shadow-lg overflow-hidden"},zt={class:"w-full h-full flex justify-center items-center"},St={class:"border-t"},jt=e("td",{class:"font-bold text-lg w-1/3 text-gray-500"}," Product Price ",-1),Ct={class:"w-1/3 text-gray-500 p-4"},Pt={class:"w-1/3 text-gray-500 p-4"},Mt={class:"border-t"},Vt=e("td",{class:"font-bold text-lg w-1/3 text-gray-500"}," Product Description ",-1),Bt={class:"w-1/3 text-gray-500 p-4"},Lt={class:"w-1/3 text-gray-500 p-4"},Dt={key:0,class:"border-t"},It=e("td",{class:"font-bold text-lg w-1/3 text-gray-500"},null,-1),Ot={class:"w-1/3 text-gray-500 p-4"},Nt=e("button",{type:"button",class:"border bg-secondary-3 text-white px-3 py-1 rounded-lg hover:bg-opacity-90"}," Views Product ",-1),Et={class:"w-1/3 text-gray-500 p-4"},Rt=e("button",{type:"button",class:"border bg-secondary-3 text-white px-3 py-1 rounded-lg hover:bg-opacity-90"}," Views Product ",-1),At={__name:"CompareProduct",props:{products:Object},setup(x){const l=m(""),n=m(""),f=m({price:null,image:U,description:null}),o=m({price:null,image:U,description:null});async function d(c){c=="1"?(f.value.price=l.value.product_price,f.value.description=l.value.product_description,f.value.image="https://api.ezzora.sites.id//storage/images/product/"+l.value.product_image):c=="2"&&(o.value.price=n.value.product_price,o.value.description=n.value.product_description,o.value.image="https://api.ezzora.sites.id//storage/images/product/"+n.value.product_image)}return(c,s)=>{const h=y("v-progress-circular"),z=y("v-img"),w=y("router-link");return t(),r("div",dt,[e("div",ut,[e("div",pt,[e("table",_t,[e("tr",ft,[ht,e("td",mt,[i(k(T),{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=u=>l.value=u),onSelect:s[1]||(s[1]=u=>d(1)),options:x.products,searchable:!0,"close-on-select":!0,label:"product_name","track-by":"product_name","preserve-search":!0,placeholder:"Select Product"},null,8,["modelValue","options"])]),e("td",vt,[i(k(T),{modelValue:n.value,"onUpdate:modelValue":s[2]||(s[2]=u=>n.value=u),onSelect:s[3]||(s[3]=u=>d(2)),options:x.products,searchable:!0,"close-on-select":!0,label:"product_name","track-by":"product_name","preserve-search":!0,placeholder:"Select Product"},null,8,["modelValue","options"])])]),e("tr",gt,[xt,e("td",wt,[e("div",bt,[i(z,{src:f.value.image,"aspect-ratio":"1",class:"w-full aspect-square",cover:""},{placeholder:p(()=>[e("div",yt,[i(h,{color:"",indeterminate:""})])]),_:1},8,["src"])])]),e("td",$t,[e("div",kt,[i(z,{src:o.value.image,"aspect-ratio":"1",class:"w-full aspect-square",cover:""},{placeholder:p(()=>[e("div",zt,[i(h,{color:"",indeterminate:""})])]),_:1},8,["src"])])])]),e("tr",St,[jt,e("td",Ct,_(f.value.price?f.value.price:"N/A"),1),e("td",Pt,_(o.value.price?o.value.price:"N/A"),1)]),e("tr",Mt,[Vt,e("td",Bt,_(f.value.description?o.value.description:"N/A"),1),e("td",Lt,_(o.value.description?o.value.description:"N/A"),1)]),l.value||n.value?(t(),r("tr",Dt,[It,e("td",Ot,[l.value?(t(),$(w,{key:0,to:{name:"product.detail",params:{slug:l.value.product_slug,id:l.value.id}}},{default:p(()=>[Nt]),_:1},8,["to"])):g("",!0)]),e("td",Et,[n.value?(t(),$(w,{key:0,to:{name:"product.detail",params:{slug:n.value.product_slug,id:n.value.id}}},{default:p(()=>[Rt]),_:1},8,["to"])):g("",!0)])])):g("",!0)])])])])}}};const Ut={class:"w-full py-8 px-4 md:px-8 lg:px-0 md:py-16"},Ft={class:"flex flex-col mx-auto w-full max-w-[100vw] md:max-w-[1320px] relative"},Ht={class:"w-full px-0 md:px-8 lg:px-0 pb-16"},Tt={class:"flex flex-col justify-center mx-auto w-full max-w-[1320px] relative"},qt={class:"w-full flex flex-col md:flex-row gap-5 sm:gap-0"},Jt={class:"hidden md:block w-1/4 md:pl-4 2xl:pl-0"},Gt={class:"border p-4"},Wt=e("div",{class:"font-medium mb-2"},"Filter by Price",-1),Zt={class:"mt-2 mb-6"},Xt={class:"w-full mt-5 md:h-[500px] lg:h-[700px]"},Kt={class:"w-full md:w-3/4 flex flex-col"},Qt={class:"sticky top-14 bg-[#f8f8f6] flex p-4 md:px-5 md:py-2 flex-col md:flex-row md:gap-5 justify-between md:items-center mb-5 z-30"},Yt={class:"mb-2 md:mb-0 flex max-h-10"},es={class:"flex"},ts=e("div",{class:"min-w-10 border flex justify-center items-center border-gray-200"},[e("svg",{height:"20",viewBox:"0 0 24 24",width:"20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{fill:"#D19C97",d:"M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"})])],-1),ss={class:"flex w-full justify-end md:hidden"},os=e("svg",{"enable-background":"new 0 0 32 32",id:"Glyph",version:"1.1",viewBox:"0 0 32 32","xml:space":"preserve",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[e("path",{fill:"#D19C97",d:"M29.815,6.168C29.484,5.448,28.783,5,27.986,5H4.014c-0.797,0-1.498,0.448-1.83,1.168  c-0.329,0.714-0.215,1.53,0.297,2.128c0,0,0.001,0.001,0.001,0.001L12,19.371V28c0,0.369,0.203,0.708,0.528,0.882  C12.676,28.961,12.838,29,13,29c0.194,0,0.387-0.057,0.555-0.168l6-4C19.833,24.646,20,24.334,20,24v-4.629l9.519-11.074  C30.031,7.698,30.145,6.882,29.815,6.168z",id:"XMLID_276_"})],-1),ls=[os],as={key:0,class:"grid duration-300 px-4 md:px-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:mb-10"},rs={key:0,class:"absolute top-3 right-3 z-10 bg-ezzora-500 rounded-xl px-3 py-1 text-sm flex items-center gap-1 shadow-lg border !border-typography-2"},ns={class:"text-xs text-typography-1"},cs=e("i",{class:"fa-solid fa-tags text-xs text-typography-1"},null,-1),is={class:"w-full relative"},ds={class:"relative"},us={key:0,class:"float-right clear-right"},ps={class:"absolute z-[1] top-0 right-0"},_s={class:"w-[100px] h-[100px] text-white text-sm p-0 -mx-1 -mt-1 -mb-[10px] rounded leading-5 flex items-center justify-center relative overflow-hidden"},fs=e("i",{class:"template-span-before bg-[#fd70ff] border-[#fd70ff]"},null,-1),hs=e("i",{class:"template-i bg-transparent block absolute z-2 border-b-4 border-l-4 border-l-transparent filter brightness-50 left-[34px] top-0 w-[11px]"},null,-1),ms=e("i",{class:"template-i-before bg-[#fd70ff] border-[#fd70ff] bg-gradient-to-r from-[#ff69fa] to-[#9881f7] block absolute h-[22px] w-[130px] left-[12px] top-[12px] text-center transform -moz-transform -ms-transform -webkit-transform rotate-45 -o-transform z-[3]"},null,-1),vs=e("i",{class:"template-i-after bg-transparent block absolute h-[11px] w-0 border-b-4 border-l-4 border-b-transparent filter brightness-50 bottom-[34px] right-0 z-[2]"},null,-1),gs={class:"w-full h-full flex justify-center items-center"},xs={class:"p-4"},ws={class:"text-sm font-medium mb-2 line-clamp-2"},bs={class:"flex justify-between items-end"},ys={class:""},$s=e("button",{class:"text-sm bg-secondary-3 hover:bg-opacity-80 text-typography-1 font-medium p-2 px-3 duration-300 hover:border-transparent rounded-xl"}," Buy ",-1),ks={class:"text-slate-500 text-xs md:text-normal flex flex-col"},zs={key:0,class:""},Ss={class:"text-xs !leading-none pt-1 line-through text-typography-2 !text-end"},js={class:"text-sm font-semibold whitespace-nowrap text-typography-3"},Cs={key:1,class:"p-5"},Ps=e("div",{class:"w-full bg-ezzora-100 rounded-lg p-5"},[e("p",{class:"text-center font-bold text-typography-2"}," No Products Found ")],-1),Ms=[Ps],Vs={class:"w-full flex justify-center h-5 static top-0 mb-3"},Bs={height:"24px",id:"Layer_1",style:{"enable-background":"new 0 0 512 512"},version:"1.1",viewBox:"0 0 512 512",width:"24px","xml:space":"preserve",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},Ls=e("path",{fill:"#D19C97",d:"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"},null,-1),Ds=[Ls],Is=e("div",{class:"w-full h-[55vh] overflow-auto"},[e("div",{class:"border p-4"},[e("div",{class:"font-medium mb-2"}," Filter by Price "),e("input",{id:"medium-range",type:"range",min:"0",max:"300000",value:"0",class:"w-full h-1 bg-gray-400 border-none accent-slate-700 rounded-lg cursor-pointer"}),e("div",{class:"mt-2 mb-6"},"Rp.")]),e("div",{class:"border border-t-transparent py-4 mb-4"},[e("div",{class:"font-medium mb-4 px-4"}," Categories ")])],-1),Os={class:"w-full pb-16"},Ns={style:{"background-color":"rgb(229, 231, 243)"},class:"flex flex-row items-center justify-between mx-auto p-8 md:p-16 w-full max-w-[1320px] relative"},Es=e("div",{class:"w-3/5 flex flex-col justify-start"},[e("div",{class:"mb-5 text-sm md:text-base text-gray-500"}," Hurry ip and get 25% discount "),e("div",{class:"mb-3 text-lg md:text-3xl"}," Deals of the week "),e("div",{class:"text-gray-500 text-xs md:text-base mb-5"}," Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, nesciunt? Unde voluptas doloribus quia et. Lorem ipsum dolor sit amet consectetur adipisicing. "),e("div",null,[e("button",{class:"text-sm py-1 px-2 md:text-base md:py-2 md:px-3 bg-red-600 duration-200 hover:bg-red-700 text-white"}," Show Collection ")])],-1),Rs={class:"w-1/3 h-36 md:h-72 flex items-center justify-center"},As={class:"w-full h-full flex justify-center items-center"},qs={__name:"Shop",setup(x){const l=m(!0),n=se(),f="https://api.ezzora.sites.id/",o=m([]),d=m({search:"",price:0}),c=K(()=>(o.value.product||[]).filter(u=>{const P=d.value.search===""||u.product_name.toLowerCase().includes(d.value.search.toLowerCase()),b=d.value.price===0||u.product_price<=d.value.price;return P&&b}));R(async()=>{await n.getData(l),o.value=n.data,l.value=n.loading});function s(w){return w.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}m(5);const h=m("no"),z=async w=>{h.value=w};return(w,u)=>{const P=y("v-progress-circular"),b=y("v-img"),S=y("router-link");return t(),$(Q,null,{default:p(()=>{var C;return[i(Y,{isLoading:l.value},null,8,["isLoading"]),l.value?g("",!0):(t(),$(_e,{key:0,main_banner:o.value.main_banner},null,8,["main_banner"])),e("div",Ut,[e("div",Ft,[l.value?g("",!0):(t(),$(ge,{key:0,secondary_banner:o.value.secondary_banner},null,8,["secondary_banner"]))])]),o.value.flash_sale?(t(),$(st,{key:1,flash_sale:o.value.flash_sale},null,8,["flash_sale"])):g("",!0),e("div",Ht,[e("div",Tt,[e("div",qt,[e("div",Jt,[e("div",Gt,[Wt,F(e("input",{"onUpdate:modelValue":u[0]||(u[0]=a=>d.value.price=a),id:"medium-range",type:"range",min:"0",max:"300000",value:"0",class:"w-full h-1 bg-gray-400 border-none accent-slate-700 rounded-lg cursor-pointer"},null,512),[[H,d.value.price]]),e("div",Zt," Rp. "+_(s(d.value.price)),1)]),i(it),e("div",Xt,[o.value.side_banner?(t(),$(we,{key:0,side_banner:o.value.side_banner},null,8,["side_banner"])):g("",!0)])]),e("div",Kt,[e("div",Qt,[e("div",Yt,[e("div",es,[F(e("input",{"onUpdate:modelValue":u[1]||(u[1]=a=>d.value.search=a),type:"text",class:"text-gray-600 border bg-transparent border-gray-200 focus:ring-transparent focus:border-gray-200",placeholder:"Search by name"},null,512),[[H,d.value.search]]),ts]),e("div",ss,[e("button",{onClick:u[2]||(u[2]=a=>z("yes")),class:"flex w-6 h-6 justify-end md:hidden hover:scale-110 duration-200"},ls)])])]),e("div",null,[c.value.length>0&&c.value?(t(),r("div",as,[(t(!0),r(M,null,V(c.value,(a,j)=>(t(),r("div",{class:"flex flex-col rounded-xl w-full shadow-lg shadow-black/15 relative",key:j},[a.product_promo_price?(t(),r("div",rs,[e("p",ns," - "+_(parseInt((parseInt(a.product_promo_price)-parseInt(a.product_price))/parseInt(a.product_promo_price)*100))+"% ",1),cs])):g("",!0),e("div",is,[e("div",ds,[a.product_tags?(t(),r("div",us,[e("div",ps,[e("span",_s,[fs,hs,ms,vs,e("b",{class:L([a.product_tags&&a.product_tags==="featured"?"text-[10px]":"text-sm","text-center z-[3] bg-transparent block left-[12px] leading-[22px] h-[22px] absolute top-[12px] transform rotate-45 -moz-transform -ms-transform -webkit-transform -o-transform w-[130px]"])},_(a.product_tags==="new"?"NEW":a.product_tags==="sale"?"SALE":a.product_tags==="featured"?"FEATURED":""),3)])])])):g("",!0),i(b,{src:k(f)+"/storage/images/product/"+a.product_image,"aspect-ratio":"1",cover:"",class:"!w-full !rounded-t-xl"},{placeholder:p(()=>[e("div",gs,[i(P,{color:"",indeterminate:""})])]),_:2},1032,["src"])])]),e("div",xs,[e("div",ws,_(a.product_name),1),e("div",bs,[e("div",ys,[i(S,{to:{name:"product.detail",params:{slug:a.product_slug,id:a.id}},class:""},{default:p(()=>[$s]),_:2},1032,["to"])]),e("div",ks,[a!=null&&a.product_promo_price?(t(),r("div",zs,[e("p",Ss," Rp. "+_(s(a==null?void 0:a.product_promo_price)),1)])):g("",!0),e("p",js," Rp. "+_(s(a.product_price)),1)])])])]))),128))])):(t(),r("div",Cs,Ms))]),o.value.product?(t(),$(At,{key:0,products:(C=o.value)==null?void 0:C.product},null,8,["products"])):g("",!0)]),e("div",{class:L([{block:h.value==="yes"," hidden":h.value!=="yes"},"bg-black w-screen min-h-screen fixed top-0 left-0 z-30 opacity-40 duration-700"])},null,2),e("div",{class:L([{"":h.value==="yes","translate-y-full":h.value!=="yes"},"fixed bottom-0 left-0 border-t border-gray-500 rounded-t z-40 max-h-[70vh] p-4 md:p-0 md:hidden w-full duration-700 bg-[#f8f8f6]"])},[e("div",Vs,[e("button",{onClick:u[3]||(u[3]=a=>z("no")),class:"max-w-6 max-h-6 duration-200 hover:scale-110"},[(t(),r("svg",Bs,Ds))])]),Is],2)])])]),e("div",Os,[e("div",Ns,[Es,e("div",Rs,[i(b,{src:k(te),"aspect-ratio":"1",class:"min-w-full min-h-full"},{placeholder:p(()=>[e("div",As,[i(P,{color:"",indeterminate:""})])]),_:1},8,["src"])])])])]}),_:1})}}};export{qs as default};
