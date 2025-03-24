import{k as N,l as g,r as h,C as S,d as _,m as p,h as l,q as B,f as d,J as D,T as F,x as j,U as Z,c as b,F as A,p as z,w as f,s as x,L as E,V as O,W as V,e as q,H as T,y as M}from"./index-c1909b7c.js";const m=()=>g.get("/sanctum/csrf-cookie"),$=N({id:"shopPage",state:()=>({mainBanners:[],secondaryBanners:[],sideBanners:[],loading:!1,error:null}),getters:{allMainBanners:t=>t.mainBanners,allSecondaryBanners:t=>t.secondaryBanners,allSideBanners:t=>t.secondaryBanners,isLoading:t=>t.loading,getError:t=>t.error},actions:{async getAllMainBanner(){this.loading=!0;try{const t=await g.get("/api/main-banner").then(n=>{this.mainBanners=n.data})}catch(t){this.error=t}finally{this.loading=!1}},async addMainBanner(t,n,s){await m(),s.value=!0,g.post("/api/main-banner",t).then(e=>{s.value=!1,this.mainBanners.push(e.data)}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async deleteMainBanner(t,n,s){await m(),s.value=!0,g.delete(`/api/main-banner/delete/${t}`).then(e=>{s.value=!1,this.mainBanners=this.mainBanners.filter(r=>r.id!==t)}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async updateMainBannerStatus(t,n,s){await m(),s.value=!0,g.post("/api/main-banner/status",t).then(e=>{s.value=!1}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async getAllSecondaryBanner(){this.loading=!0;try{const t=await g.get("/api/secondary-banner").then(n=>{this.secondaryBanners=n.data})}catch(t){this.error=t}finally{this.loading=!1}},async addSecondaryBanner(t,n,s){await m(),s.value=!0,g.post("/api/secondary-banner",t).then(e=>{s.value=!1,this.secondaryBanners.push(e.data)}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async deleteSecondaryBanner(t,n,s){await m(),s.value=!0,g.delete(`/api/secondary-banner/delete/${t}`).then(e=>{s.value=!1,this.secondaryBanners=this.secondaryBanners.filter(r=>r.id!==t)}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async updateSecondaryBannerStatus(t,n,s){await m(),s.value=!0,g.post("/api/secondary-banner/status",t).then(e=>{s.value=!1}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async getAllSideBanner(){this.loading=!0;try{const t=await g.get("/api/side-banner").then(n=>{this.sideBanners=n.data})}catch(t){this.error=t}finally{this.loading=!1}},async addSideBanner(t,n,s){await m(),s.value=!0,g.post("/api/side-banner",t).then(e=>{s.value=!1,this.sideBanners.push(e.data)}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async deleteSideBanner(t,n,s){await m(),s.value=!0,g.delete(`/api/side-banner/delete/${t}`).then(e=>{s.value=!1,this.sideBanners=this.sideBanners.filter(r=>r.id!==t)}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})},async updateSideBannerStatus(t,n,s){await m(),s.value=!0,g.post("/api/side-banner/status",t).then(e=>{s.value=!1}).catch(e=>{if(console.log(e),e.response.status!==422)throw e;n.value=Object.values(e.response.data.errors).flat(),s.value=!1})}}}),U={for:"main_banner"},G={class:"bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg w-min whitespace-nowrap"},Q=l("i",{class:"fa-solid fa-plus"},null,-1),H=l("p",null,"Add Main Banner",-1),J={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},R=l("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),W=l("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),Y=[R,W],K={__name:"AddMainBanner",setup(t){const n=h(!1),s=h([]),e=S(()=>s.value),r=$(),i=h(null),v=async()=>{n.value=!0;const a=new FormData;a.append("file",i.value),await r.addMainBanner(a,s,n),i.value=null},y=a=>{const u=a.target.files[0];u&&(i.value=u,v(),a.target.value="",i.value=null)};return(a,u)=>(_(),p("div",null,[l("form",null,[l("label",U,[l("div",G,[Q,H,n.value?(_(),p("svg",J,Y)):B("",!0)])]),d(D,{class:"w-full",errors:e.value},null,8,["errors"]),l("input",{type:"file",onChange:y,accept:"image/*,video/*",id:"main_banner",class:"hidden"},null,32)])]))}};const I=t=>(O("data-v-0b650ee7"),t=t(),V(),t),X={class:"space-y-3"},ee={class:"flex justify-between w-full"},ae={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},te=I(()=>l("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1)),ne=I(()=>l("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1)),se=[te,ne],le={class:"grid grid-cols-4 gap-4 py-4"},oe=["alt"],re=["src"],ie=["src","alt"],de={class:"h-10 w-full flex px-3 justify-between items-center"},ce=["onChange","checked"],ue=["onSubmit"],_e=["disabled"],pe={__name:"MainBanner",setup(t){const n=$(),s=h([]),e=h(!1),r=h([]);S(()=>r.value);const i=()=>{s.value=n.mainBanners.map(a=>({id:a.id,main_banner_media:a.main_banner_media,main_banner_alt:a.main_banner_alt,main_banner_type:a.main_banner_type,main_banner_status:a.main_banner_status,isDefault:a.isDefault,src:"https://api.ezzora.sites.id//storage/media/shop/main-banner/"+a.main_banner_media}))},v=async a=>{e.value=!0,await n.deleteMainBanner(a,r,e),e.value=!1},y=async(a,u)=>{e.value=!0;const c=new FormData;c.append("id",a),c.append("value",u.target.checked),await n.updateMainBannerStatus(c,r,e),e.value=!1};return j(async()=>{await n.getAllMainBanner(),i()}),Z(()=>{i()}),(a,u)=>{const c=b("v-tooltip");return _(),p("div",X,[l("div",ee,[d(K),e.value?(_(),p("svg",ae,se)):B("",!0)]),l("div",le,[(_(!0),p(A,null,z(s.value,(o,k)=>(_(),p("div",{key:k,class:"rounded-lg overflow-hidden flex flex-col shadow-lg border"},[o.main_banner_type=="video"?(_(),p("video",{key:0,poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",alt:o.main_banner_alt,disablePictureInPicture:"",controls:"",controlsList:"nofullscreen nodownload noremoteplayback noplaybackrate",class:"w-full object-cover lazyload h-40"},[l("source",{src:o.src,type:"video/mp4"},null,8,re)],8,oe)):B("",!0),o.main_banner_type=="image"?(_(),p("img",{key:1,class:"w-full object-cover lazyload h-40",src:o.src,alt:o.main_banner_alt},null,8,ie)):B("",!0),l("div",de,[d(c,{text:o.main_banner_status?"Disable Banner":"Enable Banner"},{activator:f(({props:C})=>[l("input",x({onChange:w=>y(o.id,w),ref_for:!0},C,{type:"checkbox",name:"",checked:o.main_banner_status,class:"rounded-full border"}),null,16,ce)]),_:2},1032,["text"]),d(c,{text:o.isDefault?"Can't Delete Main Banner":"Delete Main Banner"},{activator:f(({props:C})=>[l("form",{onSubmit:E(w=>v(o.id),["prevent"])},[l("button",x({disabled:o.isDefault==!0,class:o.isDefault?"cursor-default !text-gray-500":"!text-red-500",type:"submit",ref_for:!0},C,{class:"fa-duotone fa-trash"}),null,16,_e)],40,ue)]),_:2},1032,["text"])])]))),128))])])}}},he=F(pe,[["__scopeId","data-v-0b650ee7"]]),fe={for:"secondary_banner"},ve={class:"bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg w-min whitespace-nowrap"},ye=l("i",{class:"fa-solid fa-plus"},null,-1),ge=l("p",null,"Add Secondary Banner",-1),Ce={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},me=l("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),be=l("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),we=[me,be],Be={__name:"AddSecondaryBanner",setup(t){const n=h(!1),s=h([]),e=S(()=>s.value),r=$(),i=h(null),v=async()=>{n.value=!0;const a=new FormData;a.append("file",i.value),await r.addSecondaryBanner(a,s,n),i.value=null},y=a=>{const u=a.target.files[0];u&&(i.value=u,v(),a.target.value="",i.value=null)};return(a,u)=>(_(),p("div",null,[l("form",null,[l("label",fe,[l("div",ve,[ye,ge,n.value?(_(),p("svg",Ce,we)):B("",!0)])]),d(D,{class:"w-full",errors:e.value},null,8,["errors"]),l("input",{type:"file",onChange:y,accept:"image/*",id:"secondary_banner",class:"hidden"},null,32)])]))}};const P=t=>(O("data-v-cb822df7"),t=t(),V(),t),xe={class:"space-y-3"},Se={class:"flex justify-between w-full"},$e={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},ke=P(()=>l("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1)),Me=P(()=>l("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1)),De=[ke,Me],Fe={class:"grid grid-cols-4 gap-4 py-4"},je=["src","alt"],Ze={class:"h-10 w-full flex px-3 justify-between items-center"},Ae=["onChange","checked"],ze=["onSubmit"],Ee=["disabled"],Oe={__name:"SecondaryBanner",setup(t){const n=$(),s=h([]),e=h(!1),r=h([]);S(()=>r.value);const i=()=>{s.value=n.secondaryBanners.map(a=>({id:a.id,secondary_banner_media:a.second_banner_media,secondary_banner_alt:a.second_banner_alt,secondary_banner_status:a.second_banner_status,isDefault:a.isDefault,src:"https://api.ezzora.sites.id//storage/media/shop/secondary-banner/"+a.second_banner_media}))},v=async a=>{e.value=!0,await n.deleteSecondaryBanner(a,r,e),e.value=!1},y=async(a,u)=>{e.value=!0;const c=new FormData;c.append("id",a),c.append("value",u.target.checked),await n.updateSecondaryBannerStatus(c,r,e),e.value=!1};return j(async()=>{await n.getAllSecondaryBanner(),i()}),Z(()=>{i()}),(a,u)=>{const c=b("v-tooltip");return _(),p("div",xe,[l("div",Se,[d(Be),e.value?(_(),p("svg",$e,De)):B("",!0)]),l("div",Fe,[(_(!0),p(A,null,z(s.value,(o,k)=>(_(),p("div",{key:k,class:"rounded-lg overflow-hidden flex flex-col shadow-lg border"},[l("img",{class:"w-full object-cover lazyload h-40",src:o.src,alt:o.secondary_banner_alt},null,8,je),l("div",Ze,[d(c,{text:o.secondary_banner_status?"Disable Banner":"Enable Banner"},{activator:f(({props:C})=>[l("input",x({onChange:w=>y(o.id,w),ref_for:!0},C,{type:"checkbox",name:"",checked:o.secondary_banner_status,class:"rounded-full border"}),null,16,Ae)]),_:2},1032,["text"]),d(c,{text:o.isDefault?"Can't Delete Secondary Banner":"Delete Secondary Banner"},{activator:f(({props:C})=>[l("form",{onSubmit:E(w=>v(o.id),["prevent"])},[l("button",x({disabled:o.isDefault==!0,class:o.isDefault?"cursor-default !text-gray-500":"!text-red-500",type:"submit",ref_for:!0},C,{class:"fa-duotone fa-trash"}),null,16,Ee)],40,ze)]),_:2},1032,["text"])])]))),128))])])}}},Ve=F(Oe,[["__scopeId","data-v-cb822df7"]]),Ie={for:"side_banner"},Pe={class:"bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg w-min whitespace-nowrap"},Le=l("i",{class:"fa-solid fa-plus"},null,-1),Ne=l("p",null,"Add Side Banner",-1),qe={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Te=l("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),Ue=l("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),Ge=[Te,Ue],Qe={__name:"AddSideBanner",setup(t){const n=h(!1),s=h([]),e=S(()=>s.value),r=$(),i=h(null),v=async()=>{n.value=!0;const a=new FormData;a.append("file",i.value),await r.addSideBanner(a,s,n),i.value=null},y=a=>{const u=a.target.files[0];u&&(i.value=u,v(),a.target.value="",i.value=null)};return(a,u)=>(_(),p("div",null,[l("form",null,[l("label",Ie,[l("div",Pe,[Le,Ne,n.value?(_(),p("svg",qe,Ge)):B("",!0)])]),d(D,{class:"w-full",errors:e.value},null,8,["errors"]),l("input",{type:"file",onChange:y,accept:"image/*",id:"side_banner",class:"hidden"},null,32)])]))}};const L=t=>(O("data-v-7898e31b"),t=t(),V(),t),He={class:"space-y-3"},Je={class:"flex justify-between w-full"},Re={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},We=L(()=>l("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1)),Ye=L(()=>l("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1)),Ke=[We,Ye],Xe={class:"grid grid-cols-4 gap-4 py-4"},ea=["src","alt"],aa={class:"h-10 w-full flex px-3 justify-between items-center"},ta=["onChange","checked"],na=["onSubmit"],sa=["disabled"],la={__name:"SideBanner",setup(t){const n=$(),s=h([]),e=h(!1),r=h([]);S(()=>r.value);const i=()=>{s.value=n.sideBanners.map(a=>({id:a.id,side_banner_media:a.side_banner_media,side_banner_alt:a.side_banner_alt,side_banner_status:a.side_banner_status,isDefault:a.isDefault,src:"https://api.ezzora.sites.id//storage/media/shop/side-banner/"+a.side_banner_media}))},v=async a=>{e.value=!0,await n.deleteSideBanner(a,r,e),e.value=!1},y=async(a,u)=>{e.value=!0;const c=new FormData;c.append("id",a),c.append("value",u.target.checked),await n.updateSideBannerStatus(c,r,e),e.value=!1};return j(async()=>{await n.getAllSideBanner(),i()}),Z(()=>{i()}),(a,u)=>{const c=b("v-tooltip");return _(),p("div",He,[l("div",Je,[d(Qe),e.value?(_(),p("svg",Re,Ke)):B("",!0)]),l("div",Xe,[(_(!0),p(A,null,z(s.value,(o,k)=>(_(),p("div",{key:k,class:"rounded-lg overflow-hidden flex flex-col shadow-lg border"},[l("img",{class:"w-full object-cover lazyload h-40",src:o.src,alt:o.side_banner_alt},null,8,ea),l("div",aa,[d(c,{text:o.side_banner_status?"Disable Banner":"Enable Banner"},{activator:f(({props:C})=>[l("input",x({onChange:w=>y(o.id,w),ref_for:!0},C,{type:"checkbox",name:"",checked:o.side_banner_status,class:"rounded-full border"}),null,16,ta)]),_:2},1032,["text"]),d(c,{text:o.isDefault?"Can't Delete Side Banner":"Delete Side Banner"},{activator:f(({props:C})=>[l("form",{onSubmit:E(w=>v(o.id),["prevent"])},[l("button",x({disabled:o.isDefault==!0,class:o.isDefault?"cursor-default !text-gray-500":"!text-red-500",type:"submit",ref_for:!0},C,{class:"fa-duotone fa-trash"}),null,16,sa)],40,na)]),_:2},1032,["text"])])]))),128))])])}}},oa=F(la,[["__scopeId","data-v-7898e31b"]]),ra={class:"w-full"},ia={class:"bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 border"},ca={__name:"Banner",setup(t){const n=h(null);return(s,e)=>{const r=b("v-tab"),i=b("v-tabs"),v=b("v-tabs-window-item"),y=b("v-tabs-window"),a=b("v-card-text"),u=b("v-card");return _(),q(T,{title:"Banner Shop"},{default:f(()=>[l("div",ra,[l("div",ia,[d(u,{class:"shadow-lg border dark:!border-gray-800 dark:!shadow-white"},{default:f(()=>[d(i,{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=c=>n.value=c),class:"bg-light-primary-2 dark:bg-dark-primary-1 overflow-hidden !border-none"},{default:f(()=>[d(r,{value:"one",class:"!capitalize !font-semibold !text-typography-2 dark:!text-typography-1 !tracking-normal"},{default:f(()=>[M("Main Banner")]),_:1}),d(r,{value:"two",class:"!capitalize !font-semibold !text-typography-2 dark:!text-typography-1 !tracking-normal"},{default:f(()=>[M("Secondary Banner")]),_:1}),d(r,{value:"three",class:"!capitalize !font-semibold !text-typography-2 dark:!text-typography-1 !tracking-normal"},{default:f(()=>[M("Side Banner")]),_:1})]),_:1},8,["modelValue"]),d(a,{class:"!bg-light-primary-1 dark:!bg-dark-primary-2"},{default:f(()=>[d(y,{modelValue:n.value,"onUpdate:modelValue":e[1]||(e[1]=c=>n.value=c),class:"dark:!text-white"},{default:f(()=>[d(v,{value:"one"},{default:f(()=>[d(he)]),_:1}),d(v,{value:"two"},{default:f(()=>[d(Ve)]),_:1}),d(v,{value:"three"},{default:f(()=>[d(oa)]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})])])]),_:1})}}};export{ca as default};
