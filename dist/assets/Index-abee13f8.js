import{u as l}from"./category-f4696131.js";import{u as g}from"./subcategory-8381e1e5.js";import{r,x as _,d as m,e as f,w as d,H as p,h as C,f as u}from"./index-c1909b7c.js";import{_ as y,a as h}from"./SubCategoryTable-a9ab7ea5.js";import"./ConfirmDelete-585e5a7b.js";const v={class:"w-full space-y-3"},A={__name:"Index",setup(b){const a=l(),i=g(),c=r([]),t=r([]),n=r([]);_(async()=>{await o(),await s()});async function o(){await a.categoryAll(),t.value=a.allCategories.map(e=>({name:e.category_name,id:e.id})),n.value=a.allCategories.map(e=>({value:e.id,title:e.category_name}))}async function s(){await i.subCategoryAll(),c.value=i.allSubCategories.map(e=>({name:e.sub_category_name,category_id:e.category.id,category:e.category.category_name,id:e.id}))}return(e,S)=>(m(),f(p,{title:"Product Category"},{default:d(()=>[C("div",v,[u(y,{categories:t.value,fetchCategories:o,fetchSubCategories:s},null,8,["categories"]),u(h,{categories:t.value,categories_option:n.value,subcategories:c.value,fetchCategories:o,fetchSubCategories:s},null,8,["categories","categories_option","subcategories"])])]),_:1}))}};export{A as default};
