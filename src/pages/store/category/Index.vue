<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useSubCategoryStore } from '@/stores/subcategory'
import StoreLayout from '@/layouts/StoreLayout.vue'
import '@/assets/css/vuetify.css'
import CategoryTable from '@/components/admin/category/CategoryTable.vue'
import SubCategoryTable from '@/components/admin/category/SubCategoryTable.vue'

const storeCategory = useCategoryStore()
const storeSubCategory = useSubCategoryStore()

const subcategories = ref([])
const categories = ref([])
const categories_option = ref([])

onMounted(async () => {
    await fetchCategories()
    await fetchSubCategories()
})
async function fetchCategories() {
    await storeCategory.categoryAll()
    categories.value = storeCategory.allCategories.map(category => ({
        name: category.category_name,
        id: category.id,
    }))
    categories_option.value = storeCategory.allCategories.map(category => ({
        value: category.id,
        title: category.category_name,
    }))
}
async function fetchSubCategories() {
    await storeSubCategory.subCategoryAll()
    subcategories.value = storeSubCategory.allSubCategories.map(
        subcategory => ({
            name: subcategory.sub_category_name,
            category_id: subcategory.category.id,
            category: subcategory.category.category_name,
            id: subcategory.id,
        }),
    )
}
</script>

<template>
    <StoreLayout title="Product Category">
        <div class="w-full space-y-3">
            <CategoryTable
                :categories="categories"
                :fetchCategories="fetchCategories"
                :fetchSubCategories="fetchSubCategories" />
            <SubCategoryTable
                :categories="categories"
                :categories_option="categories_option"
                :subcategories="subcategories"
                :fetchCategories="fetchCategories"
                :fetchSubCategories="fetchSubCategories" />
        </div>
    </StoreLayout>
</template>
