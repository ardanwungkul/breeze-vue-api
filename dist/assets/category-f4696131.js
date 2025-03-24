import{k as i,l as o}from"./index-c1909b7c.js";const l=()=>o.get("/sanctum/csrf-cookie"),n=i({id:"category",state:()=>({categories:[],loading:!1,error:null}),getters:{allCategories:a=>a.categories,isLoading:a=>a.loading,getError:a=>a.error},actions:{async categoryAll(){this.loading=!0;try{const a=await o.get("/api/category").then(e=>{this.categories=e.data})}catch(a){this.error=a}finally{this.loading=!1}},async categoryWithSubCategory(){this.loading=!0;try{const a=await o.get("/api/category-with-subcategory").then(e=>{this.categories=e.data})}catch(a){this.error=a}finally{this.loading=!1}},async addCategory(a,e,t){await l(),t.value=!0,o.post("/api/category",a).then(s=>{t.value=!1,this.categories.push(s.data)}).catch(s=>{if(console.log(s),s.response.status!==422)throw s;e.value=Object.values(s.response.data.errors).flat(),t.value=!1})},async editCategory(a,e,t,s){await l(),t.value=!0,o.post(`/api/category/${s}`,a).then(r=>{t.value=!1}).catch(r=>{if(console.log(r),r.response.status!==422)throw r;e.value=Object.values(r.response.data.errors).flat(),t.value=!1})},async deleteCategory(a,e){await l(),e.value=!0;try{const t=await o.delete(`/api/category/${a}`);e.value=!1}catch(t){this.error=t,e.value=!1}finally{e.value=!1}}}});export{n as u};
