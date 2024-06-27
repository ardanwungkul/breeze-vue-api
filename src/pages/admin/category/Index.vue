<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useSubCategoryStore } from '@/stores/subcategory'
import AdminLayout from '@/layouts/AdminLayout.vue'
import 'vuetify/styles'
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
            category: subcategory.category.category_name,
            id: subcategory.id,
        }),
    )
}
</script>

<template>
    <AdminLayout>
        <div class="w-full space-y-5">
            <p class="text-2xl font-bold text-ezzora-900">Product Category</p>
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
    </AdminLayout>
</template>
