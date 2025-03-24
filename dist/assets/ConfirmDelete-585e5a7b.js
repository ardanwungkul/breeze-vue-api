import{r as i,c as f,d as l,e as x,w as u,h as e,s as C,n as y,m as c,t as d,q as g}from"./index-c1909b7c.js";const v=e("i",{class:"fa-solid fa-trash"},null,-1),_={key:0},b={class:"w-full max-w-md mx-auto bg-white rounded-xl shadow-lg relative font-poppins"},w=["onClick"],k={class:"p-5 text-center"},B=e("svg",{class:"mx-auto mb-4 text-gray-400 w-12 h-12","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})],-1),V={class:"mb-5 text-lg font-normal text-gray-500"},M={class:"flex justify-center items-center"},S=e("p",null,"Yes, I'm sure",-1),q={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},N=e("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),Z=e("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),j=[N,Z],D=["onClick"],$={__name:"ConfirmDelete",props:{type:{type:String,required:!0},id:{type:[String,Number],required:!0},method:{type:Function,required:!0},buttonClass:{type:String},label:{type:String}},setup(o){const r=o,n=i(!1),s=i(!1),p=async()=>{s.value=!0,await r.method(r.id,s),s.value=!1,n.value=!1};return(z,a)=>{const m=f("v-dialog");return l(),x(m,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value=t)},{activator:u(({props:t})=>[e("button",C(t,{type:"button"}),[e("div",{class:y([o.buttonClass,"flex gap-2 items-center text-white bg-red-500 hover:bg-opacity-90 rounded-lg px-3 py-1"])},[v,o.label?(l(),c("p",_,d(o.label),1)):g("",!0)],2)],16)]),default:u(({isActive:t})=>[e("div",b,[e("button",{onClick:h=>t.value=!1,class:"fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2 absolute right-3 top-3 text-gray-500"},null,8,w),e("div",k,[B,e("p",V," Are you sure you want to delete this "+d(o.type)+" ? ",1),e("div",M,[e("button",{onClick:p,type:"button",class:"!text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center flex gap-3 justify-center"},[S,s.value?(l(),c("svg",q,j)):g("",!0)]),e("button",{onClick:h=>t.value=!1,type:"button",class:"py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"}," No, cancel ",8,D)])])])]),_:1},8,["modelValue"])}}};export{$ as _};
