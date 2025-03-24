import{r as i,b as D,a as I,o as L,B as A,x as O,C as T,c as y,d as m,e as R,w as v,H as Z,f as n,J as $,m as b,h as e,L as z,E as s,G as c,M as F,s as M,t as G,i as H,O as f,q as x,Z as J}from"./index-c1909b7c.js";import{s as K}from"./vue-multiselect-fefa59c1.js";import{u as Q}from"./subcategory-8381e1e5.js";import{u as W}from"./voucher-591ae05b.js";import{_ as X}from"./LoadingAdmin-5d743fa9.js";const Y={key:0,class:"w-full"},ee={class:"px-5 py-3"},oe={class:"space-y-3"},te={class:"border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 transition-all"},ae={class:"grid grid-cols-2 gap-3 p-3"},re={class:"flex flex-col gap-2 text-sm"},le=e("label",{class:"dark:text-light-primary-1",for:"voucher_name"},"Voucher Name",-1),ue={class:"flex flex-col gap-2 text-sm"},se={class:"flex justify-between"},ie=e("label",{class:"dark:text-light-primary-1",for:"voucher_code"},"Voucher Code",-1),ce=["disabled","value"],de={class:"flex flex-col gap-2 text-sm"},ne=e("label",{class:"dark:text-light-primary-1",for:"voucher_validity"},"Voucher Validity",-1),_e={class:"flex flex-col gap-2 text-sm"},ve=e("label",{class:"dark:text-light-primary-1",for:"voucher_stock"},"Voucher Stock",-1),he=["disabled"],pe={class:"flex flex-col gap-2 text-sm"},me=e("label",{class:"dark:text-light-primary-1",for:"subcategory_id"},"Apply On",-1),ge={class:"flex flex-col gap-2 text-sm"},ye=e("label",{class:"dark:text-light-primary-1",for:"voucher_type"},"Voucher type",-1),be=e("option",{value:"",selected:"",disabled:""}," Select Voucher Type ",-1),fe=e("option",{value:"Auto Apply Code"}," Auto Apply Code ",-1),xe=e("option",{value:"Apply Code"}," Apply Code ",-1),ke=[be,fe,xe],Ve={class:"flex flex-col gap-2 text-sm"},Ce=e("label",{class:"dark:text-light-primary-1",for:"voucher_condition"},"Condition",-1),we=e("option",{value:"",selected:"",disabled:""}," Select Voucher Condition ",-1),Se=e("option",{value:"None"},"None",-1),Ae=e("option",{value:"Minimum Purchase"}," Minimum Purchase ",-1),Me=e("option",{value:"Minimum Order"}," Minimum Order ",-1),Ue=[we,Se,Ae,Me],Ee={class:"flex flex-col gap-2 text-sm"},qe=e("label",{class:"dark:text-light-primary-1",for:"voucher_conditon_value"},"Condition Value",-1),Ne=["required","disabled"],je={class:"flex flex-col gap-2 text-sm"},Pe=e("label",{class:"dark:text-light-primary-1",for:"voucher_discount_type"},"Voucher Discount Type",-1),Be=e("option",{value:"",selected:"",disabled:""}," Select Discount Type ",-1),De=e("option",{value:"Percent"},"Percent",-1),Ie=e("option",{value:"Amount"},"Amount",-1),Le=[Be,De,Ie],Oe={class:"flex flex-col gap-2 text-sm"},Te=e("label",{class:"dark:text-light-primary-1",for:"voucher_discount_value"},"Voucher Discount Value",-1),Re={key:0,class:"flex flex-col gap-2 text-sm col-span-2"},Ze=e("label",{class:"dark:text-light-primary-1",for:"voucher_maximum_value"},"Voucher Maximum Value",-1),$e={class:"col-span-2 space-y-2"},ze=e("p",{class:"dark:text-light-primary-1"}," Voucher Image ",-1),Fe={class:"w-full border rounded-lg p-3 space-y-3"},Ge={class:"relative"},He={class:"rounded-lg flex justify-center gap-3 items-start"},Je={for:"voucher_image"},Ke={class:"relative"},Qe=["src"],We=e("div",{class:"w-full h-40 bg-black opacity-0 hover:opacity-60 flex items-center rounded-lg absolute top-0"},[e("p",{class:"text-center w-full"},[e("i",{class:"fa-solid fa-pen",style:{color:"#ffffff"}})])],-1),Xe={class:"bg-light-primary-1 p-3 rounded-lg"},Ye={class:"flex justify-between border-b pb-3 px-3"},eo=e("p",{class:"font-medium"}," Change Code Font Color ",-1),oo=["onClick"],to=e("i",{class:"fa-solid fa-x"},null,-1),ao=[to],ro={class:"p-3 flex justify-center"},lo={class:"bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3"},uo=e("p",null,"Add",-1),so=e("i",{class:"fa-solid fa-plus"},null,-1),io={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},co=e("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),no=e("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),_o=[co,no],bo={__name:"Edit",setup(vo){const d=W(),h=i([]),k=Q(),g=i(!0),l=i(null),U=D(),E=I(),V=i(E.params.id),o=i({voucher_name:null,voucher_code:null,voucher_validity:null,voucher_stock:null,sub_category_id:null,voucher_type:"",voucher_condition:"",voucher_condition_value:null,voucher_discount_type:"",voucher_discount_value:null,voucher_image_placeholder:A,voucher_image:null,voucher_image_text_color:"#000000",voucher_auto_generate:!1,voucher_maximum_value:null});L(async()=>{await d.voucherById(V.value),!d.singleVoucher||Object.keys(d.singleVoucher).length===0?U.replace("/404"):(l.value=d.singleVoucher,o.value.voucher_name=l.value.voucher_name,l.value.voucher_auto_generate=="false"?(o.value.voucher_code=l.value.code[0].voucher_code,o.value.voucher_stock=l.value.code[0].voucher_stock):o.value.voucher_stock=l.value.code.length,o.value.voucher_validity=l.value.voucher_validity,o.value.voucher_type=l.value.voucher_type,o.value.voucher_condition=l.value.voucher_condition,o.value.voucher_condition_value=l.value.voucher_condition_value,o.value.voucher_discount_type=l.value.voucher_discount_type,o.value.voucher_discount_value=l.value.voucher_discount_value,o.value.sub_category_id=l.value.subcategory,o.value.voucher_image_placeholder=l.value.voucher_image?"https://api.ezzora.sites.id//storage/images/voucher/"+l.value.voucher_image:A,o.value.voucher_image_text_color=l.value.voucher_image_text_color?l.value.voucher_image_text_color:"#000000",o.value.voucher_auto_generate=l.value.voucher_auto_generate,o.value.voucher_maximum_value=l.value.voucher_maximum_value,g.value=d.loading)}),O(async()=>{await k.subCategoryAll();const r=k.subcategories;h.value=[{sub_category_name:"Select All",id:"select-all"},...r]});const q=r=>{if(r.id=="select-all"){const t=h.value.filter(u=>u.id!=="select-all");o.value.sub_category_id=t.map(u=>u)}if(Array.isArray(r))if(r.find(u=>u.id==="select-all")){const u=h.value.filter(_=>_.id!=="select-all");o.value.sub_category_id=u.map(_=>_.id)}else o.value.sub_category_id=r.map(u=>u.id)},C=i(!1),w=i([]),N=T(()=>w.value),j=async()=>{o.value.voucher_condition=="None"&&(o.value.voucher_condition_value=null)},P=async()=>{const r=new FormData;r.append("voucher_name",o.value.voucher_name),r.append("voucher_validity",o.value.voucher_validity),l.value.voucher_auto_generate=="false"&&(r.append("voucher_code",o.value.voucher_code),r.append("voucher_stock",o.value.voucher_stock)),o.value.voucher_maximum_value&&r.append("voucher_maximum_value",o.value.voucher_maximum_value),r.append("voucher_type",o.value.voucher_type),r.append("voucher_condition",o.value.voucher_condition),r.append("voucher_condition_value",o.value.voucher_condition_value),o.value.sub_category_id.forEach(t=>{r.append("sub_category_id[]",t.id)}),r.append("voucher_discount_type",o.value.voucher_discount_type),r.append("voucher_discount_value",o.value.voucher_discount_value),o.value.voucher_image&&r.append("voucher_image",o.value.voucher_image),r.append("voucher_image_text_color",o.value.voucher_image_text_color),r.append("_method","PUT"),await d.editVoucher(r,w,C,V.value)},S=r=>{const t=r.target.files[0];t&&(o.value.voucher_image_placeholder=URL.createObjectURL(t),o.value.voucher_image=t)};return(r,t)=>{const u=y("v-tooltip"),_=y("v-color-picker"),B=y("v-dialog");return m(),R(Z,{title:"Edit Voucher"},{default:v(()=>[n(X,{isLoading:g.value},null,8,["isLoading"]),n($,{class:"w-full",errors:N.value},null,8,["errors"]),g.value?x("",!0):(m(),b("div",Y,[e("div",ee,[e("form",{onSubmit:z(P,["prevent"])},[e("div",oe,[e("div",te,[e("div",ae,[e("div",re,[le,s(e("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>o.value.voucher_name=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_name",placeholder:"Enter Voucher Name",required:""},null,512),[[c,o.value.voucher_name]])]),e("div",ue,[e("div",se,[ie,n(u,{text:"Auto Generate Code"},{activator:v(({props:a})=>[s(e("input",M({disabled:""},a,{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=p=>o.value.voucher_auto_generate=p),class:"rounded-full",id:""}),null,16),[[F,o.value.voucher_auto_generate]])]),_:1})]),s(e("input",{"onUpdate:modelValue":t[2]||(t[2]=a=>o.value.voucher_code=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",disabled:l.value.voucher_auto_generate=="true",value:l.value.voucher_auto_generate=="true"?"Code Voucher Auto Generate":o.value.voucher_code,id:"voucher_code",placeholder:"Enter Voucher Code",required:""},null,8,ce),[[c,o.value.voucher_code]])]),e("div",de,[ne,s(e("input",{"onUpdate:modelValue":t[3]||(t[3]=a=>o.value.voucher_validity=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"date",id:"voucher_validity",placeholder:"Enter Voucher Validity",required:""},null,512),[[c,o.value.voucher_validity]])]),e("div",_e,[ve,s(e("input",{"onUpdate:modelValue":t[4]||(t[4]=a=>o.value.voucher_stock=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",disabled:l.value.voucher_auto_generate=="true",id:"voucher_stock",placeholder:"Enter Voucher Stock",required:""},null,8,he),[[c,o.value.voucher_stock]])]),e("div",pe,[me,n(H(K),{modelValue:o.value.sub_category_id,"onUpdate:modelValue":t[5]||(t[5]=a=>o.value.sub_category_id=a),options:h.value,searchable:!0,"close-on-select":!1,label:"sub_category_name",multiple:!0,"track-by":"sub_category_name","preserve-search":!0,placeholder:"Select Categories",onSelect:q},{option:v(({option:a})=>[e("div",null,G(a.sub_category_name),1)]),_:1},8,["modelValue","options"])]),e("div",ge,[ye,s(e("select",{class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_type","onUpdate:modelValue":t[6]||(t[6]=a=>o.value.voucher_type=a),required:""},ke,512),[[f,o.value.voucher_type]])]),e("div",Ve,[Ce,s(e("select",{class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_condition","onUpdate:modelValue":t[7]||(t[7]=a=>o.value.voucher_condition=a),onChange:j,required:""},Ue,544),[[f,o.value.voucher_condition]])]),e("div",Ee,[qe,s(e("input",{"onUpdate:modelValue":t[8]||(t[8]=a=>o.value.voucher_condition_value=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_conditon_value",placeholder:"Enter Voucher Condition Value",required:o.value.voucher_condition!="None",disabled:o.value.voucher_condition=="None"||o.value.voucher_condition==""},null,8,Ne),[[c,o.value.voucher_condition_value]])]),e("div",je,[Pe,s(e("select",{"onUpdate:modelValue":t[9]||(t[9]=a=>o.value.voucher_discount_type=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"text",id:"voucher_discount_type",required:""},Le,512),[[f,o.value.voucher_discount_type]])]),e("div",Oe,[Te,s(e("input",{"onUpdate:modelValue":t[10]||(t[10]=a=>o.value.voucher_discount_value=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_discount_value",placeholder:"Enter Voucher Condition Value",required:""},null,512),[[c,o.value.voucher_discount_value]])]),o.value.voucher_discount_type=="Percent"?(m(),b("div",Re,[Ze,s(e("input",{"onUpdate:modelValue":t[11]||(t[11]=a=>o.value.voucher_maximum_value=a),class:"text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3",type:"number",id:"voucher_maximum_value",placeholder:"Enter Voucher Maximum Value"},null,512),[[c,o.value.voucher_maximum_value]])])):x("",!0),e("div",$e,[ze,e("div",Fe,[e("div",Ge,[e("div",He,[e("label",Je,[e("div",Ke,[e("img",{id:"picture",src:o.value.voucher_image_placeholder,class:"object-contain h-40 rounded-lg border shadow-lg",alt:"Placeholder Image"},null,8,Qe),We,e("input",{accept:"image/*",type:"file",class:"absolute bottom-0 opacity-0 w-40 h-2",id:"voucher_image",onChange:t[12]||(t[12]=(...a)=>S&&S(...a))},null,32)])]),n(B,{"max-width":"500"},{activator:v(({props:a})=>[e("button",M({class:"shadow-lg rounded-full w-7 h-7 fle items-center justify-center",type:"button"},a),[e("i",{style:J("color:"+o.value.voucher_image_text_color),class:"fa-solid fa-font underline drop-shadow-2xl stroke-black"},null,4)],16)]),default:v(({isActive:a})=>[e("div",Xe,[e("div",Ye,[eo,e("button",{type:"button",onClick:p=>a.value=!1},ao,8,oo)]),e("div",ro,[n(_,{modelValue:o.value.voucher_image_text_color,"onUpdate:modelValue":t[13]||(t[13]=p=>o.value.voucher_image_text_color=p),modes:["hex","hexa"]},null,8,["modelValue"])])])]),_:1})])])])])])]),e("button",lo,[uo,so,C.value?(m(),b("svg",io,_o)):x("",!0)])])],32)])]))]),_:1})}}};export{bo as default};
