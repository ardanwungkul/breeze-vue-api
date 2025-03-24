import{Y as A,r as o,b as j,C as I,o as E,a as B,d as b,e as M,w as P,H as z,f as R,J as S,h as e,L as D,E as m,G as v,m as L,q as V}from"./index-c1909b7c.js";/* empty css                   */const T={class:"w-full mx-auto bg-light-primary-1 dark:bg-dark-primary-2 dark:text-white rounded-lg shadow-lg duration-500"},q={class:"px-5 py-3"},G={class:"grid grid-cols-2 gap-3 mb-3"},N={class:"flex flex-col justify-center items-center gap-3 text-sm"},O=e("p",null,"Main Image ( png )",-1),Z={class:"flex justify-center w-40 flex-none"},F={class:"relative"},$=["src"],H={class:"absolute z-50 top-0 hover:!opacity-100 rounded-lg",style:{opacity:"0"}},J={for:"pictureInput"},Y=e("div",{class:"w-40 h-40 bg-black opacity-60 flex items-center rounded-lg"},[e("p",{class:"text-center w-full"},[e("i",{class:"fa-solid fa-pen",style:{color:"#ffffff"}})])],-1),K={class:"flex flex-col justify-center items-center gap-3 text-sm"},Q=e("p",null,"Second Image",-1),W={class:"flex justify-center w-40 flex-none"},X={class:"relative"},ee=["src"],te={class:"absolute z-50 top-0 hover:!opacity-100 rounded-lg",style:{opacity:"0"}},se={for:"pictureInput2"},oe=e("div",{class:"w-40 h-40 bg-black opacity-60 flex items-center rounded-lg"},[e("p",{class:"text-center w-full"},[e("i",{class:"fa-solid fa-pen",style:{color:"#ffffff"}})])],-1),ae={class:"space-y-3"},le={class:"flex flex-col gap-2 text-sm"},ie=e("label",{for:"about_us_title"},"Title",-1),re={class:"flex flex-col gap-2 text-sm"},ne=e("label",{for:"about_us_description"},"Description",-1),ce={class:"bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3"},ue=e("p",null,"Save",-1),de={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},pe=e("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),_e=e("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),ge=[pe,_e],me={__name:"Edit",setup(fe){const a=A();o(null);const y=j(),d=o([]),x=I(()=>d.value),w=o(""),p=o(""),i=o(""),r=o(""),_=o(null),g=o(null);o(""),o("");const c=o("https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"),u=o("https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg");E(async()=>{await C()});async function C(){const s=B(),t=o(s.params.id);await a.aboutUsById(t.value),!a.singleAboutUs||Object.keys(a.singleAboutUs).length===0?y.replace("/404"):(p.value=a.singleAboutUs.id,i.value=a.singleAboutUs.about_us_title,r.value=a.singleAboutUs.about_us_description,c.value="https://api.ezzora.sites.id//storage/images/aboutus/"+a.singleAboutUs.about_us_main_image,u.value="https://api.ezzora.sites.id//storage/images/aboutus/"+a.singleAboutUs.about_us_second_image,w.value=i.value)}const f=s=>{const t=s.target.files[0];t&&(_.value=t,c.value=URL.createObjectURL(t))},h=s=>{const t=s.target.files[0];t&&(g.value=t,u.value=URL.createObjectURL(t))},n=o(!1),U=async(s,t)=>{await a.editAboutUs(s,d,n,t)},k=async()=>{n.value=!0;const s=new FormData;s.append("about_us_title",i.value),s.append("about_us_description",r.value),s.append("about_us_main_image",_.value),s.append("about_us_second_image",g.value),s.append("_method","PUT"),await U(s,p.value),n.value=!1};return(s,t)=>(b(),M(z,{title:"Edit About Us"},{default:P(()=>[R(S,{class:"w-full",errors:x.value},null,8,["errors"]),e("div",T,[e("div",q,[e("form",{onSubmit:D(k,["prevent"])},[e("div",null,[e("div",G,[e("div",N,[O,e("div",Z,[e("div",F,[e("img",{id:"picture",src:c.value,class:"object-cover w-40 h-40 rounded-lg",alt:"Placeholder Image"},null,8,$),e("div",H,[e("label",J,[Y,e("input",{accept:"image/*",type:"file",class:"absolute bottom-0 opacity-0 w-40 h-2",id:"pictureInput",onChange:t[0]||(t[0]=(...l)=>f&&f(...l))},null,32)])])])])]),e("div",K,[Q,e("div",W,[e("div",X,[e("img",{id:"picture2",src:u.value,class:"object-cover w-40 h-40 rounded-lg",alt:"Placeholder Image"},null,8,ee),e("div",te,[e("label",se,[oe,e("input",{accept:"image/*",type:"file",class:"absolute bottom-0 opacity-0 w-40 h-2",id:"pictureInput2",onChange:t[1]||(t[1]=(...l)=>h&&h(...l))},null,32)])])])])])]),e("div",ae,[e("div",le,[ie,m(e("input",{class:"text-sm rounded-lg w-full dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500",type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>i.value=l),id:"about_us_title",placeholder:"Enter Title",required:""},null,512),[[v,i.value]])]),e("div",re,[ne,m(e("textarea",{class:"text-sm rounded-lg w-full h-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500","onUpdate:modelValue":t[3]||(t[3]=l=>r.value=l),id:"about_us_description",placeholder:"Enter Description",required:""},null,512),[[v,r.value]])]),e("button",ce,[ue,n.value?(b(),L("svg",de,ge)):V("",!0)])])])],32)])])]),_:1}))}};export{me as default};
