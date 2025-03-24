import{r as p,x as q,C as E,c as v,d as h,e as N,w as u,H as j,B as P,f as c,J as D,h as e,L as B,E as s,G as i,M as I,s as x,t as O,i as T,O as m,m as k,q as C,Z}from"./index-c1909b7c.js";import{s as F}from"./vue-multiselect-fefa59c1.js";import{u as G}from"./subcategory-8381e1e5.js";import{u as L}from"./voucher-591ae05b.js";const $={class:"w-full"},R={class:"px-5 py-3"},z={class:"space-y-3"},H={class:"border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 transition-all"},J={class:"grid grid-cols-2 gap-3 p-3"},K={class:"flex flex-col gap-2 text-sm"},Q=e("label",{class:"dark:text-light-primary-1",for:"voucher_name"},"Voucher Name",-1),W={class:"flex flex-col gap-2 text-sm"},X={class:"flex justify-between"},Y=e("label",{class:"dark:text-light-primary-1",for:"voucher_code"},"Voucher Code",-1),ee=["disabled","value"],oe={class:"flex flex-col gap-2 text-sm"},te=e("label",{class:"dark:text-light-primary-1",for:"voucher_validity"},"Voucher Validity",-1),re={class:"flex flex-col gap-2 text-sm"},le=e("label",{class:"dark:text-light-primary-1",for:"voucher_stock"},"Voucher Stock",-1),ae={class:"flex flex-col gap-2 text-sm"},se=e("label",{class:"dark:text-light-primary-1",for:"subcategory_id"},"Apply On",-1),ie={class:"flex flex-col gap-2 text-sm"},de=e("label",{class:"dark:text-light-primary-1",for:"voucher_type"},"Voucher type",-1),ue=e("option",{value:"",selected:"",disabled:""}," Select Voucher Type ",-1),ce=e("option",{value:"Auto Apply Code"}," Auto Apply Code ",-1),ne=e("option",{value:"Apply Code"}," Apply Code ",-1),_e=[ue,ce,ne],pe={class:"flex flex-col gap-2 text-sm"},ve=e("label",{class:"dark:text-light-primary-1",for:"voucher_condition"},"Condition",-1),he=e("option",{value:"",selected:"",disabled:""}," Select Voucher Condition ",-1),me=e("option",{value:"None"},"None",-1),ge=e("option",{value:"Minimum Purchase"}," Minimum Purchase ",-1),ye=e("option",{value:"Minimum Order"}," Minimum Order ",-1),be=[he,me,ge,ye],fe={class:"flex flex-col gap-2 text-sm"},xe=e("label",{class:"dark:text-light-primary-1",for:"voucher_conditon_value"},"Condition Value",-1),ke=["required","disabled"],Ce={class:"flex flex-col gap-2 text-sm"},Ve=e("label",{class:"dark:text-light-primary-1",for:"voucher_discount_type"},"Voucher Discount Type",-1),we=e("option",{value:"",selected:"",disabled:""}," Select Discount Type ",-1),Ae=e("option",{value:"Percent"},"Percent",-1),Se=e("option",{value:"Amount"},"Amount",-1),Me=[we,Ae,Se],Ue={class:"flex flex-col gap-2 text-sm"},qe=e("label",{class:"dark:text-light-primary-1",for:"voucher_discount_value"},"Voucher Discount Value",-1),Ee={key:0,class:"flex flex-col gap-2 text-sm col-span-2"},Ne=e("label",{class:"dark:text-light-primary-1",for:"voucher_maximum_value"},"Voucher Maximum Value",-1),je={class:"col-span-2 space-y-2"},Pe=e("p",{class:"dark:text-light-primary-1"}," Voucher Image ",-1),De={class:"w-full border rounded-lg p-3 space-y-3"},Be={class:"relative"},Ie={class:"rounded-lg flex justify-center gap-3 items-start"},Oe={for:"voucher_image"},Te={class:"relative"},Ze=["src"],Fe=e("div",{class:"w-full h-40 bg-black opacity-0 hover:opacity-60 flex items-center rounded-lg absolute top-0"},[e("p",{class:"text-center w-full"},[e("i",{class:"fa-solid fa-pen",style:{color:"#ffffff"}})])],-1),Ge={class:"bg-light-primary-1 p-3 rounded-lg"},Le={class:"flex justify-between border-b pb-3 px-3"},$e=e("p",{class:"font-medium"}," Change Code Font Color ",-1),Re=["onClick"],ze=e("i",{class:"fa-solid fa-x"},null,-1),He=[ze],Je={class:"p-3 flex justify-center"},Ke={class:"bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3"},Qe=e("p",null,"Add",-1),We=e("i",{class:"fa-solid fa-plus"},null,-1),Xe={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Ye=e("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),eo=e("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),oo=[Ye,eo],io={__name:"Create",setup(to){const V=L(),n=p([]),g=G(),o=p({voucher_name:null,voucher_code:null,voucher_validity:null,voucher_stock:null,sub_category_id:null,voucher_type:"",voucher_condition:"",voucher_condition_value:null,voucher_discount_type:"",voucher_discount_value:null,voucher_image_placeholder:P,voucher_image:null,voucher_image_text_color:"#000000",voucher_auto_generate:!1,voucher_maximum_value:null});q(async()=>{await g.subCategoryAll();const l=g.subcategories;n.value=[{sub_category_name:"Select All",id:"select-all"},...l]});const w=l=>{if(l.id=="select-all"){const t=n.value.filter(a=>a.id!=="select-all");o.value.sub_category_id=t.map(a=>a)}if(Array.isArray(l))if(l.find(a=>a.id==="select-all")){const a=n.value.filter(d=>d.id!=="select-all");o.value.sub_category_id=a.map(d=>d.id)}else o.value.sub_category_id=l.map(a=>a.id)},y=p(!1),b=p([]),A=E(()=>b.value),S=async()=>{o.value.voucher_condition=="None"&&(o.value.voucher_condition_value=null)},M=async()=>{const l=new FormData;l.append("voucher_name",o.value.voucher_name),o.value.voucher_auto_generate||l.append("voucher_code",o.value.voucher_code),o.value.voucher_maximum_value&&l.append("voucher_maximum_value",o.value.voucher_maximum_value),l.append("voucher_validity",o.value.voucher_validity),l.append("voucher_stock",o.value.voucher_stock),l.append("voucher_type",o.value.voucher_type),l.append("voucher_condition",o.value.voucher_condition),l.append("voucher_condition_value",o.value.voucher_condition_value),o.value.sub_category_id.forEach(t=>{l.append("sub_category_id[]",t.id)}),l.append("voucher_discount_type",o.value.voucher_discount_type),l.append("voucher_discount_value",o.value.voucher_discount_value),o.value.voucher_image&&(l.append("voucher_image",o.value.voucher_image),l.append("voucher_image_text_color",o.value.voucher_image_text_color)),l.append("voucher_auto_generate",o.value.voucher_auto_generate),await V.addVoucher(l,b,y)},f=l=>{const t=l.target.files[0];t&&(o.value.voucher_image_placeholder=URL.createObjectURL(t),o.value.voucher_image=t)};return(l,t)=>{const a=v("v-tooltip"),d=v("v-color-picker"),U=v("v-dialog");return h(),N(j,{title:"Add Voucher"},{default:u(()=>[c(D,{class:"w-full",errors:A.value},null,8,["errors"]),e("div",$,[e("div",R,[e("form",{onSubmit:B(M,["prevent"])},[e("div",z,[e("div",H,[e("div",J,[e("div",K,[Q,s(e("input",{"onUpdate:modelValue":t[0]||(t[0]=r=>o.value.voucher_name=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_name",placeholder:"Enter Voucher Name",required:""},null,512),[[i,o.value.voucher_name]])]),e("div",W,[e("div",X,[Y,c(a,{text:"Auto Generate Code"},{activator:u(({props:r})=>[s(e("input",x(r,{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=_=>o.value.voucher_auto_generate=_),class:"rounded-full",id:""}),null,16),[[I,o.value.voucher_auto_generate]])]),_:1})]),s(e("input",{"onUpdate:modelValue":t[2]||(t[2]=r=>o.value.voucher_code=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",disabled:o.value.voucher_auto_generate,value:o.value.voucher_auto_generate?"Code Voucher Auto Generate":o.value.voucher_code,id:"voucher_code",placeholder:"Enter Voucher Code",required:""},null,8,ee),[[i,o.value.voucher_code]])]),e("div",oe,[te,s(e("input",{"onUpdate:modelValue":t[3]||(t[3]=r=>o.value.voucher_validity=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"date",id:"voucher_validity",placeholder:"Enter Voucher Validity",required:""},null,512),[[i,o.value.voucher_validity]])]),e("div",re,[le,s(e("input",{"onUpdate:modelValue":t[4]||(t[4]=r=>o.value.voucher_stock=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_stock",placeholder:"Enter Voucher Stock",required:""},null,512),[[i,o.value.voucher_stock]])]),e("div",ae,[se,c(T(F),{modelValue:o.value.sub_category_id,"onUpdate:modelValue":t[5]||(t[5]=r=>o.value.sub_category_id=r),options:n.value,searchable:!0,"close-on-select":!1,label:"sub_category_name",multiple:!0,"track-by":"sub_category_name","preserve-search":!0,placeholder:"Select Categories",onSelect:w},{option:u(({option:r})=>[e("div",null,O(r.sub_category_name),1)]),_:1},8,["modelValue","options"])]),e("div",ie,[de,s(e("select",{class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_type","onUpdate:modelValue":t[6]||(t[6]=r=>o.value.voucher_type=r),required:""},_e,512),[[m,o.value.voucher_type]])]),e("div",pe,[ve,s(e("select",{class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_condition","onUpdate:modelValue":t[7]||(t[7]=r=>o.value.voucher_condition=r),onChange:S,required:""},be,544),[[m,o.value.voucher_condition]])]),e("div",fe,[xe,s(e("input",{"onUpdate:modelValue":t[8]||(t[8]=r=>o.value.voucher_condition_value=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_conditon_value",placeholder:"Enter Voucher Condition Value",required:o.value.voucher_condition!="None",disabled:o.value.voucher_condition=="None"||o.value.voucher_condition==""},null,8,ke),[[i,o.value.voucher_condition_value]])]),e("div",Ce,[Ve,s(e("select",{"onUpdate:modelValue":t[9]||(t[9]=r=>o.value.voucher_discount_type=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_discount_type",required:""},Me,512),[[m,o.value.voucher_discount_type]])]),e("div",Ue,[qe,s(e("input",{"onUpdate:modelValue":t[10]||(t[10]=r=>o.value.voucher_discount_value=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_discount_value",placeholder:"Enter Voucher Condition Value",required:""},null,512),[[i,o.value.voucher_discount_value]])]),o.value.voucher_discount_type=="Percent"?(h(),k("div",Ee,[Ne,s(e("input",{"onUpdate:modelValue":t[11]||(t[11]=r=>o.value.voucher_maximum_value=r),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_maximum_value",placeholder:"Enter Voucher Maximum Value"},null,512),[[i,o.value.voucher_maximum_value]])])):C("",!0),e("div",je,[Pe,e("div",De,[e("div",Be,[e("div",Ie,[e("label",Oe,[e("div",Te,[e("img",{id:"picture",src:o.value.voucher_image_placeholder,class:"object-contain h-40 rounded-lg border shadow-lg",alt:"Placeholder Image"},null,8,Ze),Fe,e("input",{accept:"image/*",type:"file",class:"absolute bottom-0 opacity-0 w-40 h-2",id:"voucher_image",onChange:t[12]||(t[12]=(...r)=>f&&f(...r))},null,32)])]),c(U,{"max-width":"500"},{activator:u(({props:r})=>[e("button",x({class:"shadow-lg rounded-full w-7 h-7 fle items-center justify-center",type:"button"},r),[e("i",{style:Z("color:"+o.value.voucher_image_text_color),class:"fa-solid fa-font underline drop-shadow-2xl stroke-black"},null,4)],16)]),default:u(({isActive:r})=>[e("div",Ge,[e("div",Le,[$e,e("button",{type:"button",onClick:_=>r.value=!1},He,8,Re)]),e("div",Je,[c(d,{modelValue:o.value.voucher_image_text_color,"onUpdate:modelValue":t[13]||(t[13]=_=>o.value.voucher_image_text_color=_),modes:["hex","hexa"]},null,8,["modelValue"])])])]),_:1})])])])])])]),e("button",Ke,[Qe,We,y.value?(h(),k("svg",Xe,oo)):C("",!0)])])],32)])])]),_:1})}}};export{io as default};
