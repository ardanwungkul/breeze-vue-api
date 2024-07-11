import{r,b as g,o as c,c as h,w as m,d as e,m as w,e as C,f as u,v as p,g as y,h as b}from"./index-a8eec92e.js";/* empty css                   */const z=e("i",{class:"fa-solid fa-plus"},null,-1),E=e("p",null,"Add User",-1),U=[z,E],k={class:"w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg"},N={class:"flex justify-between border-b py-3 px-4 items-center"},P=e("p",{class:"font-medium text-lg"},"Add User",-1),A=["onClick"],B={class:"px-5 py-3"},M={class:"space-y-3"},V={class:"grid grid-cols-1 gap-3"},q={class:"flex flex-col gap-2 text-sm"},D=e("label",{for:"inputName"},"Name",-1),F={class:"flex flex-col gap-2 text-sm"},Z=e("label",{for:"inputEmail"},"Email",-1),j={class:"flex flex-col gap-2 text-sm"},S=e("label",{for:"inputPassword"},"Password",-1),T={class:"bg-ezzora-500 hover:bg-ezzora-600 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3"},$=e("p",null,"Add",-1),G=e("i",{class:"fa-solid fa-plus"},null,-1),H={key:0,role:"status",class:"inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},I=e("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"},null,-1),J=e("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"},null,-1),K=[I,J],Q={__name:"AddUser",props:{method:{type:Function,required:!0}},setup(_){const l=r(""),a=r(""),n=r(""),d=r(!1),f=_,v=async()=>{d.value=!0;const o=new FormData;o.append("name",l.value),o.append("email",a.value),o.append("password",n.value),await f.method(o,d),l.value="",a.value="",n.value="",d.value=!1};return(o,t)=>{const x=g("v-dialog");return c(),h(x,null,{activator:m(({props:i})=>[e("div",w(i,{class:"bg-ezzora-200 hover:bg-ezzora-300 text-ezzora-800 shadow-lg px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer"}),U,16)]),default:m(({isActive:i})=>[e("div",k,[e("div",N,[P,e("button",{onClick:s=>i.value=!1,class:"fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"},null,8,A)]),e("div",B,[e("form",{onSubmit:C(v,["prevent"]),enctype:"multipart/form-data"},[e("div",M,[e("div",V,[e("div",q,[D,u(e("input",{class:"text-sm rounded-lg bg-gray-100 w-full",type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>l.value=s),id:"inputName",placeholder:"Enter User Name",required:""},null,512),[[p,l.value]])]),e("div",F,[Z,u(e("input",{class:"text-sm rounded-lg bg-gray-100 w-full",type:"email","onUpdate:modelValue":t[1]||(t[1]=s=>a.value=s),id:"inputEmail",placeholder:"Enter User Email",required:""},null,512),[[p,a.value]])]),e("div",j,[S,u(e("input",{class:"text-sm rounded-lg bg-gray-100 w-full",type:"password","onUpdate:modelValue":t[2]||(t[2]=s=>n.value=s),id:"inputPassword",placeholder:"Enter Password",required:""},null,512),[[p,n.value]])])]),e("button",T,[$,G,d.value?(c(),y("svg",H,K)):b("",!0)])])],32)])])]),_:1})}}};export{Q as _};
