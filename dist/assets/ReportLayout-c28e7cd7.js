import{I as U,a as N,o as I,af as z,r as b,c as y,d as i,e as C,w as _,h as t,n as l,i as p,f as d,L as R,m as u,F as O,p as j,t as D,q as m,U as Y,ag as B,ab as L,E as $,M as P,G as H,O as E,a4 as A}from"./index-c1909b7c.js";const G={class:"p-4 flex justify-between h-[70px] flex-none"},J=t("p",{class:"font-poppins text-xl font-extralight uppercase dark:text-white"}," Ezzora ",-1),q={class:"p-2 overflow-x-hidden h-[calc(100vh-72px)] flex flex-col gap-1 flex-auto"},Q={class:"space-y-1 h-full overflow-y-scroll invisible-scrollbar"},W={key:0},K=["id"],X=["onClick","aria-expanded","aria-controls"],Z={class:"w-[28px] flex-none flex justify-center text-typography-3 dark:text-white group-hover:dark:text-typography-3"},tt={class:"text-typography-3 dark:text-white font-medium dark:font-normal text-sm whitespace-nowrap group-hover:dark:text-typography-3"},et=["id","aria-labelledby"],at={class:"border-y dark:border-none rounded-lg mt-1 bg-light-primary-2 dark:bg-dark-primary-1"},ot={class:"w-[28px] flex-none flex justify-center text-typography-3 dark:text-white group-hover:dark:text-typography-3"},rt={class:"text-typography-3 dark:text-white font-medium dark:font-normal text-sm whitespace-nowrap group-hover:dark:text-typography-3 transition-colors duration-500"},st={class:"py-1"},lt=t("div",{class:"w-[28px] flex-none flex justify-center text-typography-3 dark:text-white group-hover:dark:text-typography-3 transition-colors duration-500"},[t("i",{class:"fa-regular fa-right-from-bracket"})],-1),nt=t("p",{class:"text-typography-3 dark:text-white font-medium dark:font-normal text-sm whitespace-nowrap group-hover:dark:text-typography-3 transition-colors duration-500"}," Sign Out ",-1),it=[lt,nt],dt={__name:"ReportNavigation",setup(M){const h=U(),r=N();I(()=>{h.hasUserData||h.getData()});const g=z("rail"),V=b([{icon:"fa-regular fa-grid-2",to:"report.dashboard",title:"Dashboard",isHasChild:!1},{icon:"fa-sharp-duotone fa-solid fa-box",to:"report.stock",title:"Stock Report",isHasChild:!1},{icon:"fa-solid fa-chart-mixed",to:"report.sales",title:"Sales Report",isHasChild:!1},{icon:"fa-sharp-duotone fa-solid fa-chart-waterfall",to:"report.order",title:"Order Report",isHasChild:!1},{icon:"fa-regular fa-money-bill-transfer",to:"report.cashflow",title:"Cash Flow",isHasChild:!1}]),o=b(null),x=f=>{o.value===f?o.value=null:o.value=f},k=()=>{h.logout()};return(f,S)=>{const w=y("router-link"),a=y("v-divider"),c=y("v-navigation-drawer");return i(),C(c,{rail:p(g),"rail-width":"60",permanent:"","disable-route-watcher":"","disable-resize-watcher":"",class:"!rounded-r-2xl !shadow-lg my-auto !bg-light-primary-1 dark:!bg-dark-primary-2 !transition-colors !duration-500 !h-screen overflow-y-hidden !flex !flex-col"},{default:_(()=>[t("div",G,[t("div",{class:l(["shrink-0 flex items-center py-[5px] pr-4",p(g)?"hidden":""])},[d(w,{to:"/"},{default:_(()=>[J]),_:1})],2),t("button",{onClick:S[0]||(S[0]=R(e=>g.value=!p(g),["stop"])),class:"w-[43px] py-2 px-2 text-typography-3 dark:text-white cursor-pointer rounded-lg flex items-center gap-4 justify-center"},[t("i",{class:l(["fa-solid",p(g)?"fa-chevron-right":"fa-chevron-left"])},null,2)])]),d(a),t("ul",q,[t("div",Q,[(i(!0),u(O,null,j(V.value,(e,n)=>(i(),u("li",{key:n},[e.isHasChild?(i(),u("div",W,[t("h2",{id:"accordion-heading-"+n,class:"bg-transparent"},[t("button",{type:"button",class:"group w-full py-2 px-2 hover:bg-light-primary-3 dark:hover:bg-white transition-colors duration-500 text-typography-3 dark:text-white cursor-pointer rounded-lg flex items-center gap-4",onClick:v=>x(n),"aria-expanded":o.value===n,"aria-controls":"accordion-body-"+n},[t("div",Z,[t("i",{class:l(["",e.icon])},null,2)]),t("p",tt,D(e.title),1)],8,X)],8,K),t("div",{id:"accordion-body-"+n,class:l(o.value===n?"":"hidden"),"aria-labelledby":"accordion-heading-"+n},[t("div",at,[(i(!0),u(O,null,j(e.child,(v,F)=>(i(),C(w,{to:{name:v.to},key:F,class:"group w-full py-2 px-2 hover:bg-light-primary-3 dark:hover:bg-white transition-colors duration-500 text-typography-3 dark:text-white cursor-pointer rounded-lg flex items-center gap-4"},{default:_(()=>[t("div",ot,[t("i",{class:l(["",v.icon])},null,2)]),t("p",rt,D(v.title),1)]),_:2},1032,["to"]))),128))])],10,et)])):m("",!0),e.isHasChild?m("",!0):(i(),C(w,{key:1,to:{name:e.to}},{default:_(()=>[t("div",{class:l([p(r).name===e.to?"!bg-light-primary-3":"","group w-full py-2 px-2 hover:bg-light-primary-3 dark:hover:bg-white transition-colors duration-500 text-typography-3 dark:text-white cursor-pointer rounded-lg flex items-center gap-4"])},[t("div",{class:l([p(r).name===e.to?"!text-typography-3":"","w-[28px] flex-none flex justify-center text-typography-3 dark:text-white group-hover:dark:text-typography-3 transition-colors duration-500"])},[t("i",{class:l([e.icon,""])},null,2)],2),t("p",{class:l([p(r).name===e.to?"!text-typography-3":"","text-typography-3 dark:text-white font-medium dark:font-normal text-sm whitespace-nowrap group-hover:dark:text-typography-3 transition-colors duration-500"])},D(e.title),3)],2)]),_:2},1032,["to"]))]))),128))]),t("div",null,[t("div",st,[d(a,{class:"!border-black dark:!border-white",thickness:1})]),t("div",{class:""},[t("button",{onClick:k,type:"button",class:"group w-full py-2 px-2 hover:bg-light-primary-3 dark:hover:bg-white transition-colors duration-500 text-typography-3 dark:text-white cursor-pointer rounded-lg flex items-center gap-4"},it)])])])]),_:1},8,["rail"])}}};const ct={class:"py-5 space-y-3 px-10"},pt={class:"w-full flex justify-between items-center mb-5"},ut={class:"text-2xl font-bold dark:font-medium text-ezzora-900 dark:text-white"},ht={class:"flex gap-10 items-center"},gt={class:"flex justify-center gap-2 items-center"},yt=t("i",{class:"fa-light fa-sun-bright text-gray-900 dark:text-gray-600"},null,-1),_t={id:"page"},ft=t("label",{for:"theme-toggle"},[t("span")],-1),vt=t("i",{class:"fa-light fa-moon text-gray-300 dark:text-white"},null,-1),mt={class:"flex gap-3 items-center"},xt=t("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3jfOPCgGScFht2teS6zF4P3_NFVrfe1IhQ&s",class:"rounded-full h-10 border w-10 object-cover",alt:""},null,-1),kt={class:"text-sm dark:text-typography-2"},wt={class:"flex items-center justify-between gap-4"},bt={key:0,class:"flex gap-4 items-center w-full shadow-lg rounded-lg"},Dt={class:"w-full"},St={key:1,class:"flex gap-4 items-center w-full shadow-lg rounded-lg"},$t={class:"w-full"},Ct={key:2,class:"flex gap-4 items-center w-full shadow-lg text-sm rounded-lg"},Vt={class:"w-full"},Ft={key:3,class:"flex gap-4 items-center w-full rounded-lg"},Mt={class:"w-full"},Ot=t("p",{class:"text-typography-2"},"-",-1),jt={class:"w-full"},Ht=t("option",{value:"weekly"},"Weekly",-1),Ut=t("option",{value:"yearly"},"Yearly",-1),It=t("option",{value:"monthly"},"monthly",-1),Tt=t("option",{value:"date"},"date",-1),Nt=[Ht,Ut,It,Tt],Rt={__name:"ReportLayout",props:{title:String},setup(M){const h=U();I(()=>{h.hasUserData||h.getData();const c=localStorage.getItem("isDate");c?a.value=JSON.parse(c):localStorage.setItem("isDate",JSON.stringify(a.value))});const r=b(localStorage.getItem("isDark")==="true");Y(()=>{localStorage.setItem("isDark",r.value)});const g=()=>{r.value=!r.value},V=b(!1);B("rail",V);const o=new Date;let x=new Date(o.getFullYear(),o.getMonth(),1);x.setHours(x.getHours()+7);let k=new Date(o.getFullYear(),o.getMonth()+1,0);k.setHours(k.getHours()+7);const f=new Date(o.getFullYear(),0,1),S=Math.floor((o-f)/(24*60*60*1e3)),w=Math.ceil((S+f.getDay()+1)/7),a=b({selectedType:"date",startDateFilter:x.toISOString().split("T")[0],endDateFilter:k.toISOString().split("T")[0],weekly:w,yearly:o.getFullYear().toString(),monthly:String(o.getMonth()+1).padStart(2,"0")});return L(a,c=>{localStorage.setItem("isDate",JSON.stringify(c))},{deep:!0}),(c,e)=>{const n=y("VueDatePicker"),v=y("v-container"),F=y("v-main"),T=y("v-app");return i(),C(T,{class:l(["!bg-light-primary-2 dark:!bg-dark-primary-1 font-inter !transition-colors !duration-500",r.value?"dark":""])},{default:_(()=>[d(dt),d(F,null,{default:_(()=>[d(v,{class:"!py-0 !max-w-none"},{default:_(()=>[t("div",ct,[t("div",pt,[t("p",ut,D(M.title),1),t("div",ht,[t("div",gt,[yt,t("div",_t,[$(t("input",{onClick:g,type:"checkbox",id:"theme-toggle","onUpdate:modelValue":e[0]||(e[0]=s=>r.value=s)},null,512),[[P,r.value]]),ft]),vt]),t("div",mt,[xt,t("p",kt,D(p(h).userData.name),1)])])]),t("div",wt,[a.value.selectedType==="weekly"?(i(),u("div",bt,[t("div",Dt,[d(n,{modelValue:a.value.weekly,"onUpdate:modelValue":e[1]||(e[1]=s=>a.value.weekly=s),"week-picker":"",class:l(r.value?"dp__theme_dark":"dp_theme_light")},null,8,["modelValue","class"])])])):m("",!0),a.value.selectedType==="yearly"?(i(),u("div",St,[t("div",$t,[d(n,{modelValue:a.value.yearly,"onUpdate:modelValue":e[2]||(e[2]=s=>a.value.yearly=s),"year-picker":"",class:l(r.value?"dp__theme_dark":"dp_theme_light")},null,8,["modelValue","class"])])])):m("",!0),a.value.selectedType==="monthly"?(i(),u("div",Ct,[t("div",Vt,[d(n,{modelValue:a.value.monthly,"onUpdate:modelValue":e[3]||(e[3]=s=>a.value.monthly=s),"month-picker":"",class:l(r.value?"dp__theme_dark":"dp_theme_light")},null,8,["modelValue","class"])])])):m("",!0),a.value.selectedType==="date"?(i(),u("div",Ft,[t("div",Mt,[$(t("input",{type:"date","onUpdate:modelValue":e[4]||(e[4]=s=>a.value.startDateFilter=s),class:"p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-typography-1 shadow-lg text-sm w-full"},null,512),[[H,a.value.startDateFilter]])]),Ot,t("div",jt,[$(t("input",{type:"date","onUpdate:modelValue":e[5]||(e[5]=s=>a.value.endDateFilter=s),class:"p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-typography-1 shadow-lg text-sm w-full"},null,512),[[H,a.value.endDateFilter]])])])):m("",!0),$(t("select",{"onUpdate:modelValue":e[6]||(e[6]=s=>a.value.selectedType=s),class:"p-2 !border-solid rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-typography-1 shadow-lg text-sm"},Nt,512),[[E,a.value.selectedType]])]),A(c.$slots,"default")])]),_:3})]),_:3})]),_:3},8,["class"])}}};export{Rt as _};
