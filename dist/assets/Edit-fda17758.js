import{S as j,r as a,z as E,f as S,B as z,A as M,o as y,c as B,w as P,_ as V,d as D,i as R,a as e,t as L,n as T,k as c,v as _,h as q,q as N}from"./index-28c35e09.js";/* empty css                   */const O={class:"w-full max-w-2xl mx-auto bg-light-primary-1 dark:bg-dark-primary-2 dark:text-white rounded-lg shadow-lg duration-500"},Z={class:"flex justify-between border-b py-3 px-4 items-center"},F={class:"font-medium text-lg"},G={class:"px-5 py-3"},$={class:"grid grid-cols-2 gap-3 mb-3"},H={class:"flex flex-col justify-center items-center gap-3 text-sm"},J=e("p",null,"Main Image ( png )",-1),K={class:"flex justify-center w-40 flex-none"},Q={class:"relative"},W=["src"],X={class:"absolute z-50 top-0 hover:!opacity-100 rounded-lg",style:{opacity:"0"}},Y={for:"pictureInput"},ee=e("div",{class:"w-40 h-40 bg-black opacity-60 flex items-center rounded-lg"},[e("p",{class:"text-center w-full"},[e("i",{class:"fa-solid fa-pen",style:{color:"#ffffff"}})])],-1),te={class:"flex flex-col w-full gap-3"},se=e("label",{for:""},"Main Image Alt",-1),ae={class:"flex flex-col justify-center items-center gap-3 text-sm"},oe=e("p",null,"Second Image",-1),le={class:"flex justify-center w-40 flex-none"},ie={class:"relative"},re=["src"],ne={class:"absolute z-50 top-0 hover:!opacity-100 rounded-lg",style:{opacity:"0"}},ue={for:"pictureInput2"},de=e("div",{class:"w-40 h-40 bg-black opacity-60 flex items-center rounded-lg"},[e("p",{class:"text-center w-full"},[e("i",{class:"fa-solid fa-pen",style:{color:"#ffffff"}})])],-1),ce={class:"flex flex-col w-full gap-3"},_e=e("label",{for:""},"Second Image Alt",-1),pe={class:"space-y-3"},ge={class:"flex flex-col gap-2 text-sm"},be=e("label",{for:"about_us_title"},"Title",-1),me={class:"flex flex-col gap-2 text-sm"},fe=e("label",{for:"about_us_description"},"Description",-1),he={class:"bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3"},ve=e("p",null,"Save",-1),ye={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},xe=e("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),we=e("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),ke=[xe,we],Ie={__name:"Edit",setup(Ce){const o=j();a(null);const x=E(),b=a([]),w=S(()=>b.value),m=a(""),f=a(""),i=a(""),r=a(""),h=a(null),v=a(null),n=a(""),u=a(""),p=a("https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"),g=a("https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg");z(async()=>{await k()});async function k(){const s=M(),t=a(s.params.id);await o.aboutUsById(t.value),!o.singleAboutUs||Object.keys(o.singleAboutUs).length===0?x.replace("/404"):(f.value=o.singleAboutUs.id,i.value=o.singleAboutUs.about_us_title,r.value=o.singleAboutUs.about_us_description,n.value=o.singleAboutUs.about_us_main_image_alt,u.value=o.singleAboutUs.about_us_second_image_alt,p.value="https://api.ezzora.webz.co.id/storage/images/aboutus/"+o.singleAboutUs.about_us_main_image,g.value="https://api.ezzora.webz.co.id/storage/images/aboutus/"+o.singleAboutUs.about_us_second_image,m.value=i.value)}const C=s=>{const t=s.target.files[0];t&&(h.value=t,p.value=URL.createObjectURL(t))},U=s=>{const t=s.target.files[0];t&&(v.value=t,g.value=URL.createObjectURL(t))},d=a(!1),A=async(s,t)=>{await o.editAboutUs(s,b,d,t)},I=async()=>{d.value=!0;const s=new FormData;s.append("about_us_title",i.value),s.append("about_us_description",r.value),s.append("about_us_main_image",h.value),s.append("about_us_second_image",v.value),s.append("about_us_main_image",n.value),s.append("about_us_second_image",u.value),s.append("_method","PUT"),await A(s,f.value),d.value=!1};return(s,t)=>(y(),B(V,{title:"Edit About Us"},{default:P(()=>[D(R,{class:"w-full",errors:w.value},null,8,["errors"]),e("div",O,[e("div",Z,[e("p",F," Edit About Us "+L(m.value),1)]),e("div",G,[e("form",{onSubmit:T(I,["prevent"])},[e("div",null,[e("div",$,[e("div",H,[J,e("div",K,[e("div",Q,[e("img",{id:"picture",src:p.value,class:"object-cover w-40 h-40 rounded-lg",alt:"Placeholder Image"},null,8,W),e("div",X,[e("label",Y,[ee,e("input",{accept:"image/*",type:"file",class:"absolute bottom-0 opacity-0 w-40 h-2",id:"pictureInput",onChange:C},null,32)])])])]),e("div",te,[se,c(e("input",{class:"text-sm rounded-lg w-full dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500",type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>n.value=l),id:"about_us_main_image_alt",placeholder:"Enter Main Image Alt ( Can be left blank )"},null,512),[[_,n.value]])])]),e("div",ae,[oe,e("div",le,[e("div",ie,[e("img",{id:"picture2",src:g.value,class:"object-cover w-40 h-40 rounded-lg",alt:"Placeholder Image"},null,8,re),e("div",ne,[e("label",ue,[de,e("input",{accept:"image/*",type:"file",class:"absolute bottom-0 opacity-0 w-40 h-2",id:"pictureInput2",onChange:U},null,32)])])])]),e("div",ce,[_e,c(e("input",{class:"text-sm rounded-lg w-full dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500",type:"text","onUpdate:modelValue":t[1]||(t[1]=l=>u.value=l),id:"about_us_second_image_alt",placeholder:"Enter Second Image Alt ( Can be left blank )"},null,512),[[_,u.value]])])])]),e("div",pe,[e("div",ge,[be,c(e("input",{class:"text-sm rounded-lg w-full dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500",type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>i.value=l),id:"about_us_title",placeholder:"Enter Title",required:""},null,512),[[_,i.value]])]),e("div",me,[fe,c(e("textarea",{class:"text-sm rounded-lg w-full h-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500","onUpdate:modelValue":t[3]||(t[3]=l=>r.value=l),id:"about_us_description",placeholder:"Enter Description",required:""},null,512),[[_,r.value]])]),e("button",he,[ve,d.value?(y(),q("svg",ye,ke)):N("",!0)])])])],32)])])]),_:1}))}};export{Ie as default};
